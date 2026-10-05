/**
 * Streak tests (PLAN.md §8): all behavior runs against an injectable
 * clock — local calendar dates, grace freezes, pause, and resets.
 */

import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  addFreezes,
  currentStreak,
  dayKey,
  EMPTY_STREAK,
  pauseStreak,
  recordActivity,
  resumeStreak,
} from './streaks'

const at = (iso: string) => new Date(iso)

test('the first activity starts a 1-day streak', () => {
  const state = recordActivity(EMPTY_STREAK, at('2026-10-05T09:00:00'))
  assert.equal(state.current, 1)
  assert.equal(state.best, 1)
  assert.equal(state.lastLearningDay, '2026-10-05')
})

test('repeat activity on the same local day does not double-count', () => {
  let state = recordActivity(EMPTY_STREAK, at('2026-10-05T09:00:00'))
  state = recordActivity(state, at('2026-10-05T23:59:00'))
  assert.equal(state.current, 1)
})

test('consecutive days grow the streak across day boundaries', () => {
  let state = recordActivity(EMPTY_STREAK, at('2026-10-05T09:00:00'))
  state = recordActivity(state, at('2026-10-06T08:00:00'))
  state = recordActivity(state, at('2026-10-07T08:00:00'))
  assert.equal(state.current, 3)
  assert.equal(state.best, 3)
})

test('a missed day with a freeze consumes it and keeps the streak', () => {
  let state = recordActivity(EMPTY_STREAK, at('2026-10-05T09:00:00'))
  state = addFreezes(state, 1)
  state = recordActivity(state, at('2026-10-07T09:00:00')) // one day missed
  assert.equal(state.freezes, 0)
  assert.equal(state.current, 2)
  assert.equal(state.best, 2)
})

test('more missed days than freezes resets the streak', () => {
  let state = recordActivity(EMPTY_STREAK, at('2026-10-05T09:00:00'))
  state = recordActivity(state, at('2026-10-06T09:00:00'))
  state = addFreezes(state, 1)
  state = recordActivity(state, at('2026-10-10T09:00:00')) // three days missed, one freeze
  assert.equal(state.freezes, 0)
  assert.equal(state.current, 1)
  assert.equal(state.best, 2)
})

test('a lapse without freezes starts a new count, best is kept', () => {
  let state = recordActivity(EMPTY_STREAK, at('2026-10-05T09:00:00'))
  state = recordActivity(state, at('2026-10-06T09:00:00'))
  state = recordActivity(state, at('2026-10-10T09:00:00'))
  assert.equal(state.current, 1)
  assert.equal(state.best, 2)
})

test('pause preserves the streak across days without touching freezes', () => {
  let state = recordActivity(EMPTY_STREAK, at('2026-10-05T09:00:00'))
  state = recordActivity(state, at('2026-10-06T09:00:00'))
  state = addFreezes(state, 2)
  state = pauseStreak(state, at('2026-10-07T09:00:00'))
  state = recordActivity(state, at('2026-10-12T09:00:00')) // activity while paused is ignored
  assert.equal(state.current, 2)
  assert.equal(state.freezes, 2)
  state = resumeStreak(state, at('2026-10-13T09:00:00'))
  state = recordActivity(state, at('2026-10-14T09:00:00'))
  assert.equal(state.current, 3)
  assert.equal(state.freezes, 2)
})

test('currentStreak reads the display value without mutating', () => {
  let state = recordActivity(EMPTY_STREAK, at('2026-10-05T09:00:00'))
  assert.equal(currentStreak(state, at('2026-10-05T12:00:00')), 1)
  assert.equal(currentStreak(state, at('2026-10-06T12:00:00')), 1)
  assert.equal(currentStreak(state, at('2026-10-09T12:00:00')), 0)
  state = addFreezes(state, 1)
  assert.equal(currentStreak(state, at('2026-10-09T12:00:00')), 1, 'a freeze covers the lapse')
  state = pauseStreak(state, at('2026-10-06T12:00:00'))
  assert.equal(currentStreak(state, at('2026-10-20T12:00:00')), 1, 'pause preserves the display')
})

test('dayKey uses the local calendar', () => {
  assert.equal(dayKey(at('2026-10-05T23:59:59')), '2026-10-05')
  assert.equal(dayKey(at('2026-10-06T00:00:01')), '2026-10-06')
})
