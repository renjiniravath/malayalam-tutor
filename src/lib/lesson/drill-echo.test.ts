import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';

/**
 * The sentence drills read a line back to the learner, and that line is the
 * item's own display text — never a word of the accepted orders. The orders
 * are punctuation-free by design (§9 rule 8), so a line built from them shows
 * the learner a question with no mark, sitting above a script that carries
 * one (native-speaker ruling 2026-10-13).
 *
 * This pins the render at the source, because no test here can reach it any
 * other way: both echo sites sit behind state that only a tap sets (the check
 * result and the your-turn step), so a render without interaction never
 * reaches them, and the repo has no DOM test stack to interact with.
 *
 * The chip tray and the word breakdown are the exception and must stay
 * punctuation-free — they are the input layer the learner built from, and the
 * words the parts are written for — so they go through sentenceWords, which is
 * where the orders belong.
 */
const PLAYER_DIR = new URL('../../components/player/', import.meta.url);

/** The file's code, comments stripped: comments describe the rule, only code is pinned. */
function codeOf(file: string): string {
  return readFileSync(new URL(file, PLAYER_DIR), 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/[^\n]*/g, '');
}

describe('the drills read the model line back from the item display (ruling 2026-10-13)', () => {
  for (const file of ['SentenceBuilderDrill.tsx', 'RolePlayDrill.tsx']) {
    it(`${file}: the model line is item.manglish, and nothing reads the orders directly`, () => {
      const code = codeOf(file);
      assert.match(code, /const model = item\.manglish/, `${file}: the model line is the item's display text`);
      assert.doesNotMatch(code, /\.orders\b/, `${file}: the drill never reaches into the accepted orders`);
      assert.match(code, /sentenceWords\(spec\)/, `${file}: the tray and the breakdown keep the sentenceWords words`);
    });
  }

  it('RevealCard.tsx: the breakdown goes through sentenceWords, not the first order', () => {
    const code = codeOf('RevealCard.tsx');
    assert.doesNotMatch(code, /\.orders\b/, 'RevealCard.tsx: the breakdown never reaches into the accepted orders');
    assert.match(code, /sentenceWords\(item\.sentence\)/, 'RevealCard.tsx: the breakdown words come from sentenceWords');
  });
});
