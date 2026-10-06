/**
 * Level 2 Unit 6 — Title substitution (PLAN.md §5): addressing people
 * by title the way Kerala does. Vocatives take a comma and are never
 * the subject of a sentence.
 */

import type { Lesson } from '../../types'

export const lesson6Titles: Lesson = {
  id: 'l2u1l6',
  levelId: 'level2',
  unitId: 'unit6',
  title: 'Aunty and chetta',
  reviewSlots: 2,
  sprite: { file: 'audio/l2u1l6.mp3' },
  items: [
    {
      id: 'aunty',
      manglish: 'aunty',
      meaning: 'aunty — how you address an older woman',
      kind: 'word',
      pos: 'noun',
      notes: [
        'A vocative title: address her with it, with a comma in a sentence: aunty, engane und?',
        'No script here: the English word has no settled Malayalam spelling.',
      ],
      audio: { slow: 'aunty.slow', medium: 'aunty.medium', normal: 'aunty.normal' },
      tags: ['level:2'],
    },
    {
      id: 'chetta-ith-kando',
      manglish: 'chetta, ith kando',
      meaning: 'chetta, did you see this?',
      kind: 'sentence',
      notes: ['The vocative takes a comma: chetta is addressed, never the subject.'],
      segments: [
        { token: 'chetta,', gloss: 'chetta (addressing him)' },
        { token: 'ith', gloss: 'this' },
        { token: 'kando', gloss: 'did you see?' },
      ],
      audio: { slow: 'chetta-ith-kando.slow', medium: 'chetta-ith-kando.medium', normal: 'chetta-ith-kando.normal' },
      tags: ['level:2'],
    },
    {
      id: 'aunty-engane-und',
      manglish: 'aunty, engane und',
      meaning: 'aunty, how are you?',
      kind: 'sentence',
      segments: [
        { token: 'aunty,', gloss: 'aunty (addressing her)' },
        { token: 'engane und', gloss: 'how are you?' },
      ],
      audio: { slow: 'aunty-engane-und.slow', medium: 'aunty-engane-und.medium', normal: 'aunty-engane-und.normal' },
      tags: ['level:2'],
    },
    {
      id: 'chetta-varunnundo',
      manglish: 'chetta, varunnundo',
      meaning: 'chetta, are you coming?',
      kind: 'sentence',
      segments: [
        { token: 'chetta,', gloss: 'chetta (addressing him)' },
        { token: 'varunnundo', gloss: 'are you coming?' },
      ],
      audio: { slow: 'chetta-varunnundo.slow', medium: 'chetta-varunnundo.medium', normal: 'chetta-varunnundo.normal' },
      tags: ['level:2'],
    },
    {
      id: 'aunty-ith-kando',
      manglish: 'aunty, ith kando',
      meaning: 'aunty, did you see this?',
      kind: 'sentence',
      segments: [
        { token: 'aunty,', gloss: 'aunty (addressing her)' },
        { token: 'ith', gloss: 'this' },
        { token: 'kando', gloss: 'did you see?' },
      ],
      audio: { slow: 'aunty-ith-kando.slow', medium: 'aunty-ith-kando.medium', normal: 'aunty-ith-kando.normal' },
      tags: ['level:2'],
    },
    {
      id: 'chetta-sheri-alle',
      manglish: 'chetta, sheri alle',
      meaning: 'chetta, right?',
      kind: 'sentence',
      segments: [
        { token: 'chetta,', gloss: 'chetta (addressing him)' },
        { token: 'sheri', gloss: 'right' },
        { token: 'alle', gloss: 'right? (tag)' },
      ],
      audio: { slow: 'chetta-sheri-alle.slow', medium: 'chetta-sheri-alle.medium', normal: 'chetta-sheri-alle.normal' },
      tags: ['level:2'],
    },
    {
      id: 'aunty-sheri-alle',
      manglish: 'aunty, sheri alle',
      meaning: 'aunty, right?',
      kind: 'sentence',
      segments: [
        { token: 'aunty,', gloss: 'aunty (addressing her)' },
        { token: 'sheri', gloss: 'right' },
        { token: 'alle', gloss: 'right? (tag)' },
      ],
      audio: { slow: 'aunty-sheri-alle.slow', medium: 'aunty-sheri-alle.medium', normal: 'aunty-sheri-alle.normal' },
      tags: ['level:2'],
    },
    {
      id: 'aunty-pokunnundo',
      manglish: 'aunty, pokunnundo',
      meaning: 'aunty, are you going?',
      kind: 'sentence',
      segments: [
        { token: 'aunty,', gloss: 'aunty (addressing her)' },
        { token: 'pokunnundo', gloss: 'are you going?' },
      ],
      audio: { slow: 'aunty-pokunnundo.slow', medium: 'aunty-pokunnundo.medium', normal: 'aunty-pokunnundo.normal' },
      tags: ['level:2'],
    },
    {
      id: 'aunty-chaaya-veno',
      manglish: 'aunty, chaaya veno',
      meaning: 'aunty, do you want tea?',
      kind: 'sentence',
      segments: [
        { token: 'aunty,', gloss: 'aunty (addressing her)' },
        { token: 'chaaya', gloss: 'tea' },
        { token: 'veno', gloss: 'do you want?' },
      ],
      audio: { slow: 'aunty-chaaya-veno.slow', medium: 'aunty-chaaya-veno.medium', normal: 'aunty-chaaya-veno.normal' },
      tags: ['level:2'],
    },
    {
      id: 'chetta-chaaya-veno',
      manglish: 'chetta, chaaya veno',
      meaning: 'chetta, do you want tea?',
      kind: 'sentence',
      segments: [
        { token: 'chetta,', gloss: 'chetta (addressing him)' },
        { token: 'chaaya', gloss: 'tea' },
        { token: 'veno', gloss: 'do you want?' },
      ],
      audio: { slow: 'chetta-chaaya-veno.slow', medium: 'chetta-chaaya-veno.medium', normal: 'chetta-chaaya-veno.normal' },
      tags: ['level:2'],
    },
  ],
  pairs: [],
  drills: [
    { kind: 'multipleChoice', itemId: 'aunty', distractors: ['chetta-ith-kando', 'aunty-engane-und', 'chetta-varunnundo'] },
    { kind: 'multipleChoice', itemId: 'chetta-ith-kando', distractors: ['aunty-ith-kando', 'aunty-engane-und', 'chetta-varunnundo'] },
    { kind: 'multipleChoice', itemId: 'aunty-engane-und', distractors: ['chetta-varunnundo', 'aunty-pokunnundo', 'chetta-sheri-alle'] },
    { kind: 'multipleChoice', itemId: 'chetta-chaaya-veno', distractors: ['aunty-chaaya-veno', 'aunty-sheri-alle', 'chetta-sheri-alle'] },
    {
      kind: 'sentenceBuilder',
      sentenceId: 'chetta-ith-kando',
      bank: ['chetta,', 'ith', 'kando'],
      acceptedInputs: ['chetta ith kando'],
    },
    {
      kind: 'sentenceBuilder',
      sentenceId: 'aunty-engane-und',
      bank: ['aunty,', 'engane', 'und'],
      acceptedInputs: ['aunty engane und'],
    },
    {
      kind: 'sentenceBuilder',
      sentenceId: 'chetta-varunnundo',
      bank: ['chetta,', 'varunnundo'],
      acceptedInputs: ['chetta varunundo'],
    },
    {
      kind: 'sentenceBuilder',
      sentenceId: 'aunty-chaaya-veno',
      bank: ['aunty,', 'chaaya', 'veno'],
      acceptedInputs: ['aunty chaaya veno'],
    },
    { kind: 'typing', itemId: 'aunty', acceptedInputs: ['aunty'] },
  ],
}
