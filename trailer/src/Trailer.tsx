import React from 'react';
import { AbsoluteFill, Audio, Img, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { loadFont } from '@remotion/google-fonts/PressStart2P';

const { fontFamily } = loadFont();

export const FPS = 30;
export const TRAILER_FRAMES = 32 * FPS;
const f = (s: number) => Math.round(s * FPS);

// Game frames are 640 x 270. Scaled 3x = 1920 x 810, letterboxed in 1080p. Captions sit in the bottom bar.
const FRAME_H = 810;
const BAR_H = (1080 - FRAME_H) / 2;

type Cut = { at: number; to: number; shot: string; text?: string; zoom?: number; panX?: number; origin?: string };

// Times follow the narration (silence gaps in narration.mp3).
const CUTS: Cut[] = [
  { at: 0.0, to: 4.0, shot: 'pro', text: 'IN THE VILLAGE OF KANJIRAVANAM, THE LAMPS ARE GOING OUT.', zoom: 1.03 },
  { at: 4.0, to: 10.0, shot: 'boss_a1_fight', text: 'A RED-EYED CURSE IS WAKING THE OLD GUARDIANS OF THE LAND.', zoom: 1.03 },
  // slow push-in on Kannan (he stands at about 39% across, 72% down)
  { at: 10.0, to: 15.4, shot: 'a1', text: 'ONE MAN IN A LUNGI, AND A SATCHEL OF COCONUTS.', zoom: 1.9, origin: '39% 72%' },
  // RUN. JUMP. THROW.
  { at: 15.4, to: 16.6, shot: 'a1', text: 'RUN.' },
  { at: 16.6, to: 17.6, shot: 'bike', text: 'JUMP.' },
  { at: 17.6, to: 18.4, shot: 'boss_a2_fight', text: 'THROW.' },
  // levels
  { at: 18.4, to: 19.9, shot: 'a1', text: 'BAMBOO HOLLOWS', zoom: 1.02 },
  { at: 19.9, to: 21.2, shot: 'a2', text: 'HAUNTED FESTIVALS', zoom: 1.02 },
  { at: 21.2, to: 22.5, shot: 'a3', text: 'FOGGY HILLS', zoom: 1.02 },
  { at: 22.5, to: 23.6, shot: 'a4', text: 'MONSOON MANGROVES', zoom: 1.02 },
  // five guardians, quick cuts
  { at: 23.6, to: 24.12, shot: 'boss_a1_intro' },
  { at: 24.12, to: 24.64, shot: 'boss_a2_intro' },
  { at: 24.64, to: 25.16, shot: 'boss_a3_intro' },
  { at: 25.16, to: 25.68, shot: 'boss_a4_intro' },
  { at: 25.68, to: 26.3, shot: 'boss_a5_intro', zoom: 1.02 },
];

const Shot: React.FC<{ cut: Cut }> = ({ cut }) => {
  const frame = useCurrentFrame();
  const len = f(cut.to) - f(cut.at);
  const z = interpolate(frame, [0, len], [1, cut.zoom ?? 1.03], { extrapolateRight: 'clamp' });
  const x = interpolate(frame, [0, len], [0, cut.panX ?? 0], { extrapolateRight: 'clamp' });
  const flash = interpolate(frame, [0, 4], [0.55, 0], { extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill>
      <div style={{ position: 'absolute', top: BAR_H, left: 0, width: 1920, height: FRAME_H, overflow: 'hidden', background: '#000' }}>
        <Img
          src={staticFile(`shots/${cut.shot}.png`)}
          style={{ width: 1920, height: FRAME_H, imageRendering: 'pixelated', transformOrigin: cut.origin ?? '50% 50%', transform: `translateX(${x}px) scale(${z})` }}
        />
        <AbsoluteFill style={{ background: '#fff', opacity: flash }} />
      </div>
      {cut.text ? <Caption text={cut.text} big={cut.text.length < 12} /> : null}
    </AbsoluteFill>
  );
};

const Caption: React.FC<{ text: string; big: boolean }> = ({ text, big }) => (
  <div style={{ position: 'absolute', bottom: 0, left: 0, width: 1920, height: BAR_H, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <span
      style={{
        fontFamily,
        fontSize: big ? 44 : 26,
        letterSpacing: big ? 6 : 2,
        color: big ? '#f0c040' : '#f4ecd0',
        textShadow: '4px 4px 0 #120a1c',
        textAlign: 'center',
        padding: '0 80px',
        lineHeight: 1.5,
      }}
    >
      {text}
    </span>
  </div>
);

const TitleCard: React.FC = () => {
  const frame = useCurrentFrame();
  const a = (start: number) => interpolate(frame, [start, start + 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pulse = 0.65 + 0.35 * Math.sin(frame / 8);
  return (
    <AbsoluteFill style={{ background: '#0a0814', alignItems: 'center', justifyContent: 'center' }}>
      <Img src={staticFile('shots/a1.png')} style={{ position: 'absolute', top: BAR_H, width: 1920, height: FRAME_H, imageRendering: 'pixelated', opacity: 0.28, transformOrigin: '50% 100%', transform: 'scale(1.2)' }} />
      <div style={{ textAlign: 'center', fontFamily }}>
        <div style={{ opacity: a(0), color: '#f0c040', fontSize: 120, letterSpacing: 8, textShadow: '8px 8px 0 #120a1c' }}>LUNGI MAN</div>
        <div style={{ opacity: a(24), color: '#f4ecd0', fontSize: 30, marginTop: 40, letterSpacing: 3, textShadow: '4px 4px 0 #120a1c' }}>THE CURSE OF KANJIRAVANAM</div>
        <div style={{ opacity: a(70) * pulse, color: '#ffe58a', fontSize: 28, marginTop: 70, letterSpacing: 4 }}>COMING TO ANDROID</div>
      </div>
      <div style={{ position: 'absolute', bottom: 36, display: 'flex', alignItems: 'center', gap: 20, opacity: a(90) }}>
        <Img src={staticFile('moonga-logo.png')} style={{ width: 64, height: 64, imageRendering: 'pixelated' }} />
        <span style={{ fontFamily, color: '#b8b0d0', fontSize: 20, letterSpacing: 3 }}>MOONGA STUDIO</span>
      </div>
    </AbsoluteFill>
  );
};

export const Trailer: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const fadeOut = interpolate(frame, [TRAILER_FRAMES - 45, TRAILER_FRAMES], [1, 0], { extrapolateLeft: 'clamp' });
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      {CUTS.map((c, i) => (
        <Sequence key={i} from={f(c.at)} durationInFrames={f(c.to) - f(c.at)}>
          <Shot cut={c} />
        </Sequence>
      ))}
      <Sequence from={f(26.3)} durationInFrames={TRAILER_FRAMES - f(26.3)}>
        <TitleCard />
      </Sequence>

      <AbsoluteFill style={{ background: '#000', opacity: 1 - fadeIn }} />
      <AbsoluteFill style={{ background: '#000', opacity: 1 - fadeOut }} />

      <Audio src={staticFile('music.ogg')} volume={(n) => 0.3 * interpolate(n, [0, 30, TRAILER_FRAMES - 60, TRAILER_FRAMES], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })} />
      <Audio src={staticFile('narration.mp3')} volume={1} />
      <Sequence from={f(23.6)}>
        <Audio src={staticFile('sting.ogg')} volume={0.55} />
      </Sequence>
    </AbsoluteFill>
  );
};
