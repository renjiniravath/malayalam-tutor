/**
 * Pragmatics rule for the -uva declarative (PLAN.md §5): a bare -uva
 * statement with a second-person subject reads like a command, not a
 * statement ("nee varuva" sounds like an order). -uva declaratives are
 * natural only in first and third person; the second person must use
 * the colloquial question form (nee varunnundo) instead.
 *
 * The linter enforces this mechanically on sentence orders; the same
 * predicate is unit-tested here. Manglish tokens never carry '?'
 * (native-speaker ruling), so question forms are told apart by word
 * shape alone.
 */

export const SECOND_PERSON_SUBJECTS = ['nee', 'ningaḷ', 'thaankaḷ'];

/** True when an accepted order is a bare second-person -uva declarative. */
export function hasBareSecondPersonUva(orders: string[]): boolean {
  return orders.some((order) => {
    const tokens = order.split(' ');
    const subject = tokens[0];
    if (!SECOND_PERSON_SUBJECTS.includes(subject)) return false;
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
