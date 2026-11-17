import sharp from 'sharp';

async function checkWave() {
  const meta = await sharp('public/assets/target_bottom_wave.jpg').metadata();
  console.log('Wave slice dimensions:', meta.width, 'x', meta.height);
}
checkWave();
