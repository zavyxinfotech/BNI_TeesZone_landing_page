const sharp = require('sharp');

async function testFull() {
  const meta = await sharp('reference_design.jpeg').metadata();
  console.log('reference_design: width =', meta.width, 'height =', meta.height);
  
  // What is at top? (y = 20)
  const topRow = await sharp('reference_design.jpeg').extract({ left: 0, top: 20, width: meta.width, height: 1 }).raw().toBuffer();
  console.log('topRow x=50:', topRow[50*3], topRow[50*3+1], topRow[50*3+2]);
  console.log('topRow x=650:', topRow[650*3], topRow[650*3+1], topRow[650*3+2]);
  
  // What is at bottom? (y = meta.height - 20)
  const botRow = await sharp('reference_design.jpeg').extract({ left: 0, top: meta.height - 20, width: meta.width, height: 1 }).raw().toBuffer();
  console.log('botRow x=50:', botRow[50*3], botRow[50*3+1], botRow[50*3+2]);
  console.log('botRow x=650:', botRow[650*3], botRow[650*3+1], botRow[650*3+2]);
}
testFull();
