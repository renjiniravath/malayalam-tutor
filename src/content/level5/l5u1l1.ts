import type { Lesson } from '../types';

/**
 * Level 5 Unit 1 Lesson 1 — at the tea shop (PLAN.md §5 Level 5): the first
 * dialogue scene. Seven turns, and the learner opens it: the order, the
 * answer about sugar, the refusal, the ready call, the price question, the
 * price, and the goodbye. Shop scenes do not haggle (native-speaker ruling
 * 2026-10-12), so the price is taken as said. Every chettan turn is a cue;
 * each learner turn after the opener carries a role-play drill whose cue is
 * the line right before it, so the scene plays through as a conversation.
 * The English slot-ins are sugar and ready, and both go into the sentence
 * untouched.
 */
export const l5u1l1: Lesson = {
  id: 'l5u1l1',
  levelId: 'l5',
  unitId: 'l5u1',
  title: 'At the tea shop',
  comprehensionOnly: false,
  items: [
    {
      id: 'chetta-oru-chaaya',
      manglish: 'chetta, oru chaaya',
      script: 'ചേട്ടാ ഒരു ചായ',
      meaning: 'chetta, one tea',
      kind: 'sentence',
      audio: {
        slow: 'l5u1l1_chetta-oru-chaaya_slow',
        medium: 'l5u1l1_chetta-oru-chaaya_medium',
        normal: 'l5u1l1_chetta-oru-chaaya_normal',
      },
      acceptedInputs: ['chetta oru chaaya', 'oru chaaya'],
      sentence: {
        bank: ['chetta,', 'oru', 'chaaya', 'venda'],
        orders: ['chetta, oru chaaya'],
        parts: [
          { word: 'chetta,', meaning: 'chetta! — the call form of chettan' },
          { word: 'oru', meaning: 'a, one' },
          { word: 'chaaya', meaning: 'tea' },
        ],
      },
      notes: [
        'This is the learner opening the scene: chetta, oru chaaya — one tea, and the chettan takes it from there.',
        'Chetta is the chettan from the greetings, called straight at him; the order itself is oru chaaya, one tea.',
      ],
      tags: [],
    },
    {
      id: 'sugar-idano',
      manglish: 'sugar idaṇo',
      script: 'ഷുഗർ ഇടണോ',
      meaning: 'shall I put sugar?',
      kind: 'sentence',
      audio: {
        slow: 'l5u1l1_sugar-idano_slow',
        medium: 'l5u1l1_sugar-idano_medium',
        normal: 'l5u1l1_sugar-idano_normal',
      },
      acceptedInputs: ['sugar idano'],
      sentence: {
        bank: ['sugar', 'idaṇo', 'venda'],
        orders: ['sugar idaṇo'],
        parts: [
          { word: 'sugar', meaning: 'sugar' },
          { word: 'idaṇo', meaning: 'shall I put?' },
        ],
      },
      notes: [
        'Idaṇo is put with the asking built in: the whole question is shall I put it in.',
        'Sugar keeps its English spelling in the everyday script too. The answer comes back as venda or venam.',
      ],
      tags: [],
    },
    {
      id: 'venda-chetta',
      manglish: 'venda chetta',
      script: 'വേണ്ട ചേട്ടാ',
      meaning: 'no thanks, chetta',
      kind: 'sentence',
      audio: {
        slow: 'l5u1l1_venda-chetta_slow',
        medium: 'l5u1l1_venda-chetta_medium',
        normal: 'l5u1l1_venda-chetta_normal',
      },
      acceptedInputs: ['venda chetta', 'venda'],
      sentence: {
        bank: ['venda', 'chetta', 'venam'],
        orders: ['venda chetta'],
        parts: [
          { word: 'venda', meaning: 'do not want' },
          { word: 'chetta', meaning: 'chetta! — the call form of chettan' },
        ],
      },
      notes: [
        'Venda refuses the sugar and keeps the chettan: the no of wanting, with his name after it to soften it.',
        'Venam would have said yes, put it in. Venda is the answer that hands it back.',
      ],
      tags: [],
    },
    {
      id: 'chaaya-ready',
      manglish: 'chaaya ready',
      script: 'ചായ റെഡി',
      meaning: 'the tea is ready',
      kind: 'sentence',
      audio: {
        slow: 'l5u1l1_chaaya-ready_slow',
        medium: 'l5u1l1_chaaya-ready_medium',
        normal: 'l5u1l1_chaaya-ready_normal',
      },
      sentence: {
        bank: ['chaaya', 'ready', 'aayi'],
        orders: ['chaaya ready'],
        parts: [
          { word: 'chaaya', meaning: 'tea' },
          { word: 'ready', meaning: 'ready' },
        ],
      },
      notes: [
        'The chettan calls it out as the glass lands on the counter: chaaya ready.',
        'Ready is the same word as in chaaya ready aayi, here carrying the whole line on its own. The price question comes next.',
      ],
      tags: [],
    },
    {
      id: 'ethra-aayi-chetta',
      manglish: 'ethra aayi, chetta',
      script: 'എത്ര ആയി ചേട്ടാ',
      meaning: 'how much is it, chetta?',
      kind: 'sentence',
      audio: {
        slow: 'l5u1l1_ethra-aayi-chetta_slow',
        medium: 'l5u1l1_ethra-aayi-chetta_medium',
        normal: 'l5u1l1_ethra-aayi-chetta_normal',
      },
      acceptedInputs: ['ethra aayi chetta', 'ethra aayi'],
      sentence: {
        bank: ['ethra', 'aayi,', 'chetta', 'roopa'],
        orders: ['ethra aayi, chetta'],
        parts: [
          { word: 'ethra', meaning: 'how much' },
          { word: 'aayi,', meaning: 'did it come to' },
          { word: 'chetta', meaning: 'chetta! — the call form of chettan' },
        ],
      },
      notes: [
        'Ethra aayi asks the price once the tea is in front of you: how much did it come to.',
        'Aayi is the word from ready aayi, and the chetta goes on the end so the question stays friendly.',
        'Ethra on its own asks the same thing when the thing you mean is already clear.',
      ],
      tags: [],
    },
    {
      id: 'patthu-roopa',
      manglish: 'patthu roopa',
      script: 'പത്ത് രൂപ',
      meaning: 'ten rupees',
      kind: 'sentence',
      audio: {
        slow: 'l5u1l1_patthu-roopa_slow',
        medium: 'l5u1l1_patthu-roopa_medium',
        normal: 'l5u1l1_patthu-roopa_normal',
      },
      sentence: {
        bank: ['patthu', 'roopa', 'ethra'],
        orders: ['patthu roopa'],
        parts: [
          { word: 'patthu', meaning: 'ten' },
          { word: 'roopa', meaning: 'rupees' },
        ],
      },
      notes: [
        'Patthu is ten, the counting word from the numbers lesson.',
        'A price is the number and roopa, nothing else — and at a tea shop it is taken as said.',
      ],
      tags: [],
    },
    {
      id: 'thanks-chetta-pinne-kaanam',
      manglish: 'thanks chetta, pinne kaanam',
      meaning: 'thanks chetta, see you',
      kind: 'sentence',
      audio: {
        slow: 'l5u1l1_thanks-chetta-pinne-kaanam_slow',
        medium: 'l5u1l1_thanks-chetta-pinne-kaanam_medium',
        normal: 'l5u1l1_thanks-chetta-pinne-kaanam_normal',
      },
      acceptedInputs: ['thanks chetta pinne kaanam', 'pinne kaanam'],
      sentence: {
        bank: ['thanks', 'chetta,', 'pinne', 'kaanam', 'sheri,'],
        orders: ['thanks chetta, pinne kaanam'],
        parts: [
          { word: 'thanks', meaning: 'thanks' },
          { word: 'chetta,', meaning: 'chetta! — the call form of chettan' },
          { word: 'pinne', meaning: 'then, later' },
          { word: 'kaanam', meaning: 'we will see each other' },
        ],
      },
      notes: [
        'Thanks is part English, so this line carries no script.',
        'Pinne kaanam is the goodbye a kada chettan hears all day: what you say to a shopkeeper you see regularly.',
      ],
      tags: [],
    },
  ],
  minimalPairs: [],
  drills: [
    { kind: 'multipleChoice', itemId: 'sugar-idano', distractors: ['no thanks, chetta', 'the tea is ready'] },
    { kind: 'sentenceBuilder', itemId: 'chetta-oru-chaaya', mode: 'bank' },
    { kind: 'rolePlay', itemId: 'venda-chetta', promptItemId: 'sugar-idano', mode: 'typing' },
    { kind: 'rolePlay', itemId: 'ethra-aayi-chetta', promptItemId: 'chaaya-ready', mode: 'bank' },
    { kind: 'rolePlay', itemId: 'thanks-chetta-pinne-kaanam', promptItemId: 'patthu-roopa', mode: 'typing' },
  ],
  reviewSlots: 0,
  spriteId: 'l5u1l1',
};
