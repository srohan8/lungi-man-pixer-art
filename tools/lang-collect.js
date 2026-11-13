// Collects every English string of the game for translation.
//   node tools/lang-collect.js > list.json
// 1) story data (levels, scenes, opening, epilogue, credits, tutorial, boss hints) in play order, 2) every string the game draws while a bot plays through all levels (HUD, banners, pop-ups, menus).
// Output: [{section, en}] without duplicates (the first section a string appears in wins). Used by tools/lang-doc.js.
const fs = require('fs'), path = require('path'), cp = require('child_process');
const ROOT = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const js = html.match(/<script>([\s\S]*)<\/script>/)[1];

// ---- runtime strings: run the smoke test with the collector switched on
const tmp = path.join(require('os').tmpdir(), 'lang_log_' + process.pid + '.txt');
cp.spawnSync(process.execPath, [path.join(__dirname, 'smoke-test.js')], { env: { ...process.env, LANG_LOG: tmp }, stdio: 'ignore' });
let runtime = []; try { runtime = fs.readFileSync(tmp, 'utf8').split('\n') } catch (e) {} try { fs.unlinkSync(tmp) } catch (e) {}

// ---- story data
const ctx = () => ({ imageSmoothingEnabled: false, measureText: () => ({ width: 5 }), fillText() {}, strokeText() {}, clearRect() {}, setTransform() {}, createImageData: (w, h) => ({ data: new Uint8ClampedArray(w * h * 4) }), putImageData() {}, drawImage() {}, fillRect() {}, save() {}, restore() {}, translate() {}, rotate() {}, scale() {}, beginPath() {}, rect() {}, clip() {}, getImageData: (a, b, w, h) => ({ data: new Uint8ClampedArray(w * h * 4) }) });
const el = () => ({ width: 0, height: 0, style: {}, getContext: ctx, addEventListener() {}, classList: { add() {}, remove() {} }, dataset: {}, setPointerCapture() {}, getBoundingClientRect: () => ({ left: 0, top: 0, width: 844, height: 390 }) });
global.document = { addEventListener() {}, hidden: false, getElementById: el, createElement: el, querySelectorAll: () => [], documentElement: {}, fullscreenElement: null };
global.window = global; global.innerWidth = 844; global.innerHeight = 390;
global.matchMedia = () => ({ matches: false }); global.addEventListener = () => {};
global.localStorage = { getItem: () => 0, setItem() {} }; global.requestAnimationFrame = () => {};

const OUT = [];
global.__push = (section, en) => { if (typeof en === 'string' && /[A-Za-z]{2}/.test(en)) OUT.push({ section, en: en.replace(/\s+/g, ' ').trim() }) };
eval(js + `
const P_=__push;
P_('Opening pages (first play)','');OPENING.forEach(p=>{P_('Opening pages (first play)',p.h);P_('Opening pages (first play)',p.text)});
const sceneLines=(sec,sc)=>{if(!sc)return;(sc.caption||[]).forEach(c=>P_(sec,c));(sc.actors||[]).forEach(a=>{if(a.who)P_(sec,a.who)});(sc.lines||[]).forEach(l=>{P_(sec,l.who);P_(sec,l.text)})};
sceneLines('Village scene (before the prologue)',SCENES.start);
LV.forEach(lv=>{const sec=(lv.act||'')+': '+(lv.name||'');P_(sec,lv.act);P_(sec,lv.name);
  (lv.sayStart||[]).forEach(t=>P_(sec,t));(lv.sayAt||[]).forEach(t=>{P_(sec,t.who);P_(sec,t.text)});(lv.sayChai||[]).forEach(t=>P_(sec,t));(lv.sayBoss||[]).forEach(t=>P_(sec,t));(lv.sayClear||[]).forEach(t=>P_(sec,t));
  (lv.mav||[]).forEach(t=>P_(sec,t));(lv.clear||[]).forEach(t=>P_(sec,t));(lv.tut||[]).forEach(t=>{P_(sec,t.a);P_(sec,t.b)});
  (lv.cameos||[]).forEach(c=>{(c.verses||[]).forEach(v=>P_(sec,v));if(c.text)P_(sec,c.text)});
  sceneLines('Scene after '+sec,SCENES[lv.key])});
EPILOGUE.forEach(p=>{P_('Ending epilogue',p.h);P_('Ending epilogue',p.text)});
CREDITS.forEach(c=>{if(c[1])P_('Rolling credits',c[1]);if(c[0]&&typeof c[0]==='string')P_('Rolling credits',c[0])});
TUT.forEach(t=>{P_('Prologue tutorial',t.h);P_('Prologue tutorial',t.msg())});
Object.keys(BHINT).forEach(k=>P_('Boss hints',BHINT[k]));
Object.keys(BOSSDEF).forEach(k=>{if(BOSSDEF[k].name){P_('Boss name plates',BOSSDEF[k].name);P_('Boss name plates',BOSSDEF[k].sub)}});
`);
/* strings written directly in the game code (HUD, menus, pop-ups, banners, cinematic lines). Add new ones here when you add text to index.html. */
const EXTRA = {
 'Menus and screens': ['PAUSED','RESUME','MENU','SPACE RESUME   Q MENU','GAME OVER','SCORE','BEST','NEW BEST','TAP TO CONTINUE','PRESS ANY KEY','PORTAL SEALED!','KANNAN SAVED KANJIRAVANAM.','TAP TO PLAY AGAIN','TAP TO START','PRESS SPACE TO START','LEFT RIGHT CHOOSE   SPACE JUMP   X THROW','LOADING','Moonga Studio','presents','THROW','JUMP','Tap to continue','Press any key to continue','Press any key','Tap to skip','Any key to skip','Tap again to skip','Press again to skip','Skip','Skip tutorial','Step','Tap for next','Closed'],
 'HUD and pop-ups': ['COCONUT','PAROTTA X3','LEAF SPEAR','PRINTS','BLESSED','BLESSING!','PARALYZED!','DIZZY! CONTROLS FLIPPED','NICE!','EXTRA LIFE!','LIVES FULL +300','5000 POINTS! EXTRA LIFE!','5000 POINTS! A LAMP DROPS','THE BELL RINGS! +1 LIFE','KILI CAWS! +COCONUTS','THE WATER IS RISING!','HURRY! REACH THE EYE!','SHIELDED!','CAW!','CRASH!','GLUB!','GLUB GLUB...','CHAI! COCONUTS REFILLED',"AMMA'S GIFT. TRY AGAIN, KANNAN","AMMA'S GIFT. RAYS PIERCE EVERYTHING",'PAROTTA!','TRIPLE THROW','LOCKED'],
 'Prologue tutorial (touch versions)': ['Hold THROW to throw coconuts. Hit the crab!','Hold the right button to walk. The left button walks back.','Jump into the hanging vine and it swings you across.','Press JUMP to hop over things. You can stomp crabs too.'],
 'Prologue tutorial hints': ['Hold the right button','Press the right arrow','Hold THROW','Hold X','Press JUMP','Press Space','Walk into the parotta','Jump into the vine'],
 'Dance interlude lines': ['DANCE!','ANY BUTTON IS A STEP, MACHANE!','THE FLOOR IS YOURS','KEEP THE BEAT!','LEAN, SPIN AND CLAP','THE FLOOR HEATS UP...','SOMETHING IS WRONG WITH THE CROWD','THE BEAT DROPS!','THEY LEAP, MACHANE!','WHERE AM I...?','WHY IS EVERYONE DANCING?','THIS CANNOT BE REAL...','WHY ARE THEIR EYES TURNING RED?',"THIS DOESN'T LOOK GOOD... THOMAKUTTY, VITTODA!"],
 'Cinematic and ending lines': ['I CANNOT DO THIS ANY MORE...','HERE. A FRESH MUNDU. TRY NOT TO LOSE THIS ONE.','I TOLD YOU TO STAY ON THE TREES. YOU DID NOT LISTEN ONCE.','ARE YOU ALL JUST STANDING THERE? WANT CHAI?','ONAM IS IN THREE WEEKS. I HOPE THE FEAST IS GOOD.','THOMA','SONIYA','MAVELI','KANNAN','KANJIRAVANAM BREATHES AGAIN','KANNAN AND THE KANJIRAVANAM CHRONICLES']
};
const seen = new Set(), res = [];
const add = (section, en) => { const k = en.toUpperCase(); if (seen.has(k)) return; seen.add(k); res.push({ section, en }) };
OUT.forEach(o => add(o.section, o.en));
// runtime strings: skip pure numbers / numbered labels (the label alone is enough, numbers are appended by the game)
runtime.forEach(s => {
  s = s.replace(/\s+/g, ' ').trim(); if (!/[A-Za-z]{2}/.test(s)) return;
  const m = s.match(/^(.*?)(\s*[+x×]?\s*\d[\d,.\s]*)$/); if (m && m[1]) s = m[1].trim();
  add('Interface and in-play text', s);
});
for (const sec in EXTRA) EXTRA[sec].forEach(e => add(sec, e));
console.log(JSON.stringify(res, null, 1));
