const sharp = require('sharp');

async function analyze() {
  const userMedia = 'C:/Users/vasuk/.gemini/antigravity/brain/7c3c1334-4db9-47ef-825c-11d697671623/.user_uploaded/media_1794808224764_029ca947.jpg';
  const uMeta = await sharp(userMedia).metadata();
  console.log('User media: width =', uMeta.width, 'height =', uMeta.height);

  // In userMedia (682 x 1024):
  // Let's see: on the left (x: 0 to ~530) is the DESKTOP layout!
  // on the right (x: ~540 to 682) is the MOBILE layout!
  // Total height is 1024.
  // Wait, let's check what images.jpg is!
  // Is images.jpg a logo or a photo? Let's check mean color or check if it matches a part of userMedia!
  
  // Let's extract the Desktop portion and Mobile portion from userMedia at highest quality:
  // Desktop is roughly left 0 to 535, top 0 to 1024.
  // Mobile is roughly left 540 to 682, top 0 to 1024.
  await sharp(userMedia).extract({ left: 0, top: 0, width: 535, height: 1024 }).toFile('public/assets/reference_desktop.jpg');
  await sharp(userMedia).extract({ left: 535, top: 0, width: 147, height: 1024 }).toFile('public/assets/reference_mobile.jpg');
  console.log('Saved reference_desktop and reference_mobile');
}
analyze().catch(console.error);
