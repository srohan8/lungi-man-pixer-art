# Story pass 3: more story, same gameplay (DRAFT for the owner to edit)

Agreed in the design talk. Nothing here is built yet. Wording is a first draft: edit freely, then the game follows this file.
Hero stays **Kannan** for now. Source of the backstory: `docs/STORYLINE.md` (and the old Godot GDD, only the story parts).

## Principles
- Bring the **story** of the old design into the game. Leave its **mechanics** out (no new moves, HP flame lamp, quest tracking, abilities).
- The village's guilt is revealed **late and quietly** (option B): hints during play, Maveli confirms it, the ending shows it. Kannan never learns.
- Longer story text is allowed, but only **between levels** in a story panel (portrait + text, next / skip). During play: short banners only.
- Text uses the normal font (already done). Hero name Kannan. Story text in sentence case.

## Rule changes this needs in CLAUDE.md (when we build)
1. **Story panel** (between levels and the opening): longer text, several pages, tap for next, skip any time. Never during play.
2. **Prologue tutorial exception**: step-by-step messages freeze the game until confirmed; each step completes when the player does the action.
   First play, or when the prologue is picked from the level selector. A visible SKIP. After the prologue nothing ever stops for a message.
3. **Weapon**: the Sun Staff becomes **Bhadrakali's trishul** (same behaviour: one pickup replaces the coconut, hits in a line, cuts enemy shots,
   double boss damage, no ammo, same THROW button).
4. **Mundu finale**: after Pey Komban's last hit the controls go away and a coded scene plays (once, skippable).
5. **Dialogue rule 5**: "max 3 boxes per act" stays for in-play boxes; the panel is separate.

## 1. Opening (first ever play only, skippable, ~1 minute, story panel pages)
1. **The place.** "At the edge of Kerala's backwaters sits Muruthikudi. Beyond it, the sacred grove, Kanjiravanam. Children are told never to go there after dark."
2. **The seal.** "Long ago a gate to the demon realm tore open in the grove. The gods locked it to five sacred trees, each tended by a family of grove-priests. The demons, the Kazhukans, waited." (picture: the five trees)
3. **Maveli.** "Beneath the roots, a king was sent below a thousand years ago. He gave his word, and he keeps it. Every Onam he comes home, and every year the grove smells worse."
4. **The crack.** "Fifty years ago the seal cracked. Tree by tree, the groves fell to the Kazhukans. Nobody in the village will say how."
5. **Kannan.** "One morning a coconut tapper fell deeper into the grove than anyone had gone. He should have died. A goddess caught him." Bhadrakali: "You are clean. Take this. Go." She gives him the trishul.

Never named in the opening: Velu, the logging deal, the guilt.

## 2. Prologue: village scene, then the guided tutorial
Village scene (existing): **Biju**: "The forest is restless again. I know exactly when it changed. Take this coconut." / **Thoma**: "Stay on the trees. The ground belongs to them now."

Guided steps (message freezes the game, confirm, then do the action; the matching on-screen button pulses):
1. **Move**: "Walk right with the arrows." Done after a short walk.
2. **Jump**: "Press JUMP to hop the gap." Done on the jump.
3. **Throw**: "Hold THROW. Coconuts fly forward." Done when the first crab is hit.
4. **Parotta**: "Parotta gives triple throw." Done on pickup.
5. **Vine**: "Jump into the vine and it swings you across." Done when the vine is grabbed.

## 3. The trishul
After the opening, Bhadrakali leaves her trishul at forest shrines along the way. That is the pickup in Acts II, III and V (not Act IV: the eye needs range).
Art: a new sheet from the prompt we write (trishul held, charging, firing, ray with fire-red and gold). The Sun Staff art stays as the fallback.

## 4. Sacred trees and healing, every act
- Each boss arena has its **sacred tree**: dark, withered, a faint red glow. It is scenery.
- When the boss falls the grove heals: black soil turns green, stars come back, the tree blooms in the act's colour.
- Colours: **I teal, II amber, III indigo, IV green, V gold.** Act V's tree is the big banyan with the portal in its roots.
- Replaying a beaten act (level selector) shows it healed. The five trees bloom together in the ending.

## 5. Where the backstory shows up (nothing is spelled out until Pathalam)
| Where | What the player gets |
|---|---|
| Opening | The world, the seal, the crack, Kannan's blessing (no names of the guilty) |
| Prologue | Biju: "I know exactly when it changed." Thoma: "The ground belongs to them *now*." |
| Act I | Soniya serves chai from a spring she is saving: "My last clean one." Tree I blooms. |
| Act II | Ravi talks and talks. A line about the planks in his shop not matching the walls. Tree II blooms. |
| Act III | Velu in his cave: knows every demon, never says why. Kili the crow caws before each change. Tree III blooms. |
| Act IV | Sr. Devi, the one person with no guilt, who sees the others'. Tree IV blooms. |
| Pathalam | Maveli: "Someone sold the edge of that grove. I felt it." No names. Then the blessing. |
| Act V | Thoma at the gate: "Stay. On. The. Trees. Promise me." Soniya's cart: "I brought everything." Then the **mundu finale**. |
| Ending | The five trees bloom. Then the epilogue below. |

If Maveli arrives unhurt (no death in Pathalam) he is only a silhouette on the throne; otherwise the full scene (blessing stays one free hit).

## 6. The mundu finale (Pey Komban's last hit, coded scene, no controls)
The final blow triggers it: the mundu comes off and lassos the tusk, Kannan climbs and delivers the knockout from above, lands in his boxers.
Thoma hands him a fresh mundu. Comic and Kerala. Skippable. Needs new hero frames (lasso, climb, boxers).

## 7. Ending epilogue (what each person does; Kannan never knows)
Short beats over the healed grove, each skippable:
- **Velu** leaves his cave and lights a lamp at the third tree.
- **Biju** beaches his houseboat and starts pulling up the planks.
- **Ravi** closes the toddy shop, finally quiet.
- **Soniya** pours the last of her spring over the roots.
- **Thoma** kneels at the shrine and, for the first time, does not ask forgiveness.
- **Kannan** picks up his rope. There are coconuts to harvest. Bhadrakali: "Kanjiravanam breathes again." Maveli, below: "Onam is coming. I will come home."

## 8. Side-quest beats (walk-through only, no tracking, rewards are existing effects)
Ravi's swing-off (he races ahead on the vines, scenery), Devi's bell (walk past: it rings, +1 life), Kili's rice (she caws). No abilities, no whip, no Naga fight
(a sleeping serpent as scenery is fine).

## Art and assets needed
- Trishul sheet (prompt to write), Bhadrakali sprite is done.
- Hero frames: mundu lasso, tusk climb, boxers. Sacred tree sprites (withered + bloomed in 5 colours). Bell prop.
- Story panel UI (code), tutorial pulse ring on the buttons (code).

## Parked for later discussion
- **Boss difficulty** across the five acts.
- **Level transition story problems**, for example going in and out of the disco / interlude.
- Whether Ustad Basheer joins the game (his songs were the clue source in the old design).
- Phone layout: smaller playfield with side bars for the story and the touch buttons (needs a test on a real phone).
