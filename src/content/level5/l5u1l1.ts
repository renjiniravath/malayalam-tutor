import type { Lesson } from '../types';

/**
 * Level 5 Unit 1 Lesson 1 — at the tea shop (PLAN.md §5 Level 5): the first
 * dialogue scene. Eight turns, four from the chettan behind the counter and
 * four from the learner, in the order they are said. The chettan's turns are
 * the cues; each learner turn carries a role-play drill whose cue is the
 * line right before it, so the scene plays through as a conversation.
 * The English slot-in is sugar, which goes into the sentence untouched.
 */
export const l5u1l1: Lesson = {
  id: 'l5u1l1',
  levelId: 'l5',
  unitId: 'l5u1',
  title: 'At the tea shop',
  comprehensionOnly: false,
  items: [
    {
      id: 'oru-chaaya-veno',
      manglish: 'oru chaaya veno',
      script: 'ഒരു ചായ വേണോ',
      meaning: 'do you want a tea?',
      kind: 'sentence',
      audio: {
        slow: 'l5u1l1_oru-chaaya-veno_slow',
        medium: 'l5u1l1_oru-chaaya-veno_medium',
        normal: 'l5u1l1_oru-chaaya-veno_normal',
      },
      sentence: {
        bank: ['oru', 'chaaya', 'veno', 'venda'],
        orders: ['oru chaaya veno'],
        parts: [
          { word: 'oru', meaning: 'a, one' },
          { word: 'chaaya', meaning: 'tea' },
          { word: 'veno', meaning: 'want?, do you want?' },
        ],
      },
      notes: [
        'The tea shop opens with this: oru chaaya veno, do you want a tea.',
        'Veno asks the question; the answer comes back as venam (I want) or venda (I do not want).',
      ],
      tags: [],
    },
    {
      id: 'athe-oru-chaaya',
      manglish: 'athe, oru chaaya',
      script: 'അതെ ഒരു ചായ',
      meaning: 'yes, one tea',
      kind: 'sentence',
      audio: {
        slow: 'l5u1l1_athe-oru-chaaya_slow',
        medium: 'l5u1l1_athe-oru-chaaya_medium',
        normal: 'l5u1l1_athe-oru-chaaya_normal',
      },
      acceptedInputs: ['athe oru chaaya', 'oru chaaya'],
      sentence: {
        bank: ['athe,', 'oru', 'chaaya', 'venda'],
        orders: ['athe, oru chaaya'],
        parts: [
          { word: 'athe,', meaning: 'yes' },
          { word: 'oru', meaning: 'a, one' },
          { word: 'chaaya', meaning: 'tea' },
        ],
      },
      notes: [
        'Athe is the plain yes from the greetings lesson, and it is how an order starts.',
        'The count word comes first: oru chaaya, one tea.',
      ],
      tags: [],
    },
    {
      id: 'sugar-veno',
      manglish: 'sugar veno',
      script: 'ഷുഗർ വേണോ',
      meaning: 'do you want sugar?',
      kind: 'sentence',
      audio: {
        slow: 'l5u1l1_sugar-veno_slow',
        medium: 'l5u1l1_sugar-veno_medium',
        normal: 'l5u1l1_sugar-veno_normal',
      },
      sentence: {
        bank: ['sugar', 'veno', 'venda'],
        orders: ['sugar veno'],
        parts: [
          { word: 'sugar', meaning: 'sugar' },
          { word: 'veno', meaning: 'want?, do you want?' },
        ],
      },
      notes: [
        'The English word sugar walks straight into the sentence — nothing is added to it, and veno still does the asking.',
        'Everyday Malayalam is full of words like this: sugar, parcel, kilo. They behave like any other word.',
      ],
      tags: [],
    },
    {
      id: 'sugar-venda',
      manglish: 'sugar venda',
      script: 'ഷുഗർ വേണ്ട',
      meaning: 'no sugar',
      kind: 'sentence',
      audio: {
        slow: 'l5u1l1_sugar-venda_slow',
        medium: 'l5u1l1_sugar-venda_medium',
        normal: 'l5u1l1_sugar-venda_normal',
      },
      acceptedInputs: ['sugar venda'],
      sentence: {
        bank: ['sugar', 'venda', 'venam'],
        orders: ['sugar venda'],
        parts: [
          { word: 'sugar', meaning: 'sugar' },
          { word: 'venda', meaning: 'do not want' },
        ],
      },
      notes: [
        'Venda is the no of wanting; it refuses the thing in front of it.',
        'Said here it means no sugar in the tea — the shopkeeper hears the sugar and the venda together.',
      ],
      tags: [],
    },
    {
      id: 'ithaa-chaaya',
      manglish: 'ithaa chaaya',
      script: 'ഇതാ ചായ',
      meaning: 'here is your tea',
      kind: 'sentence',
      audio: {
        slow: 'l5u1l1_ithaa-chaaya_slow',
        medium: 'l5u1l1_ithaa-chaaya_medium',
        normal: 'l5u1l1_ithaa-chaaya_normal',
      },
      sentence: {
        bank: ['ithaa', 'chaaya'],
        orders: ['ithaa chaaya'],
        parts: [
          { word: 'ithaa', meaning: 'here you are' },
          { word: 'chaaya', meaning: 'tea' },
        ],
      },
      notes: [
        'Ithaa hands something over — here it is, take it.',
        'The tea lands on the counter and the next thing asked is the price.',
      ],
      tags: [],
    },
    {
      id: 'chetta-ethra-aanu',
      manglish: 'chetta, ethra aanu',
      script: 'ചേട്ടാ എത്ര ആണ്',
      meaning: 'chetta, how much is it?',
      kind: 'sentence',
      audio: {
        slow: 'l5u1l1_chetta-ethra-aanu_slow',
        medium: 'l5u1l1_chetta-ethra-aanu_medium',
        normal: 'l5u1l1_chetta-ethra-aanu_normal',
      },
      acceptedInputs: ['chetta ethra aanu', 'ethra aanu'],
      sentence: {
        bank: ['chetta,', 'ethra', 'aanu', 'roopa'],
        orders: ['chetta, ethra aanu', 'ethra aanu'],
        parts: [
          { word: 'chetta,', meaning: 'chetta! — the call form of chettan' },
          { word: 'ethra', meaning: 'how much' },
          { word: 'aanu', meaning: 'is' },
        ],
      },
      notes: [
        'The price question you will use most: chetta, ethra aanu.',
        'Ethra is how much, the same word as in ithu ethra aanu.',
        'The chetta can be left off — ethra aanu on its own asks the same thing.',
      ],
      tags: [],
    },
    {
      id: 'patthu-roopa',
      manglish: 'patthu roopa',
      script: 'പത്ത് രൂപ',
      meaning: 'ten rupees',
      kind: 'sentence',
      audio: {
        slow: 'l5u1l1_patthu-roopa_slow',
        medium: 'l5u1l1_patthu-roopa_medium',
        normal: 'l5u1l1_patthu-roopa_normal',
      },
      sentence: {
        bank: ['patthu', 'roopa', 'ethra'],
        orders: ['patthu roopa'],
        parts: [
          { word: 'patthu', meaning: 'ten' },
          { word: 'roopa', meaning: 'rupees' },
        ],
      },
      notes: [
        'Patthu is ten, the counting word from the numbers lesson.',
        'A price is the number and roopa, nothing else.',
      ],
      tags: [],
    },
    {
      id: 'sheri-pinne-kaanam',
      manglish: 'sheri, pinne kaanam',
      script: 'ശരി പിന്നെ കാണാം',
      meaning: 'okay, see you',
      kind: 'sentence',
      audio: {
        slow: 'l5u1l1_sheri-pinne-kaanam_slow',
        medium: 'l5u1l1_sheri-pinne-kaanam_medium',
        normal: 'l5u1l1_sheri-pinne-kaanam_normal',
      },
      acceptedInputs: ['sheri pinne kaanam', 'pinne kaanam'],
      sentence: {
        bank: ['sheri,', 'pinne', 'kaanam'],
        orders: ['sheri, pinne kaanam'],
        parts: [
          { word: 'sheri,', meaning: 'okay' },
          { word: 'pinne', meaning: 'then, later' },
          { word: 'kaanam', meaning: 'we will see each other' },
        ],
      },
      notes: [
        'Pinne kaanam is the everyday goodbye: literally we will see each other again.',
        'It is said while walking away, so it fits the end of any visit.',
      ],
      tags: [],
    },
  ],
  minimalPairs: [],
  drills: [
    { kind: 'multipleChoice', itemId: 'sugar-veno', distractors: ['no sugar', 'ten rupees'] },
    { kind: 'rolePlay', itemId: 'athe-oru-chaaya', promptItemId: 'oru-chaaya-veno', mode: 'bank' },
    { kind: 'rolePlay', itemId: 'sugar-venda', promptItemId: 'sugar-veno', mode: 'typing' },
    { kind: 'rolePlay', itemId: 'chetta-ethra-aanu', promptItemId: 'ithaa-chaaya', mode: 'bank' },
    { kind: 'rolePlay', itemId: 'sheri-pinne-kaanam', promptItemId: 'patthu-roopa', mode: 'typing' },
  ],
  reviewSlots: 0,
  spriteId: 'l5u1l1',
};
