/**
 * Level 3 Unit 2 Lesson 3 — Cleft questions (PLAN.md §5): the aanu ...
 * ath question shape, where the question word takes the emphasis and the
 * verb closes with -ath. Placed with the question-word lesson; the
 * evide ninn pair taught in the ninn lesson is the same shape.
 */

import type { Lesson } from '../../types'

export const lesson3Cleft: Lesson = {
  id: 'l3u2l3',
  levelId: 'level3',
  unitId: 'unit2',
  title: 'Questions with aanu ... ath',
  reviewSlots: 2,
  sprite: { file: 'audio/l3u2l3.mp3' },
  items: [
    {
      id: 'eth',
      manglish: 'eth',
      script: 'ഏത്',
      meaning: 'which (before a noun)',
      kind: 'word',
      pos: 'pronoun',
      notes: [
        'eth goes before a noun: eth schoolil, which school. On its own, "which one?" is etha.',
        'The -a on etha is a squeezed-in "is": etha, which one is it? Before a noun there is nothing for the is to do, so it drops: eth schoolil.',
      ],
      audio: { slow: 'eth.slow', medium: 'eth.medium', normal: 'eth.normal' },
      tags: ['level:3'],
    },
    {
      id: 'enth',
      manglish: 'enth',
      script: 'എന്ത്',
      meaning: 'what (before aanu)',
      kind: 'word',
      pos: 'pronoun',
      notes: [
        'enth goes before aanu: enth aanu kazhichath, what is it that you ate. On its own, "what?" is entha.',
        'The -a on entha is really a squeezed-in "is": entha, what is it? When the is comes out as its own word — enth aanu kazhichath, what is it that you ate — the -a has nothing to do, so it goes.',
      ],
      audio: { slow: 'enth.slow', medium: 'enth.medium', normal: 'enth.normal' },
      tags: ['level:3'],
    },
    {
      id: 'raavile',
      manglish: 'raavile',
      script: 'രാവിലെ',
      meaning: 'in the morning',
      kind: 'word',
      pos: 'adverb',
      notes: ['raavile covers the morning hours: raavile enth aanu kazhichath? — what did you eat in the morning?'],
      audio: { slow: 'raavile.slow', medium: 'raavile.medium', normal: 'raavile.normal' },
      tags: ['level:3'],
    },
    {
      id: 'nee-eth-schoolil-aanu-padichath',
      manglish: 'nee eth schoolil aanu padichath',
      meaning: 'which school did you go to?',
      kind: 'sentence',
      notes: [
        'The question word takes the emphasis and aanu follows it; the verb closes the question in its -ath form.',
        'padichath is the -ath form of padikkuva (to study): the studying.',
        'No script here: the English word has no settled Malayalam spelling.',
      ],
      segments: [
        { token: 'nee', gloss: 'you (casual)' },
        { token: 'eth', gloss: 'which' },
        { token: 'schoolil', gloss: 'at school' },
        { token: 'aanu', gloss: 'is (the emphasis word)' },
        { token: 'padichath', gloss: 'studied (the studying)' },
      ],
      audio: { slow: 'nee-eth-schoolil-aanu-padichath.slow', medium: 'nee-eth-schoolil-aanu-padichath.medium', normal: 'nee-eth-schoolil-aanu-padichath.normal' },
      tags: ['level:3'],
    },
    {
      id: 'chechi-raavile-enth-aanu-kazhichath',
      manglish: 'chechi, raavile enth aanu kazhichath',
      script: 'ചേച്ചി, രാവിലെ എന്ത് ആണ് കഴിച്ചത്',
      meaning: 'what did you eat in the morning, chechi?',
      kind: 'sentence',
      notes: [
        'chechi is how you address an elder sister, and the comma shows the question is put to her.',
        'kazhichath is the -ath form of kazhikkuva (to eat): the eating.',
      ],
      segments: [
        { token: 'chechi,', gloss: 'chechi (elder sister, addressed)' },
        { token: 'raavile', gloss: 'in the morning' },
        { token: 'enth', gloss: 'what' },
        { token: 'aanu', gloss: 'is (the emphasis word)' },
        { token: 'kazhichath', gloss: 'ate (the eating)' },
      ],
      audio: { slow: 'chechi-raavile-enth-aanu-kazhichath.slow', medium: 'chechi-raavile-enth-aanu-kazhichath.medium', normal: 'chechi-raavile-enth-aanu-kazhichath.normal' },
      tags: ['level:3'],
    },
    {
      id: 'ee-tv-evide-ninn-aanu-medichath',
      manglish: 'ee tv evide ninn aanu medichath',
      meaning: 'where did you buy this TV from?',
      kind: 'sentence',
      notes: [
        'ee means this, and it goes before the noun: ee tv, this tv.',
        'medichath is the -ath form of medikkuva (to buy): the buying.',
        'You already met this shape in the ninn lesson: avan evide ninn aanu varunnath?',
        'No script here: the English word has no settled Malayalam spelling.',
      ],
      segments: [
        { token: 'ee', gloss: 'this' },
        { token: 'tv', gloss: 'tv' },
        { token: 'evide', gloss: 'where?' },
        { token: 'ninn', gloss: 'from' },
        { token: 'aanu', gloss: 'is (the emphasis word)' },
        { token: 'medichath', gloss: 'bought (the buying)' },
      ],
      audio: { slow: 'ee-tv-evide-ninn-aanu-medichath.slow', medium: 'ee-tv-evide-ninn-aanu-medichath.medium', normal: 'ee-tv-evide-ninn-aanu-medichath.normal' },
      tags: ['level:3'],
    },
  ],
  pairs: [],
  drills: [
    { kind: 'multipleChoice', itemId: 'eth', distractors: ['enth', 'raavile'] },
    { kind: 'multipleChoice', itemId: 'enth', distractors: ['eth', 'raavile'] },
    { kind: 'multipleChoice', itemId: 'raavile', distractors: ['eth', 'enth'] },
    {
      kind: 'multipleChoice',
      itemId: 'nee-eth-schoolil-aanu-padichath',
      distractors: ['chechi-raavile-enth-aanu-kazhichath', 'ee-tv-evide-ninn-aanu-medichath'],
    },
    {
      kind: 'multipleChoice',
      itemId: 'ee-tv-evide-ninn-aanu-medichath',
      distractors: ['nee-eth-schoolil-aanu-padichath', 'chechi-raavile-enth-aanu-kazhichath'],
    },
    {
      kind: 'sentenceBuilder',
      sentenceId: 'nee-eth-schoolil-aanu-padichath',
      bank: ['nee', 'eth', 'schoolil', 'aanu', 'padichath'],
      acceptedInputs: ['nee eth schoolil aanu padichath', 'ni eth schoolil aanu padichath'],
    },
    {
      kind: 'sentenceBuilder',
      sentenceId: 'chechi-raavile-enth-aanu-kazhichath',
      bank: ['chechi,', 'raavile', 'enth', 'aanu', 'kazhichath'],
      acceptedInputs: ['chechi, raavile enth aanu kazhichath', 'chechi raavile enth aanu kazhichath'],
    },
    {
      kind: 'sentenceBuilder',
      sentenceId: 'ee-tv-evide-ninn-aanu-medichath',
      bank: ['ee', 'tv', 'evide', 'ninn', 'aanu', 'medichath'],
      acceptedInputs: ['ee tv evide ninn aanu medichath', 'ee tv evide ninnu aanu medichath'],
    },
    { kind: 'typing', itemId: 'raavile', acceptedInputs: ['raavile'] },
  ],
}
