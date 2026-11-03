// Captures native-resolution frames from the running game into public/shots/*.png.
// Start the game first (npm start in the repo root, port 3000), then: npm run shots
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const CHROME = path.join(__dirname, 'node_modules/.remotion/chrome-headless-shell/win64/chrome-headless-shell-win64/chrome-headless-shell.exe');
const URL = process.env.GAME_URL || 'http://localhost:3000/';
const OUT = path.join(__dirname, 'public/shots');

// Run inside the game page. Every shot is one synchronous call so the game's own loop cannot interfere.
const shot = (name, setup, frames, clean) => ({ name, code: `(()=>{${setup};for(let i=0;i<${frames};i++)update();${clean ? 'banner=null;dlg=null;' : ''}tick=tick-tick%6+4;draw();return document.querySelector('canvas').toDataURL('image/png')})()` });
const idx = key => `LV.findIndex(l=>l.key==='${key}')`;
const mid = (key, x) => `loadLevel(${idx(key)});placePlayer(40);state='play';banner=null;dlg=null;P.inv=99999;P.x=${x};P.y=GY-40;P.vy=0;camx=P.x-W*.38`;
const boss = key => `loadLevel(${idx(key)});placePlayer(40);state='play';dlg=null;P.inv=99999;P.x=bossX+W*.25;P.y=GY-40;P.vy=0;camx=bossX`;

const SHOTS = [
  shot('title', `splashT=0;state='title'`, 150),
  shot('pro', mid('pro', 520), 20, true),
  shot('a1', mid('a1', 700), 20, true),
  shot('bike', mid('bike', 600), 20, true),
  shot('a2', mid('a2', 900), 20, true),
  shot('a3', mid('a3', 900), 20, true),
  shot('disco', `loadLevel(${idx('disco')});placePlayer(40);state='play';banner=null;dlg=null;P.inv=99999`, 400),
  shot('a4', mid('a4', 900), 20, true),
  shot('path', mid('path', 700), 20, true),
  shot('a5', mid('a5', 900), 20, true),
  ...['a1', 'a2', 'a3', 'a4', 'a5'].flatMap(k => [
    shot(`boss_${k}_intro`, boss(k), 45),
    shot(`boss_${k}_fight`, boss(k), 230),
  ]),
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 540 });
  page.on('pageerror', e => console.log('page error:', e.message));
  await page.goto(URL, { waitUntil: 'load' });
  await new Promise(r => setTimeout(r, 1500));
  for (const s of SHOTS) {
    try {
      const url = await page.evaluate(s.code);
      fs.writeFileSync(path.join(OUT, s.name + '.png'), Buffer.from(url.split(',')[1], 'base64'));
      console.log('saved', s.name);
    } catch (e) { console.log('FAILED', s.name, e.message.split('\n')[0]); }
  }
  await browser.close();
})();
