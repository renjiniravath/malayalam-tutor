import { ACHIEVEMENTS, evaluateAchievements } from './achievements';
import { awardFreeze, emptyStreak, pauseStreak, registerActivity, resumeStreak, type StreakState } from './streak';
import { XP_REWARDS } from './xp';
import type { ProgressStore } from '@/lib/progress/store';

/**
 * Wires real learner events to streak, achievements, and XP
 * (PLAN.md §8). XP accrues only from real events: review cards, lesson
 * completion, the first activity of a day, and achievement unlocks.
 * Every write is guarded: gamification state must never block the
 * lesson or review flow, so failures are swallowed quietly.
 */

const STREAK_KEY = 'streak';
const ACHIEVEMENTS_KEY = 'achievements';
const XP_KEY = 'xp';
/** Bonus review milestone: a ten-card session earns a freeze. */
export const FREEZE_MILESTONE = 10;

export interface XpState {
  total: number;
}

async function loadStreak(store: ProgressStore): Promise<StreakState> {
  const stored = await store.getMeta<StreakState>(STREAK_KEY);
  return stored ?? emptyStreak();
}

async function saveStreak(store: ProgressStore, streak: StreakState): Promise<void> {
  await store.setMeta(STREAK_KEY, streak);
}

async function awardXp(store: ProgressStore, amount: number): Promise<XpState> {
  const current = (await store.getMeta<XpState>(XP_KEY)) ?? { total: 0 };
  const next = { total: current.total + amount };
  await store.setMeta(XP_KEY, next);
  return next;
}

/** Unlocks fresh achievements; each unlock grants XP. */
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
  await awardXp(store, fresh.length * XP_REWARDS.achievement);
}

async function guard(task: () => Promise<void>): Promise<void> {
  try {
    await task();
  } catch {
    // Gamification state is best-effort; the lesson flow never waits on it.
  }
}

/** A lesson completed: counts toward the streak, grants XP, feeds achievements. */
export function recordLessonComplete(
  store: ProgressStore,
  lessonId: string,
  correct: number,
  total: number,
  now: Date,
): Promise<void> {
  return guard(async () => {
    const perfect = total > 0 && correct === total;
    await store.appendEvent({
      id: crypto.randomUUID(),
      type: 'lesson-complete',
      at: now,
      data: { lessonId, correct, total, perfect },
    });
    const before = await loadStreak(store);
    const streak = registerActivity(before, now);
    await saveStreak(store, streak);
    await awardXp(store, XP_REWARDS.lesson + (perfect ? XP_REWARDS.perfectLessonBonus : 0) + (streak.count !== before.count ? XP_REWARDS.streakDay : 0));
    await checkAchievements(store, now);
  });
}

/** A review session completed: counts toward the streak, grants XP per card, earns freezes. */
export function recordReviewComplete(store: ProgressStore, reviewed: number, now: Date): Promise<void> {
  return guard(async () => {
    await store.appendEvent({
      id: crypto.randomUUID(),
      type: 'review-complete',
      at: now,
      data: { reviewed },
    });
    const before = await loadStreak(store);
    let streak = registerActivity(before, now);
    if (reviewed >= FREEZE_MILESTONE) streak = awardFreeze(streak);
    await saveStreak(store, streak);
    await awardXp(
      store,
      reviewed * XP_REWARDS.reviewCard + (streak.count !== before.count ? XP_REWARDS.streakDay : 0),
    );
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
