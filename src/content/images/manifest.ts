/**
 * License record for every image asset (PLAN.md §11).
 * Allowlist: CC0/PD and CC BY (editable); CC BY-SA displayed as-is only
 * (editing would re-publish as SA); ND excluded. A generated credits page
 * carries attributions. Unit 1 has no concrete nouns, so this is empty for now.
 */

export type ImageLicense = 'CC0' | 'PD' | 'CC-BY' | 'CC-BY-SA';

export interface ImageRecord {
  /** Path relative to src/content/images/ */
  file: string;
  source: string;
  author: string;
  license: ImageLicense;
  /** True when a styling treatment edits the asset — not allowed for SA */
  edited: boolean;
}

export const imageManifest: ImageRecord[] = [];
