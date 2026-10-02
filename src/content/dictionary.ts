/**
 * Sign-off dictionary (PLAN.md §13): the native-speaker review record for
 * every romanized item. `content:check` requires each item's (manglish,
 * script, meaning) triple to match an entry here, and self-checks the
 * entries against the §9 romanization rules (vowel doubling, geminate
 * correspondence, letter mappings). Adding or changing a shipped spelling
 * means updating this file — that is the review gate.
 *
 * Spelling conventions (PLAN.md §9): long a -> aa, long i -> ee
 * (Malayalee typing, as in `veedu`), long u -> uu, long e/o single;
 * `th` dental vs `t` retroflex; geminates doubled (`tt` = ട്ട, `tth` = ത്ത).
 */

export interface DictionaryEntry {
  manglish: string
  script: string
  meaning: string
}

export const DICTIONARY: readonly DictionaryEntry[] = [
  // Level 1 Unit 1 — sound items (ഴ)
  { manglish: 'zha', script: 'ഴ', meaning: 'the zh sound — tongue curled back' },
  { manglish: 'la', script: 'ല', meaning: 'the la sound — like English l' },
  // Level 1 Unit 1 — zh words
  { manglish: 'mazha', script: 'മഴ', meaning: 'rain' },
  { manglish: 'pazhaya', script: 'പഴയ', meaning: 'old' },
  { manglish: 'kazhinju', script: 'കഴിഞ്ഞ്', meaning: 'over, finished' },
  { manglish: 'vazhi', script: 'വഴി', meaning: 'way, route' },
  { manglish: 'vali', script: 'വലി', meaning: 'pain, ache' },
  // Level 1 Unit 1 — coronal sound items
  { manglish: 'tha', script: 'ത', meaning: 'the tha sound — tongue tip at the upper teeth' },
  { manglish: 'ta', script: 'ട', meaning: 'the ta sound — tongue curled back' },
  { manglish: 'ṟa', script: 'റ', meaning: 'the ṟa sound — tongue tip tapping the ridge' },
  // Level 1 Unit 1 — coronal words
  { manglish: 'patthu', script: 'പത്ത്', meaning: 'ten' },
  { manglish: 'athu', script: 'അത്', meaning: 'that one' },
  { manglish: 'peti', script: 'പേടി', meaning: 'fear' },
  { manglish: 'katti', script: 'കട്ടി', meaning: 'thick' },
  { manglish: 'pettannu', script: 'പെട്ടെന്ന്', meaning: 'suddenly' },
  // Level 1 Unit 1 — gemination sound items
  { manglish: 'ka', script: 'ക', meaning: 'the ka sound — a quick single k' },
  { manglish: 'kka', script: 'ക്ക', meaning: 'the kka sound — a held k' },
  // Level 1 Unit 1 — vowel length sound items
  { manglish: 'aa', script: 'ആ', meaning: 'the long aa sound' },
  { manglish: 'a', script: 'അ', meaning: 'the short a sound' },
  { manglish: 'ee', script: 'ഈ', meaning: 'the long ee sound' },
  { manglish: 'i', script: 'ഇ', meaning: 'the short i sound' },
  { manglish: 'uu', script: 'ഊ', meaning: 'the long uu sound' },
  { manglish: 'u', script: 'ഉ', meaning: 'the short u sound' },
  // Level 1 Unit 1 — gemination / vowel length words
  { manglish: 'maanam', script: 'മാനം', meaning: 'sky' },
  { manglish: 'manam', script: 'മനം', meaning: 'mind' },
  { manglish: 'alla', script: 'അല്ല', meaning: "isn't, not" },
  { manglish: 'ala', script: 'അല', meaning: 'wave' },
  { manglish: 'cheettha', script: 'ചീത്ത', meaning: 'bad' },
]
