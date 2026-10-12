import type { Level } from '../types';
import { l5u1l1 } from './l5u1l1';
import { l5u2l1 } from './l5u2l1';

/**
 * Level 5 — Real Conversations (PLAN.md §5). Scenes rather than patterns:
 * each lesson is one exchange with one other speaker, authored as its turns
 * and played with the role-play step, so the learner answers a line instead
 * of a prompt. Two units so far, one scene each, one can-do line each.
 */
export const level5: Level = {
  id: 'l5',
  name: 'Level 5 — Real Conversations',
  canDo: [
    'Order at a tea shop and pay for it: oru chaaya veno, sugar venda, chetta ethra aanu, patthu roopa.',
    'Buy at a market stall: ask the price, say athu kooduthal aanu, and settle it with arai kilo mathi.',
  ],
  lessons: [l5u1l1, l5u2l1],
};
