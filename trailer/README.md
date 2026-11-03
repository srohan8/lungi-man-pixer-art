# Lungi Man trailer

A 32 s trailer built with Remotion. Separate from the game (the game itself stays dependency-free).

```
cd trailer
npm install
npx remotion browser ensure     # one time, downloads headless Chrome
npm start                       # in the repo root, in another terminal: serves the game on port 3000
npm run shots                   # captures native-pixel frames from the running game into public/shots/
npm run studio                  # preview and edit
npm run render                  # writes out/trailer.mp4 (1920x1080, about 60 MB)
```
- Cuts follow the narration in `public/narration.mp3` (ElevenLabs, voice "George", one take). Timings are in `src/Trailer.tsx`.
- Music `public/music.ogg` and sting `public/sting.ogg` are copies of `bgm_menu` and `sting_boss_intro` from the game.
- Credits for the audio are in `docs/audio-credits.md`.
