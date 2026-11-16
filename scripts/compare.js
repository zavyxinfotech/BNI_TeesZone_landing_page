const sharp = require('sharp');

async function compare() {
  const ref = await sharp('reference_design.jpeg').metadata();
  console.log('reference_design.jpeg:', ref.width, ref.height);
  
  // Let's check what is in ref_part1, ref_part2, ref_part3
  // What is the header in reference_design?
  // Let's check if the top of reference_design has TEESZONE logo
  const topSlice = await sharp('reference_design.jpeg')
    .extract({ left: 0, top: 0, width: 300, height: 100 })
    .toBuffer();
  console.log('Extracted topSlice successfully');
}
compare();
