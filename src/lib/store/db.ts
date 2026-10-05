/**
 * Local-first progress store (CLAUDE.md): IndexedDB via dexie, exposed
 * through a narrow ProgressStore interface so a sync-backed
 * implementation can slot in later without touching callers.
 */

import Dexie, { type EntityTable } from 'dexie'
import type { Card, ReviewLog } from 'ts-fsrs'

export interface CardRecord {
  /** `${itemId}:${skill}` — the card key (PLAN.md §7). */
  key: string
  itemId: string
  skill: string
  card: Card
  /** Epoch ms; indexed so due cards are cheap to list. */
  dueAt: number
  updatedAt: number
}

export interface ReviewLogRecord {
  id?: number
  cardKey: string
  itemId: string
  skill: string
  reviewedAt: number
  /** The full ts-fsrs log — persisted from day one so FSRS parameters
   *  can be optimized on real data later (PLAN.md §7). */
  log: ReviewLog
}

export function cardKey(itemId: string, skill: string): string {
  return `${itemId}:${skill}`
}

class LearnMalayalamDb extends Dexie {
  cards!: EntityTable<CardRecord, 'key'>
  reviewLogs!: EntityTable<ReviewLogRecord, 'id'>

  constructor(name: string) {
    super(name)
    this.version(1).stores({
      cards: '&key, dueAt, updatedAt',
      reviewLogs: '++id, cardKey, reviewedAt',
    })
  }
}

export interface ProgressStore {
  getCard(key: string): Promise<CardRecord | undefined>
  putCard(record: CardRecord): Promise<void>
  /** Due cards, soonest first; `limit` caps the daily session. */
  listDue(now: Date, limit?: number): Promise<CardRecord[]>
  countDue(now: Date): Promise<number>
  appendLog(record: Omit<ReviewLogRecord, 'id'>): Promise<void>
}

export const PROGRESS_DB_NAME = 'learn-malayalam'

/** `name` is injectable so tests can isolate backing databases. */
export function createStore(name: string = PROGRESS_DB_NAME): ProgressStore {
  const db = new LearnMalayalamDb(name)
  return {
    getCard: (key) => db.cards.get(key),
    putCard: (record) => db.cards.put(record).then(() => undefined),
    listDue: async (now, limit = 1000) => {
      const due = await db.cards.where('dueAt').belowOrEqual(now.getTime()).sortBy('dueAt')
      return limit === undefined ? due : due.slice(0, limit)
    },
    countDue: (now) => db.cards.where('dueAt').belowOrEqual(now.getTime()).count(),
    appendLog: (record) => db.reviewLogs.add(record as ReviewLogRecord).then(() => undefined),
  }
}
