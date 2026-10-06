/**
 * Achievements (PLAN.md §8), wired to real events only. Pure: given
 * event counters and already-earned ids, return what is newly earned.
 */

export type AchievementId = 'firstReview' | 'perfectLesson' | 'sevenDayStreak'

export interface AchievementDef {
  title: string
  description: string
}

export const ACHIEVEMENTS: Record<AchievementId, AchievementDef> = {
  firstReview: { title: 'First review', description: 'Reviewed a card for the first time.' },
  perfectLesson: { title: 'Perfect lesson', description: 'Finished a lesson with no wrong answers.' },
  sevenDayStreak: { title: 'Week of learning', description: 'Kept a 7-day streak alive.' },
}

export interface AchievementEvents {
  reviewCount: number
  perfectLessons: number
  streak: number
}

export function newlyEarned(
  events: AchievementEvents,
  earned: readonly AchievementId[],
): AchievementId[] {
  const out: AchievementId[] = []
  const has = new Set(earned)
  if (events.reviewCount >= 1 && !has.has('firstReview')) out.push('firstReview')
  if (events.perfectLessons >= 1 && !has.has('perfectLesson')) out.push('perfectLesson')
  if (events.streak >= 7 && !has.has('sevenDayStreak')) out.push('sevenDayStreak')
  return out
}

export interface AchievementProgress {
  id: AchievementId
  title: string
  description: string
  /** Real progress toward the target; never a decorative fraction. */
  progress: number
  target: number
  earned: boolean
}

/** Display states: earned, in-progress (progress above zero), or not yet. */
export function achievementProgress(
  events: AchievementEvents,
  earned: readonly AchievementId[],
): AchievementProgress[] {
  const earnedSet = new Set(earned)
  const raw = (id: AchievementId): { progress: number; target: number } => {
    switch (id) {
      case 'firstReview':
        return { progress: Math.min(events.reviewCount, 1), target: 1 }
      case 'perfectLesson':
        return { progress: Math.min(events.perfectLessons, 1), target: 1 }
      case 'sevenDayStreak':
        return { progress: Math.min(events.streak, 7), target: 7 }
    }
  }
  return (Object.keys(ACHIEVEMENTS) as AchievementId[]).map((id) => ({
    id,
    title: ACHIEVEMENTS[id].title,
    description: ACHIEVEMENTS[id].description,
    ...raw(id),
    earned: earnedSet.has(id),
  }))
}
