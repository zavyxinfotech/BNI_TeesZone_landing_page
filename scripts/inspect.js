const fs = require('fs');
const sharp = require('sharp');

async function main() {
  console.log('Inspecting images...');
  
  // Let's create an output dir for cropped assets
  if (!fs.existsSync('public/assets')) {
    fs.mkdirSync('public/assets', { recursive: true });
  }

  // Check what reference_design.jpeg is:
  const refMeta = await sharp('reference_design.jpeg').metadata();
  console.log('reference_design.jpeg:', refMeta);

  // Check user uploaded media:
  const userMedia = 'C:/Users/vasuk/.gemini/antigravity/brain/7c3c1334-4db9-47ef-825c-11d697671623/.user_uploaded/media_1794808224764_029ca947.jpg';
  const userMediaMeta = await sharp(userMedia).metadata();
  console.log('user media:', userMediaMeta);

  const imagesJpgMeta = await sharp('images.jpg').metadata();
  console.log('images.jpg:', imagesJpgMeta);
}

main().catch(console.error);
