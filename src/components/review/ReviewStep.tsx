'use client'

/**
 * A single injected review inside the lesson flow (PLAN.md §7): one due
 * card, graded on the four-point ladder, then the lesson continues.
 */

import { ReviewSession } from './ReviewSession'

export function ReviewStep({ cardKey, onDone }: { cardKey: string; onDone: () => void }) {
  return <ReviewSession cardKeys={[cardKey]} onDone={onDone} />
}
