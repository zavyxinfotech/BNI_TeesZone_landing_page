const sharp = require('sharp');

async function testWhatIsRef() {
  // Let's sample colors in reference_design.jpeg:
  // Is reference_design.jpeg the entire landing page image or a screenshot?
  // Let's check aspect ratio: 1312 / 1199 = 1.094
  // If it's 1312 wide and 1199 tall, what is at the bottom?
  // At the bottom of reference_design.jpeg, what is at y = 1150?
  const stats = await sharp('reference_design.jpeg').extract({ left: 100, top: 1100, width: 200, height: 50 }).stats();
  console.log('Stats at bottom of reference_design:', stats.channels.map(c => Math.round(c.mean)));
}
testWhatIsRef();
