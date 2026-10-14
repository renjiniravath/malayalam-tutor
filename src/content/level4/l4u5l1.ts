import type { Lesson } from '../types';

/**
 * Level 4 Unit 5 Lesson 1 — saying no (PLAN.md §5 Level 4): illa for what
 * is not there, alla for what something is not, venda for what you do not
 * want, all inside the sentences the learner already has. The three no's
 * are used as whole answers, never as isolated words, and the past has its
 * own no in the -illa family (vannilla, kandilla, etthiyilla) that the
 * native speaker asked to be taught as a set (ruling 2026-10-12).
 */
export const l4u5l1: Lesson = {
  id: 'l4u5l1',
  levelId: 'l4',
  unitId: 'l4u5',
  title: 'Saying no',
  comprehensionOnly: false,
  items: [
    {
      id: 'enikk-ippo-time-illa',
      manglish: 'enikk ippo time illa',
      script: 'എനിക്ക് ഇപ്പോ ടൈം ഇല്ല',
      meaning: "I don't have time now",
      kind: 'sentence',
      audio: {
        slow: 'l4u5l1_enikk-ippo-time-illa_slow',
        medium: 'l4u5l1_enikk-ippo-time-illa_medium',
        normal: 'l4u5l1_enikk-ippo-time-illa_normal',
      },
      sentence: {
        bank: ['enikk', 'ippo', 'time', 'illa', 'venda'],
        orders: ['enikk ippo time illa'],
        parts: [
          { word: 'enikk', meaning: 'to me' },
          { word: 'ippo', meaning: 'now' },
          { word: 'time', meaning: 'time' },
          { word: 'illa', meaning: 'there is none' },
        ],
      },
      notes: [
        'Illa says the thing is not there: no time at all.',
        'Time is the English word, kept as it is — Malayalis say it this way every day.',
      ],
      tags: [],
    },
    {
      id: 'innu-class-illa',
      manglish: 'innu class illa',
      script: 'ഇന്ന് ക്ലാസ്സ് ഇല്ല',
      meaning: 'there is no class today',
      kind: 'sentence',
      audio: {
        slow: 'l4u5l1_innu-class-illa_slow',
        medium: 'l4u5l1_innu-class-illa_medium',
        normal: 'l4u5l1_innu-class-illa_normal',
      },
      acceptedInputs: ['innu class illa', 'inn class illa'],
      sentence: {
        bank: ['innu', 'class', 'illa', 'und'],
        orders: ['innu class illa'],
        parts: [
          { word: 'innu', meaning: 'today' },
          { word: 'class', meaning: 'class' },
          { word: 'illa', meaning: 'there is none' },
        ],
      },
      notes: [
        'Its other side is innu class und, there is class today.',
        'Inn is accepted in typing, but innu is the word.',
      ],
      tags: [],
    },
    {
      id: 'avan-innale-officil-vannilla',
      manglish: 'avan innale officil vannilla',
      script: 'അവൻ ഇന്നലെ ഓഫീസിൽ വന്നില്ല',
      meaning: "he didn't come to the office yesterday",
      kind: 'sentence',
      audio: {
        slow: 'l4u5l1_avan-innale-officil-vannilla_slow',
        medium: 'l4u5l1_avan-innale-officil-vannilla_medium',
        normal: 'l4u5l1_avan-innale-officil-vannilla_normal',
      },
      sentence: {
        bank: ['avan', 'innale', 'officil', 'vannilla', 'vannu'],
        orders: ['avan innale officil vannilla'],
        parts: [
          { word: 'avan', meaning: 'he' },
          { word: 'innale', meaning: 'yesterday' },
          { word: 'officil', meaning: 'to the office' },
          { word: 'vannilla', meaning: 'did not come' },
        ],
      },
      notes: [
        'The past has its own no: vannu, came — vannilla, did not come.',
        'Innale, yesterday, is what puts the sentence in the past.',
      ],
      tags: [],
    },
    {
      id: 'vannilla',
      manglish: 'vannilla',
      script: 'വന്നില്ല',
      meaning: "didn't come",
      kind: 'word',
      audio: {
        slow: 'l4u5l1_vannilla_slow',
        medium: 'l4u5l1_vannilla_medium',
        normal: 'l4u5l1_vannilla_normal',
      },
      acceptedInputs: ['vannilla'],
      notes: [
        'Vannu, came — vannilla, did not come.',
        'The action keeps its past shape and the illa says it did not happen.',
      ],
      tags: [],
    },
    {
      id: 'kandilla',
      manglish: 'kandilla',
      script: 'കണ്ടില്ല',
      meaning: "didn't see",
      kind: 'word',
      audio: {
        slow: 'l4u5l1_kandilla_slow',
        medium: 'l4u5l1_kandilla_medium',
        normal: 'l4u5l1_kandilla_normal',
      },
      acceptedInputs: ['kandilla'],
      notes: [
        'Kandu, saw — kandilla, did not see.',
        'The same move as vannilla: the past word first, then illa.',
      ],
      tags: [],
    },
    {
      id: 'etthiyilla',
      manglish: 'etthiyilla',
      script: 'എത്തിയില്ല',
      meaning: "didn't arrive",
      kind: 'word',
      audio: {
        slow: 'l4u5l1_etthiyilla_slow',
        medium: 'l4u5l1_etthiyilla_medium',
        normal: 'l4u5l1_etthiyilla_normal',
      },
      acceptedInputs: ['etthiyilla', 'ethiyilla'],
      notes: [
        'Etthi is to arrive or reach: etthi, arrived — etthiyilla, did not arrive.',
        'Ethi is accepted in typing; the display carries the tth of etthi.',
        'The family so far: vannilla, kandilla, etthiyilla.',
      ],
      tags: [],
    },
    {
      id: 'veettil-aarum-illa',
      manglish: 'veettil aarum illa',
      script: 'വീട്ടിൽ ആരും ഇല്ല',
      meaning: 'nobody is home',
      kind: 'sentence',
      audio: {
        slow: 'l4u5l1_veettil-aarum-illa_slow',
        medium: 'l4u5l1_veettil-aarum-illa_medium',
        normal: 'l4u5l1_veettil-aarum-illa_normal',
      },
      sentence: {
        bank: ['veettil', 'aarum', 'illa', 'aaru'],
        orders: ['veettil aarum illa'],
        parts: [
          { word: 'veettil', meaning: 'at home' },
          { word: 'aarum', meaning: 'anyone' },
          { word: 'illa', meaning: 'there is none' },
        ],
      },
      notes: [
        'Aarum is anyone, and with illa it means nobody at all: veettil aarum illa, nobody is home.',
        'The question word is aaru, who; aarum with illa is the answer nobody.',
      ],
      tags: [],
    },
    {
      id: 'ithu-ente-bag-alla',
      manglish: 'ithu ente bag alla',
      script: 'ഇത് എന്റെ ബാഗ് അല്ല',
      meaning: 'this is not my bag',
      kind: 'sentence',
      audio: {
        slow: 'l4u5l1_ithu-ente-bag-alla_slow',
        medium: 'l4u5l1_ithu-ente-bag-alla_medium',
        normal: 'l4u5l1_ithu-ente-bag-alla_normal',
      },
      acceptedInputs: ['ithu ente bag alla', 'ith ente bag alla'],
      sentence: {
        bank: ['ithu', 'ente', 'bag', 'alla', 'illa'],
        orders: ['ithu ente bag alla'],
        parts: [
          { word: 'ithu', meaning: 'this' },
          { word: 'ente', meaning: 'my' },
          { word: 'bag', meaning: 'bag' },
          { word: 'alla', meaning: 'is not' },
        ],
      },
      notes: [
        'You say it with the bag in your hand: this one is not mine.',
        'Alla takes away the mine and leaves the bag; illa would say there is no bag at all.',
        'Bag is the English word, used as it is.',
        'Ith is accepted in typing; the display keeps the full ithu.',
      ],
      tags: [],
    },
    {
      id: 'athu-ente-laptop-alla',
      manglish: 'athu ente laptop alla',
      script: 'അത് എന്റെ ലാപ്ടോപ്പ് അല്ല',
      meaning: 'that is not my laptop',
      kind: 'sentence',
      audio: {
        slow: 'l4u5l1_athu-ente-laptop-alla_slow',
        medium: 'l4u5l1_athu-ente-laptop-alla_medium',
        normal: 'l4u5l1_athu-ente-laptop-alla_normal',
      },
      sentence: {
        bank: ['athu', 'ente', 'laptop', 'alla', 'ithu'],
        orders: ['athu ente laptop alla'],
        parts: [
          { word: 'athu', meaning: 'that' },
          { word: 'ente', meaning: 'my' },
          { word: 'laptop', meaning: 'laptop' },
          { word: 'alla', meaning: 'is not' },
        ],
      },
      notes: [
        'The pair of ithu: ithu points here, athu points away.',
        'A laptop is something you point at or hand back, so the sentence has something to stand on.',
        'Laptop is the English word, used as it is.',
      ],
      tags: [],
    },
    {
      id: 'enikk-chaaya-venda',
      manglish: 'enikk chaaya venda',
      script: 'എനിക്ക് ചായ വേണ്ട',
      meaning: "I don't want tea",
      kind: 'sentence',
      audio: {
        slow: 'l4u5l1_enikk-chaaya-venda_slow',
        medium: 'l4u5l1_enikk-chaaya-venda_medium',
        normal: 'l4u5l1_enikk-chaaya-venda_normal',
      },
      sentence: {
        bank: ['enikk', 'chaaya', 'venda', 'venam'],
        orders: ['enikk chaaya venda'],
        parts: [
          { word: 'enikk', meaning: 'to me' },
          { word: 'chaaya', meaning: 'tea' },
          { word: 'venda', meaning: 'not wanted' },
        ],
      },
      notes: [
        'Venda is the no to venam: enikk chaaya venam is I want tea, enikk chaaya venda is I do not.',
        'Venda turns the tea down; nothing is missing, you are answering the offer.',
      ],
      tags: [],
    },
    {
      id: 'enikk-ippo-onnum-venda',
      manglish: 'enikk ippo onnum venda',
      script: 'എനിക്ക് ഇപ്പോ ഒന്നും വേണ്ട',
      meaning: "I don't want anything right now",
      kind: 'sentence',
      audio: {
        slow: 'l4u5l1_enikk-ippo-onnum-venda_slow',
        medium: 'l4u5l1_enikk-ippo-onnum-venda_medium',
        normal: 'l4u5l1_enikk-ippo-onnum-venda_normal',
      },
      sentence: {
        bank: ['enikk', 'ippo', 'onnum', 'venda', 'venam'],
        orders: ['enikk ippo onnum venda'],
        parts: [
          { word: 'enikk', meaning: 'to me' },
          { word: 'ippo', meaning: 'now' },
          { word: 'onnum', meaning: 'anything' },
          { word: 'venda', meaning: 'not wanted' },
        ],
      },
      notes: [
        'Onnum is anything, and with venda it means nothing at all.',
        'The same onnum the course already gave you in onnum illa, now with the wanting word.',
      ],
      tags: [],
    },
  ],
  minimalPairs: [],
  drills: [
    { kind: 'multipleChoice', itemId: 'enikk-ippo-time-illa', distractors: ["I don't want tea", 'nobody is home'] },
    { kind: 'multipleChoice', itemId: 'veettil-aarum-illa', distractors: ["I don't have time now", 'there is no class today'] },
    { kind: 'multipleChoice', itemId: 'vannilla', distractors: ["didn't see", "didn't arrive"] },
    { kind: 'multipleChoice', itemId: 'kandilla', distractors: ["didn't come", "didn't arrive"] },
    { kind: 'multipleChoice', itemId: 'etthiyilla', distractors: ["didn't come", "didn't see"] },
    { kind: 'multipleChoice', itemId: 'ithu-ente-bag-alla', distractors: ['that is not my laptop', "I don't want tea"] },
    { kind: 'multipleChoice', itemId: 'enikk-chaaya-venda', distractors: ['this is not my bag', "I don't want anything right now"] },
    { kind: 'sentenceBuilder', itemId: 'enikk-ippo-time-illa', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'innu-class-illa', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'avan-innale-officil-vannilla', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'veettil-aarum-illa', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'ithu-ente-bag-alla', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'athu-ente-laptop-alla', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'enikk-chaaya-venda', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'enikk-ippo-onnum-venda', mode: 'bank' },
  ],
  reviewSlots: 0,
  spriteId: 'l4u5l1',
};
