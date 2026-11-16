const sharp = require('sharp');
const fs = require('fs');

async function extractAssets() {
  const media = 'C:/Users/vasuk/.gemini/antigravity/brain/7c3c1334-4db9-47ef-825c-11d697671623/.user_uploaded/media_1794808224764_029ca947.jpg';
  const outDir = 'public/images';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  if (!fs.existsSync('public/images/products')) fs.mkdirSync('public/images/products', { recursive: true });
  if (!fs.existsSync('public/images/gallery')) fs.mkdirSync('public/images/gallery', { recursive: true });
  if (!fs.existsSync('public/images/logos')) fs.mkdirSync('public/images/logos', { recursive: true });

  // 1. TeesZone Logo (from header)
  // Let's extract high quality logo
  await sharp(media)
    .extract({ left: 30, top: 7, width: 105, height: 22 })
    .resize(315, 66)
    .toFile('public/images/logos/teeszone_logo.png');

  // 2. BNI Proud Member Badge (Hero badge)
  // Let's extract the exact BNI Proud Member PNG badge
  await sharp(media)
    .extract({ left: 198, top: 56, width: 78, height: 50 })
    .toFile('public/images/logos/bni_proud_member.png');

  // 3. Hero Polo Shirt (Right side of hero)
  await sharp(media)
    .extract({ left: 275, top: 25, width: 255, height: 180 })
    .toFile('public/images/hero_polo_shirt.png');

  // 4. Hero Pricing Overlay Tag
  await sharp(media)
    .extract({ left: 310, top: 154, width: 175, height: 38 })
    .toFile('public/images/hero_pricing_badge.png');

  // 5. Who We Are apparel image (clothing on hangers)
  await sharp(media)
    .extract({ left: 215, top: 246, width: 312, height: 110 })
    .toFile('public/images/who_we_are_hangers.png');

  // 6. What We Manufacture (The 6 products on 3D platform)
  // Let's extract the full 3D platform composition:
  await sharp(media)
    .extract({ left: 18, top: 395, width: 495, height: 120 })
    .toFile('public/images/manufacture_platform.png');

  // Individual products from What We Manufacture:
  // Polo T-Shirt:
  await sharp(media)
    .extract({ left: 40, top: 398, width: 75, height: 95 })
    .toFile('public/images/products/polo_tshirt.png');
  // Round Neck:
  await sharp(media)
    .extract({ left: 120, top: 398, width: 75, height: 95 })
    .toFile('public/images/products/round_neck.png');
  // Uniform:
  await sharp(media)
    .extract({ left: 195, top: 398, width: 80, height: 95 })
    .toFile('public/images/products/uniform.png');
  // Hoodie:
  await sharp(media)
    .extract({ left: 270, top: 395, width: 75, height: 98 })
    .toFile('public/images/products/hoodie.png');
  // Cap:
  await sharp(media)
    .extract({ left: 345, top: 408, width: 75, height: 85 })
    .toFile('public/images/products/cap.png');
  // Custom Apparel:
  await sharp(media)
    .extract({ left: 410, top: 395, width: 80, height: 98 })
    .toFile('public/images/products/custom_apparel.png');

  // 7. Who We Serve (Group photo of 5 people wearing custom apparel)
  await sharp(media)
    .extract({ left: 240, top: 525, width: 285, height: 118 })
    .toFile('public/images/who_we_serve_group.png');

  // 8. DTF Printing machine in action
  await sharp(media)
    .extract({ left: 345, top: 652, width: 180, height: 85 })
    .toFile('public/images/dtf_printing_machine.png');

  // 9. Product Gallery images (6 cards):
  // Card 1 (folded polos with yellow/navy):
  await sharp(media)
    .extract({ left: 28, top: 768, width: 78, height: 48 })
    .toFile('public/images/gallery/gallery_1.png');
  // Card 2 (burgundy cap):
  await sharp(media)
    .extract({ left: 110, top: 768, width: 72, height: 48 })
    .toFile('public/images/gallery/gallery_2.png');
  // Card 3 (navy hoodie):
  await sharp(media)
    .extract({ left: 186, top: 768, width: 70, height: 48 })
    .toFile('public/images/gallery/gallery_3.png');
  // Card 4 (stack of folded shirts):
  await sharp(media)
    .extract({ left: 260, top: 768, width: 72, height: 48 })
    .toFile('public/images/gallery/gallery_4.png');
  // Card 5 (white/burgundy raglan):
  await sharp(media)
    .extract({ left: 336, top: 768, width: 72, height: 48 })
    .toFile('public/images/gallery/gallery_5.png');
  // Card 6 (burgundy polo shirt):
  await sharp(media)
    .extract({ left: 412, top: 768, width: 72, height: 48 })
    .toFile('public/images/gallery/gallery_6.png');

  // 10. BNI Collaboration 5 platforms
  await sharp(media)
    .extract({ left: 55, top: 840, width: 425, height: 60 })
    .toFile('public/images/bni_collaboration_platforms.png');

  // 11. Google Map snippet from reference footer
  await sharp(media)
    .extract({ left: 270, top: 948, width: 145, height: 48 })
    .toFile('public/images/texvalley_map_preview.png');

  console.log('All essential image assets extracted successfully!');
}

extractAssets().catch(console.error);
