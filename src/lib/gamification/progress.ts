import { ACHIEVEMENTS, evaluateAchievements } from './achievements';
import { awardFreeze, emptyStreak, pauseStreak, registerActivity, resumeStreak, type StreakState } from './streak';
import type { ProgressStore } from '@/lib/progress/store';

/**
 * Wires real learner events to streak and achievements (PLAN.md §8).
 * Every write is guarded: gamification state must never block the
 * lesson or review flow, so failures are swallowed quietly.
 */

const STREAK_KEY = 'streak';
const ACHIEVEMENTS_KEY = 'achievements';
/** Bonus review milestone: a ten-card session earns a freeze. */
export const FREEZE_MILESTONE = 10;

async function loadStreak(store: ProgressStore): Promise<StreakState> {
  const stored = await store.getMeta<StreakState>(STREAK_KEY);
  return stored ?? emptyStreak();
}

async function saveStreak(store: ProgressStore, streak: StreakState): Promise<void> {
  await store.setMeta(STREAK_KEY, streak);
}

async function checkAchievements(store: ProgressStore, now: Date): Promise<void> {
  const [cards, logs, events, streak, unlockedRaw] = await Promise.all([
    store.listCards(),
    store.listLogs(10_000),
    store.listEvents(),
    loadStreak(store),
    store.getMeta<Record<string, string>>(ACHIEVEMENTS_KEY),
  ]);
  const unlocked = new Set(Object.keys(unlockedRaw ?? {}));
  const fresh = evaluateAchievements({ cards, logs, events, streak, now }, unlocked);
  if (fresh.length === 0) return;
  const merged = { ...(unlockedRaw ?? {}) };
  for (const achievement of fresh) merged[achievement.id] = achievement.unlockedAt.toISOString();
  await store.setMeta(ACHIEVEMENTS_KEY, merged);
}

async function guard(task: () => Promise<void>): Promise<void> {
  try {
    await task();
  } catch {
    // Gamification state is best-effort; the lesson flow never waits on it.
  }
}

/** A lesson completed: counts toward the streak, feeds achievements. */
export function recordLessonComplete(
  store: ProgressStore,
  lessonId: string,
  correct: number,
  total: number,
  now: Date,
): Promise<void> {
  return guard(async () => {
    await store.appendEvent({
      id: crypto.randomUUID(),
      type: 'lesson-complete',
      at: now,
      data: { lessonId, correct, total, perfect: total > 0 && correct === total },
    });
    const streak = registerActivity(await loadStreak(store), now);
    await saveStreak(store, streak);
    await checkAchievements(store, now);
  });
}

/** A review session completed: counts toward the streak; ten-card sessions earn a freeze. */
export function recordReviewComplete(store: ProgressStore, reviewed: number, now: Date): Promise<void> {
  return guard(async () => {
    await store.appendEvent({
      id: crypto.randomUUID(),
      type: 'review-complete',
      at: now,
      data: { reviewed },
    });
    let streak = registerActivity(await loadStreak(store), now);
    if (reviewed >= FREEZE_MILESTONE) streak = awardFreeze(streak);
    await saveStreak(store, streak);
    await checkAchievements(store, now);
  });
}

/** Pauses the streak for a week; nothing during the pause counts or breaks it. */
export function pauseLearnerStreak(store: ProgressStore, now: Date): Promise<void> {
  return guard(async () => {
    await saveStreak(store, pauseStreak(await loadStreak(store), now, 7));
  });
}

/** Ends a pause early. */
export function resumeLearnerStreak(store: ProgressStore): Promise<void> {
  return guard(async () => {
    await saveStreak(store, resumeStreak(await loadStreak(store)));
  });
}

export { ACHIEVEMENTS, emptyStreak, type StreakState };
