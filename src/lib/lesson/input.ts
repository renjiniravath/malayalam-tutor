/**
 * Forgiving ASCII input layer (PLAN.md §9 rule 5, CLAUDE.md).
 * Learners never type diacritics: input is lowercased, diacritic-folded,
 * and compared against the accepted variant list. One small typo
 * (substitute, insert, delete, or swap) is tolerated on words of four
 * letters or more.
 */

export function foldInput(raw: string): string {
  return raw
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ');
}

export function matchesAcceptedInput(raw: string, acceptedInputs: string[]): boolean {
  const folded = foldInput(raw);
  const candidates = acceptedInputs.map((accepted) => foldInput(accepted));
  if (candidates.includes(folded)) return true;
  if (folded.length < 4) return false;
  return candidates.some((accepted) => damerauLevenshtein(folded, accepted) <= 1);
}

/** Damerau-Levenshtein: distance 1 also covers transposed neighbors ("mazah"). */
function damerauLevenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const d = Array.from({ length: m + 1 }, () => new Array<number>(n + 1).fill(0));
  for (let i = 0; i <= m; i++) d[i][0] = i;
  for (let j = 0; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      }
    }
  }
  return d[m][n];
}
