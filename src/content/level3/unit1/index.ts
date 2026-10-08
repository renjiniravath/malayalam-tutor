/**
 * Level 3 Unit 1 — Cases and connectors (PLAN.md §5): -il, -ilekk,
 * -kku, -nte, -um, -il ninn and -aayi, with suffix assimilation onto
 * English words.
 */

import type { Lesson } from '../../types'
import { lesson1CasesIl } from './lesson1-cases-il'
import { lesson2CasesIlekk } from './lesson2-cases-ilekk'
import { lesson3CasesKku } from './lesson3-cases-kku'
import { lesson4CasesNte } from './lesson4-cases-nte'
import { lesson5CasesUm } from './lesson5-cases-um'
import { lesson6CasesFrom } from './lesson6-cases-from'

export const L3UNIT1_LESSONS: readonly Lesson[] = [
  lesson1CasesIl,
  lesson2CasesIlekk,
  lesson3CasesKku,
  lesson4CasesNte,
  lesson5CasesUm,
  lesson6CasesFrom,
]
