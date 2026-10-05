/**
 * Level test planner tests (PLAN.md §7): 20-25 items, three sections,
 * pronunciation as auto-scored minimal-pair discrimination, 80% bar.
 */

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { LEVELS } from '@/content/levels'
import { planLevelTest } from './levelTest'

const LEVEL = LEVELS[0]

test('the plan fills the TestSpec count across all three sections', () => {
  for (const count of [20, 25] as const) {
    const plan = planLevelTest(LEVEL, count)
    assert.equal(plan.itemCount, count)
    assert.equal(plan.passPct, 0.8)
    const drawn = plan.sections.reduce((n, s) => n + s.itemIds.length + s.pairIds.length, 0)
    assert.equal(drawn, count)
    assert.deepEqual(
      plan.sections.map((s) => s.section),
      ['recognition', 'production', 'pronunciation'],
    )
  }
})

test('every section is auto-scored', () => {
  const plan = planLevelTest(LEVEL)
  assert.ok(plan.sections.every((s) => s.autoScored))
})

test('pronunciation draws only minimal pairs that exist in the level', () => {
  const levelPairs = new Set(LEVEL.lessons.flatMap((l) => l.pairs.map((p) => p.id)))
  const plan = planLevelTest(LEVEL)
  const pronunciation = plan.sections.find((s) => s.section === 'pronunciation')
  assert.ok(pronunciation)
  assert.ok(pronunciation.pairIds.length > 0)
  assert.ok(pronunciation.pairIds.every((id) => levelPairs.has(id)))
  assert.equal(pronunciation.itemIds.length, 0)
})

test('recognition and production draw distinct existing items', () => {
  const levelItems = new Set(LEVEL.lessons.flatMap((l) => l.items.map((i) => i.id)))
  const plan = planLevelTest(LEVEL)
  const recognition = plan.sections.find((s) => s.section === 'recognition')
  const production = plan.sections.find((s) => s.section === 'production')
  assert.ok(recognition && production)
  const all = [...recognition.itemIds, ...production.itemIds]
  assert.equal(new Set(all).size, all.length, 'no item appears in both scored sections')
  assert.ok(all.every((id) => levelItems.has(id)))
})

test('the plan is deterministic', () => {
  assert.deepEqual(planLevelTest(LEVEL), planLevelTest(LEVEL))
})
