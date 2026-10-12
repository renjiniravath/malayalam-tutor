/**
 * Builds the ordered step list for a lesson (PLAN.md §6 lesson loop).
 * Content drills (multiple-choice, minimal pairs) run in authored order;
 * reveal cards introduce each item first, anticipation and typing steps
 * are derived from the items:
 *  - anticipation (repeat) is skipped in comprehension-only lessons
 *  - typing uses each item's acceptedInputs
 *  - a role-play drill carries its own production step, so the derived
 *    typing step is skipped for that item
 * Minimal-pair drills run after all items are introduced.
 */

import type { Lesson, MinimalPair, DrillSpec } from '@/content/types';

export type MultipleChoiceDrill = Extract<DrillSpec, { kind: 'multipleChoice' }>;
export type MinimalPairDrill = Extract<DrillSpec, { kind: 'minimalPair' }>;
export type SentenceBuilderDrill = Extract<DrillSpec, { kind: 'sentenceBuilder' }>;
export type RolePlayDrill = Extract<DrillSpec, { kind: 'rolePlay' }>;

export type LessonStep =
  | { kind: 'reveal'; itemId: string }
  | { kind: 'anticipation'; itemId: string }
  | { kind: 'multipleChoice'; drill: MultipleChoiceDrill }
  | { kind: 'minimalPair'; drill: MinimalPairDrill; pair: MinimalPair }
  | { kind: 'sentenceBuilder'; drill: SentenceBuilderDrill }
  | { kind: 'rolePlay'; drill: RolePlayDrill }
  | { kind: 'typing'; itemId: string };

export function buildLessonSteps(lesson: Lesson): LessonStep[] {
  const steps: LessonStep[] = [];
  const mcByItem = new Map<string, MultipleChoiceDrill>();
  const sbByItem = new Map<string, SentenceBuilderDrill>();
  const rpByItem = new Map<string, RolePlayDrill>();
  const pairsById = new Map(lesson.minimalPairs.map((p) => [p.id, p]));
  const pairDrills: MinimalPairDrill[] = [];

  for (const drill of lesson.drills) {
    if (drill.kind === 'multipleChoice') mcByItem.set(drill.itemId, drill);
    else if (drill.kind === 'sentenceBuilder') sbByItem.set(drill.itemId, drill);
    else if (drill.kind === 'rolePlay') rpByItem.set(drill.itemId, drill);
    else pairDrills.push(drill);
  }

  for (const item of lesson.items) {
    steps.push({ kind: 'reveal', itemId: item.id });
    if (!lesson.comprehensionOnly) steps.push({ kind: 'anticipation', itemId: item.id });
    const mc = mcByItem.get(item.id);
    if (mc) steps.push({ kind: 'multipleChoice', drill: mc });
    const rp = rpByItem.get(item.id);
    if (!rp && item.acceptedInputs && item.acceptedInputs.length > 0) {
      steps.push({ kind: 'typing', itemId: item.id });
    }
    const sb = sbByItem.get(item.id);
    if (sb) steps.push({ kind: 'sentenceBuilder', drill: sb });
    if (rp) steps.push({ kind: 'rolePlay', drill: rp });
  }

  for (const drill of pairDrills) {
    const pair = pairsById.get(drill.pairId);
    if (pair) steps.push({ kind: 'minimalPair', drill, pair });
  }
  return steps;
}
