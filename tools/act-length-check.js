// Checks the actLength rule (CLAUDE.md, Game length). No dependencies. Usage: node tools/act-length-check.js
//  1. 'short' must give the original layouts (checkpoint lamps of the tag v0.9-full-story).
//  2. 'short' and 'long' must carry exactly the same story data (banners, dialogue, cameos) for every level: actLength never touches story.
// It loads index.html twice in separate processes (one per actLength) and prints a layout summary per level.
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const mode = process.env.ACT_LENGTH_CHILD;
if (!mode) {
  const run = m => execFileSync(process.execPath, [__filename], { env: { ...process.env, ACT_LENGTH_CHILD: m }, encoding: 'utf8' }).trim().split('\n').map(l => JSON.parse(l));
  const S = run('short'), L = run('long');
  const TAG = { a1: '1382,2514,3208', a2: '1427,2568,3341', a3: '1451,2287,3554', a4: '1385,2270,3513', a5: '1543,2929,3627' };
  let bad = 0;
  S.forEach((s, i) => {
    const l = L[i];
    const tagOk = !TAG[s.key] || s.lamps.slice(0, 3).join(',') === TAG[s.key];
    const storyOk = s.story === l.story;
    if (!tagOk || !storyOk) bad++;
    console.log((s.key + '     ').slice(0, 5), 'short bossX', String(s.bossX).padEnd(5), 'stalls', String(s.lamps.length).padEnd(2), 'enemies', String(s.enemies).padEnd(3), '| long bossX', String(l.bossX).padEnd(5), 'stalls', String(l.lamps.length).padEnd(2), 'enemies', String(l.enemies).padEnd(3), '| short=tag', tagOk ? 'yes' : 'NO', '| story same', storyOk ? 'yes' : 'NO');
  });
  console.log(bad ? 'FAIL' : 'OK');
  process.exitCode = bad ? 1 : 0;
} else {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  const js = html.match(/<script>([\s\S]*)<\/script>/)[1];
  const ctx = () => ({ imageSmoothingEnabled: false, measureText: () => ({ width: 5 }), fillText() {}, strokeText() {}, clearRect() {}, setTransform() {}, createImageData: (w, h) => ({ data: new Uint8ClampedArray(w * h * 4) }), putImageData() {}, drawImage() {}, fillRect() {}, save() {}, restore() {}, translate() {}, scale() {}, rotate() {}, beginPath() {}, arc() {}, fill() {}, stroke() {}, moveTo() {}, lineTo() {}, closePath() {}, clip() {}, rect() {}, getImageData: (x, y, w, h) => ({ data: new Uint8ClampedArray(w * h * 4) }), createLinearGradient: () => ({ addColorStop() {} }), createRadialGradient: () => ({ addColorStop() {} }), globalAlpha: 1 });
  const el = () => ({ width: 0, height: 0, style: {}, getContext: ctx, addEventListener() {}, classList: { add() {}, remove() {} }, dataset: {}, setPointerCapture() {} });
  global.document = { addEventListener() {}, hidden: false, getElementById: el, createElement: el, querySelectorAll: () => [], documentElement: {}, fullscreenElement: null };
  global.window = global; global.innerWidth = 844; global.innerHeight = 390;
  global.matchMedia = () => ({ matches: false }); global.addEventListener = () => {};
  global.localStorage = { getItem: () => 0, setItem() {} }; global.requestAnimationFrame = () => {};
  global.PLATFORM = { actLength: mode };
  eval(js + `
seen = true; score = 0; lives = 4;
for (let i = 0; i < LV.length; i++) { if (LV[i].arena || LV[i].bike) continue;
  try { begin(i, 40); } catch (e) {}
  const L = LV[i];
  console.log(JSON.stringify({ key: L.key, bossX: Math.round(bossX), enemies: enemies.length, lamps: lamps.map(l => Math.round(l)),
    story: require('crypto').createHash('md5').update(JSON.stringify([L.act, L.name, L.clear, L.sayStart, L.sayChai, L.sayAt, L.sayBoss, L.sayClear, L.cameos, L.tut, L.mav, banner, dlg && [dlg.who, dlg.text], pendSay])).digest('hex') })); }
`);
}
