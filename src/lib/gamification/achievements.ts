import { levels } from '@/content';
import type { CardRecord, ReviewLogRecord } from '@/lib/fsrs/types';
import type { ProgressEvent } from '@/lib/progress/store';
import type { StreakState } from './streak';

/**
 * Achievements (PLAN.md §8), wired to real learner events: lesson and
 * review completion events, scheduled cards, review logs, and the
 * streak. Unlocking is pure evaluation over that state, so the same
 * checks run after any event and in unit tests.
 */

export interface AchievementDef {
  id: string;
  name: string;
  description: string;
}

export interface UnlockedAchievement {
  id: string;
  unlockedAt: Date;
}

export const ACHIEVEMENTS: AchievementDef[] = [
  { id: 'first-lesson', name: 'First lesson', description: 'Complete your first lesson.' },
  { id: 'perfect-lesson', name: 'Perfect lesson', description: 'Finish a lesson with every answer correct.' },
  { id: 'first-review', name: 'First review', description: 'Complete your first review card.' },
  { id: 'first-100-words', name: 'First 100 words', description: 'Schedule 100 cards.' },
  { id: 'zh-master', name: 'Zh Master', description: 'Review all three zh words.' },
  { id: 'streak-7', name: '7-day streak', description: 'Practice seven days in a row.' },
];

/** Every sound:zh item in current content (the Zh Master set). */
const ZH_ITEM_IDS = new Set(
  levels
    .flatMap((level) => level.lessons)
    .flatMap((lesson) => lesson.items)
    .filter((item) => item.tags.includes('sound:zh'))
    .map((item) => item.id),
);

export interface AchievementInput {
  cards: CardRecord[];
  logs: ReviewLogRecord[];
  events: ProgressEvent[];
  streak: StreakState;
  now: Date;
}

/** Which achievements newly unlock, given the learner's real state. */
export function evaluateAchievements(input: AchievementInput, unlocked: Set<string>): UnlockedAchievement[] {
  const { cards, logs, events, streak, now } = input;
  const unlockedNow: UnlockedAchievement[] = [];

  const unlock = (id: string): void => {
    if (!unlocked.has(id)) unlockedNow.push({ id, unlockedAt: now });
  };

  if (events.some((event) => event.type === 'lesson-complete')) unlock('first-lesson');
  if (events.some((event) => event.type === 'lesson-complete' && event.data.perfect === true)) {
    unlock('perfect-lesson');
  }
  if (logs.length > 0) unlock('first-review');
  if (cards.length >= 100) unlock('first-100-words');

  const reviewedZh = new Set(logs.filter((log) => ZH_ITEM_IDS.has(log.itemId)).map((log) => log.itemId));
  if (ZH_ITEM_IDS.size > 0 && [...ZH_ITEM_IDS].every((id) => reviewedZh.has(id))) {
    unlock('zh-master');
  }
  if (streak.count >= 7) unlock('streak-7');

  return unlockedNow;
}
