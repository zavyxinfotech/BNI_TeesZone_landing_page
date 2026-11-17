import sharp from 'sharp';

async function updateBniLogo() {
  const bniSrc = 'C:/Users/vasuk/.gemini/antigravity/brain/7c3c1334-4db9-47ef-825c-11d697671623/.user_uploaded/media_1794900363375_96cffb6e.png';
  
  await sharp(bniSrc)
    .trim()
    .toFile('public/images/logos/bni_proud_member.png');
    
  await sharp('public/images/logos/bni_proud_member.png')
    .webp({ quality: 95 })
    .toFile('public/images/logos/bni_proud_member.webp');
    
  const meta = await sharp('public/images/logos/bni_proud_member.png').metadata();
  console.log('BNI logo updated:', meta.width, 'x', meta.height);
}

updateBniLogo().catch(console.error);
