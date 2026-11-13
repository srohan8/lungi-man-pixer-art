# Phone test list (changes since the last test round)

Uninstall the old build first, then install the newest debug APK.

## Story and dialogue
- [ ] Disco stage: Kannan drifts down; "WHERE AM I...?" midway, "WHY IS EVERYONE DANCING?" near the landing, then "THIS CANNOT BE REAL..." after landing (that one stops the game until you tap).
- [ ] Opening "blessing" page: Amma (new elder art) reaches out to the falling Kannan, no white outline around Kannan, text and portrait look right.
- [ ] Act II warning and every other Amma line: new bust portrait in the dialogue box (no crown / trident).
- [ ] Act II ride: the dialogue closes by itself after riding a short way.

## Mundu finale (Act V after Pey Komban)
- [ ] Whole scene plays: lasso, swing, Kannan on his head, CRASH, topple, Pey Komban turns golden and vanishes, Kannan stands up, Thoma speaks after Komban has vanished.
- [ ] No white outlines or white patches on either character.
- [ ] Sizes look right next to the trees (Kannan and Thoma about player size).
- [ ] Chenda music and Kannan's yell play.
- [ ] Ending: sharp trees bloom one by one with sway, petals and fireflies, tiled ground, "Kanjiravanam breathes again", credits roll on black with the small running Kannan.

## Bike ride (Act II)
- [ ] Engine sound: soft start-up, quiet loop.
- [ ] Crash: the bike flips and slides on the ground (not floating above it).
- [ ] Blockade is visible at the end of the ride.

## Weapons and hero
- [ ] Leaf spear (trishul pickup in Acts II, III, V): banner says LEAF SPEAR, HUD says LEAF SPEAR, new run / idle / jump / throw sprites are normal player size, ray still pierces.

## Bosses
- [ ] Kuttichathan: same size as the hero; idle, hop, landing, wind-up, fireball throw, stun poses all look right; the charge uses the run cycle and he crashes into the wall.
- [ ] Kuttichathan hitbox: coconuts hit him where he is drawn (hitbox was shrunk a little).
- [ ] Decoy clones: violet running imps; popping one up close still hurts you; touching one hurts you.
- [ ] Pey Komban: walk, crouch (stomp) and stunned sprites are the same size as each other.
- [ ] Difficulty: Acts I to V get harder (more enemies, wider gaps, faster shooters); tell me which act feels too soft or too hard.

## Still open / known
- Yakshi's dash and Odiyan's human-form walk glide: accepted, they read as floating spirits (no legs shown).
- Amma's green-gold aura in code is not added yet.
- Pey Komban in the finale: proportions depend on the sheet (about half of Komban).

## Dialogue boxes (new)
- [ ] Every in-play dialogue box (Biju, Kannan, Soniya, chai stalls, Velu, bosses...) freezes the game until you tap anywhere or press a key; "Tap to continue" blinks under the box.
- [ ] The game does not freeze forever in any act; boxes at the level clear, cinematics and the ending still show and go away by themselves.
- [ ] Act II ride: a box freezes the bike and the engine goes quiet until you tap.
- [ ] Maveli's throne scene (Pathalam): the 5 lines wait for you, with back / next arrows and a 1/5 counter under the box; tap the left of the screen or the arrow for back, anywhere else for next; after the last one the blessing happens.
- [ ] Ending: Thoma, Soniya and Maveli lines are a 3-line conversation with the same back / next arrows.
- [ ] Story pages (opening, between acts, epilogue): a small back arrow at the bottom left of the text panel goes to the previous page.
- [ ] After a boss falls, the boss's last words and Amma's lines wait for a tap.
- [ ] Bike ride: reaching 5,000 points gives the extra life directly.
- [ ] Every dialogue box in play now has a back arrow, a next arrow and a small X at the top right. Back shows the earlier lines of this act, next (or tapping anywhere) moves on and closes the last one, X closes at once. A counter like 2 / 3 shows when there are earlier lines.
- [ ] Between acts: after a boss falls (and after each level clear) the game waits with "Tap to continue" before the next scene; the story scene between acts waits at its last line until you tap (a tap during the scene skips it).

## Dance stage (new)
- [ ] First ~20 seconds after landing: Kannan dances (lean when moving, spin when jumping, clap on throw, no coconut thrown); the calm dancers hop when you clap; "ANY BUTTON IS A STEP" banner.
- [ ] Then the red eyes: 16 dancers to defeat, up to 7 at once from both sides, some of them leapers (higher, faster jumps); "THE BEAT DROPS!" at half way gives more leapers and faster spawns.
- [ ] No white borders on the possessed dancers (the third pose with the pink glow is no longer used).
- [ ] Is it fun and hard enough? Tell me what to change (number to defeat, how many at once, leaper share).
- [ ] The turn has a warning: the last 5 s of dancing the lights flicker red with a low rumble and the dancers' eyes glow; 2 s before, "Kannan thinks "Why are their eyes turning red?" and they stop swaying; then Kannan says "This doesn't look good... Thomakutty, vittoda!", about 1.5 s of safety before the first dancer turns, and new dancers only start coming about 4 s after.
- [ ] Left / right while dancing: lean, bounce, and he turns on the beat (disco shuffle).
- [ ] Dance stage layout: two low steps at the ends, two mid platforms, and one high golden platform in the middle (Kannan's haven). Dancers hop up onto the steps and mid platforms after you but cannot reach the haven; from a mid platform, jump and steer onto it. If the haven makes the fight too easy (a safe spot to rest), tell me and I'll lower or shrink it.
- [ ] Dance frames: Kannan uses his own dance frames in the dance part; the crowd uses the new clean sheets.

## Jump feel (after a Motorola Edge 70 Pro tester reported jump issues)
- [ ] A quick tap on JUMP gives a real hop (about as high as a low step), not a tiny twitch.
- [ ] Pressing JUMP a split second BEFORE landing still jumps when you land.
- [ ] Pressing JUMP a split second AFTER running off a ledge still jumps.
- [ ] Ask the tester what exactly goes wrong (no jump at all, low jump, late jump, double jump) if it still happens.

## Skips (new)
- [ ] During a dialogue box only a tap on the box or its back / next / X buttons does anything; tapping the rest of the screen, or pressing JUMP / THROW / the arrows, never skips it.
- [ ] Cinematics (the fall into Pathalam, Odiyan's last strike, the mundu finale) cannot be skipped: taps and keys do nothing and they play to the end.
- [ ] Karinkanni: after dying in the boss fight you respawn at the tea stall and she waits (no ray, no falling stones) until you walk back into the arena; then she starts her pattern again after a short pause.
- [ ] Maveli's story page ("the king below") has him looking left.

- [ ] Pey Komban: after dying 4 times in his arena, the next respawns start with the leaf spear and an "AMMA'S GIFT" banner (also after a game over).
- [ ] The spear ray: no gap between the spear tip and the green flare, and the beam is continuous.
- [ ] Act III: no hoof-prints on the ground and no PRINTS counter; Odiyan stays hittable for about 1.7 s while he changes form (the full length, so the fight is fair). Tell me if it is too easy.
- [ ] Act III start: Velu is standing by the path where his opening line appears (he had no picture before).
- [ ] After a game over, the retry of a level does NOT repeat the opening line of the level.
- [ ] After a boss falls (Act III included): any dialogue shows first, then the sacred tree blooms in front of you, and the clear screen waits until the bloom is done before "Tap to continue".
- [ ] Choosing the Interlude (dance) from the level selector: no stray dialogue boxes appear during the quick replay of Odiyan's last strike; it goes on by itself to the dance stage (before, a hidden dialogue box froze the screen).
- [ ] Failing Pey Komban (or any boss) and retrying after a game over does NOT replay the village / Thoma lines or the opening line of the level; the boss's own opening line is heard once, not on every try.
- [ ] Dance stage retry after a game over: no angel descent and none of Kannan's five lines again; he starts on the floor and the dancing begins.
- [ ] Pey Komban's stomp jump: he crouches (the glowing crouch pose) before it, and is in a legs-apart leaping pose in the air, not standing.
- [ ] Pey Komban never jumps onto or across the two platforms: standing on one is a safe haven (he can still charge and stomp on the floor). If it is now too easy or the fight stalls, tell me.
- [ ] Pey Komban's stomp is back to the original (lands about 120 px from you); the only change is that while you stand on a platform he never stomps on or across it (safe haven). His jump animation (crouch, leap) is kept.
- [ ] Jumping on crabs, cobras, goons, imps and dogs: a stomp kills them reliably even when the floor stops you in the same instant (you used to die sometimes). Tell me if you still die while jumping on one.
- [ ] Before the ground opens at the end of Act IV: Kannan is hunched and panting for about 5 s (panting sound), says "I cannot do this any more..."; then the ground opens, he falls with a scream and the dream scene follows. He uses the 8 hand-drawn exhausted frames (exh_0..7: panting, kneeling, looking up, scream, floating). The panting file is only 2 s and the scream only 1 s: tell me if you want longer takes.
- [ ] Maveli's realm: Kannan floats down into the level (the last frame of the exhausted strip, with a soft golden glow and the descent sound) and lands on the first platform; then he is hunched and tired until Maveli's blessing.
- [ ] Maveli's realm until the blessing: his walk is the hand-drawn beaten-up walk (8 frames, slow and heavy); standing he breathes hunched; jumping keeps a leaning run. After the blessing he is normal again.
- [ ] Maveli's realm until the blessing: jumping uses the hand-drawn beaten-up jump (take-off, rising, peak, falling, landing) and the rope swing uses the beaten-up grab / swing / let-go frames. Check they line up with the rope on the phone.

## New hand-drawn Kannan set (hn*) + bigger beaten-up jump/swing
- Normal hero now uses the new sheet: idle (hnidle), run (hnrun), jump crouch/take-off/rising/peak/falling/landing (hnjump), rope grab/swing/let-go (hnact 0,1,3), coconut throw (hnact 5 standing, 6 while running). Check: run, jump arc, landing dust, throwing standing and running, vine grab alignment (hand on the rope), trishul still uses its own frames.
- Maveli's realm jump and rope swing (exj_*) re-cut about 11% bigger so they match the panting walk.

## Maveli's throne scene
- Seated Maveli on the throne now faces left, towards Kannan.
- First line before the story: "Son, you do not look good..." (6 lines now).
- Blessing: after the last line a golden light gathers round the battered Kannan (about 0.8 s, soft chime), then a little revival jump, flash, and he switches from the beaten-up look to the normal hero. Check it reads well and the lamps turn gold at the same moment.
- Blessing revival is now a float: he rises about 40 px with arms out (glow and sparkles follow him), hovers, and drifts back down (about 1.7 s) in the healthy look. Check the length feels right before the act clears.
- Skin tone: the new hero set (hn*) and the beaten-up set (exh, exw, exj) were too orange next to the old hero; the skin pixels are now toned to the old deeper brown. Check the hero in Acts I-V, Maveli's realm (tired look) and the blessing switch all look like the same person.
- Run cycle: the new 8 run frames are very similar, so it read as "leaning forward". The cycle now plays at the old speed (2 ticks a frame, 16-tick loop) and he bounces up and down on every stride. Check it looks like running; if not, the next step is a new run sheet with clearer contact / passing / flight poses (prompt in docs/HERO_FULL_SET_PROMPT.md).
- New run strip (South Indian Runner, assets/reference): contact, down, passing, flight x2, cut to the hero height (hnrun_0..7), 3 ticks a frame, flight frame lifted 3 px. Check it reads as running and the feet do not slide on the ground.
- Skin tone of the whole hero family (hn*, exh/exw/exj) re-matched to the story-scene hero (scenehero_*): about 180,103,59 on the skin pixels.
- Sizes: Maveli in play is about 1.5 hero heights (was 2.6x; seated and standing now match the scene ratio of 1.3-1.5x); the hurt Kannan strip (Act III fall) is drawn at the hero's height (30, was 34). NPCs in story scenes were already consistent (74-82 px, Maveli 128), Soniya at the stall is 30 px.
- Blessing: during the float he shows the healed angel pose (ang_*) at hero size; before and after he stands normally (the landing crouch no longer sticks after the scene).
- Stage start: while the opening box holds the game he stands (no crouched peak/landing pose); the landing crouch is not drawn while a box or the pause freezes the game.
- Sacred trees: roots sunk 5 px into the ground (they looked like they stood on top of it).
- Banner and box order: the act-name banner (and the WELL DONE banner) shows first, the dialogue box comes when it has gone (they were drawn on top of each other). At a stage start the game stands still during the banner (about 2 s), then the box.
- Clear screen: after the closing box (Amma in the prologue) the wait drops to under a second; on levels without a boss, a tap works after about 1.2 s; "Tap to continue" appears right away and stays steady (no blinking). The prologue banner is 2.5 s now (was 5.6 s). Boss clears still wait for the tree bloom.
- Bullock cart (Act II scenery): the baked-in white background (inside the wheels and a grey ground patch under it) was removed; the wheels are see-through now and it sits on the real ground. Check it in Act II.

## Language: English / Malayalam (new)
- Title screen: tap "English" or "മലയാളം" under the level selector (or press L). The choice is remembered. Check on the phone that the words are easy to hit with a thumb.
- In Malayalam everything is drawn with the bundled Noto Sans Malayalam: HUD, banners, dialogue boxes, story pages and scenes, the pause menu, game over, tutorial, credits, the on-screen THROW / JUMP buttons. Check that long lines fit in the dialogue boxes (the text shrinks to fit, 2 lines) and that no letters look broken on the phone.
- The title logo is text-set in Malayalam for now (the logo picture is English); see docs/LOGO_ML_PROMPT.md.
- Translation script: docs/MALAYALAM.md (English and Malayalam side by side). The Malayalam is my draft: to be verified before release. Edit the second column, then run `node tools/lang.js build`.
- Logos: the new English logo (logo_hi.png) and the Malayalam one (logo_ml_hi.png) are in; the title, credits and story page use the one for the chosen language. The Malayalam title is the transliteration (കണ്ണൻ ആൻഡ് ദി കാഞ്ഞിരവനം ക്രോണിക്കിൾസ്). The ribbon text in the Malayalam picture has spelling mistakes (see docs/LOGO_ML_PROMPT.md, Status).
- Malayalam size: all Malayalam text is drawn 16% smaller than before (it looked too big and ran out of the tutorial box). The tutorial box wraps the Malayalam text, "Step 3 of 5" is "ഘട്ടം 3 / 5", and the tutorial hints ("Walk into the parotta" and the others) are translated. Check HUD, banners and dialogue boxes still read well at the smaller size.
- `LANG_ML=1 node tools/smoke-test.js` plays the whole game in Malayalam and lists every string that still has no Malayalam (currently none seen in the bot's run; the tutorial and story screens are covered by `node tools/lang.js doc`).

## Touch buttons: slide between THROW and JUMP (fix)
- Reported: switching between THROW and JUMP sometimes lost the jump, most in the fast Act II ride. Cause: a button kept the finger that first touched it, so a thumb rolling from THROW to JUMP without lifting never pressed JUMP; also a very short tap during a slow frame could fall between two game ticks.
- Now each finger is tracked by itself and can slide from one button to the next (left/right too): the new button is pressed, the old one released. A press is held for a few ticks so a quick tap is never missed. Still two thumbs, still three buttons, no new control.
- Check on the phone, Act II ride and Act I: hold THROW, roll the thumb onto JUMP (should jump and stop throwing); tap JUMP very quickly while mashing THROW; use two thumbs (one on each); in the other acts slide between the arrows.

## Dialogue arrows and the stage-start pose (fix)
- The "next" arrow strip under a dialogue box was as wide as the "3 / 6" counter even when the box is a single line with no counter. It is now only as wide as the arrow when there is no counter.
- At the start of an act the hero stood in the jump pose while the act banner held the game and the opening box waited. He now stands (idle) until the box appears and the game starts. Check Act I and the other acts: banner, then box, hero standing the whole time.

## Old hero sprites after a fast start (fix)
- The game checked once whether the whole new hero set (hnidle, hnrun, hnjump, hnact) was loaded. If the first check came before every picture had loaded (fresh start, slow phone), the answer "no" was kept for the whole session and the old, smaller hero frames were used. The check now keeps only a "yes" and retries every half second.
- Check on the phone right after a cold start (close the app, open, tap fast): the hero should be the new set from the first stage (idle, 8-frame run, new jump poses), never the old one.

## Level selector locked by progress
- Title screen: the selector now only goes as far as the furthest level reached (the right arrow dims there). A brand-new player can only pick the Prologue. Clearing a level unlocks the next one. The furthest level ever reached is remembered separately from where a new game starts.
- Finish the game (ending): afterwards every level can be picked, and a new game still starts at Act I (default pick). Check Acts II to V can be replayed after the ending.
- Players who already had saved progress keep it (their furthest act is the unlock). Someone who finished the game before this change had progress reset to Act I by the old ending, so they unlock again as they play (or by finishing once more).

## Locked levels are visible (selector)
- The title selector now lets you look at every level: levels not reached yet show the act name and level name dimmed, a padlock and the word LOCKED (LOCKED in Malayalam too). Tapping or pressing Space on a locked level only makes a low beep; the arrows still move on. Reached levels start as before.
- Check on the phone: fresh install shows Prologue unlocked, Act I onward locked; after clearing the Prologue Act I opens. Tap the arrows to the end; tap the locked level (should not start). In Malayalam the word fits.
