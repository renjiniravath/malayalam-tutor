import type { Lesson } from '../types';

/**
 * Level 4 Unit 7 Lesson 1 — assembling I (PLAN.md §5 Level 4): the
 * sentence-builder block. Every item is a sentence the learner puts
 * together from a word bank or types from scratch, built from the verbs,
 * times and places the level has taught. Where two orders are both said
 * (the time leading or following the person), both are accepted.
 * The native-speaker rulings of 2026-10-12 settled four of them: tonight
 * goes over there (angott pokum), the eating suggestion keeps its ninn
 * (avide ninn kazhikkaam), the wanting sentence is a glass of water, and
 * a morning still to come takes the future pokum, not pokuva.
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
      id: 'njan-innu-raathri-angott-pokum',
      manglish: 'njan innu raathri angott pokum',
      script: 'ഞാൻ ഇന്ന് രാത്രി അങ്ങോട്ട് പോകും',
      meaning: "I'll go over there tonight",
      kind: 'sentence',
      audio: {
        slow: 'l4u7l1_njan-innu-raathri-angott-pokum_slow',
        medium: 'l4u7l1_njan-innu-raathri-angott-pokum_medium',
        normal: 'l4u7l1_njan-innu-raathri-angott-pokum_normal',
      },
      acceptedInputs: [
        'njan innu raathri angott pokum',
        'njan inn raathri angott pokum',
        'njan innu raatri angott pokum',
        'njan inn raatri angott pokum',
      ],
      sentence: {
        bank: ['njan', 'innu', 'raathri', 'angott', 'pokum', 'pokuva'],
        orders: ['njan innu raathri angott pokum'],
        parts: [
          { word: 'njan', meaning: 'I' },
          { word: 'innu', meaning: 'today' },
          { word: 'raathri', meaning: 'night' },
          { word: 'angott', meaning: 'over there' },
          { word: 'pokum', meaning: 'will go' },
        ],
      },
      notes: [
        'Innu raathri is tonight: today plus night.',
        'Angott is over there, the direction word you met in njan angott varuva.',
        'Inn and raatri are accepted in typing, but innu and raathri are the words.',
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
      id: 'nammalkku-avide-ninn-kazhikkaam',
      manglish: 'nammaḷkku avide ninn kazhikkaam',
      script: 'നമ്മൾക്ക് അവിടെ നിന്ന് കഴിക്കാം',
      meaning: "let's eat from there",
      kind: 'sentence',
      audio: {
        slow: 'l4u7l1_nammalkku-avide-ninn-kazhikkaam_slow',
        medium: 'l4u7l1_nammalkku-avide-ninn-kazhikkaam_medium',
        normal: 'l4u7l1_nammalkku-avide-ninn-kazhikkaam_normal',
      },
      acceptedInputs: ['nammalkku avide ninn kazhikkaam', 'namukku avide ninn kazhikkaam'],
      sentence: {
        bank: ['nammaḷkku', 'avide', 'ninn', 'kazhikkaam', 'kazhikkum'],
        orders: ['nammaḷkku avide ninn kazhikkaam'],
        parts: [
          { word: 'nammaḷkku', meaning: 'to us' },
          { word: 'avide', meaning: 'there' },
          { word: 'ninn', meaning: 'from' },
          { word: 'kazhikkaam', meaning: "let's eat" },
        ],
      },
      notes: [
        'Avide ninn is from there: the food comes from that place, and the ninn stays in.',
        'Kazhikkaam proposes the meal; kazhikkum is the plain future that says it will happen.',
        'Namukku is the same word and typing it is accepted; the display keeps the ḷ of nammaḷ.',
      ],
      tags: [],
    },
    {
      id: 'enikk-oru-glass-vellam-venam',
      manglish: 'enikk oru glass veḷḷam venam',
      script: 'എനിക്ക് ഒരു ഗ്ലാസ് വെള്ളം വേണം',
      meaning: 'I want a glass of water',
      kind: 'sentence',
      audio: {
        slow: 'l4u7l1_enikk-oru-glass-vellam-venam_slow',
        medium: 'l4u7l1_enikk-oru-glass-vellam-venam_medium',
        normal: 'l4u7l1_enikk-oru-glass-vellam-venam_normal',
      },
      acceptedInputs: ['enikk oru glass vellam venam'],
      sentence: {
        bank: ['enikk', 'oru', 'glass', 'veḷḷam', 'venam', 'venda'],
        orders: ['enikk oru glass veḷḷam venam'],
        parts: [
          { word: 'enikk', meaning: 'to me' },
          { word: 'oru', meaning: 'a' },
          { word: 'glass', meaning: 'glass' },
          { word: 'veḷḷam', meaning: 'water' },
          { word: 'venam', meaning: 'wanted' },
        ],
      },
      notes: [
        'Veḷḷam is water; the doubled ḷ is the curled-back l, the same letter as in nammaḷ.',
        'Glass is the English word for the glass itself, and veḷḷam is the water in it.',
        'Venda is the other side: enikk veḷḷam venda, I do not want water.',
      ],
      tags: [],
    },
    {
      id: 'njan-innu-raavile-officil-pokum',
      manglish: 'njan innu raavile officil pokum',
      script: 'ഞാൻ ഇന്ന് രാവിലെ ഓഫീസിൽ പോകും',
      meaning: "I'll go to the office this morning",
      kind: 'sentence',
      audio: {
        slow: 'l4u7l1_njan-innu-raavile-officil-pokum_slow',
        medium: 'l4u7l1_njan-innu-raavile-officil-pokum_medium',
        normal: 'l4u7l1_njan-innu-raavile-officil-pokum_normal',
      },
      sentence: {
        bank: ['njan', 'innu', 'raavile', 'officil', 'pokum', 'pokuva'],
        orders: ['njan innu raavile officil pokum', 'innu raavile njan officil pokum'],
        parts: [
          { word: 'njan', meaning: 'I' },
          { word: 'innu', meaning: 'today' },
          { word: 'raavile', meaning: 'morning' },
          { word: 'officil', meaning: 'to the office' },
          { word: 'pokum', meaning: 'will go' },
        ],
      },
      notes: [
        'Innu raavile is this morning.',
        'The trip is still to come this morning, so the plain future pokum is the word; pokuva, going right now, would say it is already happening.',
      ],
      tags: [],
    },
  ],
  minimalPairs: [],
  drills: [
    { kind: 'multipleChoice', itemId: 'njan-naale-avide-varaam', distractors: ["I'll go over there tonight", 'he came to my house yesterday'] },
    { kind: 'multipleChoice', itemId: 'nammalkku-avide-ninn-kazhikkaam', distractors: ["I'll go over there tonight", 'I want a glass of water'] },
    { kind: 'sentenceBuilder', itemId: 'njan-innale-oru-cinema-kandu', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'njan-innu-raathri-angott-pokum', mode: 'typing' },
    { kind: 'sentenceBuilder', itemId: 'avan-innu-ente-veettil-varum', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'avan-innale-ente-veettil-vannu', mode: 'typing' },
    { kind: 'sentenceBuilder', itemId: 'njan-naale-avide-varaam', mode: 'typing' },
    { kind: 'sentenceBuilder', itemId: 'nammalkku-avide-ninn-kazhikkaam', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'enikk-oru-glass-vellam-venam', mode: 'typing' },
    { kind: 'sentenceBuilder', itemId: 'njan-innu-raavile-officil-pokum', mode: 'bank' },
  ],
  reviewSlots: 0,
  spriteId: 'l4u7l1',
};
