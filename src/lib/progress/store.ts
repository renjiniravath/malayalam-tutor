import Dexie, { type EntityTable } from 'dexie';
import type { CardRecord, ReviewLogRecord } from '@/lib/fsrs/types';

/**
 * Local-first progress storage (PLAN.md §11): IndexedDB behind a small
 * interface so a sync layer can be added later without touching callers.
 * Cards are indexed by due date for the review queue; logs append forever.
 *
 * The in-memory implementation (MemoryProgressStore) backs the unit
 * tests and shares the same contract.
 */

export interface ProgressStore {
  putCard(record: CardRecord): Promise<void>;
  getCard(key: string): Promise<CardRecord | undefined>;
  /** Due cards ordered by due date, capped (daily review cap, PLAN.md §7) */
  listDue(now: Date, limit: number): Promise<CardRecord[]>;
  countDue(now: Date): Promise<number>;
  appendLog(log: ReviewLogRecord): Promise<void>;
  /** Review logs, newest first */
  listLogs(limit?: number): Promise<ReviewLogRecord[]>;
}

const DB_NAME = 'learn-malayalam-progress';
/**
 * Dexie version number (Dexie's verno). Dexie stores the native
 * IndexedDB version as verno * 10, so this schema lives at native
 * version 20. Staleness checks must compare native to native.
 */
const SCHEMA_VERSION = 2;
const NATIVE_SCHEMA_VERSION = SCHEMA_VERSION * 10;

class ProgressDB extends Dexie {
  cards!: EntityTable<CardRecord, 'key'>;
  logs!: EntityTable<ReviewLogRecord, 'id'>;

  constructor() {
    super(DB_NAME);
    // v1: initial schema (cards, logs).
    this.version(1).stores({
      cards: 'key, itemId, skill, due',
      logs: 'id, cardKey, review',
    });
    // v2: schema unchanged; the bump makes the declared version explicit
    // after foreign builds left higher versions on devices, so the
    // recovery path in IndexedProgressStore has a stable target.
    this.version(SCHEMA_VERSION)
      .stores({
        cards: 'key, itemId, skill, due',
        logs: 'id, cardKey, review',
      })
      .upgrade(() => {
        // v1 -> v2: nothing to migrate, same stores.
      });
  }
}

/** Errors that mean the on-device database is newer than our schema. */
function isStaleVersionError(error: unknown): boolean {
  return (
    error instanceof Dexie.VersionError ||
    error instanceof Dexie.UpgradeError ||
    error instanceof Dexie.InvalidStateError
  );
}

/** Deletes the database, rejecting when another tab holds it open. */
function deleteDatabase(): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.deleteDatabase(DB_NAME);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
    request.onblocked = () => {
      reject(new Error(`progress store: ${DB_NAME} is blocked by another tab`));
    };
  });
}

/**
 * The on-device native version when it exceeds our schema, or undefined.
 * Uses indexedDB.databases() because it lists without creating the
 * database (an open() would create it at version 1 and send Dexie down
 * its SchemaDiff version-increment loop). Older browsers without
 * databases() rely on the Dexie error fallback below.
 *
 * The comparison is native to native: a device on our own v1 schema
 * (native 10) is healthy and upgrades in place; only versions beyond
 * our schema (foreign builds, native > 20) count as stale.
 */
async function findStaleVersion(): Promise<number | undefined> {
  if (typeof indexedDB.databases !== 'function') return undefined;
  const databases = await indexedDB.databases();
  const info = databases.find((entry) => entry.name === DB_NAME);
  if (info && info.version && info.version > NATIVE_SCHEMA_VERSION) return info.version;
  return undefined;
}

export class IndexedProgressStore implements ProgressStore {
  private db: ProgressDB | null = null;

  /**
   * Opens lazily, with two layers of protection against stale schemas
   * (earlier app builds left higher versions on devices; the learner's
   * device reported version 10):
   *
   * 1. Preflight: the on-device version is listed without opening. If it
   *    exceeds the declared schema version, the stale database is deleted
   *    and Dexie creates a genuinely fresh one at our version.
   * 2. Fallback: a Dexie open that still throws a stale-version error
   *    goes through the same delete-and-rebuild path.
   *
   * Losing stale local progress is acceptable at this stage; a dead app
   * is not. The event is logged, and callers keep the always-advance
   * guarantee: a store that keeps failing only raises the quiet warning.
   */
  private async open(): Promise<ProgressDB> {
    if (this.db) return this.db;
    const staleVersion = await findStaleVersion();
    if (staleVersion !== undefined) {
      console.warn(
        `progress store: device has version ${staleVersion}; rebuilding ${DB_NAME} at version ${SCHEMA_VERSION}`,
      );
      await deleteDatabase();
    }
    const db = new ProgressDB();
    try {
      await db.open();
      this.db = db;
      return db;
    } catch (error) {
      if (!isStaleVersionError(error)) throw error;
      console.warn(
        `progress store: schema mismatch; rebuilding ${DB_NAME} at version ${SCHEMA_VERSION}`,
        error,
      );
      db.close();
      await deleteDatabase();
      const fresh = new ProgressDB();
      await fresh.open();
      this.db = fresh;
      return fresh;
    }
  }

  async putCard(record: CardRecord): Promise<void> {
    await (await this.open()).cards.put(record);
  }

  async getCard(key: string): Promise<CardRecord | undefined> {
    return (await this.open()).cards.get(key);
  }

  async listDue(now: Date, limit: number): Promise<CardRecord[]> {
    return (await this.open()).cards.where('due').belowOrEqual(now).sortBy('due').then((cards) => cards.slice(0, limit));
  }

  async countDue(now: Date): Promise<number> {
    return (await this.open()).cards.where('due').belowOrEqual(now).count();
  }

  async appendLog(log: ReviewLogRecord): Promise<void> {
    await (await this.open()).logs.add(log);
  }

  async listLogs(limit = 100): Promise<ReviewLogRecord[]> {
    return (await this.open()).logs.orderBy('review').reverse().limit(limit).toArray();
  }
}

/** In-memory twin for unit tests; same contract, no IndexedDB. */
export class MemoryProgressStore implements ProgressStore {
  private cards = new Map<string, CardRecord>();
  private logs: ReviewLogRecord[] = [];

  async putCard(record: CardRecord): Promise<void> {
    this.cards.set(record.key, record);
  }

  async getCard(key: string): Promise<CardRecord | undefined> {
    return this.cards.get(key);
  }

  async listDue(now: Date, limit: number): Promise<CardRecord[]> {
    return [...this.cards.values()]
      .filter((record) => record.due.getTime() <= now.getTime())
      .sort((a, b) => a.due.getTime() - b.due.getTime())
      .slice(0, limit);
  }

  async countDue(now: Date): Promise<number> {
    return [...this.cards.values()].filter((record) => record.due.getTime() <= now.getTime()).length;
  }

  async appendLog(log: ReviewLogRecord): Promise<void> {
    this.logs.push(log);
  }

  async listLogs(limit = 100): Promise<ReviewLogRecord[]> {
    return [...this.logs]
      .sort((a, b) => b.review.getTime() - a.review.getTime())
      .slice(0, limit);
  }
}

/** Singleton for the app; tests use MemoryProgressStore. */
export const progressStore: ProgressStore = new IndexedProgressStore();
