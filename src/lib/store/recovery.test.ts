/**
 * Storage hardening tests: schema drift (a stale database version from
 * an earlier build) must recover without blocking the learner, and the
 * lesson flow must keep working even if recovery itself fails.
 */

import 'fake-indexeddb/auto'
import Dexie from 'dexie'
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { newCard } from '../fsrs/scheduler'
import { createStore } from './db'

const T0 = new Date('2026-10-05T09:00:00Z')

let counter = 0
const freshName = () => `recovery-test-${counter++}`

/** Leave a database at a version this store does not know. */
async function driftDatabase(name: string, version: number) {
  const drifted = new Dexie(name)
  drifted.version(version).stores({ cards: '&key, incompatible' })
  await drifted.open()
  drifted.close()
}

test('schema drift triggers delete-and-recreate, then works', async () => {
  const name = freshName()
  await driftDatabase(name, 2)

  const store = createStore(name)
  const card = newCard('mazha', 'recognition', T0)
  await store.putCard({
    key: 'mazha:recognition',
    itemId: 'mazha',
    skill: 'recognition',
    card: card.card,
    dueAt: card.card.due.getTime(),
    updatedAt: T0.getTime(),
  })
  const got = await store.getCard('mazha:recognition')
  assert.ok(got, 'the store recovered and works')
  assert.equal(await store.countDue(new Date(T0.getTime() + 60000)), 1)
})

test('drift on both the open path and later operations never blocks', async () => {
  const name = freshName()

  // First: the store opens over a drifted database.
  await driftDatabase(name, 2)
  const store = createStore(name)

  // Second: fresh drift appears after the store has recovered once.
  for (let round = 0; round < 2; round++) {
    const card = newCard(`item-${round}`, 'recognition', T0)
    await store.putCard({
      key: `item-${round}:recognition`,
      itemId: `item-${round}`,
      skill: 'recognition',
      card: card.card,
      dueAt: card.card.due.getTime(),
      updatedAt: T0.getTime(),
    })
    const got = await store.getCard(`item-${round}:recognition`)
    assert.ok(got, `round ${round} survived`)
    await driftDatabase(name, 3 + round)
  }
})
