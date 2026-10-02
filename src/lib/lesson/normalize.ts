/**
 * ASCII-forgiving input matching (PLAN.md §9 rule 5). Learners never type
 * diacritics: accept `l` for ള, `n` for ണ, plain `t`/`d` for either
 * dental or retroflex, case-insensitive, diacritic-folded, with tolerance
 * for one small typo.
 */

export function normalizeInput(raw: string): string {
  return raw
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replaceAll('th', 't')
    .replaceAll('dh', 'd')
}

/**
 * True when the learner's answer matches any accepted spelling. Beyond
 * exact equality, one substitution is tolerated on words of 3+ letters
 * (insert/delete is not — it would silently pass gemination and vowel
 * length errors, which are exactly what Unit 1 teaches).
 */
export function matchesInput(raw: string, accepted: string[]): boolean {
  const target = normalizeInput(raw)
  return accepted.some((candidate) => {
    const expected = normalizeInput(candidate)
    if (target === expected) return true
    if (target.length !== expected.length || expected.length < 3) return false
    return hammingDistance(target, expected) <= 1
  })
}

function hammingDistance(a: string, b: string): number {
  let distance = 0
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) distance++
  return distance
}
