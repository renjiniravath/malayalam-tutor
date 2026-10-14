/**
 * Daily streak (PLAN.md §8, boot.dev-style minus the dark patterns).
 *
 * Winnable in under ten minutes: any learning day counts (a lesson or a
 * review session). Missed days are covered by freezes, earned from bonus
 * review milestones; an explicit pause preserves the streak without
 * consuming freezes, and days while paused never count against it.
 * A lapsed streak simply restarts at one. No loss shaming, no
 * streaks-at-risk messaging anywhere.
 *
 * All functions take `now` explicitly (injectable clock, PLAN.md §7),
 * and days are device-local calendar days (YYYY-MM-DD), so day-boundary
 * behavior is unit-testable.
 */

export interface StreakState {
  /** Consecutive active days, including today */
  count: number;
  /** Device-local day string (YYYY-MM-DD) of the last active day */
  lastDay: string;
  /** Earned freezes that cover missed days */
  freezes: number;
  /** While set, activity neither counts nor breaks the streak */
  pausedUntil?: string;
}

export const MAX_FREEZES = 3;

/** The device-local calendar day of a timestamp, as YYYY-MM-DD. */
export function localDay(now: Date): string {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** Whole days between two day strings (positive when b is after a). */
export function daysBetween(a: string, b: string): number {
  const [ay, am, ad] = a.split('-').map(Number);
  const [by, bm, bd] = b.split('-').map(Number);
  return Math.round((Date.UTC(by, bm - 1, bd) - Date.UTC(ay, am - 1, ad)) / 86_400_000);
}

export function emptyStreak(): StreakState {
  return { count: 0, lastDay: '', freezes: 0 };
}

/** Records a learning day and returns the updated streak. */
export function registerActivity(state: StreakState, now: Date): StreakState {
  const day = localDay(now);

  if (state.pausedUntil !== undefined) {
    if (day < state.pausedUntil) return state; // still paused: nothing counts, nothing breaks
    // Pause has ended: the break was deliberate, so the chain continues.
    return { ...state, pausedUntil: undefined, count: state.count + 1, lastDay: day };
  }

  if (state.count === 0) return { count: 1, lastDay: day, freezes: state.freezes };
  if (day === state.lastDay) return state;

  const gap = daysBetween(state.lastDay, day);
  if (gap === 1) {
    return { ...state, count: state.count + 1, lastDay: day };
  }
  // A gap of two or more days: freezes cover the missed days, otherwise
  // the streak restarts quietly at one.
  const needed = gap - 1;
  if (state.freezes >= needed) {
    return { ...state, count: state.count + 1, lastDay: day, freezes: state.freezes - needed };
  }
  return { count: 1, lastDay: day, freezes: 0 };
}

/** Explicit pause: preserves the streak without consuming freezes. */
export function pauseStreak(state: StreakState, now: Date, days: number): StreakState {
  const until = new Date(now);
  until.setDate(until.getDate() + days);
  return { ...state, pausedUntil: localDay(until) };
}

/** Ends a pause early; the chain resumes from wherever it was. */
export function resumeStreak(state: StreakState): StreakState {
  if (state.pausedUntil === undefined) return state;
  return { ...state, pausedUntil: undefined };
}

/** Earns a freeze from a bonus review milestone, capped. */
export function awardFreeze(state: StreakState): StreakState {
  return { ...state, freezes: Math.min(MAX_FREEZES, state.freezes + 1) };
}
