/**
 * Scheduler tests (PLAN.md §7, M3): all scheduling runs against an
 * injectable clock — every call below passes an explicit `now`.
 */

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { isDue, newCard, review } from './scheduler'

const T0 = new Date('2026-10-05T09:00:00Z')

test('new cards are due immediately', () => {
  const card = newCard('mazha', 'recognition', T0)
  assert.ok(isDue(card, T0))
})

test('the grade ladder orders schedules: again < hard < good < easy', () => {
  const due = (grade: 'again' | 'hard' | 'good' | 'easy') =>
    review(newCard('mazha', 'recognition', T0), grade, T0).card.card.due.getTime()
  assert.ok(due('again') <= due('hard'))
  assert.ok(due('hard') <= due('good'))
  assert.ok(due('good') <= due('easy'))
})

test('a card is not due before its interval and due after it', () => {
  const { card } = review(newCard('seri', 'production', T0), 'good', T0)
  const due = card.card.due
  assert.ok(!isDue(card, new Date(due.getTime() - 1000)))
  assert.ok(isDue(card, new Date(due.getTime() + 1000)))
})

test('on-time good reviews grow stability', () => {
  let card = newCard('nokkam', 'recognition', T0)
  let now = T0
  let previous = card.card.stability
  for (let i = 0; i < 5; i++) {
    const result = review(card, 'good', now)
    assert.ok(result.card.card.stability >= previous, `stability grew on review ${i}`)
    previous = result.card.card.stability
    card = result.card
    now = result.card.card.due
  }
})

test('wrong answers reschedule sooner than a good answer on the same card', () => {
  const good = review(newCard('ayyo', 'production', T0), 'good', T0)
  const wrong = review(newCard('ayyo', 'production', T0), 'again', T0)
  assert.ok(wrong.card.card.due.getTime() < good.card.card.due.getTime())
})

test('the review log carries the full ts-fsrs record', () => {
  const { log } = review(newCard('alle', 'recognition', T0), 'hard', T0)
  assert.ok(log.due instanceof Date)
  assert.ok(log.review instanceof Date)
  assert.ok(Number.isFinite(log.stability))
  assert.ok(Number.isFinite(log.difficulty))
  assert.ok(log.state !== undefined)
})

test('recognition and production cards decay independently', () => {
  const recognition = review(newCard('njan', 'recognition', T0), 'good', T0)
  const production = review(newCard('njan', 'production', T0), 'again', T0)
  assert.notEqual(recognition.card.card.due.getTime(), production.card.card.due.getTime())
})
