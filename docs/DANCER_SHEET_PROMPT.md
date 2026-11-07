# Disco dancers: a clean new sheet (art prompt)

Why: the current dancer sheets have a checkerboard or white sticker outline and ground shadows baked into the picture, which shows up as white patches and bands on the dancers in the game. We need clean sheets with a real transparent background (or one plain flat white background and nothing else).

Attach as references: the current calm sheet (`bg_disco_crowd-dance-1.png`) for the six characters, and `Kannan Trident Action Sprite Sheet.png` for the art style and line weight.

## Technical rules (put these first in the prompt)
- Plain flat white background only (or real transparency). No checkerboard, no ground, no floor line, no cast shadow, no glow or aura around the figures, no white outline or sticker border, no text.
- One row per pose, six characters in the same order in every row, evenly spaced, every figure fully inside its cell with margin.
- Every character is the same size as in the other rows (a standing adult is the same height in all rows), feet on the same baseline.
- Side view, facing right, clean dark outline, flat cel shading, 1970s Kerala disco look.

## The six dancers (same as now)
1. Man, curly hair, full beard, pink polka-dot shirt open at the chest, white bell-bottom trousers, brown shoes.
2. Man, curly hair, full beard, blue shirt open at the chest, white bell-bottom trousers.
3. Man, curly hair, moustache, orange short-sleeve shirt, white bell-bottom trousers.
4. Woman, long wavy black hair, gold earrings, pink polka-dot saree with a blue border, bangles.
5. Woman, short hair in a small bun, blue crop top, white shorts, flip-flops.
6. Man, curly hair, moustache, light blue shirt over an orange t-shirt, navy bell-bottom trousers, watch.

## Sheet 1: calm dancing (2 rows of 6)
Row 1: a dance step, one arm raised, one knee lifted, smiling.
Row 2: the next step of the same dance, other arm raised, other knee lifted. The two rows loop as a dance.

## Sheet 2: possessed (3 rows of 6)
Same six people, now possessed: glowing red eyes only (no flames, no aura, no glow around the body), snarling mouth, hands curled like claws, skin and clothes slightly darker.
Row 1: stalking forward, leaning in, both claws out.
Row 2: lunging, one leg stepping, one arm reaching.
Row 3: a hop attack, both feet off the ground, arms out.

## After the art arrives
Tell me the filenames. I will cut them with `tools/make-dancers.js`, check every frame for stray white, and bring back the second possessed pose.

# Kannan dancing (art prompt for the dance stage)

Why: in the dance stage the hero only leans, bounces and spins in code. Real dance frames will look much better. Same rules as above: plain flat white background (or real transparency), no checkerboard, no ground, no shadow, no glow, no white outline, no text.

Attach as references: the hero sheet `Kannan Trident Action Sprite Sheet.png` (design, size and line weight) and the dancer sheet above (the disco mood).

## Prompt
A dance sprite sheet of Kannan, one row of 10 frames, side view facing right, on a plain flat white background. Same character, art style, line weight, colours and proportions as the reference hero: curly dark hair, aviator sunglasses, moustache, bare chest, green coconut satchel across the chest, white mundu with a gold border. Clean dark outline, flat cel shading, no white outline, no ground, no shadow, no glow, no text. Every frame fully inside its cell with margin. He is the same size in every frame, standing height the same, feet on the same baseline. Cool, cheeky, confident, a little goofy, 1970s Kerala disco.
1. Idle groove A: knees slightly bent, shoulders down, one finger pointing up and to the side (the classic disco point), grinning.
2. Idle groove B: knees bent the other way, the pointing finger swung to the other side, shoulders up.
3. Side step left: body leaning left, one foot crossing in front, both arms swinging right, hips out.
4. Side step right: body leaning right, mirror of frame 3, both arms swinging left.
5. Shuffle: weight on one foot, other foot sliding back, elbows bent and swinging, chin up.
6. Jump spin, start: crouched with arms wrapped in, about to leap.
7. Jump spin, mid-air: feet off the ground, body turned three-quarters away, arms out, the mundu flaring.
8. Jump spin, landing: knees bent, arms down, a little dust at the feet (no shadow).
9. Clap: both hands together above the chest, mouth open in a cheer, knees bent.
10. Clap high: both hands clapping high above the head, up on tiptoes, cheering.
Frames 1-2 are the idle loop, 3-5 the moves for left and right, 6-8 the jump, 9-10 the throw button (a clap).

## After the art arrives
Tell me the filename. I will cut the frames, size them to the normal hero height, and play them in the dance stage: idle loop when he stands, the step frames when he moves, the spin frames in a jump, the clap frames on throw (the code lean and bounce stay as a fallback).
