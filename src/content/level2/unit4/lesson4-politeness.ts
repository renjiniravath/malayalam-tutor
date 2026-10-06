/**
 * Level 2 Unit 4 — Politeness in context (PLAN.md §5): the pronoun
 * ladder in real sentences, from nee to the honorifics, plus title
 * substitution (chetta).
 */

import type { Lesson } from '../../types'

export const lesson4Politeness: Lesson = {
  id: 'l2u1l4',
  levelId: 'level2',
  unitId: 'unit4',
  title: 'Who you’re talking to',
  reviewSlots: 2,
  sprite: { file: 'audio/l2u1l4.mp3' },
  items: [
    {
      id: 'chetta',
      manglish: 'chetta',
      meaning: 'older brother; a friendly address for men',
      kind: 'word',
      pos: 'noun',
      notes: [
        'The safe, warm way to address a man you do not know well.',
        'No script here: the written form spells a long a that is short in speech.',
      ],
      audio: { slow: 'chetta.slow', medium: 'chetta.medium', normal: 'chetta.normal' },
      tags: ['level:2'],
    },
    {
      id: 'nee-varuva',
      manglish: 'nee varuva',
      script: 'നീ വരുവാ',
      meaning: 'you (casual) are coming',
      kind: 'sentence',
      segments: [
        { token: 'nee', gloss: 'you (casual)' },
        { token: 'varuva', gloss: 'coming' },
      ],
      audio: { slow: 'nee-varuva.slow', medium: 'nee-varuva.medium', normal: 'nee-varuva.normal' },
      tags: ['level:2'],
    },
    {
      id: 'ningal-varuva',
      manglish: 'ningaḷ varuva',
      script: 'നിങ്ങൾ വരുവാ',
      meaning: 'you (polite) are coming',
      kind: 'sentence',
      segments: [
        { token: 'ningaḷ', gloss: 'you (polite)' },
        { token: 'varuva', gloss: 'coming' },
      ],
      audio: { slow: 'ningal-varuva.slow', medium: 'ningal-varuva.medium', normal: 'ningal-varuva.normal' },
      tags: ['level:2'],
    },
    {
      id: 'thaankal-varuva',
      manglish: 'thaangkaḷ varuva',
      script: 'താങ്കൾ വരുവാ',
      meaning: 'you (formal) are coming',
      kind: 'sentence',
      segments: [
        { token: 'thaangkaḷ', gloss: 'you (formal)' },
        { token: 'varuva', gloss: 'coming' },
      ],
      audio: { slow: 'thaankal-varuva.slow', medium: 'thaankal-varuva.medium', normal: 'thaankal-varuva.normal' },
      tags: ['level:2'],
    },
    {
      id: 'thaankal-pokuva',
      manglish: 'thaangkaḷ pokuva',
      script: 'താങ്കൾ പോകുവാ',
      meaning: 'you (formal) are going',
      kind: 'sentence',
      segments: [
        { token: 'thaangkaḷ', gloss: 'you (formal)' },
        { token: 'pokuva', gloss: 'going' },
      ],
      audio: { slow: 'thaankal-pokuva.slow', medium: 'thaankal-pokuva.medium', normal: 'thaankal-pokuva.normal' },
      tags: ['level:2'],
    },
    {
      id: 'addheham-varuva',
      manglish: 'addheham varuva',
      script: 'അദ്ദേഹം വരുവാ',
      meaning: 'he (respectful) is coming',
      kind: 'sentence',
      acceptedInputs: ['addheham varuva'],
      segments: [
        { token: 'addheham', gloss: 'he (respectful)' },
        { token: 'varuva', gloss: 'coming' },
      ],
      audio: { slow: 'addheham-varuva.slow', medium: 'addheham-varuva.medium', normal: 'addheham-varuva.normal' },
      tags: ['level:2'],
    },
    {
      id: 'avar-varuva',
      manglish: 'avar varuva',
      script: 'അവർ വരുവാ',
      meaning: 'they are coming; polite for he or she',
      kind: 'sentence',
      segments: [
        { token: 'avar', gloss: 'they (also polite he or she)' },
        { token: 'varuva', gloss: 'coming' },
      ],
      audio: { slow: 'avar-varuva.slow', medium: 'avar-varuva.medium', normal: 'avar-varuva.normal' },
      tags: ['level:2'],
    },
    {
      id: 'chetta-pokuva',
      manglish: 'chetta pokuva',
      meaning: 'chetta is going',
      kind: 'sentence',
      notes: ['No script here: the written form of chetta spells a long a that is short in speech.'],
      segments: [
        { token: 'chetta', gloss: 'older brother (address)' },
        { token: 'pokuva', gloss: 'going' },
      ],
      audio: { slow: 'chetta-pokuva.slow', medium: 'chetta-pokuva.medium', normal: 'chetta-pokuva.normal' },
      tags: ['level:2'],
    },
  ],
  pairs: [],
  drills: [
    { kind: 'multipleChoice', itemId: 'chetta', distractors: ['nee-varuva', 'avar-varuva', 'chetta-pokuva'] },
    { kind: 'multipleChoice', itemId: 'addheham-varuva', distractors: ['nee-varuva', 'avar-varuva', 'chetta-pokuva'] },
    { kind: 'multipleChoice', itemId: 'avar-varuva', distractors: ['addheham-varuva', 'ningal-varuva', 'chetta-pokuva'] },
    {
      kind: 'sentenceBuilder',
      sentenceId: 'nee-varuva',
      bank: ['nee', 'varuva'],
      acceptedInputs: ['nee varuva'],
    },
    {
      kind: 'sentenceBuilder',
      sentenceId: 'ningal-varuva',
      bank: ['ningaḷ', 'varuva'],
      acceptedInputs: ['ningal varuva'],
    },
    {
      kind: 'sentenceBuilder',
      sentenceId: 'thaankal-varuva',
      bank: ['thaangkaḷ', 'varuva'],
      acceptedInputs: ['thaankal varuva'],
    },
    {
      kind: 'sentenceBuilder',
      sentenceId: 'thaankal-pokuva',
      bank: ['thaangkaḷ', 'pokuva'],
      acceptedInputs: ['thaankal pokuva'],
    },
    {
      kind: 'sentenceBuilder',
      sentenceId: 'chetta-pokuva',
      bank: ['chetta', 'pokuva'],
      acceptedInputs: ['chetta pokuva'],
    },
    { kind: 'typing', itemId: 'chetta', acceptedInputs: ['chetta'] },
    { kind: 'typing', itemId: 'nee-varuva', acceptedInputs: ['nee varuva'] },
  ],
}
