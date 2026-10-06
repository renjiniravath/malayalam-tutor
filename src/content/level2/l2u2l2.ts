import type { Lesson } from '../types';

/**
 * Level 2 Unit 2 Lesson 2 — title substitution (PLAN.md §5): Aunty and
 * Chetta stand in for names. Chetta is a vocative only: it addresses,
 * never acts as a sentence subject — the addressed question carries the
 * comma (chetta, varunnundo), never bare chetta varunnundo.
 */
export const l2u2l2: Lesson = {
  id: 'l2u2l2',
  levelId: 'l2',
  unitId: 'l2u2',
  title: 'Aunty and Chetta',
  comprehensionOnly: false,
  items: [
    {
      id: 'chetta',
      manglish: 'chetta',
      script: 'ചേട്ടാ',
      meaning: 'older brother; a friendly address for men',
      kind: 'word',
      audio: {
        slow: 'l2u2l2_chetta_slow',
        medium: 'l2u2l2_chetta_medium',
        normal: 'l2u2l2_chetta_normal',
        focus: ['l2u2l2_chetta_focus'],
      },
      acceptedInputs: ['chetta'],
      articulation: {
        cue: 'Hold the doubled tt.',
      },
      notes: [
        'The safe, warm way to address a man you do not know well.',
        'A vocative only: it calls someone, never stands as the subject. Say chetta, ith kando — with the comma.',
      ],
      tags: ['sound:geminate'],
    },
    {
      id: 'aunty',
      manglish: 'aunty',
      script: 'ആന്റി',
      meaning: 'aunty — the everyday address for women',
      kind: 'word',
      audio: {
        slow: 'l2u2l2_aunty_slow',
        medium: 'l2u2l2_aunty_medium',
        normal: 'l2u2l2_aunty_normal',
      },
      acceptedInputs: ['aunty', 'anty'],
      notes: ['An English word that Kerala adopted whole — the everyday address for women.'],
      tags: [],
    },
    {
      id: 'chetta-varunnundo',
      manglish: 'chetta, varunnundo',
      script: 'ചേട്ടാ വരുന്നുണ്ടോ',
      meaning: 'chetta, are you coming?',
      kind: 'sentence',
      audio: {
        slow: 'l2u2l2_chetta-varunnundo_slow',
        medium: 'l2u2l2_chetta-varunnundo_medium',
        normal: 'l2u2l2_chetta-varunnundo_normal',
      },
      sentence: {
        bank: ['chetta,', 'varunnundo', 'nee', 'aunty'],
        orders: ['chetta, varunnundo'],
        parts: [
          { word: 'chetta,', meaning: 'older brother; a friendly address for men' },
          { word: 'varunnundo', meaning: 'coming?' },
        ],
      },
      notes: ['The comma marks the address: chetta, varunnundo — the question form, never the bare -uva.'],
      tags: [],
    },
    {
      id: 'chetta-coffee-veno',
      manglish: 'chetta, coffee veno',
      script: 'ചേട്ടാ കോഫി വേണോ',
      meaning: 'chetta, do you want coffee?',
      kind: 'sentence',
      audio: {
        slow: 'l2u2l2_chetta-coffee-veno_slow',
        medium: 'l2u2l2_chetta-coffee-veno_medium',
        normal: 'l2u2l2_chetta-coffee-veno_normal',
      },
      sentence: {
        bank: ['chetta,', 'coffee', 'veno', 'chaaya'],
        orders: ['chetta, coffee veno'],
        parts: [
          { word: 'chetta,', meaning: 'older brother; a friendly address for men' },
          { word: 'coffee', meaning: 'coffee' },
          { word: 'veno', meaning: 'want?, do you want?' },
        ],
      },
      notes: ['Coffee is an English slot — beginner sentences use English until the Malayalam word is taught.'],
      tags: [],
    },
    {
      id: 'aunty-ready-aano',
      manglish: 'aunty, ready aano',
      script: 'ആന്റി റെഡി ആണോ',
      meaning: 'Aunty, are you ready?',
      kind: 'sentence',
      audio: {
        slow: 'l2u2l2_aunty-ready-aano_slow',
        medium: 'l2u2l2_aunty-ready-aano_medium',
        normal: 'l2u2l2_aunty-ready-aano_normal',
      },
      sentence: {
        bank: ['aunty,', 'ready', 'aano', 'athe'],
        orders: ['aunty, ready aano'],
        parts: [
          { word: 'aunty,', meaning: 'aunty — the everyday address for women' },
          { word: 'ready', meaning: 'ready' },
          { word: 'aano', meaning: 'is it?' },
        ],
      },
      notes: ['Aano does the question; aunty does the politeness.'],
      tags: [],
    },
    {
      id: 'aunty-chaaya-veno',
      manglish: 'aunty, chaaya veno',
      script: 'ആന്റി ചായ വേണോ',
      meaning: 'Aunty, do you want tea?',
      kind: 'sentence',
      audio: {
        slow: 'l2u2l2_aunty-chaaya-veno_slow',
        medium: 'l2u2l2_aunty-chaaya-veno_medium',
        normal: 'l2u2l2_aunty-chaaya-veno_normal',
      },
      sentence: {
        bank: ['aunty,', 'chaaya', 'veno', 'coffee'],
        orders: ['aunty, chaaya veno'],
        parts: [
          { word: 'aunty,', meaning: 'aunty — the everyday address for women' },
          { word: 'chaaya', meaning: 'tea' },
          { word: 'veno', meaning: 'want?, do you want?' },
        ],
      },
      notes: ['The standard offer, delivered politely.'],
      tags: [],
    },
    {
      id: 'ningal-busy-aano',
      manglish: 'ningaḷ busy aano',
      script: 'നിങ്ങൾ ബിസി ആണോ',
      meaning: 'are you busy?',
      kind: 'sentence',
      audio: {
        slow: 'l2u2l2_ningal-busy-aano_slow',
        medium: 'l2u2l2_ningal-busy-aano_medium',
        normal: 'l2u2l2_ningal-busy-aano_normal',
      },
      sentence: {
        bank: ['ningaḷ', 'busy', 'aano', 'ready'],
        orders: ['ningaḷ busy aano'],
        parts: [
          { word: 'ningaḷ', meaning: 'you' },
          { word: 'busy', meaning: 'busy' },
          { word: 'aano', meaning: 'is it?' },
        ],
      },
      notes: ['Busy fills an untaught slot in English — the polite default with ningaḷ.'],
      tags: [],
    },
  ],
  minimalPairs: [],
  drills: [
    { kind: 'multipleChoice', itemId: 'chetta', distractors: ['aunty — the everyday address for women', 'Aunty, are you ready?', 'are you busy?'] },
    { kind: 'multipleChoice', itemId: 'aunty', distractors: ['older brother; a friendly address for men', 'chetta, are you coming?', 'are you busy?'] },
    { kind: 'sentenceBuilder', itemId: 'chetta-varunnundo', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'chetta-coffee-veno', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'aunty-ready-aano', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'aunty-chaaya-veno', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'ningal-busy-aano', mode: 'bank' },
  ],
  reviewSlots: 0,
  spriteId: 'l2u2l2',
};
