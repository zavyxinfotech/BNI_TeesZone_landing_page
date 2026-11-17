import sharp from 'sharp';

async function inspectImage1() {
  const img1 = 'C:/Users/vasuk/.gemini/antigravity/brain/7c3c1334-4db9-47ef-825c-11d697671623/.user_uploaded/media_1794899611514_d6e6a9fa.jpg';
  
  // Save desktop slice:
  await sharp(img1)
    .extract({ left: 0, top: 0, width: 805, height: 342 })
    .toFile('public/assets/target_hero_desktop.jpg');

  // Save mobile slice:
  await sharp(img1)
    .extract({ left: 805, top: 0, width: 207, height: 342 })
    .toFile('public/assets/target_hero_mobile.jpg');

  console.log('Saved target_hero_desktop.jpg and target_hero_mobile.jpg');
}

inspectImage1().catch(console.error);
