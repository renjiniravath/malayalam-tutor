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
import { L4UNIT5_LESSONS } from './unit5'
import { L4UNIT6_LESSONS } from './unit6'
import { L4UNIT7_LESSONS } from './unit7'
import { L4UNIT8_LESSONS } from './unit8'

export const LEVEL4: Level = {
  id: 'level4',
  name: 'Making Sentences',
  canDo: [
    'Talk about what already happened',
    'Say what will happen, and suggest doing something together',
    'Build a sentence from who, when and what happened',
    'Use today, tomorrow and yesterday in a sentence',
    'Say no: what you do not have, are not, or do not want',
    'Ask a whole question: where, when, what, how much, how, who',
    'Put a whole sentence together and type it',
    'Build a question word by word, in either order',
  ],
  lessons: [
    ...L4UNIT1_LESSONS,
    ...L4UNIT2_LESSONS,
    ...L4UNIT3_LESSONS,
    ...L4UNIT4_LESSONS,
    ...L4UNIT5_LESSONS,
    ...L4UNIT6_LESSONS,
    ...L4UNIT7_LESSONS,
    ...L4UNIT8_LESSONS,
  ],
  test: {
    itemCount: 25,
    passPct: 0.8,
    sections: ['recognition', 'production', 'pronunciation'],
    retake: 'unlimited-after-failed-review',
  },
}
