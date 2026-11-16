const sharp = require('sharp');

async function testMatch() {
  const refMeta = await sharp('reference_design.jpeg').metadata();
  console.log('reference_design.jpeg:', refMeta.width, 'x', refMeta.height);
  
  // Let's sample colors of reference_design:
  // Is reference_design.jpeg a screenshot of a webpage or a specific section?
  // Let's check dominant colors or save a few small scaled crops
  await sharp('reference_design.jpeg').resize({ width: 400 }).toFile('public/assets/ref_design_small.jpg');
  await sharp('images.jpg').resize({ width: 400 }).toFile('public/assets/images_small.jpg');
  console.log('Saved small previews');
}
testMatch();
