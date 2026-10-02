"use client";

import { useState } from "react";
import type { Item } from "@/content/types";
import { audioEngine } from "@/lib/audio/engine";
import { PlayButton } from "./PlayButton";

interface MultipleChoiceDrillProps {
  item: Item;
  distractors: string[];
  spriteId: string;
  revealImmediately: boolean;
  onComplete: (correct: boolean) => void;
}

/** Recognize (PLAN.md §6 step 4): hear or read the word, pick its meaning. */
export function MultipleChoiceDrill({ item, distractors, spriteId, revealImmediately, onComplete }: MultipleChoiceDrillProps) {
  const [options] = useState(() => {
    const shuffled = [...distractors, item.meaning];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  });

  const [picked, setPicked] = useState<string | null>(null);
  const answered = picked !== null;
  const correct = picked === item.meaning;
  const audioReady = audioEngine.available;

  return (
    <div>
      <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">What does it mean?</p>
      <div className="mt-4 flex min-h-20 flex-col items-center gap-3">
        {audioReady && (
          <PlayButton spriteId={spriteId} clipKey={item.audio.normal} label={`Play the word for ${item.meaning}`} />
        )}
        {(revealImmediately || !audioReady) && <p className="text-4xl font-medium">{item.manglish}</p>}
        {revealImmediately && item.script && (
          <p lang="ml" className="font-malayalam text-lg text-neutral-500 dark:text-neutral-400">
            {item.script}
          </p>
        )}
      </div>
      <div className="mt-5 grid grid-cols-1 gap-2.5">
        {options.map((option) => {
          const isPicked = option === picked;
          const isAnswer = option === item.meaning;
          const state = answered
            ? isAnswer
              ? "border-green-600 bg-green-50 text-green-900 dark:border-green-500 dark:bg-green-950 dark:text-green-100"
              : isPicked
                ? "border-red-500 bg-red-50 text-red-900 dark:border-red-400 dark:bg-red-950 dark:text-red-100"
                : "border-neutral-200 bg-neutral-50 text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
            : "border-neutral-300 bg-neutral-50 text-foreground active:opacity-80 dark:border-neutral-700 dark:bg-neutral-900";
          return (
            <button
              key={option}
              type="button"
              disabled={answered}
              onClick={() => setPicked(option)}
              className={`min-h-12 rounded-2xl border px-4 py-3 text-left text-base font-medium transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground ${state}`}
            >
              {option}
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
