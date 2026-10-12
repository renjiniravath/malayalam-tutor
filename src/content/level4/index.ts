import type { Level } from '../types';
import { l4u1l1 } from './l4u1l1';
import { l4u2l1 } from './l4u2l1';
import { l4u3l1 } from './l4u3l1';
import { l4u4l1 } from './l4u4l1';

/**
 * Level 4 — Making Sentences (PLAN.md §5). Four units, one lesson each —
 * the shape the native speaker chose at the first Level 4 sign-off: the
 * casual past, the future and the -aam plan forms, the person + time +
 * verb frames, and the day words. One unit carries one can-do statement,
 * so finishing a lesson lights one line. Negation, wh-questions and the
 * free sentence-builder blocks arrive in the next round.
 */
export const level4: Level = {
  id: 'l4',
  name: 'Level 4 — Making Sentences',
  canDo: [
    'Talk about what already happened: poyi, vannu, kandu, kazhichu.',
    'Say what will happen, or suggest something with one word: pokum, varum, pokaam, kazhikkaam.',
    'Build a sentence from who, where and what happened: njan officil poyi.',
    'Place today, tomorrow and yesterday in a sentence: innu (today), naaḷe (tomorrow), innale (yesterday).',
  ],
  lessons: [l4u1l1, l4u2l1, l4u3l1, l4u4l1],
};
