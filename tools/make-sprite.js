// Turns a high-resolution character sheet (transparent background, poses laid out in a grid) into game-size pixel sprites.
//   node tools/make-sprite.js <sheet.png> <out-name> <width> <height> [colors=24] [--same-scale] [--row N] [--list]
// Writes assets/art/bosses/<out-name>_<i>.png, one per pose in reading order (top row first, then left to right).
//   --same-scale  all poses share one scale (the biggest pose fills the frame), so a dog stays smaller than a bull
//   --row N       only use poses from row N (0 = top), for sheets that repeat the same poses in several rows
//   --merge N     how far apart pieces may be and still count as one pose (default 6, in 8 px cells; use 2 for tight grids)
//   --order a,b,c write pose a as _0, pose b as _1 ... (to match the game's frame order)
//   --clip i,f    keep only the top fraction f of pose i (when a stray piece sits underneath it), counted before --order
//   --grid C,R    the sheet is an even grid of C columns and R rows: cut by cell instead of finding pieces (reliable for run cycles)
//   --list        only print what was found
// Steps: find each pose (2D, small gaps such as flames and sparks are merged), shrink to fit with the feet on the bottom edge,
// hard-edge the alpha, limit the palette, add the 1 px dark outline.
// Development tool only: the game itself loads the finished PNGs and needs nothing installed.
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = n => args.includes('--' + n);
const opt = n => { const i = args.indexOf('--' + n); return i >= 0 ? args[i + 1] : undefined };
const pos = args.filter((a, i) => !a.startsWith('--') && !(i > 0 && ['--row', '--merge', '--order', '--clip', '--grid'].includes(args[i - 1])));
const [sheet, name, W, H, COLORS = '24'] = pos;
const w = +W, h = +H, colors = +COLORS;
if (!sheet || !name || !w || !h) { console.log('usage: node tools/make-sprite.js <sheet.png> <out-name> <width> <height> [colors] [--same-scale] [--row N] [--list]'); process.exit(1) }

const OUT = path.join(__dirname, '..', 'assets', 'art', 'bosses');
const OUTLINE = [0x12, 0x0a, 0x1c];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const { data, info } = await sharp(sheet).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const SW = info.width, SH = info.height;

  // coarse mask (cells of 8 px), dilated so flames and sparks join their figure, then connected components
  const C = 8, cw = Math.ceil(SW / C), ch = Math.ceil(SH / C);
  const mask = new Uint8Array(cw * ch);
  for (let y = 0; y < SH; y += 2) for (let x = 0; x < SW; x += 2) if (data[(y * SW + x) * 4 + 3] > 24) mask[((y / C) | 0) * cw + ((x / C) | 0)] = 1;
  const R = +(opt('merge') ?? 6), dil = new Uint8Array(cw * ch);
  for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) if (mask[y * cw + x])
    for (let dy = -R; dy <= R; dy++) for (let dx = -R; dx <= R; dx++) { const X = x + dx, Y = y + dy; if (X >= 0 && Y >= 0 && X < cw && Y < ch) dil[Y * cw + X] = 1 }
  const label = new Int32Array(cw * ch); let n = 0; const comps = [];
  for (let s = 0; s < cw * ch; s++) {
    if (!dil[s] || label[s]) continue;
    n++; const st = [s]; label[s] = n; const c = { id: n, x0: cw, y0: ch, x1: 0, y1: 0, cells: 0 };
    while (st.length) { const p = st.pop(), px = p % cw, py = (p / cw) | 0;
      if (mask[p]) { c.cells++; c.x0 = Math.min(c.x0, px); c.x1 = Math.max(c.x1, px); c.y0 = Math.min(c.y0, py); c.y1 = Math.max(c.y1, py) }
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const X = px + dx, Y = py + dy, q = Y * cw + X;
        if (X >= 0 && Y >= 0 && X < cw && Y < ch && dil[q] && !label[q]) { label[q] = n; st.push(q) } } }
    comps.push(c);
  }
  // drop specks (a lone sparkle), turn into pixel boxes
  let poses = comps.filter(c => c.cells > 120 && (c.x1 - c.x0 + 1) * C > SW * 0.05).map(c => ({ x0: c.x0 * C, x1: (c.x1 + 1) * C, y0: c.y0 * C, y1: (c.y1 + 1) * C, cells: c.cells }));
  // reading order: group into rows by vertical centre, then left to right
  poses.sort((a, b) => (a.y0 + a.y1) - (b.y0 + b.y1));
  const medH = poses.map(p => p.y1 - p.y0).sort((a, b) => a - b)[poses.length >> 1] || 1;
  const rows = [];
  for (const p of poses) { const cy = (p.y0 + p.y1) / 2; const r = rows.find(r => Math.abs(r.cy - cy) < medH * 0.6); if (r) { r.items.push(p); r.cy = (r.cy * (r.items.length - 1) + cy) / r.items.length } else rows.push({ cy, items: [p] }) }
  rows.sort((a, b) => a.cy - b.cy);
  rows.forEach(r => r.items.sort((a, b) => a.x0 - b.x0));
  let ordered = rows.map(r => r.items);
  if (opt('grid')) { const [gc, gr] = opt('grid').split(',').map(Number); ordered = [];
    for (let r = 0; r < gr; r++) { const row = []; for (let c = 0; c < gc; c++) row.push({ x0: Math.floor(c * SW / gc), x1: Math.floor((c + 1) * SW / gc), y0: Math.floor(r * SH / gr), y1: Math.floor((r + 1) * SH / gr) }); ordered.push(row) } }
  console.log(`${path.basename(sheet)} ${SW}x${SH}: ${ordered.length} row(s) of ${ordered.map(r => r.length).join(' + ')} pose(s)`);
  if (opt('row') !== undefined) ordered = [ordered[+opt('row')] || []];
  poses = ordered.flat();
  if (opt('clip')) { const [ci, cf] = opt('clip').split(','); const q = poses[+ci]; q.y1 = q.y0 + Math.round((q.y1 - q.y0) * +cf) }
  if (opt('order')) poses = opt('order').split(',').map(i => poses[+i]);
  if (flag('list')) { poses.forEach((p, i) => console.log(' ', i, `${p.x1 - p.x0}x${p.y1 - p.y0}`)); return }

  // tight pixel bounds of each pose inside its box
  const solid = (x, y) => data[(y * SW + x) * 4 + 3] > 24;
  for (const p of poses) {
    let x0 = p.x1, x1 = p.x0, y0 = p.y1, y1 = p.y0;
    for (let y = p.y0; y < Math.min(SH, p.y1); y += 2) for (let x = p.x0; x < Math.min(SW, p.x1); x += 2) if (solid(x, y)) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y }
    Object.assign(p, { x0, x1, y0, y1, pw: x1 - x0 + 1, ph: y1 - y0 + 1 });
  }
  const sameScale = flag('same-scale');
  const k = Math.min(...poses.map(p => Math.min((w - 2) / p.pw, (h - 2) / p.ph)));

  for (let i = 0; i < poses.length; i++) {
    const p = poses[i];
    const crop = await sharp(sheet).ensureAlpha().extract({ left: p.x0, top: p.y0, width: p.pw, height: p.ph }).toBuffer();
    const scale = sameScale ? k : Math.min((w - 2) / p.pw, (h - 2) / p.ph);
    const tw = Math.max(1, Math.round(p.pw * scale)), th = Math.max(1, Math.round(p.ph * scale));
    const resized = await sharp(crop).resize({ width: tw, height: th, kernel: 'lanczos3' }).modulate({ saturation: 1.25, brightness: 1.1 }).sharpen({ sigma: 0.7 }).toBuffer();
    // feet on the bottom edge (1 px border for the outline), centred
    const left = Math.round((w - tw) / 2), top = h - 1 - th;
    const placed = await sharp({ create: { width: w, height: h, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
      .composite([{ input: resized, left, top }]).raw().toBuffer();
    const px = Buffer.from(placed);
    for (let q = 0; q < w * h; q++) px[q * 4 + 3] = px[q * 4 + 3] > 110 ? 255 : 0;
    const op = (x, y) => x >= 0 && y >= 0 && x < w && y < h && px[(y * w + x) * 4 + 3] === 255;
    const edge = [];
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (!op(x, y) && (op(x + 1, y) || op(x - 1, y) || op(x, y + 1) || op(x, y - 1))) edge.push((y * w + x) * 4);
    for (const o of edge) { px[o] = OUTLINE[0]; px[o + 1] = OUTLINE[1]; px[o + 2] = OUTLINE[2]; px[o + 3] = 255 }
    const file = path.join(OUT, `${name}_${i}.png`);
    await sharp(px, { raw: { width: w, height: h, channels: 4 } }).png({ palette: true, colors }).toFile(file);
    console.log('  wrote', path.relative(process.cwd(), file), `${w}x${h} (pose ${p.pw}x${p.ph})`);
  }
})();
