/**
 * Audio engine (PLAN.md §6 step 0, §10).
 *
 * One shared AudioContext for the whole app, unlocked by a first-tap gate
 * (mobile autoplay policy). Every lesson's clips live in a single audio
 * sprite — one MP3 plus an offset table from the content manifest — and
 * playback routes through AudioBufferSourceNode segments, never per-clip
 * <audio> elements. navigator.audioSession.type = 'playback' keeps iOS
 * silent-switch from muting lessons.
 *
 * Audio files are generated artifacts, not committed. While the manifest
 * is 'pending' (no sprites yet), the engine reports itself unavailable:
 * play() resolves false immediately, nothing is faked, and the UI shows
 * that state. This module is only imported from client components.
 */

import { audioManifest } from '@/content/audio/manifest';

class AudioEngine {
  private ctx: AudioContext | null = null;
  private buffers = new Map<string, AudioBuffer>();
  private failedSprites = new Set<string>();
  /** Manifest may flip to 'generated' once audio:gen runs. */
  private manifestReady = audioManifest.status === 'generated';

  get available(): boolean {
    return this.manifestReady && typeof window !== 'undefined' && 'AudioContext' in window;
  }

  /** First-tap unlock: create/resume the shared context. Safe to call repeatedly. */
  async unlock(): Promise<void> {
    if (!this.available) return;
    if (!this.ctx) {
      this.ctx = new AudioContext();
      const audioSession = (navigator as Navigator & { audioSession?: { type?: string } }).audioSession;
      if (audioSession) audioSession.type = 'playback';
    }
    if (this.ctx.state === 'suspended') await this.ctx.resume();
  }

  /**
   * Play one clip from a lesson sprite. Resolves true when the clip ends,
   * false immediately when audio is unavailable or the sprite is missing.
   */
  async play(spriteId: string, clipKey: string): Promise<boolean> {
    if (!this.available || !this.ctx) return false;
    const sprite = audioManifest.sprites[spriteId];
    const offsets = sprite?.offsets;
    const [startMs, endMs] = offsets?.[clipKey] ?? [];
    if (startMs === undefined || endMs === undefined || this.failedSprites.has(spriteId)) return false;

    const buffer = await this.spriteBuffer(spriteId, sprite.file);
    if (!buffer) return false;

    await this.unlock();
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(this.ctx.destination);
    const start = this.ctx.currentTime;
    source.start(start, startMs / 1000, (endMs - startMs) / 1000);
    return new Promise((resolve) => {
      source.onended = () => resolve(true);
    });
  }

  private async spriteBuffer(spriteId: string, file: string): Promise<AudioBuffer | null> {
    const cached = this.buffers.get(file);
    if (cached) return cached;
    try {
      const response = await fetch(`/${file}`);
      if (!response.ok) throw new Error(`sprite fetch failed: ${file}`);
      const buffer = await this.ctx!.decodeAudioData(await response.arrayBuffer());
      this.buffers.set(file, buffer);
      return buffer;
    } catch {
      this.failedSprites.add(spriteId);
      return null;
    }
  }
}

export const audioEngine = new AudioEngine();
