import type { Lesson } from '../types';

/**
 * Level 2 Unit 1 Lesson 4 — mixed sentence practice. Every sentence
 * reuses Level 1 and Level 2 words; the word-by-word breakdown covers
 * anything new.
 */
export const l2u1l4: Lesson = {
  id: 'l2u1l4',
  levelId: 'l2',
  unitId: 'l2u1',
  title: 'Say it in one line',
  comprehensionOnly: false,
  items: [
    {
      id: 'njan-veettil-ninn-irangi',
      manglish: 'njan veettil ninn irangi',
      script: 'ഞാൻ വീട്ടിൽ നിന്ന് ഇറങ്ങി',
      meaning: 'I just left home',
      kind: 'sentence',
      audio: {
        slow: 'l2u1l4_njan-veettil-ninn-irangi_slow',
        medium: 'l2u1l4_njan-veettil-ninn-irangi_medium',
        normal: 'l2u1l4_njan-veettil-ninn-irangi_normal',
      },
      sentence: {
        bank: ['njan', 'veettil', 'ninn', 'irangi', 'pokuva'],
        orders: ['njan veettil ninn irangi'],
        parts: [
          { word: 'njan', meaning: 'I' },
          { word: 'veettil', meaning: 'home' },
          { word: 'ninn', meaning: 'from' },
          { word: 'irangi', meaning: 'left; set off' },
        ],
      },
      notes: [
        'The on-my-way message: ninn marks "from".',
        'Iranguva is the leaving word (present: setting off), and irangi is its past — "I left".',
      ],
      tags: [],
    },
    {
      id: 'avan-chaaya-kudikkuva',
      manglish: 'avan chaaya kudikkuva',
      script: 'അവൻ ചായ കുടിക്കുവാ',
      meaning: 'he is drinking tea',
      kind: 'sentence',
      audio: {
        slow: 'l2u1l4_avan-chaaya-kudikkuva_slow',
        medium: 'l2u1l4_avan-chaaya-kudikkuva_medium',
        normal: 'l2u1l4_avan-chaaya-kudikkuva_normal',
      },
      sentence: {
        bank: ['avan', 'chaaya', 'kudikkuva', 'njan'],
        orders: ['avan chaaya kudikkuva'],
        parts: [
          { word: 'avan', meaning: 'he' },
          { word: 'chaaya', meaning: 'tea' },
          { word: 'kudikkuva', meaning: 'drinking' },
        ],
      },
      notes: ['The same -uva pattern with a different subject.'],
      tags: [],
    },
    {
      id: 'njan-veettil-pokuva',
      manglish: 'njan veettil pokuva',
      script: 'ഞാൻ വീട്ടിൽ പോകുവാ',
      meaning: 'I am going home',
      kind: 'sentence',
      audio: {
        slow: 'l2u1l4_njan-veettil-pokuva_slow',
        medium: 'l2u1l4_njan-veettil-pokuva_medium',
        normal: 'l2u1l4_njan-veettil-pokuva_normal',
      },
      sentence: {
        bank: ['njan', 'veettil', 'pokuva', 'varuva'],
        orders: ['njan veettil pokuva'],
        parts: [
          { word: 'njan', meaning: 'I' },
          { word: 'veettil', meaning: 'to home (veedu plus -il)' },
          { word: 'pokuva', meaning: 'going' },
        ],
      },
      notes: ['veedu + -il becomes veettil — the d doubles.'],
      tags: [],
    },
    {
      id: 'nammal-veettil-pokuva',
      manglish: 'nammaḷ veettil pokuva',
      script: 'നമ്മൾ വീട്ടിൽ പോകുവാ',
      meaning: 'we are going home',
      kind: 'sentence',
      audio: {
        slow: 'l2u1l4_nammal-veettil-pokuva_slow',
        medium: 'l2u1l4_nammal-veettil-pokuva_medium',
        normal: 'l2u1l4_nammal-veettil-pokuva_normal',
      },
      sentence: {
        bank: ['nammaḷ', 'veettil', 'pokuva', 'varatte'],
        orders: ['nammaḷ veettil pokuva'],
        parts: [
          { word: 'nammaḷ', meaning: 'we (you and me)' },
          { word: 'veettil', meaning: 'to home (veedu plus -il)' },
          { word: 'pokuva', meaning: 'going' },
        ],
      },
      notes: ['The inclusive we, heading home.'],
      tags: [],
    },
    {
      id: 'avan-varunundo',
      manglish: 'avan varunnundo',
      script: 'അവൻ വരുന്നുണ്ടോ',
      meaning: 'is he coming?',
      kind: 'sentence',
      audio: {
        slow: 'l2u1l4_avan-varunundo_slow',
        medium: 'l2u1l4_avan-varunundo_medium',
        normal: 'l2u1l4_avan-varunundo_normal',
      },
      sentence: {
        bank: ['avan', 'varunnundo', 'veno'],
        orders: ['avan varunnundo'],
        parts: [
          { word: 'avan', meaning: 'he' },
          { word: 'varunnundo', meaning: 'coming?' },
        ],
      },
      notes: ['Checking on someone: avan varunnundo?'],
      tags: [],
    },
    {
      id: 'nee-varunundo',
      manglish: 'nee varunnundo',
      script: 'നീ വരുന്നുണ്ടോ',
      meaning: 'are you coming?',
      kind: 'sentence',
      audio: {
        slow: 'l2u1l4_nee-varunundo_slow',
        medium: 'l2u1l4_nee-varunundo_medium',
        normal: 'l2u1l4_nee-varunundo_normal',
      },
      sentence: {
        bank: ['nee', 'varunnundo', 'pokatte'],
        orders: ['nee varunnundo'],
        parts: [
          { word: 'nee', meaning: 'you (intimate)' },
          { word: 'varunnundo', meaning: 'coming?' },
        ],
      },
      acceptedInputs: ['nee varunnundo', 'ni varunnundo'],
      notes: [
        'The casual invite with nee.',
        'Saying nee varuva straight reads like a command, so questions use varunnundo.',
      ],
      tags: [],
    },
    {
      id: 'enikk-chaaya-venam',
      manglish: 'enikk chaaya venam',
      script: 'എനിക്ക് ചായ വേണം',
      meaning: 'I want tea',
      kind: 'sentence',
      audio: {
        slow: 'l2u1l4_enikk-chaaya-venam_slow',
        medium: 'l2u1l4_enikk-chaaya-venam_medium',
        normal: 'l2u1l4_enikk-chaaya-venam_normal',
      },
      sentence: {
        bank: ['enikk', 'chaaya', 'venam', 'njan'],
        orders: ['enikk chaaya venam'],
        parts: [
          { word: 'enikk', meaning: 'to me' },
          { word: 'chaaya', meaning: 'tea' },
          { word: 'venam', meaning: 'want, need' },
        ],
      },
      notes: [
        'Wanting puts the person in the to-me form: enikk, to me.',
        'The negative counterpart: enikk chaaya venda — I do not want tea.',
      ],
      tags: [],
    },
    {
      id: 'athu-venda',
      manglish: 'athu venda',
      script: 'അത് വേണ്ട',
      meaning: "don't want that",
      kind: 'sentence',
      audio: {
        slow: 'l2u1l4_athu-venda_slow',
        medium: 'l2u1l4_athu-venda_medium',
        normal: 'l2u1l4_athu-venda_normal',
      },
      sentence: {
        bank: ['athu', 'venda', 'venam'],
        orders: ['athu venda'],
        parts: [
          { word: 'athu', meaning: 'that' },
          { word: 'venda', meaning: "don't want" },
        ],
      },
      notes: ['The polite refusal: athu venda.'],
      tags: [],
    },
    {
      id: 'njan-ready-alla',
      manglish: 'njan ready alla',
      script: 'ഞാൻ റെഡി അല്ല',
      meaning: 'I am not ready',
      kind: 'sentence',
      audio: {
        slow: 'l2u1l4_njan-ready-alla_slow',
        medium: 'l2u1l4_njan-ready-alla_medium',
        normal: 'l2u1l4_njan-ready-alla_normal',
      },
      sentence: {
        bank: ['njan', 'ready', 'alla', 'aa'],
        orders: ['njan ready alla'],
        parts: [
          { word: 'njan', meaning: 'I' },
          { word: 'ready', meaning: 'ready' },
          { word: 'alla', meaning: 'not' },
        ],
      },
      notes: ['The not-is word: alla replaces aa — njan ready aa, I am ready; njan ready alla, I am not.'],
      tags: [],
    },
  ],
  minimalPairs: [],
  drills: [
    { kind: 'sentenceBuilder', itemId: 'njan-veettil-ninn-irangi', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'avan-chaaya-kudikkuva', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'njan-veettil-pokuva', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'nammal-veettil-pokuva', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'avan-varunundo', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'nee-varunundo', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'enikk-chaaya-venam', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'athu-venda', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'njan-ready-alla', mode: 'bank' },
  ],
  reviewSlots: 0,
  spriteId: 'l2u1l4',
};
