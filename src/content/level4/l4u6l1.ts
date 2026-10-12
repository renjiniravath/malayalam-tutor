import type { Lesson } from '../types';

/**
 * Level 4 Unit 6 Lesson 1 — asking in sentences (PLAN.md §5 Level 4):
 * the question words the learner met in isolation now carry whole
 * questions they would actually ask — evide, eppo, entha, ethra, engane,
 * aaru — with one long question in the Level 3 ... aanu ...ath form.
 * Every question here is one a listener could answer from the sentence
 * alone (native-speaker ruling 2026-10-12): a house question names its
 * owner, and the what-would-you-like question takes -aanu and vendath.
 */
export const l4u6l1: Lesson = {
  id: 'l4u6l1',
  levelId: 'l4',
  unitId: 'l4u6',
  title: 'Asking in sentences',
  comprehensionOnly: false,
  items: [
    {
      id: 'ee-bus-evide-pokum',
      manglish: 'ee bus evide pokum',
      script: 'ഈ ബസ്സ് എവിടെ പോകും',
      meaning: 'where does this bus go?',
      kind: 'sentence',
      audio: {
        slow: 'l4u6l1_ee-bus-evide-pokum_slow',
        medium: 'l4u6l1_ee-bus-evide-pokum_medium',
        normal: 'l4u6l1_ee-bus-evide-pokum_normal',
      },
      sentence: {
        bank: ['ee', 'bus', 'evide', 'pokum', 'eth'],
        orders: ['ee bus evide pokum'],
        parts: [
          { word: 'ee', meaning: 'this' },
          { word: 'bus', meaning: 'bus' },
          { word: 'evide', meaning: 'where' },
          { word: 'pokum', meaning: 'will go' },
        ],
      },
      notes: [
        'Evide asks by itself: the words stay in their statement order and the question word does the asking.',
        'The bus question you will ask most in Kerala.',
      ],
      tags: [],
    },
    {
      id: 'ninte-veedu-evide-aanu',
      manglish: 'ninte veedu evide aanu',
      script: 'നിന്റെ വീട് എവിടെ ആണ്',
      meaning: 'where is your house?',
      kind: 'sentence',
      audio: {
        slow: 'l4u6l1_ninte-veedu-evide-aanu_slow',
        medium: 'l4u6l1_ninte-veedu-evide-aanu_medium',
        normal: 'l4u6l1_ninte-veedu-evide-aanu_normal',
      },
      sentence: {
        bank: ['ninte', 'veedu', 'evide', 'aanu', 'und'],
        orders: ['ninte veedu evide aanu', 'evide aanu ninte veedu'],
        parts: [
          { word: 'ninte', meaning: 'your' },
          { word: 'veedu', meaning: 'house' },
          { word: 'evide', meaning: 'where' },
          { word: 'aanu', meaning: 'is' },
        ],
      },
      notes: [
        'Ninte is the your that goes with nee, the word for someone close to you.',
        'A house question needs its owner: ninte veedu evide aanu. Without the owner the question has nothing to stand on.',
        'Evide can lead instead — evide aanu ninte veedu — and the asking is the same.',
      ],
      tags: [],
    },
    {
      id: 'avan-eppo-varum',
      manglish: 'avan eppo varum',
      script: 'അവൻ എപ്പോ വരും',
      meaning: 'when will he come?',
      kind: 'sentence',
      audio: {
        slow: 'l4u6l1_avan-eppo-varum_slow',
        medium: 'l4u6l1_avan-eppo-varum_medium',
        normal: 'l4u6l1_avan-eppo-varum_normal',
      },
      sentence: {
        bank: ['avan', 'eppo', 'varum', 'vannu'],
        orders: ['avan eppo varum'],
        parts: [
          { word: 'avan', meaning: 'he' },
          { word: 'eppo', meaning: 'when' },
          { word: 'varum', meaning: 'will come' },
        ],
      },
      notes: [
        'Eppo asks when; eppozha, already taught, is the same word with a nudge at the end.',
        'The future verb keeps the question about something still to come.',
      ],
      tags: [],
    },
    {
      id: 'ithu-ethra-aanu',
      manglish: 'ithu ethra aanu',
      script: 'ഇത് എത്ര ആണ്',
      meaning: 'how much is this?',
      kind: 'sentence',
      audio: {
        slow: 'l4u6l1_ithu-ethra-aanu_slow',
        medium: 'l4u6l1_ithu-ethra-aanu_medium',
        normal: 'l4u6l1_ithu-ethra-aanu_normal',
      },
      sentence: {
        bank: ['ithu', 'ethra', 'aanu', 'und'],
        orders: ['ithu ethra aanu'],
        parts: [
          { word: 'ithu', meaning: 'this' },
          { word: 'ethra', meaning: 'how much' },
          { word: 'aanu', meaning: 'is' },
        ],
      },
      notes: [
        'The market question: ithu ethra aanu, how much is this one.',
        'Ethra also counts people and days: how many, how much.',
      ],
      tags: [],
    },
    {
      id: 'ningalkku-enthaanu-vendath',
      manglish: 'ningaḷkku enthaanu vendath',
      script: 'നിങ്ങൾക്ക് എന്താണ് വേണ്ടത്',
      meaning: 'what would you like?',
      kind: 'sentence',
      audio: {
        slow: 'l4u6l1_ningalkku-enthaanu-vendath_slow',
        medium: 'l4u6l1_ningalkku-enthaanu-vendath_medium',
        normal: 'l4u6l1_ningalkku-enthaanu-vendath_normal',
      },
      acceptedInputs: ['ningalkku enthaanu vendath'],
      sentence: {
        bank: ['ningaḷkku', 'enthaanu', 'vendath', 'venam'],
        orders: ['ningaḷkku enthaanu vendath'],
        parts: [
          { word: 'ningaḷkku', meaning: 'to you' },
          { word: 'enthaanu', meaning: 'what is' },
          { word: 'vendath', meaning: 'the wanted thing' },
        ],
      },
      notes: [
        'The question a shopkeeper or a host asks you: what is it that you want.',
        'Enthaanu is entha with the is on it, and vendath is the wanted thing; the bare entha venam is not the question.',
        'The answer is venam or venda, the two wanting words you already know.',
      ],
      tags: [],
    },
    {
      id: 'ithu-engane-cheyyum',
      manglish: 'ithu engane cheyyum',
      script: 'ഇത് എങ്ങനെ ചെയ്യും',
      meaning: 'how do I do this?',
      kind: 'sentence',
      audio: {
        slow: 'l4u6l1_ithu-engane-cheyyum_slow',
        medium: 'l4u6l1_ithu-engane-cheyyum_medium',
        normal: 'l4u6l1_ithu-engane-cheyyum_normal',
      },
      sentence: {
        bank: ['ithu', 'engane', 'cheyyum', 'cheyyuva'],
        orders: ['ithu engane cheyyum'],
        parts: [
          { word: 'ithu', meaning: 'this' },
          { word: 'engane', meaning: 'how' },
          { word: 'cheyyum', meaning: 'does one do' },
        ],
      },
      notes: [
        'Engane asks how, the same word as in engane und, how are you.',
        'Cheyyum here is how does one do it; the doing is not yours alone.',
      ],
      tags: [],
    },
    {
      id: 'athu-aaru-paranju',
      manglish: 'athu aaru paranju',
      script: 'അത് ആരു പറഞ്ഞു',
      meaning: 'who said that?',
      kind: 'sentence',
      audio: {
        slow: 'l4u6l1_athu-aaru-paranju_slow',
        medium: 'l4u6l1_athu-aaru-paranju_medium',
        normal: 'l4u6l1_athu-aaru-paranju_normal',
      },
      sentence: {
        bank: ['athu', 'aaru', 'paranju', 'parayuva'],
        orders: ['athu aaru paranju'],
        parts: [
          { word: 'athu', meaning: 'that' },
          { word: 'aaru', meaning: 'who' },
          { word: 'paranju', meaning: 'said' },
        ],
      },
      notes: [
        'Aaru asks who; aarum with illa answers nobody, as in veettil aarum illa.',
        'The past verb makes it a question about something already said.',
      ],
      tags: [],
    },
    {
      id: 'ithu-evide-ninn-aanu-medichath',
      manglish: 'ithu evide ninn aanu medichath',
      script: 'ഇത് എവിടെ നിന്ന് ആണ് മേടിച്ചത്',
      meaning: 'where did you buy this?',
      kind: 'sentence',
      audio: {
        slow: 'l4u6l1_ithu-evide-ninn-aanu-medichath_slow',
        medium: 'l4u6l1_ithu-evide-ninn-aanu-medichath_medium',
        normal: 'l4u6l1_ithu-evide-ninn-aanu-medichath_normal',
      },
      sentence: {
        bank: ['ithu', 'evide', 'ninn', 'aanu', 'medichath'],
        orders: ['ithu evide ninn aanu medichath'],
        parts: [
          { word: 'ithu', meaning: 'this' },
          { word: 'evide', meaning: 'where' },
          { word: 'ninn', meaning: 'from' },
          { word: 'aanu', meaning: 'is' },
          { word: 'medichath', meaning: 'the buying' },
        ],
      },
      notes: [
        'The long question from Level 3 with the everyday buying word: ... aanu medichath, where was it that you bought it.',
        'Medichath is what people say; vaangiyath is its formal twin and means the same thing.',
      ],
      tags: [],
    },
  ],
  minimalPairs: [],
  drills: [
    { kind: 'multipleChoice', itemId: 'ee-bus-evide-pokum', distractors: ['where is your house?', 'when will he come?'] },
    { kind: 'multipleChoice', itemId: 'ithu-ethra-aanu', distractors: ['where does this bus go?', 'what would you like?'] },
    { kind: 'multipleChoice', itemId: 'ningalkku-enthaanu-vendath', distractors: ['where did you buy this?', 'how do I do this?'] },
    { kind: 'multipleChoice', itemId: 'athu-aaru-paranju', distractors: ['how much is this?', 'where is your house?'] },
    { kind: 'sentenceBuilder', itemId: 'ee-bus-evide-pokum', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'ninte-veedu-evide-aanu', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'avan-eppo-varum', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'ithu-ethra-aanu', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'ningalkku-enthaanu-vendath', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'ithu-engane-cheyyum', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'athu-aaru-paranju', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'ithu-evide-ninn-aanu-medichath', mode: 'bank' },
  ],
  reviewSlots: 0,
  spriteId: 'l4u6l1',
};
