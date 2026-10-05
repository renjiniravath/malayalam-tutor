/**
 * Review injection tests (PLAN.md §7): due cards are interleaved after
 * the hear steps, capped by the lesson's reviewSlots. Current lessons
 * ship reviewSlots 0, so the mechanism stays dormant until later units.
 */

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { lesson1Zh } from '@/content/level1/unit1/lesson1-zh'
import { buildSteps } from './steps'

test('due cards are interleaved after the hear steps, capped by reviewSlots', () => {
  const lesson = { ...lesson1Zh, reviewSlots: 2 }
  const steps = buildSteps(lesson, [
    { key: 'a:recognition' },
    { key: 'b:production' },
    { key: 'c:recognition' },
  ])
  const reviewSteps = steps.filter((s) => s.kind === 'review')
  assert.equal(reviewSteps.length, 2)

  const kinds = steps.map((s) => s.kind)
  const lastHear = kinds.lastIndexOf('hear')
  const firstDrill = kinds.indexOf('drill')
  assert.ok(reviewSteps.every((s) => {
    const i = steps.indexOf(s)
    return i > lastHear && i < firstDrill
  }))
})

test('zero reviewSlots injects nothing', () => {
  const steps = buildSteps(lesson1Zh, [{ key: 'a:recognition' }])
  assert.equal(steps.filter((s) => s.kind === 'review').length, 0)
})

test('the default flow without due cards is unchanged', () => {
  const steps = buildSteps(lesson1Zh)
  assert.deepEqual(
    steps.map((s) => s.kind),
    [
      ...lesson1Zh.items.map(() => 'hear'),
      ...lesson1Zh.drills.map(() => 'drill'),
    ],
  )
})
