const sharp = require('sharp');

async function checkRef() {
  const meta = await sharp('reference_design.jpeg').metadata();
  console.log('reference_design dimensions:', meta.width, meta.height);
  
  // Let's extract a few sections from reference_design to see what they are:
  // Is reference_design.jpeg the top half of the page at 1312px wide?
  // Let's check the top-left logo area:
  await sharp('reference_design.jpeg')
    .extract({ left: 30, top: 10, width: 250, height: 70 })
    .toFile('public/assets/ref_top_logo.png');

  // Let's check what is in images.jpg (516 x 387):
  await sharp('images.jpg')
    .toFile('public/assets/images_inspect.png');
}
checkRef().catch(console.error);
