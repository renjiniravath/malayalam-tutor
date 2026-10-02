/**
 * contentRevision reconciliation (PLAN.md §11): maps stored progress records
 * — keyed {itemId, skill} — onto the current content bundle.
 *
 * Item IDs are immutable, so the mapping is simple:
 *  - a record whose item is still in content stays active, untouched
 *  - a record whose item is gone is archived (retired, never deleted)
 *  - a record whose item was removed and re-added is re-keyed: the old
 *    record is archived and the item starts fresh, because its teaching
 *    content may have changed while it was away
 *
 * The store (M3) passes currentItemIds() and contentRevision.removedItemIds
 * from the content bundle. This module stays pure so the mapping is testable
 * without touching content.
 */

/** Per-skill cards: recognition and production are tracked separately (PLAN.md §11). */
export type Skill = 'recognition' | 'production';

export interface ProgressRecord {
  itemId: string;
  skill: Skill;
  /** Opaque learner state (FSRS lands in M3) — reconciliation never inspects it. */
  state: unknown;
}

export interface Reconciliation {
  /** Records that map onto current content — keep scheduling as-is. */
  active: ProgressRecord[];
  /** Retired records — removed items, or re-added items whose old state is dropped. */
  archived: ProgressRecord[];
  /** Item ids re-added in this content — the store must mint fresh cards under new keys. */
  reKeyed: string[];
}

export function reconcileProgress(
  records: ProgressRecord[],
  currentItemIds: string[],
  removedItemIds: string[],
): Reconciliation {
  const current = new Set(currentItemIds);
  const removed = new Set(removedItemIds);
  const active: ProgressRecord[] = [];
  const archived: ProgressRecord[] = [];
  const reKeyed = new Set<string>();

  for (const record of records) {
    if (removed.has(record.itemId)) {
      archived.push(record);
      if (current.has(record.itemId)) reKeyed.add(record.itemId);
    } else if (current.has(record.itemId)) {
      active.push(record);
    } else {
      archived.push(record);
    }
  }

  return { active, archived, reKeyed: [...reKeyed] };
}
