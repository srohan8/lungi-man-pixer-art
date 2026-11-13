# Game length: long acts for the main build, short acts for Reddit

Owner decisions (November 2026). Status: planned, not built yet. The tag `v0.9-full-story` is the current short build, the one friends played.

## Two versions, two lengths

| Version | Length | Why |
|---|---|---|
| **Main build** (Android / Play Store, `index.html` as is) | about 75 to 90 minutes for a first-time player (35 to 45 for a practised one) | People pay for it (or accept one ad and the optional Remove ads), so it needs real length. |
| **Reddit build** (`reddit/`, Devvit post) | **stays as it is today**, the short acts of `v0.9-full-story` | A Reddit post is a quick, free, drop-in game. The owner does not want the long length there. |

The Reddit build must keep today's act layouts, enemy counts and checkpoint spots exactly. It still gets every other fix (art, text, bugs, Malayalam), only not the lengthening.

## How the long acts work (main build only)

The same three buttons and the same one-hit rules. Only layout grows:

- More ground per act (`LV[n].len` and the stretch widths), more enemies per stretch from the same set, never a new behaviour.
- More checkpoint stalls: about one every 1,000 px instead of the current uneven spacing (today an act has 2 mid-level stalls plus the one before the boss, 700 to 1,550 px apart by chance). Soniya stands at every stall as she does now; her line stays at the first stall only. The Prologue lamp and Pathalam lamps stay as they are.
- Bosses, prologue, ride, interlude, Pathalam, cinematics and the ending are not lengthened.

First-playthrough budget (with deaths and story scenes):

| Part | Minutes |
|---|---|
| Prologue (tutorial) | 4 |
| Act I | 12 |
| Act II ride | 3 |
| Act II | 12 |
| Act III | 12 |
| Interlude | 3 |
| Act IV | 12 |
| Pathalam | 4 |
| Act V | 14 |
| Story pages, cinematics, ending | 8 |
| **Total** | **about 84** |

Order of work: Act I first, then III and IV, then recheck II and V. One act per change, smoke test plus a phone playthrough each time. Act IV's flood timer (120 s) must be retuned when its ground gets longer.

## How the Reddit build stays short

- One switch decides it: the Reddit build sets `window.GAME_SHORT = 1` (added in `tools/build-reddit.js`, next to the existing `window.REDDIT_ROT = 1`). The lengthening reads it, so with the switch on every level is generated exactly as in `v0.9-full-story`.
- The long layout must not change the random streams of the short layout (same rule as the extra palms: use their own random stream), so short mode stays identical, not just similar.
- Check before every release: `node tools/smoke-test.js` for the main build, and the same run with `GAME_SHORT` set must give the same level lengths and checkpoint positions as the tag (Act I lamps 1382, 2514, 3208; Act II 1427, 2568, 3341; Act III 1451, 2287, 3554; Act IV 1385, 2270, 3513; Act V 1543, 2929, 3627).
- Progress saved on the device is per version (the Reddit webview has its own storage), so the two versions never share saves.

## Open

- The owner has not yet confirmed the even stall spacing (about every 1,000 px); it was proposed together with the longer acts.
- Best score per act on the title screen was suggested; it needs the owner's OK because it is a new counter (CLAUDE.md rule 9).
