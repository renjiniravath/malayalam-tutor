"use client";

import { useState } from "react";
import type { Item } from "@/content/types";
import { audioEngine } from "@/lib/audio/engine";
import { checkAssembly, checkTypedSentence } from "@/lib/lesson/sentence";
import { PlayButton } from "./PlayButton";
import { WordBreakdown } from "./WordBreakdown";

interface SentenceBuilderDrillProps {
  item: Item;
  spriteId: string;
  /** bank: tap tokens to assemble; typing: free-form input with forgiving checking */
  mode: 'bank' | 'typing';
  revealImmediately: boolean;
  onComplete: (correct: boolean) => void;
}

/**
 * Sentence-builder drill (PLAN.md §6, M5): assemble the sentence from a
 * word bank and check it against the accepted orders, or type it
 * free-form with the same forgiving input layer as every typing drill.
 * The result grades the item's FSRS card (skill 'sentence').
 */
export function SentenceBuilderDrill({ item, spriteId, mode, revealImmediately, onComplete }: SentenceBuilderDrillProps) {
  const spec = item.sentence;
  const [assembly, setAssembly] = useState<string[]>([]);
  const [typed, setTyped] = useState('');
  const [checked, setChecked] = useState<boolean | null>(null);
  const audioReady = audioEngine.available;
  const hearPrompt = audioReady && !revealImmediately;

  // The bank starts shuffled, with any distractor tokens included.
  const [bank] = useState(() => {
    const tokens = [...(spec?.bank ?? [])];
    for (let i = tokens.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tokens[i], tokens[j]] = [tokens[j], tokens[i]];
    }
    return tokens;
  });

  if (!spec) return null;

  const addToken = (token: string) => {
    if (checked !== null) return;
    setAssembly((current) => [...current, token]);
  };

  const removeToken = (index: number) => {
    if (checked !== null) return;
    setAssembly((current) => current.filter((_, i) => i !== index));
  };

  const undo = () => {
    if (checked !== null) return;
    setAssembly((current) => current.slice(0, -1));
  };

  const submit = () => {
    if (checked !== null) return;
    setChecked(mode === 'bank' ? checkAssembly(assembly, spec) : checkTypedSentence(typed, spec));
  };

  const words = checked ? spec.orders[0].split(' ') : assembly;

  return (
    <div>
      <p className="text-sm font-medium text-text-2">Build the sentence: {item.meaning}</p>
      <div className="mt-4 flex min-h-14 flex-col items-center gap-3">
        {hearPrompt ? (
          <PlayButton spriteId={spriteId} clipKey={item.audio.normal} label={`Play the sentence for ${item.meaning}`} />
        ) : (
          <p className="text-balance text-center text-xl text-foreground">{item.meaning}</p>
        )}
      </div>

      {mode === 'bank' ? (
        <>
          <div className="mt-4 min-h-20 rounded-2xl border border-line bg-surface-2 p-3">
            <p className="flex min-h-10 flex-wrap items-center gap-2">
              {assembly.length === 0 && checked === null && (
                <span className="text-sm text-text-3">Tap the words below to build the sentence.</span>
              )}
              {words.map((word, index) => (
                <button
                  key={`${word}-${index}`}
                  type="button"
                  onClick={() => removeToken(index)}
                  disabled={checked !== null}
                  aria-label={`Remove ${word}`}
                  className="min-h-11 rounded-2xl border border-line bg-surface px-3 text-lg font-medium underline decoration-dotted underline-offset-4 transition-opacity active:opacity-80 disabled:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                >
                  {word}
                </button>
              ))}
            </p>
            {assembly.length > 0 && checked === null && (
              <p className="mt-1 text-xs text-text-3">Tap a word above to send it back.</p>
            )}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {bank.map((token) => {
              const used = assembly.includes(token);
              return (
                <button
                  key={token}
                  type="button"
                  onClick={() => addToken(token)}
                  disabled={checked !== null || used}
                  className="min-h-11 rounded-full border border-line bg-surface px-4 text-base font-medium transition-opacity active:opacity-80 disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                >
                  {token}
                </button>
              );
            })}
          </div>
        </>
      ) : (
        <div className="mt-4 flex items-stretch gap-2">
          <input
            type="text"
            value={typed}
            onChange={(event) => setTyped(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') submit();
            }}
            disabled={checked !== null}
            autoCapitalize="none"
            autoCorrect="off"
            autoComplete="off"
            spellCheck={false}
            enterKeyHint="done"
            aria-label={`Type the sentence for ${item.meaning}`}
            className="min-h-12 w-full rounded-2xl border border-line bg-surface-2 px-4 text-base font-medium text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          />
          <button
            type="button"
            onClick={submit}
            disabled={checked !== null || typed.trim() === ''}
            className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-2xl bg-foreground px-5 font-medium text-background transition-opacity active:opacity-80 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            Check
          </button>
        </div>
      )}

      {mode === 'bank' && (
        <div className="mt-4 flex items-stretch gap-2">
          <button
            type="button"
            onClick={undo}
            disabled={checked !== null || assembly.length === 0}
            className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full border border-line px-6 font-medium transition-opacity active:opacity-80 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            Undo
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={checked !== null || assembly.length === 0}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-foreground px-8 font-medium text-background transition-opacity active:opacity-80 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            Check
          </button>
        </div>
      )}

      {checked !== null && (
        <div className="mt-4">
          <p
            className={`text-base font-medium ${
              checked ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'
            }`}
          >
            {checked ? 'Correct' : `It's ${spec.orders[0]}`}
          </p>
          <p lang="ml" className="mt-1 font-malayalam text-lg text-text-2">
            {item.script}
          </p>
          <WordBreakdown words={spec.orders[0].split(' ')} parts={spec.parts} />
          <button
            type="button"
            onClick={() => onComplete(checked)}
            className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-foreground px-8 font-medium text-background transition-opacity active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
}
