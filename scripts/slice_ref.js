const sharp = require('sharp');

async function sliceRef() {
  const meta = await sharp('reference_design.jpeg').metadata();
  console.log('width:', meta.width, 'height:', meta.height);
  // Let's divide into 3 vertical slices of 400px height each:
  await sharp('reference_design.jpeg').extract({ left: 0, top: 0, width: meta.width, height: 400 }).toFile('public/assets/ref_part1.jpg');
  await sharp('reference_design.jpeg').extract({ left: 0, top: 400, width: meta.width, height: 400 }).toFile('public/assets/ref_part2.jpg');
  await sharp('reference_design.jpeg').extract({ left: 0, top: 800, width: meta.width, height: meta.height - 800 }).toFile('public/assets/ref_part3.jpg');
  console.log('Saved ref parts');
}
sliceRef();
