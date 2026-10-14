import type { Lesson } from '../types';

/**
 * Level 5 Unit 2 Lesson 1 — at the market (PLAN.md §5 Level 5): the second
 * dialogue scene. Seven turns, and the learner opens this one too — point at
 * the tomatoes and ask the price with the -kku form — so the first turn
 * carries a word-bank drill instead of a role-play. Every learner turn after
 * it has a role-play drill cued by the line before it. Shop scenes do not
 * haggle (native-speaker ruling 2026-10-12): the price is answered and taken,
 * and the half kilo is the order, not a bargaining move. The English slot-in
 * is kilo.
 */
export const l5u2l1: Lesson = {
  id: 'l5u2l1',
  levelId: 'l5',
  unitId: 'l5u2',
  title: 'At the market',
  comprehensionOnly: false,
  items: [
    {
      id: 'chetta-thakkaalikk-ethra-aanu',
      manglish: 'chetta, thakkaaḷikk ethra aanu?',
      script: 'ചേട്ടാ തക്കാളിക്ക് എത്ര ആണ്?',
      meaning: 'chetta, how much are the tomatoes?',
      kind: 'sentence',
      audio: {
        slow: 'l5u2l1_chetta-thakkaalikk-ethra-aanu_slow',
        medium: 'l5u2l1_chetta-thakkaalikk-ethra-aanu_medium',
        normal: 'l5u2l1_chetta-thakkaalikk-ethra-aanu_normal',
      },
      acceptedInputs: [
        'chetta thakkaalikk ethra aanu',
        'chetta thakkaalikk ethraya',
        'chetta thakkaalikku ethra aanu',
        'thakkaalikk ethra aanu',
      ],
      sentence: {
        bank: ['chetta,', 'thakkaaḷikk', 'ethra', 'aanu', 'kilo'],
        orders: ['chetta, thakkaaḷikk ethra aanu', 'thakkaaḷikk ethra aanu'],
        parts: [
          { word: 'chetta,', meaning: 'chetta! — the call form of chettan' },
          { word: 'thakkaaḷikk', meaning: 'tomatoes — the -kku says the price is for them' },
          { word: 'ethra', meaning: 'how much' },
          { word: 'aanu', meaning: 'is' },
        ],
      },
      notes: [
        'The market question: name what you want with -kku and ask ethra aanu.',
        'Thakkaaḷikk carries the -kku — to the tomatoes, how much is it — and the ḷ is the same sound as in veḷḷam.',
        'You will also hear ethraya, which is ethra with the asking built in. Both are said; this line teaches the ethra aanu one.',
      ],
      tags: [],
    },
    {
      id: 'muppathu-roopa-market',
      manglish: 'muppathu roopa',
      script: 'മുപ്പത് രൂപ',
      meaning: 'thirty rupees',
      kind: 'sentence',
      audio: {
        slow: 'l5u2l1_muppathu-roopa-market_slow',
        medium: 'l5u2l1_muppathu-roopa-market_medium',
        normal: 'l5u2l1_muppathu-roopa-market_normal',
      },
      sentence: {
        bank: ['muppathu', 'roopa', 'patthu'],
        orders: ['muppathu roopa'],
        parts: [
          { word: 'muppathu', meaning: 'thirty' },
          { word: 'roopa', meaning: 'rupees' },
        ],
      },
      notes: [
        'Muppatthu is thirty. The keeper answers a price with the number and roopa, nothing else.',
        'The price is for a kilo of the tomatoes, and it stands as said.',
      ],
      tags: [],
    },
    {
      id: 'sheri-chetta-ara-kilo-eduttho',
      manglish: 'sheri chetta, ara kilo eduttho',
      script: 'ശരി ചേട്ടാ അര കിലോ എടുത്തോ',
      meaning: 'okay chetta, give me half a kilo',
      kind: 'sentence',
      audio: {
        slow: 'l5u2l1_sheri-chetta-ara-kilo-eduttho_slow',
        medium: 'l5u2l1_sheri-chetta-ara-kilo-eduttho_medium',
        normal: 'l5u2l1_sheri-chetta-ara-kilo-eduttho_normal',
      },
      acceptedInputs: ['sheri chetta ara kilo eduttho', 'ara kilo eduttho'],
      sentence: {
        bank: ['sheri', 'chetta,', 'ara', 'kilo', 'eduttho', 'venam'],
        orders: ['sheri chetta, ara kilo eduttho', 'ara kilo eduttho'],
        parts: [
          { word: 'sheri', meaning: 'okay' },
          { word: 'chetta,', meaning: 'chetta! — the call form of chettan' },
          { word: 'ara', meaning: 'half' },
          { word: 'kilo', meaning: 'kilo' },
          { word: 'eduttho', meaning: 'give me' },
        ],
      },
      notes: [
        'Eduttho is take, and said to the keeper it means give me: ara kilo eduttho, weigh out half a kilo.',
        'Ara is half, and kilo is the English word everyone uses for vegetables. Sheri opens the line as the yes to the price.',
      ],
      tags: [],
    },
    {
      id: 'vere-vallathum-veno',
      manglish: 'vere vallathum veno?',
      script: 'വേറെ വല്ലതും വേണോ?',
      meaning: 'anything else?',
      kind: 'sentence',
      audio: {
        slow: 'l5u2l1_vere-vallathum-veno_slow',
        medium: 'l5u2l1_vere-vallathum-veno_medium',
        normal: 'l5u2l1_vere-vallathum-veno_normal',
      },
      sentence: {
        bank: ['vere', 'vallathum', 'veno', 'mathi'],
        orders: ['vere vallathum veno'],
        parts: [
          { word: 'vere', meaning: 'other' },
          { word: 'vallathum', meaning: 'anything' },
          { word: 'veno', meaning: 'want?, do you want?' },
        ],
      },
      notes: [
        'Vallathum is anything; vere makes it anything else.',
        'The keeper asks it before he weighs the tomatoes out, giving you room to add something.',
      ],
      tags: [],
    },
    {
      id: 'venda-ithu-mathi',
      manglish: 'venda, ithu mathi',
      script: 'വേണ്ട ഇത് മതി',
      meaning: 'no, that is enough',
      kind: 'sentence',
      audio: {
        slow: 'l5u2l1_venda-ithu-mathi_slow',
        medium: 'l5u2l1_venda-ithu-mathi_medium',
        normal: 'l5u2l1_venda-ithu-mathi_normal',
      },
      acceptedInputs: ['venda ithu mathi', 'venda ith mathi'],
      sentence: {
        bank: ['venda,', 'ithu', 'mathi', 'venam'],
        orders: ['venda, ithu mathi'],
        parts: [
          { word: 'venda,', meaning: 'do not want' },
          { word: 'ithu', meaning: 'this' },
          { word: 'mathi', meaning: 'is enough' },
        ],
      },
      notes: [
        'Venda starts the answer and ithu mathi finishes it: no, this is enough.',
        'Venda is the no of wanting, the same word as at the tea shop, and mathi settles the amount without refusing anyone.',
        'Ith is accepted in typing; the display keeps the full ithu.',
      ],
      tags: [],
    },
    {
      id: 'pathinanchu-roopa',
      manglish: 'pathinanchu roopa',
      script: 'പതിനഞ്ച് രൂപ',
      meaning: 'fifteen rupees',
      kind: 'sentence',
      audio: {
        slow: 'l5u2l1_pathinanchu-roopa_slow',
        medium: 'l5u2l1_pathinanchu-roopa_medium',
        normal: 'l5u2l1_pathinanchu-roopa_normal',
      },
      sentence: {
        bank: ['pathinanchu', 'roopa', 'muppathu'],
        orders: ['pathinanchu roopa'],
        parts: [
          { word: 'pathinanchu', meaning: 'fifteen' },
          { word: 'roopa', meaning: 'rupees' },
        ],
      },
      notes: [
        'Pathinanchu is fifteen, and it lands like every other price: the number and roopa.',
        'It is the price of the half kilo, worked out from the muppathu roopa a kilo.',
      ],
      tags: [],
    },
    {
      id: 'sheri-pinne-kaanam',
      manglish: 'sheri, pinne kaanam',
      script: 'ശരി പിന്നെ കാണാം',
      meaning: 'okay, see you',
      kind: 'sentence',
      audio: {
        slow: 'l5u2l1_sheri-pinne-kaanam_slow',
        medium: 'l5u2l1_sheri-pinne-kaanam_medium',
        normal: 'l5u2l1_sheri-pinne-kaanam_normal',
      },
      acceptedInputs: ['sheri pinne kaanam', 'pinne kaanam'],
      sentence: {
        bank: ['sheri,', 'pinne', 'kaanam'],
        orders: ['sheri, pinne kaanam'],
        parts: [
          { word: 'sheri,', meaning: 'okay' },
          { word: 'pinne', meaning: 'then, later' },
          { word: 'kaanam', meaning: 'we will see each other' },
        ],
      },
      notes: [
        'Pinne kaanam is the everyday goodbye: literally we will see each other again.',
        'It is what you say to a kada chettan you see regularly — the same stall, the same face, every week.',
      ],
      tags: [],
    },
  ],
  minimalPairs: [],
  drills: [
    { kind: 'sentenceBuilder', itemId: 'chetta-thakkaalikk-ethra-aanu', mode: 'bank' },
    { kind: 'rolePlay', itemId: 'sheri-chetta-ara-kilo-eduttho', promptItemId: 'muppathu-roopa-market', mode: 'bank' },
    { kind: 'rolePlay', itemId: 'venda-ithu-mathi', promptItemId: 'vere-vallathum-veno', mode: 'bank' },
    { kind: 'rolePlay', itemId: 'sheri-pinne-kaanam', promptItemId: 'pathinanchu-roopa', mode: 'typing' },
    {
      kind: 'multipleChoice',
      itemId: 'pathinanchu-roopa',
      distractors: ['thirty rupees', 'okay chetta, give me half a kilo'],
    },
  ],
  reviewSlots: 0,
  spriteId: 'l5u2l1',
};
