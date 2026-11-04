# Story scenes (built)

Why: playing the game, the levels feel disconnected. `docs/STORYLINE.md` has the links between them (Ravi lends the bike,
the poisoned dream, Maveli pulling him underground) but the game shows almost none of it.

Decision from the owner: a coded cutscene is fine. It stays old-school simple: **drawn and moved by code, not animated frame by frame.**

## What a story scene is
- A short beat shown **between two levels**: a backdrop, **the characters of that moment**, and one or two speech boxes.
- Backdrop: the next level's sky and hills (or the disco bar, or Pathalam), darkened, with a letterbox.
- Characters are the sprites converted from the reference sheets (Kannan, Ravi, Soniya, Thoma, Biju, Mooppan Velu, Maveli,
  Kili, Kuttichathan, and the bike). They are **moved by code**: slide in from the edge, stand with a gentle bob, a small hop
  when they speak. No animation sheets needed.
- Each scene has **1 to 3 characters and 1 or 2 speech boxes**. A box is two lines, one speaker, same look as the in-game dialogue boxes.
- Total length about **4 to 6 seconds**. It ends by itself. **Any tap or key skips it** after half a second.
- Never appears during play, never asks for a tap, never carries anything the player needs to progress.
- Shown only when you advance to a new level in the normal flow. **Not** on "tap to continue", **not** after game over (retry).

## Rule change this needs (CLAUDE.md, rule 5)
Rule 5 says no cutscenes and at most 3 dialogue boxes per act. Story scenes are an exception, like the throne scene and the ending:
**one scene per level transition, auto-dismiss, skippable.** Same three buttons, same one-hit rule, no choices, no menus.

## The scenes (wording follows STORYLINE.md; edit freely)
| # | When | Who is on screen | Speech boxes (speaker: two lines) |
|---|---|---|---|
| 0 | First ever play, before the Prologue | Kannan, Biju, Thoma, village at golden hour | BIJU: "THE FOREST IS RESTLESS AGAIN. TAKE THIS COCONUT." / THOMA: "STAY ON THE TREES. THE GROUND IS THEIRS NOW." |
| 1 | Prologue to Act I | Kannan walking into the dusk forest | (no speech) caption: "THE GOLDEN HOUR ENDS. HE GOES IN." |
| 2 | Act I to the bike ride | Ravi, Kannan, the Bullet | RAVI: "ONE GROVE DOWN. THE CARNIVAL IS FAR AND THE NEXT TREE IS WITHERING. TAKE MY BIKE, MACHANE." / RAVI: "NO TIME TO WALK IT. GO, HOLD TIGHT!" |
| 3 | Bike ride to Act II | Kannan beside the stopped Bullet, fire and Ferris wheel ahead | KANNAN: "THE FOREST CLOSED IN. FROM HERE, ON FOOT." |
| 4 | Act II to Act III | Kannan, a coconut glowing on the ground (Kuttichathan's relic) | (caption) "TWO GROVES FREED. THE EMBERS GO COOL." / "THE HIGHLAND FOG IS WAITING." |
| 5 | Act III to the interlude | Kannan limping, Mooppan Velu, Kili on a shrine | MOOPPAN: "THE DOG BITES DEEPER THAN YOU FEEL." / KANNAN: "...MY ANKLE. IT BURNS." |
| 6 | Interlude, as it starts | Kannan, calm dancers, disco ball | DANCER: "DANCE, MACHANE! FOLLOW THE STEPS!" |
| 7 | Interlude to Act IV | Ravi crouching over Kannan lying down, stars | RAVI: "YOU KEPT SHOUTING LEFT AND RIGHT." / RAVI: "ODIYAN'S VENOM. YOU'LL BE ALL RIGHT. PROBABLY." |
| 8 | Act IV to Pathalam | Kannan at the flooded edge, Maveli's eyes glowing below | MAVELI: "I BROUGHT YOU DOWN. I HOPE THAT WAS ACCEPTABLE." |
| 9 | Pathalam to Act V | Thoma, Soniya with her cart, Kannan at the temple gate | THOMA: "STAY. ON. THE. TREES. PROMISE ME." / SONIYA: "I BROUGHT EVERYTHING. DON'T YOU DARE DIE." |

The ending already has its own scripted lines, so it gets no scene. In-level dialogue boxes (Soniya's chai stall, Mooppan's hoof-prints,
the throne scene) stay as they are.

## Open points to settle before the final text
- Ravi's line after the dream in the storyline says "Four groves left to go. One more." After Act III only two groves remain,
  so scene 7 avoids the count. Tell me the number you want.
- Scene 0 plays only on the very first play, before the Prologue. Scene 9 uses lines the storyline gives to Thoma and Soniya at the gate.

## What I need for the art
Sprites for: Ravi, Soniya, Thoma, Biju, Mooppan Velu, Maveli (eyes only is enough), Kili, the bike (the new sheet), and the
calm dancers (the game already has them). The reference sheets for most of these are already in `assets/reference`.
A lying-down Kannan is done by rotating the idle sprite in code.

## How it would be built
1. A `scene` card state between `clear` and the next level, with its own timer, fade and skip.
2. A table of scenes (backdrop, characters and where they stand, speech boxes) next to the level list: wording edited in one place.
3. A small helper that places the sprites, slides them in, bobs them and draws the speech boxes. No new mechanics.
4. The smoke test keeps passing, plus checks that scenes are skipped on retry and on continue.
5. `CLAUDE.md` and `docs/HANDOFF.md` updated with the new rule.
