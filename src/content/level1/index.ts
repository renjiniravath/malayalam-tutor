/**
 * Level 1 — Sounds & Words (Building Blocks).
 * Can-do statements follow CEFR framing (PLAN.md §5).
 */

import type { Level } from '../types'
import { UNIT1_LESSONS } from './unit1'
import { UNIT2_LESSONS } from './unit2'
import { UNIT3_LESSONS } from './unit3'

export const LEVEL1: Level = {
  id: 'level1',
  name: 'Sounds & Words',
  canDo: [
    'Recognize and produce the four hard sound classes: zh, the tongue-tip sounds (th, t, ṟ), held sounds, and long vowels',
    'Greet people in casual Malayalam',
    'Use high-frequency nouns, core verbs, and pronouns',
    'Use everyday conversational expressions',
  ],
  lessons: [...UNIT1_LESSONS, ...UNIT2_LESSONS, ...UNIT3_LESSONS],
  test: {
    itemCount: 20,
    passPct: 0.8,
    sections: ['recognition', 'production', 'pronunciation'],
    retake: 'unlimited-after-failed-review',
  },
}
