import type { Lesson } from '../types';

/**
 * Level 4 Unit 3 Lesson 1 — the frames (PLAN.md §5 Level 4): person +
 * place + verb in the past and the future, built from the Level 3 places
 * and the past and future chunks of the first two lessons. Per the
 * sign-off rulings each sentence carries its time, its place or its
 * person, so the frame says something rather than standing bare.
 */
export const l4u3l1: Lesson = {
  id: 'l4u3l1',
  levelId: 'l4',
  unitId: 'l4u3',
  title: 'Person, place, verb',
  comprehensionOnly: false,
  items: [
    {
      id: 'njan-officil-poi',
      manglish: 'njan officil poyi',
      script: 'ഞാൻ ഓഫീസിൽ പോയി',
      meaning: 'I went to the office',
      kind: 'sentence',
      audio: {
        slow: 'l4u3l1_njan-officil-poi_slow',
        medium: 'l4u3l1_njan-officil-poi_medium',
        normal: 'l4u3l1_njan-officil-poi_normal',
      },
      sentence: {
        bank: ['njan', 'officil', 'poyi', 'pokum'],
        orders: ['njan officil poyi'],
        parts: [
          { word: 'njan', meaning: 'I' },
          { word: 'officil', meaning: 'to the office' },
          { word: 'poyi', meaning: 'went' },
        ],
      },
      notes: ['The Level 3 frame moved to the past: person + place + poyi.'],
      tags: [],
    },
    {
      id: 'njan-jolikku-pokum',
      manglish: 'njan jolikku pokum',
      script: 'ഞാൻ ജോലിക്ക് പോകും',
      meaning: 'I will go to work',
      kind: 'sentence',
      audio: {
        slow: 'l4u3l1_njan-jolikku-pokum_slow',
        medium: 'l4u3l1_njan-jolikku-pokum_medium',
        normal: 'l4u3l1_njan-jolikku-pokum_normal',
      },
      acceptedInputs: ['njan jolikku pokum', 'njan jolikk pokum'],
      sentence: {
        bank: ['njan', 'jolikku', 'pokum', 'poyi'],
        orders: ['njan jolikku pokum'],
        parts: [
          { word: 'njan', meaning: 'I' },
          { word: 'jolikku', meaning: 'to work' },
          { word: 'pokum', meaning: 'will go' },
        ],
      },
      notes: [
        'The same frame in the future.',
        'Fast speech clips it to jolikk, and typing that is accepted; the display keeps the full -kku.',
      ],
      tags: [],
    },
    {
      id: 'avan-veettil-poi',
      manglish: 'avan veettil poyi',
      script: 'അവൻ വീട്ടിൽ പോയി',
      meaning: 'he went home',
      kind: 'sentence',
      audio: {
        slow: 'l4u3l1_avan-veettil-poi_slow',
        medium: 'l4u3l1_avan-veettil-poi_medium',
        normal: 'l4u3l1_avan-veettil-poi_normal',
      },
      sentence: {
        bank: ['avan', 'veettil', 'poyi', 'pokum'],
        orders: ['avan veettil poyi'],
        parts: [
          { word: 'avan', meaning: 'he' },
          { word: 'veettil', meaning: 'home' },
          { word: 'poyi', meaning: 'went' },
        ],
      },
      notes: ['A third person takes the same past chunk.'],
      tags: [],
    },
    {
      id: 'avan-jolikku-pokum',
      manglish: 'avan naaḷe jolikku pokum',
      script: 'അവൻ നാളെ ജോലിക്ക് പോകും',
      meaning: 'he will go to work tomorrow',
      kind: 'sentence',
      audio: {
        slow: 'l4u3l1_avan-jolikku-pokum_slow',
        medium: 'l4u3l1_avan-jolikku-pokum_medium',
        normal: 'l4u3l1_avan-jolikku-pokum_normal',
      },
      acceptedInputs: ['avan naale jolikku pokum', 'avan naale jolikk pokum'],
      sentence: {
        bank: ['avan', 'naaḷe', 'jolikku', 'pokum', 'poyi'],
        orders: ['avan naaḷe jolikku pokum'],
        parts: [
          { word: 'avan', meaning: 'he' },
          { word: 'naaḷe', meaning: 'tomorrow' },
          { word: 'jolikku', meaning: 'to work' },
          { word: 'pokum', meaning: 'will go' },
        ],
      },
      notes: [
        'A future sentence needs its time: naaḷe, tomorrow, says when.',
        'Fast speech clips it to jolikk, and typing that is accepted; the display keeps the full -kku.',
      ],
      tags: [],
    },
    {
      id: 'nammal-kadayil-poi',
      manglish: 'avaḷ kadayilekku poyi',
      script: 'അവൾ കടയിലേക്ക് പോയി',
      meaning: 'she went to the shop',
      kind: 'sentence',
      audio: {
        slow: 'l4u3l1_nammal-kadayil-poi_slow',
        medium: 'l4u3l1_nammal-kadayil-poi_medium',
        normal: 'l4u3l1_nammal-kadayil-poi_normal',
      },
      sentence: {
        bank: ['avaḷ', 'kadayilekku', 'poyi', 'pokum'],
        orders: ['avaḷ kadayilekku poyi'],
        parts: [
          { word: 'avaḷ', meaning: 'she' },
          { word: 'kadayilekku', meaning: 'to the shop' },
          { word: 'poyi', meaning: 'went' },
        ],
      },
      notes: ['A different person in the same frame, with the heading-to form kadayilekku.'],
      tags: [],
    },
    {
      id: 'njan-hotelil-kazhichu',
      manglish: 'njan hotelil ninn kazhichu',
      script: 'ഞാൻ ഹോട്ടലിൽ നിന്ന് കഴിച്ചു',
      meaning: 'I ate from the hotel',
      kind: 'sentence',
      audio: {
        slow: 'l4u3l1_njan-hotelil-kazhichu_slow',
        medium: 'l4u3l1_njan-hotelil-kazhichu_medium',
        normal: 'l4u3l1_njan-hotelil-kazhichu_normal',
      },
      sentence: {
        bank: ['njan', 'hotelil', 'ninn', 'kazhichu'],
        orders: ['njan hotelil ninn kazhichu'],
        parts: [
          { word: 'njan', meaning: 'I' },
          { word: 'hotelil', meaning: 'at the hotel' },
          { word: 'ninn', meaning: 'from' },
          { word: 'kazhichu', meaning: 'ate' },
        ],
      },
      notes: [
        'In Kerala a hotel means the eatery, and ninn says the food came from there: hotelil ninn kazhichu, ate from the hotel.',
        'The same ninn as officil ninn, from the office.',
      ],
      tags: [],
    },
    {
      id: 'njan-busil-keri',
      manglish: 'njan busil keri',
      script: 'ഞാൻ ബസ്സിൽ കേറി',
      meaning: 'I got on the bus',
      kind: 'sentence',
      audio: {
        slow: 'l4u3l1_njan-busil-keri_slow',
        medium: 'l4u3l1_njan-busil-keri_medium',
        normal: 'l4u3l1_njan-busil-keri_normal',
      },
      sentence: {
        bank: ['njan', 'busil', 'keri', 'irangi'],
        orders: ['njan busil keri'],
        parts: [
          { word: 'njan', meaning: 'I' },
          { word: 'busil', meaning: 'on the bus' },
          { word: 'keri', meaning: 'got on' },
        ],
      },
      notes: ['Keruka is climbing on; keri is got on. The way off is irangi.'],
      tags: [],
    },
    {
      id: 'avan-athu-cheythu',
      manglish: 'avan athu cheythu',
      script: 'അവൻ അത് ചെയ്തു',
      meaning: 'he did that',
      kind: 'sentence',
      audio: {
        slow: 'l4u3l1_avan-athu-cheythu_slow',
        medium: 'l4u3l1_avan-athu-cheythu_medium',
        normal: 'l4u3l1_avan-athu-cheythu_normal',
      },
      sentence: {
        bank: ['avan', 'athu', 'cheythu', 'cheyyum'],
        orders: ['avan athu cheythu'],
        parts: [
          { word: 'avan', meaning: 'he' },
          { word: 'athu', meaning: 'that' },
          { word: 'cheythu', meaning: 'did' },
        ],
      },
      notes: ['Cheythu, the past of cheyyuva.'],
      tags: [],
    },
    {
      id: 'njan-athu-paranju',
      manglish: 'njan athu paranju',
      script: 'ഞാൻ അത് പറഞ്ഞു',
      meaning: 'I said that',
      kind: 'sentence',
      audio: {
        slow: 'l4u3l1_njan-athu-paranju_slow',
        medium: 'l4u3l1_njan-athu-paranju_medium',
        normal: 'l4u3l1_njan-athu-paranju_normal',
      },
      sentence: {
        bank: ['njan', 'athu', 'paranju', 'parayuva'],
        orders: ['njan athu paranju'],
        parts: [
          { word: 'njan', meaning: 'I' },
          { word: 'athu', meaning: 'that' },
          { word: 'paranju', meaning: 'said' },
        ],
      },
      notes: ['Paranju, the past of parayuva, with the thing said.'],
      tags: [],
    },
    {
      id: 'nammal-veettil-pokum',
      manglish: 'nammaḷ innu raathri veettil pokum',
      script: 'നമ്മൾ ഇന്ന് രാത്രി വീട്ടിൽ പോകും',
      meaning: 'we will go home tonight',
      kind: 'sentence',
      audio: {
        slow: 'l4u3l1_nammal-veettil-pokum_slow',
        medium: 'l4u3l1_nammal-veettil-pokum_medium',
        normal: 'l4u3l1_nammal-veettil-pokum_normal',
      },
      sentence: {
        bank: ['nammaḷ', 'innu', 'raathri', 'veettil', 'pokum', 'poyi'],
        orders: ['nammaḷ innu raathri veettil pokum'],
        parts: [
          { word: 'nammaḷ', meaning: 'we (you and me)' },
          { word: 'innu', meaning: 'today' },
          { word: 'raathri', meaning: 'night' },
          { word: 'veettil', meaning: 'home' },
          { word: 'pokum', meaning: 'will go' },
        ],
      },
      notes: [
        'A future with its time: innu raathri, tonight, is when the going happens.',
        'Nammaḷ veettil pokuva is now; pokum is later.',
      ],
      tags: [],
    },
  ],
  minimalPairs: [],
  drills: [
    { kind: 'sentenceBuilder', itemId: 'njan-officil-poi', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'njan-jolikku-pokum', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'avan-veettil-poi', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'avan-jolikku-pokum', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'nammal-kadayil-poi', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'njan-hotelil-kazhichu', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'njan-busil-keri', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'avan-athu-cheythu', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'njan-athu-paranju', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'nammal-veettil-pokum', mode: 'bank' },
  ],
  reviewSlots: 0,
  spriteId: 'l4u3l1',
};
