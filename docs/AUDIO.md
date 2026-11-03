# Kanjiravanam Chronicles: Audio Plan (browser / Android build)

Companion to `docs/music-guide.md`. That guide describes the sound (Kerala instruments x 80s synth) and a
hand-made LMMS workflow for Godot. This file adapts it to the current game: one HTML/Canvas game, wrapped
for Android with Capacitor, with audio generated through ElevenLabs (or made by hand, either way works).

## How the game finds audio
The game already has an audio manager. It looks for files, and does nothing if they are missing.

```
assets/audio/music/<name>.ogg   (or .mp3)     looping music, stings
assets/audio/sfx/<name>.ogg     (or .mp3)     short sound effects
```
- Music crossfades over 0.8 s when the scene or boss changes. Stings play on top and briefly duck the music.
- Each sound effect plays its file if present, otherwise the built-in beep still plays.
- Player can toggle sound with the SND label (top right) or the M key. The choice is remembered.
- Do not rename files. The names below are what the game asks for.

## Style preamble (put at the start of every music prompt)
> Instrumental video game loop. Fusion of traditional Kerala instruments (mridangam, chenda, veena,
> nadaswaram, bansuri, temple bells, ghatam) with 1980s analog synths (DX7-style electric piano,
> Moog-style bass, TR-808 drums, gated-reverb snare, chorus pads). No vocals. Seamless loop, no fade-out.

Do not put living artists' names in prompts (the guide's reference artists are for listening only).
Describe instruments, tempo and mood instead.

## Music (looping)

| File | Where it plays | BPM | Length | Prompt after the preamble |
|---|---|---|---|---|
| `bgm_menu` | Title screen | 72 | 60-90 s | Warm and inviting. Veena lead over a soft synth pad. |
| `bgm_prologue` | Prologue (village by the river) | 80 | 90 s | Gentle mridangam, bansuri, nostalgic synth strings, evening mood. |
| `bgm_forest` | Act I, Yakshi's Hollow | 65 | 90 s | Sparse and hypnotic. Temple bell, low synth drone, distant bansuri, a creeping veena motif. Beautiful but uneasy. |
| `bgm_carnival` | Act II, Chathan's Carnival | 120 | 90 s | Nadaswaram and DX7 electric piano. Festive but unsettling, like a party that went wrong. |
| `bgm_act3` | Act III, Odiyan's Hunt | 75 | 90 s | Chenda and distorted synth bass. Foggy, building dread. |
| `bgm_act4` | Act IV, Karinkanni's Curse | 68 | 90 s | Ghatam and synth strings. Rain-soaked, eerie and beautiful. |
| `bgm_act5` | Act V, Pey Komban's Rampage | 100 | 90 s | Temple bells, heavy chenda, brass-like synth. Sacred and massive. |
| `bgm_boss_yakshi` | Yakshi fight | 100 | 60 s | Hypnotic. Detuned veena and a slow 808 pulse, minor key, seductive and cold. |
| `bgm_boss_chathan` | Kuttichathan fight | 150 | 60 s | Frantic and playful. Fast nadaswaram, 808 hi-hat chaos, mischievous. |
| `bgm_boss_odiyan` | Odiyan fight | 140 | 60 s | Intense chenda polyrhythm and a screaming synth lead. |
| `bgm_boss_karinkanni` | Karinkanni fight | 125 | 60 s | Dark and hypnotic. Low mridangam, 808, minor-key synth. |
| `bgm_boss_komban` | Pey Komban fight | 135 | 60 s | Heavy chenda, low brass synth, stomping, relentless. |
| `bgm_ending` | Win screen | 80 | 60-75 s | Uplifting reprise of the menu theme. Nadaswaram and veena, sunrise feeling. |

Planned scenes (not in the game yet, generate later):

| File | Scene | BPM | Length | Prompt |
|---|---|---|---|---|
| `bgm_pathalam` | Maveli's underworld | 60 | 75 s | Ethereal. Bansuri, glass-like pads, deep warm drone, soft bells. |
| `bgm_disco` | Disco dream interlude | 118 | 45 s | 1980s disco. Slap-style synth bass, tabla, string stabs, slightly off-kilter. |
| `bgm_bike` | Act II bike ride | 130 | 45 s | Driving 808 kick and chenda. Fast, pure forward momentum. |

## Stings (play once, no loop)

| File | When | Length | Prompt |
|---|---|---|---|
| `sting_boss_intro` | Boss appears, before the boss music settles | 4-6 s | Dramatic chenda hit and a synth swell. |
| `sting_victory` | Act cleared | 6-8 s | Rising nadaswaram fanfare. Triumphant. |
| `sting_gameover` | Out of lives | 4-6 s | Descending veena phrase. Melancholy, not harsh. |

## Sound effects (in `assets/audio/sfx/`)
The built-in beeps already cover all of these, and they feel instant, which matters for throw, jump and hit.
Suggested split: keep the beeps for the three fast ones, generate the "big moment" ones.

| File | Moment | Length | Generate? | Prompt |
|---|---|---|---|---|
| `throw` | Throwing a coconut | 0.2 s | optional | Short wooden whoosh, light thud. |
| `hit` | Enemy pops | 0.3 s | optional | Small crunchy pop with a glassy sparkle. |
| `jump` | Jump | 0.2 s | optional | Quick springy hop, bare feet push-off. |
| `vine` | Grabbing a vine | 0.4 s | yes | Rope creak and leafy rustle. |
| `slash` | Aruval swing | 0.4 s | yes | Fast metal sickle swish. |
| `die` | Player hit | 0.8 s | yes | Comical but sad descending boing with a small thud. |
| `chai` | Walking past a chai stall | 0.8 s | yes | Hot tea poured into a glass, a happy little bell. |
| `powerup` | Taking parotta | 0.6 s | yes | Bright chime with a sizzling crunch. |
| `boss_roar` | Boss appears | 1.5 s | yes | Deep monstrous roar with temple-bell resonance. |

## Format and looping
- ElevenLabs returns MP3. Browsers loop MP3 with a tiny gap, so convert music to OGG for gapless loops:
  `ffmpeg -i bgm_forest.mp3 -c:a libvorbis -q:a 5 bgm_forest.ogg`
- Check the loop: play the file twice back to back. If there is a click or silence, trim the silence at the
  start and end (`-af silenceremove=1:0:-50dB`) or regenerate.
- Keep music near -16 LUFS and sound effects a little louder, so effects are never buried. The game plays music
  at 60% volume already.
- Size: about 1 MB per 90 s loop at quality 5. All music is roughly 15-18 MB, which is fine for an Android app.

## Generating with ElevenLabs (do this in Claude Code)
1. Run a cost estimate first (music is the expensive part).
2. Generate 2 takes per track. Listen. Keep the better one.
3. Save straight into `assets/audio/music/` and `assets/audio/sfx/` with the exact file names above.
4. Convert to OGG, run the loop check, then open the game and walk through each act.
Rough cost from third-party figures: about 900 credits per minute of music and 200 per sound effect. About
21 minutes of music in the first batch is roughly 19,000 credits per take, so plan for the Creator plan, not Starter.
Check the current numbers with the estimate before spending.

## Licence
- ElevenLabs free plan is not cleared for commercial use. Use a paid plan for anything you ship.
- Read the current terms before release. Reports say self-serve plans cover commercial use except "studio games".
- Freesound samples (if you also use the hand-made route): CC0 needs nothing, CC-BY needs attribution in the credits.
- Keep a `docs/audio-credits.md` listing each file, how it was made, and the date.

## Order of work
1. Pilot: `bgm_menu`, `bgm_prologue`, `bgm_forest`, `sting_victory`. Check the style and loop feel in the game.
2. The rest of the acts and their boss tracks.
3. Sound effects for the big moments.
4. Planned scenes (Pathalam, disco, bike) when those scenes exist.
