"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { levels } from "@/content";
import type { Item } from "@/content/types";
import { MultipleChoiceDrill } from "@/components/player/MultipleChoiceDrill";
import { TypingDrill } from "@/components/player/TypingDrill";
import { recordReviewComplete } from "@/lib/gamification/progress";
import { DAILY_REVIEW_CAP, persistReview, reviewCard } from "@/lib/fsrs/scheduler";
import type { CardRecord, ReviewRating } from "@/lib/fsrs/types";
import { progressStore } from "@/lib/progress/store";

/**
 * Daily review session (PLAN.md §7): pulls due cards, capped at
 * DAILY_REVIEW_CAP (~10 minutes; overflow rolls over to tomorrow).
 * Answer first, then rate on the FSRS ladder: a wrong answer is graded
 * Again automatically, a correct one chooses Hard, Good, or Easy.
 * Every review result is logged to IndexedDB.
 */

interface ReviewItem {
  card: CardRecord;
  item: Item;
  distractors: string[];
  spriteId: string;
}

type Phase = "loading" | "review" | "done";

export default function ReviewPage() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [queue, setQueue] = useState<ReviewItem[]>([]);
  const [overflow, setOverflow] = useState(0);
  const [index, setIndex] = useState(0);
  const [answered, setAnswered] = useState<boolean | null>(null);
  const [reviewed, setReviewed] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [saveWarning, setSaveWarning] = useState(false);

  const contentIndex = useMemo(() => {
    const items = new Map<string, { item: Item; spriteId: string }>();
    for (const lesson of levels.flatMap((level) => level.lessons)) {
      for (const item of lesson.items) {
        items.set(item.id, { item, spriteId: lesson.spriteId });
      }
    }
    return items;
  }, []);

  useEffect(() => {
    const load = async () => {
      const now = new Date();
      const due = await progressStore.listDue(now, DAILY_REVIEW_CAP);
      const totalDue = await progressStore.countDue(now);
      const queue: ReviewItem[] = [];
      for (const card of due) {
        const entry = contentIndex.get(card.itemId);
        if (!entry) continue; // content removed: card stays put until reconciliation
        const lesson = levels
          .flatMap((level) => level.lessons)
          .find((candidate) => candidate.items.some((item) => item.id === card.itemId));
        const distractors = (lesson?.items ?? [])
          .filter((other) => other.id !== card.itemId)
          .map((other) => other.meaning)
          .slice(0, 3);
        queue.push({ card, item: entry.item, distractors, spriteId: entry.spriteId });
      }
      setQueue(queue);
      setOverflow(Math.max(0, totalDue - DAILY_REVIEW_CAP));
      setPhase(queue.length === 0 ? "done" : "review");
    };
    void load();
  }, [contentIndex]);

  const current = queue[index];

  // Completing the session records it for the streak and achievements
  // (PLAN.md §8); ten-card sessions earn a freeze. Best-effort only.
  const recordedDone = useRef(false);
  useEffect(() => {
    if (phase !== "done" || recordedDone.current || reviewed === 0) return;
    recordedDone.current = true;
    void recordReviewComplete(progressStore, reviewed, new Date());
  }, [phase, reviewed]);

  // Advancing never depends on storage: the review result is persisted
  // fire-and-forget, and a failed or hanging store only raises a quiet
  // warning line, never a blocked answer.
  const persist = (result: ReturnType<typeof reviewCard>) => {
    void persistReview(progressStore, result, () => setSaveWarning(true));
  };

  const grade = (rating: ReviewRating, correct: boolean) => {
    if (!current) return;
    setReviewed((count) => count + 1);
    if (correct) setCorrectCount((count) => count + 1);
    advance();
    try {
      persist(reviewCard(current.card, rating, new Date()));
    } catch {
      setSaveWarning(true);
    }
  };

  const advance = () => {
    setAnswered(null);
    if (index + 1 < queue.length) setIndex((i) => i + 1);
    else setPhase("done");
  };

  const answer = (correct: boolean) => {
    setAnswered(correct);
    if (!correct) {
      setReviewed((count) => count + 1);
      try {
        persist(reviewCard(current.card, "again", new Date()));
      } catch {
        setSaveWarning(true);
      }
    }
  };

  if (phase === "loading") {
    return (
      <main className="mx-auto min-h-[100dvh] w-full max-w-md px-4 pb-6 pt-[calc(1.5rem+env(safe-area-inset-top))]">
        <p className="text-sm text-text-2">Loading your review queue</p>
      </main>
    );
  }

  if (phase === "done" || !current) {
    return (
      <main className="mx-auto min-h-[100dvh] w-full max-w-md px-4 pb-6 pt-[calc(1.5rem+env(safe-area-inset-top))]">
        <div className="flex min-h-[70dvh] flex-col justify-center text-left">
          <p lang="ml" aria-hidden="true" className="font-malayalam text-4xl leading-none">
            മലയാളം
          </p>
          {reviewed === 0 ? (
            <>
              <h1 className="mt-6 text-3xl font-bold tracking-tight">All caught up</h1>
              <p className="mt-3 text-text-2">No cards are due right now. Finish a lesson to schedule more.</p>
            </>
          ) : (
            <>
              <h1 className="mt-6 text-3xl font-bold tracking-tight">Review complete</h1>
              <p className="mt-3 text-lg tabular-nums text-text-2">
                {correctCount} of {reviewed} correct
              </p>
              {overflow > 0 && (
                <p className="mt-2 text-sm text-text-3">
                  {overflow} more due {overflow === 1 ? "card rolls" : "cards roll"} over to tomorrow.
                </p>
              )}
            </>
          )}
          <Link
            href="/lessons"
            className="mt-8 inline-flex min-h-12 w-full max-w-xs items-center justify-center rounded-full bg-foreground px-8 font-medium text-background transition-opacity active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            Back to lessons
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-[100dvh] w-full max-w-md px-4 pb-6 pt-[calc(1.5rem+env(safe-area-inset-top))]">
      <div className="flex items-center justify-between">
        <p lang="ml" aria-hidden="true" className="font-malayalam text-xl leading-none">
          മലയാളം
        </p>
        <span className="text-sm tabular-nums text-text-2">
          {index + 1} of {queue.length}
        </span>
      </div>
      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-line">
        <div
          className="h-full rounded-full bg-accent transition-all"
          style={{ width: `${((index + (answered !== null ? 1 : 0)) / queue.length) * 100}%` }}
        />
      </div>
      {saveWarning && <p className="mt-3 text-sm text-text-3">Progress could not be saved on this device.</p>}

      <div className="mt-5 rounded-3xl border border-line bg-surface p-5">
        <p className="text-sm font-medium text-text-2">
          {current.card.skill === "recognition" ? "Recognize the word" : "Produce the word"}: do you remember this?
        </p>
        {answered === null && (
          <div className="mt-4">
            {current.card.skill === "recognition" ? (
              <MultipleChoiceDrill
                key={current.card.key}
                item={current.item}
                distractors={current.distractors}
                spriteId={current.spriteId}
                revealImmediately={false}
                onComplete={answer}
              />
            ) : (
              <TypingDrill
                key={current.card.key}
                item={current.item}
                spriteId={current.spriteId}
                revealImmediately={false}
                onComplete={answer}
              />
            )}
          </div>
        )}
        {answered === true && (
          <div className="mt-4">
            <p className="text-sm font-medium text-text-2">How did it feel?</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => grade("hard", true)}
                className="min-h-12 rounded-2xl border border-line bg-surface-2 font-medium transition-opacity active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              >
                Hard
              </button>
              <button
                type="button"
                onClick={() => grade("good", true)}
                className="min-h-12 rounded-2xl bg-accent font-medium text-accent-foreground transition-opacity active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              >
                Good
              </button>
              <button
                type="button"
                onClick={() => grade("easy", true)}
                className="min-h-12 rounded-2xl border border-line bg-surface-2 font-medium transition-opacity active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              >
                Easy
              </button>
            </div>
          </div>
        )}
        {answered === false && (
          <div className="mt-4">
            <p className="text-sm font-medium text-text-2">Marked as Again. It comes back sooner.</p>
            <button
              type="button"
              onClick={advance}
              className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-foreground px-8 font-medium text-background transition-opacity active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
