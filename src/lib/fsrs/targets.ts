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

export function drillTargets(
  spec: DrillSpec,
  pairItems: (pairId: string) => [string, string] | null,
): CardTarget[] {
  switch (spec.kind) {
    case 'multipleChoice':
      return [{ itemId: spec.itemId, skill: 'recognition' }]
    case 'typing':
      return [{ itemId: spec.itemId, skill: 'production' }]
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
