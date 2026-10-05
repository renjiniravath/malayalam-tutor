import { State } from 'ts-fsrs';
import type { Card } from 'ts-fsrs';

/**
 * Review card and log records (PLAN.md §7). Cards are keyed by
 * {itemId, skill}: recognition and production decay independently.
 * Records carry stable string keys and app-level rating names so the
 * shape is sync-ready; ts-fsrs specifics stay at the scheduler boundary.
 */

export type Skill = 'recognition' | 'production';

export const SKILLS: Skill[] = ['recognition', 'production'];

export type ReviewRating = 'again' | 'hard' | 'good' | 'easy';

export function cardKey(itemId: string, skill: Skill): string {
  return `${itemId}:${skill}`;
}

export function stateName(state: State): string {
  return State[state].toLowerCase();
}

export interface CardRecord {
  /** Stable key `${itemId}:${skill}` — never reuse or rename */
  key: string;
  itemId: string;
  skill: Skill;
  /** Denormalized for due queries; mirrors fsrs.due */
  due: Date;
  /** ts-fsrs card state (stability, difficulty, reps, lapses, steps) */
  fsrs: Card;
}

export interface ReviewLogRecord {
  /** UUID — stable for sync */
  id: string;
  cardKey: string;
  itemId: string;
  skill: Skill;
  rating: ReviewRating;
  /** When the review happened */
  review: Date;
  /** Next due date this review produced */
  due: Date;
  stability: number;
  difficulty: number;
  /** ts-fsrs state after the review (new, learning, review, relearning) */
  state: string;
  scheduledDays: number;
}
