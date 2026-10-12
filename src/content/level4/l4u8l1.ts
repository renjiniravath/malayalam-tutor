import type { Lesson } from '../types';

/**
 * Level 4 Unit 8 Lesson 1 — assembling II (PLAN.md §5 Level 4): the same
 * builder work as the lesson before, with questions. Both question orders
 * are accepted wherever both are said, and the answers the learner can
 * give back (und, illa, venam, venda) sit in the bank as the wrong turn.
 */
export const l4u8l1: Lesson = {
  id: 'l4u8l1',
  levelId: 'l4',
  unitId: 'l4u8',
  title: 'Asking it yourself',
  comprehensionOnly: false,
  items: [
    {
      id: 'ningal-evide-aanu',
      manglish: 'ningaḷ evide aanu',
      script: 'നിങ്ങൾ എവിടെ ആണ്',
      meaning: 'where are you?',
      kind: 'sentence',
      audio: {
        slow: 'l4u8l1_ningal-evide-aanu_slow',
        medium: 'l4u8l1_ningal-evide-aanu_medium',
        normal: 'l4u8l1_ningal-evide-aanu_normal',
      },
      acceptedInputs: ['ningal evide aanu'],
      sentence: {
        bank: ['ningaḷ', 'evide', 'aanu', 'und'],
        orders: ['ningaḷ evide aanu', 'evide aanu ningaḷ'],
        parts: [
          { word: 'ningaḷ', meaning: 'you' },
          { word: 'evide', meaning: 'where' },
          { word: 'aanu', meaning: 'is' },
        ],
      },
      notes: [
        'The phone question: ningaḷ evide aanu, where are you.',
        'Evide can lead instead — evide aanu ningaḷ — and the question is the same.',
      ],
      tags: [],
    },
    {
      id: 'chechi-entha-paranju',
      manglish: 'chechi entha paranju',
      script: 'ചേച്ചി എന്താ പറഞ്ഞു',
      meaning: 'what did your sister say?',
      kind: 'sentence',
      audio: {
        slow: 'l4u8l1_chechi-entha-paranju_slow',
        medium: 'l4u8l1_chechi-entha-paranju_medium',
        normal: 'l4u8l1_chechi-entha-paranju_normal',
      },
      sentence: {
        bank: ['chechi', 'entha', 'paranju', 'parayuva'],
        orders: ['chechi entha paranju', 'entha chechi paranju'],
        parts: [
          { word: 'chechi', meaning: 'older sister' },
          { word: 'entha', meaning: 'what' },
          { word: 'paranju', meaning: 'said' },
        ],
      },
      notes: [
        'The question word can lead for emphasis: entha chechi paranju, what was it she said.',
        'Chechi here is the person being asked about, the older sister.',
      ],
      tags: [],
    },
    {
      id: 'ningal-eppo-varum',
      manglish: 'ningaḷ eppo varum',
      script: 'നിങ്ങൾ എപ്പോ വരും',
      meaning: 'when will you come?',
      kind: 'sentence',
      audio: {
        slow: 'l4u8l1_ningal-eppo-varum_slow',
        medium: 'l4u8l1_ningal-eppo-varum_medium',
        normal: 'l4u8l1_ningal-eppo-varum_normal',
      },
      acceptedInputs: ['ningal eppo varum'],
      sentence: {
        bank: ['ningaḷ', 'eppo', 'varum', 'vannu'],
        orders: ['ningaḷ eppo varum', 'eppo ningaḷ varum'],
        parts: [
          { word: 'ningaḷ', meaning: 'you' },
          { word: 'eppo', meaning: 'when' },
          { word: 'varum', meaning: 'will come' },
        ],
      },
      notes: [
        'Eppo asks when; the future verb keeps it about something still to come.',
        'With the question word first, eppo ningaḷ varum, the asking lands harder.',
      ],
      tags: [],
    },
    {
      id: 'njan-evide-irikkam',
      manglish: 'njan evide irikkam',
      script: 'ഞാൻ എവിടെ ഇരിക്കാം',
      meaning: 'where can I sit?',
      kind: 'sentence',
      audio: {
        slow: 'l4u8l1_njan-evide-irikkam_slow',
        medium: 'l4u8l1_njan-evide-irikkam_medium',
        normal: 'l4u8l1_njan-evide-irikkam_normal',
      },
      sentence: {
        bank: ['njan', 'evide', 'irikkam', 'irikkuva'],
        orders: ['njan evide irikkam', 'evide njan irikkam'],
        parts: [
          { word: 'njan', meaning: 'I' },
          { word: 'evide', meaning: 'where' },
          { word: 'irikkam', meaning: 'may sit' },
        ],
      },
      notes: [
        'Irikkam is the asking form: njan evide irikkam, where may I sit.',
        'Irikkuva, the word from Level 3, just says where you sit; irikkam asks if you may.',
      ],
      tags: [],
    },
    {
      id: 'nammalkku-evide-pokaam',
      manglish: 'nammaḷkku evide pokaam',
      script: 'നമ്മൾക്ക് എവിടെ പോകാം',
      meaning: 'where shall we go?',
      kind: 'sentence',
      audio: {
        slow: 'l4u8l1_nammalkku-evide-pokaam_slow',
        medium: 'l4u8l1_nammalkku-evide-pokaam_medium',
        normal: 'l4u8l1_nammalkku-evide-pokaam_normal',
      },
      acceptedInputs: ['nammalkku evide pokaam', 'namukku evide pokaam'],
      sentence: {
        bank: ['nammaḷkku', 'evide', 'pokaam', 'pokum'],
        orders: ['nammaḷkku evide pokaam', 'evide nammaḷkku pokaam'],
        parts: [
          { word: 'nammaḷkku', meaning: 'to us' },
          { word: 'evide', meaning: 'where' },
          { word: 'pokaam', meaning: 'shall go' },
        ],
      },
      notes: [
        'The to-us form takes the asking -aam: pokaam asks the group where to go.',
        'Pokum would settle it instead — nammaḷkku evide pokum is not the question, it is the plan.',
        'Namukku is the same word and typing it is accepted; the display keeps the ḷ of nammaḷ.',
      ],
      tags: [],
    },
    {
      id: 'oru-kaappi-ethra-aanu',
      manglish: 'oru kaappi ethra aanu',
      script: 'ഒരു കാപ്പി എത്ര ആണ്',
      meaning: 'how much is a coffee?',
      kind: 'sentence',
      audio: {
        slow: 'l4u8l1_oru-kaappi-ethra-aanu_slow',
        medium: 'l4u8l1_oru-kaappi-ethra-aanu_medium',
        normal: 'l4u8l1_oru-kaappi-ethra-aanu_normal',
      },
      sentence: {
        bank: ['oru', 'kaappi', 'ethra', 'aanu', 'und'],
        orders: ['oru kaappi ethra aanu'],
        parts: [
          { word: 'oru', meaning: 'a' },
          { word: 'kaappi', meaning: 'coffee' },
          { word: 'ethra', meaning: 'how much' },
          { word: 'aanu', meaning: 'is' },
        ],
      },
      notes: [
        'Swap the first two words for anything on the menu: oru chaaya ethra aanu.',
        'Ethra counts and measures; aanu carries the is.',
      ],
      tags: [],
    },
    {
      id: 'veettil-aarokke-und',
      manglish: 'veettil aarokke und',
      script: 'വീട്ടിൽ ആരൊക്കെ ഉണ്ട്',
      meaning: 'who all are at home?',
      kind: 'sentence',
      audio: {
        slow: 'l4u8l1_veettil-aarokke-und_slow',
        medium: 'l4u8l1_veettil-aarokke-und_medium',
        normal: 'l4u8l1_veettil-aarokke-und_normal',
      },
      sentence: {
        bank: ['veettil', 'aarokke', 'und', 'illa'],
        orders: ['veettil aarokke und', 'aarokke veettil und'],
        parts: [
          { word: 'veettil', meaning: 'at home' },
          { word: 'aarokke', meaning: 'who all' },
          { word: 'und', meaning: 'there is' },
        ],
      },
      notes: [
        'Aarokke is the who-all word, from the Level 3 question ninte veettil ninn aarokke varunnund.',
        'Und says there is; the answer veettil aarum illa uses illa instead.',
      ],
      tags: [],
    },
    {
      id: 'ippo-oru-bus-undo',
      manglish: 'ippo oru bus undo',
      script: 'ഇപ്പോ ഒരു ബസ്സ് ഉണ്ടോ',
      meaning: 'is there a bus now?',
      kind: 'sentence',
      audio: {
        slow: 'l4u8l1_ippo-oru-bus-undo_slow',
        medium: 'l4u8l1_ippo-oru-bus-undo_medium',
        normal: 'l4u8l1_ippo-oru-bus-undo_normal',
      },
      sentence: {
        bank: ['ippo', 'oru', 'bus', 'undo', 'und'],
        orders: ['ippo oru bus undo', 'oru bus ippo undo'],
        parts: [
          { word: 'ippo', meaning: 'now' },
          { word: 'oru', meaning: 'a' },
          { word: 'bus', meaning: 'bus' },
          { word: 'undo', meaning: 'is there?' },
        ],
      },
      notes: [
        'Und says there is; undo asks it. The answer is und or illa.',
        'The bus question at every stop in Kerala.',
      ],
      tags: [],
    },
  ],
  minimalPairs: [],
  drills: [
    { kind: 'multipleChoice', itemId: 'ippo-oru-bus-undo', distractors: ['who all are at home?', 'where can I sit?'] },
    { kind: 'multipleChoice', itemId: 'veettil-aarokke-und', distractors: ['how much is a coffee?', 'where are you?'] },
    { kind: 'sentenceBuilder', itemId: 'ningal-evide-aanu', mode: 'typing' },
    { kind: 'sentenceBuilder', itemId: 'chechi-entha-paranju', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'ningal-eppo-varum', mode: 'typing' },
    { kind: 'sentenceBuilder', itemId: 'njan-evide-irikkam', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'nammalkku-evide-pokaam', mode: 'typing' },
    { kind: 'sentenceBuilder', itemId: 'oru-kaappi-ethra-aanu', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'veettil-aarokke-und', mode: 'typing' },
    { kind: 'sentenceBuilder', itemId: 'ippo-oru-bus-undo', mode: 'bank' },
  ],
  reviewSlots: 0,
  spriteId: 'l4u8l1',
};
