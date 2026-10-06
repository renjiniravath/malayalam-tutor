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
        bank: ['njan', 'ippo', 'varuva', 'pokatte?'],
        orders: ['njan ippo varuva'],
        parts: [
          { word: 'njan', meaning: 'I' },
          { word: 'ippo', meaning: 'now' },
          { word: 'varuva', meaning: 'come, coming' },
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
          { word: 'kudikkuva', meaning: 'drink, drinking' },
        ],
      },
      notes: ['The same -uva pattern with a different subject.'],
      tags: [],
    },
    {
      id: 'njan-veedu-pokuva',
      manglish: 'njan viidu pokuva',
      script: 'ഞാൻ വീട് പോകുവാ',
      meaning: 'I am going home',
      kind: 'sentence',
      audio: {
        slow: 'l2u1l4_njan-veedu-pokuva_slow',
        medium: 'l2u1l4_njan-veedu-pokuva_medium',
        normal: 'l2u1l4_njan-veedu-pokuva_normal',
      },
      sentence: {
        bank: ['njan', 'viidu', 'pokuva', 'varuva'],
        orders: ['njan viidu pokuva'],
        parts: [
          { word: 'njan', meaning: 'I' },
          { word: 'viidu', meaning: 'home, house' },
          { word: 'pokuva', meaning: 'go, going' },
        ],
      },
      notes: ['Going home needs no "to": viidu pokuva.'],
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
        bank: ['nammaḷ', 'ippo', 'pokuva', 'varatte?'],
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
      id: 'avan-varunno',
      manglish: 'avan varunno?',
      script: 'അവൻ വരുന്നോ',
      meaning: 'is he coming?',
      kind: 'sentence',
      audio: {
        slow: 'l2u1l4_avan-varunno_slow',
        medium: 'l2u1l4_avan-varunno_medium',
        normal: 'l2u1l4_avan-varunno_normal',
      },
      sentence: {
        bank: ['avan', 'varunno?', 'veno?'],
        orders: ['avan varunno?'],
        parts: [
          { word: 'avan', meaning: 'he' },
          { word: 'varunno?', meaning: 'coming?' },
        ],
      },
      notes: ['Checking on someone: avan varunno?'],
      tags: [],
    },
    {
      id: 'nii-varunno',
      manglish: 'nii varunno?',
      script: 'നീ വരുന്നോ',
      meaning: 'are you coming?',
      kind: 'sentence',
      audio: {
        slow: 'l2u1l4_nii-varunno_slow',
        medium: 'l2u1l4_nii-varunno_medium',
        normal: 'l2u1l4_nii-varunno_normal',
      },
      sentence: {
        bank: ['nii', 'varunno?', 'pokatte?'],
        orders: ['nii varunno?'],
        parts: [
          { word: 'nii', meaning: 'you (intimate)' },
          { word: 'varunno?', meaning: 'coming?' },
        ],
      },
      notes: ['The casual invite with nii.'],
      tags: [],
    },
    {
      id: 'njan-chaaya-venam',
      manglish: 'njan chaaya venam',
      script: 'ഞാൻ ചായ വേണം',
      meaning: 'I want tea',
      kind: 'sentence',
      audio: {
        slow: 'l2u1l4_njan-chaaya-venam_slow',
        medium: 'l2u1l4_njan-chaaya-venam_medium',
        normal: 'l2u1l4_njan-chaaya-venam_normal',
      },
      sentence: {
        bank: ['njan', 'chaaya', 'venam', 'veno?'],
        orders: ['njan chaaya venam'],
        parts: [
          { word: 'njan', meaning: 'I' },
          { word: 'chaaya', meaning: 'tea' },
          { word: 'venam', meaning: 'want, need' },
        ],
      },
      notes: ['The plain want: njan chaaya venam.'],
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
      meaning: 'I will say it',
      kind: 'sentence',
      audio: {
        slow: 'l2u1l4_njan-parayuva_slow',
        medium: 'l2u1l4_njan-parayuva_medium',
        normal: 'l2u1l4_njan-parayuva_normal',
      },
      sentence: {
        bank: ['njan', 'parayuva', 'kettiyo?'],
        orders: ['njan parayuva'],
        parts: [
          { word: 'njan', meaning: 'I' },
          { word: 'parayuva', meaning: 'say, will say' },
        ],
      },
      notes: ['Offering to speak up: njan parayuva.'],
      tags: [],
    },
  ],
  minimalPairs: [],
  drills: [
    { kind: 'sentenceBuilder', itemId: 'njan-ippo-varuva', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'avan-chaaya-kudikkuva', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'njan-veedu-pokuva', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'nammal-ippo-pokuva', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'avan-varunno', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'nii-varunno', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'njan-chaaya-venam', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'athu-venda', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'njan-ready-alla', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'njan-parayuva', mode: 'bank' },
  ],
  reviewSlots: 0,
  spriteId: 'l2u1l4',
};
