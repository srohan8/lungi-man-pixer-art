// Cuts the disco dancer sheets into game sprites: six characters per sheet.
//   node tools/make-dancers.js <scratch-dir>
// The sheets have a checkerboard or white background baked into the pixels. Background = neutral grey/white/black or nearly
// transparent pixels connected to the sheet border; the dancers' lavender trousers and dark purple outlines are not neutral, so they stay.
// Writes assets/art/bosses/dc1_0..5, dc2_0..5 (calm poses) and da1_0..5, da2_0..5, da3_0..5 (possessed poses), 20x30 each.
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const cp = require('child_process');

const REF = path.join(__dirname, '..', 'assets', 'reference');
const OUT = path.join(__dirname, '..', 'assets', 'art', 'bosses');
const TMP = process.argv[2];
if (!TMP) { console.log('usage: node tools/make-dancers.js <scratch-dir>'); process.exit(1) }
fs.mkdirSync(TMP, { recursive: true });

const SHEETS = [['bg_disco_crowd-dance-1.png', 'dc1'], ['bg_disco_crowd-dance-2.png', 'dc2'],
  ['bg_disco_crowd-dance-angry-1.png', 'da1'], ['bg_disco_crowd-dance-angry-2.png', 'da2'], ['bg_disco_crowd-dance-angry-3.png', 'da3']];

(async () => {
  for (const [file, name] of SHEETS) {
    const { data, info } = await sharp(path.join(REF, file)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const W = info.width, H = info.height, px = Buffer.from(data);
    const isBg = i => px[i + 3] < 200 || (Math.max(px[i], px[i + 1], px[i + 2]) - Math.min(px[i], px[i + 1], px[i + 2]) < 10);
    const seen = new Uint8Array(W * H), st = [];
    for (let x = 0; x < W; x++) { st.push(x, 0, x, H - 1) } for (let y = 0; y < H; y++) { st.push(0, y, W - 1, y) }
    while (st.length) { const y = st.pop(), x = st.pop(); if (x < 0 || y < 0 || x >= W || y >= H) continue; const k = y * W + x; if (seen[k]) continue; const i = k * 4; if (!isBg(i)) continue; seen[k] = 1; px[i + 3] = 0; st.push(x + 1, y, x - 1, y, x, y + 1, x, y - 1) }
    // column occupancy, then the quietest column near each expected boundary
    const occ = new Int32Array(W); for (let x = 0; x < W; x++) for (let y = 0; y < H; y++) if (px[(y * W + x) * 4 + 3] > 200) occ[x]++;
    const cuts = [0]; for (let k = 1; k < 6; k++) { const e = Math.round(k * W / 6); let best = e, bv = 1e9; for (let x = e - 90; x <= e + 90; x++) { const v = occ[x] * 10 + Math.abs(x - e) * .01; if (v < bv) { bv = v; best = x } } cuts.push(best) } cuts.push(W);
    for (let k = 0; k < 6; k++) {
      const x0 = cuts[k], x1 = cuts[k + 1];
      const crop = path.join(TMP, `${name}_${k}_src.png`);
      await sharp(px, { raw: { width: W, height: H, channels: 4 } }).extract({ left: x0, top: 0, width: x1 - x0, height: H }).png().toFile(crop);
      cp.execFileSync('node', [path.join(__dirname, 'make-sprite.js'), crop, `${name}_${k}`, '20', '30', '28', '--solo', '--solo-alpha', '200'], { stdio: 'pipe' });
      fs.renameSync(path.join(OUT, `${name}_${k}_0.png`), path.join(OUT, `${name}_${k}.png`));
    }
    console.log(file, '->', name + '_0..5', 'cuts', cuts.join(','));
  }
})();
