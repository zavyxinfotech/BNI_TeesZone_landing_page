import sharp from 'sharp';

async function inspectBottom() {
  // Extract bottom 120 pixels of target_hero_desktop.jpg:
  await sharp('public/assets/target_hero_desktop.jpg')
    .extract({ left: 0, top: 220, width: 805, height: 122 })
    .toFile('public/assets/target_bottom_wave.jpg');

  // Extract right hero area with polo and pricing badge:
  await sharp('public/assets/target_hero_desktop.jpg')
    .extract({ left: 320, top: 0, width: 485, height: 260 })
    .toFile('public/assets/target_polo_area.jpg');

  console.log('Saved target_bottom_wave.jpg and target_polo_area.jpg');
}

inspectBottom().catch(console.error);
