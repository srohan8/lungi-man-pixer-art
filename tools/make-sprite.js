// Turns a high-resolution character sheet (transparent background, poses side by side) into game-size pixel sprites.
//   node tools/make-sprite.js <sheet.png> <out-name> <width> <height> [colors=20]
// Writes assets/art/bosses/<out-name>_0.png, _1.png ... one per pose, left to right.
// Steps: find each pose, shrink to fit (feet on the bottom edge), hard-edge the alpha, limit the palette, add the 1 px dark outline.
// Development tool only: the game itself loads the finished PNGs and needs nothing installed.
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const [sheet, name, W, H, COLORS = '20'] = process.argv.slice(2);
const w = +W, h = +H, colors = +COLORS;
if (!sheet || !name || !w || !h) { console.log('usage: node tools/make-sprite.js <sheet.png> <out-name> <width> <height> [colors]'); process.exit(1); }

const OUT = path.join(__dirname, '..', 'assets', 'art', 'bosses');
const OUTLINE = [0x12, 0x0a, 0x1c];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const { data, info } = await sharp(sheet).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const SW = info.width, SH = info.height;
  const solid = (x, y) => data[(y * SW + x) * 4 + 3] > 24;

  // pose blobs: runs of occupied columns, merged when the gap is small (flames and sparks sit close to the figure)
  const col = new Uint8Array(SW);
  for (let x = 0; x < SW; x++) for (let y = 0; y < SH; y += 2) if (solid(x, y)) { col[x] = 1; break; }
  const GAP = Math.round(SW * 0.03);
  const blobs = []; let start = -1, last = -1;
  for (let x = 0; x < SW; x++) if (col[x]) { if (start < 0) start = x; else if (x - last > GAP) { blobs.push([start, last]); start = x } last = x; }
  if (start >= 0) blobs.push([start, last]);
  const poses = blobs.filter(([a, b]) => b - a > SW * 0.06);
  console.log(`${path.basename(sheet)} ${SW}x${SH}: ${poses.length} pose(s)`);

  for (let i = 0; i < poses.length; i++) {
    const [x0, x1] = poses[i];
    let y0 = SH, y1 = 0;
    for (let y = 0; y < SH; y++) for (let x = x0; x <= x1; x += 2) if (solid(x, y)) { if (y < y0) y0 = y; if (y > y1) y1 = y; break; }
    const crop = await sharp(sheet).ensureAlpha().extract({ left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 }).toBuffer();
    // fit inside (w-2) x (h-2): the 1 px border is for the outline
    const small = await sharp(crop)
      .resize({ width: w - 2, height: h - 2, fit: 'contain', position: 'bottom', background: { r: 0, g: 0, b: 0, alpha: 0 }, kernel: 'lanczos3' })
      .modulate({ saturation: 1.25, brightness: 1.1 }).sharpen({ sigma: 0.7 })
      .extend({ top: 1, bottom: 1, left: 1, right: 1, background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .raw().toBuffer();
    // hard alpha, then 1 px outline on transparent pixels that touch the figure
    const px = Buffer.from(small);
    for (let k = 0; k < w * h; k++) px[k * 4 + 3] = px[k * 4 + 3] > 110 ? 255 : 0;
    const op = (x, y) => x >= 0 && y >= 0 && x < w && y < h && px[(y * w + x) * 4 + 3] === 255;
    const edge = [];
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (!op(x, y) && (op(x + 1, y) || op(x - 1, y) || op(x, y + 1) || op(x, y - 1))) edge.push((y * w + x) * 4);
    for (const o of edge) { px[o] = OUTLINE[0]; px[o + 1] = OUTLINE[1]; px[o + 2] = OUTLINE[2]; px[o + 3] = 255 }
    const file = path.join(OUT, `${name}_${i}.png`);
    await sharp(px, { raw: { width: w, height: h, channels: 4 } }).png({ palette: true, colors }).toFile(file);
    console.log('  wrote', path.relative(process.cwd(), file), `${w}x${h}`);
  }
})();
