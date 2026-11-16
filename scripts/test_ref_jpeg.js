const sharp = require('sharp');

async function testRefJpeg() {
  const meta = await sharp('reference_design.jpeg').metadata();
  console.log('reference_design.jpeg width:', meta.width, 'height:', meta.height);
  
  // Sample y = 500 across width:
  const row = await sharp('reference_design.jpeg')
    .extract({ left: 0, top: 500, width: meta.width, height: 1 })
    .raw()
    .toBuffer();
    
  console.log('Sampling x at 100, 500, 1000, 1200:');
  [100, 500, 1000, 1200].forEach(x => {
    console.log(`x=${x}: RGB(${row[x*3]}, ${row[x*3+1]}, ${row[x*3+2]})`);
  });
}
testRefJpeg();
