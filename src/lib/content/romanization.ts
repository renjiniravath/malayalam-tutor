/**
 * §9 rule 2 (gemination) for the consonant classes the coronal pass in
 * scripts/content-check.ts does not cover: ക ഗ ജ പ ബ മ യ വ സ. A geminate in the
 * script must be written as a doubled consonant — ക്ക -> kk, പ്പ -> pp,
 * മ്മ -> mm. The coronal classes (ട്ട, ത്ത, ന്ന, ല്ല, …) are checked there;
 * the digraph classes spell one consonant with two letters either way (§9:
 * ങ്ങ -> ng, ഞ്ഞ -> nj, so ച്ച -> ch, ശ്ശ -> sh, ഫ്ഫ -> ph too) and therefore
 * cannot be told apart by doubling.
 */

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
 * English loans keep their English spelling (§9), the way hotel keeps its
 * single t: ബസ്സിൽ is written busil and ഓക്കേ is written okay.
 */
const ENGLISH_LOANS = new Set(['okay', 'busil', 'busilekk']);

/**
 * neeyyo and neeyyum carry the native-speaker's doubled y (PLAN §5) while the
 * script spells a plain യ. The spelling is sanctioned, so a mismatch here is
 * a script question for native-speaker review, not a content error.
 */
const SANCTIONED_SPELLINGS = new Set(['neeyyo', 'neeyyum']);

export interface GeminationFindings {
  /** §9 rule 2 violations — content:check errors. */
  problems: string[];
  /** Script questions for native-speaker review — content:check warnings. */
  review: string[];
}

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
 * Gemination findings between an item's script and its romanization, word by
 * word: the two are transliterations of each other, and the English-loan
 * exemption applies to the loan word itself, not to the whole item.
 */
export function geminationFindings(script: string, manglish: string): GeminationFindings {
  const problems: string[] = [];
  const review: string[] = [];
  const collect = (scriptWord: string, romanWord: string, sanctioned: boolean): void => {
    const found = mismatch(scriptWord, romanWord);
    if (found) (sanctioned ? review : problems).push(found);
  };

  const scriptWords = script.trim().split(/\s+/);
  const romanWords = manglish.trim().split(/\s+/);
  if (scriptWords.length !== romanWords.length) {
    // The script and the manglish run word for word; if the split ever
    // drifts, compare the whole item rather than pairing the wrong words.
    collect(script, manglish, false);
    return { problems, review };
  }
  scriptWords.forEach((scriptWord, i) => {
    const word = romanWords[i].replace(/[^a-z]/g, '');
    if (ENGLISH_LOANS.has(word)) return;
    collect(scriptWord, romanWords[i], SANCTIONED_SPELLINGS.has(word));
  });
  return { problems, review };
}
