import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { levels } from '@/content';
import { geminationFindings } from './romanization';

describe('gemination cross-check (§9 rule 2)', () => {
  it('passes a script geminate written as a doubled consonant', () => {
    assert.deepEqual(geminationFindings('ഇതിൽ ഏതാ ഇഷ്ടപ്പെട്ടേ', 'ithil etha ishttappette').problems, []);
    assert.deepEqual(geminationFindings('കാപ്പി', 'kaappi').problems, []);
    assert.deepEqual(geminationFindings('നമ്മൾ', 'nammaḷ').problems, []);
    assert.deepEqual(geminationFindings('അയ്യോ', 'ayyo').problems, []);
  });

  it('fails a script geminate written as a single consonant', () => {
    const { problems } = geminationFindings('ഇതിൽ ഏതാ ഇഷ്ടപ്പെട്ടേ', 'ithil etha ishttapette');
    assert.equal(problems.length, 1);
    assert.match(problems[0], /'ishttapette'/);
    assert.match(problems[0], /script has pp/);
    assert.equal(geminationFindings('നമ്മൾ', 'namal').problems.length, 1);
  });

  it('fails a doubled consonant the script does not geminate', () => {
    const { problems } = geminationFindings('ഞാൻ കാപി കുടിക്കുവാ', 'njan kaappi kudikkuva');
    assert.equal(problems.length, 1);
    assert.match(problems[0], /'kaappi'/);
    assert.match(problems[0], /doubles pp/);
  });

  it('leaves the coronal classes to the coronal pass', () => {
    assert.deepEqual(geminationFindings('നല്ല', 'nalla').problems, []);
    assert.deepEqual(geminationFindings('അവൻ ഇങ്ങോട്ട് വരുന്നുണ്ടോ', 'avan ingott varunnundo').problems, []);
  });

  it('exempts the English-loan spelling word by word, not item by item', () => {
    assert.deepEqual(geminationFindings('ഓക്കേ', 'okay').problems, []);
    assert.deepEqual(geminationFindings('ഞാൻ ബസ്സിൽ കേറാൻ പോകുവാ', 'njan busil keran pokuva').problems, []);
    const { problems } = geminationFindings('ബസ്സിൽ കാപി', 'busil kaappi');
    assert.equal(problems.length, 1);
    assert.match(problems[0], /'kaappi'/);
  });

  it('reports the sanctioned particles for native-speaker script review, not as errors', () => {
    const { problems, review } = geminationFindings('നീയോ', 'neeyyo');
    assert.deepEqual(problems, []);
    assert.equal(review.length, 1);
    assert.match(review[0], /'neeyyo'/);
  });

  it('passes every item in the shipped content', () => {
    for (const level of levels) {
      for (const lesson of level.lessons) {
        for (const item of lesson.items) {
          if (item.script === undefined) continue;
          const { problems } = geminationFindings(item.script, item.manglish);
          assert.deepEqual(problems, [], `${lesson.id}/${item.id}`);
        }
      }
    }
  });
});
