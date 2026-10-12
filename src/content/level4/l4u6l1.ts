import type { Lesson } from '../types';

/**
 * Level 4 Unit 6 Lesson 1 — asking in sentences (PLAN.md §5 Level 4):
 * the question words the learner met in isolation now carry whole
 * questions they would actually ask — evide, eppo, entha, ethra, engane,
 * aaru — with one long question in the Level 3 ... aanu ...ath form.
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
      id: 'kada-evide-aanu',
      manglish: 'kada evide aanu',
      script: 'കട എവിടെ ആണ്',
      meaning: 'where is the shop?',
      kind: 'sentence',
      audio: {
        slow: 'l4u6l1_kada-evide-aanu_slow',
        medium: 'l4u6l1_kada-evide-aanu_medium',
        normal: 'l4u6l1_kada-evide-aanu_normal',
      },
      sentence: {
        bank: ['kada', 'evide', 'aanu', 'und'],
        orders: ['kada evide aanu'],
        parts: [
          { word: 'kada', meaning: 'shop' },
          { word: 'evide', meaning: 'where' },
          { word: 'aanu', meaning: 'is' },
        ],
      },
      notes: [
        'The is-word is aanu, and evide asks the place: the shop — where is it.',
        'Swap the first word for anything you are looking for: bus evide aanu, veedu evide aanu.',
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
      id: 'ningalkku-entha-venam',
      manglish: 'ningaḷkku entha venam',
      script: 'നിങ്ങൾക്ക് എന്താ വേണം',
      meaning: 'what would you like?',
      kind: 'sentence',
      audio: {
        slow: 'l4u6l1_ningalkku-entha-venam_slow',
        medium: 'l4u6l1_ningalkku-entha-venam_medium',
        normal: 'l4u6l1_ningalkku-entha-venam_normal',
      },
      acceptedInputs: ['ningalkku entha venam'],
      sentence: {
        bank: ['ningaḷkku', 'entha', 'venam', 'venda'],
        orders: ['ningaḷkku entha venam'],
        parts: [
          { word: 'ningaḷkku', meaning: 'to you' },
          { word: 'entha', meaning: 'what' },
          { word: 'venam', meaning: 'wanted' },
        ],
      },
      notes: [
        'The question a shopkeeper or a host asks you, and the one you answer with venam or venda.',
        'The everyday what is entha; the venam at the end carries the wanting.',
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
      id: 'ithu-evide-ninn-aanu-vaangiyath',
      manglish: 'ithu evide ninn aanu vaangiyath',
      script: 'ഇത് എവിടെ നിന്ന് ആണ് വാങ്ങിയത്',
      meaning: 'where did you buy this?',
      kind: 'sentence',
      audio: {
        slow: 'l4u6l1_ithu-evide-ninn-aanu-vaangiyath_slow',
        medium: 'l4u6l1_ithu-evide-ninn-aanu-vaangiyath_medium',
        normal: 'l4u6l1_ithu-evide-ninn-aanu-vaangiyath_normal',
      },
      sentence: {
        bank: ['ithu', 'evide', 'ninn', 'aanu', 'vaangiyath', 'medichath'],
        orders: ['ithu evide ninn aanu vaangiyath'],
        parts: [
          { word: 'ithu', meaning: 'this' },
          { word: 'evide', meaning: 'where' },
          { word: 'ninn', meaning: 'from' },
          { word: 'aanu', meaning: 'is' },
          { word: 'vaangiyath', meaning: 'the buying' },
        ],
      },
      notes: [
        'The long question from Level 3 with a new ending: ... aanu vaangiyath, where was it that you bought it.',
        'Vaangiyath is the buying; medichath, already taught, does the same job.',
      ],
      tags: [],
    },
  ],
  minimalPairs: [],
  drills: [
    { kind: 'multipleChoice', itemId: 'ee-bus-evide-pokum', distractors: ['where is the shop?', 'when will he come?'] },
    { kind: 'multipleChoice', itemId: 'ithu-ethra-aanu', distractors: ['where does this bus go?', 'what would you like?'] },
    { kind: 'multipleChoice', itemId: 'ningalkku-entha-venam', distractors: ['where did you buy this?', 'how do I do this?'] },
    { kind: 'multipleChoice', itemId: 'athu-aaru-paranju', distractors: ['how much is this?', 'where is the shop?'] },
    { kind: 'sentenceBuilder', itemId: 'ee-bus-evide-pokum', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'kada-evide-aanu', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'avan-eppo-varum', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'ithu-ethra-aanu', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'ningalkku-entha-venam', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'ithu-engane-cheyyum', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'athu-aaru-paranju', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'ithu-evide-ninn-aanu-vaangiyath', mode: 'bank' },
  ],
  reviewSlots: 0,
  spriteId: 'l4u6l1',
};
