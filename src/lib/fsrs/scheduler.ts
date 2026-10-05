import { createEmptyCard, fsrs, Rating, State, type Grade } from 'ts-fsrs';
import { cardKey, stateName, type CardRecord, type ReviewLogRecord, type ReviewRating, type Skill } from './types';

/**
 * FSRS scheduler wrapper (PLAN.md §7): desired retention 0.90, cards
 * keyed {itemId, skill}. Every review returns the updated card plus a
 * log record; all functions take `now` explicitly so day-boundary and
 * scheduling behavior are unit-testable with an injectable clock.
 */

export const DESIRED_RETENTION = 0.9;

/**
 * Daily review cap (PLAN.md §7): ~10 minutes of due cards, about 30 at
 * 20 seconds each. Overflow stays due and rolls over to the next day.
 */
export const DAILY_REVIEW_CAP = 30;

/** Due cards injected at the start of a lesson as warm-up review. */
export const LESSON_INJECTION_LIMIT = 2;

const scheduler = fsrs({
  request_retention: DESIRED_RETENTION,
  maximum_interval: 365,
  enable_fuzz: true,
});

const RATING: Record<ReviewRating, Grade> = {
  again: Rating.Again,
  hard: Rating.Hard,
  good: Rating.Good,
  easy: Rating.Easy,
};

/** A fresh card for one item skill, due immediately (it enters today's queue). */
export function newCardRecord(itemId: string, skill: Skill, now: Date): CardRecord {
  return {
    key: cardKey(itemId, skill),
    itemId,
    skill,
    due: now,
    fsrs: createEmptyCard(now),
  };
}

export interface ReviewResult {
  record: CardRecord;
  log: ReviewLogRecord;
}

/** Applies a rating to a card and returns the rescheduled card plus its log. */
export function reviewCard(record: CardRecord, rating: ReviewRating, now: Date): ReviewResult {
  const result = scheduler.next(record.fsrs, now, RATING[rating]);
  const fsrs = result.card;
  const log: ReviewLogRecord = {
    id: crypto.randomUUID(),
    cardKey: record.key,
    itemId: record.itemId,
    skill: record.skill,
    rating,
    review: now,
    due: fsrs.due,
    stability: fsrs.stability,
    difficulty: fsrs.difficulty,
    state: stateName(fsrs.state),
    scheduledDays: fsrs.scheduled_days,
  };
  return { record: { ...record, fsrs, due: fsrs.due }, log };
}

/**
 * How a drill result maps onto FSRS when review is injected into a
 * lesson: correct answers schedule as good, wrong answers as again.
 * The full Again/Hard/Good/Easy ladder lives in the daily review session.
 */
export function ratingForAnswer(correct: boolean): ReviewRating {
  return correct ? 'good' : 'again';
}

/** True when a new card's first review actually moved it out of the New state. */
export function isNewCard(record: CardRecord): boolean {
  return record.fsrs.state === State.New;
}
