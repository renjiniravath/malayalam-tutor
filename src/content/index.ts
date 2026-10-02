import type { Level } from './types';
import { level1 } from './level1';

export { level1 };
export { audioManifest } from './audio/manifest';
export { imageManifest } from './images/manifest';
export * from './types';

/**
 * Bump on every content change that affects learner state. Stored with
 * progress; on load, changes are reconciled so edits never orphan cards
 * (PLAN.md §11). Item IDs themselves stay immutable.
 */
export const contentRevision = 1;

export const levels: Level[] = [level1];
