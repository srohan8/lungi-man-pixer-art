# Audio credits

Each shipped audio file, how it was made, and when. Update this whenever a file is added or replaced.

## Music and stings (generated with ElevenLabs, model `eleven_music_v2_5`, 2026-11-03)
Prompts follow the style preamble in `docs/AUDIO.md`. No artist or song names were used in any prompt.
The chosen takes are converted to OGG; the other takes are kept next to them as `_a` / `_b` MP3 spares.

| Game file | Source take | Notes |
|---|---|---|
| `bgm_menu.ogg` | `bgm_menu_a.mp3` | 75 s |
| `bgm_prologue.ogg` | `bgm_prologue_b.mp3` | 90 s |
| `bgm_forest.ogg` | `bgm_forest_b.mp3` | 90 s |
| `sting_victory.ogg` | `sting_victory_b.mp3` | 7 s |
| `bgm_act5.ogg` | `bgm_act5_a.mp3` | 90 s. Carnatic varnam-style prompt, inspired by a described style, not copied from any recording |
| `bgm_carnival.ogg` | `bgm_carnival_a.mp3` | 90 s |
| `bgm_act3.ogg` | `bgm_act3_a.mp3` | 90 s |
| `bgm_act4.ogg` | `bgm_act4_a.mp3` | 90 s |
| `bgm_boss_yakshi.ogg` | `bgm_boss_yakshi_a.mp3` | 60 s |
| `bgm_boss_chathan.ogg` | `bgm_boss_chathan_a.mp3` | 60 s |
| `bgm_boss_odiyan.ogg` | `bgm_boss_odiyan_a.mp3` | 60 s |
| `bgm_boss_karinkanni.ogg` | `bgm_boss_karinkanni_a.mp3` | 60 s |
| `bgm_boss_komban.ogg` | `bgm_boss_komban_a.mp3` | 60 s |
| `bgm_ending.ogg` | `bgm_ending_a.mp3` | 70 s |
| `bgm_pathalam.ogg` | `bgm_pathalam_a.mp3` | 75 s |
| `bgm_disco.ogg` | `bgm_disco_a.mp3` | 45 s |
| `bgm_bike.ogg` | `bgm_bike_a.mp3` + engine sound below | 56 s loop (4 s crossfade tail), engine mixed into the first 20 s. Clean loop without engine: `bgm_bike_loop_only.ogg` |

Licence note: generated on the ElevenLabs Starter plan ($6/mo, 30k credits/mo), which lists a commercial licence for
speech and music. Re-read the current terms before release, including any limit on game studios.

## Sound effects and stings (ElevenLabs sound-effect model `eleven_text_to_sound_v2`, 2026-11-03, one take each)
Files in `assets/audio/sfx/` unless noted. Source MP3s are kept as `<name>_a.mp3`.
`boss_roar`, `die`, `vine`, `slash`, `powerup`, `chai` (boosted +12 dB), `boss_roar_yakshi`, `boss_roar_chathan`,
`boss_roar_odiyan`, `boss_roar_karinkanni` (trimmed to 3 s with a fade), `boss_roar_komban`.
In `assets/audio/music/`: `sting_boss_intro` (3 s, +10 dB), `sting_gameover` (5 s), second attempt with explicit timelines; first 1 s versions kept as `_a.mp3`.
`thunder` (1 s, normalised, 2026-11-04, one take): used in the disco when the dancers turn (shake, lightning flash, rumble).
`throw` (0.4 s), `jump` (0.4 s) and `hit` (0.6 s) were also generated, then trimmed short so repeated fire stays snappy. The built-in beeps remain as the fallback if a file is missing.

## Sound effects and samples
| Used in | File | Source | Licence |
|---|---|---|---|
| `bgm_bike.ogg` (first 20 s) | `freesound_community-350cc-bike-firing-32391.mp3` | Pixabay, Royal Enfield sound effects collection | Pixabay Content Licence (owner to confirm the current terms on the file's page before release) |

## Act V music (replaced the generated track, 2026-11-04)
| Used in | File | Source | Licence |
|---|---|---|---|
| `bgm_act5.ogg` (the final stage, before the boss) | `itswatr-watr-train-to-ernakulam-town-303208.mp3` (kept as `bgm_act5_pixabay_a.mp3`) | "Train to Ernakulam Town" by ItsWatR (Pixabay user Jonas), https://pixabay.com | Pixabay Content Licence. Attribution is not required but welcome: "Music by ItsWatR from Pixabay". Loop-safe (3 s crossfade of the end into the start) and normalised to about -17 LUFS. The earlier ElevenLabs Act V track is in git history. |

## Disco (interlude) music (replaced the generated track, 2026-11-04)
| Used in | File | Source | Licence |
|---|---|---|---|
| `bgm_disco.ogg` | `kamaleshsiddu-tamil-comedy-music-13957.mp3` (kept as `bgm_disco_pixabay_a.mp3`) | "Tamil Comedy Music" by Kamalesh Siddu, Pixabay | Pixabay Content Licence. Attribution welcome: "Music by Kamalesh Siddu from Pixabay". This track is registered with YouTube Content ID: keep the Pixabay licence certificate when posting the trailer to YouTube, in case of a claim. Loop-safe (2 s crossfade), normalised to about -17 LUFS. The earlier ElevenLabs track is in git history. |

## Motorbike ride music (replaced the generated track, 2026-11-04)
| Used in | File | Source | Licence |
|---|---|---|---|
| `bgm_bike.ogg` (Act II ride) | `lineshjose-kaleidoscope-indian-fusion-music-278547.mp3` (kept as `bgm_bike_pixabay_a.mp3`) | "Kaleidoscope Indian Fusion Music" by Linesh Jose, Pixabay | Pixabay Content Licence. Attribution welcome: "Music by Linesh Jose from Pixabay". Loop-safe (3 s crossfade), normalised to about -17 LUFS. |

## Backups of the replaced tracks
The earlier ElevenLabs tracks are kept in `assets/audio/music-old/` (bgm_bike_elevenlabs.ogg, bgm_act5_elevenlabs.ogg, bgm_disco_elevenlabs.ogg). They are not packed into the app. To go back, copy one over the matching name in `assets/audio/music/` (for example bgm_bike_elevenlabs.ogg becomes bgm_bike.ogg).

## Finale music (Pey Komban knockout scene)
`bgm_finale.ogg` plays during the mundu finale. Made with ElevenLabs music (eleven_music_v2_5), 15 s, generated 2026-11-04. The source is `bgm_finale_a.mp3` (not packaged in the app).

## Credits shown in the game
The last two pages after the ending epilogue list the music (ItsWatR, Kamalesh Siddu, Linesh Jose via Pixabay; the rest ElevenLabs) and the studio. Edit the CREDITS pages in index.html (EPILOGUE, pic credits) when a track changes.

## Angel descent sound (Disco or Die entry)
`assets/audio/sfx/angel_descent.ogg` plays while Kannan floats down into the disco; the disco music starts when he lands. Made with ElevenLabs sound effects (two short takes, `angel_descent_a.mp3` and `angel_descent_b.mp3`, slowed, joined and given reverb), generated 2026-11-04. The sources are not packaged in the app.

## Kannan's battle cry (mundu finale)
`assets/audio/sfx/kannan_yell.ogg` plays when Kannan leaps at Pey Komban in the mundu finale; the finale music (`bgm_finale`) plays under the whole scene. Made with ElevenLabs sound effects (`eleven_text_to_sound_v2`), one take, 2 s, loudness-normalised, 2026-11-06. The source is `kannan_yell_a.mp3` (not packaged in the app).

## Pey Komban boss and the mundu finale (replaced the generated tracks, 2026-11-06)
| Used in | File | Source | Licence |
|---|---|---|---|
| `bgm_boss_komban.ogg` (Pey Komban fight, 50 s loop from 1:00 to 1:53, 3 s crossfade, about -17 LUFS) and `bgm_finale.ogg` (mundu finale, from 3:40 to the end of the track, looped once with a 2 s crossfade join, 16.8 s, fade out) | `lineshjose-360-indian-fusion-music-288635.mp3` (kept as `bgm_boss_komban_pixabay_a.mp3`, not packaged) | "360 Indian Fusion Music" by Linesh Jose, Pixabay | Pixabay Content Licence. Attribution welcome: "Music by Linesh Jose from Pixabay". The earlier ElevenLabs tracks are in `assets/audio/music-old/` (`bgm_boss_komban_elevenlabs.ogg`, `bgm_finale_elevenlabs.ogg`). |

## Motorbike engine (Act II ride, 2026-11-06)
Synthesised in code (no file): two detuned sawtooth oscillators through a low-pass filter, pulsed like a single-cylinder thumper. It revs up for about 1.5 s when the ride starts, then idles low and follows the bike's speed. It is quiet, fades when the bike stops, dies or the game is paused, and follows the SND toggle. Tune it in `engineSet` in index.html.

## Motorbike engine, correction (2026-11-06)
The ride now uses the original recording again: `freesound_community-350cc-bike-firing-32391.mp3` (Pixabay Content Licence, a Royal Enfield; the old ride track had it mixed in for the first 20 s). It is cut into `assets/audio/sfx/bike_start.ogg` (first 6.5 s, quiet) and `bike_loop.ogg` (a steady 5 s loop of 3.2 to 8.2 s, crossfaded, played very low and slightly faster with the bike's speed). The source is kept as `bike_engine_pixabay_a.mp3` (not packaged). The synthesised engine is only a fallback if those two files are missing.

## Exhausted Kannan before Pathalam (2026-11-07)
`assets/audio/sfx/kannan_pant.ogg` (panting, plays every 110 ticks while he is beaten up and out of breath) and `kannan_fall_scream.ogg` (his scream at the start of the fall into Pathalam). Made with ElevenLabs sound effects (`eleven_text_to_sound_v2`), one take each, loudness-normalised to -16 LUFS. Sources `kannan_pant_a.mp3` and `kannan_fall_scream_a.mp3` (not packaged in the app). The model returned 2 s and 1 s instead of the 6 s and 2.5 s that were asked for.
