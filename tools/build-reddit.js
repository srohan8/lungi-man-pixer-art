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
// audioSet 'generated': every track is an ElevenLabs one. The five tracks that were replaced by Pixabay ones in the main
// build come back from assets/audio/music-old (same file names), and the Pixabay bike engine recordings are left out
// (the game then uses its built-in synthesised engine).
for (const n of ['bgm_act5', 'bgm_disco', 'bgm_bike', 'bgm_boss_komban', 'bgm_finale']) {
  fs.copyFileSync(path.join(root, 'assets', 'audio', 'music-old', n + '_elevenlabs.ogg'), path.join(pub, 'assets', 'audio', 'music', n + '.ogg'));
}
for (const n of ['bike_start', 'bike_loop']) fs.rmSync(path.join(pub, 'assets', 'audio', 'sfx', n + '.ogg'), { force: true });
// English only for now: leave out the Malayalam translations and font (profile.languages)
fs.rmSync(path.join(pub, 'assets', 'lang'), { recursive: true, force: true });
fs.rmSync(path.join(pub, 'assets', 'fonts', 'NotoSansMalayalam.ttf'), { force: true });
// Reddit's webview may refuse inline <script>/<style>, so move them into game.js / game.css.
let html = fs.readFileSync(path.join(www, 'index.html'), 'utf8');
// Platform profile read by index.html (see PLAT): the Reddit build is the short game and may rotate in portrait.
const profile = { platform: 'reddit', actLength: 'short', rotateInPortrait: true, languages: ['en'], audioSet: 'generated' };
let js = 'window.PLATFORM = ' + JSON.stringify(profile) + ';' + String.fromCharCode(10), css = '';
html = html.replace('<script src="assets/lang/ml.js"></script>', '');
html = html.replace(/<script>([\s\S]*?)<\/script>/g, (m, body) => { js += body + '\n;\n'; return '<script src="game.js"></script>'; });
html = html.replace(/<style>([\s\S]*?)<\/style>/g, (m, body) => { css += body + '\n'; return '<link rel="stylesheet" href="game.css">'; });
// A pulsing LOADING text shows until the game's canvas draws its first frame over it (it sits behind the game layers).
html = html.replace('<div id="stage">', '<div id="boot">LOADING</div><div id="stage">');
fs.writeFileSync(path.join(pub, 'game.html'), html);
fs.writeFileSync(path.join(pub, 'game.js'), js);
css += '#boot{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;font:700 16px "Trebuchet MS",Verdana,sans-serif;letter-spacing:.25em;color:#f0c040;animation:bootp .9s infinite alternate}@keyframes bootp{from{opacity:.35}to{opacity:1}}\n';
fs.writeFileSync(path.join(pub, 'game.css'), css);
console.log('reddit/public ready: game.html + game.js + game.css + assets/');
