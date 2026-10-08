import type { Level } from '../types';
import { l3u1l1 } from './l3u1l1';
import { l3u1l2 } from './l3u1l2';
import { l3u1l3 } from './l3u1l3';
import { l3u1l4 } from './l3u1l4';
import { l3u1l5 } from './l3u1l5';
import { l3u1l6 } from './l3u1l6';
import { l3u2l1 } from './l3u2l1';

export const level3: Level = {
  id: 'l3',
  name: 'Level 3 — Places and Cases',
  canDo: [
    'Put places on the map: -il for in and at, -kku for to and for, -ilekk for heading to.',
    'Say who things belong to with -nte and -ude: ente, avante, avaḷude, nammude.',
    'Add -um for too and for and: njanum, chaayayum kaappiyum.',
    'Say how things turn out with -aayi (ee bucket full aayi) and where things come from with -il ninn (officil ninn).',
    'Attach Malayalam case suffixes to English words the way Kerala talks: officil, jolikku, busil, hotelilekk, businte, busil ninn — and the native kada.',
    'Build the everyday frame: person + place + verb.',
    'Ask which, what and where with the ... aanu ...ath question: nee eth schoolil aanu padichath.',
  ],
  lessons: [l3u1l1, l3u1l2, l3u1l3, l3u1l4, l3u1l5, l3u1l6, l3u2l1],
};
