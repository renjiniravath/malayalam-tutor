/**
 * Drill-to-card mapping tests: which {itemId, skill} cards each drill
 * grades, and which drills are logged but never scheduled.
 */

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { drillTargets } from './targets'

const pair = (pairId: string): [string, string] | null =>
  pairId === 'pair-a-b' ? ['a', 'b'] : null

const kindOf = (id: string) => (id.startsWith('sentence') ? 'sentence' : 'word')

test('multiple choice grades the recognition card', () => {
  assert.deepEqual(
    drillTargets({ kind: 'multipleChoice', itemId: 'mazha', distractors: [] }, pair, kindOf),
    [{ itemId: 'mazha', skill: 'recognition' }],
  )
})

test('typing grades the production card, or sentence cards for sentence items', () => {
  assert.deepEqual(drillTargets({ kind: 'typing', itemId: 'seri' }, pair, kindOf), [
    { itemId: 'seri', skill: 'production' },
  ])
  assert.deepEqual(drillTargets({ kind: 'typing', itemId: 'sentence-1' }, pair, kindOf), [
    { itemId: 'sentence-1', skill: 'sentence' },
  ])
})

test('the sentence builder grades the sentence card', () => {
  assert.deepEqual(
    drillTargets({ kind: 'sentenceBuilder', sentenceId: 'sentence-1', bank: ['a'] }, pair, kindOf),
    [{ itemId: 'sentence-1', skill: 'sentence' }],
  )
})

test('a minimal pair grades the recognition cards of both items', () => {
  assert.deepEqual(drillTargets({ kind: 'minimalPair', pairId: 'pair-a-b' }, pair, kindOf), [
    { itemId: 'a', skill: 'recognition' },
    { itemId: 'b', skill: 'recognition' },
  ])
})

test('unknown pairs and self-assessed drills schedule nothing', () => {
  assert.deepEqual(drillTargets({ kind: 'minimalPair', pairId: 'missing' }, pair, kindOf), [])
  assert.deepEqual(drillTargets({ kind: 'anticipation', itemId: 'x', tier: 'slow' }, pair, kindOf), [])
  assert.deepEqual(drillTargets({ kind: 'speakAndCompare', itemId: 'x' }, pair, kindOf), [])
})
