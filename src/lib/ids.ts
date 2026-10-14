/**
 * Collision-resistant ids that work on every origin the learner uses.
 * crypto.randomUUID only exists in secure contexts (https, localhost);
 * on a plain LAN address like http://10.0.0.38:3121 it is undefined,
 * so the fallback combines a timestamp with Math.random entropy.
 */
export function generateId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  const time = Date.now().toString(36);
  const random = Math.random().toString(36).slice(2, 12);
  return `${time}-${random}`;
}
