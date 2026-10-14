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
    'Ride an auto to the hospital: ask government hospital-ilekk povumo, hear kerikko, stop it with ivide nirtthikko, ask ethra aayi chetta, hear nooru roopa, and end with ok, thank you.',
    'Call about someone: open with hello, ask hello, babunte veedu aano, hear athelo, pakshe babu ippo sthalath illallo, ask eppo varum enn ariyamo, and leave a message to pass on — babu verumbo suresh call cheythayirunnu enn paranjal mathi.',
    'Visit family unannounced: greet with hello, chechi, enna und vishesham, explain the visit with kurach kaalam aayallo ellarem kanditt, hear keri vaa, ellarum und, turn the tea down with venda chechi, kozhappamilla, and leave with enna njan iranguva, pinne oru dhivasam varaam.',
    'Ride the bus: ask chechi, ee bus pala vazhi aano pokunnath at the door, get in on athe, kerikko, and buy for two with chechi, rand pala when the conductor reaches your seat — muppathu roopa, with ithaa baakki irupathu coming back in change.',
    'Eat at a hotel: ask chetta, chicken biriyani undo, order with oru chicken biriyaniyum oru fresh lime-um edukkaamo chetta, turn the anything-else down with vere onnum venda chetta, hear ok, oru pathinanchu minute, and close with appo sheri chetta, kaanam.',
    'Meet a friend at a wedding: greet with hello bro, enna und vishesham, answer with sugham aayitt irikkunneda, ask oh ingane pokunnu, kazhicho, and sit down together with enna vaa irikkam.',
  ],
  lessons: [l5u1l1, l5u2l1, l5u3l1, l5u4l1, l5u5l1, l5u6l1, l5u7l1, l5u8l1],
};
