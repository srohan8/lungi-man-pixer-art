// Turns the reference rider on the Bullet into Kannan: afro, aviators, mustache, bare chest, satchel strap; mundu stays white.
// Input: a bike_0.png produced by make-sprite.js (56x34). Output overwrites assets/art/bosses/bike_0.png.
//   node tools/kannan-on-bike.js <base.png>
const sharp = require('sharp');
const path = require('path');
(async () => {
  const src = process.argv[2];
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height, px = Buffer.from(data);
  const at = (x, y) => (y * w + x) * 4;
  const set = (x, y, hex) => { if (x < 0 || y < 0 || x >= w || y >= h) return; const i = at(x, y); px[i] = parseInt(hex.slice(1, 3), 16); px[i + 1] = parseInt(hex.slice(3, 5), 16); px[i + 2] = parseInt(hex.slice(5, 7), 16); px[i + 3] = 255 };
  const opaque = (x, y) => x >= 0 && y >= 0 && x < w && y < h && px[at(x, y) + 3] === 255;
  // 1. bare chest: the white tank top becomes brown skin (two tones for a little shading)
  for (let y = 9; y <= 16; y++) for (let x = 16; x <= 27; x++) { const i = at(x, y); if (px[i + 3] && px[i] > 170 && px[i + 1] > 160 && px[i + 2] > 140) set(x, y, (x + y) % 3 ? '#b06a40' : '#c47a4a') }
  // 1b. the mundu is folded above the knee: shin and foot are bare skin, only the thigh stays white
  for (let y = 20; y <= 28; y++) for (let x = 23; x <= 30; x++) { const i = at(x, y); if (px[i + 3] && px[i] > 165 && px[i + 1] > 150 && px[i + 2] > 130) set(x, y, (x + y) % 3 ? '#a8623a' : '#bc7444') }
  // 2. afro behind and above the head (face stays on the right side)
  for (let y = 1; y <= 10; y++) for (let x = 22; x <= 32; x++) { const dx = x - 27.5, dy = y - 5.8; if (dx * dx / 18 + dy * dy / 12 <= 1 && !(x >= 29 && y >= 7) ) set(x, y, (x * 3 + y) % 7 === 0 ? '#2a1a14' : '#150c0a') }
  // 3. aviators and mustache
  set(30, 7, '#d8b048'); set(31, 7, '#6a8a30'); set(32, 7, '#d8b048'); set(31, 9, '#150c0a'); set(32, 9, '#150c0a');
  // 4. satchel strap across the chest and a small pouch with the green coconut at the hip
  for (let k = 0; k <= 6; k++) set(25 - k, 10 + k, '#5a3418');
  for (let y = 17; y <= 19; y++) for (let x = 18; x <= 21; x++) set(x, y, '#6a3c20');
  set(19, 17, '#6ab040'); set(20, 17, '#8ad050');
  // 5. dark outline round anything new
  const add = [];
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (!opaque(x, y) && (opaque(x + 1, y) || opaque(x - 1, y) || opaque(x, y + 1) || opaque(x, y - 1))) add.push([x, y]);
  for (const [x, y] of add) set(x, y, '#120a1c');
  const out = path.join(__dirname, '..', 'assets', 'art', 'bosses', 'bike_0.png');
  await sharp(px, { raw: { width: w, height: h, channels: 4 } }).png({ palette: true, colors: 32 }).toFile(out);
  console.log('wrote', path.relative(process.cwd(), out));
})();
