"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import type { Lesson } from "@/content/types";
import { audioEngine } from "@/lib/audio/engine";
import {
  getPrefsServerSnapshot,
  getPrefsSnapshot,
  subscribePrefs,
  writePrefs,
} from "@/lib/prefs";
import { buildLessonSteps } from "@/lib/lesson/steps";
import { AnticipationDrill } from "./AnticipationDrill";
import { MinimalPairDrill } from "./MinimalPairDrill";
import { MultipleChoiceDrill } from "./MultipleChoiceDrill";
import { PreferencesSheet } from "./PreferencesSheet";
import { RevealCard } from "./RevealCard";
import { TypingDrill } from "./TypingDrill";

interface LessonPlayerProps {
  lesson: Lesson;
}

type Phase = "gate" | "steps" | "done";

/**
 * Core lesson loop (PLAN.md §6): gate, per-item reveal, drills, completion.
 * Chrome: brand wordmark row, nav + step count, display title, accent
 * progress, quiet status lines, surface step card. Gate and completion are
 * left-aligned offset compositions; the step card transitions on change.
 */
export function LessonPlayer({ lesson }: LessonPlayerProps) {
  const steps = useMemo(() => buildLessonSteps(lesson), [lesson]);
  const itemsById = useMemo(() => new Map(lesson.items.map((item) => [item.id, item])), [lesson]);
  const pairsById = useMemo(() => new Map(lesson.minimalPairs.map((pair) => [pair.id, pair])), [lesson]);

  const [phase, setPhase] = useState<Phase>("gate");
  const [stepIndex, setStepIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [scoredCount, setScoredCount] = useState(0);
  const prefs = useSyncExternalStore(subscribePrefs, getPrefsSnapshot, getPrefsServerSnapshot);
  const [prefsOpen, setPrefsOpen] = useState(false);

  const audioReady = audioEngine.available;
  const step = steps[stepIndex];

  const start = async () => {
    await audioEngine.unlock();
    setPhase("steps");
  };

  const updatePrefs = (next: typeof prefs) => {
    writePrefs(next);
  };

  const advance = (correct?: boolean) => {
    if (correct !== undefined) {
      setScoredCount((count) => count + 1);
      if (correct) setCorrectCount((count) => count + 1);
    }
    if (stepIndex + 1 < steps.length) setStepIndex((index) => index + 1);
    else setPhase("done");
  };

  return (
    <main className="mx-auto min-h-[100dvh] w-full max-w-md px-4 pb-6 pt-[calc(1.5rem+env(safe-area-inset-top))]">
      {phase === "gate" && (
        <div className="flex min-h-[70dvh] flex-col justify-center text-left">
          <p lang="ml" aria-hidden="true" className="font-malayalam text-4xl leading-none">
            മലയാളം
          </p>
          <p className="mt-6 text-sm font-medium text-text-2">Lesson</p>
          <h1 className="mt-1 text-4xl font-bold tracking-tight">{lesson.title}</h1>
          {!audioReady && (
            <p className="mt-4 max-w-xs text-balance text-text-3">
              Lesson audio is on its way. You can complete this lesson without sound.
            </p>
          )}
          <button
            type="button"
            onClick={start}
            className="mt-8 inline-flex min-h-14 w-full max-w-xs items-center justify-center rounded-full bg-accent px-8 font-medium text-accent-foreground transition-opacity active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            Tap to start
          </button>
          <button
            type="button"
            onClick={() => setPrefsOpen(true)}
            className="mt-4 inline-flex min-h-11 w-fit items-center justify-center rounded-full px-4 text-sm font-medium text-text-2 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            Preferences
          </button>
        </div>
      )}

      {phase === "steps" && step && (
        <div>
          <header>
            <div className="flex items-center justify-between">
              <p lang="ml" aria-hidden="true" className="font-malayalam text-xl leading-none">
                മലയാളം
              </p>
              <button
                type="button"
                onClick={() => setPrefsOpen(true)}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line px-3 text-sm font-medium transition-opacity active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                aria-label="Preferences"
              >
                Aa
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <Link
                href="/lessons"
                className="inline-flex min-h-11 min-w-11 items-center rounded-full text-sm font-medium text-text-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              >
                Lessons
              </Link>
              <span className="text-sm tabular-nums text-text-2">
                {stepIndex + 1} of {steps.length}
              </span>
            </div>
            <h1 className="mt-3 text-2xl font-bold tracking-tight">{lesson.title}</h1>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-line">
                <div
                  className="h-full rounded-full bg-accent transition-all"
                  style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>
          </header>
          {prefs.silent && <p className="mt-3 text-sm font-medium text-text-2">Silent mode on</p>}
          {!audioReady && (
            <p className="mt-3 text-sm text-text-3">Audio is on its way. Text is revealed by tap instead.</p>
          )}
          <div
            key={stepIndex}
            className="step-enter mt-5 rounded-3xl border border-line bg-surface p-5"
          >
            {step.kind === "reveal" && (
              <RevealCard
                item={itemsById.get(step.itemId)!}
                spriteId={lesson.spriteId}
                revealImmediately={prefs.revealImmediately}
                onNext={() => advance()}
              />
            )}
            {step.kind === "anticipation" && (
              <AnticipationDrill
                item={itemsById.get(step.itemId)!}
                spriteId={lesson.spriteId}
                silent={prefs.silent}
                onComplete={() => advance()}
              />
            )}
            {step.kind === "multipleChoice" && (
              <MultipleChoiceDrill
                item={itemsById.get(step.drill.itemId)!}
                distractors={step.drill.distractors}
                spriteId={lesson.spriteId}
                revealImmediately={prefs.revealImmediately}
                onComplete={(correct) => advance(correct)}
              />
            )}
            {step.kind === "typing" && (
              <TypingDrill
                item={itemsById.get(step.itemId)!}
                spriteId={lesson.spriteId}
                revealImmediately={prefs.revealImmediately}
                onComplete={(correct) => advance(correct)}
              />
            )}
            {step.kind === "minimalPair" && (
              <MinimalPairDrill
                pair={pairsById.get(step.drill.pairId)!}
                a={itemsById.get(step.pair.aItemId)!}
                b={itemsById.get(step.pair.bItemId)!}
                spriteId={lesson.spriteId}
                onComplete={(correct) => advance(correct)}
              />
            )}
          </div>
        </div>
      )}

      {phase === "done" && (
        <div className="flex min-h-[70dvh] flex-col justify-center text-left">
          <p lang="ml" aria-hidden="true" className="font-malayalam text-4xl leading-none">
            മലയാളം
          </p>
          <p className="mt-6 text-sm font-medium text-text-2">Lesson complete</p>
          <h1 className="mt-1 text-4xl font-bold tracking-tight">{lesson.title}</h1>
          <p className="mt-4 text-lg tabular-nums text-text-2">
            {correctCount} of {scoredCount} correct
          </p>
          <Link
            href="/lessons"
            className="mt-8 inline-flex min-h-12 w-full max-w-xs items-center justify-center rounded-full bg-foreground px-8 font-medium text-background transition-opacity active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            Back to lessons
          </Link>
        </div>
      )}

      {prefsOpen && (
        <PreferencesSheet prefs={prefs} onChange={updatePrefs} onClose={() => setPrefsOpen(false)} />
      )}
    </main>
  );
}
