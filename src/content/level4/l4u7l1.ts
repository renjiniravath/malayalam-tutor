import type { Lesson } from '../types';

/**
 * Level 4 Unit 7 Lesson 1 — assembling I (PLAN.md §5 Level 4): the
 * sentence-builder block. Every item is a sentence the learner puts
 * together from a word bank or types from scratch, built from the verbs,
 * times and places the level has taught. Where two orders are both said
 * (the time leading or following the person), both are accepted.
 */
export const l4u7l1: Lesson = {
  id: 'l4u7l1',
  levelId: 'l4',
  unitId: 'l4u7',
  title: 'Putting it together',
  comprehensionOnly: false,
  items: [
    {
      id: 'njan-innale-oru-cinema-kandu',
      manglish: 'njan innale oru cinema kandu',
      script: 'ഞാൻ ഇന്നലെ ഒരു സിനിമ കണ്ടു',
      meaning: 'I saw a movie yesterday',
      kind: 'sentence',
      audio: {
        slow: 'l4u7l1_njan-innale-oru-cinema-kandu_slow',
        medium: 'l4u7l1_njan-innale-oru-cinema-kandu_medium',
        normal: 'l4u7l1_njan-innale-oru-cinema-kandu_normal',
      },
      sentence: {
        bank: ['njan', 'innale', 'oru', 'cinema', 'kandu', 'innu'],
        orders: ['njan innale oru cinema kandu', 'innale njan oru cinema kandu'],
        parts: [
          { word: 'njan', meaning: 'I' },
          { word: 'innale', meaning: 'yesterday' },
          { word: 'oru', meaning: 'a' },
          { word: 'cinema', meaning: 'movie' },
          { word: 'kandu', meaning: 'saw' },
        ],
      },
      notes: [
        'Time can lead the sentence: innale njan oru cinema kandu says the same thing with yesterday first.',
        'Kandu is the past of seeing, the verb you met in njan athu kandu.',
      ],
      tags: [],
    },
    {
      id: 'njan-innu-raathri-veettil-kazhikkum',
      manglish: 'njan innu raathri veettil kazhikkum',
      script: 'ഞാൻ ഇന്ന് രാത്രി വീട്ടിൽ കഴിക്കും',
      meaning: "I'll eat at home tonight",
      kind: 'sentence',
      audio: {
        slow: 'l4u7l1_njan-innu-raathri-veettil-kazhikkum_slow',
        medium: 'l4u7l1_njan-innu-raathri-veettil-kazhikkum_medium',
        normal: 'l4u7l1_njan-innu-raathri-veettil-kazhikkum_normal',
      },
      acceptedInputs: [
        'njan innu raathri veettil kazhikkum',
        'njan inn raathri veettil kazhikkum',
        'njan innu raatri veettil kazhikkum',
      ],
      sentence: {
        bank: ['njan', 'innu', 'raathri', 'veettil', 'kazhikkum', 'kazhichu'],
        orders: ['njan innu raathri veettil kazhikkum'],
        parts: [
          { word: 'njan', meaning: 'I' },
          { word: 'innu', meaning: 'today' },
          { word: 'raathri', meaning: 'night' },
          { word: 'veettil', meaning: 'at home' },
          { word: 'kazhikkum', meaning: 'will eat' },
        ],
      },
      notes: [
        'Innu raathri is tonight: today plus night.',
        'Inn and raatri are accepted in typing, but innu and raathri are the words.',
        'Kazhikkum is the plain future; kazhikkaam would be the suggestion.',
      ],
      tags: [],
    },
    {
      id: 'avan-innu-ente-veettil-varum',
      manglish: 'avan innu ente veettil varum',
      script: 'അവൻ ഇന്ന് എന്റെ വീട്ടിൽ വരും',
      meaning: 'he is coming to my house today',
      kind: 'sentence',
      audio: {
        slow: 'l4u7l1_avan-innu-ente-veettil-varum_slow',
        medium: 'l4u7l1_avan-innu-ente-veettil-varum_medium',
        normal: 'l4u7l1_avan-innu-ente-veettil-varum_normal',
      },
      sentence: {
        bank: ['avan', 'innu', 'ente', 'veettil', 'varum', 'vannu'],
        orders: ['avan innu ente veettil varum', 'innu avan ente veettil varum'],
        parts: [
          { word: 'avan', meaning: 'he' },
          { word: 'innu', meaning: 'today' },
          { word: 'ente', meaning: 'my' },
          { word: 'veettil', meaning: 'to the house' },
          { word: 'varum', meaning: 'will come' },
        ],
      },
      notes: [
        'Ente veettil is my place: the house word with the to-it ending.',
        'Innu can lead here too: innu avan ente veettil varum.',
      ],
      tags: [],
    },
    {
      id: 'avan-innale-ente-veettil-vannu',
      manglish: 'avan innale ente veettil vannu',
      script: 'അവൻ ഇന്നലെ എന്റെ വീട്ടിൽ വന്നു',
      meaning: 'he came to my house yesterday',
      kind: 'sentence',
      audio: {
        slow: 'l4u7l1_avan-innale-ente-veettil-vannu_slow',
        medium: 'l4u7l1_avan-innale-ente-veettil-vannu_medium',
        normal: 'l4u7l1_avan-innale-ente-veettil-vannu_normal',
      },
      sentence: {
        bank: ['avan', 'innale', 'ente', 'veettil', 'vannu', 'varum'],
        orders: ['avan innale ente veettil vannu'],
        parts: [
          { word: 'avan', meaning: 'he' },
          { word: 'innale', meaning: 'yesterday' },
          { word: 'ente', meaning: 'my' },
          { word: 'veettil', meaning: 'to the house' },
          { word: 'vannu', meaning: 'came' },
        ],
      },
      notes: ['The same visit one day back: vannu is the past of varum.'],
      tags: [],
    },
    {
      id: 'njan-naale-avide-varaam',
      manglish: 'njan naaḷe avide varaam',
      script: 'ഞാൻ നാളെ അവിടെ വരാം',
      meaning: "I'll come there tomorrow",
      kind: 'sentence',
      audio: {
        slow: 'l4u7l1_njan-naale-avide-varaam_slow',
        medium: 'l4u7l1_njan-naale-avide-varaam_medium',
        normal: 'l4u7l1_njan-naale-avide-varaam_normal',
      },
      acceptedInputs: ['njan naale avide varaam'],
      sentence: {
        bank: ['njan', 'naaḷe', 'avide', 'varaam', 'varum'],
        orders: ['njan naaḷe avide varaam', 'naaḷe njan avide varaam'],
        parts: [
          { word: 'njan', meaning: 'I' },
          { word: 'naaḷe', meaning: 'tomorrow' },
          { word: 'avide', meaning: 'there' },
          { word: 'varaam', meaning: 'will come' },
        ],
      },
      notes: [
        'Varaam is the willing form, the yes to an invitation; varum states it as a settled plan instead.',
        'Naale is accepted in typing, but naaḷe is the display — the ḷ is the curled-back l from avaḷ.',
      ],
      tags: [],
    },
    {
      id: 'nammalkku-avide-kazhikkaam',
      manglish: 'nammaḷkku avide kazhikkaam',
      script: 'നമ്മൾക്ക് അവിടെ കഴിക്കാം',
      meaning: "let's eat there",
      kind: 'sentence',
      audio: {
        slow: 'l4u7l1_nammalkku-avide-kazhikkaam_slow',
        medium: 'l4u7l1_nammalkku-avide-kazhikkaam_medium',
        normal: 'l4u7l1_nammalkku-avide-kazhikkaam_normal',
      },
      acceptedInputs: ['nammalkku avide kazhikkaam', 'namukku avide kazhikkaam'],
      sentence: {
        bank: ['nammaḷkku', 'avide', 'kazhikkaam', 'kazhikkum'],
        orders: ['nammaḷkku avide kazhikkaam'],
        parts: [
          { word: 'nammaḷkku', meaning: 'to us' },
          { word: 'avide', meaning: 'there' },
          { word: 'kazhikkaam', meaning: "let's eat" },
        ],
      },
      notes: [
        'The suggestion takes the to-us form, the same shape as nammaḷkku veettil pokaam.',
        'Kazhikkaam proposes the meal; kazhikkum is the plain future that says it will happen.',
        'Namukku is the same word and typing it is accepted; the display keeps the ḷ of nammaḷ.',
      ],
      tags: [],
    },
    {
      id: 'enikk-ippo-oru-kaappi-venam',
      manglish: 'enikk ippo oru kaappi venam',
      script: 'എനിക്ക് ഇപ്പോ ഒരു കാപ്പി വേണം',
      meaning: 'I want a coffee now',
      kind: 'sentence',
      audio: {
        slow: 'l4u7l1_enikk-ippo-oru-kaappi-venam_slow',
        medium: 'l4u7l1_enikk-ippo-oru-kaappi-venam_medium',
        normal: 'l4u7l1_enikk-ippo-oru-kaappi-venam_normal',
      },
      sentence: {
        bank: ['enikk', 'ippo', 'oru', 'kaappi', 'venam', 'venda'],
        orders: ['enikk ippo oru kaappi venam'],
        parts: [
          { word: 'enikk', meaning: 'to me' },
          { word: 'ippo', meaning: 'now' },
          { word: 'oru', meaning: 'a' },
          { word: 'kaappi', meaning: 'coffee' },
          { word: 'venam', meaning: 'wanted' },
        ],
      },
      notes: [
        'Oru is the a: one coffee, the way you order it.',
        'Its other side is enikk ippo oru kaappi venda, I do not want a coffee now.',
      ],
      tags: [],
    },
    {
      id: 'njan-innu-raavile-officil-pokuva',
      manglish: 'njan innu raavile officil pokuva',
      script: 'ഞാൻ ഇന്ന് രാവിലെ ഓഫീസിൽ പോകുവാ',
      meaning: "I'm going to the office this morning",
      kind: 'sentence',
      audio: {
        slow: 'l4u7l1_njan-innu-raavile-officil-pokuva_slow',
        medium: 'l4u7l1_njan-innu-raavile-officil-pokuva_medium',
        normal: 'l4u7l1_njan-innu-raavile-officil-pokuva_normal',
      },
      sentence: {
        bank: ['njan', 'innu', 'raavile', 'officil', 'pokuva', 'poyi'],
        orders: ['njan innu raavile officil pokuva', 'innu raavile njan officil pokuva'],
        parts: [
          { word: 'njan', meaning: 'I' },
          { word: 'innu', meaning: 'today' },
          { word: 'raavile', meaning: 'morning' },
          { word: 'officil', meaning: 'to the office' },
          { word: 'pokuva', meaning: 'am going' },
        ],
      },
      notes: [
        'Innu raavile is this morning.',
        'Pokuva is the going form from Level 3, now with the time in front of it.',
      ],
      tags: [],
    },
  ],
  minimalPairs: [],
  drills: [
    { kind: 'multipleChoice', itemId: 'njan-naale-avide-varaam', distractors: ["I'm going to the office this morning", 'he came to my house yesterday'] },
    { kind: 'multipleChoice', itemId: 'nammalkku-avide-kazhikkaam', distractors: ["I'll eat at home tonight", 'I want a coffee now'] },
    { kind: 'sentenceBuilder', itemId: 'njan-innale-oru-cinema-kandu', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'njan-innu-raathri-veettil-kazhikkum', mode: 'typing' },
    { kind: 'sentenceBuilder', itemId: 'avan-innu-ente-veettil-varum', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'avan-innale-ente-veettil-vannu', mode: 'typing' },
    { kind: 'sentenceBuilder', itemId: 'njan-naale-avide-varaam', mode: 'typing' },
    { kind: 'sentenceBuilder', itemId: 'nammalkku-avide-kazhikkaam', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'enikk-ippo-oru-kaappi-venam', mode: 'typing' },
    { kind: 'sentenceBuilder', itemId: 'njan-innu-raavile-officil-pokuva', mode: 'bank' },
  ],
  reviewSlots: 0,
  spriteId: 'l4u7l1',
};
