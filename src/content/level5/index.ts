import type { Level } from '../types';
import { l5u1l1 } from './l5u1l1';
import { l5u2l1 } from './l5u2l1';
import { l5u3l1 } from './l5u3l1';
import { l5u4l1 } from './l5u4l1';
import { l5u5l1 } from './l5u5l1';
import { l5u6l1 } from './l5u6l1';
import { l5u7l1 } from './l5u7l1';
import { l5u8l1 } from './l5u8l1';

/**
 * Level 5 — Real Conversations (PLAN.md §5). Scenes rather than patterns:
 * each lesson is one exchange with one other speaker, authored as its turns
 * and played with the role-play step, so the learner answers a line instead
 * of a prompt. Eight units now, one scene each, one can-do line each, and
 * between them they cover the day from the counter to the wedding hall: the
 * tea shop, the market stall, the auto ride, the phone call, the family
 * visit, the bus ticket, the meal at the hotel, and the wedding.
 */
export const level5: Level = {
  id: 'l5',
  name: 'Level 5 — Real Conversations',
  canDo: [
    'Open at a tea shop and see it through to paying: chetta, oru chaaya, sugar idaṇo, venda chetta, ethra aayi chetta, patthu roopa.',
    'Buy at a market stall: ask chetta, thakkaaḷikk ethra aanu, order with ara kilo eduttho, and close it with venda, ithu mathi.',
    'Ride an auto home: chetta, veettilekku pokaam, hear sheri, keri, ask ethra aayi chetta, hear nooru roopa, and call ivide nirtthu when the corner comes.',
    'Take a phone call: answer with hello, aara, say njan suresh aanu, ask enna und vishesham, agree with athe, njan varaam, and close it with sheri, bye.',
    'Visit family: greet with chechi, ningaḷ engane und, ask njan ivide irikkatte, take the tea with venam, chechi, and leave with pinne kaanam, chechi.',
    'Ride the bus: ask chetta, ee bus engott aanu pokunnath at the door, hear athe, ernakuḷam, get in with njan keri, and buy for two with ernakuḷam, randu ticket when the conductor reaches your seat.',
    'Eat at a hotel: order chetta, oru choru venam, add oru chaaya koodi, ask chetta, bill ethra aanu, and pay with ithaa, nooru roopa, anchu koodi.',
    'Go to a wedding: wish with chechi, aashamsakaḷ, ask chechi, ningaḷ kazhicho, be sent to eat with avide poyi kazhikku, and leave with venda, chechi, njan pokatte.',
  ],
  lessons: [l5u1l1, l5u2l1, l5u3l1, l5u4l1, l5u5l1, l5u6l1, l5u7l1, l5u8l1],
};
