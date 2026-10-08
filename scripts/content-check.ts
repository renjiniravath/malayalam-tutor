/**
 * Content linter — npm run content:check.
 *
 * Enforces the authoring rules from CLAUDE.md and PLAN.md:
 *  - romanization per §9 (lowercase only, no ii/uu, doubling rules,
 *    dental/retroflex/alveolar place and consonant gemination cross-checked
 *    against the script field)
 *  - script sanity (NFC, Malayalam block only, ZWJ/ZWNJ placement)
 *  - audio manifest presence and clip-key integrity
 *  - image presence + license allowlist
 *  - articulation text cue for sound-teaching items (text + audio only,
 *    visual diagrams tried and dropped)
 *  - duplicate spellings within a lesson
 *  - tag referential integrity
 *  - minimal-pair sanity
 *
 * The vowel-length part of §9 (long a/i/u always doubled) cannot be derived
 * from spelling alone — colloquial spellings shorten final vowels (pokuva,
 * venda) by convention — so it is verified in native-speaker review; the
 * deterministic subset (no ii/uu, only aa/ee/oo doubles, no caps) is here.
 *
 * While the audio manifest is 'pending', duration/overlap checks are skipped
 * (audio generation is out of scope for M1 content authoring).
 */

import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  levels,
  contentRevision,
  audioManifest,
  imageManifest,
  AUDIO_TIERS,
  TAG_REGISTRY,
} from '../src/content/index';
import {
  hasBareFirstPersonSayDo,
  hasBareSecondPersonUva,
  hasBareThirdPersonUva,
  hasChettaSubject,
} from '../src/lib/content/pragmatics';
import { geminationFindings, sentenceSpellingFindings } from '../src/lib/content/romanization';
import type { Item, Lesson, MinimalPair, MinimalPairSegment } from '../src/content/types';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = join(SCRIPT_DIR, '..', 'src', 'content');

interface Problem {
  where: string;
  message: string;
}
const errors: Problem[] = [];
const warnings: Problem[] = [];

function fail(where: string, message: string): void {
  errors.push({ where, message });
}
function warn(where: string, message: string): void {
  warnings.push({ where, message });
}

// ---------------------------------------------------------------- structure

function checkStructure(): void {
  if (!Number.isInteger(contentRevision.revision) || contentRevision.revision < 1) {
    fail('content', `contentRevision.revision must be a positive integer, got ${contentRevision.revision}`);
  }
  for (const id of contentRevision.removedItemIds) {
    if (!/^[a-z0-9][a-z0-9-]*$/.test(id)) {
      fail('content', `removedItemIds entry '${id}' must match the item-id pattern`);
    }
  }
  if (new Set(contentRevision.removedItemIds).size !== contentRevision.removedItemIds.length) {
    fail('content', 'removedItemIds has duplicates');
  }
  if (levels.length === 0) fail('content', 'no levels authored');

  const seen = new Map<string, string>();
  const register = (id: string, where: string, pattern: RegExp, label: string): void => {
    if (!pattern.test(id)) fail(where, `${label} id '${id}' must match ${pattern}`);
    const prev = seen.get(id);
    if (prev) fail(where, `duplicate id '${id}' (already used at ${prev})`);
    seen.set(id, where);
  };

  for (const level of levels) {
    register(level.id, level.id, /^l\d+$/, 'level');
    for (const text of [level.name, ...level.canDo]) {
      if (hasEmoji(text)) fail(level.id, `no emoji in UI copy: '${text}'`);
    }
    for (const lesson of level.lessons) {
      register(lesson.id, lesson.id, /^l\d+u\d+l\d+$/, 'lesson');
      if (lesson.levelId !== level.id) {
        fail(lesson.id, `lesson levelId '${lesson.levelId}' does not match its level '${level.id}'`);
      }
      if (!/^l\d+u\d+$/.test(lesson.unitId)) fail(lesson.id, `unitId '${lesson.unitId}' must look like l1u1`);
      if (lesson.items.length < 3) fail(lesson.id, `lesson has ${lesson.items.length} items — need at least 3`);
      if (lesson.items.length > 8) warn(lesson.id, `lesson has ${lesson.items.length} items — target is 3-8`);
      if (!Number.isInteger(lesson.reviewSlots) || lesson.reviewSlots < 0) {
        fail(lesson.id, 'reviewSlots must be a non-negative integer');
      }
      if (hasEmoji(lesson.title)) fail(lesson.id, `no emoji in lesson title: '${lesson.title}'`);
      for (const item of lesson.items) {
        register(item.id, `${lesson.id}/${item.id}`, /^[a-z0-9][a-z0-9-]*$/, 'item');
        checkItem(lesson, item);
      }
      for (const pair of lesson.minimalPairs) {
        register(pair.id, `${lesson.id}/${pair.id}`, /^[a-z0-9][a-z0-9-]*$/, 'pair');
        checkPair(lesson, pair);
      }
      checkDuplicates(lesson);
      checkDrills(lesson);
    }
  }
}

// ------------------------------------------------------------------- items

const EMOJI_RE = /\p{Extended_Pictographic}/u;
function hasEmoji(text: string): boolean {
  return EMOJI_RE.test(text);
}

/**
 * Words banned by native-speaker rulings — taught forms removed from the
 * course. Exact matches on whole manglish tokens; the shop/store English
 * family is banned by substring (the native word is kada).
 */
const BANNED_TOKENS = new Set(['azhaku', 'aunty', 'kudikkuka', 'kudi', 'shoppil', 'shoppilekk']);

function checkBannedWords(where: string, item: Item): void {
  if (BANNED_TOKENS.has(item.manglish)) {
    fail(where, `'${item.manglish}' is banned by native-speaker ruling and must not appear in content`);
  }
  if (/shop|store/.test(item.manglish)) {
    fail(where, `'${item.manglish}' uses a shop/store English word — the native word is kada`);
  }
}

function checkItem(lesson: Lesson, item: Item): void {
  const where = `${lesson.id}/${item.id}`;
  if (!item.manglish.trim()) fail(where, 'manglish is empty');
  if (!item.meaning.trim()) fail(where, 'meaning is empty');
  for (const [field, text] of itemTextFields(item)) {
    if (hasEmoji(text)) fail(where, `no emoji in ${field}: '${text}'`);
  }

  // §9 rule 4: capitalization is never a phonemic signal (mobile auto-capitalize)
  if (/[A-Z]/.test(item.manglish)) fail(where, `manglish must be lowercase: '${item.manglish}'`);
  // §9 charset: romanization letters, the display diacritics, space, punctuation
  const bad = item.manglish.match(/[^a-z ḷṇṟ'.,?!-]/gu);
  if (bad) fail(where, `manglish has characters outside the §9 spec: ${[...new Set(bad)].join(' ')}`);
  // Native-speaker ruling: manglish tokens never carry '?' — the question
  // is carried by word shape (varunnundo) and the English meaning.
  if (item.manglish.includes('?')) {
    fail(where, `manglish must not carry '?' — the question form is in the word itself: '${item.manglish}'`);
  }
  checkBannedWords(where, item);
  // §9 rule 1: doubled vowel runs may only be aa/ee/oo — long i is
  // written ee and long u is written oo (native-speaker rulings),
  // long e/o are always single
  for (const m of item.manglish.matchAll(/(a{2,}|e{2,}|i{2,}|o{2,}|u{2,})/g)) {
    if (m[0] !== 'aa' && m[0] !== 'ee' && m[0] !== 'oo') {
      fail(where, `'${m[0]}' is not a §9 spelling — long a/i/u are written aa/ee/oo, long e/o are written single`);
    }
  }

  if (item.script !== undefined) {
    checkScript(where, item.script);
    checkCoronals(where, item);
    const findings = geminationFindings(item.script, item.manglish);
    for (const problem of findings.problems) fail(where, problem);
    for (const note of findings.review) warn(where, note);
  }

  // The sentence drill renders the orders and the bank/parts tokens, so
  // every learner-visible romanization of the item is checked, not just
  // manglish. Orders and parts inherit the coronal check through this: their
  // words must be spelled exactly like the words of the checked sentence.
  if (item.sentence !== undefined) {
    for (const problem of sentenceSpellingFindings(item.manglish, item.sentence)) {
      fail(where, problem);
    }
  }

  for (const tag of item.tags) {
    if (!(TAG_REGISTRY as readonly string[]).includes(tag)) {
      fail(where, `unknown tag '${tag}' — add it to TAG_REGISTRY in src/content/types.ts`);
    }
  }
  if (new Set(item.tags).size !== item.tags.length) fail(where, 'duplicate tags');

  const soundTag = item.tags.find((t) => t.startsWith('sound:'));
  if (soundTag) {
    // Articulation coaching is a brief text cue plus the focus audio;
    // visual diagrams were tried and dropped (PLAN.md §4).
    if (!item.articulation) {
      fail(where, `${soundTag} items need an articulation entry with a text cue (coaching is text + audio only)`);
    } else if (!item.articulation.cue.trim()) {
      fail(where, 'articulation.cue must not be empty');
    }
  }
  if (soundTag && (!item.audio.focus || item.audio.focus.length === 0)) {
    fail(where, `${soundTag} items need sound-focus clips (audio.focus)`);
  }

  // Clip keys follow <sprite>_<itemId>_<tier> so audio:gen can derive them.
  for (const tier of AUDIO_TIERS) {
    const expected = `${lesson.spriteId}_${item.id}_${tier}`;
    if (item.audio[tier] !== expected) {
      fail(where, `audio.${tier} must be '${expected}', got '${item.audio[tier]}'`);
    }
  }
  for (const focusKey of item.audio.focus ?? []) {
    if (focusKey !== `${lesson.spriteId}_${item.id}_focus`) {
      fail(where, `focus clip key must be '${lesson.spriteId}_${item.id}_focus', got '${focusKey}'`);
    }
  }

  if (item.acceptedInputs) {
    // Punctuation is not phonemic: the comparison drops it, matching the
    // runtime input layer ('appo sheri, bye' accepts 'appo sheri bye').
    const folded = foldAscii(item.manglish).replace(/[,.'?]/g, '');
    if (!item.acceptedInputs.some((input) => input.replace(/[,.'?]/g, '') === folded)) {
      fail(where, `acceptedInputs must include '${folded}' (the diacritic-folded spelling of '${item.manglish}')`);
    }
    for (const input of item.acceptedInputs) {
      if (/[^a-z ?'.-]/.test(input)) fail(where, `acceptedInputs must be lowercase ASCII: '${input}'`);
    }
    if (new Set(item.acceptedInputs).size !== item.acceptedInputs.length) fail(where, 'duplicate acceptedInputs');
  }

  if (item.notes && item.notes.some((n) => !n.trim())) fail(where, 'notes must be non-empty strings');

  if (item.kind === 'sentence') {
    checkSentence(where, item);
  }

  if (item.image) {
    checkImage(where, item.image);
  } else if (item.kind === 'word' && (item.pos === 'noun' || item.pos === 'verb')) {
    fail(where, 'concrete nouns and verbs need an image (PLAN.md §11)');
  }
}

function itemTextFields(item: Item): Array<[string, string]> {
  const fields: Array<[string, string]> = [
    ['manglish', item.manglish],
    ['meaning', item.meaning],
  ];
  if (item.script) fields.push(['script', item.script]);
  for (const note of item.notes ?? []) fields.push(['note', note]);
  if (item.articulation) fields.push(['articulation.cue', item.articulation.cue]);
  for (const part of item.sentence?.parts ?? []) fields.push(['sentence part', part.meaning]);
  return fields;
}

/**
 * Sentence items carry the builder drill data: a word bank, at least
 * one accepted order, and a word-by-word breakdown covering the words
 * of the first order (the tap-to-breakdown interaction).
 */
function checkSentence(where: string, item: Item): void {
  const spec = item.sentence;
  if (!spec) {
    fail(where, "kind 'sentence' items need a sentence spec (bank, orders, parts)");
    return;
  }
  if (spec.bank.length < 2) fail(where, `sentence.bank needs at least 2 tokens, got ${spec.bank.length}`);
  if (spec.orders.length < 1) fail(where, 'sentence.orders needs at least one accepted order');
  if (new Set(spec.bank).size !== spec.bank.length) fail(where, 'sentence.bank has duplicate tokens');
  if (new Set(spec.orders).size !== spec.orders.length) fail(where, 'sentence.orders has duplicates');
  const words = spec.orders[0].split(' ');
  if (!words.every((word) => spec.bank.includes(word))) {
    fail(where, 'every word of the first accepted order must appear in the bank');
  }
  if (!words.every((word) => spec.parts.some((part) => part.word === word))) {
    fail(where, 'sentence.parts must cover every word of the first accepted order');
  }
  // Pragmatics (PLAN.md §5): a bare second-person -uva declarative reads
  // like a command; the second person must use the question form.
  if (hasBareSecondPersonUva(spec.orders)) {
    fail(
      where,
      'a bare second-person -uva declarative reads like a command; use the question form (nee varunnundo) or re-person the sentence',
    );
  }
  // Pragmatics (PLAN.md §5): 'chetta' is a vocative address, never a
  // sentence subject; the addressed question writes it with a comma.
  if (hasChettaSubject(spec.orders)) {
    fail(where, "'chetta' is a vocative, never a sentence subject; write the addressed question ('chetta, ith kando?') or drop it");
  }
  // Pragmatics (PLAN.md §5): a bare first-person declarative from a
  // say/do-type verb is not something said in conversation.
  if (hasBareFirstPersonSayDo(spec.orders)) {
    fail(where, "'njan parayuva' is not something said in conversation; give the verb a complement or drop the item");
  }
  // Pragmatics (PLAN.md §5): a bare third-person -uva declarative is
  // not natural — varunnund is the statement form.
  if (hasBareThirdPersonUva(spec.orders)) {
    fail(where, "a bare third-person -uva declarative ('avan varuva') is not natural; use varunnund or give the verb a complement");
  }
  // Lexical bans from the native-speaker rulings: these words are not
  // taught and must not come back.
  for (const token of spec.orders.flatMap((order) => order.split(' '))) {
    if (BANNED_TOKENS.has(token)) {
      fail(where, `'${token}' is banned by native-speaker ruling and must not appear in content`);
    }
  }
}

// ------------------------------------------------------------------- script

const MALAYALAM = /[ഀ-ൿ]/u;

function checkScript(where: string, script: string): void {
  if (script !== script.normalize('NFC')) fail(where, 'script must be NFC-normalized');
  const chars = [...script];
  if (chars.length === 0) fail(where, 'script is empty — provide it or omit the field');
  chars.forEach((ch, i) => {
    if (MALAYALAM.test(ch)) return;
    if (ch === ' ') {
      const prev = chars[i - 1];
      const next = chars[i + 1];
      if (!prev || !next || !MALAYALAM.test(prev) || !MALAYALAM.test(next)) {
        fail(where, 'script spaces must sit between Malayalam words');
      }
      return;
    }
    if (ch === '‍' || ch === '‌') {
      const prev = chars[i - 1];
      const next = chars[i + 1];
      if (!prev || !next || !MALAYALAM.test(prev) || !MALAYALAM.test(next)) {
        fail(where, 'ZWJ/ZWNJ must sit between two Malayalam letters');
      }
      return;
    }
    fail(where, `script has a non-Malayalam character (U+${ch.codePointAt(0)!.toString(16)})`);
  });
}

// -------------------------------------------------------------- romanization

/**
 * Script coronal consonants -> their romanized form. A consonant followed by
 * virama and the same consonant (a geminate) doubles the form — except the
 * digraphs, where §9 covers the geminate with the same spelling (ങ്ങ -> ng,
 * ഞ്ഞ -> nj, ത്ത -> tth, ദ്ധ -> ddh). Chillu letters (ൻ, ൽ, ൾ, ൺ, ർ) are the
 * word-final forms of ന/ല/ള/ണ/ര.
 */
const SCRIPT_CORONALS = new Map<string, string>([
  ['ഴ', 'zh'],
  ['ഞ', 'nj'], ['ങ', 'ng'],
  ['ള', 'ḷ'], ['ണ', 'ṇ'], ['ന', 'n'], ['ല', 'l'], ['ര', 'r'],
  ['ത', 'th'], ['ദ', 'dh'], ['ട', 't'], ['ഡ', 'd'], ['റ', 'ṟ'],
  ['ൻ', 'n'], ['ൽ', 'l'], ['ൾ', 'ḷ'], ['ൺ', 'ṇ'], ['ർ', 'r'],
]);

function scriptCoronals(script: string): string[] {
  const out: string[] = [];
  for (let i = 0; i < script.length; i++) {
    // The ഷ്ട cluster spells shtt (native-speaker ruling: ishttamilla) —
    // the shta sequence doubles the t in romanization.
    if (script[i] === 'ഷ' && script[i + 1] === '്' && script[i + 2] === 'ട') {
      out.push('tt');
      i += 2;
      continue;
    }
    const base = SCRIPT_CORONALS.get(script[i]);
    if (!base) continue;
    if (script[i + 1] === '്' && script[i + 2] === script[i]) {
      // digraphs geminate as tth/ddh, ng/nj keep their spelling, the rest simply double (ട്ട -> tt)
      const doubled =
        base === 'th' ? 'tth' : base === 'dh' ? 'ddh' : base === 'ng' || base === 'nj' ? base : base + base;
      out.push(doubled);
      i += 2;
    } else {
      out.push(base);
    }
  }
  return out;
}

/**
 * Romanization coronal tokens, longest-first. 'nth' scans as n + th (enthaa),
 * 'nt' as n + ṟ (nte), 'nj' and 'ng' as the ഞ and ങ digraphs, and 'nk' as the
 * ങ before ക (thaankal) — all n-runs are single coronal positions.
 */
function romanCoronals(manglish: string): string[] {
  // Scan word by word: stripping spaces would merge cross-word runs
  // ('njan jolikku' would scan as nj + nj).
  const s = manglish.toLowerCase().split(/[^a-zḷṇṟ]+/u).join('.');
  const out: string[] = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (c === 'z' && s.startsWith('zh', i)) { out.push('zh'); i += 2; }
    else if (c === 't') {
      if (s.startsWith('tth', i)) { out.push('tth'); i += 3; }
      else if (s.startsWith('th', i)) { out.push('th'); i += 2; }
      else if (s.startsWith('tt', i)) { out.push('tt'); i += 2; }
      else { out.push('t'); i++; }
    } else if (c === 'd') {
      if (s.startsWith('ddh', i)) { out.push('ddh'); i += 3; }
      else if (s.startsWith('dh', i)) { out.push('dh'); i += 2; }
      else if (s.startsWith('dd', i)) { out.push('dd'); i += 2; }
      else { out.push('d'); i++; }
    } else if (c === 'n') {
      if (s.startsWith('nth', i)) { out.push('n', 'th'); i += 3; }
      else if (s.startsWith('nt', i)) { out.push('n', 't'); i += 2; }
      else if (s.startsWith('nj', i)) { out.push('nj'); i += 2; }
      else if (s.startsWith('nn', i)) { out.push('nn'); i += 2; }
      else if (s.startsWith('ng', i)) { out.push('ng'); i += 2; }
      else if (s.startsWith('nk', i)) { out.push('ng'); i += 2; }
      else { out.push('n'); i++; }
    } else if (c === 'ḷ') {
      if (s.startsWith('ḷḷ', i)) { out.push('ḷḷ'); i += 2; } else { out.push('ḷ'); i++; }
    } else if (c === 'ṇ') {
      if (s.startsWith('ṇṇ', i)) { out.push('ṇṇ'); i += 2; } else { out.push('ṇ'); i++; }
    } else if (c === 'ṟ') {
      if (s.startsWith('ṟṟ', i)) { out.push('ṟṟ'); i += 2; } else { out.push('ṟ'); i++; }
    } else if (c === 'l') {
      if (s.startsWith('ll', i)) { out.push('ll'); i += 2; } else { out.push('l'); i++; }
    } else if (c === 'r') {
      if (s.startsWith('rr', i)) { out.push('rr'); i += 2; } else { out.push('r'); i++; }
    } else {
      i++;
    }
  }
  return out;
}

/**
 * Colloquial allowances, documented per PLAN.md §9:
 *  - ട -> d when voiced colloquially (veedu); ട്ട -> d in the ണ്ട് collapse (und)
 *  - ണ -> n in that same collapse (und, venda)
 *  - റ -> t in ന്റെ (ente), r in colloquial words (choru)
 *  - റ്റ -> tt in colloquial typings (kaattu, pattum)
 *  - ട്ട -> t in English loans, which keep their English single t
 *    (native-speaker ruling: hotelil, hotelilekk)
 */
const CORONAL_ALLOWED: Record<string, string[]> = {
  zh: ['zh'],
  nj: ['nj'], ng: ['ng'],
  'ḷ': ['ḷ'], 'ḷḷ': ['ḷḷ'],
  'ṇ': ['ṇ', 'n'], 'ṇṇ': ['ṇṇ'],
  n: ['n'], nn: ['nn'],
  l: ['l'], ll: ['ll'],
  r: ['r'], rr: ['rr'],
  th: ['th'], tth: ['tth'],
  dh: ['dh'], ddh: ['ddh'],
  t: ['t', 'd'], tt: ['tt', 'd', 't'],
  d: ['d'], dd: ['dd'],
  'ṟ': ['ṟ', 'r', 't'], 'ṟṟ': ['ṟṟ', 'rr', 'tt'],
};

function checkCoronals(where: string, item: Item): void {
  const scriptTokens = scriptCoronals(item.script!);
  const romanTokens = romanCoronals(item.manglish);
  if (scriptTokens.length !== romanTokens.length) {
    fail(
      where,
      `coronal mismatch: script has ${scriptTokens.join('+') || 'none'} but romanization has ${romanTokens.join('+') || 'none'}`,
    );
    return;
  }
  scriptTokens.forEach((token, i) => {
    if (!CORONAL_ALLOWED[token].includes(romanTokens[i])) {
      fail(
        where,
        `coronal ${i + 1}: script ${token} must be written ${CORONAL_ALLOWED[token].join(' or ')} (§9 rule 2), found '${romanTokens[i]}'`,
      );
    }
  });
}

// ------------------------------------------------------------------- images

const ALLOWED_LICENSES = ['CC0', 'PD', 'CC-BY', 'CC-BY-SA'];

function checkImage(where: string, image: string): void {
  const record = imageManifest.find((r) => r.file === image);
  if (!record) {
    fail(where, `image '${image}' has no license record in src/content/images/manifest.ts`);
    return;
  }
  if (!ALLOWED_LICENSES.includes(record.license)) {
    fail(where, `license '${record.license}' is not on the allowlist (CC0/PD/CC-BY, CC-BY-SA as-is; ND excluded)`);
  }
  if (record.license === 'CC-BY-SA' && record.edited) {
    fail(where, 'CC-BY-SA images may not be edited — display as-is only');
  }
  if (!record.source.trim() || !record.author.trim()) {
    fail(where, `license record for '${image}' needs source and author`);
  }
  if (!existsSync(join(CONTENT_DIR, 'images', record.file))) {
    fail(where, `image file missing: images/${record.file}`);
  }
}

function checkImageRecords(): void {
  const referenced = new Set(
    levels.flatMap((level) =>
      level.lessons.flatMap((lesson) =>
        lesson.items.map((item) => item.image).filter((image): image is string => !!image),
      ),
    ),
  );
  for (const record of imageManifest) {
    if (!referenced.has(record.file)) warn('images', `license record for '${record.file}' is not referenced by any item`);
  }
}

// ------------------------------------------------------------- minimal pairs

const SEGMENT_TAG: Record<MinimalPairSegment, string> = {
  zh: 'sound:zh',
  coronal: 'sound:coronal',
  geminate: 'sound:geminate',
  vowelLength: 'sound:vowel-length',
};

function checkPair(lesson: Lesson, pair: MinimalPair): void {
  const where = `${lesson.id}/${pair.id}`;
  if (pair.aItemId === pair.bItemId) {
    fail(where, 'pair members must be different items');
    return;
  }
  const members: Item[] = [];
  for (const ref of [pair.aItemId, pair.bItemId]) {
    const item = lesson.items.find((i) => i.id === ref);
    if (!item) fail(where, `item '${ref}' is not in this lesson`);
    else members.push(item);
  }
  for (const [clip, itemId] of [[pair.aClip, pair.aItemId], [pair.bClip, pair.bItemId]] as const) {
    const ok = AUDIO_TIERS.some((tier) => clip === `${lesson.spriteId}_${itemId}_${tier}`);
    if (!ok) fail(where, `clip '${clip}' must be '${lesson.spriteId}_${itemId}_<tier>'`);
  }
  if (members.length === 2) {
    const tag = SEGMENT_TAG[pair.segment];
    if (!members.some((m) => m.tags.includes(tag as (typeof TAG_REGISTRY)[number]))) {
      fail(where, `segment '${pair.segment}' needs at least one member tagged '${tag}'`);
    }
    const a = foldAscii(members[0].manglish);
    const b = foldAscii(members[1].manglish);
    const distance = levenshtein(a, b);
    if (distance > 2) warn(where, `'${a}' and '${b}' differ by ${distance} edits — is this really a minimal pair?`);
  }
}

// ------------------------------------------------------------------- drills

function checkDrills(lesson: Lesson): void {
  const meanings = lesson.items.map((i) => i.meaning);
  for (const drill of lesson.drills) {
    if (drill.kind === 'multipleChoice') {
      const target = lesson.items.find((i) => i.id === drill.itemId);
      if (!target) {
        fail(lesson.id, `drill references missing item '${drill.itemId}'`);
        continue;
      }
      if (drill.distractors.length < 2 || drill.distractors.length > 4) {
        fail(lesson.id, `${drill.itemId}: multipleChoice drills need 2-4 distractors, got ${drill.distractors.length}`);
      }
      if (new Set(drill.distractors).size !== drill.distractors.length) {
        fail(lesson.id, `${drill.itemId}: duplicate distractors`);
      }
      for (const distractor of drill.distractors) {
        if (distractor === target.meaning) fail(lesson.id, `${drill.itemId}: distractor duplicates the answer`);
        else if (!meanings.includes(distractor)) {
          fail(lesson.id, `${drill.itemId}: distractor '${distractor}' is not a meaning of any item in this lesson`);
        }
      }
    } else if (drill.kind === 'minimalPair') {
      if (!lesson.minimalPairs.some((p) => p.id === drill.pairId)) {
        fail(lesson.id, `drill references missing pair '${drill.pairId}'`);
      }
    } else if (drill.kind === 'sentenceBuilder') {
      const target = lesson.items.find((i) => i.id === drill.itemId);
      if (!target) {
        fail(lesson.id, `drill references missing item '${drill.itemId}'`);
      } else if (target.kind !== 'sentence' || !target.sentence) {
        fail(lesson.id, `sentenceBuilder drill '${drill.itemId}' needs a sentence item with a sentence spec`);
      }
    }
  }
}

// --------------------------------------------------------------- duplicates

function checkDuplicates(lesson: Lesson): void {
  const seen = new Map<string, string>();
  for (const item of lesson.items) {
    const folded = foldAscii(item.manglish).toLowerCase();
    const prev = seen.get(folded);
    if (prev) {
      fail(lesson.id, `duplicate spelling '${item.manglish}' (items '${prev}' and '${item.id}') — spellings must be unique within a lesson`);
    } else {
      seen.set(folded, item.id);
    }
  }
}

// -------------------------------------------------------------------- audio

function lessonKeys(lesson: Lesson): string[] {
  const keys: string[] = [];
  for (const item of lesson.items) {
    for (const tier of AUDIO_TIERS) keys.push(`${lesson.spriteId}_${item.id}_${tier}`);
    keys.push(...(item.audio.focus ?? []));
  }
  return keys;
}

function checkAudio(): void {
  const where = 'audio';
  if (audioManifest.status !== 'pending' && audioManifest.status !== 'generated') {
    fail(where, `unknown manifest status '${audioManifest.status}'`);
  }
  const lessonSpriteIds = new Set(levels.flatMap((level) => level.lessons.map((lesson) => lesson.spriteId)));
  const manifestIds = Object.keys(audioManifest.sprites);
  for (const id of lessonSpriteIds) if (!manifestIds.includes(id)) fail(where, `lesson sprite '${id}' is missing from the manifest`);
  for (const id of manifestIds) if (!lessonSpriteIds.has(id)) fail(where, `manifest sprite '${id}' has no lesson`);

  for (const level of levels) {
    for (const lesson of level.lessons) {
      const sprite = audioManifest.sprites[lesson.spriteId];
      if (!sprite) continue; // already reported above
      if (!/^audio\/[\w-]+\.mp3$/.test(sprite.file)) {
        fail(lesson.id, `sprite file must look like 'audio/<name>.mp3', got '${sprite.file}'`);
      }
      const keys = lessonKeys(lesson);
      if (new Set(keys).size !== keys.length) fail(lesson.id, 'duplicate clip keys in lesson');

      if (audioManifest.status === 'generated') {
        if (!sprite.offsets) {
          fail(lesson.id, `generated manifest needs an offsets table for sprite '${lesson.spriteId}'`);
          continue;
        }
        const offsets = sprite.offsets;
        const keySet = new Set(keys);
        for (const key of Object.keys(offsets)) if (!keySet.has(key)) fail(lesson.id, `manifest lists unknown clip '${key}'`);
        for (const key of keys) if (!(key in offsets)) fail(lesson.id, `manifest is missing an offset for '${key}'`);

        const entries = Object.entries(offsets);
        for (const [key, [start, end]] of entries) {
          if (!Number.isFinite(start) || !Number.isFinite(end) || start < 0 || end <= start) {
            fail(lesson.id, `bad offset for '${key}': [${start}, ${end}]`);
          } else {
            const duration = end - start;
            if (duration < 150) fail(lesson.id, `clip '${key}' is too short (${duration} ms)`);
            if (duration > 30_000) fail(lesson.id, `clip '${key}' is too long (${duration} ms)`);
          }
        }
        const sorted = entries.slice().sort((a, b) => a[1][0] - b[1][0]);
        for (let i = 1; i < sorted.length; i++) {
          if (sorted[i][1][0] < sorted[i - 1][1][1]) {
            fail(lesson.id, `sprite offsets overlap ('${sorted[i - 1][0]}' and '${sorted[i][0]}')`);
          }
        }
        for (const item of lesson.items) {
          const duration = (tier: string): number => {
            const value = offsets[`${lesson.spriteId}_${item.id}_${tier}`];
            return value ? value[1] - value[0] : 0;
          };
          if (!(duration('slow') >= duration('medium') && duration('medium') >= duration('normal'))) {
            fail(lesson.id, `${item.id}: expected slow >= medium >= normal clip duration (slow audio is derived at 0.6x)`);
          }
        }
      } else if (sprite.offsets && Object.keys(sprite.offsets).length > 0) {
        fail(lesson.id, `pending sprite '${lesson.spriteId}' should not have offsets yet — audio:gen fills them`);
      }
    }
  }
}

// ------------------------------------------------------------------- utils

/** Diacritic-folded ASCII: ḷ -> l, ṇ -> n, ṟ -> r (the forgiving input layer). */
function foldAscii(text: string): string {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '');
}

function levenshtein(a: string, b: string): number {
  const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  const curr = new Array<number>(b.length + 1);
  for (let i = 1; i <= a.length; i++) {
    curr[0] = i;
    for (let j = 1; j <= b.length; j++) {
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    for (let j = 0; j <= b.length; j++) prev[j] = curr[j];
  }
  return prev[b.length];
}

// -------------------------------------------------------------------- main

function main(): void {
  checkStructure();
  checkAudio();
  checkImageRecords();

  if (errors.length > 0) {
    console.log('content:check FAILED');
    for (const { where, message } of errors) console.log(`  error: ${where}: ${message}`);
  }
  if (warnings.length > 0) {
    console.log('warnings:');
    for (const { where, message } of warnings) console.log(`  warning: ${where}: ${message}`);
  }
  const itemCount = levels.flatMap((level) => level.lessons.flatMap((lesson) => lesson.items)).length;
  const status = errors.length === 0 ? 'passed' : 'failed';
  console.log(
    `content:check ${status}: ${levels.length} level(s), ${itemCount} items, ${errors.length} error(s), ${warnings.length} warning(s)` +
      (audioManifest.status === 'pending' ? ' (audio pending — duration checks skipped)' : ''),
  );
  process.exit(errors.length > 0 ? 1 : 0);
}

main();
