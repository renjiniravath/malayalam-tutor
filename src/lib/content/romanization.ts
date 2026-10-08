/**
 * §9 romanization cross-checks against the script that the other passes in
 * scripts/content-check.ts do not cover.
 *
 * Gemination (rule 2) for the consonant classes the coronal pass ignores:
 * ക ഗ ജ പ ബ മ യ വ സ. A geminate in the script must be written as a doubled
 * consonant — ക്ക -> kk, പ്പ -> pp, മ്മ -> mm. The coronal classes (ട്ട, ത്ത,
 * ന്ന, ല്ല, …) are checked there; the digraph classes spell one consonant with
 * two letters either way (§9: ങ്ങ -> ng, ഞ്ഞ -> nj, so ച്ച -> ch, ശ്ശ -> sh,
 * ഫ്ഫ -> ph too) and therefore cannot be told apart by doubling.
 *
 * Sentence drill spelling: the accepted orders, the word-by-word parts and
 * the word-bank chips are learner-visible too, so they must spell the words
 * the validated sentence spells.
 */

import { foldInput } from '@/lib/lesson/input';
import type { SentenceSpec } from '@/content/types';

/** Script geminate -> the doubled spelling §9 requires. */
const GEMINATE_CLASSES: Record<string, string> = {
  ക: 'kk',
  ഗ: 'gg',
  ജ: 'jj',
  പ: 'pp',
  ബ: 'bb',
  മ: 'mm',
  യ: 'yy',
  വ: 'vv',
  സ: 'ss',
};

/** The letters those classes are written with; every other letter belongs to another pass. */
const CLASS_LETTERS = new Set(['k', 'g', 'j', 'p', 'b', 'm', 'y', 'v', 's']);

/**
 * Romanized English loans keep their English spelling (§9), the way hotel
 * keeps its single t: ബസ്സിൽ is written busil and ഓക്കേ is written okay. The
 * allowance is token level, in the style of CORONAL_ALLOWED in
 * scripts/content-check.ts: the loan spelling is accepted only beside the
 * script it is written for, so a corrupted script cannot ride along on it.
 */
const LOAN_SCRIPTS: Record<string, string[]> = {
  okay: ['ഓക്കേ'],
  busil: ['ബസ്സിൽ'],
  busilekk: ['ബസ്സിലേക്ക്'],
};

/** Script geminates of those classes, in order. */
function scriptDoubles(script: string): string[] {
  const out: string[] = [];
  for (let i = 0; i < script.length; i++) {
    const doubled = GEMINATE_CLASSES[script[i]];
    if (doubled && script[i + 1] === '്' && script[i + 2] === script[i]) {
      out.push(doubled);
      i += 2;
    }
  }
  return out;
}

/** Doubled consonant runs the romanization spells, in order. */
function romanDoubles(manglish: string): string[] {
  const s = manglish.toLowerCase();
  const out: string[] = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    // ch/sh/ph are one consonant spelled with two letters (§9), consumed
    // whole; a lone c, f or h is skipped along with the other passes'
    // letters (classil, officil, hotelil).
    if (s.startsWith('ch', i) || s.startsWith('sh', i) || s.startsWith('ph', i)) i += 2;
    else if (CLASS_LETTERS.has(c) && s[i + 1] === c) {
      out.push(c + c);
      i += 2;
    } else i++;
  }
  return out;
}

function mismatch(scriptWord: string, romanWord: string): string | undefined {
  const spelled = scriptDoubles(scriptWord);
  const doubled = romanDoubles(romanWord);
  if (spelled.join('+') === doubled.join('+')) return;
  return `gemination mismatch in '${romanWord}': script has ${spelled.join('+') || 'none'} but the romanization doubles ${doubled.join('+') || 'none'} (§9 rule 2)`;
}

/**
 * Gemination problems between an item's script and its romanization, one
 * message per offending word. Word by word: the two are transliterations of
 * each other, and the English-loan allowance applies to the loan word itself,
 * not to the whole item.
 */
export function geminationProblems(script: string, manglish: string): string[] {
  const problems: string[] = [];
  const collect = (scriptWord: string, romanWord: string): void => {
    const found = mismatch(scriptWord, romanWord);
    if (found) problems.push(found);
  };

  const scriptWords = script.trim().split(/\s+/);
  const romanWords = manglish.trim().split(/\s+/);
  if (scriptWords.length !== romanWords.length) {
    // The script and the manglish run word for word; if the split ever
    // drifts, compare the whole item rather than pairing the wrong words.
    collect(script, manglish);
    return problems;
  }
  scriptWords.forEach((scriptWord, i) => {
    const word = romanWords[i].replace(/[^a-z]/g, '');
    const loanScripts = LOAN_SCRIPTS[word];
    if (loanScripts) {
      if (!loanScripts.includes(scriptWord)) {
        problems.push(
          `English loan '${romanWords[i]}' is written for ${loanScripts.join(' or ')}, found '${scriptWord}' (§9)`,
        );
      }
      return;
    }
    collect(scriptWord, romanWords[i]);
  });
  return problems;
}

/** The spelling letters of a token, lowercased — punctuation is not part of the spelling. */
const spelling = (word: string): string => word.replace(/[^A-Za-zḷṇṟ]/g, '').toLowerCase();

/**
 * Spelling consistency inside an item's sentence drill. The validated sentence
 * is the item's spelling authority, and every learner-visible romanization of
 * it — the accepted orders, the word-by-word parts, and the word-bank chips —
 * must spell the same words the sentence spells. The bank is judged by the
 * drill's own folding (foldInput) and its assembly check: every word of an
 * accepted order needs a chip to build it, and a chip spelled differently from
 * the sentence word it folds to would show the item's word two ways.
 */
export function sentenceSpellingFindings(manglish: string, sentence: SentenceSpec): string[] {
  const findings: string[] = [];
  const words = manglish.trim().split(/\s+/).map(spelling);
  const spelled = new Set(words);
  const sentenceByFold = new Map(words.map((word) => [foldInput(word), word]));

  const checkToken = (label: string, token: string): void => {
    const seen = spelling(token);
    if (spelled.has(seen)) return;
    const expected = sentenceByFold.get(foldInput(token));
    findings.push(
      expected
        ? `${label} '${token}' where the sentence spells '${expected}' (§9)`
        : `${label} '${token}' is not a word of the sentence '${manglish}' (§9)`,
    );
  };

  const orders = sentence.orders.map((order) => order.trim().split(/\s+/));
  for (const order of orders) {
    for (const word of order) checkToken('order word', word);
  }
  for (const part of sentence.parts) checkToken('part word', part.word);

  // The first accepted order is already pinned to the bank and the parts,
  // exactly, by checkSentence in scripts/content-check.ts. The alternate
  // orders must be buildable from the bank as well, and the drill folds
  // input (checkAssembly), so a fold-equal chip counts.
  const chips = new Set(sentence.bank.map((chip) => foldInput(chip)));
  orders.slice(1).forEach((order) => {
    for (const word of order) {
      if (!chips.has(foldInput(word))) {
        findings.push(
          `word bank has no chip for '${word}' of the accepted order '${order.join(' ')}' (§9)`,
        );
      }
    }
  });
  for (const chip of sentence.bank) {
    const expected = sentenceByFold.get(foldInput(chip));
    if (expected && spelling(chip) !== expected) {
      findings.push(`bank chip '${chip}' is a variant spelling of the sentence word '${expected}' (§9)`);
    }
  }
  return findings;
}
