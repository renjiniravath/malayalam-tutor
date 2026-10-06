/**
 * Tag registry. `content:check` rejects any tag not listed here, so new
 * lessons must extend KNOWN_TAGS explicitly.
 */

/** The four hard sound classes (PLAN.md §5, Unit 1). */
export const SOUND_TAGS = [
  'sound:zh',
  'sound:coronal',
  'sound:geminate',
  'sound:vowelLength',
] as const

export type SoundTag = (typeof SOUND_TAGS)[number]

export const LEVEL_TAGS = ['level:1', 'level:2', 'level:3'] as const

export const KNOWN_TAGS: readonly string[] = [...SOUND_TAGS, ...LEVEL_TAGS]

/** Which manglish feature each sound tag teaches. */
export const SOUND_TAG_FEATURE: Record<SoundTag, string> = {
  'sound:zh': 'zh',
  'sound:coronal': 'coronal',
  'sound:geminate': 'geminate',
  'sound:vowelLength': 'vowelLength',
}
