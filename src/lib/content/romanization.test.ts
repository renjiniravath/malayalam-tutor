import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { levels } from '@/content';
import { geminationProblems, sentenceSpellingFindings } from './romanization';

describe('gemination cross-check (§9 rule 2)', () => {
  it('passes a script geminate written as a doubled consonant', () => {
    assert.deepEqual(geminationProblems('ഇതിൽ ഏതാ ഇഷ്ടപ്പെട്ടേ', 'ithil etha ishttappette'), []);
    assert.deepEqual(geminationProblems('കാപ്പി', 'kaappi'), []);
    assert.deepEqual(geminationProblems('നമ്മൾ', 'nammaḷ'), []);
    assert.deepEqual(geminationProblems('അയ്യോ', 'ayyo'), []);
  });

  it('fails a script geminate written as a single consonant', () => {
    const problems = geminationProblems('ഇതിൽ ഏതാ ഇഷ്ടപ്പെട്ടേ', 'ithil etha ishttapette');
    assert.equal(problems.length, 1);
    assert.match(problems[0], /'ishttapette'/);
    assert.match(problems[0], /script has pp/);
    assert.equal(geminationProblems('നമ്മൾ', 'namal').length, 1);
  });

  it('fails a doubled consonant the script does not geminate', () => {
    const problems = geminationProblems('ഞാൻ കാപി കുടിക്കുവാ', 'njan kaappi kudikkuva');
    assert.equal(problems.length, 1);
    assert.match(problems[0], /'kaappi'/);
    assert.match(problems[0], /doubles pp/);
  });

  it('leaves the coronal classes to the coronal pass', () => {
    assert.deepEqual(geminationProblems('നല്ല', 'nalla'), []);
    assert.deepEqual(geminationProblems('അവൻ ഇങ്ങോട്ട് വരുന്നുണ്ടോ', 'avan ingott varunnundo'), []);
  });

  it('exempts the English-loan spelling word by word, not item by item', () => {
    assert.deepEqual(geminationProblems('ഓക്കേ', 'okay'), []);
    assert.deepEqual(geminationProblems('ഞാൻ ബസ്സിൽ കേറാൻ പോകുവാ', 'njan busil keran pokuva'), []);
    const problems = geminationProblems('ബസ്സിൽ കാപി', 'busil kaappi');
    assert.equal(problems.length, 1);
    assert.match(problems[0], /'kaappi'/);
  });

  it('fails a loan whose script is not the script it is written for', () => {
    const problems = geminationProblems('ബസിലേക്', 'busilekk');
    assert.equal(problems.length, 1);
    assert.match(problems[0], /'busilekk'/);
    assert.match(problems[0], /ബസ്സിലേക്ക്/);
  });

  it('passes the -o and -um particles, plain y like the script', () => {
    assert.deepEqual(geminationProblems('നീയോ', 'neeyo'), []);
    assert.deepEqual(geminationProblems('നീയും', 'neeyum'), []);
  });

  it('passes every item in the shipped content', () => {
    for (const level of levels) {
      for (const lesson of level.lessons) {
        for (const item of lesson.items) {
          if (item.script === undefined) continue;
          assert.deepEqual(
            geminationProblems(item.script, item.manglish),
            [],
            `${lesson.id}/${item.id}`,
          );
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
