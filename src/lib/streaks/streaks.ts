/**
 * Streak logic (PLAN.md §8): daily streak, winnable in under 10
 * minutes, with grace freezes and an explicit pause. No dark patterns:
 * nothing here messages risk or shame, and a lapse simply starts a new
 * count. Pure functions with an injectable clock.
 */

export interface StreakState {
  current: number
  best: number
  /** Local calendar day (YYYY-MM-DD) of the last learning activity. */
  lastLearningDay: string | null
  /** Grace freezes: each missed day consumes one instead of a reset. */
  freezes: number
  /** ISO timestamp while paused; the streak is preserved, not frozen. */
  pausedAt: string | null
}

export const EMPTY_STREAK: StreakState = {
  current: 0,
  best: 0,
  lastLearningDay: null,
  freezes: 0,
  pausedAt: null,
}

/** Local calendar day key — day boundaries follow the learner's clock. */
export function dayKey(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function daysBetween(from: string, to: string): number {
  const a = new Date(`${from}T00:00:00`)
  const b = new Date(`${to}T00:00:00`)
  return Math.round((b.getTime() - a.getTime()) / 86400000)
}

/** Record one learning behavior (a drill graded, a review done). */
export function recordActivity(state: StreakState, now: Date): StreakState {
  if (state.pausedAt) return state
  const today = dayKey(now)
  if (state.lastLearningDay === today) return state

  let current: number
  let freezes = state.freezes
  if (state.lastLearningDay === null) {
    current = 1
  } else {
    const gap = daysBetween(state.lastLearningDay, today)
    if (gap <= 1) {
      current = state.current + 1
    } else if (freezes > 0) {
      const missed = gap - 1
      const covered = Math.min(freezes, missed)
      freezes -= covered
      current = covered === missed ? state.current + 1 : 1
    } else {
      current = 1
    }
  }

  return { ...state, current, best: Math.max(state.best, current), lastLearningDay: today, freezes }
}

/** The streak as it reads today, without mutating state. */
export function currentStreak(state: StreakState, now: Date): number {
  if (state.pausedAt) return state.current
  if (state.lastLearningDay === null) return 0
  const gap = daysBetween(state.lastLearningDay, dayKey(now))
  if (gap <= 1) return state.current
  return state.freezes > 0 ? state.current : 0
}

/** Explicit pause: the streak is preserved without consuming freezes. */
export function pauseStreak(state: StreakState, now: Date): StreakState {
  if (state.pausedAt) return state
  return { ...state, pausedAt: now.toISOString() }
}

export function resumeStreak(state: StreakState, now: Date): StreakState {
  if (!state.pausedAt) return state
  return { ...state, pausedAt: null, lastLearningDay: dayKey(now) }
}

/** Bonus review milestones earn freezes (PLAN.md §8 grace). */
export function addFreezes(state: StreakState, count: number): StreakState {
  return { ...state, freezes: state.freezes + count }
}
