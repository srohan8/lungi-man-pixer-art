# Kannan and the Kanjiravanam Chronicles: project rules

A simple, old-school run-and-throw game (think Contra / Prince of Persia).
Easy to pick up, playable almost mindlessly. Android phone, landscape.

**The story may grow. The gameplay must not.**
Story, art and level variety are allowed to expand. Mechanics and controls are not.

## The three buttons (fixed)
- Move left / right
- Jump
- Throw coconut (hold to auto-fire)

No fourth button. No menus during play, except the pause overlay (pause icon, P / Esc, or automatic when the app goes to the background) which has exactly two choices: RESUME and MENU (title screen). No settings, no inventory.

## Simplicity guardrails (do not break)
1. **One-hit rule.** Player dies in one hit. No health bars for the player.
2. **Enemies are simple.** Each enemy has ONE behaviour (walk, fly, or throw). Max 2 HP.
3. **Bosses have 2-3 moves max** and a visible health bar. Learnable in one try.
4. **Levels are linear, left to right.** No backtracking, no maps, no keys, no puzzles, no branching paths.
5. **Story is told in short beats.** Act banners (1-2 lines) plus small dialogue boxes: max 2 lines, one speaker. In-play dialogue boxes stop the game until the player taps or presses a key, with back, next and X buttons (owner request after playtests: people could not read them while running); the boss's last words and Amma's lines at a level clear also wait for a tap (the clear countdown holds); a box in a cinematic shows in its fixed place with a small X. Several lines from one NPC in a row (Maveli's throne scene, the ending) are a conversation: the game stands still and each line has back and next buttons (left of the screen or left arrow = back, anywhere else, right arrow or Space = next); story pages also have a back button. At most 5 boxes per act, including Kannan's short replies to what an NPC reveals. No choices, no text the player must read to progress. The only exception to "no cutscenes" is the coded story scenes (see below).
6. **Power-ups are instant and automatic** (pick up, effect starts). No inventory or selection.
7. **One weapon at a time, replaced by pickup, lost on death.** Coconut (default, ranged, limited ammo shown in the HUD), parotta triple coconut (one coconut per volley), and Kanjiravanam Amma's trishul (red-gold ray, pierces, cuts enemy shots, double boss damage, no ammo). All use the same THROW button. Never add a weapon-switch button. New weapons must follow the same rule.
8. **Vines are automatic.** Jumping into a hanging vine grabs it, it swings you forward and releases on its own (or when you press JUMP). Used only to cross wide gaps. No climb button, no aiming.
9. **No new systems** without asking first (the coconut count and the 5,000-point extra life are the only counters; numbers live in TUNE): no crafting, shops, XP, skill trees, stats, combos, save slots, difficulty menus.
10. **Difficulty comes from layout and enemy count, not complexity.** It ramps by act through `LV0[n].hard` (0 prologue to 5 Act V): more enemies per stretch, slightly wider gaps, faster shooters, tougher bosses.
11. **Every act has the same shape:** run, a few enemy types, checkpoint lamps, boss, clear.
12. **Mobile first.** Everything must work with two thumbs on a phone in landscape. Touch targets stay large.

## Flow rules
- The prologue plays once (first ever play). After that, a new game starts at Act I.
- Game over restarts the current act from its last checkpoint with 3 lives, never from the prologue.


## The five acts (current build)
| Act | Scene | Enemies | Boss | Boss gimmick (keep it to this) |
|---|---|---|---|---|
| Prologue | Riverside village | crabs | none | tutorial banners, parotta, first vine |
| I | Bamboo hollow, shrine ruins | cobras, crows, crabs | Yakshi | gaze ring flips controls 3s, ground dash |
| II | Abandoned festival | imps (hop), wisps (float), masked goons | Kuttichathan | fire ring (ground or head height), decoy clones that explode if popped up close, fireball charge into a wall, then a 1.7s stun (1.3s when enraged) = only hit window |
| III | Foggy pepper hills | dogs (rush), bats, cobras | Odiyan | only hittable in human form; dog and bull forms charge |
| IV | Monsoon mangroves (rising flood, see below) | crabs, bats, crows | Karinkanni | eye only hittable when open; ray paralyzes 1.3s; 3 hits |
| V | Banyan temple grove | goons, cobras, monkeys | Pey Komban | armored; only hittable for about 1.7 s right after his ground stomp (his charge just turns him at the wall); stomp makes ground waves |

Weapons: coconut (always), parotta triple-throw (Acts I-V), Trishul pickup (code name aru) in Acts II, III and V (not IV: the eye needs range). Coconuts: start 40, max 60, +2 per kill, +1 per boss hit, slow regrow below 5, never below 25 after a death. Extra life: every 5,000 points a golden lamp leaves the score counter and arcs down onto the ground just ahead of the player; walking into it gives the life (cap 6, it can be missed; at the cap it gives +300 score).
Enemy rule of thumb: ground chasers only chase while the player is on their own platform, so nothing camps the landing spot after a vine or gap.
Chayakada: from Act II on, every checkpoint is a tea stall. Walking past it sets the checkpoint, clears dizzy or paralysis, and refills coconuts to the cap. It is automatic, no button.
Progress: the game remembers the furthest act reached ("tap to continue"). The prologue is shown once.
Coconut palms: every act has them (extra palms: prologue, Acts III, IV, V; `LV0[n].xpalms`). When the hero dies and respawns, nearby enemies stay (2.5 s of grace, no clearing).
Act II ride end: the road is blocked by the hand-drawn blockade (assets/reference/blockade.png): pixel version pr_blockade_0 in the ride, sharp hs_blockade_0 in the story card. The code-drawn version is only a fallback.
Act IV flood (owner-approved timer): the water rises with time from the start of the act (TUNE.floodStart to floodDrown over floodSeconds = 120 s). A tea stall lowers it to ankle height (floodChai) and respawning restores the level of the last stall. At head height the hero drowns (water death, back to the last stall). The boss arena lowers it to knee height and holds it, so the fight is never timed; it drains away when the eye bursts. Warnings pop up as it reaches the ankles and the knees.
Level selector (owner request): the title screen has left/right arrows (keys, A/D, or tap the arrows) to choose any level, default is the furthest act reached. It is on the title only, never during play. `TUNE.levelSelectAll=false` limits it to levels reached.

## Adding story or new acts (checklist)
- Reuses the same three buttons and the same one-hit rules.
- New scene + 2-3 enemy types + 1 boss. That is the whole act.
- Enemy behaviours are picked from the existing set (walk, fly, throw, swoop) before inventing one.
- Story goes into the act banner text only.
- If a request needs a new mechanic, stop and propose the simplest version first, then ask.

## Visual rules
- Pixel art only. Internal canvas height is 270; width adapts to the screen.
- No image smoothing. No gradients except dithered ones. Fonts: the built-in pixel font for the title, HUD, banners and pop-ups; story text (dialogue, scenes, story panel, captions, ending) uses a normal bold font in sentence case on a full-resolution text layer.
- Lore: the red eyes and rim are the mark of the Kazhukan corruption (illusions, poison, rage). Kanjiravanam Amma explains it at the end of the prologue. Bosses are the corrupted guardians.
- Haunted look: every small enemy has a pulsing red rim, glowing red eyes and a few red sparkles. Keep that for any new enemy.
- Small enemies must stay readable on every background: warm mid-tone colours (like the monkey) plus the light rim. Never make an enemy near-black or dark blue.
- Each act has its own limited palette. Props have no outline; characters and enemies do.
- Use hand-drawn PNG assets from `assets/` when available; fall back to generated sprites.

## Code rules
- Tunable numbers (speeds, HP, gaps, spawn spacing) live in one config block at the top.
- Keep it dependency-free: plain HTML, Canvas and JavaScript.
- After each change, play through all acts (or run the headless smoke test) before saying it is done.
- Small, reviewable changes. Do not rewrite working systems.

## Out of scope (say no, suggest the simple alternative)
Multiplayer, online features, accounts, ads, in-app purchases, procedural story, voice acting.

## Story cameos (from STORYLINE.md, hero stays "Kannan" for now)
Prologue: Biju, Thoma, Kanjiravanam Amma. I: Soniya (first chai stall), Yakshi. II: Ravi, Kuttichathan. III: Velu, Ustad Basheer (bard cameo, sings verses), Odiyan. IV: Kanjiravanam Amma (her warning at the start; the nun Devi no longer speaks), Karinkanni. V: Thoma, Soniya (first stall), Kanjiravanam Amma.
Thoma's token: every act after the prologue starts with 4 lives (shown as Nilavilakku lamps).
Hero look: aviator sunglasses, satchel with a green coconut, no towel.
Planned next (agreed order): Pathalam + Maveli + ending, Act III hoof-prints + Kili, disco dream interlude, Act II bike ride.

## Audio
Music and sound effects are optional files, see `docs/AUDIO.md` (and `docs/music-guide.md` for the sound identity).
The game must always run with zero audio files: missing music is silent, missing sound effects fall back to the built-in beeps.
Never rename the audio files, the game looks them up by name. Keep the SND toggle (top right, M key) working.

## Story pass 2 (levels in play order)
Prologue, Act I, **Act II ride** (auto-run bike, only jump and throw), Act II, Act III, **Interlude** (fever-dream dance arena), Act IV, **Pathalam**, Act V, ending.
- Act II ride: forward speed is automatic, gaps are jumped, no left/right.
- Act III: four hoof-print pickups; Odiyan is only hittable while he changes form (about 0.6 s, +0.27 s per hoof-print), Kili the crow caws a moment before each change. Human form is harmless to touch.
- Interlude: 6 calm dancers; for about 8 seconds the hero dances with the same buttons (left or right = lean, jump = spin, throw = clap, no coconut, the dancers hop along), then they turn red-eyed one by one; defeat 16 to wake up (up to 7 at once, some of them leapers, they come from both sides, the beat drops at half way for more leapers and faster spawns). Locked one-screen arena.
- Pathalam: enemy-free rope-swinging level, then Maveli's throne scene (3 dialogue boxes, player stands still), blessing = one free hit in Act V (golden lamps).
- Ending: five trees bloom (teal, amber, indigo, green, gold) with 3 closing dialogue boxes. Tap to skip after a few seconds.
- Bosses with a hit window show a blue shield while invulnerable and a one-time hint ("HIT HIM WHEN HE CRASHES"). Charges show a red "!" first.
- Kuttichathan: fireball charge into a wall, stunned for 1.7 s (1.3 s enraged) = only hit window; a coconut needs about a second to cross the arena, so the window must be longer than that; clones explode when popped up close.
Dialogue rule: at most 5 boxes per act; the throne scene (5 Maveli lines) and the ending (3) are scripted exceptions.

## Story scenes (owner-approved exception to the no-cutscene rule)
- A short scene between two levels: a backdrop, the characters of that moment, one or two speech boxes. Drawn and moved by code (slide in, bob, hop when speaking), not animated sheets. Table in `SCENES` in index.html, wording in docs/STORY_CARDS.md.
- Plays only when advancing to a new level (and once before the Prologue on the very first play). Never on "tap to continue" or after game over. Ends by itself (about 5 to 7 s), any tap or key skips it after half a second. Never during play, never required to progress.
- The backdrop is the real scenery of the level (sky, hills, trees, water, ground), captured once when the scene starts, so a scene looks like the level you are about to play. Characters are in assets/art/bosses (made by tools/make-sprite.js from assets/reference). The bg_*.png files in assets/reference are inspiration for level props and palettes only.
- Do not add more than one scene per transition, or any choice or input to a scene.

## Story pass 3 (owner-approved, being built step by step; full plan in docs/STORY_PASS_3.md)
Rules that change as each step lands:
- **Story panel**: between levels and in the opening, longer text over several pages with the speaker's portrait, tap for next, skip any time. Never during play. In play only short banners and one-line boxes.
- **Opening**: five story pages on the very first play (place, seal, crack, the grove runs wild, the blessing) (then the village scene and the prologue). Skippable.
- **Prologue tutorial (exception)**: step-by-step messages freeze the game until confirmed, and each step finishes when the player does the action (move, jump, throw, parotta, vine). First play or when the prologue is picked from the level selector. A visible SKIP. After the prologue nothing ever stops for a message.
- **Weapon (done)**: the Sun Staff became Kanjiravanam Amma's **trishul** (same behaviour, same THROW button, same pickups in Acts II, III and V).
- **Finishing cinematics (exception)**: coded, no controls, skippable: Odiyan's last strike and Kannan's fall (Act III), the ground opening into Pathalam (after Act IV), the mundu finale (Act V: hand-drawn sheets mk_k_* Kannan and mk_b_* Pey Komban, the key illustration mk_big_0, the lasso rope and the game's pixel hero for the swing, stones/sparks/CRASH at the hit; sources in assets/reference, prompts in docs/MUNDU_SCENE_PROMPTS.md).
- **Entry scenes**: play when advancing and when a level is picked from the selector. "Tap to continue" is silent except into the interlude and Pathalam.
- **Sacred trees**: one in each boss arena, withered before the boss, blooming in the act colour after (teal, amber, indigo, green, gold). Replaying a beaten act shows it healed.
- **Scenery props**: 12 props from the reference prop sheets (shrine ruins, carnival arch, bullock cart, temple gate, banyan and others) are scattered as background scenery per act (LV0[n].decor). They have no collision and no gameplay effect.
- **Quest beats** (Ravi's race, Kili's rice, Devi's bell) were removed again: they were unexplained. The pickup code stays but no level uses it.
- **Pathalam Naga**: a huge sleeping serpent as pure scenery beside the swinging path (breathing, eye glow, soft rumble when passed). No collision, no danger.
- **Built so far**: story panel + opening pages (with motion), prologue tutorial, trishul, sacred trees and act healing, Act III / Pathalam / Act V finishing cinematics, selector entry scenes, backstory clue lines, ending epilogue, Ustad Basheer and the Pathalam Naga (code done; they appear once their art, basheer_0..2 and naga_0..2 in assets/art/bosses, exists).
