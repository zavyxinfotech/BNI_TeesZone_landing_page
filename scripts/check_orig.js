const sharp = require('sharp');

async function checkImg() {
  const meta = await sharp('images.jpg').metadata();
  console.log('images.jpg:', meta.width, 'x', meta.height);
  // Let's copy to public/assets/images.jpg
  await sharp('images.jpg').toFile('public/assets/images_orig.jpg');
}
checkImg();
