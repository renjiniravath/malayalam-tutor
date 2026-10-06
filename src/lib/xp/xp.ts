/**
 * XP, levels, and ranks (PLAN.md §8). XP accrues from real learning
 * behaviors only, is positive-only, and never resets. Level thresholds
 * ramp up so early levels come fast; ranks are per-level titles in the
 * course's own voice. Pure and clock-free.
 */

export interface XpState {
  total: number
}

export const EMPTY_XP: XpState = { total: 0 }

/** Cumulative XP needed for each level; gaps ramp up. */
export const LEVEL_THRESHOLDS = [
  0, 50, 120, 210, 320, 450, 600, 770, 960, 1170, 1400,
] as const

export const RANKS = [
  'Newcomer',
  'Greeter',
  'Small-talker',
  'Regular',
  'Local',
  'Storyteller',
  'Native ear',
] as const

/** §8: XP for learning behaviors. */
export const XP_AMOUNTS = {
  review: 5,
  lesson: 20,
  streakDay: 10,
  achievement: 15,
} as const

export function levelFor(xp: number): number {
  let level = 1
  while (level < LEVEL_THRESHOLDS.length && xp >= LEVEL_THRESHOLDS[level]) level++
  return level
}

export function rankFor(level: number): string {
  return RANKS[Math.min(level, RANKS.length) - 1]
}

/** Real progress toward the next rank, or null at the top rank. */
export function progressToNext(xp: number): { have: number; need: number; nextRank: string } | null {
  const level = levelFor(xp)
  const next = LEVEL_THRESHOLDS[level]
  if (next === undefined) return null
  const current = LEVEL_THRESHOLDS[level - 1]
  return { have: xp - current, need: next - current, nextRank: rankFor(level + 1) }
}

export function addXp(state: XpState, amount: number): XpState {
  return { total: state.total + Math.max(0, Math.round(amount)) }
}
