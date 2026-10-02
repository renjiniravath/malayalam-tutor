import type { Lesson } from '../types';

/**
 * Level 1 Unit 3 Lesson 2 — he, she, and the inclusive we. Ends with the
 * pro-drop note: subjects are dropped when clear, and verbs never change
 * for the person (PLAN.md §5, §8) — so sheri alone is a full answer.
 */
export const l1u3l2: Lesson = {
  id: 'l1u3l2',
  levelId: 'l1',
  unitId: 'l1u3',
  title: 'He, she, and us',
  comprehensionOnly: false,
  items: [
    {
      id: 'avan',
      manglish: 'avan',
      script: 'അവൻ',
      meaning: 'he',
      kind: 'word',
      pos: 'pronoun',
      audio: {
        slow: 'l1u3l2_avan_slow',
        medium: 'l1u3l2_avan_medium',
        normal: 'l1u3l2_avan_normal',
      },
      acceptedInputs: ['avan'],
      notes: ['Also a casual "that one" for people and things.'],
      tags: [],
    },
    {
      id: 'aval',
      manglish: 'avaḷ',
      script: 'അവൾ',
      meaning: 'she',
      kind: 'word',
      pos: 'pronoun',
      audio: {
        slow: 'l1u3l2_aval_slow',
        medium: 'l1u3l2_aval_medium',
        normal: 'l1u3l2_aval_normal',
      },
      acceptedInputs: ['aval'],
      notes: ['The casual "she" — also "that one" for women.'],
      tags: [],
    },
    {
      id: 'nammal',
      manglish: 'nammaḷ',
      script: 'നമ്മൾ',
      meaning: 'we (you and me)',
      kind: 'word',
      pos: 'pronoun',
      audio: {
        slow: 'l1u3l2_nammal_slow',
        medium: 'l1u3l2_nammal_medium',
        normal: 'l1u3l2_nammal_normal',
      },
      acceptedInputs: ['nammal'],
      notes: ['The inclusive we — always includes the person you are talking to.'],
      tags: [],
    },
    {
      id: 'namukku',
      manglish: 'namukku',
      script: 'നമുക്ക്',
      meaning: "let's; to us",
      kind: 'word',
      pos: 'pronoun',
      audio: {
        slow: 'l1u3l2_namukku_slow',
        medium: 'l1u3l2_namukku_medium',
        normal: 'l1u3l2_namukku_normal',
      },
      acceptedInputs: ['namukku'],
      notes: ['From nammaḷ: namukku pokaam, let us go.'],
      tags: [],
    },
    {
      id: 'njan-sheri',
      manglish: 'njan sheri',
      script: 'ഞാൻ ശെരി',
      meaning: 'I am fine',
      kind: 'phrase',
      audio: {
        slow: 'l1u3l2_njan-sheri_slow',
        medium: 'l1u3l2_njan-sheri_medium',
        normal: 'l1u3l2_njan-sheri_normal',
      },
      acceptedInputs: ['njan sheri', 'njan seri', 'sheri'],
      notes: [
        'Malayalis drop the subject when it is clear — just sheri is a full answer.',
        'Verbs never change for the person — sheri works for I, you, he, she, we.',
      ],
      tags: [],
    },
  ],
  minimalPairs: [],
  drills: [
    { kind: 'multipleChoice', itemId: 'avan', distractors: ['she', 'we (you and me)', 'I am fine'] },
    { kind: 'multipleChoice', itemId: 'aval', distractors: ['he', "let's; to us", 'I am fine'] },
    { kind: 'multipleChoice', itemId: 'nammal', distractors: ['he', 'she', "let's; to us"] },
    { kind: 'multipleChoice', itemId: 'namukku', distractors: ['we (you and me)', 'she', 'I am fine'] },
    { kind: 'multipleChoice', itemId: 'njan-sheri', distractors: ['he', 'she', "let's; to us"] },
  ],
  reviewSlots: 0,
  spriteId: 'l1u3l2',
};
