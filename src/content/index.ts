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

export const contentRevision: ContentRevision = {
  revision: 6,
  removedItemIds: [
    // Native-speaker corrections re-keyed these items under their corrected spellings.
    'kettiyo',
    'varunno',
    'ningal-varunno',
    'avan-varunno',
    'nii-varunno',
    'njan-chaaya-venam',
    'njan-veedu-pokuva',
    // Final rulings: long i is written ee (not ii), and the retired
    // vowel-length pair varam/vaaram was replaced by aadi/adi.
    'niyyo',
    'niyyum',
    'nii-varunnundo',
    'njan-viittil-pokuva',
    'varam',
    'vaaram',
    // Native-speaker corrections: 'njan parayuva' is not said in
    // conversation, and 'njan sheri' means "I correct" — the fine
    // answer is njan okay aanu.
    'njan-parayuva',
    'njan-sheri',
  ],
};

/** Every item id in current content — the key set progress reconciles against. */
export function currentItemIds(): string[] {
  return levels.flatMap((level) =>
    level.lessons.flatMap((lesson) => lesson.items.map((item) => item.id)),
  );
}

export const levels: Level[] = [level1, level2];
