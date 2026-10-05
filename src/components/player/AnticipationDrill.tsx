"use client";

import { useState } from "react";
import type { Item } from "@/content/types";
import { audioEngine } from "@/lib/audio/engine";
import { PlayButton } from "./PlayButton";

interface AnticipationDrillProps {
  item: Item;
  spriteId: string;
  silent: boolean;
  onComplete: () => void;
}

/**
 * Repeat (PLAN.md §6 step 3): the Pimsleur anticipation gap — hear the
 * prompt, say it aloud, then hear the model. In silent mode the spoken
 * step becomes "think, then reveal". Comprehension-only lessons skip this
 * drill entirely.
 */
export function AnticipationDrill({ item, spriteId, silent, onComplete }: AnticipationDrillProps) {
  const [revealed, setRevealed] = useState(false);
  const audioReady = audioEngine.available;

  return (
    <div>
      <p className="text-sm font-medium text-text-2">Your turn</p>
      {!revealed ? (
        <div className="mt-4 flex min-h-64 flex-col items-center justify-center gap-4 text-center">
          <p className="max-w-xs text-balance text-xl text-foreground">
            {silent ? "Think of" : "Say"} the word for {item.meaning}
          </p>
          {audioReady && (
            <PlayButton spriteId={spriteId} clipKey={item.audio.slow} label={`Play the word for ${item.meaning}`} secondary />
          )}
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="inline-flex min-h-14 w-full max-w-xs items-center justify-center rounded-full bg-foreground px-8 font-medium text-background transition-opacity active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            Reveal
          </button>
        </div>
      ) : (
        <div className="mt-4">
          <p className="text-5xl font-semibold leading-tight tracking-tight">{item.manglish}</p>
          {item.script && (
            <p lang="ml" className="mt-1 font-malayalam text-xl text-text-2">
              {item.script}
            </p>
          )}
          {audioReady && (
            <div className="mt-4">
              <PlayButton spriteId={spriteId} clipKey={item.audio.normal} label={`Play the word for ${item.meaning}`} secondary />
            </div>
          )}
          <button
            type="button"
            onClick={onComplete}
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-foreground px-8 font-medium text-background transition-opacity active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
}
