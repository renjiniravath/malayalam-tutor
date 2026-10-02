"use client";

import { useState } from "react";
import type { Item, MinimalPair } from "@/content/types";
import { audioEngine } from "@/lib/audio/engine";
import { PlayButton } from "./PlayButton";

interface MinimalPairDrillProps {
  pair: MinimalPair;
  a: Item;
  b: Item;
  spriteId: string;
  onComplete: (correct: boolean) => void;
}

const SEGMENT_LABEL: Record<MinimalPair["segment"], string> = {
  zh: "zh sound",
  coronal: "t-sounds",
  geminate: "doubled consonants",
  vowelLength: "long vowels",
};

/**
 * Discriminate (PLAN.md §6 step 5): closed-set minimal pairs. With audio,
 * "which word did you hear?" — a clip plays and the learner picks which of
 * the two words it was. Without audio, the drill falls back honestly to a
 * meaning question over the same pair, and the UI says audio is on its way.
 */
export function MinimalPairDrill({ pair, a, b, spriteId, onComplete }: MinimalPairDrillProps) {
  const audioReady = audioEngine.available;
  // One member is the prompt; both spellings are the options.
  const [target] = useState<Item>(() => (Math.random() < 0.5 ? a : b));
  const [picked, setPicked] = useState<string | null>(null);
  const answered = picked !== null;
  const correct = picked === target.manglish;
  const clipKey = target.id === a.id ? pair.aClip : pair.bClip;

  return (
    <div>
      <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
        Sound drill: {SEGMENT_LABEL[pair.segment]}
      </p>
      <div className="mt-4 flex min-h-24 flex-col items-center justify-center gap-3 text-center">
        {audioReady ? (
          <>
            <p className="text-neutral-600 dark:text-neutral-300">Tap play, then choose the word you heard</p>
            <PlayButton spriteId={spriteId} clipKey={clipKey} label="Play the word" />
          </>
        ) : (
          <p className="max-w-xs text-balance text-neutral-700 dark:text-neutral-300">
            Audio is on its way. Which one means {target.meaning}?
          </p>
        )}
      </div>
      <div className="mt-5 grid grid-cols-1 gap-2.5">
        {[a, b].map((item) => {
          const isPicked = item.manglish === picked;
          const isAnswer = item.manglish === target.manglish;
          const state = answered
            ? isAnswer
              ? "border-green-600 bg-green-50 text-green-900 dark:border-green-500 dark:bg-green-950 dark:text-green-100"
              : isPicked
                ? "border-red-500 bg-red-50 text-red-900 dark:border-red-400 dark:bg-red-950 dark:text-red-100"
                : "border-neutral-200 bg-neutral-50 text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
            : "border-neutral-300 bg-neutral-50 text-foreground active:opacity-80 dark:border-neutral-700 dark:bg-neutral-900";
          return (
            <button
              key={item.id}
              type="button"
              disabled={answered}
              onClick={() => setPicked(item.manglish)}
              className={`flex min-h-12 items-center justify-between rounded-2xl border px-4 py-3 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground ${state}`}
            >
              <span className="text-lg font-medium">{item.manglish}</span>
              {item.script && (
                <span lang="ml" className="font-malayalam text-lg text-neutral-500 dark:text-neutral-400">
                  {item.script}
                </span>
              )}
            </button>
          );
        })}
      </div>
      {answered && (
        <button
          type="button"
          onClick={() => onComplete(correct)}
          className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-foreground px-8 font-medium text-background transition-opacity active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        >
          Continue
        </button>
      )}
    </div>
  );
}
