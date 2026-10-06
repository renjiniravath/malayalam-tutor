import type { Lesson } from '../types';

/**
 * Level 1 Unit 2 Lesson 1 — greetings, the way Kerala opens a conversation.
 * No "hello" needed: these four moves are the greeting. Geminates from
 * unit 1 reappear throughout, so they keep sound-focus clips.
 */
export const l1u2l1: Lesson = {
  id: 'l1u2l1',
  levelId: 'l1',
  unitId: 'l1u2',
  title: 'Greetings',
  comprehensionOnly: false,
  items: [
    {
      id: 'engane-und',
      manglish: 'engane und',
      script: 'എങ്ങനെ ഉണ്ട്',
      meaning: 'how are you?',
      kind: 'expression',
      audio: {
        slow: 'l1u2l1_engane-und_slow',
        medium: 'l1u2l1_engane-und_medium',
        normal: 'l1u2l1_engane-und_normal',
      },
      acceptedInputs: ['engane und'],
      notes: ['The everyday "how are you?" — no hello needed first.'],
      tags: [],
    },
    {
      id: 'nalla-irippu',
      manglish: 'nalla irippu',
      script: 'നല്ല ഇരിപ്പ്',
      meaning: 'doing well',
      kind: 'phrase',
      audio: {
        slow: 'l1u2l1_nalla-irippu_slow',
        medium: 'l1u2l1_nalla-irippu_medium',
        normal: 'l1u2l1_nalla-irippu_normal',
        focus: ['l1u2l1_nalla-irippu_focus'],
      },
      acceptedInputs: ['nalla irippu'],
      articulation: {
        cue: 'Hold the doubled ll in nalla before moving to irippu.',
      },
      notes: ['The stock answer to engane und?.', 'Hold the doubled ll in nalla.'],
      tags: ['sound:geminate'],
    },
    {
      id: 'ennaa-vishesham',
      manglish: 'ennaa vishesham',
      script: 'എന്നാ വിശേഷം',
      meaning: "what's up?",
      kind: 'expression',
      audio: {
        slow: 'l1u2l1_ennaa-vishesham_slow',
        medium: 'l1u2l1_ennaa-vishesham_medium',
        normal: 'l1u2l1_ennaa-vishesham_normal',
        focus: ['l1u2l1_ennaa-vishesham_focus'],
      },
      acceptedInputs: ['ennaa vishesham'],
      articulation: {
        cue: 'Hold the doubled nn in ennaa for a full beat.',
      },
      notes: ['The follow-up greeting among friends.', 'Hold the doubled nn in ennaa.'],
      tags: ['sound:geminate'],
    },
    {
      id: 'onnum-illa',
      manglish: 'onnum illa',
      script: 'ഒന്നും ഇല്ല',
      meaning: 'nothing much',
      kind: 'phrase',
      audio: {
        slow: 'l1u2l1_onnum-illa_slow',
        medium: 'l1u2l1_onnum-illa_medium',
        normal: 'l1u2l1_onnum-illa_normal',
        focus: ['l1u2l1_onnum-illa_focus'],
      },
      acceptedInputs: ['onnum illa'],
      articulation: {
        cue: 'Hold the doubled nn in onnum for a full beat.',
      },
      notes: ['The stock answer to ennaa vishesham?.', 'Hold the doubled nn in onnum.'],
      tags: ['sound:geminate'],
    },
    {
      id: 'poyi-varatte',
      manglish: 'poyi varatte',
      script: 'പോയി വരട്ടെ',
      meaning: 'bye (I will go and come back)',
      kind: 'expression',
      audio: {
        slow: 'l1u2l1_poyi-varatte_slow',
        medium: 'l1u2l1_poyi-varatte_medium',
        normal: 'l1u2l1_poyi-varatte_normal',
        focus: ['l1u2l1_poyi-varatte_focus'],
      },
      acceptedInputs: ['poyi varatte'],
      articulation: {
        cue: 'Hold the doubled tt in varatte for a full beat.',
      },
      notes: ['The send-off when you leave.', 'Hold the doubled tt in varatte.'],
      tags: ['sound:geminate'],
    },
  ],
  minimalPairs: [],
  drills: [
    { kind: 'multipleChoice', itemId: 'engane-und', distractors: ['doing well', "what's up?", 'nothing much'] },
    { kind: 'multipleChoice', itemId: 'nalla-irippu', distractors: ['how are you?', 'nothing much', 'bye (I will go and come back)'] },
    { kind: 'multipleChoice', itemId: 'ennaa-vishesham', distractors: ['how are you?', 'doing well', 'bye (I will go and come back)'] },
    { kind: 'multipleChoice', itemId: 'onnum-illa', distractors: ["what's up?", 'doing well', 'bye (I will go and come back)'] },
    { kind: 'multipleChoice', itemId: 'poyi-varatte', distractors: ['how are you?', 'nothing much', "what's up?"] },
  ],
  reviewSlots: 0,
  spriteId: 'l1u2l1',
};
