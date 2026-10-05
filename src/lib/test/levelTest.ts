/**
 * Level test planner (PLAN.md §7). The level test draws 20-25 items on
 * the whole level in three interleaved sections: recognition and
 * production (auto-scored on items), and pronunciation (auto-scored
 * minimal-pair discrimination). Pass >= 80% unlocks the next level;
 * self-assessed speak-and-compare items are logged, never scored.
 *
 * Pure and deterministic so the plan is unit-testable; the test UI
 * (a later milestone) consumes this plan and handles interleaving.
 */

import type { Level } from '@/content/types'

export const TEST_SECTIONS = ['recognition', 'production', 'pronunciation'] as const
export type TestSectionId = (typeof TEST_SECTIONS)[number]

export interface SectionPlan {
  section: TestSectionId
  autoScored: boolean
  /** Item ids (recognition and production). */
  itemIds: string[]
  /** Minimal-pair ids (pronunciation only). */
  pairIds: string[]
}

export interface LevelTestPlan {
  itemCount: 20 | 25
  passPct: 0.8
  sections: SectionPlan[]
}

export function planLevelTest(level: Level, itemCount: 20 | 25 = level.test.itemCount): LevelTestPlan {
  const itemPool = level.lessons.flatMap((lesson) => lesson.items.map((item) => item.id))
  const pairPool = level.lessons.flatMap((lesson) => lesson.pairs.map((pair) => pair.id))

  // Pronunciation is one fifth of the test; the rest splits evenly.
  const pronunciation = Math.min(pairPool.length, Math.floor(itemCount / 5))
  const recognition = Math.ceil((itemCount - pronunciation) / 2)
  const production = itemCount - pronunciation - recognition

  // Stable draw order keeps the plan deterministic and testable.
  const stable = (ids: readonly string[]) => [...ids].sort((a, b) => a.localeCompare(b))
  const take = (pool: readonly string[], n: number) => stable(pool).slice(0, Math.min(n, pool.length))

  // Items are drawn once: recognition first, production from the rest.
  const recognitionDraw = take(itemPool, recognition)
  const productionDraw = take(
    itemPool.filter((id) => !recognitionDraw.includes(id)),
    production,
  )

  return {
    itemCount,
    passPct: 0.8,
    sections: [
      { section: 'recognition', autoScored: true, itemIds: recognitionDraw, pairIds: [] },
      { section: 'production', autoScored: true, itemIds: productionDraw, pairIds: [] },
      { section: 'pronunciation', autoScored: true, itemIds: [], pairIds: take(pairPool, pronunciation) },
    ],
  }
}
