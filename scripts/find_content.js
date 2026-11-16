const sharp = require('sharp');
const fs = require('fs');

async function findContent() {
  const meta = await sharp('reference_design.jpeg').metadata();
  console.log('reference_design:', meta.width, 'x', meta.height);

  // Let's create an overview HTML page with both images and slices so we can see what each file is
  // Let's create slices along the vertical axis of reference_design.jpeg:
  const sliceH = Math.floor(meta.height / 6);
  for (let i = 0; i < 6; i++) {
    await sharp('reference_design.jpeg')
      .extract({ left: 0, top: i * sliceH, width: meta.width, height: sliceH })
      .toFile(`public/assets/ref_slice_${i}.jpg`);
  }
  console.log('Extracted 6 slices of reference_design.jpeg');
}
findContent().catch(console.error);
