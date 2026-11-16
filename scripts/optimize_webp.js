const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeAll() {
  const images = [
    'public/images/bni_collaboration_platforms.png',
    'public/images/dtf_printing_machine.png',
    'public/images/hero_polo_shirt.png',
    'public/images/hero_pricing_badge.png',
    'public/images/manufacture_platform.png',
    'public/images/texvalley_map_preview.png',
    'public/images/who_we_are_hangers.png',
    'public/images/who_we_serve_group.png',
    'public/images/gallery/gallery_1.png',
    'public/images/gallery/gallery_2.png',
    'public/images/gallery/gallery_3.png',
    'public/images/gallery/gallery_4.png',
    'public/images/gallery/gallery_5.png',
    'public/images/gallery/gallery_6.png',
    'public/images/logos/bni_proud_member.png',
    'public/images/logos/teeszone_logo.png',
    'public/images/products/cap.png',
    'public/images/products/custom_apparel.png',
    'public/images/products/hoodie.png',
    'public/images/products/polo_tshirt.png',
    'public/images/products/round_neck.png',
    'public/images/products/uniform.png'
  ];

  for (const imgPath of images) {
    const parsed = path.parse(imgPath);
    const webpPath = path.join(parsed.dir, `${parsed.name}.webp`);
    
    // Create optimized WebP version
    await sharp(imgPath)
      .sharpen()
      .webp({ quality: 90 })
      .toFile(webpPath);
  }
  console.log('Generated WebP formats for all assets!');
}

optimizeAll().catch(console.error);
