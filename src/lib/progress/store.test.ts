import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { newCardRecord, reviewCard } from '@/lib/fsrs/scheduler';
import type { ReviewLogRecord } from '@/lib/fsrs/types';
import { MemoryProgressStore } from './store';

const DAY = 24 * 60 * 60 * 1000;
const today = new Date('2026-10-05T09:00:00.000Z');
const tomorrow = new Date(today.getTime() + DAY);

const logFor = (cardKey: string, review: Date): ReviewLogRecord => ({
  id: `${cardKey}-${review.getTime()}`,
  cardKey,
  itemId: cardKey.split(':')[0],
  skill: 'recognition',
  rating: 'good',
  review,
  due: new Date(review.getTime() + DAY),
  stability: 2,
  difficulty: 5,
  state: 'review',
  scheduledDays: 1,
});

describe('MemoryProgressStore (review-log and due-queue contract)', () => {
  it('round-trips cards and returns undefined for unknown keys', async () => {
    const store = new MemoryProgressStore();
    const record = newCardRecord('mazha', 'recognition', today);
    await store.putCard(record);
    assert.deepEqual(await store.getCard('mazha:recognition'), record);
    assert.equal(await store.getCard('mazha:production'), undefined);
  });

  it('lists only cards due by the given clock, ordered, capped', async () => {
    const store = new MemoryProgressStore();
    await store.putCard(newCardRecord('early', 'recognition', new Date(today.getTime() - 2 * DAY)));
    await store.putCard(newCardRecord('today', 'recognition', today));
    await store.putCard(newCardRecord('future', 'recognition', tomorrow));

    const due = await store.listDue(today, 10);
    assert.deepEqual(due.map((r) => r.itemId), ['early', 'today']);
    assert.equal(await store.countDue(today), 2);

    // The future card appears once the clock passes its due date (rollover).
    const nextDay = await store.listDue(tomorrow, 10);
    assert.deepEqual(nextDay.map((r) => r.itemId), ['early', 'today', 'future']);
  });

  it('caps the due list at the daily review limit; overflow stays due', async () => {
    const store = new MemoryProgressStore();
    for (let i = 0; i < 40; i++) {
      await store.putCard(newCardRecord(`item-${i}`, 'recognition', new Date(today.getTime() - i)));
    }
    const due = await store.listDue(today, 30);
    assert.equal(due.length, 30);
    assert.equal(await store.countDue(today), 40);
  });

  it('appends review logs and lists them newest first', async () => {
    const store = new MemoryProgressStore();
    await store.appendLog(logFor('mazha:recognition', today));
    await store.appendLog(logFor('mazha:recognition', tomorrow));

    const logs = await store.listLogs();
    assert.equal(logs.length, 2);
    assert.equal(logs[0].review.getTime(), tomorrow.getTime());
    assert.equal(logs[1].review.getTime(), today.getTime());
    assert.equal(await store.listLogs(1).then((l) => l.length), 1);
  });

  it('a full review round-trip updates the card and records the log', async () => {
    const store = new MemoryProgressStore();
    const record = newCardRecord('mazha', 'recognition', today);
    await store.putCard(record);

    const { record: next, log } = reviewCard(record, 'good', today);
    await store.putCard(next);
    await store.appendLog(log);

    const stored = await store.getCard('mazha:recognition');
    assert.equal(stored!.due.getTime(), next.due.getTime());
    assert.equal((await store.listLogs())[0].id, log.id);
  });
});
