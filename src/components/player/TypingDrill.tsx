"use client";

import { useState } from "react";
import type { Item } from "@/content/types";
import { audioEngine } from "@/lib/audio/engine";
import { matchesAcceptedInput } from "@/lib/lesson/input";
import { PlayButton } from "./PlayButton";

interface TypingDrillProps {
  item: Item;
  spriteId: string;
  revealImmediately: boolean;
  onComplete: (correct: boolean) => void;
}

/**
 * Produce (PLAN.md §6 step 7): type the romanization. Input is
 * ASCII-forgiving — case-insensitive, diacritic-folded, one small typo
 * tolerated — learners never type diacritics (CLAUDE.md).
 */
export function TypingDrill({ item, spriteId, revealImmediately, onComplete }: TypingDrillProps) {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<boolean | null>(null);
  const audioReady = audioEngine.available;
  const hearPrompt = audioReady && !revealImmediately;

  const submit = () => {
    if (result !== null) return;
    setResult(matchesAcceptedInput(value, item.acceptedInputs ?? []));
  };

  return (
    <div>
      <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Type what you learned</p>
      <div className="mt-4 flex min-h-20 flex-col items-center gap-3">
        {hearPrompt ? (
          <>
            <p className="text-neutral-600 dark:text-neutral-300">Type what you hear</p>
            <PlayButton spriteId={spriteId} clipKey={item.audio.normal} label={`Play the word for ${item.meaning}`} />
          </>
        ) : (
          <p className="text-balance text-center text-xl text-neutral-800 dark:text-neutral-200">
            Type the word for {item.meaning}
          </p>
        )}
      </div>
      <div className="mt-5 flex items-stretch gap-2">
        <input
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") submit();
          }}
          disabled={result !== null}
          autoCapitalize="none"
          autoCorrect="off"
          autoComplete="off"
          spellCheck={false}
          enterKeyHint="done"
          aria-label={hearPrompt ? "Type what you hear" : `Type the word for ${item.meaning}`}
          className="min-h-12 w-full rounded-2xl border border-neutral-300 bg-neutral-50 px-4 text-base font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground dark:border-neutral-700 dark:bg-neutral-900"
        />
        <button
          type="button"
          onClick={submit}
          disabled={result !== null || value.trim() === ""}
          className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-2xl bg-foreground px-5 font-medium text-background transition-opacity active:opacity-80 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        >
          Check
        </button>
      </div>
      {result !== null && (
        <div className="mt-4">
          <p
            className={`text-base font-medium ${
              result ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"
            }`}
          >
            {result ? "Correct" : `It's ${item.manglish}`}
          </p>
          <p lang="ml" className="mt-1 font-malayalam text-lg text-neutral-500 dark:text-neutral-400">
            {item.script}
          </p>
          <button
            type="button"
            onClick={() => onComplete(result)}
            className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-foreground px-8 font-medium text-background transition-opacity active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
}
