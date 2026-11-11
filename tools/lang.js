// Malayalam translation workflow (English is the source, written in index.html).
//   node tools/lang.js doc     collect every English string of the game and (re)write docs/MALAYALAM.md, keeping the Malayalam already written; new strings get an empty cell
//   node tools/lang.js build   turn docs/MALAYALAM.md into assets/lang/ml.js (what the game loads); lists the strings that still have no Malayalam
//   node tools/lang.js check   only list the strings without Malayalam
// Edit only the Malayalam column of docs/MALAYALAM.md. The English column is the key: do not change it.
const fs = require('fs'), path = require('path'), cp = require('child_process');
const ROOT = path.join(__dirname, '..'), DOC = path.join(ROOT, 'docs', 'MALAYALAM.md'), OUT = path.join(ROOT, 'assets', 'lang', 'ml.js');
const cmd = process.argv[2] || 'check';

function parseDoc() {
  const rows = [], sections = []; let sec = '';
  if (!fs.existsSync(DOC)) return { rows, sections };
  for (const line of fs.readFileSync(DOC, 'utf8').split(/\r?\n/)) {
    if (line.startsWith('## ')) { sec = line.slice(3).trim(); sections.push(sec); continue }
    if (!line.startsWith('| ') || line.startsWith('| English') || line.startsWith('|---')) continue;
    const cells = line.slice(2, line.lastIndexOf(' |') >= 0 ? line.lastIndexOf(' |') : undefined).split(' | ');
    if (cells.length < 2) continue;
    rows.push({ section: sec, en: cells[0].trim(), ml: cells.slice(1).join(' | ').trim() });
  }
  return { rows, sections };
}
const esc = s => s.replace(/\|/g, '\|');

if (cmd === 'doc') {
  const r = cp.spawnSync(process.execPath, [path.join(__dirname, 'lang-collect.js')], { encoding: 'utf8', maxBuffer: 1 << 26 });
  if (r.status !== 0) { console.error(r.stderr); process.exit(1) }
  const list = JSON.parse(r.stdout), old = new Map(parseDoc().rows.map(x => [x.en.toUpperCase(), x.ml]));
  const bySec = new Map(); list.forEach(x => { if (!bySec.has(x.section)) bySec.set(x.section, []); bySec.get(x.section).push(x) });
  const out = ['# Kannan and the Kanjiravanam Chronicles: English and Malayalam, side by side', '',
    'Every text the player can see, in play order. The English column is the key the game looks up (do not change it); write or fix the Malayalam in the second column.',
    'After editing run `node tools/lang.js build` (it rewrites `assets/lang/ml.js`). `node tools/lang.js doc` adds any new English string the game has gained, with an empty Malayalam cell, and keeps what is already written.',
    '', 'The title logo picture ("Kannan and the Kanjiravanam Chronicles") is an image and stays in English. Names of artists and track titles in the credits stay in their original spelling.', ''];
  let n = 0, fresh = 0;
  for (const [sec, items] of bySec) {
    out.push('## ' + sec, '', '| English | മലയാളം |', '|---|---|');
    for (const it of items) { const ml = old.get(it.en.toUpperCase()) || ''; if (!ml) fresh++; out.push('| ' + esc(it.en) + ' | ' + ml + ' |'); n++ }
    out.push('');
  }
  fs.writeFileSync(DOC, out.join('\n'));
  console.log('docs/MALAYALAM.md written: ' + n + ' strings, ' + fresh + ' without Malayalam');
} else {
  const { rows } = parseDoc(), dict = {}; let missing = [];
  rows.forEach(x => { if (x.ml) dict[x.en] = x.ml; else missing.push(x) });
  if (cmd === 'build') {
    fs.mkdirSync(path.dirname(OUT), { recursive: true });
    fs.writeFileSync(OUT, '/* Malayalam strings, built from docs/MALAYALAM.md by tools/lang.js build. Do not edit by hand. Key: the English text. */\nwindow.ML_DICT=' + JSON.stringify(dict) + ';\n');
    console.log('assets/lang/ml.js written: ' + Object.keys(dict).length + ' strings');
  }
  console.log(missing.length ? 'Without Malayalam (' + missing.length + '):\n' + missing.map(x => '  [' + x.section + '] ' + x.en).join('\n') : 'Every string has Malayalam.');
}
