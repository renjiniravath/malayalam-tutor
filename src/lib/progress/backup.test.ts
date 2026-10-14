import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { contentRevision, currentItemIds } from '@/content';
import { newCardRecord, reviewCard } from '@/lib/fsrs/scheduler';
import { MemoryProgressStore } from './store';
import { BACKUP_FORMAT, buildBackup, importBackup, parseBackup } from './backup';

const now = new Date('2026-10-05T09:00:00.000Z');

describe('backup export and import', () => {
  it('round-trips cards, logs, events, and meta through a fresh store', async () => {
    const source = new MemoryProgressStore();
    await source.putCard(newCardRecord('mazha', 'recognition', now));
    await source.putCard(newCardRecord('mazha', 'production', now));
    const { record, log } = reviewCard((await source.getCard('mazha:recognition'))!, 'good', now);
    await source.putCard(record);
    await source.appendLog(log);
    await source.appendEvent({
      id: 'evt-1',
      type: 'lesson-complete',
      at: now,
      data: { lessonId: 'l1u1l1', correct: 3, total: 3, perfect: true },
    });
    await source.setMeta('streak', { count: 4, lastDay: '2026-10-04', freezes: 1 });

    const envelope = await buildBackup(source, now);
    const raw = JSON.stringify(envelope);

    const target = new MemoryProgressStore();
    const result = await importBackup(target, parseBackup(raw));

    assert.equal(result.cards, 2);
    assert.equal(result.droppedCards, 0);
    assert.equal(result.logs, 1);
    assert.equal(result.events, 1);
    assert.deepEqual(await target.getCard('mazha:recognition'), record);
    assert.equal((await target.listLogs()).length, 1);
    assert.equal((await target.listEvents()).length, 1);
    assert.deepEqual(await target.getMeta('streak'), { count: 4, lastDay: '2026-10-04', freezes: 1 });
  });

  it('rejects payloads that are not backups', () => {
    assert.throws(() => parseBackup('not json'), /not valid JSON/);
    assert.throws(() => parseBackup(JSON.stringify({ hello: 'world' })), /not a Learn Malayalam backup/);
    assert.throws(
      () => parseBackup(JSON.stringify({ format: BACKUP_FORMAT, version: 99, cards: [], logs: [] })),
      /different version/,
    );
  });

  it('reconciles cards against the current content revision before writing', async () => {
    const source = new MemoryProgressStore();
    await source.putCard(newCardRecord('mazha', 'recognition', now)); // in content: kept
    await source.putCard(newCardRecord('deleted-item', 'recognition', now)); // not in content: dropped
    const envelope = await buildBackup(source, now);

    const target = new MemoryProgressStore();
    const result = await importBackup(target, parseBackup(JSON.stringify(envelope)));

    assert.equal(result.cards, 1);
    assert.equal(result.droppedCards, 1);
    assert.ok(await target.getCard('mazha:recognition'));
    assert.equal(await target.getCard('deleted-item:recognition'), undefined);
    // The reconciliation ran against the real bundle revision.
    assert.ok(currentItemIds().includes('mazha'));
    assert.ok(Number.isInteger(contentRevision.revision));
  });

  it('handles an empty backup', async () => {
    const envelope = await buildBackup(new MemoryProgressStore(), now);
    const target = new MemoryProgressStore();
    const result = await importBackup(target, parseBackup(JSON.stringify(envelope)));
    assert.deepEqual(result, { cards: 0, droppedCards: 0, logs: 0, events: 0 });
  });
});
