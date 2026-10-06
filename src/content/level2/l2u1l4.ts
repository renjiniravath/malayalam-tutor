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
      id: 'njan-ippo-varuva',
      manglish: 'njan ippo varuva',
      script: 'ഞാൻ ഇപ്പോ വരുവാ',
      meaning: 'I am coming now',
      kind: 'sentence',
      audio: {
        slow: 'l2u1l4_njan-ippo-varuva_slow',
        medium: 'l2u1l4_njan-ippo-varuva_medium',
        normal: 'l2u1l4_njan-ippo-varuva_normal',
      },
      sentence: {
        bank: ['njan', 'ippo', 'varuva', 'pokatte'],
        orders: ['njan ippo varuva'],
        parts: [
          { word: 'njan', meaning: 'I' },
          { word: 'ippo', meaning: 'now' },
          { word: 'varuva', meaning: 'coming' },
        ],
      },
      notes: ['The classic "on my way": njan ippo varuva.'],
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
      notes: ['The sandhi: veedu plus -il becomes veettil, with the retroflex d doubled.'],
      tags: [],
    },
    {
      id: 'nammal-ippo-pokuva',
      manglish: 'nammaḷ ippo pokuva',
      script: 'നമ്മൾ ഇപ്പോ പോകുവാ',
      meaning: 'we are going now',
      kind: 'sentence',
      audio: {
        slow: 'l2u1l4_nammal-ippo-pokuva_slow',
        medium: 'l2u1l4_nammal-ippo-pokuva_medium',
        normal: 'l2u1l4_nammal-ippo-pokuva_normal',
      },
      sentence: {
        bank: ['nammaḷ', 'ippo', 'pokuva', 'varatte'],
        orders: ['nammaḷ ippo pokuva'],
        parts: [
          { word: 'nammaḷ', meaning: 'we (you and me)' },
          { word: 'ippo', meaning: 'now' },
          { word: 'pokuva', meaning: 'go, going' },
        ],
      },
      notes: ['The inclusive we: you and me are going now.'],
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
      notes: [
        'The casual invite with nee.',
        'A bare second-person -uva declarative reads like a command, so questions use varunnundo.',
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
      notes: ['Wanting takes the dative: enikk, to me.'],
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
      notes: ['The negative copula: alla replaces aa.'],
      tags: [],
    },
    {
      id: 'njan-parayuva',
      manglish: 'njan parayuva',
      script: 'ഞാൻ പറയുവാ',
      meaning: 'I am saying',
      kind: 'sentence',
      audio: {
        slow: 'l2u1l4_njan-parayuva_slow',
        medium: 'l2u1l4_njan-parayuva_medium',
        normal: 'l2u1l4_njan-parayuva_normal',
      },
      sentence: {
        bank: ['njan', 'parayuva', 'ketto'],
        orders: ['njan parayuva'],
        parts: [
          { word: 'njan', meaning: 'I' },
          { word: 'parayuva', meaning: 'saying' },
        ],
      },
      notes: ['The continuous form of parayu: I am saying.'],
      tags: [],
    },
  ],
  minimalPairs: [],
  drills: [
    { kind: 'sentenceBuilder', itemId: 'njan-ippo-varuva', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'avan-chaaya-kudikkuva', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'njan-veettil-pokuva', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'nammal-ippo-pokuva', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'avan-varunundo', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'nee-varunundo', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'enikk-chaaya-venam', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'athu-venda', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'njan-ready-alla', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'njan-parayuva', mode: 'bank' },
  ],
  reviewSlots: 0,
  spriteId: 'l2u1l4',
};
