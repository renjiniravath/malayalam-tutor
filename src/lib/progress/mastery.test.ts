/**
 * Mastery tests (PLAN.md §7): a sound is mastered when every drilled
 * word tagged with it holds 3-week stability on its recognition card.
 */

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { newCard, review } from '../fsrs/scheduler'
import type { CardRecord } from '../store/db'
import { computeSoundMastery, MASTERY_STABILITY } from './mastery'

const T0 = new Date('2026-10-05T09:00:00Z')

function recognitionCard(itemId: string, stability: number): CardRecord {
  const card = newCard(itemId, 'recognition', T0)
  card.card.stability = stability
  return {
    key: `${itemId}:recognition`,
    itemId,
    skill: 'recognition',
    card: card.card,
    dueAt: T0.getTime(),
    updatedAt: T0.getTime(),
  }
}

const items: Pick<import('@/content/types').Item, 'id' | 'kind' | 'tags'>[] = [
  { id: 'mazha', kind: 'word', tags: ['sound:zh', 'level:1'] },
  { id: 'vazhi', kind: 'word', tags: ['sound:zh', 'level:1'] },
  { id: 'zha', kind: 'sound', tags: ['sound:zh', 'level:1'] },
]

test('a sound is mastered only when every word is retained', () => {
  const cards = [recognitionCard('mazha', MASTERY_STABILITY), recognitionCard('vazhi', 3)]
  const mastery = computeSoundMastery([...items], cards)
  const zh = mastery.find((m) => m.tag === 'sound:zh')
  assert.ok(zh)
  assert.equal(zh.retained, 1)
  assert.equal(zh.total, 2, 'sound items do not count toward mastery')
  assert.equal(zh.mastered, false)
})

test('all words retained means mastered', () => {
  const cards = [recognitionCard('mazha', 30), recognitionCard('vazhi', 30)]
  const zh = computeSoundMastery([...items], cards).find((m) => m.tag === 'sound:zh')
  assert.ok(zh)
  assert.equal(zh.mastered, true)
})

test('an undrilled word blocks mastery honestly', () => {
  const cards = [recognitionCard('mazha', 30)]
  const zh = computeSoundMastery([...items], cards).find((m) => m.tag === 'sound:zh')
  assert.ok(zh)
  assert.equal(zh.mastered, false)
})

test('every sound class is reported, with labels', () => {
  const mastery = computeSoundMastery([...items], [])
  assert.deepEqual(
    mastery.map((m) => m.tag),
    ['sound:zh', 'sound:coronal', 'sound:geminate', 'sound:vowelLength'],
  )
  assert.ok(mastery.every((m) => m.label.length > 0 && m.retained === 0 && m.mastered === false))
})

test('stability at exactly the threshold counts as retained', () => {
  const cards = [recognitionCard('mazha', MASTERY_STABILITY)]
  const zh = computeSoundMastery([...items], cards).find((m) => m.tag === 'sound:zh')
  assert.ok(zh)
  assert.equal(zh.retained, 1)
})

test('reviewing with ts-fsrs produces the stability mastery reads', () => {
  let card = newCard('mazha', 'recognition', T0)
  for (let i = 0; i < 5; i++) {
    card = review(card, 'good', card.card.due).card
  }
  assert.ok(card.card.stability > 1, 'real reviews grow stability')
})
