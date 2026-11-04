// Copies the game into www/ for Capacitor. Skips spare takes (*_a.mp3, *_b.mp3, *_v2.mp3) to keep the app small.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const out = path.join(root, 'www');
const skip = /_(a|b|v2).mp3$|_loop_only.ogg$|_sheet.png$/;
const skipDirs = new Set(['reference', 'music-old']);

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
fs.copyFileSync(path.join(root, 'index.html'), path.join(out, 'index.html'));

let count = 0, bytes = 0;
(function copy(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name), d = path.join(dst, e.name);
    if (e.isDirectory()) { if (!skipDirs.has(e.name)) copy(s, d); }
    else if (!skip.test(e.name)) { fs.copyFileSync(s, d); count++; bytes += fs.statSync(s).size; }
  }
})(path.join(root, 'assets'), path.join(out, 'assets'));

console.log(`www ready: index.html + ${count} asset files (${(bytes / 1048576).toFixed(1)} MB)`);
