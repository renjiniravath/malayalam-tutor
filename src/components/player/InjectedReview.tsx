"use client";

import type { Item } from "@/content/types";
import { MultipleChoiceDrill } from "./MultipleChoiceDrill";
import { TypingDrill } from "./TypingDrill";

interface InjectedReviewProps {
  item: Item;
  skill: "recognition" | "production";
  distractors: string[];
  spriteId: string;
  onComplete: (correct: boolean) => void;
}

/**
 * A due review card injected into the lesson flow (PLAN.md §7: review is
 * interleaved into lessons). Reuses the drill mechanics: recognition
 * answers by meaning, production by typing. The caller maps the result
 * onto FSRS (correct = good, wrong = again) and reschedules the card.
 */
export function InjectedReview({ item, skill, distractors, spriteId, onComplete }: InjectedReviewProps) {
  return (
    <div>
      <p className="text-sm font-medium text-text-2">Do you remember this?</p>
      <div className="mt-4">
        {skill === "recognition" ? (
          <MultipleChoiceDrill
            item={item}
            distractors={distractors}
            spriteId={spriteId}
            revealImmediately={false}
            onComplete={onComplete}
          />
        ) : (
          <TypingDrill
            item={item}
            spriteId={spriteId}
            revealImmediately={false}
            onComplete={onComplete}
          />
        )}
      </div>
    </div>
  );
}
