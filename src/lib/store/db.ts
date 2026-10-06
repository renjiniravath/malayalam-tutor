/**
 * Local-first progress store (CLAUDE.md): IndexedDB via dexie, exposed
 * through a narrow ProgressStore interface so a sync-backed
 * implementation can slot in later without touching callers.
 *
 * Hardening: every operation recovers from schema drift (a stale
 * database version left by an earlier build) by deleting and recreating
 * the database once; if that also fails, the store degrades to an
 * in-memory fallback so the lesson flow never blocks on storage.
 */

import Dexie, { type EntityTable } from 'dexie'
import type { Card, ReviewLog } from 'ts-fsrs'
import type { StreakState } from '@/lib/streaks/streaks'
import type { XpState } from '@/lib/xp/xp'

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

export interface AchievementRecord {
  id: string
  earnedAt: number
}

export function cardKey(itemId: string, skill: string): string {
  return `${itemId}:${skill}`
}

class LearnMalayalamDb extends Dexie {
  cards!: EntityTable<CardRecord, 'key'>
  reviewLogs!: EntityTable<ReviewLogRecord, 'id'>
  streak!: EntityTable<{ id: string; state: StreakState }, 'id'>
  achievements!: EntityTable<AchievementRecord, 'id'>
  xp!: EntityTable<XpState & { id: string }, 'id'>
  lessons!: EntityTable<LessonCompletionRecord, 'id'>

  constructor(name: string) {
    super(name)
    this.version(1).stores({
      cards: '&key, dueAt, updatedAt',
      reviewLogs: '++id, cardKey, reviewedAt',
    })
    this.version(2).stores({
      cards: '&key, dueAt, updatedAt',
      reviewLogs: '++id, cardKey, reviewedAt',
      streak: '&id',
      achievements: '&id',
    })
    this.version(3).stores({
      cards: '&key, dueAt, updatedAt',
      reviewLogs: '++id, cardKey, reviewedAt',
      streak: '&id',
      achievements: '&id',
      xp: '&id',
      lessons: '&id',
    })
  }
}

export interface LessonCompletionRecord {
  /** Lesson id. */
  id: string
  completedAt: number
}

export interface ProgressStore {
  getCard(key: string): Promise<CardRecord | undefined>
  putCard(record: CardRecord): Promise<void>
  /** Due cards, soonest first; `limit` caps the daily session. */
  listDue(now: Date, limit?: number): Promise<CardRecord[]>
  countDue(now: Date): Promise<number>
  appendLog(record: Omit<ReviewLogRecord, 'id'>): Promise<void>
  countLogs(): Promise<number>
  listCards(): Promise<CardRecord[]>
  listLogs(): Promise<ReviewLogRecord[]>
  getStreak(): Promise<StreakState | undefined>
  putStreak(state: StreakState): Promise<void>
  listAchievements(): Promise<AchievementRecord[]>
  putAchievement(record: AchievementRecord): Promise<void>
  getXp(): Promise<XpState | undefined>
  putXp(state: XpState): Promise<void>
  listLessons(): Promise<LessonCompletionRecord[]>
  putLesson(record: LessonCompletionRecord): Promise<void>
  /** Wipes progress data — used by backup import before restoring. */
  clearAll(): Promise<void>
}

/** In-memory fallback: keeps the lesson flow working, drops persistence. */
function memoryStore(): ProgressStore {
  const cards = new Map<string, CardRecord>()
  const logs: ReviewLogRecord[] = []
  let streak: StreakState | undefined
  const achievements = new Map<string, AchievementRecord>()
  let xp: XpState | undefined
  const lessons = new Map<string, LessonCompletionRecord>()
  return {
    getCard: async (key) => cards.get(key),
    putCard: async (record) => void cards.set(record.key, record),
    listDue: async (now, limit = 1000) => {
      const due = [...cards.values()].filter((c) => c.dueAt <= now.getTime()).sort((a, b) => a.dueAt - b.dueAt)
      return limit === undefined ? due : due.slice(0, limit)
    },
    countDue: async (now) => [...cards.values()].filter((c) => c.dueAt <= now.getTime()).length,
    appendLog: async (record) => void logs.push(record as ReviewLogRecord),
    countLogs: async () => logs.length,
    listCards: async () => [...cards.values()],
    listLogs: async () => [...logs],
    getStreak: async () => streak,
    putStreak: async (state) => void (streak = state),
    listAchievements: async () => [...achievements.values()],
    putAchievement: async (record) => void achievements.set(record.id, record),
    getXp: async () => xp,
    putXp: async (state) => void (xp = state),
    listLessons: async () => [...lessons.values()],
    putLesson: async (record) => void lessons.set(record.id, record),
    clearAll: async () => {
      cards.clear()
      logs.length = 0
      streak = undefined
      achievements.clear()
      xp = undefined
      lessons.clear()
    },
  }
}

export const PROGRESS_DB_NAME = 'learn-malayalam'

/** `name` is injectable so tests can isolate backing databases. */
export function createStore(name: string = PROGRESS_DB_NAME): ProgressStore {
  const db = new LearnMalayalamDb(name)
  const fallback = memoryStore()
  let broken = false

  /** One recovery attempt: delete the drifted database and reopen it. */
  const recover = async () => {
    try {
      db.close()
    } catch {
      // already closed
    }
    try {
      await Dexie.delete(name)
    } catch {
      // database gone or locked; the retry below decides
    }
  }

  /** Query with drift recovery, then an in-memory fallback. */
  const runQuery = async <T>(query: (s: ProgressStore) => Promise<T>): Promise<T> => {
    if (broken) return query(fallback)
    try {
      return await query(dbStore)
    } catch (error) {
      console.error('progress store: schema drift, recovering', error)
      await recover()
      try {
        return await query(dbStore)
      } catch (error2) {
        console.error('progress store: recovery failed, using memory fallback', error2)
        broken = true
        return query(fallback)
      }
    }
  }

  const dbStore: ProgressStore = {
    getCard: (key) => db.cards.get(key),
    putCard: (record) => db.cards.put(record).then(() => undefined),
    listDue: async (now, limit = 1000) => {
      const due = await db.cards.where('dueAt').belowOrEqual(now.getTime()).sortBy('dueAt')
      return limit === undefined ? due : due.slice(0, limit)
    },
    countDue: (now) => db.cards.where('dueAt').belowOrEqual(now.getTime()).count(),
    appendLog: (record) => db.reviewLogs.add(record as ReviewLogRecord).then(() => undefined),
    countLogs: () => db.reviewLogs.count(),
    listCards: () => db.cards.toArray(),
    listLogs: () => db.reviewLogs.toArray(),
    getStreak: async () => (await db.streak.get('current'))?.state,
    putStreak: (state) => db.streak.put({ id: 'current', state }).then(() => undefined),
    listAchievements: () => db.achievements.toArray(),
    putAchievement: (record) => db.achievements.put(record).then(() => undefined),
    getXp: async () => (await db.xp.get('current')) ?? undefined,
    putXp: (state) => db.xp.put({ id: 'current', ...state }).then(() => undefined),
    listLessons: () => db.lessons.toArray(),
    putLesson: (record) => db.lessons.put(record).then(() => undefined),
    clearAll: async () => {
      await db.transaction(
        'rw',
        [db.cards, db.reviewLogs, db.streak, db.achievements, db.xp, db.lessons],
        async () => {
          await Promise.all([
            db.cards.clear(),
            db.reviewLogs.clear(),
            db.streak.clear(),
            db.achievements.clear(),
            db.xp.clear(),
            db.lessons.clear(),
          ])
        },
      )
    },
  }

  return {
    getCard: (key) => runQuery((s) => s.getCard(key)),
    putCard: (record) => runQuery((s) => s.putCard(record)),
    listDue: (now, limit) => runQuery((s) => s.listDue(now, limit)),
    countDue: (now) => runQuery((s) => s.countDue(now)),
    appendLog: (record) => runQuery((s) => s.appendLog(record)),
    countLogs: () => runQuery((s) => s.countLogs()),
    listCards: () => runQuery((s) => s.listCards()),
    listLogs: () => runQuery((s) => s.listLogs()),
    getStreak: () => runQuery((s) => s.getStreak()),
    putStreak: (state) => runQuery((s) => s.putStreak(state)),
    listAchievements: () => runQuery((s) => s.listAchievements()),
    putAchievement: (record) => runQuery((s) => s.putAchievement(record)),
    getXp: () => runQuery((s) => s.getXp()),
    putXp: (state) => runQuery((s) => s.putXp(state)),
    listLessons: () => runQuery((s) => s.listLessons()),
    putLesson: (record) => runQuery((s) => s.putLesson(record)),
    clearAll: () => runQuery((s) => s.clearAll()),
  }
}
