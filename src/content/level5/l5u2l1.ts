import type { Lesson } from '../types';

/**
 * Level 5 Unit 2 Lesson 1 — at the market (PLAN.md §5 Level 5): the second
 * dialogue scene. The learner opens this one — point at the vegetables and
 * ask the price — and the stall keeper answers, so the first turn carries a
 * word-bank drill instead of a role-play. Every learner turn after it has a
 * role-play drill cued by the line before it. The English slot-in here is
 * kilo, and the scene is one round of market haggling: too much, a lower
 * price, half a kilo, and enough.
 */
export const l5u2l1: Lesson = {
  id: 'l5u2l1',
  levelId: 'l5',
  unitId: 'l5u2',
  title: 'At the market',
  comprehensionOnly: false,
  items: [
    {
      id: 'chetta-thakkaali-ethra-aanu',
      manglish: 'chetta, thakkaaḷi ethra aanu',
      script: 'ചേട്ടാ തക്കാളി എത്ര ആണ്',
      meaning: 'chetta, how much are the tomatoes?',
      kind: 'sentence',
      audio: {
        slow: 'l5u2l1_chetta-thakkaali-ethra-aanu_slow',
        medium: 'l5u2l1_chetta-thakkaali-ethra-aanu_medium',
        normal: 'l5u2l1_chetta-thakkaali-ethra-aanu_normal',
      },
      sentence: {
        bank: ['chetta,', 'thakkaaḷi', 'ethra', 'aanu', 'kilo'],
        orders: ['chetta, thakkaaḷi ethra aanu', 'thakkaaḷi ethra aanu'],
        parts: [
          { word: 'chetta,', meaning: 'chetta! — the call form of chettan' },
          { word: 'thakkaaḷi', meaning: 'tomatoes' },
          { word: 'ethra', meaning: 'how much' },
          { word: 'aanu', meaning: 'is' },
        ],
      },
      notes: [
        'The market question: name what you want and ask ethra aanu.',
        'Thakkaaḷi is tomatoes — the same ḷ sound as in veḷḷam, and the shopkeeper will say thakkaaḷi back.',
      ],
      tags: [],
    },
    {
      id: 'irupathu-roopa',
      manglish: 'irupathu roopa',
      script: 'ഇരുപത് രൂപ',
      meaning: 'twenty rupees',
      kind: 'sentence',
      audio: {
        slow: 'l5u2l1_irupathu-roopa_slow',
        medium: 'l5u2l1_irupathu-roopa_medium',
        normal: 'l5u2l1_irupathu-roopa_normal',
      },
      sentence: {
        bank: ['irupathu', 'roopa', 'pathinettu'],
        orders: ['irupathu roopa'],
        parts: [
          { word: 'irupathu', meaning: 'twenty' },
          { word: 'roopa', meaning: 'rupees' },
        ],
      },
      notes: [
        'Irupathu is twenty. A price is always the number and roopa, the same shape as patthu roopa.',
        'The price comes back whole: irupathu roopa, twenty rupees — for a kilo, unless you say otherwise.',
      ],
      tags: [],
    },
    {
      id: 'athu-kooduthal-aanu',
      manglish: 'athu kooduthal aanu',
      script: 'അത് കൂടുതൽ ആണ്',
      meaning: "that's too much",
      kind: 'sentence',
      audio: {
        slow: 'l5u2l1_athu-kooduthal-aanu_slow',
        medium: 'l5u2l1_athu-kooduthal-aanu_medium',
        normal: 'l5u2l1_athu-kooduthal-aanu_normal',
      },
      acceptedInputs: ['athu kooduthal aanu'],
      sentence: {
        bank: ['athu', 'kooduthal', 'aanu', 'mathi'],
        orders: ['athu kooduthal aanu'],
        parts: [
          { word: 'athu', meaning: 'that' },
          { word: 'kooduthal', meaning: 'more, too much' },
          { word: 'aanu', meaning: 'is' },
        ],
      },
      notes: [
        'Kooduthal is more; said at a stall it means too much.',
        'The gentle first move of any market haggle: athu kooduthal aanu. The price usually drops.',
      ],
      tags: [],
    },
    {
      id: 'pathinettu-roopa',
      manglish: 'pathinettu roopa',
      script: 'പതിനെട്ട് രൂപ',
      meaning: 'eighteen rupees',
      kind: 'sentence',
      audio: {
        slow: 'l5u2l1_pathinettu-roopa_slow',
        medium: 'l5u2l1_pathinettu-roopa_medium',
        normal: 'l5u2l1_pathinettu-roopa_normal',
      },
      sentence: {
        bank: ['pathinettu', 'roopa', 'irupathu'],
        orders: ['pathinettu roopa'],
        parts: [
          { word: 'pathinettu', meaning: 'eighteen' },
          { word: 'roopa', meaning: 'rupees' },
        ],
      },
      notes: [
        'Pathinettu is eighteen — the price after one round of kooduthal.',
        'The number is the whole answer: no word for price is needed.',
      ],
      tags: [],
    },
    {
      id: 'arai-kilo-mathi',
      manglish: 'arai kilo mathi',
      script: 'അര കിലോ മതി',
      meaning: 'half a kilo is enough',
      kind: 'sentence',
      audio: {
        slow: 'l5u2l1_arai-kilo-mathi_slow',
        medium: 'l5u2l1_arai-kilo-mathi_medium',
        normal: 'l5u2l1_arai-kilo-mathi_normal',
      },
      sentence: {
        bank: ['arai', 'kilo', 'mathi'],
        orders: ['arai kilo mathi'],
        parts: [
          { word: 'arai', meaning: 'half' },
          { word: 'kilo', meaning: 'kilo' },
          { word: 'mathi', meaning: 'is enough' },
        ],
      },
      notes: [
        'Arai is half, and kilo is the English word everyone uses for vegetables — arai kilo, half a kilo.',
        'Mathi is enough: it settles the amount without refusing anything.',
      ],
      tags: [],
    },
    {
      id: 'vere-vallathum-veno',
      manglish: 'vere vallathum veno',
      script: 'വേറെ വല്ലതും വേണോ',
      meaning: 'do you want anything else?',
      kind: 'sentence',
      audio: {
        slow: 'l5u2l1_vere-vallathum-veno_slow',
        medium: 'l5u2l1_vere-vallathum-veno_medium',
        normal: 'l5u2l1_vere-vallathum-veno_normal',
      },
      sentence: {
        bank: ['vere', 'vallathum', 'veno', 'mathi'],
        orders: ['vere vallathum veno'],
        parts: [
          { word: 'vere', meaning: 'other' },
          { word: 'vallathum', meaning: 'anything' },
          { word: 'veno', meaning: 'want?, do you want?' },
        ],
      },
      notes: [
        'Vallathum is anything; vere makes it anything else.',
        'The stall keeper asks this once the bag is on the scale.',
      ],
      tags: [],
    },
    {
      id: 'illa-ithu-mathi',
      manglish: 'illa, ithu mathi',
      script: 'ഇല്ല ഇതു മതി',
      meaning: 'no, that is all',
      kind: 'sentence',
      audio: {
        slow: 'l5u2l1_illa-ithu-mathi_slow',
        medium: 'l5u2l1_illa-ithu-mathi_medium',
        normal: 'l5u2l1_illa-ithu-mathi_normal',
      },
      sentence: {
        bank: ['illa,', 'ithu', 'mathi', 'venam'],
        orders: ['illa, ithu mathi'],
        parts: [
          { word: 'illa,', meaning: 'no' },
          { word: 'ithu', meaning: 'this' },
          { word: 'mathi', meaning: 'is enough' },
        ],
      },
      notes: [
        'Illa starts the answer and mathi finishes it: no, this is enough.',
        'Said with a smile it closes the buying, and the keeper weighs it out.',
      ],
      tags: [],
    },
    {
      id: 'sheri-patthu-roopa',
      manglish: 'sheri, patthu roopa',
      script: 'ശരി പത്ത് രൂപ',
      meaning: 'okay, ten rupees',
      kind: 'sentence',
      audio: {
        slow: 'l5u2l1_sheri-patthu-roopa_slow',
        medium: 'l5u2l1_sheri-patthu-roopa_medium',
        normal: 'l5u2l1_sheri-patthu-roopa_normal',
      },
      sentence: {
        bank: ['sheri,', 'patthu', 'roopa', 'pathinettu'],
        orders: ['sheri, patthu roopa'],
        parts: [
          { word: 'sheri,', meaning: 'okay' },
          { word: 'patthu', meaning: 'ten' },
          { word: 'roopa', meaning: 'rupees' },
        ],
      },
      notes: [
        'The deal closes on sheri and a number: sheri, patthu roopa.',
        'Patthu is ten, the same word as the tea shop price.',
      ],
      tags: [],
    },
  ],
  minimalPairs: [],
  drills: [
    { kind: 'sentenceBuilder', itemId: 'chetta-thakkaali-ethra-aanu', mode: 'bank' },
    { kind: 'rolePlay', itemId: 'athu-kooduthal-aanu', promptItemId: 'irupathu-roopa', mode: 'typing' },
    { kind: 'rolePlay', itemId: 'arai-kilo-mathi', promptItemId: 'pathinettu-roopa', mode: 'bank' },
    { kind: 'rolePlay', itemId: 'illa-ithu-mathi', promptItemId: 'vere-vallathum-veno', mode: 'bank' },
    { kind: 'multipleChoice', itemId: 'sheri-patthu-roopa', distractors: ['half a kilo is enough', 'twenty rupees'] },
  ],
  reviewSlots: 0,
  spriteId: 'l5u2l1',
};
