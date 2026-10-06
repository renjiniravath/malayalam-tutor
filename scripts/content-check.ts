/**
 * Content lint (PLAN.md §11). Run: npm run content:check
 *
 * Lints, per the content rules:
 * - romanization per PLAN.md §9 (grapheme alphabet, sign-off dictionary,
 *   formal-register traps, vowel doubling, geminate/conjunct correspondence)
 * - script sanity (NFC, Malayalam block, ZWJ placement)
 * - audio manifest presence (placeholder manifest until audio:gen runs)
 * - image presence + license allowlist
 * - articulation entries for sound items (brief text cue, never text-only)
 * - duplicate spellings and ids
 * - tag integrity (registry, level placement, sound-tag/feature consistency)
 * - minimal-pair sanity (referential integrity, feature presence, duration)
 *
 * Exits 1 on errors; warnings do not fail.
 */

import { existsSync, readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'
import type { Item, Lesson, MinimalPair, Segment } from '../src/content/types'
import { LEVELS } from '../src/content/levels'
import { DICTIONARY } from '../src/content/dictionary'
import { IMAGE_LICENSES, LICENSE_ALLOWLIST } from '../src/content/imageLicenses'
import { KNOWN_TAGS, SOUND_TAGS, SOUND_TAG_FEATURE, type SoundTag } from '../src/content/tags'
import { CONTENT_REVISION } from '../src/content/revision'

const ROOT = path.resolve(__dirname, '..')
const CONTENT_DIR = path.join(ROOT, 'src', 'content')
const PUBLIC_DIR = path.join(ROOT, 'public')
const REAL_MANIFEST_PATH = path.join(ROOT, 'audio-manifest.json')
const PLACEHOLDER_MANIFEST_PATH = path.join(CONTENT_DIR, 'audio-placeholder.json')

const errors: string[] = []
const warnings: string[] = []

function fail(ctx: string, msg: string): void {
  errors.push(`${ctx}: ${msg}`)
}

function warn(ctx: string, msg: string): void {
  warnings.push(`${ctx}: ${msg}`)
}

// ---------------------------------------------------------------------------
// Romanization alphabet (PLAN.md §9)
// ---------------------------------------------------------------------------

/**
 * Display-layer graphemes, longest first. `tth` = ത്ത, `tt` = ട്ട, `nth` =
 * ന്ത. Geminates and long vowels collapse into one token.
 */
const GRAPHEMES = [
  'tth', 'ddh', 'nth', 'nt',
  'zh', 'nj', 'sh', 'ph', 'ng', 'ch', 'kh', 'th', 'dh',
  'tt', 'kk', 'pp', 'mm', 'nn', 'll', 'ḷḷ',
  'aa', 'ee', 'oo',
  'ḷ', 'ṇ', 'ṟ',
]

const MANGLISH_CHARSET = /^[a-z ḷṇṟ,]+$/

/** Letters that may stand alone; c, f, q, w, x, z appear in English words. */
const SINGLE_LETTERS = /[aeioubdcfghjklmnpqrstvwxyzḷṇṟ]/

/** Tokenize a single manglish word; empty array means an invalid character. */
function tokenize(word: string): string[] {
  const tokens: string[] = []
  let i = 0
  while (i < word.length) {
    const grapheme = GRAPHEMES.find((g) => word.startsWith(g, i))
    if (grapheme) {
      tokens.push(grapheme)
      i += grapheme.length
    } else if (SINGLE_LETTERS.test(word[i])) {
      tokens.push(word[i])
      i += 1
    } else if (word[i] === ',') {
      // the vocative comma (chetta, pokunnundo) carries no script
      tokens.push(',')
      i += 1
    } else {
      return []
    }
  }
  return tokens
}

const GEMINATE_CLUSTERS = /(tth|ddh|tt|kk|pp|mm|nn|ll|ḷḷ)/
const LONG_VOWELS = /(aa|ee|oo)/
const CORONALS = /(th|t|ṟ)/

function hasSegmentFeature(manglish: string, segment: Segment): boolean {
  switch (segment) {
    case 'zh':
      return manglish.includes('zh')
    case 'coronal':
      return CORONALS.test(manglish)
    case 'geminate':
      return GEMINATE_CLUSTERS.test(manglish)
    case 'vowelLength':
      return LONG_VOWELS.test(manglish)
  }
}

/** Formal written register — the app teaches the casual form instead. */
const MANGLISH_TRAPS: Record<string, string> = {
  pokunnu: 'pokuva',
  varunnu: 'varuva',
  cheyyunnu: 'cheyyuva',
  parayunnu: 'parayuva',
  kudikkunnu: 'kudikkuva',
  kazhikkunnu: 'kazhikkuva',
  irikkunnu: 'irikkuva',
  kodukkunnu: 'kodukkuva',
  edukkunnu: 'edukkuva',
  vaangunnu: 'vaanguva',
  nokkunnu: 'nokkuva',
  kittunnu: 'kittuva',
  ippol: 'ippo',
  varoo: 'vaa',
}

/** Sanctioned words whose long ാ writes short (native-speaker rulings). */
const IRREGULAR_WORDS: Record<string, string> = {
  njan: 'ഞാൻ',
  enna: 'എന്നാ',
  nannayitt: 'നന്നായിട്ട്',
  entha: 'എന്താ',
  etha: 'ഏതാ',
  enthina: 'എന്തിനാ',
  eppozha: 'എപ്പോഴാ',
}

/**
 * Spellings retired by native-speaker rulings: any of these as a whole
 * word in a manglish field is a content error.
 */
const BANNED_WORDS = new Set([
  'njaan', 'enthaa', 'eppozhaa', 'kudikkuka', 'kudi',
  'shoppil', 'aunty', 'vali', 'azhaku', 'kettiyo',
])

/** Second-person pronouns: their items must use the -unnundo question form. */
const SECOND_PERSON = new Set(['nee', 'ningaḷ', 'thaangkaḷ'])

const SCRIPT_TRAPS: Record<string, string> = {
  പോകുന്നു: 'പോകുവാ',
  വരുന്നു: 'വരുവാ',
  ഇപ്പോൾ: 'ഇപ്പോ',
  വരൂ: 'വാ',
}

/**
 * Native-speaker-sanctioned fixed expressions that legitimately keep a
 * formal-looking form (nannayitt pokunnu, "it's going well"): the trap
 * checks are skipped for these exact phrases.
 */
const SANCTIONED_PHRASES = new Set(['nannayitt pokunnu'])
const SANCTIONED_SCRIPTS = new Set(['നന്നായിട്ട് പോകുന്നു'])

// ---------------------------------------------------------------------------
// Script checks (NFC / block / ZWJ)
// ---------------------------------------------------------------------------

/** Malayalam block, plus spaces between the words of multi-word items. */
const MALAYALAM_BLOCK = /^[ഀ-ൿ‍ ,]+$/
/** Vowel letters and signs — bare consonant letters have no vowel marks. */
const HAS_VOWEL = /[അആഇഈഉഊഎഏഒഓഔാിീുൂെേൊോൈൗം]/
const CONSONANTS = new Set('കഖഗഘങചഛജഝഞടഠഡഢണതഥദധനപഫബഭമയരലവശഷസഹളഴറ')
const VOWEL_SIGNS = new Set('ാിീുൂെേൊോൈൗ')
const EXCLUDED_AFTER = new Set(['്', ...VOWEL_SIGNS])

function checkScript(script: string, ctx: string): void {
  if (script !== script.normalize('NFC')) fail(ctx, `script is not NFC: ${script}`)
  if (!MALAYALAM_BLOCK.test(script)) fail(ctx, `script has non-Malayalam characters: ${script}`)
  if (script !== script.trim()) fail(ctx, 'script must not start or end with a space')
  if (script.startsWith('‍') || script.endsWith('‍'))
    fail(ctx, `script must not start or end with ZWJ: ${script}`)
  if (script.includes('‍‍')) fail(ctx, `script has doubled ZWJ: ${script}`)
  for (let i = 0; i < script.length; i++) {
    if (script[i] !== '‍') continue
    const prev = script[i - 1]
    const next = script[i + 1]
    if (!prev || !next || prev < 'ഀ' || prev > 'ൿ' || next < 'ഀ' || next > 'ൿ')
      fail(ctx, `ZWJ must sit between Malayalam characters: ${script}`)
  }
}

/** A consonant not followed by a vowel sign carries the inherent a. */
function hasInherentA(script: string): boolean {
  for (let i = 0; i < script.length; i++) {
    if (CONSONANTS.has(script[i]) && !EXCLUDED_AFTER.has(script[i + 1] ?? '')) return true
  }
  return false
}

// ---------------------------------------------------------------------------
// Dictionary self-check (the §9 rules, enforced on the sign-off record)
// ---------------------------------------------------------------------------

/** token -> script must contain one of these */
const TOKEN_TO_SCRIPT: Record<string, string[]> = {
  zh: ['ഴ'], nj: ['ഞ'], sh: ['ശ', 'ഷ'], ph: ['ഫ'], ng: ['ങ'], ch: ['ച'], kh: ['ഖ'],
  th: ['ത'], dh: ['ദ'], t: ['ട'], d: ['ട', 'ഡ'], ṟ: ['റ'], ddh: ['ദ്ദ'],
  r: ['ര', 'റ', 'ർ'], l: ['ല', 'ൽ'], ḷ: ['ള', 'ൾ'], n: ['ന', 'ണ', 'ൻ'], ṇ: ['ണ'], m: ['മ', 'ം'],
  p: ['പ'], b: ['ബ'], k: ['ക'], g: ['ഗ'], j: ['ജ'], s: ['സ'],
  v: ['വ'], y: ['യ'], h: ['ഹ'],
  tt: ['ട്ട'], tth: ['ത്ത'], kk: ['ക്ക'], pp: ['പ്പ'], mm: ['മ്മ'],
  nn: ['ന്ന'], ll: ['ല്ല'], ḷḷ: ['ള്ള'], nth: ['ന്ത'], nt: ['ന്റ'],
  aa: ['ആ', 'ാ'], a: ['അ', 'ആ', 'ാ', 'ം', 'െ'], ee: ['ഈ', 'ീ'],
  e: ['എ', 'ഏ', 'െ', 'േ'], i: ['ഇ', 'ഈ', 'ി', 'ീ'],
  oo: ['ഊ', 'ൂ'], u: ['ഉ', 'ഊ', 'ു', 'ൂ', '്'], o: ['ഒ', 'ഓ', 'ൊ', 'ോ'],
}

const VOWEL_TOKENS = new Set(['aa', 'a', 'ee', 'e', 'i', 'oo', 'u', 'o'])

/** script letter -> manglish must contain one of these */
const SCRIPT_TO_TOKEN: Record<string, string[]> = {
  'ഴ': ['zh'], 'ഞ': ['nj'], 'ശ': ['sh'], 'ഷ': ['sh'], 'ഫ': ['ph'], 'ങ': ['ng'], 'ച': ['ch'],
  'ത': ['th'], 'ദ': ['dh'], 'ട': ['t', 'd'], 'ഡ': ['d'], 'ര': ['r'],
  'ല': ['l'], 'ള': ['ḷ'], 'ന': ['n'], 'ണ': ['ṇ', 'n'], 'മ': ['m'], 'പ': ['p'], 'ബ': ['b'],
  'ക': ['k'], 'ഖ': ['kh'], 'ഗ': ['g'], 'ജ': ['j'], 'സ': ['s'], 'വ': ['v'], 'യ': ['y'], 'ഹ': ['h'],
  'ം': ['m'],
  'ാ': ['aa'], 'ആ': ['aa'], 'അ': ['a'], 'ി': ['i'], 'ഈ': ['ee'], 'ഇ': ['i'], 'ീ': ['ee'],
  'ു': ['u'], 'ൂ': ['oo'], 'ഉ': ['u'], 'ഊ': ['oo'],
  'എ': ['e'], 'ഏ': ['e'], 'ഒ': ['o'], 'ഓ': ['o'], 'െ': ['e'], 'േ': ['e'], 'ൊ': ['o'], 'ോ': ['o'],
}

/** geminate token <-> script conjunct */
const GEMINATE_PAIRS: Array<[string, string]> = [
  ['tt', 'ട്ട'], ['tth', 'ത്ത'], ['ddh', 'ദ്ദ'], ['kk', 'ക്ക'], ['pp', 'പ്പ'],
  ['mm', 'മ്മ'], ['nn', 'ന്ന'], ['ll', 'ല്ല'], ['ḷḷ', 'ള്ള'],
]

function countChar(s: string, c: string): number {
  return s.split(c).length - 1
}

/**
 * `script` is undefined when §9 rule 6 omits it (written form misleads);
 * only the manglish-side checks apply then.
 */
function checkDictionaryEntry(manglish: string, script?: string): void {
  const ctx = `dictionary:${manglish}`
  if (!MANGLISH_CHARSET.test(manglish))
    fail(ctx, `manglish has invalid characters (lowercase a-z, ḷ ṇ ṟ only): ${manglish}`)
  const hasVowel = script ? HAS_VOWEL.test(script) : false
  const sanctionedPhrase = SANCTIONED_PHRASES.has(manglish)
  for (const word of manglish.split(' ')) {
    const tokens = tokenize(word)
    if (tokens.length === 0) fail(ctx, `cannot tokenize: ${word}`)
    if (!sanctionedPhrase && word in MANGLISH_TRAPS)
      fail(ctx, `formal register "${word}" — use the casual "${MANGLISH_TRAPS[word]}"`)
    if (BANNED_WORDS.has(word)) fail(ctx, `banned spelling "${word}" (retired by native-speaker ruling)`)
    if (word.includes('ii')) fail(ctx, `long i is written ee (as in veedu), not ii: ${word}`)
    if (word.includes('uu')) fail(ctx, `long u is written oo (as in choodu), not uu: ${word}`)
    if (!script) continue
    for (const token of tokens) {
      const targets = TOKEN_TO_SCRIPT[token]
      if (!targets) continue
      if (VOWEL_TOKENS.has(token) && !hasVowel) continue
      // Sanctioned double-t: ishttamilla writes the ഷ്ട cluster as tt.
      if (token === 'tt' && word === 'ishttamilla' && script.includes('ഷ്ട')) continue
      if (targets.some((t) => script.includes(t))) continue
      if (token === 'a' && hasInherentA(script)) continue
      fail(ctx, `"${token}" needs ${targets.join(' or ')} in the script, got ${script}`)
    }
  }
  if (!script) return
  // Geminate correspondence is per entry, not per word: in a multi-word
  // entry the conjunct may sit in any of its words.
  const allTokens = manglish.split(' ').flatMap(tokenize)
  for (const [rom, conj] of GEMINATE_PAIRS) {
    const hasRom = allTokens.includes(rom)
    const hasConj = script.includes(conj)
    // Sanctioned double-t: ishttamilla writes the ഷ്ട cluster as tt.
    if (rom === 'tt' && manglish.split(' ').includes('ishttamilla') && script.includes('ഷ്ട')) continue
    if (hasRom !== hasConj) fail(ctx, `${rom} ${hasRom ? 'needs' : 'not matched by'} ${conj}: ${script}`)
  }
  // Colloquial -uva verbs write the suffix as -ുവാ (PLAN.md §9 rule 6,
  // pokuva -> പോകുവാ): that final ാ is spoken short, so it is exempt
  // from long-vowel correspondence and script coverage.
  const UVA = 'ുവാ'
  const uvaWords = manglish.split(' ').filter((w) => w.endsWith('uva')).length
  const uvaCount = Math.min(uvaWords, countChar(script, UVA))
  const uvaALetters = new Set<number>()
  if (uvaCount > 0) {
    let at = script.indexOf(UVA)
    let found = 0
    while (at !== -1 && found < uvaCount) {
      uvaALetters.add(at + 2)
      found++
      at = script.indexOf(UVA, at + 1)
    }
  }
  // Native-speaker rulings: words whose long ാ writes short (njan,
  // enna, nannayitt, and the plain question words).
  const irregularWords = manglish.split(' ').filter((w) => w in IRREGULAR_WORDS)
  const irregularALetters = new Set<number>()
  for (const w of irregularWords) {
    const at = script.indexOf(IRREGULAR_WORDS[w])
    if (at === -1) fail(ctx, `"${w}" needs ${IRREGULAR_WORDS[w]} in the script, got ${script}`)
    irregularALetters.add(at + IRREGULAR_WORDS[w].indexOf('ാ'))
  }
  // vowel doubling: aa/ee/oo must match the script's long vowel signs
  const scriptAa = countChar(script, 'ാ') + countChar(script, 'ആ') - uvaCount - irregularWords.length
  const scriptEe = countChar(script, 'ീ') + countChar(script, 'ഈ')
  const scriptOo = countChar(script, 'ൂ') + countChar(script, 'ഊ')
  if (countChar(manglish, 'aa') !== scriptAa)
    fail(ctx, `aa count ${countChar(manglish, 'aa')} != script long-a count ${scriptAa}: ${script}`)
  if (countChar(manglish, 'ee') !== scriptEe)
    fail(ctx, `ee count ${countChar(manglish, 'ee')} != script long-i count ${scriptEe}: ${script}`)
  if (countChar(manglish, 'oo') !== scriptOo)
    fail(ctx, `oo count ${countChar(manglish, 'oo')} != script long-u count ${scriptOo}: ${script}`)
  // script letters must all be covered by the manglish
  for (let i = 0; i < script.length; i++) {
    const ch = script[i]
    if (ch === '്') continue
    if (uvaALetters.has(i) || irregularALetters.has(i)) continue
    const options = SCRIPT_TO_TOKEN[ch]
    if (!options) continue
    if (!options.some((t) => manglish.includes(t)))
      fail(ctx, `script ${ch} needs ${options.join(' or ')} in the manglish: ${manglish}`)
  }
  // A final virama on a bare consonant is pronounced with a final u
  // (kazhinju); on a consonant cluster like ണ്ട് it is not (und).
  const finalConjunct = /്[ഀ-ൿ]്$/.test(script)
  if (script.endsWith('്') && !manglish.endsWith('u') && !finalConjunct)
    fail(ctx, `word-final virama is spelled with a final u: ${manglish}`)
  if (manglish.endsWith('u') && !script.endsWith('്') && !/[ഉഊു]/.test(script))
    fail(ctx, `final u needs a final virama, ു, ഉ, or ഊ in the script: ${script}`)
  // Formal-register traps match whole words: the colloquial continuous
  // question വരുന്നുണ്ടോ legitimately contains the substring വരുന്നു.
  const scriptWords = script.split(' ')
  if (!SANCTIONED_SCRIPTS.has(script)) {
    for (const [trap, casual] of Object.entries(SCRIPT_TRAPS)) {
      if (scriptWords.includes(trap)) fail(ctx, `script spells the formal form ${trap} — use ${casual}`)
    }
  }
}

// ---------------------------------------------------------------------------
// Manifest (real generated offsets, or the committed placeholder)
// ---------------------------------------------------------------------------

interface RealManifest {
  lessons: Record<string, {
    sprite: string
    durationMs?: number
    clips: Record<string, [number, number]>
  }>
}

interface PlaceholderManifest {
  placeholder: true
  lessons: Record<string, { sprite: string; clips: string[] }>
}

interface LoadedManifest {
  real: boolean
  sprites: Record<string, string>
  /** clip ref -> [startMs, endMs]; placeholder refs have null */
  clips: Map<string, [number, number] | null>
}

function loadManifest(): LoadedManifest | null {
  if (existsSync(REAL_MANIFEST_PATH)) {
    const manifest = JSON.parse(readFileSync(REAL_MANIFEST_PATH, 'utf8')) as RealManifest
    const loaded: LoadedManifest = { real: true, sprites: {}, clips: new Map() }
    for (const [lessonId, entry] of Object.entries(manifest.lessons)) {
      loaded.sprites[lessonId] = entry.sprite
      for (const [ref, offset] of Object.entries(entry.clips)) loaded.clips.set(ref, offset)
    }
    return loaded
  }
  if (existsSync(PLACEHOLDER_MANIFEST_PATH)) {
    const manifest = JSON.parse(readFileSync(PLACEHOLDER_MANIFEST_PATH, 'utf8')) as PlaceholderManifest
    if (manifest.placeholder !== true) {
      fail('audio', `${PLACEHOLDER_MANIFEST_PATH} must set "placeholder": true`)
      return null
    }
    const loaded: LoadedManifest = { real: false, sprites: {}, clips: new Map() }
    for (const [lessonId, entry] of Object.entries(manifest.lessons)) {
      loaded.sprites[lessonId] = entry.sprite
      for (const ref of entry.clips) loaded.clips.set(ref, null)
    }
    return loaded
  }
  return null
}

// ---------------------------------------------------------------------------
// Emoji scan (no emoji anywhere in code, logs, or UI copy)
// ---------------------------------------------------------------------------

const EMOJI = /\p{Extended_Pictographic}/u

function scanForEmoji(text: string, ctx: string): void {
  const match = text.match(EMOJI)
  if (match) fail(ctx, `no emoji allowed (found ${match[0]})`)
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main(): void {
  const lessons: Lesson[] = LEVELS.flatMap((l) => l.lessons)
  const items: Item[] = lessons.flatMap((l) => l.items)
  const pairs: Array<{ pair: MinimalPair; lesson: Lesson }> = lessons.flatMap((lesson) =>
    lesson.pairs.map((pair) => ({ pair, lesson }))
  )
  /** declared clip refs per item, filled in the item pass */
  const itemRefs = new Map<string, string[]>()

  // ---- level / lesson structure ------------------------------------------
  const levelIds = new Set<string>()
  for (const level of LEVELS) {
    if (!/^level\d+$/.test(level.id)) fail(level.id, 'level id must match level<number>')
    if (levelIds.has(level.id)) fail(level.id, 'duplicate level id')
    levelIds.add(level.id)
    if (!level.name) fail(level.id, 'level name is empty')
    if (level.test.passPct !== 0.8) fail(level.id, 'passPct must be 0.8 (PLAN.md §7)')
    if (level.test.itemCount !== 20 && level.test.itemCount !== 25)
      fail(level.id, 'test itemCount must be 20 or 25')
  }

  const lessonIds = new Set<string>()
  for (const lesson of lessons) {
    const ctx = `lesson:${lesson.id}`
    if (!/^l\d+u\d+l\d+$/.test(lesson.id)) fail(ctx, 'lesson id must match l<level>u<unit>l<lesson>')
    if (lessonIds.has(lesson.id)) fail(ctx, 'duplicate lesson id')
    lessonIds.add(lesson.id)
    if (!lesson.title) fail(ctx, 'title is empty')
    if (!/^unit\d+$/.test(lesson.unitId)) fail(ctx, `unitId must match unit<number>: ${lesson.unitId}`)
    if (!LEVELS.some((l) => l.id === lesson.levelId))
      fail(ctx, `levelId ${lesson.levelId} does not match any level`)
    if (!/^audio\/[\w-]+\.mp3$/.test(lesson.sprite.file))
      fail(ctx, `sprite file must be audio/<name>.mp3: ${lesson.sprite.file}`)
    if (!Number.isInteger(lesson.reviewSlots) || lesson.reviewSlots < 0)
      fail(ctx, `reviewSlots must be a non-negative integer: ${lesson.reviewSlots}`)
  }

  // ---- items ---------------------------------------------------------------
  const itemsById = new Map<string, Item>()
  const pairSegmentsByItem = new Map<string, Set<Segment>>()
  for (const { pair } of pairs) {
    for (const itemId of [pair.aItemId, pair.bItemId]) {
      const set = pairSegmentsByItem.get(itemId) ?? new Set<Segment>()
      set.add(pair.segment)
      pairSegmentsByItem.set(itemId, set)
    }
  }

  for (const lesson of lessons) {
    const levelMatch = lesson.levelId.match(/^level(\d+)$/)
    const expectedLevelTag = `level:${levelMatch?.[1] ?? '?'}`
    // Spelling duplicates confuse drill distractors, which draw on the
    // lesson they are in — so uniqueness is per lesson. The same word
    // may be taught again in a later lesson (illa in l1u1l3 and l2u1l2).
    const manglishSeen = new Map<string, string>()
    const scriptSeen = new Map<string, string>()
    for (const item of lesson.items) {
      const ctx = `lesson:${lesson.id}/${item.id}`
      if (!/^[a-z0-9-]+$/.test(item.id)) fail(ctx, `item id must be an ASCII slug: ${item.id}`)
      if (itemsById.has(item.id)) fail(ctx, 'duplicate item id')
      itemsById.set(item.id, item)
      if (!item.manglish) fail(ctx, 'manglish is empty')
      if (!item.meaning) fail(ctx, 'meaning is empty')
      if (!['sound', 'word', 'phrase', 'sentence', 'expression'].includes(item.kind))
        fail(ctx, `unknown kind: ${item.kind}`)
      if (manglishSeen.has(item.manglish))
        fail(ctx, `duplicate manglish "${item.manglish}" (also ${manglishSeen.get(item.manglish)})`)
      manglishSeen.set(item.manglish, ctx)
      if (item.script) {
        if (scriptSeen.has(item.script))
          fail(ctx, `duplicate script ${item.script} (also ${scriptSeen.get(item.script)})`)
        scriptSeen.set(item.script, ctx)
        checkScript(item.script, ctx)
      }

      // dictionary sign-off: the (manglish, script, meaning) triple must match
      const entry = DICTIONARY.find((d) => d.manglish === item.manglish)
      if (!entry) fail(ctx, `"${item.manglish}" is not in the sign-off dictionary`)
      else {
        if (entry.script !== item.script) fail(ctx, `script must match the dictionary: ${entry.script}`)
        if (entry.meaning !== item.meaning)
          fail(ctx, `meaning must match the dictionary: "${entry.meaning}"`)
      }

      // second-person pragmatics: a bare -uva declarative reads as a
      // command, so second-person sentences use the -unnundo question form.
      if (item.kind === 'sentence') {
        const words = item.manglish.split(' ')
        const hasSecondPerson = words.some((w) => SECOND_PERSON.has(w))
        const hasBareUva = words.some((w) => w.endsWith('uva'))
        const hasQuestion = words.some((w) => w.includes('unnundo'))
        if (hasSecondPerson && hasBareUva && !hasQuestion)
          fail(ctx, 'second-person sentences use the -unnundo question form, not a bare -uva declarative')
      }

      // tags
      const unknown = item.tags.filter((t) => !KNOWN_TAGS.includes(t))
      if (unknown.length) fail(ctx, `unknown tags: ${unknown.join(', ')}`)
      const levelTags = item.tags.filter((t) => /^level:\d+$/.test(t))
      if (levelTags.length !== 1) fail(ctx, `exactly one level tag required, got: ${levelTags.join(', ')}`)
      if (levelTags[0] !== expectedLevelTag)
        fail(ctx, `tag ${levelTags[0]} does not match ${lesson.levelId}`)
      const soundTags = item.tags.filter((t): t is SoundTag => SOUND_TAGS.includes(t as SoundTag))
      for (const tag of soundTags) {
        const segment = SOUND_TAG_FEATURE[tag] as Segment
        const inPair = pairSegmentsByItem.get(item.id)?.has(segment)
        if (!hasSegmentFeature(item.manglish, segment) && !inPair)
          fail(ctx, `tag ${tag} needs "${segment}" in the manglish or a ${segment} minimal pair`)
      }

      // sound items: articulation cue + focus clips + a sound tag
      if (item.kind === 'sound') {
        if (soundTags.length === 0) fail(ctx, 'sound items need a sound:* tag')
        if (!item.articulation) fail(ctx, 'sound items need an articulation entry (text cue)')
        else {
          if (!item.articulation.cue.trim()) fail(ctx, 'articulation cue is empty')
          if (item.articulation.cue.length > 200) fail(ctx, 'articulation cue is longer than 200 chars')
          scanForEmoji(item.articulation.cue, ctx)
        }
        if (!item.audio.focus || item.audio.focus.length === 0)
          fail(ctx, 'sound items need at least one focus clip')
      }

      // word-by-word breakdown (PLAN.md §5): Level 2 sentences carry it
      if (item.kind === 'sentence' && levelTags[0] === 'level:2') {
        if (!item.segments || item.segments.length === 0) {
          fail(ctx, 'level 2 sentence items need word-by-word segments')
        } else {
          if (item.segments.map((s) => s.token).join(' ') !== item.manglish)
            fail(ctx, 'segments must reconstruct the manglish exactly')
          for (const segment of item.segments) {
            if (!segment.token.trim() || !segment.gloss.trim())
              fail(ctx, 'segment token and gloss must be non-empty')
            scanForEmoji(segment.token + segment.gloss, ctx)
          }
        }
      }

      // audio refs must be <itemId>.<tier>
      const refs: string[] = []
      for (const tier of ['slow', 'medium', 'normal'] as const) {
        if (item.audio[tier] !== `${item.id}.${tier}`)
          fail(ctx, `audio.${tier} must be "${item.id}.${tier}", got "${item.audio[tier]}"`)
        refs.push(item.audio[tier])
      }
      for (const focus of item.audio.focus ?? []) {
        if (focus !== `${item.id}.focus`) fail(ctx, `focus clip must be "${item.id}.focus", got "${focus}"`)
        refs.push(focus)
      }
      itemRefs.set(item.id, refs)

      // image + license (concrete nouns/verbs; Unit 1 has none)
      if (item.image) {
        const imagePath = path.join(PUBLIC_DIR, 'images', item.image)
        if (!existsSync(imagePath)) fail(ctx, `image missing: public/images/${item.image}`)
        const license = IMAGE_LICENSES.find((l) => l.image === item.image)
        if (!license) fail(ctx, `no license record for image ${item.image}`)
        else if (!LICENSE_ALLOWLIST.includes(license.license))
          fail(ctx, `license ${license.license} is not allowlisted (${LICENSE_ALLOWLIST.join(', ')})`)
      }

      scanForEmoji(item.manglish + item.meaning + (item.script ?? '') + (item.notes ?? []).join(' ') + (item.alsoIn ?? ''), ctx)
    }
  }

  // every image license record must resolve to a real referenced image
  for (const license of IMAGE_LICENSES) {
    if (!existsSync(path.join(PUBLIC_DIR, 'images', license.image)))
      fail(`images:${license.image}`, 'license record exists but the image file is missing')
    if (!items.some((i) => i.image === license.image))
      warn(`images:${license.image}`, 'license record not referenced by any item')
  }

  // ---- minimal pairs -------------------------------------------------------
  const pairIds = new Set<string>()
  const pairSignatures = new Set<string>()
  for (const { pair, lesson } of pairs) {
    const ctx = `lesson:${lesson.id}/${pair.id}`
    if (!/^[a-z0-9-]+$/.test(pair.id)) fail(ctx, `pair id must be an ASCII slug: ${pair.id}`)
    if (pairIds.has(pair.id)) fail(ctx, 'duplicate pair id')
    pairIds.add(pair.id)
    if (pair.aItemId === pair.bItemId) fail(ctx, 'a pair needs two different items')
    const a = lesson.items.find((i) => i.id === pair.aItemId)
    const b = lesson.items.find((i) => i.id === pair.bItemId)
    if (!a) fail(ctx, `aItemId ${pair.aItemId} is not in this lesson`)
    if (!b) fail(ctx, `bItemId ${pair.bItemId} is not in this lesson`)
    if (a && b) {
      const sig = [pair.aItemId, pair.bItemId, pair.segment].sort().join('|')
      if (pairSignatures.has(sig)) fail(ctx, `duplicate pair of ${pair.aItemId}/${pair.bItemId}`)
      pairSignatures.add(sig)
      const aRefs = itemRefs.get(pair.aItemId) ?? []
      const bRefs = itemRefs.get(pair.bItemId) ?? []
      if (!aRefs.includes(pair.aClip)) fail(ctx, `aClip ${pair.aClip} is not a clip of ${pair.aItemId}`)
      if (!bRefs.includes(pair.bClip)) fail(ctx, `bClip ${pair.bClip} is not a clip of ${pair.bItemId}`)
      if (!hasSegmentFeature(a.manglish, pair.segment) && !hasSegmentFeature(b.manglish, pair.segment))
        fail(ctx, `neither item carries the ${pair.segment} feature`)
    }
  }

  // ---- drills --------------------------------------------------------------
  const pairsWithDrill = new Set<string>()
  for (const lesson of lessons) {
    const itemIds = new Set(lesson.items.map((i) => i.id))
    const lessonPairIds = new Set(lesson.pairs.map((p) => p.id))
    for (const drill of lesson.drills) {
      const ctx = `lesson:${lesson.id}/drill:${drill.kind}`
      switch (drill.kind) {
        case 'multipleChoice': {
          if (!itemIds.has(drill.itemId)) fail(ctx, `item ${drill.itemId} is not in this lesson`)
          const distractors = new Set(drill.distractors)
          if (distractors.size !== drill.distractors.length) fail(ctx, 'duplicate distractor ids')
          if (drill.distractors.length < 2 || drill.distractors.length > 4)
            fail(ctx, `expected 2-4 distractors, got ${drill.distractors.length}`)
          for (const id of drill.distractors) {
            if (!itemIds.has(id)) fail(ctx, `distractor ${id} is not in this lesson`)
            if (id === drill.itemId) fail(ctx, `distractor ${id} is the answer item`)
          }
          break
        }
        case 'minimalPair':
          if (!lessonPairIds.has(drill.pairId)) fail(ctx, `pair ${drill.pairId} is not in this lesson`)
          pairsWithDrill.add(drill.pairId)
          break
        case 'anticipation':
        case 'speakAndCompare':
        case 'typing':
        case 'imageToWord':
        case 'wordToImage':
          if (!itemIds.has(drill.itemId)) fail(ctx, `item ${drill.itemId} is not in this lesson`)
          break
        case 'sentenceBuilder': {
          if (!itemIds.has(drill.sentenceId)) fail(ctx, `sentence ${drill.sentenceId} is not in this lesson`)
          const sentence = lesson.items.find((i) => i.id === drill.sentenceId)
          if (sentence && sentence.kind !== 'sentence')
            fail(ctx, `sentenceBuilder target ${drill.sentenceId} must be a sentence item`)
          if (!drill.bank || drill.bank.length === 0) fail(ctx, 'sentenceBuilder needs a word bank')
          if (!drill.acceptedInputs || drill.acceptedInputs.length === 0)
            fail(ctx, 'sentenceBuilder needs acceptedInputs')
          const words = sentence ? sentence.manglish.split(' ') : []
          for (const token of drill.bank) {
            if (!words.includes(token)) fail(ctx, `bank token "${token}" is not a word of the sentence`)
          }
          break
        }
        case 'dialogueRolePlay':
          break // dialogue content arrives in a later milestone
      }
    }
  }
  for (const { pair } of pairs) {
    if (!pairsWithDrill.has(pair.id)) fail(`lesson:${pair.id}`, 'pair has no minimalPair drill')
  }

  // ---- audio manifest ------------------------------------------------------
  const manifest = loadManifest()
  if (!manifest) {
    fail('audio', `no audio manifest: generate audio or commit ${PLACEHOLDER_MANIFEST_PATH}`)
  } else {
    for (const lesson of lessons) {
      const sprite = manifest.sprites[lesson.id]
      if (!sprite) fail(`audio:${lesson.id}`, 'lesson missing from the audio manifest')
      else if (sprite !== lesson.sprite.file)
        fail(`audio:${lesson.id}`, `manifest sprite ${sprite} != lesson sprite ${lesson.sprite.file}`)
      for (const item of lesson.items) {
        for (const ref of itemRefs.get(item.id) ?? []) {
          if (!manifest.clips.has(ref)) fail(`audio:${lesson.id}`, `clip ${ref} missing from the manifest`)
          const offset = manifest.clips.get(ref)
          if (manifest.real && offset) {
            const [start, end] = offset
            if (!(start >= 0 && end > start))
              fail(`audio:${lesson.id}`, `clip ${ref} has invalid offsets [${start}, ${end}]`)
            const duration = end - start
            if (duration < 300 || duration > 30000)
              fail(`audio:${lesson.id}`, `clip ${ref} duration ${duration}ms is outside 300-30000ms`)
          }
        }
      }
    }
    for (const [ref] of manifest.clips) {
      const used = items.some((item) => (itemRefs.get(item.id) ?? []).includes(ref))
      if (!used) warn('audio', `manifest clip ${ref} is not declared by any item`)
    }
    if (!manifest.real) {
      warn('audio', 'placeholder manifest in use — audio not generated; duration checks pending')
    } else {
      // duration sanity for geminate/vowel-length pairs (the marked clip must
      // be audibly longer than its partner)
      for (const { pair } of pairs) {
        if (pair.segment !== 'geminate' && pair.segment !== 'vowelLength') continue
        const aItem = itemsById.get(pair.aItemId)
        const bItem = itemsById.get(pair.bItemId)
        const marked = [aItem, bItem].find((i) => i && hasSegmentFeature(i.manglish, pair.segment))
        if (!marked) continue
        const markedClip = marked.id === pair.aItemId ? pair.aClip : pair.bClip
        const otherClip = marked.id === pair.aItemId ? pair.bClip : pair.aClip
        const markedOffset = manifest.clips.get(markedClip)
        const otherOffset = manifest.clips.get(otherClip)
        if (markedOffset && otherOffset) {
          const delta = markedOffset[1] - markedOffset[0] - (otherOffset[1] - otherOffset[0])
          if (delta < 150)
            fail(`audio:${pair.id}`, `${markedClip} is only ${delta}ms longer than ${otherClip} (need 150ms)`)
        }
      }
    }
  }

  // ---- dictionary self-check ----------------------------------------------
  const dictManglish = new Set<string>()
  const dictScript = new Set<string>()
  for (const entry of DICTIONARY) {
    const ctx = `dictionary:${entry.manglish}`
    if (dictManglish.has(entry.manglish)) fail(ctx, 'duplicate dictionary manglish')
    dictManglish.add(entry.manglish)
    if (entry.script) {
      if (dictScript.has(entry.script)) fail(ctx, `duplicate dictionary script: ${entry.script}`)
      dictScript.add(entry.script)
      checkScript(entry.script, ctx)
    }
    checkDictionaryEntry(entry.manglish, entry.script)
    scanForEmoji(entry.meaning, ctx)
  }
  for (const entry of DICTIONARY) {
    if (!items.some((i) => i.manglish === entry.manglish))
      warn(`dictionary:${entry.manglish}`, 'entry not used by any item')
  }

  // ---- emoji scan across content source files ------------------------------
  const contentFiles: string[] = readdirSync(CONTENT_DIR, { recursive: true, encoding: 'utf8' })
  for (const file of contentFiles) {
    if (!file.endsWith('.ts') && !file.endsWith('.json')) continue
    scanForEmoji(readFileSync(path.join(CONTENT_DIR, file), 'utf8'), file)
  }

  // ---- summary -------------------------------------------------------------
  const clipCount = items.reduce((n, i) => n + (itemRefs.get(i.id)?.length ?? 0), 0)
  console.log(
    `content:check — ${LEVELS.length} level, ${lessons.length} lessons, ${items.length} items, ` +
      `${pairs.length} pairs, ${clipCount} audio clips, revision ${CONTENT_REVISION}`
  )
  if (errors.length) {
    console.error(`\n${errors.length} error(s):`)
    for (const e of errors) console.error(`  ${e}`)
  }
  if (warnings.length) {
    console.log(`\n${warnings.length} warning(s):`)
    for (const w of warnings) console.log(`  ${w}`)
  }
  if (errors.length === 0) {
    console.log('\ncontent:check PASSED')
    process.exit(0)
  } else {
    console.error('\ncontent:check FAILED')
    process.exit(1)
  }
}

main()
