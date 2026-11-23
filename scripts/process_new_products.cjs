const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const UPLOADS = {
  corporatePolos: 'C:/Users/vasuk/.gemini/antigravity/brain/6af6190b-2dd3-4545-9cc5-02b9a3abdef0/.user_uploaded/media_1795418393049_2d11a98e.png',
  blankTshirts: 'C:/Users/vasuk/.gemini/antigravity/brain/6af6190b-2dd3-4545-9cc5-02b9a3abdef0/.user_uploaded/media_1795418857130_923bfe12.jpg',
  schoolUniforms: 'C:/Users/vasuk/.gemini/antigravity/brain/6af6190b-2dd3-4545-9cc5-02b9a3abdef0/.user_uploaded/media_1795419204430_27cd9c5c.png',
  promotionalApparel: 'C:/Users/vasuk/.gemini/antigravity/brain/6af6190b-2dd3-4545-9cc5-02b9a3abdef0/.user_uploaded/media_1795419477157_d7566a2f.jpg',
  sportsApparel: 'C:/Users/vasuk/.gemini/antigravity/brain/6af6190b-2dd3-4545-9cc5-02b9a3abdef0/.user_uploaded/media_1795419571192_84f255e8.jpg'
};

const OUTPUT_DIR = path.resolve('public/images/products');

// 1. Process Colored Garment (Hoodie, Sports Jersey) by removing background checkerboard with flood-fill & anti-aliasing
async function processColoredGarment(inputPath, baseName) {
  console.log(`Processing colored garment: ${baseName}...`);
  const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;

  // Mask: 0 = background candidate, 1 = garment
  const mask = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) {
    const idx = i * 3;
    const r = data[idx], g = data[idx+1], b = data[idx+2];
    const sat = Math.max(r,g,b) - Math.min(r,g,b);
    const lum = (r + g + b) / 3;

    // Checkerboard squares have saturation <= 6 and luminance >= 208
    if (sat <= 6 && lum >= 208) {
      mask[i] = 0;
    } else {
      mask[i] = 1;
    }
  }

  // Flood fill from borders to identify outer background
  const bg = new Uint8Array(w * h);
  const queue = [];

  function add(x, y) {
    if (x < 0 || x >= w || y < 0 || y >= h) return;
    const idx = y * w + x;
    if (bg[idx] === 0 && mask[idx] === 0) {
      bg[idx] = 1;
      queue.push(idx);
    }
  }

  for (let x = 0; x < w; x++) { add(x, 0); add(x, h - 1); }
  for (let y = 0; y < h; y++) { add(0, y); add(w - 1, y); }

  let head = 0;
  while (head < queue.length) {
    const curr = queue[head++];
    const cx = curr % w;
    const cy = Math.floor(curr / w);
    if (cx > 0) add(cx - 1, cy);
    if (cx < w - 1) add(cx + 1, cy);
    if (cy > 0) add(cx, cy - 1);
    if (cy < h - 1) add(cx, cy + 1);
  }

  // Build raw alpha buffer (255 for garment, 0 for background)
  const rawAlpha = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) {
    rawAlpha[i] = bg[i] === 1 ? 0 : 255;
  }

  // Antialias / feather the edge slightly by blending boundary pixels
  const finalRgba = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = y * w + x;
      const s = idx * 3;
      const d = idx * 4;
      finalRgba[d] = data[s];
      finalRgba[d+1] = data[s+1];
      finalRgba[d+2] = data[s+2];

      if (rawAlpha[idx] === 0) {
        finalRgba[d+3] = 0;
      } else {
        // Check if on boundary (has neighbor with alpha 0)
        let hasBgNeighbor = false;
        let bgNeighborCount = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const ny = y + dy, nx = x + dx;
            if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
              if (rawAlpha[ny * w + nx] === 0) {
                hasBgNeighbor = true;
                bgNeighborCount++;
              }
            }
          }
        }
        if (hasBgNeighbor) {
          // Soft anti-aliased edge
          finalRgba[d+3] = Math.max(120, Math.min(255, Math.round(255 - bgNeighborCount * 22)));
        } else {
          finalRgba[d+3] = 255;
        }
      }
    }
  }

  const pngOut = path.join(OUTPUT_DIR, `${baseName}.png`);
  const webpOut = path.join(OUTPUT_DIR, `${baseName}.webp`);

  await sharp(finalRgba, { raw: { width: w, height: h, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(pngOut);

  await sharp(finalRgba, { raw: { width: w, height: h, channels: 4 } })
    .webp({ quality: 92, effort: 6 })
    .toFile(webpOut);

  console.log(`Saved ${baseName}.png and ${baseName}.webp`);
}

// 2. Process White T-Shirt by contour raycasting, median filtering and anti-aliasing
async function processWhiteTshirt(inputPath, baseName) {
  console.log(`Processing white t-shirt: ${baseName}...`);
  const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;

  // Build horizontal and vertical grid line positions of the checkerboard
  const xGrid = [0];
  let inHigh = true;
  for (let x = 1; x < w; x++) {
    let sum = 0;
    for (let y = 0; y < 15; y++) sum += data[(y * w + x) * 3];
    const mean = sum / 15;
    if (inHigh && mean < 240) { xGrid.push(x); inHigh = false; }
    else if (!inHigh && mean > 245) { xGrid.push(x); inHigh = true; }
  }
  xGrid.push(w);

  const yGrid = [0];
  let inHighY = true;
  for (let y = 1; y < h; y++) {
    let sum = 0;
    for (let x = 0; x < 15; x++) sum += data[(y * w + x) * 3];
    const mean = sum / 15;
    if (inHighY && mean < 240) { yGrid.push(y); inHighY = false; }
    else if (!inHighY && mean > 245) { yGrid.push(y); inHighY = true; }
  }
  yGrid.push(h);

  function isBgPixel(x, y) {
    if (x < 0 || x >= w || y < 0 || y >= h) return true;
    let iy = 0; while (iy + 1 < yGrid.length && y >= yGrid[iy + 1]) iy++;
    let ix = 0; while (ix + 1 < xGrid.length && x >= xGrid[ix + 1]) ix++;
    const exp = ((ix + iy) % 2 === 0) ? 254 : 228;

    const idx = (y * w + x) * 3;
    const r = data[idx], g = data[idx+1], b = data[idx+2];
    const sat = Math.max(r,g,b) - Math.min(r,g,b);
    if (sat > 6) return false;

    const distX = Math.min(Math.abs(x - xGrid[ix]), Math.abs(x - xGrid[ix + 1]));
    const distY = Math.min(Math.abs(y - yGrid[iy]), Math.abs(y - yGrid[iy + 1]));

    if (distX <= 1 || distY <= 1) {
      return (r >= 210 && r <= 255);
    }
    if (exp === 254) return (r >= 244);
    return (r >= 212 && r <= 238);
  }

  // Find leftEdge and rightEdge by raycasting
  const leftEdge = new Int32Array(h);
  const rightEdge = new Int32Array(h);

  for (let y = 0; y < h; y++) {
    let l = -1;
    for (let x = 0; x < w / 2; x++) {
      if (!isBgPixel(x, y) && !isBgPixel(x + 1, y) && !isBgPixel(x + 2, y)) {
        l = x;
        break;
      }
    }
    leftEdge[y] = l;

    let r = -1;
    for (let x = w - 1; x > w / 2; x--) {
      if (!isBgPixel(x, y) && !isBgPixel(x - 1, y) && !isBgPixel(x - 2, y)) {
        r = x;
        break;
      }
    }
    rightEdge[y] = r;
  }

  // Interpolate missing rows
  for (let y = 46; y <= 918; y++) {
    if (leftEdge[y] === -1) {
      let pY = y - 1; while (pY > 0 && leftEdge[pY] === -1) pY--;
      let nY = y + 1; while (nY < h && leftEdge[nY] === -1) nY++;
      if (pY > 0 && nY < h) {
        leftEdge[y] = Math.round(leftEdge[pY] + (leftEdge[nY] - leftEdge[pY]) * (y - pY) / (nY - pY));
      }
    }
    if (rightEdge[y] === -1) {
      let pY = y - 1; while (pY > 0 && rightEdge[pY] === -1) pY--;
      let nY = y + 1; while (nY < h && rightEdge[nY] === -1) nY++;
      if (pY > 0 && nY < h) {
        rightEdge[y] = Math.round(rightEdge[pY] + (rightEdge[nY] - rightEdge[pY]) * (y - pY) / (nY - pY));
      }
    }
  }

  // 7-point median filter to guarantee razor-smooth outer contour
  function medianFilter(arr, radius = 3) {
    const res = new Int32Array(arr.length);
    for (let i = 0; i < arr.length; i++) {
      if (i < 46 || i > 918 || arr[i] === -1) {
        res[i] = arr[i];
        continue;
      }
      const win = [];
      for (let d = -radius; d <= radius; d++) {
        const idx = Math.max(46, Math.min(918, i + d));
        if (arr[idx] !== -1) win.push(arr[idx]);
      }
      win.sort((a, b) => a - b);
      res[i] = win[Math.floor(win.length / 2)];
    }
    return res;
  }

  const smoothLeft = medianFilter(leftEdge, 4);
  const smoothRight = medianFilter(rightEdge, 4);

  // Generate alpha
  const finalRgba = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++) {
    const l = smoothLeft[y];
    const r = smoothRight[y];
    for (let x = 0; x < w; x++) {
      const s = (y * w + x) * 3;
      const d = (y * w + x) * 4;
      finalRgba[d] = data[s];
      finalRgba[d+1] = data[s+1];
      finalRgba[d+2] = data[s+2];

      if (y >= 46 && y <= 918 && l !== -1 && r !== -1 && x >= l && x <= r) {
        const edgeDist = Math.min(x - l, r - x, y - 46, 918 - y);
        if (edgeDist <= 0) finalRgba[d+3] = 0;
        else if (edgeDist === 1) finalRgba[d+3] = 140;
        else if (edgeDist === 2) finalRgba[d+3] = 210;
        else finalRgba[d+3] = 255;
      } else {
        finalRgba[d+3] = 0;
      }
    }
  }

  const pngOut = path.join(OUTPUT_DIR, `${baseName}.png`);
  const webpOut = path.join(OUTPUT_DIR, `${baseName}.webp`);

  await sharp(finalRgba, { raw: { width: w, height: h, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(pngOut);

  await sharp(finalRgba, { raw: { width: w, height: h, channels: 4 } })
    .webp({ quality: 92, effort: 6 })
    .toFile(webpOut);

  console.log(`Saved ${baseName}.png and ${baseName}.webp`);
}

// 3. Process Already-Transparent PNG (Navy polo, Maroon polo)
async function processTransparentGarment(inputPath, baseName) {
  console.log(`Processing transparent garment: ${baseName}...`);
  const pngOut = path.join(OUTPUT_DIR, `${baseName}.png`);
  const webpOut = path.join(OUTPUT_DIR, `${baseName}.webp`);

  // Copy PNG with highest compression
  await sharp(inputPath)
    .png({ compressionLevel: 9 })
    .toFile(pngOut);

  // Generate WebP
  await sharp(inputPath)
    .webp({ quality: 92, effort: 6 })
    .toFile(webpOut);

  console.log(`Saved ${baseName}.png and ${baseName}.webp`);
}

async function main() {
  console.log('=== STARTING PRODUCT IMAGE REPLACEMENT ===');
  // 1. Corporate Uniforms & Executive Polos (Navy blue polo)
  await processTransparentGarment(UPLOADS.corporatePolos, 'corporate-polos');

  // 2. Blank T-Shirts & Plain Apparel (White round neck)
  await processWhiteTshirt(UPLOADS.blankTshirts, 'blank-tshirts');

  // 3. School Uniforms & Academic T-Shirts (Maroon polo)
  await processTransparentGarment(UPLOADS.schoolUniforms, 'school-uniforms');

  // 4. Promotional Merchandise & Event Apparel (Hoodie)
  await processColoredGarment(UPLOADS.promotionalApparel, 'promotional-apparel');

  // 5. Sports Apparel for Academics & Teams (Sublimated jersey)
  await processColoredGarment(UPLOADS.sportsApparel, 'sports-apparel');

  console.log('=== ALL 5 PRODUCT IMAGES SUCCESSFULLY REPLACED! ===');
}

main().catch(err => {
  console.error('Error processing product images:', err);
  process.exit(1);
});
