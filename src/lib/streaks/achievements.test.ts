/**
 * Achievement tests (PLAN.md §8): earned from real events only, never
 * twice, and thresholds are exact.
 */

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { newlyEarned } from './achievements'

test('no events earn nothing', () => {
  assert.deepEqual(newlyEarned({ reviewCount: 0, perfectLessons: 0, streak: 0 }, []), [])
})

test('the first review earns firstReview exactly once', () => {
  const events = { reviewCount: 1, perfectLessons: 0, streak: 0 }
  assert.deepEqual(newlyEarned(events, []), ['firstReview'])
  assert.deepEqual(newlyEarned({ ...events, reviewCount: 9 }, ['firstReview']), [])
})

test('a perfect lesson earns perfectLesson', () => {
  assert.deepEqual(newlyEarned({ reviewCount: 1, perfectLessons: 1, streak: 0 }, ['firstReview']), [
    'perfectLesson',
  ])
})

test('a seven-day streak earns sevenDayStreak', () => {
  assert.deepEqual(newlyEarned({ reviewCount: 0, perfectLessons: 0, streak: 7 }, []), [
    'sevenDayStreak',
  ])
  assert.deepEqual(newlyEarned({ reviewCount: 0, perfectLessons: 0, streak: 6 }, []), [])
})

test('all three can land in one call and never re-earn', () => {
  const events = { reviewCount: 1, perfectLessons: 1, streak: 7 }
  const earned = newlyEarned(events, [])
  assert.deepEqual(earned, ['firstReview', 'perfectLesson', 'sevenDayStreak'])
  assert.deepEqual(newlyEarned(events, earned), [])
})
