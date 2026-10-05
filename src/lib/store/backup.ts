/**
 * JSON backup (CLAUDE.md: export/import from day one). Import validates
 * the payload, normalizes dates back from JSON, reconciles cards via
 * the contentRevision mechanism (removed items are skipped, never
 * restored), and only then writes.
 */

import { LEVELS } from '@/content/levels'
import { CONTENT_REVISION } from '@/content/revision'
import { reconcileProgress } from '@/lib/progress/reconcile'
import { EMPTY_STREAK, type StreakState } from '@/lib/streaks/streaks'
import type { AchievementRecord, CardRecord, ProgressStore, ReviewLogRecord } from './db'

export interface BackupPayload {
  format: 'learn-malayalam-backup'
  version: 1
  contentRevision: number
  exportedAt: number
  cards: CardRecord[]
  reviewLogs: Omit<ReviewLogRecord, 'id'>[]
  streak: StreakState
  achievements: AchievementRecord[]
}

export interface ImportSummary {
  restoredCards: number
  skippedCards: number
  restoredLogs: number
}

export type ImportResult = { ok: true; summary: ImportSummary } | { ok: false; reason: string }

const ALL_ITEMS = LEVELS.flatMap((level) => level.lessons).flatMap((lesson) => lesson.items)

export async function exportProgress(store: ProgressStore, now: Date = new Date()): Promise<BackupPayload> {
  return {
    format: 'learn-malayalam-backup',
    version: 1,
    contentRevision: CONTENT_REVISION,
    exportedAt: now.getTime(),
    cards: await store.listCards(),
    reviewLogs: await store.listLogs(),
    streak: (await store.getStreak()) ?? EMPTY_STREAK,
    achievements: await store.listAchievements(),
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function asDate(value: unknown): Date | null {
  if (value instanceof Date) return value
  if (typeof value === 'string' || typeof value === 'number') {
    const parsed = new Date(value)
    return Number.isNaN(parsed.getTime()) ? null : parsed
  }
  return null
}

/** JSON round-trips turn ts-fsrs Dates into strings; bring them back. */
function normalizeCard(card: CardRecord): CardRecord | null {
  const due = asDate(card.card.due)
  if (!due) return null
  const lastReview = asDate(card.card.last_review)
  const normalized = { ...card.card, due, last_review: lastReview ?? undefined }
  return { ...card, card: normalized, dueAt: due.getTime() }
}

function normalizeLog(log: Omit<ReviewLogRecord, 'id'>): Omit<ReviewLogRecord, 'id'> | null {
  const due = asDate(log.log.due)
  const review = asDate(log.log.review)
  if (!due || !review) return null
  return { ...log, log: { ...log.log, due, review } }
}

function parseAndValidate(raw: string): BackupPayload | string {
  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    return 'Not valid JSON.'
  }
  if (!isRecord(parsed)) return 'Not a backup file.'
  if (parsed.format !== 'learn-malayalam-backup') return 'Unknown file format.'
  if (parsed.version !== 1) return `Unsupported backup version: ${String(parsed.version)}.`
  if (typeof parsed.contentRevision !== 'number') return 'Missing content revision.'
  if (!Array.isArray(parsed.cards)) return 'Missing cards.'
  if (!Array.isArray(parsed.reviewLogs)) return 'Missing review logs.'
  if (!isRecord(parsed.streak)) return 'Missing streak state.'
  if (!Array.isArray(parsed.achievements)) return 'Missing achievements.'
  return parsed as unknown as BackupPayload
}

function isValidStreak(streak: StreakState): boolean {
  return (
    typeof streak.current === 'number' &&
    typeof streak.best === 'number' &&
    typeof streak.freezes === 'number' &&
    (streak.lastLearningDay === null || typeof streak.lastLearningDay === 'string') &&
    (streak.pausedAt === null || typeof streak.pausedAt === 'string')
  )
}

export async function importProgress(store: ProgressStore, raw: string): Promise<ImportResult> {
  const payloadOrError = parseAndValidate(raw)
  if (typeof payloadOrError === 'string') return { ok: false, reason: payloadOrError }
  const payload = payloadOrError

  if (!isValidStreak(payload.streak)) return { ok: false, reason: 'Streak state is malformed.' }

  // Reconcile against current content: cards for removed items are
  // skipped, never restored (PLAN.md §11).
  const { active } = reconcileProgress(
    payload.cards.map((c) => ({ itemId: c.itemId, skill: c.skill, revision: payload.contentRevision })),
    [],
    ALL_ITEMS,
    CONTENT_REVISION,
  )
  const keep = new Set(active.map((c) => `${c.itemId}:${c.skill}`))

  const cards: CardRecord[] = []
  for (const card of payload.cards) {
    if (!keep.has(card.key)) continue
    const normalized = normalizeCard(card)
    if (normalized) cards.push(normalized)
  }
  const logs: Omit<ReviewLogRecord, 'id'>[] = []
  for (const log of payload.reviewLogs) {
    if (!keep.has(log.cardKey)) continue
    const normalized = normalizeLog(log)
    if (normalized) logs.push(normalized)
  }

  await store.clearAll()
  for (const card of cards) await store.putCard(card)
  for (const log of logs) await store.appendLog(log)
  await store.putStreak(payload.streak)
  for (const achievement of payload.achievements) {
    if (typeof achievement.id === 'string' && typeof achievement.earnedAt === 'number') {
      await store.putAchievement(achievement)
    }
  }

  return {
    ok: true,
    summary: {
      restoredCards: cards.length,
      skippedCards: payload.cards.length - cards.length,
      restoredLogs: logs.length,
    },
  }
}
