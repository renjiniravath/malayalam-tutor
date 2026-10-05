/**
 * Backup tests: export produces a valid payload and import restores it
 * (round-trip), validates malformed input, and reconciles removed items
 * via contentRevision before writing.
 */

import 'fake-indexeddb/auto'
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { newCard, review } from '../fsrs/scheduler'
import { EMPTY_STREAK, addFreezes, recordActivity } from '../streaks/streaks'
import { createStore } from './db'
import { exportProgress, importProgress } from './backup'

const T0 = new Date('2026-10-05T09:00:00Z')

let counter = 0
const freshStore = () => createStore(`backup-test-${counter++}`)

test('export and import round-trip cards, logs, streak, and achievements', async () => {
  const source = freshStore()
  const card = newCard('mazha', 'recognition', T0)
  const { card: next, log } = review(card, 'good', T0)
  await source.putCard({
    key: 'mazha:recognition',
    itemId: 'mazha',
    skill: 'recognition',
    card: next.card,
    dueAt: next.card.due.getTime(),
    updatedAt: T0.getTime(),
  })
  await source.appendLog({
    cardKey: 'mazha:recognition',
    itemId: 'mazha',
    skill: 'recognition',
    reviewedAt: T0.getTime(),
    log,
  })
  const streak = addFreezes(recordActivity(EMPTY_STREAK, T0), 1)
  await source.putStreak(streak)
  await source.putAchievement({ id: 'firstReview', earnedAt: T0.getTime() })

  const payload = await exportProgress(source)
  const raw = JSON.stringify(payload)

  const target = freshStore()
  const result = await importProgress(target, raw)
  assert.equal(result.ok, true)
  if (!result.ok) return
  assert.equal(result.summary.restoredCards, 1)
  assert.equal(result.summary.skippedCards, 0)
  assert.equal(result.summary.restoredLogs, 1)

  const restored = await target.getCard('mazha:recognition')
  assert.ok(restored)
  assert.ok(restored.card.due instanceof Date, 'due came back as a Date, not a JSON string')
  assert.equal(restored.card.stability, next.card.stability)
  assert.deepEqual(await target.getStreak(), streak)
  const achievements = await target.listAchievements()
  assert.deepEqual(achievements.map((a) => a.id), ['firstReview'])
})

test('import reconciles removed items and skips their cards and logs', async () => {
  const source = freshStore()
  const card = newCard('gone-item', 'recognition', T0)
  await source.putCard({
    key: 'gone-item:recognition',
    itemId: 'gone-item',
    skill: 'recognition',
    card: card.card,
    dueAt: card.card.due.getTime(),
    updatedAt: T0.getTime(),
  })
  const payload = await exportProgress(source)

  const target = freshStore()
  const result = await importProgress(target, JSON.stringify(payload))
  assert.equal(result.ok, true)
  if (!result.ok) return
  assert.equal(result.summary.restoredCards, 0)
  assert.equal(result.summary.skippedCards, 1)
  assert.equal(await target.getCard('gone-item:recognition'), undefined)
})

test('malformed payloads are rejected with a reason', async () => {
  const target = freshStore()
  assert.equal((await importProgress(target, 'not json')).ok, false)
  assert.equal((await importProgress(target, '{"format":"other"}')).ok, false)
  const wrongVersion = JSON.stringify({
    format: 'learn-malayalam-backup',
    version: 99,
    contentRevision: 1,
    cards: [],
    reviewLogs: [],
    streak: EMPTY_STREAK,
    achievements: [],
  })
  const result = await importProgress(target, wrongVersion)
  assert.equal(result.ok, false)
  if (!result.ok) assert.match(result.reason, /version/i)
})

test('import replaces existing data', async () => {
  const target = freshStore()
  const stale = newCard('stale', 'recognition', T0)
  await target.putCard({
    key: 'stale:recognition',
    itemId: 'stale',
    skill: 'recognition',
    card: stale.card,
    dueAt: stale.card.due.getTime(),
    updatedAt: T0.getTime(),
  })

  const payload = {
    format: 'learn-malayalam-backup',
    version: 1,
    contentRevision: 1,
    exportedAt: T0.getTime(),
    cards: [],
    reviewLogs: [],
    streak: EMPTY_STREAK,
    achievements: [],
  }
  const result = await importProgress(target, JSON.stringify(payload))
  assert.equal(result.ok, true)
  assert.equal(await target.getCard('stale:recognition'), undefined)
})
