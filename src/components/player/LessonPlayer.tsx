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
  /** Inlined articulation SVG markup, keyed by diagram path */
  diagrams: Record<string, string>;
}

type Phase = "gate" | "steps" | "done";

/** Core lesson loop (PLAN.md §6) — gate, per-item reveal, drills, completion. */
export function LessonPlayer({ lesson, diagrams }: LessonPlayerProps) {
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
    <main className="mx-auto min-h-dvh w-full max-w-md px-4 py-6">
      {phase === "gate" && (
        <div className="flex min-h-[70dvh] flex-col items-center justify-center text-center">
          <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Lesson</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">{lesson.title}</h1>
          {!audioReady && (
            <p className="mt-4 max-w-xs text-balance rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
              Lesson audio is on its way — you can complete this lesson without sound.
            </p>
          )}
          <button
            type="button"
            onClick={start}
            className="mt-8 inline-flex min-h-14 w-full max-w-xs items-center justify-center rounded-full bg-foreground px-8 font-medium text-background transition-opacity active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            Tap to start
          </button>
          <button
            type="button"
            onClick={() => setPrefsOpen(true)}
            className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full px-4 text-sm font-medium text-neutral-600 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground dark:text-neutral-400"
          >
            Preferences
          </button>
        </div>
      )}

      {phase === "steps" && step && (
        <div>
          <header className="flex items-center justify-between gap-2">
            <Link
              href="/lessons"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-sm font-medium text-neutral-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground dark:text-neutral-400"
            >
              Lessons
            </Link>
            <h1 className="truncate text-base font-semibold">{lesson.title}</h1>
            <button
              type="button"
              onClick={() => setPrefsOpen(true)}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-neutral-300 px-3 text-sm font-medium transition-opacity active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground dark:border-neutral-700"
              aria-label="Preferences"
            >
              Aa
            </button>
          </header>
          <div className="mt-4 flex items-center gap-3">
            <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
              <div
                className="h-full rounded-full bg-foreground transition-all"
                style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
              />
            </div>
            <span className="shrink-0 text-sm tabular-nums text-neutral-500 dark:text-neutral-400">
              {stepIndex + 1} of {steps.length}
            </span>
          </div>
          {prefs.silent && (
            <p className="mt-3 text-sm font-medium text-neutral-500 dark:text-neutral-400">Silent mode on</p>
          )}
          {!audioReady && (
            <p className="mt-3 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
              Audio is on its way — text is revealed by tap instead.
            </p>
          )}
          <div className="mt-6 rounded-3xl border border-neutral-200 bg-background p-5 dark:border-neutral-800">
            {step.kind === "reveal" && (
              <RevealCard
                key={step.itemId}
                item={itemsById.get(step.itemId)!}
                spriteId={lesson.spriteId}
                diagrams={diagrams}
                revealImmediately={prefs.revealImmediately}
                onNext={() => advance()}
              />
            )}
            {step.kind === "anticipation" && (
              <AnticipationDrill
                key={`anticipation-${step.itemId}`}
                item={itemsById.get(step.itemId)!}
                spriteId={lesson.spriteId}
                silent={prefs.silent}
                onComplete={() => advance()}
              />
            )}
            {step.kind === "multipleChoice" && (
              <MultipleChoiceDrill
                key={`mc-${step.drill.itemId}`}
                item={itemsById.get(step.drill.itemId)!}
                distractors={step.drill.distractors}
                spriteId={lesson.spriteId}
                revealImmediately={prefs.revealImmediately}
                onComplete={(correct) => advance(correct)}
              />
            )}
            {step.kind === "typing" && (
              <TypingDrill
                key={`typing-${step.itemId}`}
                item={itemsById.get(step.itemId)!}
                spriteId={lesson.spriteId}
                revealImmediately={prefs.revealImmediately}
                onComplete={(correct) => advance(correct)}
              />
            )}
            {step.kind === "minimalPair" && (
              <MinimalPairDrill
                key={`pair-${step.drill.pairId}`}
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
        <div className="flex min-h-[70dvh] flex-col items-center justify-center text-center">
          <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Lesson complete</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">{lesson.title}</h1>
          <p className="mt-4 text-lg text-neutral-700 dark:text-neutral-300">
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
