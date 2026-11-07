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
