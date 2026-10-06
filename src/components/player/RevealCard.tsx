"use client";

import { useState } from "react";
import type { Item } from "@/content/types";
import { audioEngine } from "@/lib/audio/engine";
import { ArticulationCard } from "./ArticulationCard";
import { PlayButton } from "./PlayButton";
import { WordBreakdown } from "./WordBreakdown";

interface RevealCardProps {
  item: Item;
  spriteId: string;
  revealImmediately: boolean;
  onNext: () => void;
}

const KIND_LABEL: Record<Item["kind"], string> = {
  word: "New word",
  phrase: "New phrase",
  sentence: "New sentence",
  expression: "New expression",
};

/**
 * Hear-then-see (PLAN.md §6 steps 1-2): romanization and script stay
 * hidden until the item is heard, or until the learner taps reveal.
 * The accessibility preference (revealImmediately) skips the gate.
 * Malayalam script appears passively, styled secondary, lang="ml".
 */
export function RevealCard({ item, spriteId, revealImmediately, onNext }: RevealCardProps) {
  const [revealed, setRevealed] = useState(revealImmediately);
  const [lastRevealPref, setLastRevealPref] = useState(revealImmediately);
  const audioReady = audioEngine.available;

  // Adjusting state during render: if the accessibility preference flips on
  // while this card is on screen, reveal the text right away.
  if (revealImmediately && !lastRevealPref) {
    setLastRevealPref(true);
    setRevealed(true);
  }

  const hearThenReveal = async () => {
    if (!audioReady) {
      setRevealed(true);
      return;
    }
    await audioEngine.play(spriteId, item.audio.slow);
    setRevealed(true);
  };

  const soundTag = item.tags.find((tag) => tag.startsWith("sound:"));

  return (
    <div>
      <p className="text-sm font-medium text-text-2">{KIND_LABEL[item.kind]}</p>
      {!revealed ? (
        <div className="mt-6 flex min-h-64 flex-col items-center justify-center gap-4 text-center">
          {audioReady ? (
            <>
              <p className="text-text-2">Listen first</p>
              <button
                type="button"
                onClick={hearThenReveal}
                className="inline-flex min-h-14 w-full max-w-xs items-center justify-center rounded-full bg-foreground px-8 font-medium text-background transition-opacity active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              >
                Play
              </button>
              <button
                type="button"
                onClick={() => setRevealed(true)}
                className="inline-flex min-h-11 items-center justify-center rounded-full px-4 text-sm text-text-2 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              >
                Reveal the text now
              </button>
            </>
          ) : (
            <>
              <p className="max-w-xs text-balance text-text-2">
                Audio is on its way. Tap reveal to see the word.
              </p>
              <button
                type="button"
                onClick={() => setRevealed(true)}
                className="inline-flex min-h-14 w-full max-w-xs items-center justify-center rounded-full bg-foreground px-8 font-medium text-background transition-opacity active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              >
                Reveal
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="mt-4">
          <p className="text-5xl font-semibold leading-tight tracking-tight">{item.manglish}</p>
          {item.script && (
            <p lang="ml" className="mt-1 font-malayalam text-xl text-text-2">
              {item.script}
            </p>
          )}
          <p className="mt-3 text-lg text-foreground">{item.meaning}</p>
          {item.sentence && <WordBreakdown words={item.sentence.orders[0].split(' ')} parts={item.sentence.parts} />}
          {audioReady && (
            <div className="mt-4 flex flex-wrap gap-2">
              <PlayButton spriteId={spriteId} clipKey={item.audio.slow} label="Play slowly" secondary />
              <PlayButton spriteId={spriteId} clipKey={item.audio.medium} label="Play at medium speed" secondary />
              <PlayButton spriteId={spriteId} clipKey={item.audio.normal} label="Play at normal speed" secondary />
              {item.audio.focus?.map((clip) => (
                <PlayButton key={clip} spriteId={spriteId} clipKey={clip} label="Play the sound on its own" secondary />
              ))}
            </div>
          )}
          {item.articulation && <ArticulationCard articulation={item.articulation} soundTag={soundTag} />}
          {item.notes && (
            <ul className="mt-4 space-y-1 text-sm text-text-2">
              {item.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          )}
          <button
            type="button"
            onClick={onNext}
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-foreground px-8 font-medium text-background transition-opacity active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
}
