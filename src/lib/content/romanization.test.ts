import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { levels } from '@/content';
import { foldInput } from '@/lib/lesson/input';
import { geminationProblems, loanScriptsFor, sentenceSpellingFindings } from './romanization';

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

  it('pins the school, full and bucket loan scripts', () => {
    assert.deepEqual(geminationProblems('സ്കൂളിൽ', 'schoolil'), []);
    assert.deepEqual(geminationProblems('ഈ ബക്കറ്റ് ഫുൾ ആയി', 'ee bucket full aayi'), []);
  });

  it('pins the bus loan carrying the fused -a', () => {
    assert.deepEqual(geminationProblems('ഏത് ബസ്സാ', 'eth busa'), []);
    const problems = geminationProblems('ഏത് ബസാ', 'eth busa');
    assert.equal(problems.length, 1);
    assert.match(problems[0], /ബസ്സാ/);
  });

  it('pins the black and color loan scripts', () => {
    assert.deepEqual(geminationProblems('ബ്ലാക്ക് കളർ', 'black color'), []);
    const problems = geminationProblems('ബ്ലാക് കളർ', 'black color');
    assert.equal(problems.length, 1);
    assert.match(problems[0], /ബ്ലാക്ക്/);
  });

  it('pins the hello loan script', () => {
    assert.deepEqual(geminationProblems('ഹലോ ആരാ', 'hello, aara'), []);
    const problems = geminationProblems('ഹെല്ലോ ആരാ', 'hello, aara');
    assert.equal(problems.length, 1);
    assert.match(problems[0], /ഹെല്ലോ/);
  });

  it('pins the ticket and bill loan scripts', () => {
    assert.deepEqual(geminationProblems('എറണാകുളം രണ്ട് ടിക്കറ്റ്', 'ernakuḷam, randu ticket'), []);
    const problems = geminationProblems('എറണാകുളം രണ്ട് ടികറ്റ്', 'ernakuḷam, randu ticket');
    assert.equal(problems.length, 1);
    assert.match(problems[0], /ടികറ്റ്/);
    // The bill is not a gemination case — ബിൽ has no doubled class letter —
    // so the pin is what the coronal pass reads for it.
    assert.deepEqual(loanScriptsFor('bill'), ['ബിൽ']);
    assert.deepEqual(loanScriptsFor('ticket'), ['ടിക്കറ്റ്']);
  });

  it('pins the government hospital loan scripts', () => {
    assert.deepEqual(
      geminationProblems('ഗവൺമെന്റ് ഹോസ്പിറ്റലിലേക്ക് പോവുമോ', 'government hospital-ilekk povumo'),
      [],
    );
    const problems = geminationProblems('ഗവമെന്റ് ഹോസ്പിറ്റലിലേക്ക് പോവുമോ', 'government hospital-ilekk povumo');
    assert.equal(problems.length, 1);
    assert.match(problems[0], /'government'/);
    assert.match(problems[0], /ഗവൺമെന്റ്/);
  });

  it('pins the hotel order loan scripts, the -um forms included', () => {
    assert.deepEqual(geminationProblems('ചിക്കൻ ബിരിയാണി ഉണ്ടോ', 'chicken biriyani undo'), []);
    assert.deepEqual(geminationProblems('ആ ടേബിളിൽ ഇരുന്നോ', 'aa tablil irunno'), []);
    assert.deepEqual(geminationProblems('ആ ടേബിളിലേക്ക് ഇരുന്നോ', 'aa tableilekk irunno'), []);
    assert.deepEqual(loanScriptsFor('tableilekk'), ['ടേബിളിലേക്ക്']);
    assert.deepEqual(geminationProblems('ഒരു ഫ്രഷ് ലൈമും', 'oru fresh lime-um'), []);
    // The dash is not part of the spelling: lime-um looks up the limeum pin,
    // the same way hospital-ilekk looks up hospitalilekk.
    assert.deepEqual(loanScriptsFor('limeum'), ['ലൈമും']);
    assert.deepEqual(loanScriptsFor('biriyaniyum'), ['ബിരിയാണിയും']);
    const problems = geminationProblems('ചിക്കൻ ബിരിയാനി ഉണ്ടോ', 'chicken biriyani undo');
    assert.equal(problems.length, 1);
    assert.match(problems[0], /ബിരിയാണി/);
  });

  it('does not read an inherited object key as a loan (constructor)', () => {
    // A plain object answers for Object.prototype members, so an unguarded
    // lookup would return a function and crash the pass instead of reporting.
    assert.deepEqual(geminationProblems('വീട്', 'constructor'), []);
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
    // Two spelling findings, plus the display/order check the mis-spelled
    // order trips as well: the order is no longer the sentence on display.
    assert.equal(findings.length, 3);
    assert.match(findings[0], /order word 'ishttapette' is not a word of the sentence 'ithil etha ishttappette'/);
    assert.match(findings[1], /part word 'ishttapette' is not a word of the sentence 'ithil etha ishttappette'/);
    assert.match(findings[2], /is not the sentence 'ithil etha ishttappette', mark aside/);
  });

  it('passes a marked question whose first order is the same sentence', () => {
    const asked = {
      bank: ['ningal', 'ready', 'aano'],
      orders: ['ningal ready aano'],
      parts: [
        { word: 'ningal', meaning: 'you' },
        { word: 'ready', meaning: 'ready' },
        { word: 'aano', meaning: 'is it?' },
      ],
    };
    assert.deepEqual(sentenceSpellingFindings('ningal ready aano?', asked), []);
  });

  it('fails a first accepted order that is not the sentence on display', () => {
    // The drill reads the model line back from the display text, so an
    // order that says it another way would not be the line it shows.
    const reordered = {
      bank: ['ithil', 'etha', 'ishttappette', 'entha'],
      orders: ['etha ithil ishttappette'],
      parts: [
        { word: 'ithil', meaning: 'among these' },
        { word: 'etha', meaning: 'which' },
        { word: 'ishttappette', meaning: 'did you like?' },
      ],
    };
    const findings = sentenceSpellingFindings('ithil etha ishttappette', reordered);
    assert.equal(findings.length, 1);
    assert.match(
      findings[0],
      /the first accepted order 'etha ithil ishttappette' is not the sentence 'ithil etha ishttappette', mark aside/,
    );
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

  it('keeps every model line on the graded order, mark aside', () => {
    // §9 rule 8: the drill renders the model line from the item's own
    // display text and grades against the first accepted order, so the two
    // are the same sentence with only the display's mark between them — a
    // marked question shows the mark above its script, an unmarked one
    // shows none, and the learner who types either one passes.
    let marked = 0;
    for (const level of levels) {
      for (const lesson of level.lessons) {
        for (const item of lesson.items) {
          if (!item.sentence) continue;
          const where = `${lesson.id}/${item.id}`;
          const order = item.sentence.orders[0];
          assert.equal(foldInput(item.manglish), foldInput(order), where);
          assert.ok(!order.endsWith('?'), `${where}: the graded order carries no mark`);
          if (item.manglish.endsWith('?')) marked++;
        }
      }
    }
    assert.ok(marked > 0, 'the corpus still has a marked question item to render');
  });
});

describe('the mark is for questions (native-speaker ruling 2026-10-13)', () => {
  const itemById = (id: string) =>
    levels.flatMap((level) => level.lessons.flatMap((lesson) => lesson.items)).find((item) => item.id === id);

  it('leaves the two request lines plain in both layers', () => {
    // "sit over at that table" and "give me half a kilo" are shaped like
    // their questions but are requests, so they take no mark: the display
    // and the script stay plain, and nothing asks for one — neither line
    // spells a bare question word ('irunno' and 'eduttho' are not
    // standalone askers, so even a reading over the whole display leaves
    // them alone), and the sentence rule wants the display and the first
    // order to agree, which they do. Mark them and this fails, which is
    // the point: the ruling is the reason.
    for (const id of ['undello-aa-tableilekk-irunno', 'sheri-chetta-ara-kilo-eduttho']) {
      const item = itemById(id);
      assert.ok(item, `${id} is still in the corpus`);
      assert.ok(!item.manglish.endsWith('?'), `${id}: a request takes no mark`);
      assert.ok(item.script && !item.script.endsWith('?'), `${id}: its script is plain too`);
      assert.ok(item.sentence, `${id} is still a sentence item`);
      assert.deepEqual(sentenceSpellingFindings(item.manglish, item.sentence), [], id);
    }
  });
});
