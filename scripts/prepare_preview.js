const fs = require('fs');
const sharp = require('sharp');

async function test() {
  // Let's copy reference_design.jpeg and images.jpg to public/ so we can inspect or serve
  fs.copyFileSync('reference_design.jpeg', 'public/reference_design.jpeg');
  fs.copyFileSync('images.jpg', 'public/images.jpg');
  
  // Let's create an HTML report in public/inspect.html
  const html = `<!DOCTYPE html>
<html>
<head><title>Visual Inspection</title></head>
<body style="background:#222; color:#fff; font-family:sans-serif; padding:20px;">
  <h2>images.jpg (516 x 387)</h2>
  <img src="images.jpg" style="max-width:500px; border:1px solid #444;" />
  <h2>reference_design.jpeg (1312 x 1199)</h2>
  <img src="reference_design.jpeg" style="max-width:1000px; border:1px solid #444;" />
</body>
</html>`;
  fs.writeFileSync('public/inspect.html', html);
  console.log('inspect.html created');
}
test();
