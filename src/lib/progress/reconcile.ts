/**
 * contentRevision reconciliation (PLAN.md §11, §12). Cards are keyed
 * {itemId, skill}; item IDs are immutable, so a change in content is seen
 * through the ids themselves. On reconciliation:
 *
 * - cards for removed items are archived (kept, never orphaned)
 * - archived cards for re-added items are re-keyed: they return to the
 *   active deck flagged `reKeyed`, so the FSRS layer starts them fresh
 *
 * Pure mapping logic — no storage yet. The IndexedDB layer (FSRS
 * milestone) calls this on load with the stored records and stamps the
 * returned cards with the current CONTENT_REVISION.
 */

import type { Item } from '@/content/types'

/** Skill dimension of the {itemId, skill} card key. */
export type Skill = string

/** Progress for one review card. FSRS fields join this shape later. */
export interface CardProgress {
  itemId: string
  skill: Skill
  /** contentRevision the card was last reconciled at */
  revision: number
  /** Set when the card was revived from the archive after its item was re-added. */
  reKeyed?: boolean
}

/** A card whose item no longer exists in content. */
export interface ArchivedCard extends CardProgress {
  archivedAtRevision: number
}

export interface ReconciledProgress {
  /** Cards whose items exist in the current content. */
  active: CardProgress[]
  /** Cards whose items do not. */
  archived: ArchivedCard[]
}

/**
 * Maps stored progress onto the current content.
 *
 * - active cards for still-present items are kept, revision restamped
 * - active cards for removed items move to the archive
 * - archived cards for re-added items are re-keyed into the active deck
 * - archived cards for still-absent items stay archived untouched
 */
export function reconcileProgress(
  cards: readonly CardProgress[],
  archived: readonly ArchivedCard[],
  currentItems: readonly Pick<Item, 'id'>[],
  currentRevision: number,
): ReconciledProgress {
  const currentIds = new Set(currentItems.map((item) => item.id))
  const active: CardProgress[] = []
  const archivedOut: ArchivedCard[] = []

  for (const card of cards) {
    if (currentIds.has(card.itemId)) {
      active.push({ ...card, revision: currentRevision })
    } else {
      archivedOut.push({ ...card, archivedAtRevision: currentRevision })
    }
  }
  for (const card of archived) {
    if (currentIds.has(card.itemId)) {
      active.push({
        itemId: card.itemId,
        skill: card.skill,
        revision: currentRevision,
        reKeyed: true,
      })
    } else {
      archivedOut.push(card)
    }
  }
  return { active, archived: archivedOut }
}
