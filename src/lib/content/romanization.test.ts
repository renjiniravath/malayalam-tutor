import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { levels } from '@/content';
import { geminationFindings, sentenceSpellingFindings } from './romanization';

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
    assert.deepEqual(
      geminationFindings('ഞാൻ ബസ്സിൽ കേറാൻ പോകുവാ', 'njan busil keran pokuva').problems,
      [],
    );
    const { problems } = geminationFindings('ബസ്സിൽ കാപി', 'busil kaappi');
    assert.equal(problems.length, 1);
    assert.match(problems[0], /'kaappi'/);
  });

  it('fails a loan whose script is not the script it is written for', () => {
    const { problems } = geminationFindings('ബസിലേക്', 'busilekk');
    assert.equal(problems.length, 1);
    assert.match(problems[0], /'busilekk'/);
    assert.match(problems[0], /ബസ്സിലേക്ക്/);
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

describe('sentence drill spelling (§9, learner-visible strings)', () => {
  const manglish = 'ithil etha ishttappette';
  const sentence = {
    bank: ['ithil', 'etha', 'ishttappette', 'entha'],
    orders: ['ithil etha ishttappette'],
    parts: [
      { word: 'ithil', meaning: 'among these' },
      { word: 'etha', meaning: 'which' },
      { word: 'ishttappette', meaning: 'did you like?' },
    ],
  };

  it('passes a sentence spec that spells the sentence words', () => {
    assert.deepEqual(sentenceSpellingFindings(manglish, sentence), []);
  });

  it('fails an order or part word spelled differently from the sentence', () => {
    const reverted = {
      bank: ['ithil', 'etha', 'ishttapette', 'entha'],
      orders: ['ithil etha ishttapette'],
      parts: [
        { word: 'ithil', meaning: 'among these' },
        { word: 'etha', meaning: 'which' },
        { word: 'ishttapette', meaning: 'did you like?' },
      ],
    };
    const findings = sentenceSpellingFindings(manglish, reverted);
    assert.equal(findings.length, 2);
    assert.match(findings[0], /order word 'ishttapette' is not a word of the sentence 'ithil etha ishttappette'/);
    assert.match(findings[1], /part word 'ishttapette' is not a word of the sentence 'ithil etha ishttappette'/);
  });

  it('names the sentence spelling when an order word folds to it', () => {
    const folded = {
      bank: ['nammaḷ', 'pokuva'],
      orders: ['nammal pokuva'],
      parts: [
        { word: 'nammaḷ', meaning: 'we' },
        { word: 'pokuva', meaning: 'go' },
      ],
    };
    const findings = sentenceSpellingFindings('nammaḷ pokuva', folded);
    assert.equal(findings.length, 1);
    assert.match(findings[0], /order word 'nammal' where the sentence spells 'nammaḷ'/);
  });

  it('fails an order the word bank cannot build', () => {
    const alternate = {
      bank: ['ithil', 'ishttappette', 'entha', 'evide'],
      orders: ['ithil etha ishttappette', 'etha ithil ishttappette'],
      parts: [
        { word: 'ithil', meaning: 'among these' },
        { word: 'ishttappette', meaning: 'did you like?' },
      ],
    };
    const findings = sentenceSpellingFindings(manglish, alternate);
    assert.equal(findings.length, 1);
    assert.match(findings[0], /word bank has no chip for 'etha'/);
  });

  it('fails a bank chip that is a variant spelling of a sentence word', () => {
    const variant = {
      bank: ['nammaḷ', 'pokuva', 'nammal'],
      orders: ['nammaḷ pokuva'],
      parts: [
        { word: 'nammaḷ', meaning: 'we' },
        { word: 'pokuva', meaning: 'go' },
      ],
    };
    const findings = sentenceSpellingFindings('nammaḷ pokuva', variant);
    assert.equal(findings.length, 1);
    assert.match(findings[0], /bank chip 'nammal' is a variant spelling of the sentence word 'nammaḷ'/);
  });

  it('passes every sentence spec in the shipped content', () => {
    for (const level of levels) {
      for (const lesson of level.lessons) {
        for (const item of lesson.items) {
          if (!item.sentence) continue;
          assert.deepEqual(
            sentenceSpellingFindings(item.manglish, item.sentence),
            [],
            `${lesson.id}/${item.id}`,
          );
        }
      }
    }
  });
});
