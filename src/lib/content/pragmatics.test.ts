import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  hasBareFirstPersonSayDo,
  hasBareSecondPersonUva,
  hasChettaSubject,
  SECOND_PERSON_SUBJECTS,
} from './pragmatics';

describe('-uva pragmatics (PLAN.md §5)', () => {
  it('flags bare second-person -uva declaratives as command-like', () => {
    assert.equal(hasBareSecondPersonUva(['nee varuva']), true);
    assert.equal(hasBareSecondPersonUva(['ningaḷ pokuva']), true);
    assert.equal(hasBareSecondPersonUva(['thaankaḷ varuva']), true);
  });

  it('allows first and third person -uva declaratives', () => {
    assert.equal(hasBareSecondPersonUva(['njan varuva']), false);
    assert.equal(hasBareSecondPersonUva(['avan varuva']), false);
    assert.equal(hasBareSecondPersonUva(['nammaḷ pokuva']), false);
  });

  it('allows the second-person question forms', () => {
    assert.equal(hasBareSecondPersonUva(['nee varunnundo']), false);
    assert.equal(hasBareSecondPersonUva(['ningaḷ varunnundo']), false);
  });

  it('covers all three second-person subjects', () => {
    assert.deepEqual(SECOND_PERSON_SUBJECTS, ['nee', 'ningaḷ', 'thaankaḷ']);
  });

  it('flags chetta used as a sentence subject', () => {
    assert.equal(hasChettaSubject(['chetta pokuva']), true);
    assert.equal(hasChettaSubject(['chetta varunnundo']), true);
  });

  it('allows chetta as a vocative in an addressed question', () => {
    assert.equal(hasChettaSubject(['chetta, ith kando']), false);
    assert.equal(hasChettaSubject(['avan varuva']), false);
  });

  it('flags bare first-person parayuva/cheyyuva declaratives', () => {
    assert.equal(hasBareFirstPersonSayDo(['njan parayuva']), true);
    assert.equal(hasBareFirstPersonSayDo(['njan cheyyuva']), true);
    assert.equal(hasBareFirstPersonSayDo(['nammaḷ parayuva']), true);
  });

  it('allows first-person -uva declaratives with a complement or other verbs', () => {
    assert.equal(hasBareFirstPersonSayDo(['njan ippo varuva']), false);
    assert.equal(hasBareFirstPersonSayDo(['njan chaaya kudikkuva']), false);
    assert.equal(hasBareFirstPersonSayDo(['avan parayuva']), false);
  });
});
