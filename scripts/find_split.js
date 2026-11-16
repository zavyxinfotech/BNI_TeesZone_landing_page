const sharp = require('sharp');

async function findSplit() {
  const media = 'C:/Users/vasuk/.gemini/antigravity/brain/7c3c1334-4db9-47ef-825c-11d697671623/.user_uploaded/media_1794808224764_029ca947.jpg';
  // Let's sample a horizontal row across the middle (y = 500) to find the gap between desktop and mobile:
  const row = await sharp(media)
    .extract({ left: 0, top: 500, width: 682, height: 1 })
    .raw()
    .toBuffer();
  
  // Find where the background between desktop and mobile is (the grey/neutral border):
  console.log('Sampling x from 510 to 560:');
  for (let x = 510; x < 560; x++) {
    const r = row[x * 3];
    const g = row[x * 3 + 1];
    const b = row[x * 3 + 2];
    console.log(`x=${x}: RGB(${r}, ${g}, ${b})`);
  }
}
findSplit();
