/**
 * Level 1 Unit 1 — "First sounds" (PLAN.md §5): ഴ, the coronal series,
 * gemination, and vowel length. Three comprehension-only lessons — hear,
 * reveal, discriminate; speaking starts after the sounds checkpoint.
 */

import type { Lesson } from '../../types'
import { lesson1Zh } from './lesson1-zh'
import { lesson2Coronals } from './lesson2-coronals'
import { lesson3GeminationVowels } from './lesson3-gemination-vowels'

export const UNIT1_LESSONS: readonly Lesson[] = [
  lesson1Zh,
  lesson2Coronals,
  lesson3GeminationVowels,
]
