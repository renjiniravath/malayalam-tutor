import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { hasBareSecondPersonUva, SECOND_PERSON_SUBJECTS } from './pragmatics';

describe('-uva pragmatics (PLAN.md §5)', () => {
  it('flags bare second-person -uva declaratives as command-like', () => {
    assert.equal(hasBareSecondPersonUva(['nii varuva']), true);
    assert.equal(hasBareSecondPersonUva(['ningaḷ pokuva']), true);
    assert.equal(hasBareSecondPersonUva(['thaankaḷ varuva']), true);
  });

  it('allows first and third person -uva declaratives', () => {
    assert.equal(hasBareSecondPersonUva(['njan varuva']), false);
    assert.equal(hasBareSecondPersonUva(['avan varuva']), false);
    assert.equal(hasBareSecondPersonUva(['nammaḷ pokuva']), false);
  });

  it('allows the second-person question forms', () => {
    assert.equal(hasBareSecondPersonUva(['nii varunnundo?']), false);
    assert.equal(hasBareSecondPersonUva(['ningaḷ varunnundo?']), false);
  });

  it('covers all three second-person subjects', () => {
    assert.deepEqual(SECOND_PERSON_SUBJECTS, ['nii', 'ningaḷ', 'thaankaḷ']);
  });
});
