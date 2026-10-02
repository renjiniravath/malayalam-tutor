/**
 * Per-asset image license records (PLAN.md §11). The generated credits page
 * renders these. Allowlist: CC0/PD, CC BY (editable); CC BY-SA displayed
 * as-is only (editing re-publishes as SA); ND excluded.
 */

import type { ImageLicense } from './types'

export const LICENSE_ALLOWLIST = ['CC0', 'PD', 'CC BY', 'CC BY-SA'] as const

/** Level 1 Unit 1 has no concrete nouns, so no images yet. */
export const IMAGE_LICENSES: readonly ImageLicense[] = []
