import type { Lesson } from '../types';

/**
 * Level 4 Unit 8 Lesson 1 — assembling II (PLAN.md §5 Level 4): the same
 * builder work as the lesson before, with questions. Both question orders
 * are accepted wherever both are said, and the answers the learner can
 * give back (und, illa, venam, venda) sit in the bank as the wrong turn.
 * The native-speaker rulings of 2026-10-12 settled five: enth before a
 * verb (chechi enth paranju), the may-I form irikkatte, the long group
 * question ... aanu pokunnath, the price frame -kku (oru kaappikku), and
 * the bus-stand question with ini, eppozha and uḷḷath.
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
      id: 'chechi-enth-paranju',
      manglish: 'chechi enth paranju',
      script: 'ചേച്ചി എന്ത് പറഞ്ഞു',
      meaning: 'what did your sister say?',
      kind: 'sentence',
      audio: {
        slow: 'l4u8l1_chechi-enth-paranju_slow',
        medium: 'l4u8l1_chechi-enth-paranju_medium',
        normal: 'l4u8l1_chechi-enth-paranju_normal',
      },
      sentence: {
        bank: ['chechi', 'enth', 'paranju', 'parayuva'],
        orders: ['chechi enth paranju', 'enth chechi paranju'],
        parts: [
          { word: 'chechi', meaning: 'older sister' },
          { word: 'enth', meaning: 'what' },
          { word: 'paranju', meaning: 'said' },
        ],
      },
      notes: [
        'Enth is the what that goes before a verb: chechi enth paranju, what did your sister say.',
        'The same word stands at the end of a question as entha — athu entha, what is that.',
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
      id: 'njan-ivide-irikkatte',
      manglish: 'njan ivide irikkatte',
      script: 'ഞാൻ ഇവിടെ ഇരിക്കട്ടെ',
      meaning: 'may I sit here?',
      kind: 'sentence',
      audio: {
        slow: 'l4u8l1_njan-ivide-irikkatte_slow',
        medium: 'l4u8l1_njan-ivide-irikkatte_medium',
        normal: 'l4u8l1_njan-ivide-irikkatte_normal',
      },
      sentence: {
        bank: ['njan', 'ivide', 'irikkatte', 'irikkuva'],
        orders: ['njan ivide irikkatte'],
        parts: [
          { word: 'njan', meaning: 'I' },
          { word: 'ivide', meaning: 'here' },
          { word: 'irikkatte', meaning: 'may I sit' },
        ],
      },
      notes: [
        'Irikkatte is the may-I form, the same ending as njan pokatte, may I go.',
        'Ivide is here, the pair of avide, there; i- points to this side, a- to that side.',
      ],
      tags: [],
    },
    {
      id: 'nammal-evide-aanu-pokunnath',
      manglish: 'nammaḷ evide aanu pokunnath',
      script: 'നമ്മൾ എവിടെ ആണ് പോകുന്നത്',
      meaning: 'where are we going?',
      kind: 'sentence',
      audio: {
        slow: 'l4u8l1_nammal-evide-aanu-pokunnath_slow',
        medium: 'l4u8l1_nammal-evide-aanu-pokunnath_medium',
        normal: 'l4u8l1_nammal-evide-aanu-pokunnath_normal',
      },
      acceptedInputs: ['nammal evide aanu pokunnath'],
      sentence: {
        bank: ['nammaḷ', 'evide', 'aanu', 'pokunnath', 'pokum'],
        orders: ['nammaḷ evide aanu pokunnath', 'evide aanu nammaḷ pokunnath'],
        parts: [
          { word: 'nammaḷ', meaning: 'we' },
          { word: 'evide', meaning: 'where' },
          { word: 'aanu', meaning: 'is' },
          { word: 'pokunnath', meaning: 'the going' },
        ],
      },
      notes: [
        'The long question shape again: ... aanu pokunnath, where is it that we are going.',
        'Pokunnath is the going itself; the aanu carries the is.',
        'Nammaḷ is we, the together word, the same one behind nammaḷkku.',
      ],
      tags: [],
    },
    {
      id: 'oru-kaappikku-ethra-aanu',
      manglish: 'oru kaappikku ethra aanu',
      script: 'ഒരു കാപ്പിക്ക് എത്ര ആണ്',
      meaning: 'how much for a coffee?',
      kind: 'sentence',
      audio: {
        slow: 'l4u8l1_oru-kaappikku-ethra-aanu_slow',
        medium: 'l4u8l1_oru-kaappikku-ethra-aanu_medium',
        normal: 'l4u8l1_oru-kaappikku-ethra-aanu_normal',
      },
      sentence: {
        bank: ['oru', 'kaappikku', 'ethra', 'aanu', 'und'],
        orders: ['oru kaappikku ethra aanu'],
        parts: [
          { word: 'oru', meaning: 'a' },
          { word: 'kaappikku', meaning: 'for a coffee' },
          { word: 'ethra', meaning: 'how much' },
          { word: 'aanu', meaning: 'is' },
        ],
      },
      notes: [
        'The price frame takes the to-it ending: oru kaappikku ethra aanu, how much for a coffee.',
        'Ethra counts and measures; aanu carries the is.',
        'The same ending prices anything on the menu: kaappikku, for a coffee.',
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
      id: 'ini-eppozha-ernakulatthekk-bus-ullath',
      manglish: 'ini eppozha ernakuḷatthekk bus uḷḷath',
      script: 'ഇനി എപ്പോഴാ എറണാകുളത്തേക്ക് ബസ്സ് ഉള്ളത്',
      meaning: 'when is the next bus to Ernakulam?',
      kind: 'sentence',
      audio: {
        slow: 'l4u8l1_ini-eppozha-ernakulatthekk-bus-ullath_slow',
        medium: 'l4u8l1_ini-eppozha-ernakulatthekk-bus-ullath_medium',
        normal: 'l4u8l1_ini-eppozha-ernakulatthekk-bus-ullath_normal',
      },
      acceptedInputs: [
        'ini eppozha ernakulatthekk bus ullath',
        'ini eppozha ernakulathekk bus ullath',
      ],
      sentence: {
        bank: ['ini', 'eppozha', 'ernakuḷatthekk', 'bus', 'uḷḷath', 'undo'],
        orders: ['ini eppozha ernakuḷatthekk bus uḷḷath'],
        parts: [
          { word: 'ini', meaning: 'next' },
          { word: 'eppozha', meaning: 'when is' },
          { word: 'ernakuḷatthekk', meaning: 'to Ernakulam' },
          { word: 'bus', meaning: 'bus' },
          { word: 'uḷḷath', meaning: 'the one that is there' },
        ],
      },
      notes: [
        'Ini is next, from now on, and eppozha asks when: when is the next one.',
        'Uḷḷath is the one that is there. Undo would ask whether any bus exists; this asks about the bus that does.',
        'Ernakulam is the city; ernakuḷatthekk is to Ernakulam, the to-a-place form you met in officeilekk. Typing it without the ḷ is accepted.',
      ],
      tags: [],
    },
  ],
  minimalPairs: [],
  drills: [
    { kind: 'multipleChoice', itemId: 'ini-eppozha-ernakulatthekk-bus-ullath', distractors: ['who all are at home?', 'may I sit here?'] },
    { kind: 'multipleChoice', itemId: 'veettil-aarokke-und', distractors: ['how much for a coffee?', 'where are you?'] },
    { kind: 'sentenceBuilder', itemId: 'ningal-evide-aanu', mode: 'typing' },
    { kind: 'sentenceBuilder', itemId: 'chechi-enth-paranju', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'ningal-eppo-varum', mode: 'typing' },
    { kind: 'sentenceBuilder', itemId: 'njan-ivide-irikkatte', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'nammal-evide-aanu-pokunnath', mode: 'typing' },
    { kind: 'sentenceBuilder', itemId: 'oru-kaappikku-ethra-aanu', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'veettil-aarokke-und', mode: 'typing' },
    { kind: 'sentenceBuilder', itemId: 'ini-eppozha-ernakulatthekk-bus-ullath', mode: 'bank' },
  ],
  reviewSlots: 0,
  spriteId: 'l4u8l1',
};
