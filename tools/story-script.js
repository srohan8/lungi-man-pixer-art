// Prints every line of story text in play order as Markdown (docs/STORY_SCRIPT.md), read from the game itself.
//   node tools/story-script.js > docs/STORY_SCRIPT.md
const fs = require('fs'), path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const js = html.match(/<script>([\s\S]*)<\/script>/)[1];

const ctx = () => ({ imageSmoothingEnabled: false, measureText: () => ({ width: 5 }), fillText() {}, strokeText() {}, clearRect() {}, setTransform() {}, createImageData: (w, h) => ({ data: new Uint8ClampedArray(w * h * 4) }), putImageData() {}, drawImage() {}, fillRect() {}, save() {}, restore() {}, translate() {}, scale() {}, set fillStyle(v) {}, set globalCompositeOperation(v) {} });
const el = () => ({ width: 0, height: 0, style: {}, getContext: ctx, addEventListener() {}, classList: { add() {}, remove() {} }, dataset: {}, setPointerCapture() {} });
global.document = { addEventListener() {}, hidden: false, getElementById: el, createElement: el, querySelectorAll: () => [], documentElement: {}, fullscreenElement: null };
global.window = global; global.innerWidth = 844; global.innerHeight = 390;
global.matchMedia = () => ({ matches: false }); global.addEventListener = () => {};
global.localStorage = { getItem: () => 0, setItem() {} }; global.requestAnimationFrame = () => {};

eval(js + `
const OUT=[];
const say_=(who,text)=>OUT.push('- **'+nice(who||'')+'**: '+nice(text));
OUT.push('# Story script (generated, play order)','','Regenerate with: node tools/story-script.js > docs/STORY_SCRIPT.md','Edit the words in index.html (OPENING, SCENES, the LV lines, EPILOGUE, the cinematics), then regenerate.','');
OUT.push('## Opening pages (first play)');OPENING.forEach((p,i)=>OUT.push((i+1)+'. **'+p.h+'**: '+p.text));
OUT.push('','## Village scene (before the prologue)');SCENES.start.lines.forEach(l=>say_(l.who,l.text));
LV.forEach(lv=>{OUT.push('','## '+(lv.act||'')+': '+nice(lv.name||''));
  if(lv.sayStart)say_(lv.sayStart[0],lv.sayStart[1]);(lv.sayAt||[]).forEach(a=>say_(a.who,a.text));if(lv.sayChai)say_(lv.sayChai[0],lv.sayChai[1]);if(lv.sayBoss)say_(lv.sayBoss[0],lv.sayBoss[1]);if(lv.sayClear)say_(lv.sayClear[0],lv.sayClear[1]);
  if(lv.mav)lv.mav.forEach(t=>say_('MAVELI',t));
  (lv.cameos||[]).forEach(c=>{if(c.verses)c.verses.forEach(v=>OUT.push('- (song, '+c.id+') '+v));if(c.text)OUT.push('- (cameo, '+c.id+') '+nice(c.text))});
  const sc=SCENES[lv.key];if(sc){OUT.push('','_Scene after this level:_');(sc.caption||[]).forEach(c=>OUT.push('- (caption) '+nice(c)));(sc.lines||[]).forEach(l=>say_(l.who,l.text))}});
OUT.push('','## Ending epilogue');EPILOGUE.forEach(p=>OUT.push('- **'+p.h+'**: '+p.text));
OUT.push('','## Prologue tutorial');TUT.forEach(t=>OUT.push('- **'+t.h+'**: '+t.msg()));
console.log(OUT.join(String.fromCharCode(10)));
`);
