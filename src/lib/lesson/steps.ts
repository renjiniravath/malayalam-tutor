/**
 * Lesson step list (PLAN.md §6). New material is blocked: every item gets
 * a hear-then-reveal step, then due review cards are interleaved (up to
 * the lesson's reviewSlots, PLAN.md §7), then the authored drills run in
 * order. Unit 1 is comprehension-only (no anticipation or typing drills
 * yet — those start after the sounds checkpoint), so the loop simply
 * follows the content.
 */

import type { DrillSpec, Item, Lesson } from '@/content/types'

export type Step =
  | { kind: 'hear'; key: string; item: Item }
  | { kind: 'review'; key: string; cardKey: string }
  | { kind: 'drill'; key: string; spec: DrillSpec }

export function buildSteps(
  lesson: Lesson,
  dueCards: readonly { key: string }[] = [],
): Step[] {
  const reviewCount = Math.min(lesson.reviewSlots, dueCards.length)
  const steps: Step[] = [
    ...lesson.items.map(
      (item): Step => ({ kind: 'hear', key: `hear:${item.id}`, item }),
    ),
    ...dueCards.slice(0, reviewCount).map(
      (card): Step => ({ kind: 'review', key: `review:${card.key}`, cardKey: card.key }),
    ),
    ...lesson.drills.map(
      (spec, index): Step => ({ kind: 'drill', key: `drill:${index}`, spec }),
    ),
  ]
  return steps
}

export type Outcome = 'correct' | 'wrong' | 'skipped' | 'done'

/** Content is validated by content:check, so a missing id is a bug. */
export function itemById(lesson: Lesson, id: string): Item {
  const item = lesson.items.find((i) => i.id === id)
  if (!item) throw new Error(`unknown item id: ${id}`)
  return item
}
