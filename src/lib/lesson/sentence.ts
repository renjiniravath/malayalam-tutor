import { foldInput, matchesAcceptedInput } from './input';
import type { SentenceSpec } from '@/content/types';

/**
 * Sentence checking for the builder drill: a token assembly (or a typed
 * line) matches when its folded spelling equals one of the accepted
 * orders. Typed input goes through the same forgiving layer as every
 * other typing drill (diacritic-folded, case-insensitive, one small
 * typo tolerated).
 */

export function assemble(tokens: string[]): string {
  return tokens.join(' ').trim();
}

export function checkAssembly(tokens: string[], spec: SentenceSpec): boolean {
  const folded = foldInput(assemble(tokens));
  return spec.orders.some((order) => foldInput(order) === folded);
}

export function checkTypedSentence(raw: string, spec: SentenceSpec): boolean {
  return matchesAcceptedInput(raw, spec.orders);
}

/** The words of the first accepted order, for breakdown display. */
export function sentenceWords(spec: SentenceSpec): string[] {
  return spec.orders[0].split(' ');
}
