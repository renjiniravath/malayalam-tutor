/**
 * Reconciliation mapping tests (PLAN.md §11). Synthetic fixtures prove the
 * mapping logic; the final test runs against the real content bundle.
 */

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { LEVELS } from '@/content/levels'
import { CONTENT_REVISION } from '@/content/revision'
import { reconcileProgress, type ArchivedCard, type CardProgress } from './reconcile'

const ALL_ITEMS = LEVELS.flatMap((level) => level.lessons).flatMap((lesson) => lesson.items)

function card(itemId: string, skill: string, revision: number): CardProgress {
  return { itemId, skill, revision }
}

function archived(
  itemId: string,
  skill: string,
  revision: number,
  archivedAtRevision: number,
): ArchivedCard {
  return { itemId, skill, revision, archivedAtRevision }
}

test('keeps cards whose items still exist, restamped to the current revision', () => {
  const result = reconcileProgress(
    [card('seri', 'recognition', 1), card('njan', 'production', 1)],
    [],
    [{ id: 'seri' }, { id: 'njan' }],
    2,
  )
  assert.deepEqual(result.active, [
    { itemId: 'seri', skill: 'recognition', revision: 2 },
    { itemId: 'njan', skill: 'production', revision: 2 },
  ])
  assert.deepEqual(result.archived, [])
})

test('archives cards whose items were removed', () => {
  const result = reconcileProgress(
    [card('ayyo', 'recognition', 1), card('removed-item', 'recognition', 1)],
    [],
    [{ id: 'ayyo' }],
    3,
  )
  assert.deepEqual(result.active, [{ itemId: 'ayyo', skill: 'recognition', revision: 3 }])
  assert.deepEqual(result.archived, [
    { itemId: 'removed-item', skill: 'recognition', revision: 1, archivedAtRevision: 3 },
  ])
})

test('archives per skill: the same itemId is judged once, skills ride along', () => {
  const result = reconcileProgress(
    [card('njan', 'recognition', 1), card('njan', 'production', 1), card('gone', 'recognition', 1)],
    [],
    [{ id: 'njan' }],
    2,
  )
  assert.equal(result.active.length, 2)
  assert.ok(result.active.every((c) => c.itemId === 'njan'))
  assert.deepEqual(result.archived.map((c) => c.itemId), ['gone'])
})

test('re-keys archived cards when their item is re-added', () => {
  const result = reconcileProgress(
    [],
    [archived('pinnalla', 'recognition', 1, 2)],
    [{ id: 'pinnalla' }],
    3,
  )
  assert.deepEqual(result.active, [
    { itemId: 'pinnalla', skill: 'recognition', revision: 3, reKeyed: true },
  ])
  assert.deepEqual(result.archived, [])
})

test('leaves archived cards for still-absent items untouched', () => {
  const result = reconcileProgress(
    [],
    [archived('old-word', 'recognition', 1, 2)],
    [{ id: 'seri' }],
    3,
  )
  assert.deepEqual(result.active, [])
  assert.deepEqual(result.archived, [
    { itemId: 'old-word', skill: 'recognition', revision: 1, archivedAtRevision: 2 },
  ])
})

test('handles empty inputs', () => {
  const result = reconcileProgress([], [], [], 2)
  assert.deepEqual(result, { active: [], archived: [] })
})

test('reconciles against the real content bundle', () => {
  const realIds = ALL_ITEMS.map((item) => item.id)
  assert.ok(realIds.includes('engane-und'))
  assert.ok(realIds.includes('njan'))
  assert.ok(realIds.includes('kaalam'))
  const result = reconcileProgress(
    [card('engane-und', 'recognition', 1), card('removed-item', 'recognition', 1)],
    [archived('ayyo', 'recognition', 1, 2)],
    ALL_ITEMS,
    CONTENT_REVISION,
  )
  assert.deepEqual(result.active, [
    { itemId: 'engane-und', skill: 'recognition', revision: CONTENT_REVISION },
    { itemId: 'ayyo', skill: 'recognition', revision: CONTENT_REVISION, reKeyed: true },
  ])
  assert.deepEqual(result.archived, [
    {
      itemId: 'removed-item',
      skill: 'recognition',
      revision: 1,
      archivedAtRevision: CONTENT_REVISION,
    },
  ])
})
