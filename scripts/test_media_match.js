const sharp = require('sharp');

async function testMatchMedia() {
  const media = 'C:/Users/vasuk/.gemini/antigravity/brain/7c3c1334-4db9-47ef-825c-11d697671623/.user_uploaded/media_1794808224764_029ca947.jpg';
  const mMeta = await sharp(media).metadata();
  console.log('Media meta:', mMeta);

  // Let's divide media into 6 slices as well and compare:
  const sliceH = Math.floor(mMeta.height / 6);
  for (let i = 0; i < 6; i++) {
    const s = await sharp(media).extract({ left: 0, top: i * sliceH, width: mMeta.width, height: sliceH }).stats();
    console.log(`Media Slice ${i}: mean RGB =`, s.channels.map(c => Math.round(c.mean)));
  }
}
testMatchMedia();
