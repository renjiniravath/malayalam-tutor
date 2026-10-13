"use client";

import { useState } from "react";
import type { Item } from "@/content/types";
import { audioEngine } from "@/lib/audio/engine";
import { checkAssembly, checkTypedSentence, sentenceWords } from "@/lib/lesson/sentence";
import { PlayButton } from "./PlayButton";
import { WordBreakdown } from "./WordBreakdown";

interface RolePlayDrillProps {
  /** The learner's own line */
  item: Item;
  /** The other speaker's line, played as the cue */
  prompt: Item;
  spriteId: string;
  /** bank: assemble the line from its word bank; typing: write it free-form */
  mode: "bank" | "typing";
  revealImmediately: boolean;
  onComplete: (correct: boolean) => void;
}

function shuffled(tokens: string[]): string[] {
  const next = [...tokens];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

/**
 * Dialogue role-play (PLAN.md §5 Level 5): the other speaker's line is the
 * cue, the learner answers with their own line, then the model line plays
 * back for comparison. The cue is heard before it is read, like every other
 * item (PLAN.md §6 steps 1-2); the learner's own line stays hidden until
 * they have produced it, unless the accessibility preference reveals text.
 */
export function RolePlayDrill({
  item,
  prompt,
  spriteId,
  mode,
  revealImmediately,
  onComplete,
}: RolePlayDrillProps) {
  const spec = item.sentence;
  const [heard, setHeard] = useState(false);
  const [answering, setAnswering] = useState(false);
  const [assembly, setAssembly] = useState<string[]>([]);
  const [typed, setTyped] = useState("");
  const [checked, setChecked] = useState<boolean | null>(null);
  const [bank] = useState(() => shuffled(spec?.bank ?? []));
  const audioReady = audioEngine.available;

  if (!spec) return null;

  // §9 rule 8: the model line is the item's own display text, so on a
  // question item the romanized line carries the mark the script beneath
  // it carries. The tray and the word breakdown stay the punctuation-free
  // words of the first accepted order — the input layer the learner built
  // from, and the words the parts are written for.
  const model = item.manglish;
  const modelWords = sentenceWords(spec);
  const cueVisible = heard || revealImmediately || !audioReady;

  const hearTheCue = async () => {
    if (!audioReady) {
      setHeard(true);
      return;
    }
    await audioEngine.play(spriteId, prompt.audio.normal);
    setHeard(true);
  };

  const submit = () => {
    if (checked !== null) return;
    setChecked(
      mode === "bank"
        ? checkAssembly(assembly, spec)
        : checkTypedSentence(typed, spec, item.acceptedInputs ?? []),
    );
  };

  const words = checked !== null ? modelWords : assembly;

  return (
    <div>
      <p className="text-sm font-medium text-text-2">Role play</p>
      <div className="mt-3 rounded-2xl border border-line bg-surface-2 p-4">
        <p className="text-sm text-text-3">They say</p>
        {cueVisible ? (
          <>
            <p className="mt-1 text-lg font-medium text-foreground">{prompt.manglish}</p>
            {prompt.script && (
              <p lang="ml" className="mt-1 font-malayalam text-base text-text-2">
                {prompt.script}
              </p>
            )}
            <p className="mt-1 text-sm text-text-3">{prompt.meaning}</p>
          </>
        ) : (
          <p className="mt-1 text-sm text-text-2">Listen to the line first.</p>
        )}
        <div className="mt-3">
          {cueVisible ? (
            audioReady && (
              <PlayButton
                spriteId={spriteId}
                clipKey={prompt.audio.normal}
                label={`Play the line for ${prompt.meaning}`}
                secondary
              />
            )
          ) : (
            <button
              type="button"
              onClick={hearTheCue}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-foreground px-8 font-medium text-background transition-opacity active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
            >
              Play
            </button>
          )}
        </div>
      </div>

      {!answering ? (
        <button
          type="button"
          onClick={() => setAnswering(true)}
          disabled={!cueVisible}
          className="mt-5 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-foreground px-8 font-medium text-background transition-opacity active:opacity-80 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        >
          Your turn
        </button>
      ) : (
        <>
          <p className="mt-5 text-sm font-medium text-text-2">You say: {item.meaning}</p>
          {revealImmediately && checked === null && (
            <p className="mt-2 text-lg font-medium text-foreground">{model}</p>
          )}

          {mode === "bank" ? (
            <>
              <div className="mt-3 min-h-20 rounded-2xl border border-line bg-surface-2 p-3">
                <p className="flex min-h-10 flex-wrap items-center gap-2">
                  {assembly.length === 0 && checked === null && (
                    <span className="text-sm text-text-3">Tap the words below to build your line.</span>
                  )}
                  {words.map((word, index) => (
                    <button
                      key={`${word}-${index}`}
                      type="button"
                      onClick={() => setAssembly((current) => current.filter((_, i) => i !== index))}
                      disabled={checked !== null}
                      aria-label={`Remove ${word}`}
                      className="min-h-11 rounded-2xl border border-line bg-surface px-3 text-lg font-medium underline decoration-dotted underline-offset-4 transition-opacity active:opacity-80 disabled:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                    >
                      {word}
                    </button>
                  ))}
                </p>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {bank.map((token) => {
                  const used = assembly.includes(token);
                  return (
                    <button
                      key={token}
                      type="button"
                      onClick={() => setAssembly((current) => [...current, token])}
                      disabled={checked !== null || used}
                      className="min-h-11 rounded-full border border-line bg-surface px-4 text-base font-medium transition-opacity active:opacity-80 disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                    >
                      {token}
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 flex items-stretch gap-2">
                <button
                  type="button"
                  onClick={() => setAssembly((current) => current.slice(0, -1))}
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
            </>
          ) : (
            <div className="mt-3 flex items-stretch gap-2">
              <input
                type="text"
                value={typed}
                onChange={(event) => setTyped(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") submit();
                }}
                disabled={checked !== null}
                autoCapitalize="none"
                autoCorrect="off"
                autoComplete="off"
                spellCheck={false}
                enterKeyHint="done"
                aria-label={`Type your line for ${item.meaning}`}
                className="min-h-12 w-full rounded-2xl border border-line bg-surface-2 px-4 text-base font-medium text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              />
              <button
                type="button"
                onClick={submit}
                disabled={checked !== null || typed.trim() === ""}
                className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-2xl bg-foreground px-5 font-medium text-background transition-opacity active:opacity-80 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              >
                Check
              </button>
            </div>
          )}
        </>
      )}

      {checked !== null && (
        <div className="mt-5">
          <p
            className={`text-base font-medium ${
              checked ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"
            }`}
          >
            {checked ? "Correct" : `The model line is ${model}`}
          </p>
          <p className="mt-1 text-2xl font-semibold leading-tight tracking-tight text-foreground">{model}</p>
          {item.script && (
            <p lang="ml" className="mt-1 font-malayalam text-lg text-text-2">
              {item.script}
            </p>
          )}
          {audioReady && (
            <div className="mt-4">
              <PlayButton
                spriteId={spriteId}
                clipKey={item.audio.normal}
                label={`Play the model line for ${item.meaning}`}
                secondary
              />
            </div>
          )}
          <WordBreakdown words={modelWords} parts={spec.parts} />
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
