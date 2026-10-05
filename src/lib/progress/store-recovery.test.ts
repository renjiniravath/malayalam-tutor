import 'fake-indexeddb/auto';
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { newCardRecord, persistReview, reviewCard } from '@/lib/fsrs/scheduler';
import { IndexedProgressStore, type ProgressStore } from './store';

const now = new Date('2026-10-05T09:00:00.000Z');
const DB_NAME = 'learn-malayalam-progress';
// Dexie stores the native IndexedDB version as verno * 10.
const NATIVE_V1 = 10;
const NATIVE_V2 = 20;

/**
 * Regression: earlier app builds left 'learn-malayalam-progress' at
 * other versions on devices (the learner's device reported version 10).
 * A healthy v1 database must upgrade in place without losing cards; a
 * foreign database above our schema must be rebuilt from scratch. The
 * harness stubs indexedDB.databases() (present in real browsers, absent
 * in fake-indexeddb) to report the device state, as Chrome would.
 */

/** Reports the device's databases to the store, as Chrome's databases() would. */
function reportDatabases(entries: Array<{ name: string; version?: number }>): void {
  indexedDB.databases = async () => entries;
}

/** Raw database version and store names, no Dexie involved. */
async function rawState(): Promise<{ version: number; stores: string[] }> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME);
    request.onsuccess = () => {
      const result = { version: request.result.version, stores: [...request.result.objectStoreNames] };
      request.result.close();
      resolve(result);
    };
    request.onerror = () => reject(request.error);
  });
}

/** Creates a database at a native version with the given stores, like an earlier build left behind. */
async function createDatabase(
  version: number,
  stores: Record<string, { keyPath: string }>,
): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, version);
    request.onupgradeneeded = () => {
      for (const [name, { keyPath }] of Object.entries(stores)) {
        if (!request.result.objectStoreNames.contains(name)) {
          request.result.createObjectStore(name, { keyPath });
        }
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

describe('IndexedProgressStore open recovery', () => {
  it('upgrades a healthy v1 database (native 10) in place, keeping its cards', async () => {
    const db = await createDatabase(NATIVE_V1, {
      cards: { keyPath: 'key' },
      logs: { keyPath: 'id' },
    });
    const existing = newCardRecord('mazha', 'recognition', now);
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction('cards', 'readwrite');
      tx.objectStore('cards').put(existing);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();

    reportDatabases([{ name: DB_NAME, version: NATIVE_V1 }]);
    const store = new IndexedProgressStore();
    // No rebuild: the v1 card survives the v1 -> v2 upgrade untouched.
    const stored = await store.getCard('mazha:recognition');
    assert.deepEqual(stored, existing);
    assert.deepEqual(await rawState(), { version: NATIVE_V2, stores: ['cards', 'logs'] });
  });

  it('rebuilds when the device database is above our schema (foreign build)', async () => {
    const db = await createDatabase(30, { garbage: { keyPath: 'id' } });
    db.close();
    reportDatabases([{ name: DB_NAME, version: 30 }]);

    const store = new IndexedProgressStore();
    const record = newCardRecord('mazha', 'recognition', now);
    // Throws a VersionError without recovery; must succeed after rebuild.
    await store.putCard(record);
    assert.deepEqual(await store.getCard('mazha:recognition'), record);
    assert.deepEqual(await rawState(), { version: NATIVE_V2, stores: ['cards', 'logs'] });
  });

  it('rebuilds at the declared version and review logs persist after recovery', async () => {
    const db = await createDatabase(40, { garbage: { keyPath: 'id' } });
    db.close();
    reportDatabases([{ name: DB_NAME, version: 40 }]);

    const store = new IndexedProgressStore();
    const result = reviewCard(newCardRecord('mazha', 'recognition', now), 'good', now);
    let reported = false;
    await persistReview(store, result, () => {
      reported = true;
    });
    assert.equal(reported, false);
    assert.equal((await store.listLogs()).length, 1);
    assert.equal((await rawState()).version, NATIVE_V2);
  });

  it('a fresh install opens directly at the declared schema', async () => {
    reportDatabases([]);
    const store = new IndexedProgressStore();
    await store.putCard(newCardRecord('mazha', 'recognition', now));
    assert.deepEqual(await rawState(), { version: NATIVE_V2, stores: ['cards', 'logs'] });
  });

  it('a store whose open rejects never blocks the advance guarantee', async () => {
    const broken: ProgressStore = {
      putCard: async () => {
        throw new Error('blocked database');
      },
      getCard: async () => undefined,
      listDue: async () => [],
      countDue: async () => 0,
      appendLog: async () => {
        throw new Error('blocked database');
      },
      listLogs: async () => [],
    };
    const result = reviewCard(newCardRecord('mazha', 'recognition', now), 'good', now);
    let reported: unknown;
    await assert.doesNotReject(
      persistReview(broken, result, (error) => {
        reported = error;
      }),
    );
    assert.ok(reported, 'onError was called with the failure');
  });
});
