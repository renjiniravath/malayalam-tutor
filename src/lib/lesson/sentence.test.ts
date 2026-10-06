import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import type { SentenceSpec } from '@/content/types';
import { checkAssembly, checkTypedSentence, sentenceWords } from './sentence';

const spec: SentenceSpec = {
  bank: ['njan', 'chaaya', 'kudikkuva', 'avan'],
  orders: ['njan chaaya kudikkuva'],
  parts: [
    { word: 'njan', meaning: 'I' },
    { word: 'chaaya', meaning: 'tea' },
    { word: 'kudikkuva', meaning: 'drink, drinking' },
  ],
};

describe('sentence checking', () => {
  it('accepts the correct token order', () => {
    assert.equal(checkAssembly(['njan', 'chaaya', 'kudikkuva'], spec), true);
  });

  it('rejects a wrong order', () => {
    assert.equal(checkAssembly(['chaaya', 'njan', 'kudikkuva'], spec), false);
  });

  it('rejects a distractor token', () => {
    assert.equal(checkAssembly(['avan', 'chaaya', 'kudikkuva'], spec), false);
  });

  it('folds diacritics and question marks in both directions', () => {
    const question: SentenceSpec = {
      bank: ['ningaḷ', 'ready', 'aano?', 'athe'],
      orders: ['ningaḷ ready aano?'],
      parts: [
        { word: 'ningaḷ', meaning: 'you' },
        { word: 'ready', meaning: 'ready' },
        { word: 'aano?', meaning: 'is it?' },
      ],
    };
    assert.equal(checkAssembly(['ningal', 'ready', 'aano?'], question), true);
    assert.equal(checkTypedSentence('ningal ready aano', question), true, 'missing ? is one small edit');
    assert.equal(checkTypedSentence('ningal readi aano?', question), true, 'one typo tolerated');
    assert.equal(checkTypedSentence('njan ready aano?', question), false);
  });

  it('sentenceWords returns the first accepted order as tokens', () => {
    assert.deepEqual(sentenceWords(spec), ['njan', 'chaaya', 'kudikkuva']);
  });
});
