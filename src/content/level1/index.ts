/**
 * Level 1 — Sounds & Words (Building Blocks).
 * Can-do statements follow CEFR framing (PLAN.md §5).
 */

import type { Level } from '../types'
import { UNIT1_LESSONS } from './unit1'

export const LEVEL1: Level = {
  id: 'level1',
  name: 'Sounds & Words',
  canDo: [
    'Recognize and produce the four hard sound classes: zh, coronals, gemination, vowel length',
    'Greet people in casual Malayalam',
    'Use high-frequency nouns, core verbs, and pronouns',
    'Use everyday conversational expressions',
  ],
  lessons: [...UNIT1_LESSONS],
  test: {
    itemCount: 20,
    passPct: 0.8,
    sections: ['recognition', 'production', 'pronunciation'],
    retake: 'unlimited-after-failed-review',
  },
}
