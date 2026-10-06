import type { Level } from '../types';
import { l2u1l1 } from './l2u1l1';
import { l2u1l2 } from './l2u1l2';
import { l2u1l3 } from './l2u1l3';
import { l2u1l4 } from './l2u1l4';
import { l2u2l1 } from './l2u2l1';
import { l2u2l2 } from './l2u2l2';
import { l2u3l1 } from './l2u3l1';
import { l2u3l2 } from './l2u3l2';

export const level2: Level = {
  id: 'l2',
  name: 'Level 2 — First Sentences',
  canDo: [
    'Understand and say simple present-tense sentences built from Level 1 words.',
    'Ask and answer yes and no questions.',
    'Choose the right level of politeness — from nee to thaankaḷ, avan to addheham, and the everyday Chettan and Chechi.',
    'Point near and far with the a/i pairs and ask the question words.',
  ],
  lessons: [l2u1l1, l2u1l2, l2u1l3, l2u1l4, l2u2l1, l2u2l2, l2u3l1, l2u3l2],
};
