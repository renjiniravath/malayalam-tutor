/**
 * Dashboard data tests (PLAN.md §7): can-do rows follow completed
 * lessons, review days follow the injectable clock, and recall comes
 * from real log grades only.
 */

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { LEVELS } from '@/content/levels'
import { canDoRows, recentRecall, reviewsByDay } from './dashboard'

const LEVEL = LEVELS[0]

test('can-do statements open until their units are completed', () => {
  const rows = canDoRows(LEVEL, new Set())
  assert.equal(rows.length, LEVEL.canDo.length)
  assert.ok(rows.every((row) => row.done === false))
})

test('completing unit 1 lessons marks the first can-do done', () => {
  const unit1LessonIds = LEVEL.lessons.filter((l) => l.unitId === 'unit1').map((l) => l.id)
  const rows = canDoRows(LEVEL, new Set(unit1LessonIds))
  assert.equal(rows[0].done, true)
  assert.equal(rows[1].done, false, 'greetings still needs unit 2')
})

test('a statement depending on missing units stays open', () => {
  const allLessons = LEVEL.lessons.map((l) => l.id)
  const rows = canDoRows(LEVEL, new Set(allLessons))
  assert.equal(rows[2].done, false, 'nouns and verbs arrive in units 4 and 5')
  assert.equal(rows[3].done, true)
})

test('reviewsByDay buckets local days against the injected clock', () => {
  const now = new Date(2026, 9, 5, 12, 0, 0) // local noon, Oct 5
  const logs = [
    { reviewedAt: new Date(2026, 9, 5, 8, 0, 0).getTime() },
    { reviewedAt: new Date(2026, 9, 5, 9, 0, 0).getTime() },
    { reviewedAt: new Date(2026, 9, 4, 23, 30, 0).getTime() },
  ]
  const rows = reviewsByDay(logs, 3, now)
  assert.deepEqual(rows, [
    { day: '2026-10-05', count: 2 },
    { day: '2026-10-04', count: 1 },
    { day: '2026-10-03', count: 0 },
  ])
})

test('recentRecall counts Good and Easy grades over the last logs', () => {
  const logs = [
    { log: { rating: 3 } },
    { log: { rating: 1 } },
    { log: { rating: 4 } },
    { log: { rating: 2 } },
    { log: { rating: 3 } },
  ] as { log: { rating: number } }[]
  const recall = recentRecall(logs, 4)
  assert.ok(recall)
  assert.equal(recall.correct, 2) // ratings 4 and 3 in the last 4
  assert.equal(recall.total, 4)
  assert.equal(recall.rate, 50)
})

test('recentRecall is null without reviews', () => {
  assert.equal(recentRecall([]), null)
})
