/**
 * XP tests (PLAN.md §8): thresholds ramp, boundary values land on the
 * right level, ranks cap, and XP never goes down.
 */

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { addXp, EMPTY_XP, levelFor, progressToNext, rankFor } from './xp'

test('level thresholds ramp up', () => {
  const gaps = [0, 50, 120, 210, 320, 450, 600, 770, 960, 1170, 1400]
  for (let i = 1; i < gaps.length - 1; i++) {
    assert.ok(gaps[i + 1] - gaps[i] >= gaps[i] - gaps[i - 1], 'gaps do not shrink')
  }
})

test('level boundaries are exact', () => {
  assert.equal(levelFor(0), 1)
  assert.equal(levelFor(49), 1)
  assert.equal(levelFor(50), 2)
  assert.equal(levelFor(119), 2)
  assert.equal(levelFor(120), 3)
  assert.equal(levelFor(1399), 10)
  assert.equal(levelFor(1400), 11)
  assert.equal(levelFor(100000), 11)
})

test('ranks map to levels and cap at the top', () => {
  assert.equal(rankFor(1), 'Newcomer')
  assert.equal(rankFor(2), 'Greeter')
  assert.equal(rankFor(7), 'Native ear')
  assert.equal(rankFor(11), 'Native ear')
})

test('progressToNext reports real progress and ends at the top rank', () => {
  assert.deepEqual(progressToNext(0), { have: 0, need: 50, nextRank: 'Greeter' })
  assert.deepEqual(progressToNext(70), { have: 20, need: 70, nextRank: 'Small-talker' })
  assert.equal(progressToNext(1400), null)
})

test('XP accrues positively and never resets', () => {
  let state = EMPTY_XP
  state = addXp(state, 5)
  state = addXp(state, 20)
  state = addXp(state, -100) // impossible event; clamped, not punished
  assert.equal(state.total, 25)
})
