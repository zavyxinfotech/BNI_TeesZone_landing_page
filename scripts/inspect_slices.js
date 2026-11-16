const sharp = require('sharp');

async function inspectSlices() {
  for (let i = 0; i < 6; i++) {
    const stats = await sharp(`public/assets/ref_slice_${i}.jpg`).stats();
    console.log(`Slice ${i}: mean RGB =`, stats.channels.map(c => Math.round(c.mean)));
  }
}
inspectSlices();
