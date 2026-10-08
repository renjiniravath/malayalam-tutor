/**
 * Audio sprite manifest — one MP3 per lesson plus an offset table per clip
 * (PLAN.md §10). Audio files are build artifacts and are not committed;
 * `npm run audio:gen` derives the clips, fills the offsets, and flips
 * `status` to 'generated'.
 *
 * While status is 'pending', content:check still verifies manifest presence
 * and that every clip key referenced by the lessons follows the sprite
 * naming scheme — it skips only the duration/size sanity checks.
 */

export type SpriteStatus = 'pending' | 'generated';

export interface Sprite {
  /** Path relative to public/ */
  file: string;
  /** Clip key -> [startMs, endMs]; absent while pending */
  offsets?: Record<string, [number, number]>;
}

export const audioManifest: {
  status: SpriteStatus;
  sprites: Record<string, Sprite>;
} = {
  status: 'pending',
  sprites: {
    l1u1l1: { file: 'audio/l1u1l1.mp3' },
    l1u1l2: { file: 'audio/l1u1l2.mp3' },
    l1u1l3: { file: 'audio/l1u1l3.mp3' },
    l1u2l1: { file: 'audio/l1u2l1.mp3' },
    l1u2l2: { file: 'audio/l1u2l2.mp3' },
    l1u3l1: { file: 'audio/l1u3l1.mp3' },
    l1u3l2: { file: 'audio/l1u3l2.mp3' },
    l2u1l1: { file: 'audio/l2u1l1.mp3' },
    l2u1l2: { file: 'audio/l2u1l2.mp3' },
    l2u1l3: { file: 'audio/l2u1l3.mp3' },
    l2u1l4: { file: 'audio/l2u1l4.mp3' },
    l2u2l1: { file: 'audio/l2u2l1.mp3' },
    l2u2l2: { file: 'audio/l2u2l2.mp3' },
    l2u3l1: { file: 'audio/l2u3l1.mp3' },
    l2u3l2: { file: 'audio/l2u3l2.mp3' },
    l3u1l1: { file: 'audio/l3u1l1.mp3' },
    l3u1l2: { file: 'audio/l3u1l2.mp3' },
    l3u1l3: { file: 'audio/l3u1l3.mp3' },
    l3u1l4: { file: 'audio/l3u1l4.mp3' },
    l3u1l5: { file: 'audio/l3u1l5.mp3' },
    l3u1l6: { file: 'audio/l3u1l6.mp3' },
  },
};
