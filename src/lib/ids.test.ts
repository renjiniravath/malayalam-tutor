import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { generateId } from './ids';

describe('generateId', () => {
  it('returns unique ids across many calls when randomUUID is available', () => {
    const ids = new Set(Array.from({ length: 1000 }, () => generateId()));
    assert.equal(ids.size, 1000);
  });

  it('still returns unique ids when crypto.randomUUID is unavailable', () => {
    const original = crypto.randomUUID;
    try {
      Object.defineProperty(crypto, 'randomUUID', { value: undefined, configurable: true });
      const ids = new Set(Array.from({ length: 1000 }, () => generateId()));
      assert.equal(ids.size, 1000, 'fallback ids stay unique');
      for (const id of ids) {
        assert.match(id, /^[a-z0-9]+-[a-z0-9]+$/, 'fallback ids use the timestamp-random shape');
      }
    } finally {
      Object.defineProperty(crypto, 'randomUUID', { value: original, configurable: true, writable: true });
    }
  });

  it('uses the secure-context form when available', () => {
    const id = generateId();
    // Node's randomUUID form: 8-4-4-4-12 hex groups.
    assert.match(id, /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
  });
});
