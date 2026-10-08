import type { Lesson } from '../types';

/**
 * Level 2 Unit 2 Lesson 2 — chettan and chechi, the title substitution
 * (PLAN.md §5). The call form drops the final -n: chettan becomes
 * chetta! when you summon someone. The vocative is an address, never a
 * sentence subject — the addressed question carries the comma
 * (chetta, varunnundo), never bare chetta varunnundo.
 */
export const l2u2l2: Lesson = {
  id: 'l2u2l2',
  levelId: 'l2',
  unitId: 'l2u2',
  title: 'Chettan and Chechi',
  comprehensionOnly: false,
  items: [
    {
      id: 'chettan',
      manglish: 'chettan',
      script: 'ചേട്ടൻ',
      meaning: 'older brother; a friendly address for men',
      kind: 'word',
      audio: {
        slow: 'l2u2l2_chettan_slow',
        medium: 'l2u2l2_chettan_medium',
        normal: 'l2u2l2_chettan_normal',
      },
      acceptedInputs: ['chettan'],
      notes: ['The base form — used when talking about him, and the polite address in its own right.'],
      tags: [],
    },
    {
      id: 'chetta',
      manglish: 'chetta',
      script: 'ചേട്ടാ',
      meaning: 'chetta! — the call form of chettan',
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
        'The final -n drops when you summon: chettan becomes chetta!',
        'A calling word only: you are addressing him, not talking about him. Say chetta, ith kando (chetta, did you see this?) — with the comma.',
      ],
      tags: ['sound:geminate'],
    },
    {
      id: 'chechi',
      manglish: 'chechi',
      script: 'ചേച്ചി',
      meaning: 'older sister; the everyday address for women',
      kind: 'word',
      audio: {
        slow: 'l2u2l2_chechi_slow',
        medium: 'l2u2l2_chechi_medium',
        normal: 'l2u2l2_chechi_normal',
      },
      acceptedInputs: ['chechi'],
      notes: ['The female counterpart of chettan — the safe address for any woman older than you.'],
      tags: [],
    },
    {
      id: 'chettan-varunnundo',
      manglish: 'chettan varunnundo',
      script: 'ചേട്ടൻ വരുന്നുണ്ടോ',
      meaning: 'is chettan coming?',
      kind: 'sentence',
      audio: {
        slow: 'l2u2l2_chettan-varunnundo_slow',
        medium: 'l2u2l2_chettan-varunnundo_medium',
        normal: 'l2u2l2_chettan-varunnundo_normal',
      },
      sentence: {
        bank: ['chettan', 'varunnundo', 'chetta,', 'chechi'],
        orders: ['chettan varunnundo'],
        parts: [
          { word: 'chettan', meaning: 'older brother; a friendly address for men' },
          { word: 'varunnundo', meaning: 'coming?' },
        ],
      },
      notes: ['Asking the chettan himself, chetta, varunnundo? works too — the next item covers exactly that.'],
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
        bank: ['chetta,', 'varunnundo', 'nee', 'chechi'],
        orders: ['chetta, varunnundo'],
        parts: [
          { word: 'chetta,', meaning: 'chetta! — the call form of chettan' },
          { word: 'varunnundo', meaning: 'coming?' },
        ],
      },
      notes: ['The comma marks the address: chetta, varunnundo — the question form, never the bare -uva.'],
      tags: [],
    },
    {
      id: 'chetta-coffee-veno',
      manglish: 'chetta, kaappi veno',
      script: 'ചേട്ടാ കാപ്പി വേണോ',
      meaning: 'chetta, do you want coffee?',
      kind: 'sentence',
      audio: {
        slow: 'l2u2l2_chetta-coffee-veno_slow',
        medium: 'l2u2l2_chetta-coffee-veno_medium',
        normal: 'l2u2l2_chetta-coffee-veno_normal',
      },
      sentence: {
        bank: ['chetta,', 'kaappi', 'veno', 'chaaya'],
        orders: ['chetta, kaappi veno'],
        parts: [
          { word: 'chetta,', meaning: 'chetta! — the call form of chettan' },
          { word: 'kaappi', meaning: 'coffee' },
          { word: 'veno', meaning: 'want?, do you want?' },
        ],
      },
      notes: ['Kaappi is the Malayalam word for coffee — the same one from the greetings lesson.'],
      tags: [],
    },
    {
      id: 'chechi-ready-aano',
      manglish: 'chechi, ready aano',
      script: 'ചേച്ചി റെഡി ആണോ',
      meaning: 'chechi, are you ready?',
      kind: 'sentence',
      audio: {
        slow: 'l2u2l2_chechi-ready-aano_slow',
        medium: 'l2u2l2_chechi-ready-aano_medium',
        normal: 'l2u2l2_chechi-ready-aano_normal',
      },
      sentence: {
        bank: ['chechi,', 'ready', 'aano', 'athe'],
        orders: ['chechi, ready aano'],
        parts: [
          { word: 'chechi,', meaning: 'older sister; the everyday address for women' },
          { word: 'ready', meaning: 'ready' },
          { word: 'aano', meaning: 'is it?' },
        ],
      },
      notes: ['Aano does the question; chechi does the politeness.'],
      tags: [],
    },
    {
      id: 'chechi-chaaya-veno',
      manglish: 'chechi, chaaya veno',
      script: 'ചേച്ചി ചായ വേണോ',
      meaning: 'chechi, do you want tea?',
      kind: 'sentence',
      audio: {
        slow: 'l2u2l2_chechi-chaaya-veno_slow',
        medium: 'l2u2l2_chechi-chaaya-veno_medium',
        normal: 'l2u2l2_chechi-chaaya-veno_normal',
      },
      sentence: {
        bank: ['chechi,', 'chaaya', 'veno', 'kaappi'],
        orders: ['chechi, chaaya veno'],
        parts: [
          { word: 'chechi,', meaning: 'older sister; the everyday address for women' },
          { word: 'chaaya', meaning: 'tea' },
          { word: 'veno', meaning: 'want?, do you want?' },
        ],
      },
      notes: ['The standard offer, delivered politely.'],
      tags: [],
    },
    {
      id: 'chechi-varunnundo',
      manglish: 'chechi varunnundo',
      script: 'ചേച്ചി വരുന്നുണ്ടോ',
      meaning: 'is chechi coming?',
      kind: 'sentence',
      audio: {
        slow: 'l2u2l2_chechi-varunnundo_slow',
        medium: 'l2u2l2_chechi-varunnundo_medium',
        normal: 'l2u2l2_chechi-varunnundo_normal',
      },
      sentence: {
        bank: ['chechi', 'varunnundo', 'chettan', 'chetta,'],
        orders: ['chechi varunnundo'],
        parts: [
          { word: 'chechi', meaning: 'older sister; the everyday address for women' },
          { word: 'varunnundo', meaning: 'coming?' },
        ],
      },
      notes: ['Talking about her: chechi as the subject.'],
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
    { kind: 'multipleChoice', itemId: 'chettan', distractors: ['older sister; the everyday address for women', 'chechi, are you ready?', 'are you busy?'] },
    { kind: 'multipleChoice', itemId: 'chetta', distractors: ['older sister; the everyday address for women', 'is chettan coming?', 'are you busy?'] },
    { kind: 'multipleChoice', itemId: 'chechi', distractors: ['older brother; a friendly address for men', 'chetta, are you coming?', 'are you busy?'] },
    { kind: 'sentenceBuilder', itemId: 'chettan-varunnundo', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'chetta-varunnundo', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'chetta-coffee-veno', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'chechi-ready-aano', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'chechi-chaaya-veno', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'chechi-varunnundo', mode: 'bank' },
    { kind: 'sentenceBuilder', itemId: 'ningal-busy-aano', mode: 'bank' },
  ],
  reviewSlots: 0,
  spriteId: 'l2u2l2',
};
