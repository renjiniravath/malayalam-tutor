import type { Lesson } from '../types';

/**
 * Level 1 Unit 2 Lesson 2 — everyday reactions. The one-word toolkit that
 * carries most casual turn-taking: agree, stall, react, confirm.
 */
export const l1u2l2: Lesson = {
  id: 'l1u2l2',
  levelId: 'l1',
  unitId: 'l1u2',
  title: 'Everyday reactions',
  comprehensionOnly: false,
  items: [
    {
      id: 'sheri',
      manglish: 'sheri',
      script: 'ശെരി',
      meaning: 'okay; yes (casual)',
      kind: 'expression',
      audio: {
        slow: 'l1u2l2_sheri_slow',
        medium: 'l1u2l2_sheri_medium',
        normal: 'l1u2l2_sheri_normal',
      },
      acceptedInputs: ['sheri', 'seri'],
      notes: ['The everyday yes — also the all-purpose "okay".', 'The standard spelling is ശരി; informal writing uses ശെരി.'],
      tags: [],
    },
    {
      id: 'nokkam',
      manglish: 'nokkam',
      script: 'നോക്കാം',
      meaning: "we'll see",
      kind: 'expression',
      audio: {
        slow: 'l1u2l2_nokkam_slow',
        medium: 'l1u2l2_nokkam_medium',
        normal: 'l1u2l2_nokkam_normal',
        focus: ['l1u2l2_nokkam_focus'],
      },
      acceptedInputs: ['nokkam'],
      articulation: {
        cue: 'Hold the doubled kk for a full beat.',
      },
      notes: ["The classic non-committal answer — let's see.", 'From nokkuka, to look. Hold the doubled kk.'],
      tags: ['sound:geminate'],
    },
    {
      id: 'ayyo',
      manglish: 'ayyo',
      script: 'അയ്യോ',
      meaning: 'oh no!',
      kind: 'expression',
      audio: {
        slow: 'l1u2l2_ayyo_slow',
        medium: 'l1u2l2_ayyo_medium',
        normal: 'l1u2l2_ayyo_normal',
      },
      acceptedInputs: ['ayyo'],
      notes: ['Pain, surprise, or sympathy — one word covers all three.'],
      tags: [],
    },
    {
      id: 'pinnalla',
      manglish: 'pinnalla',
      script: 'പിന്നല്ല',
      meaning: 'obviously; of course',
      kind: 'expression',
      audio: {
        slow: 'l1u2l2_pinnalla_slow',
        medium: 'l1u2l2_pinnalla_medium',
        normal: 'l1u2l2_pinnalla_normal',
        focus: ['l1u2l2_pinnalla_focus'],
      },
      acceptedInputs: ['pinnalla'],
      articulation: {
        cue: 'Hold both doubled sounds: nn, then ll.',
      },
      notes: ['"What else?" — for when the answer was obvious all along.', 'Hold the doubled nn and ll.'],
      tags: ['sound:geminate'],
    },
    {
      id: 'alle',
      manglish: 'alle',
      script: 'അല്ലേ',
      meaning: "right? (isn't it?)",
      kind: 'expression',
      audio: {
        slow: 'l1u2l2_alle_slow',
        medium: 'l1u2l2_alle_medium',
        normal: 'l1u2l2_alle_normal',
        focus: ['l1u2l2_alle_focus'],
      },
      acceptedInputs: ['alle'],
      articulation: {
        cue: 'Hold the doubled ll at the end.',
      },
      notes: ['Tag question stuck on the end of any statement: "nalla kaappi, alle?"', 'Hold the doubled ll.'],
      tags: ['sound:geminate'],
    },
  ],
  minimalPairs: [],
  drills: [
    { kind: 'multipleChoice', itemId: 'sheri', distractors: ["we'll see", 'obviously; of course', "right? (isn't it?)"] },
    { kind: 'multipleChoice', itemId: 'nokkam', distractors: ['okay; yes (casual)', 'oh no!', "right? (isn't it?)"] },
    { kind: 'multipleChoice', itemId: 'ayyo', distractors: ['okay; yes (casual)', 'obviously; of course', "we'll see"] },
    { kind: 'multipleChoice', itemId: 'pinnalla', distractors: ['oh no!', "we'll see", "right? (isn't it?)"] },
    { kind: 'multipleChoice', itemId: 'alle', distractors: ['okay; yes (casual)', 'oh no!', "we'll see"] },
  ],
  reviewSlots: 0,
  spriteId: 'l1u2l2',
};
