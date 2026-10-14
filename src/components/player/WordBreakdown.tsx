"use client";

import { useState } from "react";
import type { SentencePart } from "@/content/types";

interface WordBreakdownProps {
  words: string[];
  parts: SentencePart[];
}

/**
 * Tap-to-breakdown: every new word in a sentence is explained on tap.
 * Tapping a word chip shows its English gloss below the sentence; a
 * second tap closes it. Passive by default, never a wall of text.
 */
export function WordBreakdown({ words, parts }: WordBreakdownProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const glossFor = (word: string): string | undefined => parts.find((part) => part.word === word)?.meaning;

  return (
    <div className="mt-3">
      <p className="flex flex-wrap gap-x-2 gap-y-1">
        {words.map((word, index) => (
          <button
            key={`${word}-${index}`}
            type="button"
            onClick={() => setSelected(selected === index ? null : index)}
            aria-expanded={selected === index}
            className="min-h-8 rounded-lg px-1 text-lg font-medium underline decoration-dotted underline-offset-4 transition-opacity active:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            {word}
          </button>
        ))}
      </p>
      {selected !== null && (
        <p className="mt-2 min-h-6 text-sm text-text-2">
          {words[selected]} means {glossFor(words[selected]) ?? '?'}.
        </p>
      )}
    </div>
  );
}
