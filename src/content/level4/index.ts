/**
 * Level 4 — Making Sentences (PLAN.md §5). The learner leaves the present:
 * the casual past, the future and the "let's" intent, who-when-what frames,
 * and the time words that fill the when slot.
 */

import type { Level } from '../types'
import { L4UNIT1_LESSONS } from './unit1'
import { L4UNIT2_LESSONS } from './unit2'
import { L4UNIT3_LESSONS } from './unit3'
import { L4UNIT4_LESSONS } from './unit4'

export const LEVEL4: Level = {
  id: 'level4',
  name: 'Making Sentences',
  canDo: [
    'Talk about what already happened',
    'Say what will happen, and suggest doing something together',
    'Build a sentence from who, when and what happened',
    'Use today, tomorrow and yesterday in a sentence',
  ],
  lessons: [
    ...L4UNIT1_LESSONS,
    ...L4UNIT2_LESSONS,
    ...L4UNIT3_LESSONS,
    ...L4UNIT4_LESSONS,
  ],
  test: {
    itemCount: 25,
    passPct: 0.8,
    sections: ['recognition', 'production', 'pronunciation'],
    retake: 'unlimited-after-failed-review',
  },
}
