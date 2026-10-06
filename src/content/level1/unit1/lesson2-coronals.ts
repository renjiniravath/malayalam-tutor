/**
 * Level 1 Unit 1 Lesson 2 — The coronal series: dental (th) vs retroflex (t)
 * vs alveolar (ṟ). Comprehension-only: hear, reveal, discriminate.
 */

import type { Lesson } from '../../types'

export const lesson2Coronals: Lesson = {
  id: 'l1u1l2',
  levelId: 'level1',
  unitId: 'unit1',
  title: 'Tongue-tip sounds: th, t, and ṟ',
  reviewSlots: 0,
  sprite: { file: 'audio/l1u1l2.mp3' },
  items: [
    {
      id: 'tha',
      manglish: 'tha',
      script: 'ത',
      meaning: 'the tha sound — tongue tip at the upper teeth',
      kind: 'sound',
      articulation: {
        cue: 'Touch the back of the upper teeth with the tongue tip — a softer t than English.',
      },
      audio: { slow: 'tha.slow', medium: 'tha.medium', normal: 'tha.normal', focus: ['tha.focus'] },
      tags: ['sound:coronal', 'level:1'],
    },
    {
      id: 'ta',
      manglish: 'ta',
      script: 'ട',
      meaning: 'the ta sound — tongue curled back',
      kind: 'sound',
      articulation: {
        cue: 'Curl the tongue tip up and back and tap the roof of the mouth.',
      },
      audio: { slow: 'ta.slow', medium: 'ta.medium', normal: 'ta.normal', focus: ['ta.focus'] },
      tags: ['sound:coronal', 'level:1'],
    },
    {
      id: 'rra',
      manglish: 'ṟa',
      script: 'റ',
      meaning: 'the ṟa sound — tongue tip tapping the ridge',
      kind: 'sound',
      articulation: {
        cue: 'Tap the ridge behind the upper teeth with the tongue tip — a quick, rolled r.',
      },
      audio: { slow: 'rra.slow', medium: 'rra.medium', normal: 'rra.normal', focus: ['rra.focus'] },
      acceptedInputs: ['ra', 'rra'],
      notes: [
        'This is the rolled r (റ). In everyday words Malayalees write it as a plain r.',
        'Doubled it writes rr: rr is the held റ്റ, the tt sound in English "letter".',
      ],
      tags: ['sound:coronal', 'level:1'],
    },
    {
      id: 'patthu',
      manglish: 'patthu',
      script: 'പത്ത്',
      meaning: 'ten',
      kind: 'word',
      pos: 'number',
      audio: { slow: 'patthu.slow', medium: 'patthu.medium', normal: 'patthu.normal' },
      tags: ['sound:coronal', 'level:1'],
    },
    {
      id: 'athu',
      manglish: 'athu',
      script: 'അത്',
      meaning: 'that one',
      kind: 'word',
      pos: 'pronoun',
      audio: { slow: 'athu.slow', medium: 'athu.medium', normal: 'athu.normal' },
      tags: ['sound:coronal', 'level:1'],
    },
    {
      id: 'peti',
      manglish: 'peti',
      script: 'പേടി',
      meaning: 'fear',
      kind: 'word',
      audio: { slow: 'peti.slow', medium: 'peti.medium', normal: 'peti.normal' },
      tags: ['sound:coronal', 'level:1'],
    },
    {
      id: 'katti',
      manglish: 'katti',
      script: 'കട്ടി',
      meaning: 'thick',
      kind: 'word',
      pos: 'adjective',
      audio: { slow: 'katti.slow', medium: 'katti.medium', normal: 'katti.normal' },
      tags: ['sound:coronal', 'level:1'],
    },
    {
      id: 'pettannu',
      manglish: 'pettannu',
      script: 'പെട്ടെന്ന്',
      meaning: 'suddenly',
      kind: 'word',
      pos: 'adverb',
      audio: { slow: 'pettannu.slow', medium: 'pettannu.medium', normal: 'pettannu.normal' },
      tags: ['sound:coronal', 'level:1'],
    },
  ],
  pairs: [
    { id: 'pair-tha-ta', aItemId: 'tha', bItemId: 'ta', segment: 'coronal', aClip: 'tha.focus', bClip: 'ta.focus' },
    { id: 'pair-ta-rra', aItemId: 'ta', bItemId: 'rra', segment: 'coronal', aClip: 'ta.focus', bClip: 'rra.focus' },
    { id: 'pair-tha-rra', aItemId: 'tha', bItemId: 'rra', segment: 'coronal', aClip: 'tha.focus', bClip: 'rra.focus' },
  ],
  drills: [
    { kind: 'multipleChoice', itemId: 'patthu', distractors: ['athu', 'peti', 'katti'] },
    { kind: 'multipleChoice', itemId: 'athu', distractors: ['patthu', 'pettannu', 'peti'] },
    { kind: 'multipleChoice', itemId: 'peti', distractors: ['athu', 'katti', 'pettannu'] },
    { kind: 'multipleChoice', itemId: 'katti', distractors: ['patthu', 'peti', 'pettannu'] },
    { kind: 'multipleChoice', itemId: 'pettannu', distractors: ['athu', 'katti', 'patthu'] },
    { kind: 'minimalPair', pairId: 'pair-tha-ta' },
    { kind: 'minimalPair', pairId: 'pair-ta-rra' },
    { kind: 'minimalPair', pairId: 'pair-tha-rra' },
  ],
}
