const sharp = require('sharp');

async function checkContent() {
  // Let's sample colors across the reference_design.jpeg at (100, 100), (500, 500), etc.
  const img = sharp('reference_design.jpeg');
  const meta = await img.metadata();
  console.log('reference_design size:', meta.width, meta.height);

  // Let's also check images.jpg:
  const img2 = sharp('images.jpg');
  const meta2 = await img2.metadata();
  console.log('images.jpg size:', meta2.width, meta2.height);

  // Check if reference_design is the top half of the design or the hero or what:
  // Let's extract 4 crops from reference_design:
  await sharp('reference_design.jpeg').extract({ left: 0, top: 0, width: 300, height: 200 }).toFile('public/assets/ref_top_left.jpg');
  await sharp('images.jpg').extract({ left: 0, top: 0, width: 200, height: 200 }).toFile('public/assets/img_crop.jpg');
  console.log('Crops generated');
}
checkContent().catch(console.error);
