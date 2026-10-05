/**
 * Store tests (M3): IndexedDB backed by fake-indexeddb in Node. Logs
 * and cards must survive a "reload" — a fresh store instance over the
 * same backing database.
 */

import 'fake-indexeddb/auto'
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { newCard, review } from '../fsrs/scheduler'
import { cardKey, createStore } from './db'

const T0 = new Date('2026-10-05T09:00:00Z')
const DAY = 86400000

/** Each test gets its own backing database (fake-indexeddb is shared per process). */
let dbCounter = 0
const freshDbName = () => `learn-malayalam-test-${dbCounter++}`

test('cards round-trip across store instances (reload)', async () => {
  const name = freshDbName()
  const key = cardKey('mazha', 'recognition')
  const card = newCard('mazha', 'recognition', T0)

  const first = createStore(name)
  await first.putCard({
    key,
    itemId: 'mazha',
    skill: 'recognition',
    card: card.card,
    dueAt: card.card.due.getTime(),
    updatedAt: T0.getTime(),
  })

  const second = createStore(name)
  const got = await second.getCard(key)
  assert.ok(got)
  assert.equal(got.key, key)
  assert.equal(got.dueAt, card.card.due.getTime())
})

test('review logs persist across reload', async () => {
  const name = freshDbName()
  const key = cardKey('seri', 'production')
  const card = newCard('seri', 'production', T0)
  const { card: next, log } = review(card, 'good', T0)

  const first = createStore(name)
  await first.putCard({
    key,
    itemId: 'seri',
    skill: 'production',
    card: next.card,
    dueAt: next.card.due.getTime(),
    updatedAt: T0.getTime(),
  })
  await first.appendLog({ cardKey: key, itemId: 'seri', skill: 'production', reviewedAt: T0.getTime(), log })

  const second = createStore(name)
  const due = await second.listDue(new Date(T0.getTime() + 30 * DAY))
  const cardRecord = due.find((c) => c.key === key)
  assert.ok(cardRecord, 'the scheduled card is due within 30 days')
  assert.equal(cardRecord.card.stability, next.card.stability)
})

test('listDue respects the clock and the cap', async () => {
  const store = createStore(freshDbName())
  const put = async (id: string, dueMs: number) => {
    const card = newCard(id, 'recognition', T0)
    card.card.due = new Date(dueMs)
    await store.putCard({
      key: cardKey(id, 'recognition'),
      itemId: id,
      skill: 'recognition',
      card: card.card,
      dueAt: dueMs,
      updatedAt: T0.getTime(),
    })
  }
  await put('early', T0.getTime() - 3600000)
  await put('later', T0.getTime() + 3600000)
  await put('latest', T0.getTime() + 2 * 3600000)

  const dueNow = await store.listDue(T0)
  assert.deepEqual(dueNow.map((c) => c.itemId), ['early'])

  const dueTomorrow = await store.listDue(new Date(T0.getTime() + 2 * DAY))
  assert.deepEqual(
    dueTomorrow.map((c) => c.itemId),
    ['early', 'later', 'latest'],
  )

  assert.equal((await store.listDue(new Date(T0.getTime() + 2 * DAY), 2)).length, 2)
  assert.equal(await store.countDue(new Date(T0.getTime() + 2 * DAY)), 3)
})
