import type { Lesson } from '../types';

/**
 * Level 5 Unit 3 Lesson 1 — the auto ride (PLAN.md §5 Level 5): the third
 * dialogue scene. Seven turns, and the learner opens it: the destination, the
 * driver's go-ahead, the fare question, the fare, the stop, the driver's
 * check, and the yes. The fare is a plain exchange — shop scenes do not
 * haggle (native-speaker ruling 2026-10-12) and neither does the road: the
 * price is asked, answered and taken. Every driver turn is a cue; each
 * learner turn after the opener carries a role-play drill whose cue is the
 * line right before it, so the ride plays through as a conversation.
 */
export const l5u3l1: Lesson = {
  id: 'l5u3l1',
  levelId: 'l5',
  unitId: 'l5u3',
  title: 'The auto ride',
  comprehensionOnly: false,
  items: [
    {
      id: 'chetta-veettilekku-pokaam',
      manglish: 'chetta, veettilekku pokaam',
      script: 'ചേട്ടാ വീട്ടിലേക്ക് പോകാം',
      meaning: "chetta, let's go home",
      kind: 'sentence',
      audio: {
        slow: 'l5u3l1_chetta-veettilekku-pokaam_slow',
        medium: 'l5u3l1_chetta-veettilekku-pokaam_medium',
        normal: 'l5u3l1_chetta-veettilekku-pokaam_normal',
      },
      acceptedInputs: ['chetta veettilekku pokaam', 'veettilekku pokaam'],
      sentence: {
        bank: ['chetta,', 'veettilekku', 'pokaam', 'evide'],
        orders: ['chetta, veettilekku pokaam'],
        parts: [
          { word: 'chetta,', meaning: 'chetta! — the call form of chettan' },
          { word: 'veettilekku', meaning: 'to the house' },
          { word: 'pokaam', meaning: "let's go" },
        ],
      },
      notes: [
        'The learner opens the ride: the chetta again, then the place, then pokaam — let us go.',
        'Veettilekku is to the house, built like hotelilekk and busilekk from the bus lessons. Veettil is at home; this is the one that moves.',
      ],
      tags: [],
    },
    {
      id: 'sheri-keri',
      manglish: 'sheri, keri',
      script: 'ശരി കേറി',
      meaning: 'okay, get in',
      kind: 'sentence',
      audio: {
        slow: 'l5u3l1_sheri-keri_slow',
        medium: 'l5u3l1_sheri-keri_medium',
        normal: 'l5u3l1_sheri-keri_normal',
      },
      sentence: {
        bank: ['sheri,', 'keri', 'pokaam'],
        orders: ['sheri, keri'],
        parts: [
          { word: 'sheri,', meaning: 'okay' },
          { word: 'keri', meaning: 'get in' },
        ],
      },
      notes: [
        'The driver takes the destination and opens the door in two words.',
        'Keri is the get-in from njan busil keri — the step up into an auto, and the word the driver says as he pulls the door.',
      ],
      tags: [],
    },
    {
      id: 'ethra-aayi-auto',
      manglish: 'ethra aayi, chetta',
      script: 'എത്ര ആയി ചേട്ടാ',
      meaning: 'how much is it, chetta?',
      kind: 'sentence',
      audio: {
        slow: 'l5u3l1_ethra-aayi-auto_slow',
        medium: 'l5u3l1_ethra-aayi-auto_medium',
        normal: 'l5u3l1_ethra-aayi-auto_normal',
      },
      acceptedInputs: ['ethra aayi chetta', 'ethra aayi'],
      sentence: {
        bank: ['ethra', 'aayi,', 'chetta', 'roopa'],
        orders: ['ethra aayi, chetta'],
        parts: [
          { word: 'ethra', meaning: 'how much' },
          { word: 'aayi,', meaning: 'did it come to' },
          { word: 'chetta', meaning: 'chetta! — the call form of chettan' },
        ],
      },
      notes: [
        'The fare question from the tea shop, asked before the auto pulls out this time.',
        'Ethra aayi asks what it comes to, and the chetta on the end keeps it friendly, exactly as at the counter.',
      ],
      tags: [],
    },
    {
      id: 'nooru-roopa',
      manglish: 'nooru roopa',
      script: 'നൂറ് രൂപ',
      meaning: 'a hundred rupees',
      kind: 'sentence',
      audio: {
        slow: 'l5u3l1_nooru-roopa_slow',
        medium: 'l5u3l1_nooru-roopa_medium',
        normal: 'l5u3l1_nooru-roopa_normal',
      },
      sentence: {
        bank: ['nooru', 'roopa', 'ethra'],
        orders: ['nooru roopa'],
        parts: [
          { word: 'nooru', meaning: 'a hundred' },
          { word: 'roopa', meaning: 'rupees' },
        ],
      },
      notes: [
        'Nooru is a hundred: patthu with two noughts on it, the biggest counting word the ride needs.',
        'The fare comes back the way the price did at the stall — the number and roopa, nothing else.',
      ],
      tags: [],
    },
    {
      id: 'ivide-nirtthu',
      manglish: 'ivide nirtthu',
      script: 'ഇവിടെ നിർത്ത്',
      meaning: 'stop here',
      kind: 'sentence',
      audio: {
        slow: 'l5u3l1_ivide-nirtthu_slow',
        medium: 'l5u3l1_ivide-nirtthu_medium',
        normal: 'l5u3l1_ivide-nirtthu_normal',
      },
      acceptedInputs: ['ivide nirtthu', 'ivide nirthu'],
      sentence: {
        bank: ['ivide', 'nirtthu', 'evide'],
        orders: ['ivide nirtthu'],
        parts: [
          { word: 'ivide', meaning: 'here' },
          { word: 'nirtthu', meaning: 'stop' },
        ],
      },
      notes: [
        'Nirtthu is stop, said to the driver when the corner you want is coming up.',
        'The doubled tt is the held sound in the middle, the same held tt as eduttho at the stall.',
      ],
      tags: [],
    },
    {
      id: 'ivide-aano',
      manglish: 'ivide aano',
      script: 'ഇവിടെ ആണോ',
      meaning: 'here?',
      kind: 'sentence',
      audio: {
        slow: 'l5u3l1_ivide-aano_slow',
        medium: 'l5u3l1_ivide-aano_medium',
        normal: 'l5u3l1_ivide-aano_normal',
      },
      sentence: {
        bank: ['ivide', 'aano', 'evide'],
        orders: ['ivide aano'],
        parts: [
          { word: 'ivide', meaning: 'here' },
          { word: 'aano', meaning: 'is it?' },
        ],
      },
      notes: [
        'Aano is the is-it question from ningaḷ ready aano: the driver checks the spot before he stops.',
        'The learner answers with athe, the yes from the greetings.',
      ],
      tags: [],
    },
    {
      id: 'athe-ivide-mathi',
      manglish: 'athe, ivide mathi',
      script: 'അതെ ഇവിടെ മതി',
      meaning: 'yes, here is fine',
      kind: 'sentence',
      audio: {
        slow: 'l5u3l1_athe-ivide-mathi_slow',
        medium: 'l5u3l1_athe-ivide-mathi_medium',
        normal: 'l5u3l1_athe-ivide-mathi_normal',
      },
      acceptedInputs: ['athe ivide mathi', 'ivide mathi'],
      sentence: {
        bank: ['athe,', 'ivide', 'mathi', 'venda'],
        orders: ['athe, ivide mathi'],
        parts: [
          { word: 'athe,', meaning: 'yes' },
          { word: 'ivide', meaning: 'here' },
          { word: 'mathi', meaning: 'enough; that will do' },
        ],
      },
      notes: [
        'The yes of the whole ride: athe, and then the same mathi as venda, ithu mathi at the stall — enough, this is the spot.',
        'Athe is the yes from the greetings lesson, so the scene closes on a word the learner already owns.',
      ],
      tags: [],
    },
  ],
  minimalPairs: [],
  drills: [
    { kind: 'sentenceBuilder', itemId: 'chetta-veettilekku-pokaam', mode: 'bank' },
    { kind: 'rolePlay', itemId: 'ethra-aayi-auto', promptItemId: 'sheri-keri', mode: 'typing' },
    { kind: 'rolePlay', itemId: 'ivide-nirtthu', promptItemId: 'nooru-roopa', mode: 'bank' },
    { kind: 'rolePlay', itemId: 'athe-ivide-mathi', promptItemId: 'ivide-aano', mode: 'bank' },
    { kind: 'multipleChoice', itemId: 'nooru-roopa', distractors: ['okay, get in', 'stop here'] },
  ],
  reviewSlots: 0,
  spriteId: 'l5u3l1',
};
