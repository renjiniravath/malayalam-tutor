/**
 * Pragmatics rule for the -uva declarative (PLAN.md §5): a bare -uva
 * statement with a second-person subject reads like a command, not a
 * statement ("nii varuva" sounds like an order). -uva declaratives are
 * natural only in first and third person; the second person must use
 * the colloquial question form (nii varunnundo?) instead.
 *
 * The linter enforces this mechanically on sentence orders; the same
 * predicate is unit-tested here.
 */

export const SECOND_PERSON_SUBJECTS = ['nii', 'ningaḷ', 'thaankaḷ'];

/** True when an accepted order is a bare second-person -uva declarative. */
export function hasBareSecondPersonUva(orders: string[]): boolean {
  return orders.some((order) => {
    const tokens = order.split(' ').map((token) => token.replace(/[?!]/g, ''));
    const subject = tokens[0];
    if (!SECOND_PERSON_SUBJECTS.includes(subject)) return false;
    if (order.trim().endsWith('?')) return false; // the question form is the correct form
    return tokens.some((token) => token.endsWith('uva'));
  });
}

/**
 * 'chetta' is a vocative, never a sentence subject: it is used only to
 * summon or address someone in an addressed question ("chetta, ith
 * kando?"). An addressed question writes the vocative with a comma, so
 * a bare 'chetta' token in an order is the subject misuse.
 */
export function hasChettaSubject(orders: string[]): boolean {
  return orders.some((order) => order.split(' ').includes('chetta'));
}
