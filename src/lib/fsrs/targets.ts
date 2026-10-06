/**
 * Which {itemId, skill} cards an auto-scored drill grades. Self-assessed
 * drills (anticipation, speak-and-compare) return none: they are logged,
 * never scheduled (PLAN.md §7).
 */

import type { DrillSpec } from '@/content/types'
import type { Skill } from './scheduler'

export interface CardTarget {
  itemId: string
  skill: Skill
}

/**
 * `kindOf` resolves an item's kind so sentence items grade their
 * 'sentence' card from the typing variant too.
 */
export function drillTargets(
  spec: DrillSpec,
  pairItems: (pairId: string) => [string, string] | null,
  kindOf: (itemId: string) => string | undefined,
): CardTarget[] {
  switch (spec.kind) {
    case 'multipleChoice':
      return [{ itemId: spec.itemId, skill: 'recognition' }]
    case 'typing':
      return [
        {
          itemId: spec.itemId,
          skill: kindOf(spec.itemId) === 'sentence' ? 'sentence' : 'production',
        },
      ]
    case 'sentenceBuilder':
      return [{ itemId: spec.sentenceId, skill: 'sentence' }]
    case 'minimalPair': {
      const pair = pairItems(spec.pairId)
      if (!pair) return []
      const [a, b] = pair
      return [
        { itemId: a, skill: 'recognition' },
        { itemId: b, skill: 'recognition' },
      ]
    }
    default:
      return []
  }
}
