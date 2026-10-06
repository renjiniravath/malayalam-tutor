/**
 * Sign-off dictionary (PLAN.md §13): the native-speaker review record for
 * every romanized item. `content:check` requires each item's (manglish,
 * script, meaning) triple to match an entry here, and self-checks the
 * entries against the §9 romanization rules (vowel doubling, geminate
 * correspondence, letter mappings). Adding or changing a shipped spelling
 * means updating this file — that is the review gate.
 *
 * Spelling conventions (PLAN.md §9): long a -> aa, long i -> ee,
 * long u -> oo (Malayalee typing, as in `choodu`), long e/o single;
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
  { manglish: 'puzha', script: 'പുഴ', meaning: 'river' },
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
  { manglish: 'oo', script: 'ഊ', meaning: 'the long oo sound' },
  { manglish: 'u', script: 'ഉ', meaning: 'the short u sound' },
  // Level 1 Unit 1 — gemination / vowel length words
  { manglish: 'aadi', script: 'ആടി', meaning: 'swing' },
  { manglish: 'adi', script: 'അടി', meaning: 'hit' },
  { manglish: 'alla', script: 'അല്ല', meaning: "isn't, not" },
  { manglish: 'ila', script: 'ഇല', meaning: 'leaf' },
  { manglish: 'cheettha', script: 'ചീത്ത', meaning: 'bad' },
  // Level 1 Unit 2 — greetings & expressions
  { manglish: 'engane und', script: 'എങ്ങനെ ഉണ്ട്', meaning: 'how is it? (also how are you?)' },
  { manglish: 'kaappi engane und, kollaamo', script: 'കാപ്പി എങ്ങനെ ഉണ്ട്, കൊല്ലാമോ', meaning: 'how is the coffee, is it good?' },
  { manglish: 'sukham', script: 'സുഖം', meaning: 'fine, well' },
  { manglish: 'enna und vishesham', script: 'എന്നാ ഉണ്ട് വിശേഷം', meaning: "what's up?" },
  { manglish: 'nannayitt pokunnu', script: 'നന്നായിട്ട് പോകുന്നു', meaning: "it's going well" },
  // no script: the written form spells a long u that is short in speech (§9 rule 6)
  { manglish: 'vishesham onnum illa', meaning: 'nothing much' },
  { manglish: 'sheri', script: 'ശെരി', meaning: 'okay, fine' },
  { manglish: 'nokkaam', script: 'നോക്കാം', meaning: "let's see" },
  { manglish: 'ayyo', script: 'അയ്യോ', meaning: 'oh no!' },
  { manglish: 'pinnalla', script: 'പിന്നല്ല', meaning: 'of course, obviously' },
  { manglish: 'alle', script: 'അല്ലേ', meaning: "isn't it? (tag question)" },
  { manglish: 'appo sheri, bye', meaning: 'okay then, bye.' },
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
  { manglish: 'njan varunnund', script: 'ഞാൻ വരുന്നുണ്ട്', meaning: 'I am coming.' },
  { manglish: 'avan varunnund', script: 'അവൻ വരുന്നുണ്ട്', meaning: 'He is coming.' },
  { manglish: 'avan parayuva', script: 'അവൻ പറയുവാ', meaning: 'He is saying.' },
  { manglish: 'nammaḷ veettil pokuva', script: 'നമ്മൾ വീട്ടിൽ പോകുവാ', meaning: 'We are going home.' },
  { manglish: 'iranguva', script: 'ഇറങ്ങുവാ', meaning: 'setting off (leaving)' },
  { manglish: 'njan veettil ninn irangi', script: 'ഞാൻ വീട്ടിൽ നിന്ന് ഇറങ്ങി', meaning: 'I just left home.' },
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
  { manglish: 'addheham ingott varunnundo', script: 'അദ്ദേഹം ഇങ്ങോട്ട് വരുന്നുണ്ടോ', meaning: 'is he coming here? (respectful)' },
  // no script: the vocative spells a long a that is short in speech
  { manglish: 'chetta, pokunnundo', meaning: 'chetta, are you going?' },
  // Level 2 Unit 5 — the third-person ladder
  { manglish: 'ayaaḷ', script: 'അയാൾ', meaning: 'he (casual, distant)' },
  { manglish: 'iyaaḷ', script: 'ഇയാൾ', meaning: 'this person (neutral)' },
  { manglish: 'addheham', script: 'അദ്ദേഹം', meaning: 'he (respectful)' },
  { manglish: 'avar', script: 'അവർ', meaning: 'they; polite he or she' },
  { manglish: 'ayaaḷ ingott varunnundo', script: 'അയാൾ ഇങ്ങോട്ട് വരുന്നുണ്ടോ', meaning: 'is he coming here? (casual)' },
  { manglish: 'addheham varunnundo', script: 'അദ്ദേഹം വരുന്നുണ്ടോ', meaning: 'is he coming? (respectful)' },
  { manglish: 'avar varunnundo', script: 'അവർ വരുന്നുണ്ടോ', meaning: 'are they coming? (also polite he or she)' },
  { manglish: 'ayaaḷ pokunnundo', script: 'അയാൾ പോകുന്നുണ്ടോ', meaning: 'is he going? (casual)' },
  { manglish: 'addheham pokunnundo', script: 'അദ്ദേഹം പോകുന്നുണ്ടോ', meaning: 'is he going? (respectful)' },
  // Level 2 Unit 6 — title substitution (vocatives)
  { manglish: 'chettan', script: 'ചേട്ടൻ', meaning: 'older brother; a man older than you' },
  { manglish: 'chechi', script: 'ചേച്ചി', meaning: 'older sister; a woman older than you' },
  { manglish: 'chetta, ith kando', meaning: 'chetta, did you see this?' },
  { manglish: 'chechi, engane und', script: 'ചേച്ചി, എങ്ങനെ ഉണ്ട്', meaning: 'chechi, how are you?' },
  { manglish: 'chetta, varunnundo', meaning: 'chetta, are you coming?' },
  { manglish: 'chechi, ith kando', script: 'ചേച്ചി, ഇത് കണ്ടോ', meaning: 'chechi, did you see this?' },
  { manglish: 'chetta, sheri alle', meaning: 'chetta, right?' },
  { manglish: 'chechi, sheri alle', script: 'ചേച്ചി, ശെരി അല്ലേ', meaning: 'chechi, right?' },
  { manglish: 'chechi, pokunnundo', script: 'ചേച്ചി, പോകുന്നുണ്ടോ', meaning: 'chechi, are you going?' },
  { manglish: 'chechi, chaaya veno', script: 'ചേച്ചി, ചായ വേണോ', meaning: 'chechi, do you want tea?' },
  { manglish: 'chetta, chaaya veno', meaning: 'chetta, do you want tea?' },
  // Level 3 Unit 1 — cases: -il
  { manglish: 'veettil', script: 'വീട്ടിൽ', meaning: 'at home (veedu + il)' },
  { manglish: 'officil', meaning: 'at the office (office + il)' },
  { manglish: 'kada', script: 'കട', meaning: 'shop' },
  { manglish: 'kadayil', script: 'കടയിൽ', meaning: 'at the shop (kada + il)' },
  { manglish: 'busil', meaning: 'on the bus (bus + il)' },
  { manglish: 'njan officil pokuva', meaning: 'I am going to the office.' },
  { manglish: 'njan veettil und', script: 'ഞാൻ വീട്ടിൽ ഉണ്ട്', meaning: 'I am at home.' },
  { manglish: 'avan kadayil und', script: 'അവൻ കടയിൽ ഉണ്ട്', meaning: 'he is at the shop.' },
  { manglish: 'njan busil und', meaning: 'I am on the bus.' },
  { manglish: 'njan busil keran pokuva', meaning: 'I am going to board the bus.' },
  { manglish: 'chaaya veettil und', script: 'ചായ വീട്ടിൽ ഉണ്ട്', meaning: 'there is tea at home.' },
  { manglish: 'chechi officil und', meaning: 'chechi is at the office.' },
  // Level 3 Unit 1 — cases: -ilekk
  { manglish: 'veettilekk', script: 'വീട്ടിലേക്ക്', meaning: 'to home (veedu + ilekk)' },
  { manglish: 'hotelilekk', meaning: 'to the hotel (hotel + ilekk)' },
  { manglish: 'officilekk', meaning: 'to the office (office + ilekk)' },
  { manglish: 'kadayilekk', script: 'കടയിലേക്ക്', meaning: 'to the shop (kada + ilekk)' },
  { manglish: 'njan hotelilekk pokuva', meaning: 'I am going to the hotel.' },
  { manglish: 'njan officilekk pokuva', meaning: 'I am going to the office.' },
  { manglish: 'njan veettilekk pokuva', script: 'ഞാൻ വീട്ടിലേക്ക് പോകുവാ', meaning: 'I am going home (with -ilekk).' },
  { manglish: 'avan hotelilekk varunnundo', meaning: 'is he coming to the hotel?' },
  { manglish: 'njan kadayilekk pokuva', script: 'ഞാൻ കടയിലേക്ക് പോകുവാ', meaning: 'I am going to the shop.' },
  { manglish: 'chechi hotelilekk pokuva', meaning: 'chechi is going to the hotel.' },  { manglish: 'chetta, hotelilekk pokunnundo', meaning: 'chetta, are you going to the hotel?' },
  // Level 3 Unit 1 — cases: -kku
  { manglish: 'jolikku', script: 'ജോലിക്ക്', meaning: 'to work (joli + kku)' },
  { manglish: 'enikk', script: 'എനിക്ക്', meaning: 'to me' },
  { manglish: 'ninakk', script: 'നിനക്ക്', meaning: 'to you (casual)' },
  { manglish: 'avanu', script: 'അവന്', meaning: 'to him' },
  { manglish: 'avanu chaaya ishttamilla', script: 'അവന് ചായ ഇഷ്ടമില്ല', meaning: 'he does not like tea.' },
  { manglish: 'njan jolikku pokuva', script: 'ഞാൻ ജോലിക്ക് പോകുവാ', meaning: 'I am going to work.' },
  { manglish: 'ninakk chaaya veno', script: 'നിനക്ക് ചായ വേണോ', meaning: 'do you want tea? (casual)' },
  { manglish: 'chetta, jolikku pokunnundo', meaning: 'chetta, are you going to work?' },
  { manglish: 'chechi jolikku pokuva', script: 'ചേച്ചി ജോലിക്ക് പോകുവാ', meaning: 'chechi is going to work.' },
  { manglish: 'enikk sheri aa', script: 'എനിക്ക് ശെരി ആ', meaning: 'fine by me.' },
  { manglish: 'ninakk sheri aano', script: 'നിനക്ക് ശെരി ആണോ', meaning: 'is that fine with you? (casual)' },
  { manglish: 'enikk venam', script: 'എനിക്ക് വേണം', meaning: 'I want it.' },
  // Level 3 Unit 2 — the a/i distance paradigm
  { manglish: 'avide', script: 'അവിടെ', meaning: 'there' },
  { manglish: 'ivide', script: 'ഇവിടെ', meaning: 'here' },
  { manglish: 'ivan', script: 'ഇവൻ', meaning: 'this guy (near)' },
  { manglish: 'ivaḷ', script: 'ഇവൾ', meaning: 'this girl (near)' },
  { manglish: 'angane', script: 'അങ്ങനെ', meaning: 'like that' },
  { manglish: 'ingane', script: 'ഇങ്ങനെ', meaning: 'like this' },
  { manglish: 'appo', script: 'അപ്പോ', meaning: 'then; so' },
  { manglish: 'ippo', script: 'ഇപ്പോ', meaning: 'now' },
  { manglish: 'njangaḷ', script: 'ഞങ്ങൾ', meaning: 'we (not you)' },
  { manglish: 'ente', script: 'എന്റെ', meaning: 'my' },
  { manglish: 'ninte', script: 'നിന്റെ', meaning: 'your (casual)' },
  // Level 3 Unit 2 — question words
  { manglish: 'entha', script: 'എന്താ', meaning: 'what?' },
  { manglish: 'etha', script: 'ഏതാ', meaning: 'which?' },
  { manglish: 'engane', script: 'എങ്ങനെ', meaning: 'how?' },
  { manglish: 'enthina', script: 'എന്തിനാ', meaning: 'why?' },
  { manglish: 'eppozha', script: 'എപ്പോഴാ', meaning: 'when?' },
  { manglish: 'evide', script: 'എവിടെ', meaning: 'where?' },
  { manglish: 'evide aa', script: 'എവിടെ ആ', meaning: 'where is it?' },
  { manglish: 'etha bus', meaning: 'which bus?' },
]
