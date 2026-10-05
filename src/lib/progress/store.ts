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

class ProgressDB extends Dexie {
  cards!: EntityTable<CardRecord, 'key'>;
  logs!: EntityTable<ReviewLogRecord, 'id'>;

  constructor() {
    super('learn-malayalam-progress');
    this.version(1).stores({
      cards: 'key, itemId, skill, due',
      logs: 'id, cardKey, review',
    });
  }
}

export class IndexedProgressStore implements ProgressStore {
  private db = new ProgressDB();

  async putCard(record: CardRecord): Promise<void> {
    await this.db.cards.put(record);
  }

  async getCard(key: string): Promise<CardRecord | undefined> {
    return this.db.cards.get(key);
  }

  async listDue(now: Date, limit: number): Promise<CardRecord[]> {
    return this.db.cards.where('due').belowOrEqual(now).sortBy('due').then((cards) => cards.slice(0, limit));
  }

  async countDue(now: Date): Promise<number> {
    return this.db.cards.where('due').belowOrEqual(now).count();
  }

  async appendLog(log: ReviewLogRecord): Promise<void> {
    await this.db.logs.add(log);
  }

  async listLogs(limit = 100): Promise<ReviewLogRecord[]> {
    return this.db.logs.orderBy('review').reverse().limit(limit).toArray();
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
