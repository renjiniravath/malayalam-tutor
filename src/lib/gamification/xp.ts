/**
 * XP, levels, and ranks (PLAN.md §8): XP accrues only from real learner
 * events (reviews, lessons, streak days, achievement unlocks). Level
 * thresholds ramp so early levels come fast, and there are no XP
 * penalties, no loss framing, and no punishing resets anywhere.
 *
 * Pure functions over a plain total; all timestamps flow in from the
 * injectable clock at the call sites.
 */

export interface Rank {
  level: number;
  title: string;
  minXp: number;
}

/** Thresholds ramp: each step costs more than the last. */
export const RANKS: Rank[] = [
  { level: 1, title: 'Listener', minXp: 0 },
  { level: 2, title: 'Curious', minXp: 100 },
  { level: 3, title: 'Learner', minXp: 250 },
  { level: 4, title: 'Regular', minXp: 500 },
  { level: 5, title: 'Speaker', minXp: 900 },
  { level: 6, title: 'Chatterbox', minXp: 1500 },
  { level: 7, title: 'Storyteller', minXp: 2300 },
  { level: 8, title: 'Local', minXp: 3400 },
  { level: 9, title: 'Malayalee', minXp: 5000 },
];

/** XP awards for real events. */
export const XP_REWARDS = {
  reviewCard: 5,
  lesson: 20,
  perfectLessonBonus: 10,
  /** Awarded once per day, on the first learning activity of the day */
  streakDay: 10,
  achievement: 25,
} as const;

/** The highest rank whose threshold the total meets. */
export function rankForXp(xp: number): Rank {
  let current = RANKS[0];
  for (const rank of RANKS) {
    if (xp >= rank.minXp) current = rank;
    else break;
  }
  return current;
}

/** The next rank up, when one exists. */
export function nextRank(xp: number): Rank | undefined {
  return RANKS.find((rank) => rank.minXp > xp);
}
