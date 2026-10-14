import type { Lesson } from '@/content/types';

/**
 * Level test spec (PLAN.md §7): 20-25 items drawn on the whole level,
 * interleaved, in three sections: recognition (auto-scored), production
 * (auto-scored), and pronunciation (auto-scored minimal-pair
 * discrimination). Pass >= 80% unlocks the next level; retakes are
 * unlimited, gated only by completing the failed-items review first.
 */

export interface TestSpec {
  itemCount: 20 | 25;
  passPct: 0.8;
  sections: ['recognition', 'production', 'pronunciation'];
  retake: 'unlimited-after-failed-review';
}

export const LEVEL_TEST_SPEC: TestSpec = {
  itemCount: 20,
  passPct: 0.8,
  sections: ['recognition', 'production', 'pronunciation'],
  retake: 'unlimited-after-failed-review',
};

export interface TestEntry {
  itemId: string;
  /** Set on pronunciation entries: the minimal pair that discriminates it */
  pairId?: string;
}

export interface TestSection {
  kind: 'recognition' | 'production' | 'pronunciation';
  entries: TestEntry[];
}

/**
 * Draws the level test: items interleaved round-robin across lessons so
 * no single lesson dominates a run. Pronunciation is the level's
 * minimal-pair set, the auto-scored discrimination section.
 */
export function buildLevelTest(lessons: Lesson[], spec: TestSpec): TestSection[] {
  const picked = interleave(lessons, spec.itemCount);
  const pairs = lessons.flatMap((lesson) => lesson.minimalPairs);

  return [
    { kind: 'recognition', entries: picked.map((item) => ({ itemId: item.id })) },
    { kind: 'production', entries: picked.map((item) => ({ itemId: item.id })) },
    {
      kind: 'pronunciation',
      entries: pairs.map((pair) => ({ itemId: pair.aItemId, pairId: pair.id })),
    },
  ];
}

/** Round-robin across lessons so the test interleaves rather than blocks. */
export function interleave(lessons: Lesson[], count: number): { id: string }[] {
  const pools = lessons.map((lesson) => [...lesson.items]);
  const picked: { id: string }[] = [];
  while (picked.length < count) {
    let added = false;
    for (const pool of pools) {
      const item = pool.shift();
      if (item) {
        picked.push({ id: item.id });
        added = true;
      }
      if (picked.length === count) break;
    }
    if (!added) break;
  }
  return picked;
}

/** Pass bar (PLAN.md §7): correct answers over the whole test, >= passPct. */
export function passesTest(correct: number, total: number, spec: TestSpec): boolean {
  if (total === 0) return false;
  return correct / total >= spec.passPct;
}
