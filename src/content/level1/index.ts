import type { Level } from '../types';
import { l1u1l1 } from './l1u1l1';
import { l1u1l2 } from './l1u1l2';
import { l1u1l3 } from './l1u1l3';

export const level1: Level = {
  id: 'l1',
  name: 'Level 1 — Sounds & Words',
  canDo: [
    'Recognize and produce the four hard sound classes: zh, the coronal series, gemination, and vowel length.',
    'Greet people and use everyday expressions.',
    'Use around 40 high-frequency nouns, 10 core verbs, and pronouns.',
  ],
  lessons: [l1u1l1, l1u1l2, l1u1l3],
};
