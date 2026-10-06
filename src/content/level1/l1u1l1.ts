import type { Lesson } from '../types';

/**
 * Level 1 Unit 1 Lesson 1 — the zh sound (ഴ).
 * Comprehension-only: hear, recognize, discriminate. No speaking yet.
 */
export const l1u1l1: Lesson = {
  id: 'l1u1l1',
  levelId: 'l1',
  unitId: 'l1u1',
  title: 'The zh sound',
  comprehensionOnly: true,
  items: [
    {
      id: 'mazha',
      manglish: 'mazha',
      script: 'മഴ',
      meaning: 'rain',
      kind: 'word',
      articulation: {
        cue: 'Curl the tongue tip up and back toward the roof of the mouth, leaving a small gap, and let the air flow over it. Like an English r, but further back.',
      },
      audio: {
        slow: 'l1u1l1_mazha_slow',
        medium: 'l1u1l1_mazha_medium',
        normal: 'l1u1l1_mazha_normal',
        focus: ['l1u1l1_mazha_focus'],
      },
      acceptedInputs: ['mazha'],
      notes: ['Also in mazhakaalam, the rainy season.'],
      tags: ['sound:zh'],
    },
    {
      id: 'azhaku',
      manglish: 'azhaku',
      script: 'അഴക്',
      meaning: 'beauty',
      kind: 'word',
      articulation: {
        cue: 'Start with a short a, then curl the tongue tip back for the zh, close to the roof but never touching.',
      },
      audio: {
        slow: 'l1u1l1_azhaku_slow',
        medium: 'l1u1l1_azhaku_medium',
        normal: 'l1u1l1_azhaku_normal',
        focus: ['l1u1l1_azhaku_focus'],
      },
      acceptedInputs: ['azhaku'],
      tags: ['sound:zh'],
    },
    {
      id: 'puzha',
      manglish: 'puzha',
      script: 'പുഴ',
      meaning: 'river',
      kind: 'word',
      articulation: {
        cue: 'Start with a short pu, then curl the tongue tip back for the zh and release into a.',
      },
      audio: {
        slow: 'l1u1l1_puzha_slow',
        medium: 'l1u1l1_puzha_medium',
        normal: 'l1u1l1_puzha_normal',
        focus: ['l1u1l1_puzha_focus'],
      },
      acceptedInputs: ['puzha'],
      notes: ['The word learners will meet most: puzha turns up in half the place names of Kerala.'],
      tags: ['sound:zh'],
    },
    {
      id: 'vazhi',
      manglish: 'vazhi',
      script: 'വഴി',
      meaning: 'way; route',
      kind: 'word',
      articulation: {
        cue: 'The zh comes mid-word: glide from the va straight into the curled-back zh, then release into i.',
      },
      audio: {
        slow: 'l1u1l1_vazhi_slow',
        medium: 'l1u1l1_vazhi_medium',
        normal: 'l1u1l1_vazhi_normal',
        focus: ['l1u1l1_vazhi_focus'],
      },
      acceptedInputs: ['vazhi'],
      notes: ['"Way" as in route or direction.'],
      tags: ['sound:zh'],
    },
  ],
  minimalPairs: [],
  drills: [
    { kind: 'multipleChoice', itemId: 'mazha', distractors: ['beauty', 'way; route', 'river'] },
    { kind: 'multipleChoice', itemId: 'azhaku', distractors: ['rain', 'way; route', 'river'] },
    { kind: 'multipleChoice', itemId: 'puzha', distractors: ['rain', 'beauty', 'way; route'] },
    { kind: 'multipleChoice', itemId: 'vazhi', distractors: ['rain', 'beauty', 'river'] },
  ],
  reviewSlots: 0,
  spriteId: 'l1u1l1',
};
