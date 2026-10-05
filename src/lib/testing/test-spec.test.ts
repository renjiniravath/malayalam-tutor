import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { level1 } from '@/content';
import { LEVEL_TEST_SPEC, buildLevelTest, interleave, passesTest } from './test-spec';

const lessons = level1.lessons;
const spec = LEVEL_TEST_SPEC;

describe('TestSpec (PLAN.md §7 level test)', () => {
  it('spec: 20-25 items, 80% pass bar, three sections, unlimited retakes', () => {
    assert.ok([20, 25].includes(spec.itemCount));
    assert.equal(spec.passPct, 0.8);
    assert.deepEqual(spec.sections, ['recognition', 'production', 'pronunciation']);
    assert.equal(spec.retake, 'unlimited-after-failed-review');
  });

  it('draws recognition and production over exactly itemCount items', () => {
    const sections = buildLevelTest(lessons, spec);
    const recognition = sections.find((s) => s.kind === 'recognition')!;
    const production = sections.find((s) => s.kind === 'production')!;
    assert.equal(recognition.entries.length, spec.itemCount);
    assert.equal(production.entries.length, spec.itemCount);
    assert.deepEqual(
      recognition.entries.map((e) => e.itemId),
      production.entries.map((e) => e.itemId),
    );
  });

  it('pronunciation is the level minimal-pair set, one entry per pair', () => {
    const sections = buildLevelTest(lessons, spec);
    const pronunciation = sections.find((s) => s.kind === 'pronunciation')!;
    const pairCount = lessons.flatMap((lesson) => lesson.minimalPairs).length;
    assert.ok(pairCount > 0, 'level 1 has minimal pairs');
    assert.equal(pronunciation.entries.length, pairCount);
    for (const entry of pronunciation.entries) {
      assert.ok(entry.pairId, 'pronunciation entries reference their minimal pair');
    }
  });

  it('interleaves items across lessons instead of blocking on one', () => {
    const picked = interleave(lessons, spec.itemCount);
    assert.equal(picked.length, spec.itemCount);
    const firstSeven = picked.slice(0, 7).map((entry) => entry.id);
    const seen = new Set(firstSeven);
    assert.equal(seen.size, 7, 'the first round-robin pass hits each lesson once');
  });

  it('pass bar: 80% or better passes, less fails, empty run fails', () => {
    assert.equal(passesTest(16, 20, spec), true);
    assert.equal(passesTest(15, 20, spec), false);
    assert.equal(passesTest(0, 0, spec), false);
  });

  it('every drawn item id exists in the level content', () => {
    const ids = new Set(lessons.flatMap((lesson) => lesson.items.map((item) => item.id)));
    for (const section of buildLevelTest(lessons, spec)) {
      for (const entry of section.entries) {
        assert.ok(ids.has(entry.itemId), `${entry.itemId} exists in level 1`);
      }
    }
  });
});
