import type { Level } from '../types';
import { l3u1l1 } from './l3u1l1';
import { l3u1l2 } from './l3u1l2';
import { l3u1l3 } from './l3u1l3';

export const level3: Level = {
  id: 'l3',
  name: 'Level 3 — Places and Cases',
  canDo: [
    'Put places on the map: -il for in and at, -kku for to and for, -ilekk for heading to.',
    'Attach Malayalam case suffixes to English words the way Kerala talks: officil, jolikku, shoppil, busil, hotelilekk.',
    'Build the everyday frame: person + place + verb.',
  ],
  lessons: [l3u1l1, l3u1l2, l3u1l3],
};
