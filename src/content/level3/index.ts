/**
 * Level 3 — Cases and connectors (PLAN.md §5).
 * Can-do statements follow CEFR framing.
 */

import type { Level } from '../types'
import { L3UNIT1_LESSONS } from './unit1'
import { L3UNIT2_LESSONS } from './unit2'

export const LEVEL3: Level = {
  id: 'level3',
  name: 'Cases and connectors',
  canDo: [
    'Say where things are and where you are going',
    'Attach -il, -ilekk, and -kku to English words',
    'Build three-word frames: who + place + verb',
    'Tell near from far: a- words vs i- words',
    'Ask with the question words',
  ],
  lessons: [...L3UNIT1_LESSONS, ...L3UNIT2_LESSONS],
  test: {
    itemCount: 25,
    passPct: 0.8,
    sections: ['recognition', 'production', 'pronunciation'],
    retake: 'unlimited-after-failed-review',
  },
}
