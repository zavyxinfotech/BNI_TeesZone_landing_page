const sharp = require('sharp');

async function inspectImgJpg() {
  const { data, info } = await sharp('images.jpg').raw().toBuffer({ resolveWithObject: true });
  console.log('info:', info);
  // Find brightest and darkest spots and colors:
  let min = 255, max = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i] < min) min = data[i];
    if (data[i] > max) max = data[i];
  }
  console.log('min:', min, 'max:', max);
}
inspectImgJpg();
