# Game length: long acts for the main build, short acts for Reddit

Owner decisions (November 2026). Status: mechanism built and Act I lengthened (Acts II to V still to do). The tag `v0.9-full-story` is the current short build, the one friends played.

## Two versions, two lengths

| Version | Length | Why |
|---|---|---|
| **Main build** (Android / Play Store, `index.html` as is) | about 75 to 90 minutes for a first-time player (35 to 45 for a practised one) | People pay for it (or accept one ad and the optional Remove ads), so it needs real length. |
| **Reddit build** (`reddit/`, Devvit post) | **stays as it is today**, the short acts of `v0.9-full-story` | A Reddit post is a quick, free, drop-in game. The owner does not want the long length there. |

The Reddit build must keep today's act layouts, enemy counts and checkpoint spots exactly. It still gets every other fix (art, text, bugs, Malayalam), only not the lengthening.

## The setting: `actLength`

The switch is called `actLength`: `'long'` (the main build, the default when no platform profile is set) or `'short'` (Reddit, today's layouts). It lives in the platform profile (`window.PLATFORM`, read in `index.html` as `PLAT`). The profile key is `actLength`; the Reddit build sets `'short'` in `tools/build-reddit.js`, and a missing profile means `'long'`.

**Rule (owner, never to be broken): `actLength` never contains any conversation or game story element, unless the owner adds it.**

- It changes layout only: ground length, enemy count per stretch, checkpoint stall spacing.
- It never adds, removes, moves or rewrites a dialogue box, act banner, story page, scene, cinematic, cameo (Soniya and the others), tutorial message, or any line of text.
- A long act has exactly the same story beats as a short one, in the same order. A longer act simply has more ground between them. The existing lines (Soniya's line at the first stall, the opening box, the boss lines) stay where they are in the level logic; new stalls and new ground carry no lines.
- Any story or dialogue for the longer acts is a separate request from the owner, written into `docs/STORY_CARDS.md` first, and not part of `actLength`.
- Check for every lengthened act: the list of drawn strings (`LANG_LOG=strings.txt node tools/smoke-test.js` writes the list to that file) is identical for `'short'` and `'long'`.

## Built so far
- `TUNE.actLong` = {a1: 2.2}: act key -> ground length factor. Only listed acts are lengthened; the rest stay as they are until added. `TUNE.stallFirst` (800) and `TUNE.stallEvery` (1000) place the checkpoint stalls evenly in a long act; the stall just before the boss stays at bossX-150. Decor props keep their order but are spread over the longer ground.
- Act I long: ground 7,220 px instead of 3,358, 7 stalls instead of 3 (800, 1800, 2800, 3800, 4800, 5780, 7070), 40 enemies instead of 18. Bot time for Act I: about 53 s before, about 80 s now (the bot is invulnerable and faster than a person).
- Honest time estimate: the bot clears all of today's acts in 1 to 3 minutes each, so a 2.2x longer act adds only about 1 to 1.5 minutes of walking for the bot and maybe 2 to 4 for a person. Reaching 12 minutes per act needs a factor nearer 4 to 5 (acts of 14,000 to 17,000 px), or slower, denser stretches. Tune the factor per act in `TUNE.actLong` after phone playtests.
- Story lines keep their fixed positions (for example Kannan's Act I line at x 1500), so in a long act they sit in the first part and the later ground has none, by the rule above.
- `node tools/act-length-check.js` prints short vs long layouts per level, checks short = the tag's lamps and that story data is identical in both. `ACT_LENGTH=short node tools/smoke-test.js` plays the Reddit layouts.

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

- One switch decides it: the Reddit build sets the platform profile `window.PLATFORM = {platform:'reddit', actLength:'short', rotateInPortrait:true}` (in `tools/build-reddit.js`; `index.html` reads it as `PLAT`, a missing profile means the main build). The lengthening reads `PLAT.actLength`, so with the switch on every level is generated exactly as in `v0.9-full-story`.
- The long layout must not change the random streams of the short layout (same rule as the extra palms: use their own random stream), so short mode stays identical, not just similar.
- Check before every release: `node tools/smoke-test.js` for the main build, and the same run with `window.PLATFORM = {actLength:'short'}` set must give the same level lengths and checkpoint positions as the tag (Act I lamps 1382, 2514, 3208; Act II 1427, 2568, 3341; Act III 1451, 2287, 3554; Act IV 1385, 2270, 3513; Act V 1543, 2929, 3627).
- Progress saved on the device is per version (the Reddit webview has its own storage), so the two versions never share saves.

## Open

- The owner has not yet confirmed the even stall spacing (about every 1,000 px); it was proposed together with the longer acts.
- Best score per act on the title screen was suggested; it needs the owner's OK because it is a new counter (CLAUDE.md rule 9).
