import sharp from 'sharp';
import fs from 'fs';

async function processNewAssets() {
  const logoSrc = 'C:/Users/vasuk/.gemini/antigravity/brain/7c3c1334-4db9-47ef-825c-11d697671623/.user_uploaded/media_1794894881544_a06004c9.png';
  const heroSrc = 'C:/Users/vasuk/.gemini/antigravity/brain/7c3c1334-4db9-47ef-825c-11d697671623/.user_uploaded/media_1794896612789_4eef786a.png';

  // 1. Save Full TeesZone Logo
  await sharp(logoSrc)
    .toFile('public/images/logos/teeszone_logo.png');
  await sharp(logoSrc)
    .webp({ quality: 95 })
    .toFile('public/images/logos/teeszone_logo.webp');
  console.log('Saved teeszone_logo.png and teeszone_logo.webp');

  // 2. Extract Favicon Icon (the 'Y' icon on the left)
  // The logo image is 558 x 108. The icon is from x: 0 to x: ~125, y: 0 to y: 108.
  await sharp(logoSrc)
    .extract({ left: 0, top: 0, width: 125, height: 108 })
    .trim()
    .resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toFile('public/favicon.png');
  
  await sharp('public/favicon.png')
    .resize(32, 32)
    .toFile('public/favicon-32x32.png');
    
  await sharp('public/favicon.png')
    .toFile('public/images/logos/teeszone_icon.png');
    
  console.log('Saved favicons and teeszone_icon.png');

  // 3. Process Hero Polo Shirt
  // The hero source is 1024 x 512 transparent PNG.
  // We trim transparent borders while maintaining natural proportions:
  await sharp(heroSrc)
    .trim()
    .toFile('public/images/hero_polo_shirt.png');
    
  await sharp('public/images/hero_polo_shirt.png')
    .webp({ quality: 92 })
    .toFile('public/images/hero_polo_shirt.webp');
    
  const heroMeta = await sharp('public/images/hero_polo_shirt.png').metadata();
  console.log('Hero polo trimmed dimensions:', heroMeta.width, 'x', heroMeta.height);
  console.log('All new assets processed successfully!');
}

processNewAssets().catch(console.error);
