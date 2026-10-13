import type { Lesson } from '../types';

/**
 * Level 5 Unit 7 Lesson 1 — a meal at the hotel (PLAN.md §5 Level 5): the
 * seventh dialogue scene. The learner orders, the waiter takes it and asks
 * whether anything else is wanted, the meal arrives, and the bill closes the
 * scene — asked for, answered, paid, with a small tip on top. Seven turns,
 * the learner opening, every role-play cued by the line before it. Tipping is
 * optional in Kerala (native-speaker ruling 2026-10-12), so the note on the
 * last line says so in plain English: five on a hundred is a thank-you, never
 * something the waiter is waiting for. A hotel in Kerala is where you eat, and
 * the first note says that too (PLAN.md §5).
 */
export const l5u7l1: Lesson = {
  id: 'l5u7l1',
  levelId: 'l5',
  unitId: 'l5u7',
  title: 'A meal at the hotel',
  comprehensionOnly: false,
  items: [
    {
      id: 'chetta-oru-choru-venam',
      manglish: 'chetta, oru choru venam',
      script: 'ചേട്ടാ ഒരു ചോറ് വേണം',
      meaning: 'chetta, I want a meal',
      kind: 'sentence',
      audio: {
        slow: 'l5u7l1_chetta-oru-choru-venam_slow',
        medium: 'l5u7l1_chetta-oru-choru-venam_medium',
        normal: 'l5u7l1_chetta-oru-choru-venam_normal',
      },
      acceptedInputs: ['chetta oru choru venam', 'oru choru venam'],
      sentence: {
        bank: ['chetta,', 'oru', 'choru', 'venam', 'chaaya'],
        orders: ['chetta, oru choru venam', 'oru choru venam'],
        parts: [
          { word: 'chetta,', meaning: 'chetta! — the call form of chettan' },
          { word: 'oru', meaning: 'one' },
          { word: 'choru', meaning: 'rice; the meal' },
          { word: 'venam', meaning: 'want' },
        ],
      },
      notes: [
        'Choru is cooked rice, and in a hotel it means the meal — the rice with the curries that come with it.',
        'A hotel in Kerala is where you eat: the everyday word for a restaurant, not a place to sleep.',
        'Venam is the want from the tea shop, and it takes the same shape here — what you want, then venam.',
      ],
      tags: [],
    },
    {
      id: 'sheri-chetta-vere-vallathum-veno',
      manglish: 'sheri, chetta, vere vallathum veno',
      script: 'ശരി ചേട്ടാ വേറെ വല്ലതും വേണോ',
      meaning: 'okay, chetta — anything else?',
      kind: 'sentence',
      audio: {
        slow: 'l5u7l1_sheri-chetta-vere-vallathum-veno_slow',
        medium: 'l5u7l1_sheri-chetta-vere-vallathum-veno_medium',
        normal: 'l5u7l1_sheri-chetta-vere-vallathum-veno_normal',
      },
      acceptedInputs: ['sheri chetta vere vallathum veno', 'vere vallathum veno'],
      sentence: {
        bank: ['sheri,', 'chetta,', 'vere', 'vallathum', 'veno', 'mathi'],
        orders: ['sheri, chetta, vere vallathum veno', 'vere vallathum veno'],
        parts: [
          { word: 'sheri,', meaning: 'okay' },
          { word: 'chetta,', meaning: 'chetta! — the call form of chettan' },
          { word: 'vere', meaning: 'other' },
          { word: 'vallathum', meaning: 'anything' },
          { word: 'veno', meaning: 'want?' },
        ],
      },
      notes: [
        'The waiter writes the order down and asks the same anything-else question the market taught.',
        'It is the room the learner gets to add the tea in.',
      ],
      tags: [],
    },
    {
      id: 'oru-chaaya-koodi',
      manglish: 'oru chaaya koodi',
      script: 'ഒരു ചായ കൂടി',
      meaning: 'a tea as well',
      kind: 'sentence',
      audio: {
        slow: 'l5u7l1_oru-chaaya-koodi_slow',
        medium: 'l5u7l1_oru-chaaya-koodi_medium',
        normal: 'l5u7l1_oru-chaaya-koodi_normal',
      },
      sentence: {
        bank: ['oru', 'chaaya', 'koodi', 'kaappi'],
        orders: ['oru chaaya koodi'],
        parts: [
          { word: 'oru', meaning: 'one' },
          { word: 'chaaya', meaning: 'tea' },
          { word: 'koodi', meaning: 'as well; on top' },
        ],
      },
      notes: [
        'Koodi is the as-well word from the tea shop: one tea on top of the meal.',
        'Kaappi is the other drink of every Kerala hotel, if coffee is the one you want.',
      ],
      tags: [],
    },
    {
      id: 'ithaa-choru',
      manglish: 'ithaa, choru',
      script: 'ഇതാ ചോറ്',
      meaning: "here's your meal",
      kind: 'sentence',
      audio: {
        slow: 'l5u7l1_ithaa-choru_slow',
        medium: 'l5u7l1_ithaa-choru_medium',
        normal: 'l5u7l1_ithaa-choru_normal',
      },
      acceptedInputs: ['ithaa choru'],
      sentence: {
        bank: ['ithaa,', 'choru', 'chaaya'],
        orders: ['ithaa, choru'],
        parts: [
          { word: 'ithaa,', meaning: 'here you are' },
          { word: 'choru', meaning: 'rice; the meal' },
        ],
      },
      notes: [
        'The waiter sets it down with ithaa — here you are — the word for handing something over.',
        'The meal comes first and the money comes at the end, so the learner eats before the bill is ever mentioned.',
      ],
      tags: [],
    },
    {
      id: 'chetta-bill-ethra-aanu',
      manglish: 'chetta, bill ethra aanu',
      script: 'ചേട്ടാ ബിൽ എത്ര ആണ്',
      meaning: 'chetta, what is the bill?',
      kind: 'sentence',
      audio: {
        slow: 'l5u7l1_chetta-bill-ethra-aanu_slow',
        medium: 'l5u7l1_chetta-bill-ethra-aanu_medium',
        normal: 'l5u7l1_chetta-bill-ethra-aanu_normal',
      },
      acceptedInputs: ['chetta bill ethra aanu', 'bill ethra aanu'],
      sentence: {
        bank: ['chetta,', 'bill', 'ethra', 'aanu', 'roopa'],
        orders: ['chetta, bill ethra aanu', 'bill ethra aanu'],
        parts: [
          { word: 'chetta,', meaning: 'chetta! — the call form of chettan' },
          { word: 'bill', meaning: 'the bill' },
          { word: 'ethra', meaning: 'how much' },
          { word: 'aanu', meaning: 'is' },
        ],
      },
      notes: [
        'Bill is the English word, and in a Kerala hotel it is the word everyone uses for it.',
        'Ethra aanu is the how-much-is-it frame from the stall and the ride, with bill in front of it.',
      ],
      tags: [],
    },
    {
      id: 'nooru-roopa-hotel',
      manglish: 'nooru roopa',
      script: 'നൂറ് രൂപ',
      meaning: 'a hundred rupees',
      kind: 'sentence',
      audio: {
        slow: 'l5u7l1_nooru-roopa-hotel_slow',
        medium: 'l5u7l1_nooru-roopa-hotel_medium',
        normal: 'l5u7l1_nooru-roopa-hotel_normal',
      },
      sentence: {
        bank: ['nooru', 'roopa', 'irupathu'],
        orders: ['nooru roopa'],
        parts: [
          { word: 'nooru', meaning: 'a hundred' },
          { word: 'roopa', meaning: 'rupees' },
        ],
      },
      notes: [
        'The meal and the tea together come to the round hundred.',
        'The bill comes back the way every price does: the number and roopa, nothing else.',
      ],
      tags: [],
    },
    {
      id: 'ithaa-nooru-roopa-anchu-koodi',
      manglish: 'ithaa, nooru roopa, anchu koodi',
      script: 'ഇതാ നൂറ് രൂപ അഞ്ച് കൂടി',
      meaning: "here's a hundred rupees, and five more",
      kind: 'sentence',
      audio: {
        slow: 'l5u7l1_ithaa-nooru-roopa-anchu-koodi_slow',
        medium: 'l5u7l1_ithaa-nooru-roopa-anchu-koodi_medium',
        normal: 'l5u7l1_ithaa-nooru-roopa-anchu-koodi_normal',
      },
      acceptedInputs: ['ithaa nooru roopa anchu koodi', 'nooru roopa anchu koodi'],
      sentence: {
        bank: ['ithaa,', 'nooru', 'roopa,', 'anchu', 'koodi'],
        orders: ['ithaa, nooru roopa, anchu koodi', 'nooru roopa, anchu koodi'],
        parts: [
          { word: 'ithaa,', meaning: 'here you are' },
          { word: 'nooru', meaning: 'a hundred' },
          { word: 'roopa,', meaning: 'rupees' },
          { word: 'anchu', meaning: 'five' },
          { word: 'koodi', meaning: 'as well; on top' },
        ],
      },
      notes: [
        'Anchu is five, and koodi is the as-well word again: the hundred for the meal, and five on top of it.',
        'Tipping is optional in Kerala — five on a hundred is a small thank-you on the way out, never something the waiter is waiting for.',
      ],
      tags: [],
    },
  ],
  minimalPairs: [],
  drills: [
    { kind: 'sentenceBuilder', itemId: 'chetta-oru-choru-venam', mode: 'bank' },
    { kind: 'rolePlay', itemId: 'oru-chaaya-koodi', promptItemId: 'sheri-chetta-vere-vallathum-veno', mode: 'typing' },
    { kind: 'rolePlay', itemId: 'chetta-bill-ethra-aanu', promptItemId: 'ithaa-choru', mode: 'bank' },
    { kind: 'rolePlay', itemId: 'ithaa-nooru-roopa-anchu-koodi', promptItemId: 'nooru-roopa-hotel', mode: 'typing' },
    {
      kind: 'multipleChoice',
      itemId: 'nooru-roopa-hotel',
      distractors: ['a tea as well', 'chetta, what is the bill?'],
    },
  ],
  reviewSlots: 0,
  spriteId: 'l5u7l1',
};
