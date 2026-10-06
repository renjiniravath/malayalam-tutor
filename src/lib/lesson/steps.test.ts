import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import type { Lesson } from '@/content/types';
import { buildLessonSteps } from './steps';

const sentenceItem = {
  id: 'njan-chaaya-kudikkuva',
  manglish: 'njan chaaya kudikkuva',
  script: 'ഞാൻ ചായ കുടിക്കുവാ',
  meaning: 'I drink tea',
  kind: 'sentence' as const,
  audio: { slow: 'x_slow', medium: 'x_medium', normal: 'x_normal' },
  sentence: {
    bank: ['njan', 'chaaya', 'kudikkuva', 'avan'],
    orders: ['njan chaaya kudikkuva'],
    parts: [
      { word: 'njan', meaning: 'I' },
      { word: 'chaaya', meaning: 'tea' },
      { word: 'kudikkuva', meaning: 'drink' },
    ],
  },
  tags: [],
};

const wordItem = {
  id: 'kudikkuva',
  manglish: 'kudikkuva',
  script: 'കുടിക്കുവാ',
  meaning: 'drink; drinking',
  kind: 'word' as const,
  audio: { slow: 'x_slow', medium: 'x_medium', normal: 'x_normal' },
  acceptedInputs: ['kudikkuva'],
  tags: [],
};

const lesson: Lesson = {
  id: 'l2u1l1',
  levelId: 'l2',
  unitId: 'l2u1',
  title: 'The -uva pattern',
  comprehensionOnly: false,
  items: [wordItem, sentenceItem],
  minimalPairs: [],
  drills: [
    { kind: 'multipleChoice', itemId: 'kudikkuva', distractors: ['I drink tea'] },
    { kind: 'sentenceBuilder', itemId: 'njan-chaaya-kudikkuva', mode: 'bank' },
  ],
  reviewSlots: 0,
  spriteId: 'l2u1l1',
};

describe('buildLessonSteps with sentence items', () => {
  it('sentences get reveal, anticipation, and the builder drill, no typing step', () => {
    const steps = buildLessonSteps(lesson);
    const kinds = steps.map((step) => step.kind);
    assert.deepEqual(kinds, ['reveal', 'anticipation', 'multipleChoice', 'typing', 'reveal', 'anticipation', 'sentenceBuilder']);
  });

  it('the builder step carries the authored mode and item', () => {
    const steps = buildLessonSteps(lesson);
    const builder = steps.find((step) => step.kind === 'sentenceBuilder');
    assert.deepEqual(builder, {
      kind: 'sentenceBuilder',
      drill: { kind: 'sentenceBuilder', itemId: 'njan-chaaya-kudikkuva', mode: 'bank' },
    });
  });
});
