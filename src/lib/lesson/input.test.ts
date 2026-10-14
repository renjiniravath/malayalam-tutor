import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { foldInput, matchesAcceptedInput } from './input';

describe('the forgiving input fold (§9 rules 5 and 8)', () => {
  it('drops a trailing question mark', () => {
    assert.equal(foldInput('eth?'), 'eth');
    assert.equal(foldInput('eth'), 'eth');
    assert.equal(foldInput('ningal ready aano?'), 'ningal ready aano');
  });

  it('forgives the display mark on inputs too short for typo tolerance', () => {
    // Below four characters no typo is tolerated, so the trailing fold is
    // the only thing that lets the mark through: a learner who copies the
    // mark they see on 'eth?' or 'ok' is never marked wrong for it
    // (ruling 2026-10-13). Delete the fold and these go false.
    assert.equal(matchesAcceptedInput('eth?', ['eth']), true);
    assert.equal(matchesAcceptedInput('eth', ['eth']), true);
    assert.equal(matchesAcceptedInput('ok?', ['ok']), true);
    assert.equal(matchesAcceptedInput('ok', ['ok']), true);
  });
});
