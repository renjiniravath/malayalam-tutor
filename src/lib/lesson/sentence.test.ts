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

  it('ignores a trailing question mark: the display carries it, the learner does not type it', () => {
    // §9 rule 8: the bank and the orders are punctuation-free, and a '?'
    // the learner types folds away before the compare.
    const question: SentenceSpec = {
      bank: ['ningaḷ', 'ready', 'aano', 'athe'],
      orders: ['ningaḷ ready aano'],
      parts: [
        { word: 'ningaḷ', meaning: 'you' },
        { word: 'ready', meaning: 'ready' },
        { word: 'aano', meaning: 'is it?' },
      ],
    };
    assert.equal(checkAssembly(['ningal', 'ready', 'aano'], question), true);
    assert.equal(checkTypedSentence('ningal ready aano', question), true, 'the display mark is not typed');
    assert.equal(checkTypedSentence('ningal ready aano?', question), true, 'typing it anyway is forgiven');
    assert.equal(checkTypedSentence('ningal readi aano', question), true, 'one typo tolerated');
    assert.equal(checkTypedSentence('njan ready aano?', question), false);
  });

  it("accepts an item's authored variants alongside the orders", () => {
    const plan: SentenceSpec = {
      bank: ['nammaḷkku', 'ippo', 'pokaam', 'pokum'],
      orders: ['nammaḷkku ippo pokaam'],
      parts: [
        { word: 'nammaḷkku', meaning: 'to us' },
        { word: 'ippo', meaning: 'now' },
        { word: 'pokaam', meaning: "let's go" },
      ],
    };
    const variants = ['nammalkku ippo pokaam', 'namukku ippo pokaam'];
    assert.equal(checkTypedSentence('nammaḷkku ippo pokaam', plan), true, 'canonical order');
    assert.equal(checkTypedSentence('namukku ippo pokaam', plan, variants), true, 'sanctioned variant');
    assert.equal(checkTypedSentence('nammalkku ippo pokaam', plan, variants), true, 'folded display');
    assert.equal(checkTypedSentence('ippo nammaḷkku pokaam', plan, variants), false, 'scrambled');
    assert.equal(checkTypedSentence('njan ippo pokaam', plan, variants), false, 'wrong word');
    assert.equal(checkTypedSentence('nammaḷkku ippo pokaam', plan, []), true, 'no variants, order still passes');
  });

  it('sentenceWords returns the first accepted order as tokens', () => {
    assert.deepEqual(sentenceWords(spec), ['njan', 'chaaya', 'kudikkuva']);
  });
});
