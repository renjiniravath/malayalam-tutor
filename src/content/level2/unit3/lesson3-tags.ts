/**
 * Level 2 Unit 3 — Tag questions and the -o particle (PLAN.md §5):
 * the small turn-taking moves that keep a conversation going.
 */

import type { Lesson } from '../../types'

export const lesson3Tags: Lesson = {
  id: 'l2u1l3',
  levelId: 'level2',
  unitId: 'unit3',
  title: 'Keeping the conversation going',
  reviewSlots: 2,
  sprite: { file: 'audio/l2u1l3.mp3' },
  items: [
    {
      id: 'kettiyo',
      manglish: 'kettiyo',
      script: 'കേട്ടോ',
      meaning: 'did you get it? (tag)',
      kind: 'expression',
      audio: { slow: 'kettiyo.slow', medium: 'kettiyo.medium', normal: 'kettiyo.normal' },
      tags: ['level:2'],
    },
    {
      id: 'niyyo',
      manglish: 'neeyyo',
      script: 'നീയോ',
      meaning: 'and you? (question particle)',
      kind: 'expression',
      acceptedInputs: ['niyyo'],
      notes: ['The -o particle turns a word into a question: nee (you) becomes neeyyo (and you?).'],
      audio: { slow: 'niyyo.slow', medium: 'niyyo.medium', normal: 'niyyo.normal' },
      tags: ['level:2'],
    },
    {
      id: 'sheriyalle',
      manglish: 'sheriyalle',
      script: 'ശെരിയല്ലേ',
      meaning: 'right? (isn’t it right)',
      kind: 'expression',
      audio: { slow: 'sheriyalle.slow', medium: 'sheriyalle.medium', normal: 'sheriyalle.normal' },
      tags: ['level:2'],
    },
    {
      id: 'chaaya-alle',
      manglish: 'chaaya alle',
      script: 'ചായ അല്ലേ',
      meaning: "it's tea, isn't it?",
      kind: 'sentence',
      segments: [
        { token: 'chaaya', gloss: 'tea' },
        { token: 'alle', gloss: "isn't it?" },
      ],
      audio: { slow: 'chaaya-alle.slow', medium: 'chaaya-alle.medium', normal: 'chaaya-alle.normal' },
      tags: ['level:2'],
    },
    {
      id: 'pokuva-alle',
      manglish: 'pokuva alle',
      script: 'പോകുവാ അല്ലേ',
      meaning: 'going, right?',
      kind: 'sentence',
      segments: [
        { token: 'pokuva', gloss: 'going' },
        { token: 'alle', gloss: 'right?' },
      ],
      audio: { slow: 'pokuva-alle.slow', medium: 'pokuva-alle.medium', normal: 'pokuva-alle.normal' },
      tags: ['level:2'],
    },
    {
      id: 'athu-alle',
      manglish: 'athu alle',
      script: 'അത് അല്ലേ',
      meaning: 'that, right?',
      kind: 'sentence',
      segments: [
        { token: 'athu', gloss: 'that' },
        { token: 'alle', gloss: 'right?' },
      ],
      audio: { slow: 'athu-alle.slow', medium: 'athu-alle.medium', normal: 'athu-alle.normal' },
      tags: ['level:2'],
    },
    {
      id: 'ippo-alle',
      manglish: 'ippo alle',
      script: 'ഇപ്പോ അല്ലേ',
      meaning: 'now, right?',
      kind: 'sentence',
      segments: [
        { token: 'ippo', gloss: 'now' },
        { token: 'alle', gloss: 'right?' },
      ],
      audio: { slow: 'ippo-alle.slow', medium: 'ippo-alle.medium', normal: 'ippo-alle.normal' },
      tags: ['level:2'],
    },
    {
      id: 'niyyo-varuva',
      manglish: 'neeyyo varuva',
      script: 'നീയോ വരുവാ',
      meaning: 'are you coming too?',
      kind: 'sentence',
      segments: [
        { token: 'neeyyo', gloss: 'and you?' },
        { token: 'varuva', gloss: 'coming' },
      ],
      audio: { slow: 'niyyo-varuva.slow', medium: 'niyyo-varuva.medium', normal: 'niyyo-varuva.normal' },
      tags: ['level:2'],
    },
  ],
  pairs: [],
  drills: [
    { kind: 'multipleChoice', itemId: 'kettiyo', distractors: ['niyyo', 'sheriyalle', 'athu-alle'] },
    { kind: 'multipleChoice', itemId: 'niyyo', distractors: ['kettiyo', 'sheriyalle', 'chaaya-alle'] },
    { kind: 'multipleChoice', itemId: 'sheriyalle', distractors: ['kettiyo', 'niyyo', 'pokuva-alle'] },
    {
      kind: 'sentenceBuilder',
      sentenceId: 'chaaya-alle',
      bank: ['chaaya', 'alle'],
      acceptedInputs: ['chaaya alle'],
    },
    {
      kind: 'sentenceBuilder',
      sentenceId: 'pokuva-alle',
      bank: ['pokuva', 'alle'],
      acceptedInputs: ['pokuva alle'],
    },
    {
      kind: 'sentenceBuilder',
      sentenceId: 'athu-alle',
      bank: ['athu', 'alle'],
      acceptedInputs: ['athu alle'],
    },
    {
      kind: 'sentenceBuilder',
      sentenceId: 'ippo-alle',
      bank: ['ippo', 'alle'],
      acceptedInputs: ['ippo alle'],
    },
    {
      kind: 'sentenceBuilder',
      sentenceId: 'niyyo-varuva',
      bank: ['neeyyo', 'varuva'],
      acceptedInputs: ['niyyo varuva'],
    },
    { kind: 'typing', itemId: 'kettiyo', acceptedInputs: ['kettiyo'] },
    { kind: 'typing', itemId: 'niyyo', acceptedInputs: ['niyyo'] },
  ],
}
