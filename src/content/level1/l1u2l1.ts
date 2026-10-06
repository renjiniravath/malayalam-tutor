import type { Lesson } from '../types';

/**
 * Level 1 Unit 2 Lesson 1 — greetings, the way Kerala opens a conversation.
 * No "hello" needed: these moves are the greeting. Geminates from unit 1
 * reappear throughout, so they keep sound-focus clips.
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
      meaning: 'how is it?',
      kind: 'expression',
      audio: {
        slow: 'l1u2l1_engane-und_slow',
        medium: 'l1u2l1_engane-und_medium',
        normal: 'l1u2l1_engane-und_normal',
      },
      acceptedInputs: ['engane und'],
      notes: ['The everyday greeting — literally "how is it?", said to people and things alike.'],
      tags: [],
    },
    {
      id: 'kaappi',
      manglish: 'kaappi',
      script: 'കാപ്പി',
      meaning: 'coffee',
      kind: 'word',
      audio: {
        slow: 'l1u2l1_kaappi_slow',
        medium: 'l1u2l1_kaappi_medium',
        normal: 'l1u2l1_kaappi_normal',
      },
      acceptedInputs: ['kaappi'],
      notes: ['The Malayalam word for coffee — the example sentence below checks on it.'],
      tags: [],
    },
    {
      id: 'kaappi-engane-und-kollamo',
      manglish: 'kaappi engane und, koḷḷaamo',
      script: 'കാപ്പി എങ്ങനെ ഉണ്ട് കൊള്ളാമോ',
      meaning: 'how is the coffee, is it good?',
      kind: 'sentence',
      audio: {
        slow: 'l1u2l1_kaappi-engane-und-kollamo_slow',
        medium: 'l1u2l1_kaappi-engane-und-kollamo_medium',
        normal: 'l1u2l1_kaappi-engane-und-kollamo_normal',
      },
      sentence: {
        bank: ['kaappi', 'engane', 'und,', 'koḷḷaamo', 'illa'],
        orders: ['kaappi engane und, koḷḷaamo'],
        parts: [
          { word: 'kaappi', meaning: 'coffee' },
          { word: 'engane', meaning: 'how' },
          { word: 'und,', meaning: 'is it' },
          { word: 'koḷḷaamo', meaning: 'is it good?' },
        ],
      },
      notes: ['Engane und works on things too — the waiter asks this about your coffee.'],
      tags: [],
    },
    {
      id: 'nannayitt-pokunnu',
      manglish: 'nannayitt pokunnu',
      script: 'നന്നായിട്ട് പോകുന്നു',
      meaning: "it's going well",
      kind: 'phrase',
      audio: {
        slow: 'l1u2l1_nannayitt-pokunnu_slow',
        medium: 'l1u2l1_nannayitt-pokunnu_medium',
        normal: 'l1u2l1_nannayitt-pokunnu_normal',
        focus: ['l1u2l1_nannayitt-pokunnu_focus'],
      },
      acceptedInputs: ['nannayitt pokunnu'],
      articulation: {
        cue: 'Hold the doubled nn, then the doubled tt.',
      },
      notes: ['The stock answer to engane und.', 'Hold the doubled nn and tt.'],
      tags: ['sound:geminate'],
    },
    {
      id: 'enna-und-vishesham',
      manglish: 'enna und vishesham',
      script: 'എന്നാ ഉണ്ട് വിശേഷം',
      meaning: "what's up?",
      kind: 'expression',
      audio: {
        slow: 'l1u2l1_enna-und-vishesham_slow',
        medium: 'l1u2l1_enna-und-vishesham_medium',
        normal: 'l1u2l1_enna-und-vishesham_normal',
        focus: ['l1u2l1_enna-und-vishesham_focus'],
      },
      acceptedInputs: ['enna und vishesham'],
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
      notes: ['The stock answer to enna und vishesham.', 'Hold the doubled nn in onnum.'],
      tags: ['sound:geminate'],
    },
    {
      id: 'appo-sheri-bye',
      manglish: 'appo sheri, bye',
      script: 'അപ്പോ ശെരി ബൈ',
      meaning: 'okay then, bye',
      kind: 'expression',
      audio: {
        slow: 'l1u2l1_appo-sheri-bye_slow',
        medium: 'l1u2l1_appo-sheri-bye_medium',
        normal: 'l1u2l1_appo-sheri-bye_normal',
        focus: ['l1u2l1_appo-sheri-bye_focus'],
      },
      acceptedInputs: ['appo sheri bye', 'appo sheri'],
      articulation: {
        cue: 'Hold the doubled pp in appo.',
      },
      notes: ['Appo means "then" — the everyday sign-off.', 'Hold the doubled pp in appo.'],
      tags: ['sound:geminate'],
    },
  ],
  minimalPairs: [],
  drills: [
    { kind: 'multipleChoice', itemId: 'engane-und', distractors: ["it's going well", "what's up?", 'nothing much'] },
    { kind: 'multipleChoice', itemId: 'kaappi', distractors: ['how is it?', 'nothing much', "what's up?"] },
    { kind: 'multipleChoice', itemId: 'nannayitt-pokunnu', distractors: ['how is it?', 'nothing much', 'okay then, bye'] },
    { kind: 'multipleChoice', itemId: 'enna-und-vishesham', distractors: ['how is it?', "it's going well", 'okay then, bye'] },
    { kind: 'multipleChoice', itemId: 'onnum-illa', distractors: ["what's up?", "it's going well", 'okay then, bye'] },
    { kind: 'multipleChoice', itemId: 'appo-sheri-bye', distractors: ['how is it?', 'nothing much', "what's up?"] },
    { kind: 'sentenceBuilder', itemId: 'kaappi-engane-und-kollamo', mode: 'bank' },
  ],
  reviewSlots: 0,
  spriteId: 'l1u2l1',
};
