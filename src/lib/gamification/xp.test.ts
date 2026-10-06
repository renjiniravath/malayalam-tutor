import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { RANKS, XP_REWARDS, nextRank, rankForXp } from './xp';

describe('XP ranks and thresholds', () => {
  it('thresholds ramp so early levels come fast', () => {
    const gaps = RANKS.slice(1).map((rank, i) => rank.minXp - RANKS[i].minXp);
    assert.ok(gaps.every((gap, i) => i === 0 || gap >= gaps[i - 1]), 'each step costs at least the last');
    assert.ok(gaps[0] < gaps[gaps.length - 1], 'later levels cost more than the first');
  });

  it('rankForXp picks the highest rank the total meets, at exact boundaries', () => {
    assert.equal(rankForXp(0).title, 'Listener');
    assert.equal(rankForXp(99).title, 'Listener');
    assert.equal(rankForXp(100).title, 'Curious');
    assert.equal(rankForXp(249).title, 'Curious');
    assert.equal(rankForXp(250).title, 'Learner');
    assert.equal(rankForXp(4999).title, 'Local');
    assert.equal(rankForXp(5000).title, 'Malayalee');
    assert.equal(rankForXp(99_999).title, 'Malayalee');
  });

  it('nextRank reports the rank above the total, or nothing at the top', () => {
    assert.equal(nextRank(0)?.title, 'Curious');
    assert.equal(nextRank(5000), undefined);
  });

  it('rewards are defined for every real event source', () => {
    assert.ok(XP_REWARDS.reviewCard > 0);
    assert.ok(XP_REWARDS.lesson > 0);
    assert.ok(XP_REWARDS.perfectLessonBonus > 0);
    assert.ok(XP_REWARDS.streakDay > 0);
    assert.ok(XP_REWARDS.achievement > 0);
  });
});
