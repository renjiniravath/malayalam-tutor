import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { level1 } from '@/content';
import { newCardRecord } from '@/lib/fsrs/scheduler';
import type { ReviewLogRecord } from '@/lib/fsrs/types';
import type { ProgressEvent } from '@/lib/progress/store';
import { emptyStreak } from './streak';
import { evaluateAchievements, type AchievementInput } from './achievements';

const now = new Date('2026-10-05T09:00:00.000Z');

const event = (type: ProgressEvent['type'], data: Record<string, unknown>): ProgressEvent => ({
  id: `${type}-${data.lessonId ?? 'x'}-${Math.random().toString(36).slice(2, 8)}`,
  type,
  at: now,
  data,
});

const logFor = (itemId: string): ReviewLogRecord => ({
  id: `log-${itemId}`,
  cardKey: `${itemId}:recognition`,
  itemId,
  skill: 'recognition',
  rating: 'good',
  review: now,
  due: now,
  stability: 2,
  difficulty: 5,
  state: 'review',
  scheduledDays: 1,
});

function input(partial: Partial<AchievementInput>): AchievementInput {
  return { cards: [], logs: [], events: [], streak: emptyStreak(), now, ...partial };
}

describe('achievements (wired to real events)', () => {
  it('unlocks first-lesson on the first lesson-complete event', () => {
    const unlocked = evaluateAchievements(input({ events: [event('lesson-complete', { lessonId: 'l1u1l1' })] }), new Set());
    assert.deepEqual(unlocked.map((u) => u.id), ['first-lesson']);
    assert.ok(unlocked[0].unlockedAt instanceof Date);
  });

  it('unlocks perfect-lesson only when every answer was correct', () => {
    const imperfect = evaluateAchievements(
      input({ events: [event('lesson-complete', { lessonId: 'l1u1l1', perfect: false })] }),
      new Set(),
    );
    assert.ok(!imperfect.some((u) => u.id === 'perfect-lesson'));

    const perfect = evaluateAchievements(
      input({ events: [event('lesson-complete', { lessonId: 'l1u1l1', perfect: true })] }),
      new Set(),
    );
    assert.ok(perfect.some((u) => u.id === 'perfect-lesson'));
  });

  it('unlocks first-review from the first review log', () => {
    const none = evaluateAchievements(input({}), new Set());
    assert.ok(!none.some((u) => u.id === 'first-review'));
    const one = evaluateAchievements(input({ logs: [logFor('mazha')] }), new Set());
    assert.ok(one.some((u) => u.id === 'first-review'));
  });

  it('unlocks first-100-words when 100 cards are scheduled', () => {
    const cards = Array.from({ length: 100 }, (_, i) => newCardRecord(`item-${i}`, 'recognition', now));
    const unlocked = evaluateAchievements(input({ cards }), new Set());
    assert.ok(unlocked.some((u) => u.id === 'first-100-words'));
  });

  it('unlocks zh-master only after reviewing every zh item', () => {
    const zhIds = level1.lessons
      .flatMap((lesson) => lesson.items)
      .filter((item) => item.tags.includes('sound:zh'))
      .map((item) => item.id);
    assert.equal(zhIds.length, 4);

    const partial = evaluateAchievements(input({ logs: zhIds.slice(0, 2).map(logFor) }), new Set());
    assert.ok(!partial.some((u) => u.id === 'zh-master'));

    const complete = evaluateAchievements(input({ logs: zhIds.map(logFor) }), new Set());
    assert.ok(complete.some((u) => u.id === 'zh-master'));
  });

  it('unlocks streak-7 at seven active days', () => {
    const six = evaluateAchievements(input({ streak: { count: 6, lastDay: '2026-10-05', freezes: 0 } }), new Set());
    assert.ok(!six.some((u) => u.id === 'streak-7'));
    const seven = evaluateAchievements(input({ streak: { count: 7, lastDay: '2026-10-05', freezes: 0 } }), new Set());
    assert.ok(seven.some((u) => u.id === 'streak-7'));
  });

  it('never reports an achievement twice', () => {
    const state = input({ events: [event('lesson-complete', { lessonId: 'l1u1l1' })] });
    const first = evaluateAchievements(state, new Set());
    const second = evaluateAchievements(state, new Set(first.map((u) => u.id)));
    assert.deepEqual(second, []);
  });
});
