import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { contentRevision, currentItemIds } from '@/content';
import { reconcileProgress, type ProgressRecord, type Skill } from './reconcile';

const rec = (itemId: string, skill: Skill = 'recognition', state: unknown = { due: 1 }): ProgressRecord => ({
  itemId,
  skill,
  state,
});

const CURRENT = ['njan', 'nii', 'ningaḷ', 'thaankaḷ', 'sheri'];

describe('reconcileProgress', () => {
  it('keeps records whose items are still in content, state untouched', () => {
    const kept = rec('njan', 'recognition', { due: 7 });
    const result = reconcileProgress([kept], CURRENT, []);

    assert.deepEqual(result.active, [kept]);
    assert.deepEqual(result.archived, []);
    assert.deepEqual(result.reKeyed, []);
  });

  it('archives records for removed items without discarding their state', () => {
    const retired = rec('kallam', 'production', { due: 3 });
    const result = reconcileProgress([retired], CURRENT, ['kallam']);

    assert.deepEqual(result.active, []);
    assert.deepEqual(result.archived, [retired]);
    assert.deepEqual(result.reKeyed, []);
  });

  it('archives a removed item even when its id is no longer in removedItemIds', () => {
    // The id is gone from both content and the removal ledger: still retire, never orphan.
    const result = reconcileProgress([rec('mazha')], CURRENT, []);

    assert.equal(result.active.length, 0);
    assert.equal(result.archived.length, 1);
    assert.deepEqual(result.reKeyed, []);
  });

  it('re-keys records whose items were removed and re-added', () => {
    const old = rec('sheri', 'recognition', { due: 9 });
    const result = reconcileProgress([old], CURRENT, ['sheri']);

    // Old state is retired — the re-added item starts fresh under a new key.
    assert.deepEqual(result.active, []);
    assert.deepEqual(result.archived, [old]);
    assert.deepEqual(result.reKeyed, ['sheri']);
  });

  it('lists a re-added id once even with records for both skills', () => {
    const result = reconcileProgress(
      [rec('sheri', 'recognition'), rec('sheri', 'production')],
      CURRENT,
      ['sheri'],
    );

    assert.deepEqual(result.reKeyed, ['sheri']);
    assert.equal(result.archived.length, 2);
  });

  it('reconciles each skill independently', () => {
    const recognition = rec('ningaḷ', 'recognition');
    const production = rec('ningaḷ', 'production');
    const result = reconcileProgress([recognition, production], ['ningaḷ'], []);

    assert.deepEqual(result.active, [recognition, production]);
  });

  it('handles empty inputs', () => {
    assert.deepEqual(reconcileProgress([], CURRENT, []), { active: [], archived: [], reKeyed: [] });
  });

  it('maps every record in the real content bundle to an active or archived bucket', () => {
    const records = currentItemIds().flatMap((itemId) => [
      rec(itemId, 'recognition'),
      rec(itemId, 'production'),
    ]);
    const result = reconcileProgress(records, currentItemIds(), contentRevision.removedItemIds);

    // Nothing removed yet: every current item reconciles active, none re-keyed.
    assert.equal(result.active.length, records.length);
    assert.equal(result.archived.length, 0);
    assert.deepEqual(result.reKeyed, []);
  });

  it('honours the real removal ledger: gone ids archive, re-added ids re-key', () => {
    const current = currentItemIds();
    const result = reconcileProgress(
      [rec('retired-item'), rec('sheri'), rec('njan')],
      current,
      [...contentRevision.removedItemIds, 'retired-item', 'sheri'],
    );

    // 'retired-item' is in the ledger but not current content: archived, not re-keyed.
    // 'sheri' is current content and in the ledger: archived AND re-keyed (fresh start).
    // 'njan' is current and not in the ledger: active.
    assert.deepEqual(result.active.map((record) => record.itemId), ['njan']);
    assert.deepEqual(result.archived.map((record) => record.itemId), ['retired-item', 'sheri']);
    assert.deepEqual(result.reKeyed, ['sheri']);
  });
});
