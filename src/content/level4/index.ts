import type { Level } from '../types';
import { l4u1l1 } from './l4u1l1';
import { l4u1l2 } from './l4u1l2';
import { l4u1l3 } from './l4u1l3';
import { l4u1l4 } from './l4u1l4';

/**
 * Level 4 — Making Sentences (PLAN.md §5). This round authors the first
 * four lessons: the casual past, the future and the -aam plan forms, the
 * person + time + verb frames, and the day words. Negation, wh-questions
 * and the free sentence-builder blocks arrive in the next round.
 */
export const level4: Level = {
  id: 'l4',
  name: 'Level 4 — Making Sentences',
  canDo: [
    'Talk about what already happened with the everyday past chunks: poi, vannu, kandu, kazhichu.',
    'Say what will happen with the -um future: pokum, varum, kazhikkum.',
    'Make a plan with the -aam forms: namukku pokaam, kazhikkaam.',
    'Build person + time + verb sentences in the past and the future.',
    'Place the day words: innu (today), naaḷe (tomorrow), innale (yesterday), ippo (now).',
  ],
  lessons: [l4u1l1, l4u1l2, l4u1l3, l4u1l4],
};
