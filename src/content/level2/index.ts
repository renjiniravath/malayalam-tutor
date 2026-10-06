/**
 * Level 2 — First Sentences (PLAN.md §5).
 * Can-do statements follow CEFR framing.
 */

import type { Level } from '../types'
import { L2UNIT1_LESSONS } from './unit1'
import { L2UNIT2_LESSONS } from './unit2'
import { L2UNIT3_LESSONS } from './unit3'
import { L2UNIT4_LESSONS } from './unit4'
import { L2UNIT5_LESSONS } from './unit5'
import { L2UNIT6_LESSONS } from './unit6'

export const LEVEL2: Level = {
  id: 'level2',
  name: 'First Sentences',
  canDo: [
    'Say simple present-tense sentences from Level 1 words',
    'Ask and answer yes/no questions',
    'Use tag questions and the -o particle',
    'Choose the right level of politeness',
    'Address people by title: chetta, aunty',
  ],
  lessons: [
    ...L2UNIT1_LESSONS,
    ...L2UNIT2_LESSONS,
    ...L2UNIT3_LESSONS,
    ...L2UNIT4_LESSONS,
    ...L2UNIT5_LESSONS,
    ...L2UNIT6_LESSONS,
  ],
  test: {
    itemCount: 20,
    passPct: 0.8,
    sections: ['recognition', 'production', 'pronunciation'],
    retake: 'unlimited-after-failed-review',
  },
}
