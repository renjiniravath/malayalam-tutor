/**
 * Client-side review recording: grade a {itemId, skill} card, persist
 * the next state and the ts-fsrs log (PLAN.md §7 — logs are kept from
 * day one so FSRS parameters can be optimized on real data later).
 */

import { cardKey, type CardRecord } from '@/lib/store/db'
import { getStore } from '@/lib/store/singleton'
import { earn, recordLearningActivity } from '@/lib/progress/learning'
import { awardXp } from '@/lib/xp/award'
import { XP_AMOUNTS } from '@/lib/xp/xp'
import { newCard, review, type Grade, type ReviewCard, type Skill } from './scheduler'

export async function recordReview(
  itemId: string,
  skill: Skill,
  grade: Grade,
  now: Date = new Date(),
): Promise<void> {
  const key = cardKey(itemId, skill)
  const existing = await getStore().getCard(key)
  const current: ReviewCard = existing
    ? { itemId, skill, card: existing.card }
    : newCard(itemId, skill, now)
  const { card: next, log } = review(current, grade, now)
  const record: CardRecord = {
    key,
    itemId,
    skill,
    card: next.card,
    dueAt: next.card.due.getTime(),
    updatedAt: now.getTime(),
  }
  await getStore().putCard(record)
  await getStore().appendLog({ cardKey: key, itemId, skill, reviewedAt: now.getTime(), log })
  // Streaks, XP, and achievements run on real events (PLAN.md §8).
  void awardXp(XP_AMOUNTS.review).catch(console.error)
  await recordLearningActivity(now)
  await earn('firstReview', now)
}
