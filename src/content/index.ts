import type { Level } from './types';
import { level1 } from './level1';
import { level2 } from './level2';

export { level1, level2 };
export { audioManifest } from './audio/manifest';
export { imageManifest } from './images/manifest';
export * from './types';

/**
 * Content revision marker (PLAN.md §11). Bump `revision` on every content
 * change that affects learner state; it is stored with progress and
 * reconciled on load so edits never orphan cards. Item IDs themselves stay
 * immutable.
 */
export interface ContentRevision {
  revision: number;
  /**
   * Item ids removed at some revision. A re-added id is re-keyed on
   * reconciliation: its old records are archived and it starts fresh.
   */
  removedItemIds: string[];
}

export const contentRevision: ContentRevision = { revision: 3, removedItemIds: [] };

/** Every item id in current content — the key set progress reconciles against. */
export function currentItemIds(): string[] {
  return levels.flatMap((level) =>
    level.lessons.flatMap((lesson) => lesson.items.map((item) => item.id)),
  );
}

export const levels: Level[] = [level1, level2];
