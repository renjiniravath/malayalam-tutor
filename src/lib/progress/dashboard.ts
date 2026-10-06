/**
 * Dashboard data (PLAN.md §7): per-level can-do checklist and review
 * statistics from the persisted logs. Pure functions; the page feeds
 * them with stored data.
 */

import type { Level } from '@/content/types'
import type { ReviewLogRecord } from '@/lib/store/db'

/**
 * Which units a can-do statement depends on, per level. App-level
 * mapping (not content): a statement is done when every lesson of its
 * units is completed. Statements that depend on units that do not exist
 * yet simply stay open.
 */
export const CAN_DO_UNITS: Record<string, string[][]> = {
  level1: [['unit1'], ['unit2'], ['unit2', 'unit3', 'unit4', 'unit5'], ['unit2']],
}

export interface CanDoRow {
  statement: string
  done: boolean
}

export function canDoRows(
  level: Level,
  completedLessonIds: ReadonlySet<string>,
): CanDoRow[] {
  const units = CAN_DO_UNITS[level.id] ?? []
  const byUnit = new Map<string, string[]>()
  for (const lesson of level.lessons) {
    const list = byUnit.get(lesson.unitId) ?? []
    list.push(lesson.id)
    byUnit.set(lesson.unitId, list)
  }
  const unitDone = (unitId: string) => {
    const lessonIds = byUnit.get(unitId)
    return lessonIds !== undefined && lessonIds.every((id) => completedLessonIds.has(id))
  }
  return level.canDo.map((statement, index) => {
    const required = units[index] ?? []
    return { statement, done: required.length > 0 && required.every(unitDone) }
  })
}

/** Reviews per local calendar day, newest first (injectable clock). */
export function reviewsByDay(
  logs: readonly Pick<ReviewLogRecord, 'reviewedAt'>[],
  days: number,
  now: Date,
): { day: string; count: number }[] {
  const counts = new Map<string, number>()
  for (const log of logs) {
    const date = new Date(log.reviewedAt)
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
      date.getDate(),
    ).padStart(2, '0')}`
    counts.set(key, (counts.get(key) ?? 0) + 1)
  }
  const rows: { day: string; count: number }[] = []
  for (let i = 0; i < days; i++) {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i)
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
      date.getDate(),
    ).padStart(2, '0')}`
    rows.push({ day: key, count: counts.get(key) ?? 0 })
  }
  return rows
}

/**
 * Recent recall from the last `limit` logs: the share of Good and Easy
 * grades. Real data from ts-fsrs logs, or null with no reviews yet.
 */
export function recentRecall(
  logs: readonly { log: { rating: number } }[],
  limit = 30,
): { rate: number; correct: number; total: number } | null {
  const recent = logs.slice(-limit)
  if (recent.length === 0) return null
  const correct = recent.filter((entry) => entry.log.rating >= 3).length
  return { rate: Math.round((correct / recent.length) * 100), correct, total: recent.length }
}
