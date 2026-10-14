import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  MAX_FREEZES,
  awardFreeze,
  daysBetween,
  emptyStreak,
  localDay,
  pauseStreak,
  registerActivity,
} from './streak';

// Fixed local-clock moments (device-local calendar days).
const day = (d: number, hour = 12): Date => new Date(2026, 0, d, hour);
const frozenStreak = (count: number, lastDay: string, freezes = 0) => ({ count, lastDay, freezes });

describe('streak (injectable clock)', () => {
  it('localDay is the device-local calendar day', () => {
    assert.equal(localDay(day(5, 23)), '2026-01-05');
    assert.equal(localDay(day(6, 0)), '2026-01-06');
    assert.equal(daysBetween('2026-01-05', '2026-01-06'), 1);
    assert.equal(daysBetween('2026-01-05', '2026-01-08'), 3);
  });

  it('first activity starts the streak at one', () => {
    const state = registerActivity(emptyStreak(), day(5));
    assert.equal(state.count, 1);
    assert.equal(state.lastDay, '2026-01-05');
  });

  it('repeated activity on the same day does not double count', () => {
    const once = registerActivity(emptyStreak(), day(5));
    const twice = registerActivity(once, day(5, 20));
    assert.deepEqual(twice, once);
  });

  it('consecutive days increment', () => {
    let state = registerActivity(emptyStreak(), day(5));
    state = registerActivity(state, day(6));
    assert.equal(state.count, 2);
    assert.equal(state.lastDay, '2026-01-06');
  });

  it('one missed day consumes a freeze and keeps the streak', () => {
    const state = registerActivity(frozenStreak(3, '2026-01-05', 1), day(7));
    assert.equal(state.count, 4);
    assert.equal(state.freezes, 0);
  });

  it('a missed day without freezes restarts quietly at one', () => {
    const state = registerActivity(frozenStreak(5, '2026-01-05'), day(7));
    assert.equal(state.count, 1);
    assert.equal(state.lastDay, '2026-01-07');
  });

  it('a longer gap consumes one freeze per missed day', () => {
    const state = registerActivity(frozenStreak(3, '2026-01-05', 2), day(8));
    assert.equal(state.count, 4);
    assert.equal(state.freezes, 0);
  });

  it('freezes are capped', () => {
    let state = emptyStreak();
    for (let i = 0; i < 10; i++) state = awardFreeze(state);
    assert.equal(state.freezes, MAX_FREEZES);
  });

  it('pause preserves the streak: days during the pause neither count nor break it', () => {
    let state = registerActivity(frozenStreak(4, '2026-01-05', 1), day(6));
    state = pauseStreak(state, day(6), 7); // paused through the 13th
    assert.equal(state.pausedUntil, '2026-01-13');

    // Activity while paused is a no-op.
    const during = registerActivity(state, day(9));
    assert.deepEqual(during, state);

    // Activity after the pause continues the chain, no freeze consumed.
    const after = registerActivity(state, day(14));
    assert.equal(after.count, 6);
    assert.equal(after.freezes, 1);
    assert.equal(after.pausedUntil, undefined);
  });

  it('activity on the last paused day resumes the chain too', () => {
    let state = registerActivity(frozenStreak(2, '2026-01-05'), day(6));
    state = pauseStreak(state, day(6), 4); // paused through the 10th
    const after = registerActivity(state, day(10));
    assert.equal(after.count, 4);
    assert.equal(after.pausedUntil, undefined);
  });
});
