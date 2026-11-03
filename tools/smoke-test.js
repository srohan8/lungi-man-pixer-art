// Headless smoke test: plays the game with a simple bot and checks every level can be cleared.
// No dependencies. Usage:
//   node tools/smoke-test.js                 full playthrough, bot cannot die (finds crashes and soft-locks)
//   node tools/smoke-test.js --mortal        bot can die (rough difficulty signal only, bosses need a smarter bot)
//   node tools/smoke-test.js --from 5 --only start at level index 5 and stop when it is cleared
const fs = require('fs'), path = require('path');
const args = process.argv.slice(2);
const mortal = args.includes('--mortal');
const from = args.includes('--from') ? +args[args.indexOf('--from') + 1] : 0;
const only = args.includes('--only');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const js = html.match(/<script>([\s\S]*)<\/script>/)[1];

const ctx = () => ({ imageSmoothingEnabled: false, createImageData: (w, h) => ({ data: new Uint8ClampedArray(w * h * 4) }), putImageData() {}, drawImage() {}, fillRect() {}, save() {}, restore() {}, translate() {}, scale() {}, set fillStyle(v) {}, set globalCompositeOperation(v) {} });
const el = () => ({ width: 0, height: 0, style: {}, getContext: ctx, addEventListener() {}, classList: { add() {}, remove() {} }, dataset: {}, setPointerCapture() {} });
global.document = { getElementById: el, createElement: el, querySelectorAll: () => [], documentElement: {}, fullscreenElement: null };
global.window = global; global.innerWidth = 844; global.innerHeight = 390;
global.matchMedia = () => ({ matches: false }); global.addEventListener = () => {};
global.localStorage = { getItem: () => 0, setItem() {} }; global.requestAnimationFrame = () => {};

eval(js + `
seen = true; score = 0; lives = 4;
console.log('levels:', LV.map((l, i) => i + ':' + l.key).join('  '));
begin(${from}, 40); keys.KeyX = true;
let lastL = -1, deaths = 0, lastState = '', grabs = 0, wasV = false, ok = false;
for (let f = 0; f < 400000; f++) {
  if (state === 'dead' && lastState !== 'dead') deaths++;
  if (state === 'dead') lives = 4;
  lastState = state;
  const L = LV[lvl];
  if (L.arena) {                                   // dance arena: walk toward the nearest hostile dancer, hop when close
    const n = enemies.filter(e => e.alive && e.t === 'dancer' && !e.calm).sort((a, b) => Math.abs(a.x - P.x) - Math.abs(b.x - P.x))[0];
    keys.ArrowRight = !!(n && n.x > P.x + 30); keys.ArrowLeft = !!(n && n.x < P.x - 30);
    keys.Space = !!(n && Math.abs(n.x - P.x) < 46 && P.on);
  } else {                                         // everything else: run right, jump at gap edges, pulse jump in boss arenas
    keys.ArrowRight = !locked || P.x < bossX + 80; keys.ArrowLeft = false;
    const sg = segs.find(s => P.x >= s[0] - 14 && P.x < s[1]);
    keys.Space = !!((sg && P.x + P.w > sg[1] - 12) || !P.on || (locked && f % 30 < 10));
  }
  if (!${mortal} && P && state === 'play') P.inv = Math.max(P.inv, 2);
  update(); if (f % 9 === 0) draw();               // draw() too, so rendering bugs show up
  if (P && state === 'play') { if (P.vine && !wasV) grabs++; wasV = !!P.vine; }
  if (lvl !== lastL) { if (lastL >= 0) console.log('  cleared level', lastL, '(' + LV[lastL].key + ') at frame', f); lastL = lvl; }
  if (state === 'win') { console.log('WIN at frame', f, 'score', score); ok = true; break; }
  if (${only} && lvl > ${from}) { console.log('level ${from} cleared'); ok = true; break; }
}
console.log('mode', ${mortal} ? 'mortal' : 'invulnerable', '| deaths', deaths, '| vine grabs', grabs, '| result', ok ? 'PASS' : 'FAIL (stuck)');
process.exitCode = ok ? 0 : 1;
`);
