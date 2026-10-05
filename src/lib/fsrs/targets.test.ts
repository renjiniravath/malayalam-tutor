/**
 * Drill-to-card mapping tests: which {itemId, skill} cards each drill
 * grades, and which drills are logged but never scheduled.
 */

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { drillTargets } from './targets'

const pair = (pairId: string): [string, string] | null =>
  pairId === 'pair-a-b' ? ['a', 'b'] : null

test('multiple choice grades the recognition card', () => {
  assert.deepEqual(drillTargets({ kind: 'multipleChoice', itemId: 'mazha', distractors: [] }, pair), [
    { itemId: 'mazha', skill: 'recognition' },
  ])
})

test('typing grades the production card', () => {
  assert.deepEqual(drillTargets({ kind: 'typing', itemId: 'seri' }, pair), [
    { itemId: 'seri', skill: 'production' },
  ])
})

test('a minimal pair grades the recognition cards of both items', () => {
  assert.deepEqual(drillTargets({ kind: 'minimalPair', pairId: 'pair-a-b' }, pair), [
    { itemId: 'a', skill: 'recognition' },
    { itemId: 'b', skill: 'recognition' },
  ])
})

test('unknown pairs and self-assessed drills schedule nothing', () => {
  assert.deepEqual(drillTargets({ kind: 'minimalPair', pairId: 'missing' }, pair), [])
  assert.deepEqual(drillTargets({ kind: 'anticipation', itemId: 'x', tier: 'slow' }, pair), [])
  assert.deepEqual(drillTargets({ kind: 'speakAndCompare', itemId: 'x' }, pair), [])
})
