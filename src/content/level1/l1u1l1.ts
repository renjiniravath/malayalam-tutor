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
        diagram: 'articulations/zh.svg',
        tip: 'Curl the tongue tip up and back toward the roof of the mouth, leaving a small gap, and let the air flow over it. Like an English r, but further back.',
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
        diagram: 'articulations/zh.svg',
        tip: 'Start with a short a, then curl the tongue tip back for the zh — close to the roof, never touching.',
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
      id: 'vazhi',
      manglish: 'vazhi',
      script: 'വഴി',
      meaning: 'way; route',
      kind: 'word',
      articulation: {
        diagram: 'articulations/zh.svg',
        tip: 'The zh comes mid-word: glide from the va straight into the curled-back zh, then release into i.',
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
    {
      id: 'vali',
      manglish: 'vali',
      script: 'വലി',
      meaning: 'cramp; a pull',
      kind: 'word',
      audio: {
        slow: 'l1u1l1_vali_slow',
        medium: 'l1u1l1_vali_medium',
        normal: 'l1u1l1_vali_normal',
      },
      acceptedInputs: ['vali'],
      notes: ['"Cramp" as in kaalil vali, a cramp in the leg.'],
      tags: [],
    },
  ],
  minimalPairs: [
    {
      id: 'l1u1-p-vazhi-vali',
      aItemId: 'vazhi',
      bItemId: 'vali',
      segment: 'zh',
      aClip: 'l1u1l1_vazhi_normal',
      bClip: 'l1u1l1_vali_normal',
    },
  ],
  drills: [
    { kind: 'multipleChoice', itemId: 'mazha', distractors: ['beauty', 'way; route', 'cramp; a pull'] },
    { kind: 'multipleChoice', itemId: 'azhaku', distractors: ['rain', 'way; route', 'cramp; a pull'] },
    { kind: 'multipleChoice', itemId: 'vazhi', distractors: ['rain', 'beauty', 'cramp; a pull'] },
    { kind: 'multipleChoice', itemId: 'vali', distractors: ['rain', 'beauty', 'way; route'] },
    { kind: 'minimalPair', pairId: 'l1u1-p-vazhi-vali' },
  ],
  reviewSlots: 0,
  spriteId: 'l1u1l1',
};
