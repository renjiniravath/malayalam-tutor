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
 * `th` dental vs `t` retroflex; geminates doubled (`tt` = ട്ട, `tth` = ത്ത);
 * `kh` for the aspirate ഖ (`sukham`); word-final chillus (ൻ, ൾ) keep their
 * plain letters. Entries without a script follow §9 rule 6 (omit when the
 * written form misleads).
 */

export interface DictionaryEntry {
  manglish: string
  /** Omitted when the script rule (PLAN.md §9 rule 6) says no script is shown. */
  script?: string
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
  { manglish: 'aadi', script: 'ആടി', meaning: 'swing' },
  { manglish: 'adi', script: 'അടി', meaning: 'hit' },
  { manglish: 'alla', script: 'അല്ല', meaning: "isn't, not" },
  { manglish: 'ila', script: 'ഇല', meaning: 'leaf' },
  { manglish: 'cheettha', script: 'ചീത്ത', meaning: 'bad' },
  // Level 1 Unit 2 — greetings & expressions
  { manglish: 'engane und', script: 'എങ്ങനെ ഉണ്ട്', meaning: 'how are you?' },
  { manglish: 'sukham', script: 'സുഖം', meaning: 'fine, well' },
  { manglish: 'ennaa vishesham', script: 'എന്നാ വിശേഷം', meaning: "what's new?" },
  // no script: the written form spells a long u that is short in speech (§9 rule 6)
  { manglish: 'vishesham onnum illa', meaning: 'nothing much' },
  { manglish: 'sheri', script: 'ശെരി', meaning: 'okay, fine' },
  { manglish: 'nokkaam', script: 'നോക്കാം', meaning: "let's see" },
  { manglish: 'ayyo', script: 'അയ്യോ', meaning: 'oh no!' },
  { manglish: 'pinnalla', script: 'പിന്നല്ല', meaning: 'of course, obviously' },
  { manglish: 'alle', script: 'അല്ലേ', meaning: "isn't it? (tag question)" },
  { manglish: 'poyi varatte', script: 'പോയി വരട്ടെ', meaning: 'goodbye (lit. go and come back)' },
  // Level 1 Unit 3 — pronouns
  { manglish: 'njan', script: 'ഞാൻ', meaning: 'I' },
  { manglish: 'nee', script: 'നീ', meaning: 'you (casual)' },
  { manglish: 'ningaḷ', script: 'നിങ്ങൾ', meaning: 'you (polite)' },
  { manglish: 'thaangkaḷ', script: 'താങ്കൾ', meaning: 'you (formal)' },
  { manglish: 'avan', script: 'അവൻ', meaning: 'he' },
  { manglish: 'avaḷ', script: 'അവൾ', meaning: 'she' },
  { manglish: 'nammaḷ', script: 'നമ്മൾ', meaning: 'we (you and me)' },
  { manglish: 'namukku', script: 'നമുക്ക്', meaning: "to us — also 'let's'" },
  // Level 2 Unit 1 — the -uva pattern (suffix written -ുവാ per §9 rule 6)
  { manglish: 'kudikkuva', script: 'കുടിക്കുവാ', meaning: 'drinking (right now)' },
  { manglish: 'varuva', script: 'വരുവാ', meaning: 'coming (right now)' },
  { manglish: 'pokuva', script: 'പോകുവാ', meaning: 'going (right now)' },
  { manglish: 'parayuva', script: 'പറയുവാ', meaning: 'saying (right now)' },
  { manglish: 'kazhikkuva', script: 'കഴിക്കുവാ', meaning: 'eating (right now)' },
  { manglish: 'nokkuva', script: 'നോക്കുവാ', meaning: 'looking (right now)' },
  { manglish: 'njan chaaya kudikkuva', script: 'ഞാൻ ചായ കുടിക്കുവാ', meaning: 'I am drinking tea.' },
  { manglish: 'njan pokuva', script: 'ഞാൻ പോകുവാ', meaning: 'I am going.' },
  { manglish: 'njan varuva', script: 'ഞാൻ വരുവാ', meaning: 'I am coming.' },
  { manglish: 'avan varuva', script: 'അവൻ വരുവാ', meaning: 'He is coming.' },
  { manglish: 'avan parayuva', script: 'അവൻ പറയുവാ', meaning: 'He is saying.' },
  { manglish: 'nammaḷ pokuva', script: 'നമ്മൾ പോകുവാ', meaning: 'We are going.' },
  { manglish: 'kudikkum', script: 'കുടിക്കും', meaning: 'drinks (sometimes, the habit)' },
  { manglish: 'nokkum', script: 'നോക്കും', meaning: 'looks (sometimes, the habit)' },
  { manglish: 'veedu', script: 'വീട്', meaning: 'home, house' },
  { manglish: 'chaaya', script: 'ചായ', meaning: 'tea' },
  { manglish: 'njan chaaya kudikkum', script: 'ഞാൻ ചായ കുടിക്കും', meaning: 'I drink tea sometimes.' },
  { manglish: 'njan every day chaaya kudikkum', meaning: 'I drink tea every day.' },
  { manglish: 'njan veettil pokuva', script: 'ഞാൻ വീട്ടിൽ പോകുവാ', meaning: 'I am going home.' },
  // Level 2 Unit 2 — the copula and yes/no answers
  { manglish: 'aanu', script: 'ആണ്', meaning: 'is (statement)' },
  { manglish: 'aano', script: 'ആണോ', meaning: 'is it? (question)' },
  { manglish: 'athe', script: 'അതെ', meaning: 'yes (answering a question)' },
  { manglish: 'illa', script: 'ഇല്ല', meaning: 'no, there is not' },
  { manglish: 'sheri aanu', script: 'ശെരി ആണ്', meaning: "it's fine, it's right" },
  { manglish: 'njan ready aa', meaning: 'I am ready.' },
  { manglish: 'njan okay aanu', meaning: 'I am fine.' },
  { manglish: 'athu sheri aa', script: 'അത് ശെരി ആ', meaning: "that's correct" },
  // no script: the English word has no settled Malayalam spelling
  { manglish: 'avan teacher aa', meaning: 'He is a teacher.' },
  { manglish: 'ready aano', meaning: 'ready? (question form)' },
  { manglish: 'chaaya illa', script: 'ചായ ഇല്ല', meaning: "there's no tea" },
  { manglish: 'venam', script: 'വേണം', meaning: 'want, need' },
  { manglish: 'enikk chaaya venam', script: 'എനിക്ക് ചായ വേണം', meaning: 'I want tea' },
  { manglish: 'avan varunnundo', script: 'അവൻ വരുന്നുണ്ടോ', meaning: 'is he coming?' },
  // Level 2 Unit 3 — tag questions and the -o particle
  { manglish: 'ketto', script: 'കേട്ടോ', meaning: 'did you hear? (tag)' },
  // no script: the written form spells a long a that is short in speech
  { manglish: 'kettayirunno', meaning: 'did you hear? (about the past)' },
  { manglish: 'neeyyo', script: 'നീയോ', meaning: 'you? (question particle)' },
  { manglish: 'neeyyum', script: 'നീയും', meaning: 'you too?' },
  { manglish: 'sheriyalle', script: 'ശെരിയല്ലേ', meaning: 'right? (isn’t it right)' },
  { manglish: 'chaaya alle', script: 'ചായ അല്ലേ', meaning: "it's tea, isn't it?" },
  { manglish: 'pokuva alle', script: 'പോകുവാ അല്ലേ', meaning: 'going, right?' },
  { manglish: 'athu alle', script: 'അത് അല്ലേ', meaning: 'that, right?' },
  { manglish: 'ippo alle', script: 'ഇപ്പോ അല്ലേ', meaning: 'now, right?' },
  { manglish: 'athu sheri alle', script: 'അത് ശെരി അല്ലേ', meaning: "that's correct, right?" },
  { manglish: 'neeyyum varunnundo', script: 'നീയും വരുന്നുണ്ടോ', meaning: 'are you coming too?' },
  // Level 2 Unit 4 — politeness in context (second-person items use the
  // -unnundo question form: a bare -uva declarative reads as a command)
  // no script: the written form spells a long a that is short in speech
  { manglish: 'chetta', meaning: 'older brother; used to call or address a man' },
  { manglish: 'nee varunnundo', script: 'നീ വരുന്നുണ്ടോ', meaning: 'are you coming? (casual)' },
  { manglish: 'ningaḷ varunnundo', script: 'നിങ്ങൾ വരുന്നുണ്ടോ', meaning: 'are you coming? (polite)' },
  { manglish: 'thaangkaḷ varunnundo', script: 'താങ്കൾ വരുന്നുണ്ടോ', meaning: 'are you coming? (formal)' },
  { manglish: 'thaangkaḷ pokunnundo', script: 'താങ്കൾ പോകുന്നുണ്ടോ', meaning: 'are you going? (formal)' },
  { manglish: 'addheham varuva', script: 'അദ്ദേഹം വരുവാ', meaning: 'he (respectful) is coming' },
  { manglish: 'avar varuva', script: 'അവർ വരുവാ', meaning: 'they are coming; polite for he or she' },
  // no script: the vocative spells a long a that is short in speech
  { manglish: 'chetta, pokunnundo', meaning: 'chetta, are you going?' },
]
