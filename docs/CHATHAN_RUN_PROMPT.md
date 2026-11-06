# Kuttichathan: fireball charge run cycle (art prompt)

Why: the fireball charge across the arena is one fixed pose that bounces in code. A real run cycle will look right, the way Pey Komban's `komrun_*` does.

Attach as references: `assets/reference/kuttichathan_sheet.png` (the character design, size and colours) and `assets/reference/peykomban_sheet-running.png` (how a run sheet is laid out).

## Prompt
A run-cycle sprite sheet of the mischievous imp Kuttichathan from the reference, one row of 6 frames, all facing right, on a plain white background. Same art style, line weight, colours, glowing red eyes and size as the reference, clean dark outline, flat cel shading, no white sticker outline, no ground, no scenery, no text. Every frame fully inside its cell with margin, and the character the same size in every frame.

He is charging at full speed with a ball of fire in front of him, body leaning far forward, arms pumping, grin wide and wicked, a trail of flames and sparks streaming behind him.
1. Contact: front foot reaching forward, back leg stretched behind, fireball held out ahead.
2. Down: front foot planted, body low, knees bent, flames whipping back.
3. Passing: one leg tucked under the body, body at its highest, still leaning forward.
4. Contact on the other foot: mirror of frame 1 with the opposite leg forward.
5. Down on the other foot: mirror of frame 2.
6. Passing on the other leg: mirror of frame 3, so the loop repeats smoothly.

The feet touch the same baseline in frames 1, 2, 4 and 5. The cycle must loop seamlessly from frame 6 back to frame 1.

## Optional second row (same style)
- Frame A: crouching and winding up, about to charge, flames gathering around him, eyes flaring.
- Frame B: crashing into the wall, dazed, stars around his head (this is his stun pose, currently `chathan_1`).

## After the art arrives
Tell me the filename. I will cut the frames, name them `chaturun_0..5`, and use them for the charge in place of the bounce.

## Round 2: one set of art for the whole Kuttichathan (replaces the old small sprite)
The new fiery imp (Fiery Imp Running Animation Sprite Sheet.png) becomes his only look: the boss, his hops, his stun, and the decoy clones. Same prompt style as the run sheet, same character, same size in every frame, facing right, plain white background, no white outline, flames kept on the back and the fireball in the front hand.
Generate as ONE sheet, one row, 8 frames:
1. Idle: standing, cheeky grin, fireball floating in his open hand, small flames on his back, slightly bobbing stance.
2. Idle 2: same as 1 but knees bent a little lower and flames flicker the other way (the idle loop).
3. Hop up: both feet off the ground, knees tucked, arms out, flames streaming downwards.
4. Hop land: crouched, feet planted, flames flat, a small puff of sparks at his feet.
5. Wind-up (before the charge): crouched low, leaning back, fireball held behind him, flames bursting bigger, eyes glowing, teeth bared.
6. Throw fireball: arm fully extended forward, fireball leaving his hand, flames behind him streaming back.
7. Stunned: dazed after crashing into the wall, sitting or slumped, spiral eyes, stars circling his head, flames almost out (small embers).
8. Clone: the same as frame 1 but pale violet and slightly see-through, with no flames, only wisps of purple smoke (the decoy).
Size note: the imp (not counting the flames) should be about the height of the one in the run sheet, so all frames match it.

## After round 2
Tell me the filename. I will cut the frames, replace chathan_0/1 and the decoy sprite, and keep the run cycle for the charge.
