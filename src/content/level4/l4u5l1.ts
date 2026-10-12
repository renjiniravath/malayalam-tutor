import type { Lesson } from '../types';

/**
 * Level 4 Unit 5 Lesson 1 — saying no (PLAN.md §5 Level 4): illa for what
 * is not there, alla for what something is not, venda for what you do not
 * want, all inside the sentences the learner already has. The three no's
 * are used as whole answers, never as isolated words.
 */
export const l4u5l1: Lesson = {
  id: 'l4u5l1',
  levelId: 'l4',
  unitId: 'l4u5',
  title: 'Saying no',
  comprehensionOnly: false,
  items: [
    {
      id: 'enikk-ippo-kaashu-illa',
      manglish: 'enikk ippo kaashu illa',
      script: 'എനിക്ക് ഇപ്പോ കാശു ഇല്ല',
      meaning: "I don't have money now",
      kind: 'sentence',
      audio: {
        slow: 'l4u5l1_enikk-ippo-kaashu-illa_slow',
        medium: 'l4u5l1_enikk-ippo-kaashu-illa_medium',
        normal: 'l4u5l1_enikk-ippo-kaashu-illa_normal',
      },
      sentence: {
        bank: ['enikk', 'ippo', 'kaashu', 'illa', 'venda'],
        orders: ['enikk ippo kaashu illa'],
        parts: [
          { word: 'enikk', meaning: 'to me' },
          { word: 'ippo', meaning: 'now' },
          { word: 'kaashu', meaning: 'money' },
          { word: 'illa', meaning: 'there is none' },
        ],
      },
      notes: [
        'Illa says the thing is not there: no money, none at all.',
        'Kaashu is money — the word you need at every counter in Kerala.',
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
      id: 'avan-innale-officil-illa',
      manglish: 'avan innale officil illa',
      script: 'അവൻ ഇന്നലെ ഓഫീസിൽ ഇല്ല',
      meaning: "he wasn't at the office yesterday",
      kind: 'sentence',
      audio: {
        slow: 'l4u5l1_avan-innale-officil-illa_slow',
        medium: 'l4u5l1_avan-innale-officil-illa_medium',
        normal: 'l4u5l1_avan-innale-officil-illa_normal',
      },
      sentence: {
        bank: ['avan', 'innale', 'officil', 'illa', 'und'],
        orders: ['avan innale officil illa'],
        parts: [
          { word: 'avan', meaning: 'he' },
          { word: 'innale', meaning: 'yesterday' },
          { word: 'officil', meaning: 'at the office' },
          { word: 'illa', meaning: 'was not there' },
        ],
      },
      notes: ['One word covers was-not-there and is-not-there: innale, yesterday, is what makes it the past.'],
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
      id: 'ithu-ente-chaaya-alla',
      manglish: 'ithu ente chaaya alla',
      script: 'ഇത് എന്റെ ചായ അല്ല',
      meaning: 'this is not my tea',
      kind: 'sentence',
      audio: {
        slow: 'l4u5l1_ithu-ente-chaaya-alla_slow',
        medium: 'l4u5l1_ithu-ente-chaaya-alla_medium',
        normal: 'l4u5l1_ithu-ente-chaaya-alla_normal',
      },
      sentence: {
        bank: ['ithu', 'ente', 'chaaya', 'alla', 'illa'],
        orders: ['ithu ente chaaya alla'],
        parts: [
          { word: 'ithu', meaning: 'this' },
          { word: 'ente', meaning: 'my' },
          { word: 'chaaya', meaning: 'tea' },
          { word: 'alla', meaning: 'is not' },
        ],
      },
      notes: [
        'Alla says the thing is not that one. The tea is there — it is just not mine.',
        'Illa would say there is no tea at all; alla keeps the tea and takes away the mine.',
      ],
      tags: [],
    },
    {
      id: 'athu-ente-veedu-alla',
      manglish: 'athu ente veedu alla',
      script: 'അത് എന്റെ വീട് അല്ല',
      meaning: 'that is not my house',
      kind: 'sentence',
      audio: {
        slow: 'l4u5l1_athu-ente-veedu-alla_slow',
        medium: 'l4u5l1_athu-ente-veedu-alla_medium',
        normal: 'l4u5l1_athu-ente-veedu-alla_normal',
      },
      sentence: {
        bank: ['athu', 'ente', 'veedu', 'alla', 'ithu'],
        orders: ['athu ente veedu alla'],
        parts: [
          { word: 'athu', meaning: 'that' },
          { word: 'ente', meaning: 'my' },
          { word: 'veedu', meaning: 'house' },
          { word: 'alla', meaning: 'is not' },
        ],
      },
      notes: [
        'The pair of ithu: ithu points here, athu points away.',
        'Same alla as the tea, the same not-that-one.',
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
    { kind: 'multipleChoice', itemId: 'enikk-ippo-kaashu-illa', distractors: ["I don't want tea", 'nobody is home'] },
    { kind: 'multipleChoice', itemId: 'veettil-aarum-illa', distractors: ["I don't have money now", 'there is no class today'] },
    { kind: 'multipleChoice', itemId: 'ithu-ente-chaaya-alla', distractors: ['that is not my house', "I don't want tea"] },
    { kind: 'multipleChoice', itemId: 'enikk-chaaya-venda', distractors: ['this is not my tea', "I don't want anything right now"] },
    { kind: 'sentenceBuilder', itemId: 'enikk-ippo-kaashu-illa', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'innu-class-illa', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'avan-innale-officil-illa', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'veettil-aarum-illa', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'ithu-ente-chaaya-alla', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'athu-ente-veedu-alla', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'enikk-chaaya-venda', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'enikk-ippo-onnum-venda', mode: 'bank' },
  ],
  reviewSlots: 0,
  spriteId: 'l4u5l1',
};
