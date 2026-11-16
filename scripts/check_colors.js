const sharp = require('sharp');

async function checkColors() {
  const { data, info } = await sharp('images.jpg').raw().toBuffer({ resolveWithObject: true });
  // Center pixel:
  const cx = Math.floor(info.width / 2);
  const cy = Math.floor(info.height / 2);
  const idx = (cy * info.width + cx) * info.channels;
  console.log('images.jpg center pixel RGB:', data[idx], data[idx+1], data[idx+2]);

  // Top-left pixel:
  console.log('images.jpg top-left pixel RGB:', data[0], data[1], data[2]);

  // reference_design.jpeg center pixel:
  const ref = await sharp('reference_design.jpeg').raw().toBuffer({ resolveWithObject: true });
  const rcx = Math.floor(ref.info.width / 2);
  const rcy = Math.floor(ref.info.height / 2);
  const ridx = (rcy * ref.info.width + rcx) * ref.info.channels;
  console.log('reference_design center pixel RGB:', ref.data[ridx], ref.data[ridx+1], ref.data[ridx+2]);
  console.log('reference_design top-left RGB:', ref.data[0], ref.data[1], ref.data[2]);
}
checkColors();
