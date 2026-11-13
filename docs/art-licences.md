# Art and code tools: licence notes

Read on 2026-11-13. These are summaries of the public terms, not legal advice. Re-read before release.

## Tools used (owner)
- **Image generation:** OpenAI / ChatGPT.
- **Editing:** Figma.
- **Code and scripts:** Claude (Anthropic).

## Where the shipped art came from (owner's account, 2026-11-13)
Everything shipped was either (1) generated with AI image tools from reference images supplied by the owner, or (2) created by Claude from the storyline (the game's built-in code-drawn sprites and scenes). The owner created the character concepts. `assets/reference/` holds the references and sheets and is not shipped (the build skips it and git ignores it).
Owner's answer: the references were for style (what pixel art is and how it should feel), not images to copy. Style is not owned by anyone, but the rule that stays: no shipped sprite may copy a specific character, scene or layout from another game or artist, and prompts should never have named a real artist, game or franchise. Still to do: a quick look through the sprites for anything that resembles a known character, and, if the prompts are saved, a check that they name no artist, game or franchise.

## What the terms say
| Tool | Terms read | Ownership of what you make |
|---|---|---|
| OpenAI / ChatGPT | Terms of Use (Europe), updated 2026-01-16, https://openai.com/policies/terms-of-use/ | Between you and OpenAI, and to the extent the law allows, you own the Output and OpenAI assigns you its rights in it. Output may not be unique: other users can get similar results. You must not represent Output as human-made when it was not. You must review Output before using it. |
| Figma | Terms of Service, effective 2026-03-11, https://www.figma.com/legal/tos/ (section 2.8) | The customer keeps all rights in its own content; Figma owns the service. Figma's AI features have separate Product-Specific Terms (not read): only relevant if Figma AI was used to make images. |
| Claude (Anthropic) | Consumer Terms of Service, https://www.anthropic.com/legal/consumer-terms | Between you and Anthropic, Anthropic assigns you its rights in Outputs, subject to compliance with the terms. Not read: Anthropic's commercial terms, which may apply depending on the plan used. |

## Points to keep in mind
- The in-game credits say the pictures are "Made with AI image tools" and "Edited into the game by Moonga Studio". That matches the OpenAI rule about not presenting AI output as human-made. Keep it that way.
- Whether AI-generated art can be protected by copyright is unclear in many countries. Owning the output under these terms does not stop others from copying it.
- Other users can receive similar output, so check that no sprite looks like a known character or franchise (Reddit's rules ban copycats and third-party IP).
- Reddit's funds program asks for apps that are "unique, original, and created by you". AI-made art may be questioned there; the owner should decide whether to say so in the app description.
- Reference sheets under `assets/reference/` are not shipped. Check that no reference image is a third party's artwork.
