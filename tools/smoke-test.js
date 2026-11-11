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

const ctx = () => ({ imageSmoothingEnabled: false, measureText: () => ({ width: 5 }), fillText() {}, strokeText() {}, clearRect() {}, setTransform() {}, createImageData: (w, h) => ({ data: new Uint8ClampedArray(w * h * 4) }), putImageData() {}, drawImage() {}, fillRect() {}, save() {}, restore() {}, beginPath() {}, rotate() {}, translate() {}, closePath() {}, createRadialGradient: () => ({ addColorStop() {} }), set strokeStyle(v) {}, set lineWidth(v) {}, rect() {}, clip() {}, arc() {}, fill() {}, stroke() {}, moveTo() {}, lineTo() {}, translate() {}, scale() {}, set fillStyle(v) {}, set globalCompositeOperation(v) {} });
const el = () => ({ width: 0, height: 0, style: {}, getContext: ctx, addEventListener() {}, classList: { add() {}, remove() {} }, dataset: {}, setPointerCapture() {} });
global.document = { addEventListener() {}, hidden: false, getElementById: el, createElement: el, querySelectorAll: () => [], documentElement: {}, fullscreenElement: null };
global.window = global; global.innerWidth = 844; global.innerHeight = 390;
global.matchMedia = () => ({ matches: false }); global.addEventListener = () => {};
global.localStorage = { getItem: () => 0, setItem() {} }; global.requestAnimationFrame = () => {};

if (process.env.LANG_LOG) global.__TRLOG = new Set();   // development: collect every string the game draws (tools/lang-collect.js)
eval(js + `
seen = true; score = 0; lives = 4;
console.log('levels:', LV.map((l, i) => i + ':' + l.key).join('  '));
begin(${from}, 40); keys.KeyX = true;
let lastL = -1, deaths = 0, lastState = '', grabs = 0, wasV = false, ok = false;
for (let f = 0; f < 400000; f++) {
  if (state === "dead" && lastState !== "dead") { deaths++; if (deaths < 4) console.log("DEATH", LV[lvl].key, Math.round(P.x), P.dk, JSON.stringify(segs.map(s=>[Math.round(s[0]),Math.round(s[1])]).slice(0,8))); }
  if (state === 'dead') lives = 4;
  if (state === "pages") pagesSkip(); if (state === "clear") clearOK = true; if (state === "story" && story) story.skip = true; if (typeof dlg !== "undefined" && dlg && dlg.pause) dlg = null; if (typeof convo !== "undefined" && convo) { dlg = null; var cv0 = convo; convo = null; if (cv0.done) cv0.done(); }                // opening / epilogue pages wait for a tap
  lastState = state;
  const L = LV[lvl];
  if (L.arena) {                                   // dance arena: walk toward the nearest hostile dancer, hop when close
    const n = enemies.filter(e => e.alive && e.t === 'dancer' && !e.calm).sort((a, b) => Math.abs(a.x - P.x) - Math.abs(b.x - P.x))[0];
    keys.ArrowRight = !!(n && n.x > P.x + 30); keys.ArrowLeft = !!(n && n.x < P.x - 30);
    if (n && Math.abs(n.x - P.x) <= 30 && Math.abs((n.y + 24) - (P.y + P.h)) > 50) { const w = Math.floor(f / 90) % 2; keys.ArrowRight = w === 0; keys.ArrowLeft = w === 1 }   // the dancer is on a platform far above or below: wander so the pile breaks up and the bot can reach it
    keys.Space = !!(n && Math.abs(n.x - P.x) < 46 && (P.on || f % 20 < 10));
    if (n && P.on && (n.y + 24) - (P.y + P.h) > 26 && Math.abs(n.x - P.x) < 90) { keys.ArrowRight = true; keys.ArrowLeft = false; keys.Space = false }   // standing on a platform above a dancer: walk off its edge so the dancer can be stomped from above
    if (n && Math.abs(n.x - P.x) < 18 && Math.abs((n.y + 24) - (P.y + P.h)) < 22) { keys.ArrowRight = n.x < P.x; keys.ArrowLeft = n.x >= P.x; keys.Space = false }   // standing inside a dancer: back off so it can be stomped from above next time
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
if (!ok) console.log('STUCK AT', state, 'lvl', lvl, LV[lvl].key, 'x', Math.round(P.x), 'convo', !!convo, 'dlg', dlg && dlg.who, 'story', !!story, 'cin', cin && cin.k, 'clearT', clearT, 'arena', arena && JSON.stringify({t: arena.t, k: arena.kills, h: arena.hostile}), 'dancers', JSON.stringify(enemies.filter(e => e.alive).map(e => [e.t, Math.round(e.x), Math.round(e.y), e.calm ? 'calm' : 'hostile', e.jm ? 'leaper' : 'walker', Math.round(e.vy || 0)])), 'P', Math.round(P.x), Math.round(P.y), P.on, 'W', W, 'plats', JSON.stringify(plats.map(p => [Math.round(p[0]), p[1], p[2]])));
console.log('mode', ${mortal} ? 'mortal' : 'invulnerable', '| deaths', deaths, '| vine grabs', grabs, '| result', ok ? 'PASS' : 'FAIL (stuck)');
process.exitCode = ok ? 0 : 1;
if (global.__TRLOG) require('fs').writeFileSync(process.env.LANG_LOG, [...global.__TRLOG].join(String.fromCharCode(10)));
`);
