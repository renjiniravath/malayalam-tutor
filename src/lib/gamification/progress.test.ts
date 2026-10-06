import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { level1 } from '@/content';
import { XP_REWARDS } from './xp';
import { levelCanDo, soundMastery } from './mastery';
import { recordLessonComplete, recordReviewComplete, type XpState } from './progress';
import { MemoryProgressStore } from '@/lib/progress/store';
import type { ReviewLogRecord } from '@/lib/fsrs/types';

const now = new Date('2026-10-05T09:00:00.000Z');

const log = (itemId: string, rating: ReviewLogRecord['rating'] = 'good'): ReviewLogRecord => ({
  id: `log-${itemId}-${rating}`,
  cardKey: `${itemId}:recognition`,
  itemId,
  skill: 'recognition',
  rating,
  review: now,
  due: now,
  stability: 2,
  difficulty: 5,
  state: 'review',
  scheduledDays: 1,
});

describe('sound mastery and can-do (real logs only)', () => {
  it('a sound is mastered when every tagged item has a passing review', () => {
    const zhItems = level1.lessons
      .flatMap((lesson) => lesson.items)
      .filter((item) => item.tags.includes('sound:zh'));
    assert.equal(zhItems.length, 4);

    const partial = soundMastery(level1, zhItems.slice(0, 2).map((item) => log(item.id)));
    const zh = partial.find((sound) => sound.tag === 'sound:zh')!;
    assert.equal(zh.reviewed, 2);
    assert.equal(zh.mastered, false);

    const complete = soundMastery(level1, zhItems.map((item) => log(item.id)));
    assert.equal(complete.find((sound) => sound.tag === 'sound:zh')!.mastered, true);
  });

  it('an again review never counts toward mastery', () => {
    const zhItems = level1.lessons
      .flatMap((lesson) => lesson.items)
      .filter((item) => item.tags.includes('sound:zh'));
    const mastery = soundMastery(level1, zhItems.map((item) => log(item.id, 'again')));
    assert.equal(mastery.find((sound) => sound.tag === 'sound:zh')!.reviewed, 0);
  });

  it('can-do states derive from real evidence, one statement per level line', () => {
    const fresh = levelCanDo(level1, []);
    assert.equal(fresh.length, level1.canDo.length);
    assert.ok(fresh.every((entry) => !entry.done), 'nothing is done before any reviews');

    const allItems = level1.lessons.flatMap((lesson) => lesson.items);
    const everyItemLogged = levelCanDo(level1, allItems.map((item) => log(item.id)));
    assert.ok(everyItemLogged.every((entry) => entry.done), 'reviewing the whole level completes the checklist');
  });
});

describe('XP accrual from real events (injectable clock)', () => {
  it('a review session grants XP per card, a streak-day bonus, and achievement XP', async () => {
    const store = new MemoryProgressStore();
    // The page persists the per-card logs before the session completes.
    await store.putLogs(['patthu', 'ippo', 'njan'].map((itemId) => log(itemId)));
    await recordReviewComplete(store, 3, now);

    const xp = await store.getMeta<XpState>('xp');
    // 3 cards * 5 + first-activity streak bonus 10 + first-review achievement 25
    assert.equal(xp?.total, 3 * XP_REWARDS.reviewCard + XP_REWARDS.streakDay + XP_REWARDS.achievement);
  });

  it('a second session on the same day grants card XP only, no streak bonus', async () => {
    const store = new MemoryProgressStore();
    await store.putLogs([log('patthu')]);
    await recordReviewComplete(store, 2, now);
    const first = (await store.getMeta<XpState>('xp'))!.total;
    await recordReviewComplete(store, 2, new Date(now.getTime() + 60 * 60 * 1000));
    const second = (await store.getMeta<XpState>('xp'))!.total;
    assert.equal(second - first, 2 * XP_REWARDS.reviewCard);
  });

  it('a perfect lesson grants the base, the perfect bonus, the day bonus, and both achievements', async () => {
    const store = new MemoryProgressStore();
    await recordLessonComplete(store, 'l1u1l1', 3, 3, now);
    const xp = (await store.getMeta<XpState>('xp'))!.total;
    // lesson 20 + perfect bonus 10 + streak-day 10 + first-lesson and perfect-lesson achievements 50
    assert.equal(
      xp,
      XP_REWARDS.lesson + XP_REWARDS.perfectLessonBonus + XP_REWARDS.streakDay + 2 * XP_REWARDS.achievement,
    );
  });

  it('an imperfect lesson grants no perfect bonus', async () => {
    const store = new MemoryProgressStore();
    await recordLessonComplete(store, 'l1u1l1', 2, 3, now);
    const xp = (await store.getMeta<XpState>('xp'))!.total;
    assert.equal(xp, XP_REWARDS.lesson + XP_REWARDS.streakDay + XP_REWARDS.achievement);
  });

  it('XP pushes past rank thresholds as the learner accumulates real events', async () => {
    const store = new MemoryProgressStore();
    await store.putLogs([log('patthu')]);
    // A day's worth of review sessions: 3 cards each, twelve sessions.
    for (let i = 0; i < 12; i++) {
      const t = new Date(now.getTime() + i * 60 * 60 * 1000);
      await recordReviewComplete(store, 3, t);
    }
    const total = (await store.getMeta<XpState>('xp'))!.total;
    // 12 sessions * 15 + streak bonus 10 + first-review achievement 25 = 215
    assert.equal(total, 215);
    assert.ok(total >= 100, 'enough real reviews to reach the second rank');
  });
});
