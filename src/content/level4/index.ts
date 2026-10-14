import type { Level } from '../types';
import { l4u1l1 } from './l4u1l1';
import { l4u2l1 } from './l4u2l1';
import { l4u3l1 } from './l4u3l1';
import { l4u4l1 } from './l4u4l1';
import { l4u5l1 } from './l4u5l1';
import { l4u6l1 } from './l4u6l1';
import { l4u7l1 } from './l4u7l1';
import { l4u8l1 } from './l4u8l1';

/**
 * Level 4 — Making Sentences (PLAN.md §5). Eight units, one lesson each —
 * the shape the native speaker chose at the first Level 4 sign-off: the
 * casual past, the future and the -aam plan forms, the person + time +
 * verb frames, the day words, saying no, asking in sentences, and the two
 * assembling lessons. One unit carries one can-do statement, so finishing
 * a lesson lights one line.
 */
export const level4: Level = {
  id: 'l4',
  name: 'Level 4 — Making Sentences',
  canDo: [
    'Talk about what already happened: poyi, vannu, kandu, kazhichu.',
    'Say what will happen, or suggest something with one word: pokum, varum, pokaam, kazhikkaam.',
    'Build a sentence from who, where and what happened: njan officil poyi.',
    'Place today, tomorrow and yesterday in a sentence: innu (today), naaḷe (tomorrow), innale (yesterday).',
    "Say no in a full sentence: illa for what is not there, alla for what something is not, venda for what you don't want.",
    'Ask a whole question with one question word: evide (where), eppo (when), entha (what), ethra (how much), engane (how), aaru (who).',
    'Put a sentence together yourself: who, when, where, and what happened or will happen.',
    'Ask your own questions from the same words: the question word does the asking.',
  ],
  lessons: [l4u1l1, l4u2l1, l4u3l1, l4u4l1, l4u5l1, l4u6l1, l4u7l1, l4u8l1],
};
