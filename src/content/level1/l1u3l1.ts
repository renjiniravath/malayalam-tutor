import type { Lesson } from '../types';

/**
 * Level 1 Unit 3 Lesson 1 — I and you. Politeness is the point here:
 * the nee / ningaḷ / thaankaḷ ladder is a first-class early module
 * (PLAN.md §5, §8) — ningaḷ is the safe default with strangers.
 */
export const l1u3l1: Lesson = {
  id: 'l1u3l1',
  levelId: 'l1',
  unitId: 'l1u3',
  title: 'I and you',
  comprehensionOnly: false,
  items: [
    {
      id: 'njan',
      manglish: 'njan',
      script: 'ഞാൻ',
      meaning: 'I',
      kind: 'word',
      pos: 'pronoun',
      audio: {
        slow: 'l1u3l1_njan_slow',
        medium: 'l1u3l1_njan_medium',
        normal: 'l1u3l1_njan_normal',
      },
      acceptedInputs: ['njan'],
      notes: ['The nj is one sound — like the ny in "canyon".'],
      tags: [],
    },
    {
      id: 'nee',
      manglish: 'nee',
      script: 'നീ',
      meaning: 'you (intimate)',
      kind: 'word',
      pos: 'pronoun',
      audio: {
        slow: 'l1u3l1_nee_slow',
        medium: 'l1u3l1_nee_medium',
        normal: 'l1u3l1_nee_normal',
      },
      acceptedInputs: ['nee', 'ni'],
      notes: [
        'For close friends, family, and kids.',
        'With strangers or elders, use ningaḷ.',
        'Also written ni.',
      ],
      tags: [],
    },
    {
      id: 'ningal',
      manglish: 'ningaḷ',
      script: 'നിങ്ങൾ',
      meaning: 'you (polite)',
      kind: 'word',
      pos: 'pronoun',
      audio: {
        slow: 'l1u3l1_ningal_slow',
        medium: 'l1u3l1_ningal_medium',
        normal: 'l1u3l1_ningal_normal',
      },
      acceptedInputs: ['ningal'],
      notes: ['The safe default — strangers, elders, anyone you just met.'],
      tags: [],
    },
    {
      id: 'thaankal',
      manglish: 'thaankaḷ',
      script: 'താങ്കൾ',
      meaning: 'you (very formal)',
      kind: 'word',
      pos: 'pronoun',
      audio: {
        slow: 'l1u3l1_thaankal_slow',
        medium: 'l1u3l1_thaankal_medium',
        normal: 'l1u3l1_thaankal_normal',
      },
      acceptedInputs: ['thaankal', 'taankal'],
      notes: ['Formal and deferential — official or deeply respectful settings.'],
      tags: [],
    },
  ],
  minimalPairs: [],
  drills: [
    { kind: 'multipleChoice', itemId: 'njan', distractors: ['you (intimate)', 'you (polite)', 'you (very formal)'] },
    { kind: 'multipleChoice', itemId: 'nee', distractors: ['I', 'you (polite)', 'you (very formal)'] },
    { kind: 'multipleChoice', itemId: 'ningal', distractors: ['I', 'you (intimate)', 'you (very formal)'] },
    { kind: 'multipleChoice', itemId: 'thaankal', distractors: ['I', 'you (intimate)', 'you (polite)'] },
  ],
  reviewSlots: 0,
  spriteId: 'l1u3l1',
};
