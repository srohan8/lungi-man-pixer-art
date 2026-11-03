// Turns a painted background reference into a game-size scene backdrop: centre-cropped to 640x270, limited palette.
//   node tools/make-backdrop.js <input.png> <out-name> [colors=48]
// Writes assets/art/bg/<out-name>.png. Development tool only.
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const [input, name, colors = '48'] = process.argv.slice(2);
if (!input || !name) { console.log('usage: node tools/make-backdrop.js <input.png> <out-name> [colors]'); process.exit(1) }
const out = path.join(__dirname, '..', 'assets', 'art', 'bg');
fs.mkdirSync(out, { recursive: true });
sharp(input).resize({ width: 640, height: 270, fit: 'cover', position: 'centre', kernel: 'lanczos3' })
  .modulate({ saturation: 1.1 }).png({ palette: true, colors: +colors, dither: 0.6 })
  .toFile(path.join(out, name + '.png')).then(i => console.log('wrote', name, (i.size / 1024).toFixed(0) + ' KB'));
