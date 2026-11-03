# Handoff: moving the project from chat to Claude Code

Everything below is the state at the moment of the move. Read `CLAUDE.md` first (the guardrails), then this file.

## First message to give Claude Code
> Read CLAUDE.md and docs/HANDOFF.md. Run `npm test` and confirm it passes. Then open index.html in a browser
> and tell me what you see. Do not change gameplay rules. Start with "Next tasks" item 1.

## Where we are
- Complete game: prologue, Acts I to V, three extra scenes, ending. Every level and boss is clearable by the test bot.
- Never played by hand on a real phone yet. Tuning numbers are educated guesses until someone plays it.
- No audio files yet. The game runs silently with built-in beeps and picks up files when they exist (see `docs/AUDIO.md`).
- The hero is called **Kannan** in dialogue (the storyline calls him LungiMan; we kept Kannan on purpose for now). Title shows "LUNGI MAN".

## Run and test
- Run: `npm start` (needs Node) or `python3 -m http.server`, open the page. A page opened from `file://` also works, but audio files will not load there.
- Test: `npm test` plays the whole game. `node tools/smoke-test.js --from 5 --only` tests one level (index 5). `--mortal` lets the bot die.
- The bot is dumb on purpose. If a test passes, the level is not broken. It does not prove the level is fun or fair.
- Always run the test after any edit. It also renders every frame, so drawing errors show up.

## Files
```
index.html            the whole game (about 1250 lines, sections marked with /* ===== name ===== */)
CLAUDE.md             rules and the five-act plan. Keep it up to date
docs/STORYLINE.md     the latest story (source of truth for story questions)
docs/AUDIO.md         every music track and sound effect, names, prompts, how to generate and convert
docs/music-guide.md   the sound identity (Kerala x 80s synth) and the hand-made LMMS route
docs/reference/       two pixel-art reference images used for the art direction
assets/audio/music/   drop loops and stings here (names in docs/AUDIO.md)
assets/audio/sfx/     drop sound effects here
assets/art/           put the hand-drawn coconut palm PNG here when it exists
tools/smoke-test.js   the headless bot
```

## Code map (index.html sections, in order)
setup, input (keyboard + touch buttons), sound (beep), audio manager (optional files), pixel utilities (buf, rect, ell, disc, outline),
pixel font, sprites (hero, enemies), bosses (sprite generators + BOSSDEF + AI later), levels (LV list), level art generators
(sky, hills, jungle, ground, props), game state, update (player, enemies, bosses, scenes, arena), drawing, screen fit.
All art is drawn in code at start-up. There are no image files yet.

## Levels (play order, index = position in the `LV` array; `key` is the stable name)
| idx | key | Name | Notes |
|---|---|---|---|
| 0 | pro | Prologue, the Swinging Awakening | tutorial banners, parotta, first vine, no boss, plays once |
| 1 | a1 | Act I, Yakshi's Hollow | cobras, crows, crabs; boss Yakshi; first chai stall |
| 2 | bike | Act II ride | automatic speed, only jump and throw |
| 3 | a2 | Act II, Kuttichathan's Carnival | imps, wisps, goons; boss Kuttichathan |
| 4 | a3 | Act III, Odiyan's Hunt | dogs, bats, cobras; four hoof-prints; boss Odiyan |
| 5 | disco | Interlude, the fever dream | one-screen arena, defeat 12 dancers |
| 6 | a4 | Act IV, Karinkanni's Curse | rain, many vines; boss Karinkanni |
| 7 | path | Pathalam | enemy-free rope swinging, Maveli's throne scene, blessing |
| 8 | a5 | Act V, Pey Komban's Rampage | blessing = one free hit; boss Pey Komban; then the ending |

Each level has a `sid` (layout seed) that was frozen when the level was added, so editing the list order does not reshuffle layouts.

## Where to tune things (search for the name)
- Player: speed `2.2` (bike `3.6`), jump `-10`, gravity `.5`, throw cooldown `14`, aruval swing box `sb`.
- Lives: `begin(` sets 4 lives after the prologue (3 in the prologue). Chai boost `chaiT=600` (10 s).
- Boss health and hitbox: `BOSSDEF`. Boss behaviour: `yakshiAI`, `chathanAI`, `odiyanAI`, `karinAI`, `kombanAI`.
- Hit windows: Kuttichathan `b.stun=rage?80:100`; Odiyan `PL=36+16*prints`; Pey Komban `b.stun=rage?110:140`; Karinkanni opens for 75 to 95 frames.
- Level length and gaps: `len`, `gapW`, `segW`, `vineEvery` inside each entry of `LV0`/`BIKE`/`DISCO`/`PATH`.
- Enemy speed and behaviour: the `switch(e.t)` in `updFoes`.

## Saved data (localStorage)
`lungiman-hi` high score, `lungiman-prologue` prologue seen, `lungiman-act` furthest level index, `lungiman-snd` sound on/off.
The level order changed during development, so an old `lungiman-act` value can point at the wrong level. Clear it when testing.

## Decisions to keep (do not undo without asking the owner)
- Three buttons only: move, jump, throw. No fourth button, no menus during play, no inventory.
- One-hit death. The only exceptions are the single free hit from Maveli's blessing and the 4 lives per act.
- One weapon at a time, replaced by pickup: coconut (default), parotta triple throw, aruval (short range). Chai gives 10 s of triple throw.
- Dialogue: at most 3 small boxes per act, 2 lines, auto-dismiss, never pause the game. Scripted scenes (throne, ending) are the only exceptions.
- No beef (the owner removed it for political reasons). The power-up is parotta.
- Small enemies are warm mid-tones with a pulsing red rim, red glowing eyes and sparkles (the Kazhukan corruption mark).
- The game must run with zero audio files.
- Vines are automatic: jump into a vine and it swings you and lets go by itself.

## Things nobody has verified by hand (please playtest and report)
1. Phone landscape layout, button size and fullscreen on a real Android phone.
2. Bike ride speed (3.6 px/frame) and the fire-pit gaps.
3. Pey Komban: charge timing (jump over, or stand on a platform), wave stomp.
4. Odiyan: is a 0.6 s window (1.7 s with all prints) fun?
5. Karinkanni: 3 hits may feel short. Kuttichathan: 1.7 s stun window (was 1.0 s, too short: coconuts took longer to arrive than the window lasted).
6. Dance arena difficulty (12 dancers, 6 at a time).
7. Contrast of small enemies on every background (check Acts III and V first).

## Next tasks, in order
1. **Audio.** Follow `docs/AUDIO.md`. Generate 4 pilot tracks first (menu, prologue, forest, victory sting), check the loop, then the rest. Run the ElevenLabs cost estimate before each batch. A paid plan is required for anything shipped.
2. **Hand-drawn palm.** The owner will draw a coconut palm (PNG, about 64x110, transparent, palette in CLAUDE.md). Swap it in for the generated `genPalm`, keep the colour-swap per act.
3. **Android.** Wrap with Capacitor, lock landscape, test touch controls, add an app icon and name.
4. **Small story extras** (not built yet): a broken bridge drawn at Act I's rope gap, tiny clue props (Ravi's mismatched planks, Biju's boat planks), a Basheer cameo, Kili following the player.
5. **Optional clean-up:** split `index.html` into modules (`game.js`, `sprites.js`, `levels.js`, `audio.js`) only if the owner asks. Run the test after every step.

## Known quirks
- The published chat version used one file; paths like `assets/audio/...` only work when served from the project folder.
- `LV_OLD` in the code is unused leftover data from an earlier version (kept for its colour palettes). It can be deleted.
- Boss sprites and every other sprite are generated by code. Changing a look means editing a `gen...` function or a string-array sprite.
