/**
 * Per-sound mastery (PLAN.md §7, "zh mastered"). A sound is mastered
 * when the recognition card of every drilled word tagged with it holds
 * three weeks of FSRS stability. Sound items themselves (the
 * articulation primers) are excluded: they never get cards, and
 * vocabulary retention is the honest signal.
 */

import type { Item } from '@/content/types'
import { SOUND_TAGS } from '@/content/tags'
import type { CardRecord } from '@/lib/store/db'

/** FSRS stability (days) that counts as retained. */
export const MASTERY_STABILITY = 21

export const SOUND_LABELS: Record<string, string> = {
  'sound:zh': 'the zh sound',
  'sound:coronal': 'th, t, and ṟ',
  'sound:geminate': 'held consonants',
  'sound:vowelLength': 'long vowels',
}

export interface SoundMastery {
  tag: string
  label: string
  mastered: boolean
  retained: number
  total: number
}

export function computeSoundMastery(
  items: readonly Pick<Item, 'id' | 'kind' | 'tags'>[],
  cards: readonly CardRecord[],
): SoundMastery[] {
  const byKey = new Map(cards.map((card) => [card.key, card]))
  return SOUND_TAGS.map((tag) => {
    const words = items.filter((item) => item.kind !== 'sound' && item.tags.includes(tag))
    const retained = words.filter((word) => {
      const card = byKey.get(`${word.id}:recognition`)
      return card !== undefined && card.card.stability >= MASTERY_STABILITY
    }).length
    return {
      tag,
      label: SOUND_LABELS[tag],
      mastered: words.length > 0 && retained === words.length,
      retained,
      total: words.length,
    }
  })
}
