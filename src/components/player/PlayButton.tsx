"use client";

import { useState } from "react";
import { audioEngine } from "@/lib/audio/engine";

interface PlayButtonProps {
  spriteId: string;
  clipKey: string;
  /** Screen-reader label; the visible label defaults to "Play" */
  label: string;
  /** Secondary outline style instead of the solid primary */
  secondary?: boolean;
}

/** Plays one sprite clip. Hidden by parents when audio is unavailable. */
export function PlayButton({ spriteId, clipKey, label, secondary }: PlayButtonProps) {
  const [playing, setPlaying] = useState(false);

  const play = async () => {
    setPlaying(true);
    await audioEngine.play(spriteId, clipKey);
    setPlaying(false);
  };

  const base = secondary
    ? "border border-line bg-surface text-foreground"
    : "bg-foreground text-background";
  return (
    <button
      type="button"
      onClick={play}
      disabled={playing}
      aria-label={playing ? "Playing" : label}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 font-medium transition-opacity active:opacity-80 disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground ${base}`}
    >
      {playing ? "Playing" : "Play"}
    </button>
  );
}
