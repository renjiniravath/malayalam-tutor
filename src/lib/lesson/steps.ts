/**
 * Builds the ordered step list for a lesson (PLAN.md §6 lesson loop).
 * Content drills (multiple-choice, minimal pairs) run in authored order;
 * reveal cards introduce each item first, anticipation and typing steps
 * are derived from the items:
 *  - anticipation (repeat) is skipped in comprehension-only lessons
 *  - typing uses each item's acceptedInputs
 * Minimal-pair drills run after all items are introduced.
 */

import type { Lesson, MinimalPair, DrillSpec } from '@/content/types';

export type MultipleChoiceDrill = Extract<DrillSpec, { kind: 'multipleChoice' }>;
export type MinimalPairDrill = Extract<DrillSpec, { kind: 'minimalPair' }>;

export type LessonStep =
  | { kind: 'reveal'; itemId: string }
  | { kind: 'anticipation'; itemId: string }
  | { kind: 'multipleChoice'; drill: MultipleChoiceDrill }
  | { kind: 'minimalPair'; drill: MinimalPairDrill; pair: MinimalPair }
  | { kind: 'typing'; itemId: string };

export function buildLessonSteps(lesson: Lesson): LessonStep[] {
  const steps: LessonStep[] = [];
  const mcByItem = new Map<string, MultipleChoiceDrill>();
  const pairsById = new Map(lesson.minimalPairs.map((p) => [p.id, p]));
  const pairDrills: MinimalPairDrill[] = [];

  for (const drill of lesson.drills) {
    if (drill.kind === 'multipleChoice') mcByItem.set(drill.itemId, drill);
    else pairDrills.push(drill);
  }

  for (const item of lesson.items) {
    steps.push({ kind: 'reveal', itemId: item.id });
    if (!lesson.comprehensionOnly) steps.push({ kind: 'anticipation', itemId: item.id });
    const mc = mcByItem.get(item.id);
    if (mc) steps.push({ kind: 'multipleChoice', drill: mc });
    if (item.acceptedInputs && item.acceptedInputs.length > 0) {
      steps.push({ kind: 'typing', itemId: item.id });
    }
  }

  for (const drill of pairDrills) {
    const pair = pairsById.get(drill.pairId);
    if (pair) steps.push({ kind: 'minimalPair', drill, pair });
  }
  return steps;
}
