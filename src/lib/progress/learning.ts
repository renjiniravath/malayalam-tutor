/**
 * Learning-state orchestration: streaks and achievements persisted to
 * the local-first store. Every clock-bearing call takes an explicit
 * `now` for the injectable-clock tests (PLAN.md §8).
 */

import { getStore } from '@/lib/store/singleton'
import { ACHIEVEMENTS, type AchievementId } from '@/lib/streaks/achievements'
import { awardXp } from '@/lib/xp/award'
import { XP_AMOUNTS } from '@/lib/xp/xp'
import {
  addFreezes,
  EMPTY_STREAK,
  pauseStreak,
  recordActivity,
  resumeStreak,
  type StreakState,
} from '@/lib/streaks/streaks'

/** One learning behavior happened (a drill graded, a review done). */
export async function recordLearningActivity(now: Date = new Date()): Promise<StreakState> {
  const store = getStore()
  const current = (await store.getStreak()) ?? EMPTY_STREAK
  const next = recordActivity(current, now)
  await store.putStreak(next)
  if (next.lastLearningDay !== current.lastLearningDay) {
    // A new streak day is a real learning behavior (PLAN.md §8).
    void awardXp(XP_AMOUNTS.streakDay).catch(console.error)
  }
  if (next.current >= 7) await earn('sevenDayStreak', now)
  return next
}

/** A bonus review session completed: one grace freeze (PLAN.md §8). */
export async function completeReviewSession(): Promise<StreakState> {
  const store = getStore()
  const current = (await store.getStreak()) ?? EMPTY_STREAK
  const next = addFreezes(current, 1)
  await store.putStreak(next)
  return next
}

export async function pauseStreakNow(now: Date = new Date()): Promise<StreakState> {
  const store = getStore()
  const current = (await store.getStreak()) ?? EMPTY_STREAK
  const next = pauseStreak(current, now)
  await store.putStreak(next)
  return next
}

export async function resumeStreakNow(now: Date = new Date()): Promise<StreakState> {
  const store = getStore()
  const current = (await store.getStreak()) ?? EMPTY_STREAK
  const next = resumeStreak(current, now)
  await store.putStreak(next)
  return next
}

/** Earn an achievement once; every call is cheap and idempotent. */
export async function earn(id: AchievementId, now: Date = new Date()): Promise<void> {
  const store = getStore()
  const earned = await store.listAchievements()
  if (earned.some((a) => a.id === id)) return
  await store.putAchievement({ id, earnedAt: now.getTime() })
  void awardXp(XP_AMOUNTS.achievement).catch(console.error)
}

export function achievementTitle(id: AchievementId): string {
  return ACHIEVEMENTS[id].title
}
