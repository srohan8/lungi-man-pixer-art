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
