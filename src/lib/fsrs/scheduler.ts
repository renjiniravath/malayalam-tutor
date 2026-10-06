/**
 * FSRS scheduling (PLAN.md §7). Cards are keyed {itemId, skill}:
 * recognition and production decay independently, so each gets its own
 * card. Desired retention is 0.90 — a long-run per-card target, separate
 * from the level-test pass bar.
 *
 * Every function takes an explicit `now` so all scheduling logic runs
 * against an injectable clock (PLAN.md §7, M3).
 */

import {
  createEmptyCard,
  fsrs,
  Rating,
  type Card,
  type Grade as FsrsGrade,
  type ReviewLog,
} from 'ts-fsrs'

export type Skill = 'recognition' | 'production' | 'sentence'

/** The four-grade feedback ladder. */
export type Grade = 'again' | 'hard' | 'good' | 'easy'

export interface ReviewCard {
  itemId: string
  skill: Skill
  card: Card
}

const RATING: Record<Grade, FsrsGrade> = {
  again: Rating.Again,
  hard: Rating.Hard,
  good: Rating.Good,
  easy: Rating.Easy,
}

const scheduler = fsrs({
  request_retention: 0.9,
  maximum_interval: 36500,
  enable_fuzz: true,
})

export function newCard(itemId: string, skill: Skill, now: Date): ReviewCard {
  return { itemId, skill, card: createEmptyCard(now) }
}

/** Grade a card; returns the next state plus the ts-fsrs log to persist. */
export function review(
  card: ReviewCard,
  grade: Grade,
  now: Date,
): { card: ReviewCard; log: ReviewLog } {
  const result = scheduler.next(card.card, now, RATING[grade])
  return { card: { ...card, card: result.card }, log: result.log }
}

export function isDue(card: ReviewCard, now: Date): boolean {
  return card.card.due.getTime() <= now.getTime()
}
