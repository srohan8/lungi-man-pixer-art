// Fills reddit/public with the game for the Devvit app: game.html (= index.html) and assets/.
// Reuses tools/build-www.js (same file filter as the Android build), then copies www/ over.
// Run: node tools/build-reddit.js   (the reddit/ npm scripts call it before building)
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.join(__dirname, '..');
const www = path.join(root, 'www');
const pub = path.join(root, 'reddit', 'public');

execFileSync(process.execPath, [path.join(__dirname, 'build-www.js')], { stdio: 'inherit' });

fs.rmSync(path.join(pub, 'assets'), { recursive: true, force: true });
fs.cpSync(path.join(www, 'assets'), path.join(pub, 'assets'), { recursive: true });
// Reddit's webview may refuse inline <script>/<style>, so move them into game.js / game.css.
let html = fs.readFileSync(path.join(www, 'index.html'), 'utf8');
// Platform profile read by index.html (see PLAT): the Reddit build is the short game and may rotate in portrait.
const profile = { platform: 'reddit', short: true, rotateInPortrait: true };
let js = 'window.PLATFORM = ' + JSON.stringify(profile) + ';' + String.fromCharCode(10), css = '';
html = html.replace(/<script>([\s\S]*?)<\/script>/g, (m, body) => { js += body + '\n;\n'; return '<script src="game.js"></script>'; });
html = html.replace(/<style>([\s\S]*?)<\/style>/g, (m, body) => { css += body + '\n'; return '<link rel="stylesheet" href="game.css">'; });
fs.writeFileSync(path.join(pub, 'game.html'), html);
fs.writeFileSync(path.join(pub, 'game.js'), js);
fs.writeFileSync(path.join(pub, 'game.css'), css);
console.log('reddit/public ready: game.html + game.js + game.css + assets/');
