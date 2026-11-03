import { Composition } from 'remotion';
import { Trailer, TRAILER_FRAMES, FPS } from './Trailer';

export const Root = () => (
  <Composition
    id="Trailer"
    component={Trailer}
    durationInFrames={TRAILER_FRAMES}
    fps={FPS}
    width={1920}
    height={1080}
  />
);
