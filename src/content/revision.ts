/**
 * Content revision marker (PLAN.md §11). Progress records store the
 * revision they were last reconciled at; bump CONTENT_REVISION whenever
 * content changes so reconciliation can retire or re-key cards.
 *
 * History:
 *   1 — Unit 1 shipped (revision tracking starts here)
 *   2 — Units 2-3 added (greetings & expressions, pronouns)
 *   3 — articulation entries became brief text cues (visual diagrams dropped)
 *   4 — Level 2 added (First Sentences, four lessons)
 *   5 — native-speaker corrections to Level 2 (continuous glosses, -um
 *       habitual, dative venam, ketto, niyyum, sandhi, varunnundo)
 *   6 — second-person -uva pragmatics: bare declaratives read as
 *       commands, so second-person items use the -unnundo question form
 *   7 — vocative fix (chetta is address-only) and provisional minimal
 *       pair replacements; pro-drop pronoun item dropped
 *   8 — final native-speaker rulings: njan (not njaan); aadi/adi and
 *       puḷḷi/puli minimal pairs; chetta vocative takes a comma
 *       (chetta, pokunnundo?); nokkum habitual added
 *   9 — "I am fine" is njan okay aanu (njan sheri means "I correct");
 *       no bare first-person declaratives from parayuva/cheyyuva
 *  10 — habitual -um glosses use "sometimes"; geminate pair is
 *       ila/illa; function words get sentence contexts with full
 *       glosses (athe aanu, athu sheri ketto)
 *  11 — athe aanu and athu sheri, ketto removed (they do not make
 *       sense); chaaya taught as a word; "njan every day chaaya
 *       kudikkum" uses an English slot for the untaught time phrase
 *  12 — long u is written oo (not uu): checker, dictionary, and the
 *       u/oo sound items updated; no kudi/koodi pair exists to remove
 *  13 — Level 2 lessons 5-6 (third-person ladder, title substitution)
 *       and Level 3 lessons 1-3 (cases: -il, -ilekk, -kku with English
 *       word assimilation) added
 *  14 — rulings on politeness/cases: ingott question forms for
 *       ayaaḷ/addheham; avar varunnundo question form; iyaaḷ copula
 *       items removed; shop words become kada (kadayil, kadayilott)
 *  15 — kadayilott unified to kadayilekk (same -ilekk pattern as
 *       veettilekk, hotelilekk, officilekk)
 *  16 — mega-round: greetings reworked (kaappi engane und kollaamo,
 *       enna und vishesham, nannaayitt pokunnu, appo sheri bye);
 *       puzha added and vali dropped; varunund sentence forms;
 *       iranguva and njan veettil ninn irangi; chettan/chechi titles
 *       with the vocative -n drop; dative experiencer avanu; njan
 *       busil keran pokuva; new l3u2l1 (a/i distance) and l3u2l2
 *       (question words)
 *  17 — spelling rulings: nannayitt (single a) sanctioned; ishttamilla
 *       (double t) sanctioned; question words plain (entha, etha,
 *       enthina, eppozha)
 *  18 — deep-pass audit: koḷḷaamo corrected (not kollaamo, "can I
 *       kill"); avan oru school teacher aanu; chechi declarative
 *       subjects re-personed to avan; njan angott varuva and nee
 *       chaaya kudikkumello, alle added; kettiyo acceptedInput
 *       removed; checker gains banned-word traps and the bare
 *       second-person -uva ban; side notes completed
 *  19 — native-speaker rulings 2026-10-07: near/far moved out of Level 3
 *       into Level 2 Unit 5, before the third-person ladder (lesson id
 *       l3u2l1 kept, units 5-6 renumbered to 6-7); nammaḷ removed from
 *       the near/far notes (it lives in the pronoun lesson); "sandhi"
 *       struck from learner copy; ni accepted for nee; athe answers
 *       aano; ninakk chaaya veno is the offer form; iranguva/irangi
 *       explained; eppo = eppozha with the e-/i-/a- pattern; hotel means
 *       eatery
 *  20 — ithil etha ishttappette? taught as an item in the question-words
 *       lesson (replacing the confusing athu etha phrasing); the
 *       jolikku pokuva glosses stay literal, so the two builds match
 *  21 — spelling rulings: neeyo / neeyum take a plain y (display layer;
 *       the doubled neeyyo/neeyyum and niyyo/niyyum stay as accepted
 *       inputs); the nonsensical enikk chaaya veno counter-example is
 *       struck in favour of the same-dative answer enikk chaaya venda;
 *       ishttappette (double p) confirmed
 *  22 — Level 3 lessons 4-6, the remaining cases: -nte (of), -um
 *       (also/and), -il ninn (from, spelled like the ninn already
 *       taught) and -aayi (became), with English-word assimilation and
 *       frame drills; njanum joins the sanctioned short-a spellings;
 *       the level gains a can-do for possession and origin
 *  23 — native-speaker rulings 2026-10-07: cleft questions get their own
 *       lesson (l3u2l3: nee eth schoolil aanu padichath?, chechi,
 *       raavile enth aanu kazhichath?, ee tv evide ninn aanu
 *       medichath?); the from-lesson teaches the cleft question and its
 *       answer as a pair (avan evide ninn aanu varunnath? / avan officil
 *       ninn aanu varunnath) and ninte veettil ninn aarokke varunnund?;
 *       -aayi is for something that just happened, so avan oru teacher
 *       aayi gives way to ee bucket full aayi and sheri aayi means "it's
 *       fixed; it's okay now"; njan veettil ninn iranguva (ippo is
 *       redundant beside the continuous); the retired ids are recorded
 *       in REMOVED_ITEM_IDS; the checker accepts the word-final ത്
 *       spelling (varunnath, kazhichath) the native speaker writes
 *  24 — native-speaker ruling 2026-10-08: the -a on entha / etha /
 *       eppozha is a squeezed-in "is" (the fused copula), taught in plain
 *       English on enth and eth in the cleft lesson and on entha and etha
 *       in the question-words lesson; the old eppozha/eppo "same word"
 *       note is corrected to the with-is and bare forms; etha bus gives
 *       way to eth busa (the -a rides on the predicate), retiring the
 *       etha-bus id
 *  25 — house rule 2026-10-08: no linguistic jargon in learner copy. The
 *       "dative" notes become the to-me / to-you / to-him form (l2u2l2,
 *       l3u1l3, l3u1l5) and the "copula" note becomes plain English
 *       (l2u2l2). "particle", "vocative", "coronals"/"gemination" and the
 *       "a (the article)" gloss are previously approved copy: flagged for
 *       a ruling, not rewritten
 *  26 — native-speaker ruling 2026-10-08: the flagged jargon converts too.
 *       "particle" becomes the -o tag and plain -um wording (level 2
 *       can-do, niyyo, niyyum, kaappiyum, with the dictionary mirror);
 *       "vocative" becomes the calling form (l2u4l4, l2u7l6, l3u1l2,
 *       l3u1l3); "coronals"/"gemination" become the tongue-tip sounds and
 *       held sounds in the level 1 can-do; "a (the article)" becomes
 *       "a (one)"; "case suffix" becomes "an -il word"; "e- is the
 *       question marker" becomes "e- asks the question". "present tense"
 *       stays — ordinary school English
 *  27 — Level 4 (Making Sentences) opens with four lessons: the everyday
 *       past (poyi, vannu, kandu ... as whole chunks), the future and the
 *       "let's" form (pokum, varum, pokaam ... with the comes-as-a-rule
 *       sense of -um), the who-when-what frame (with English filling an
 *       untaught slot, as in Level 2), and the time words inn / naaḷe /
 *       innale; the level ships four units, one lesson each
 *  28 — native-speaker rulings 2026-10-11 on Level 4: today is innu (inn
 *       accepted, never displayed); the -aam ending has two jobs (pokaam
 *       proposes, cheyyaam and nokkaam also answer as a committed yes);
 *       a suggestion takes the to-us form (nammaḷkku veettil pokaam); a
 *       past or future sentence carries its time or destination, and the
 *       replaced sentences are new items (retired ids in REMOVED_ITEM_IDS)
 *  29 — native-speaker ruling 2026-10-12: nammaḷkku is the display for
 *       both datives of "we" (namukku is the same word and stays accepted
 *       as an input; the Level 1 pronoun item's display and script become
 *       nammaḷkku / നമ്മൾക്ക്, and the suggestion examples use it); the
 *       no-script note on the mixed sentences gives the real reason — the
 *       sentence is part English, and the script rules cannot spell those
 *       words the way they sound (the English words themselves do have
 *       settled spellings)
 *  30 — the same no-script reason sweeps Levels 1-3: the 31 notes that
 *       said an English word "has no settled Malayalam spelling" now say
 *       the item is part English and the script rules cannot spell that
 *       part the way it sounds (word items say "the word", the rest "the
 *       sentence"); every one of those loans does have a settled spelling,
 *       so none kept the old phrasing
 *  31 — number agreement on two Level 4 notes: avan friday raathri varum
 *       and avan ella weekendsum veettil varum each mix in one English
 *       word, so their no-script notes say "that word ... it sounds"
 *  32 — native-speaker ruling 2026-10-12: English words take the full
 *       -kku. The two cinema sentences display cinemakku (njan innale oru
 *       cinemakku poyi, nammaḷkku innu oru cinemakku pokaam) with the
 *       fast-speech cinemakk accepted at item and builder level — the same
 *       split as jolikku / jolikk. Ids unchanged (display-only)
 *  33 — Level 4 completed with four more lessons (one unit each): saying no
 *       (illa, alla, venda in whole sentences, built on the copula lesson),
 *       asking in sentences (ethra, aaru and eppo join the Level 3 question
 *       words, in questions the learner would actually ask, with the
 *       aanu ... ath frame reused where it is the everyday form), and the
 *       two assembling lessons — statements, then questions, every item with
 *       a second natural order — where the learner builds from a word bank
 *       and types. The checker sanctions aara (ആരാ): the same short final a
 *       as entha and etha, so it is exempt from the long-ാ count. No item
 *       was retired this round
 *  34 — native-speaker rulings 2026-10-12 on Level 4 lessons 5-8: a lesson
 *       sentence must be one that could actually happen in a conversation,
 *       so ithu chaaya alla, ithu ente veedu alla and kada evide aanu give
 *       way to ithu ente bag alla, athu ente laptop alla and ninte veedu
 *       evide aanu (retired ids in REMOVED_ITEM_IDS); the price question
 *       takes the ending (ithinu ethra aanu — display-only, id unchanged);
 *       past negation is the -illa family (vannilla, kandilla, etthiyilla,
 *       and avan innale officil vannilla) taught in the saying-no lesson
 *  35 — native-speaker corrections 2026-10-12, the last of the round:
 *       avan ente chettan alla is struck — a listener hears someone
 *       disowning his brother, so it fails the probable-sentence test —
 *       and gives way to ithu ente phone alla, the sibling of the bag and
 *       laptop sentences. The how question takes the same aanu ... unnath
 *       shape as evide, so ithu engane cheyyuva becomes ithu engane aanu
 *       cheyyunnath, with the clipped ith accepted per the display/input
 *       split. Both replaced ids retired
 */
export const CONTENT_REVISION = 35

/**
 * Item ids retired from content — the record of what was replaced by a
 * different sentence. Reconciliation sees a removal through the ids
 * themselves (reconcileProgress archives cards whose item is gone); this
 * list keeps the decision explicit, and content:check rejects an id that
 * comes back. Item ids are immutable, so a retired id is never reused: a
 * replacement sentence is always a new item.
 */
export const REMOVED_ITEM_IDS: readonly string[] = [
  // l3u1l6 — replaced by the native speaker's own sentences (2026-10-07):
  // the cleft question/answer pair, the who-all question, the leaving
  // sentence, and the just-happened -aayi model.
  'avan-evide-ninn-varunnund', // -> avan evide ninn aanu varunnath (+ its answer)
  'njan-officil-ninn-varunnund', // -> nee evide ninn aanu varunnath / njan officil ninn aanu varunnath
  'njan-veettil-ninn-varuva', // -> ninte veettil ninn aarokke varunnund
  'njan-ippo-veettil-ninn-pokuva', // -> njan veettil ninn iranguva
  'avan-oru-teacher-aayi', // -> ee bucket full aayi
  // l3u2l2 — the native speaker ruled eth busa ("which bus is it?") the
  // better form, with the -a riding on the predicate:
  'etha-bus', // -> eth busa
  // l4u1l1-l4u4l1 — the Level 4 sign-off round (2026-10-11) replaced these
  // with the native speaker's own sentences: each past or future sentence
  // carries its time or destination, and a suggestion takes the to-us form.
  'njan-veettil-poyi', // -> njan innale oru cinemakku poyi
  'avan-ippo-vannu', // -> njan lunch kazhichu
  'njan-veettil-pokum', // -> njan naaḷe raavile veettil pokum
  'avan-varum', // -> avan friday raathri varum
  'nammal-veettil-pokaam', // -> nammaḷkku veettil pokaam
  'avan-every-day-veettil-varum', // -> avan ella weekendsum veettil varum
  'njan-yesterday-veettil-poyi', // -> njan yesterday avane kandu
  'nammal-appo-pokaam', // -> enna nammaḷkku pokaam
  'avan-veettil-pokum', // -> avan naaḷe veettil pokum
  'njan-innale-veettil-poyi', // -> njan innale veettil etthi
  'nammal-inn-veettil-pokaam', // -> nammaḷkku innu oru cinemakku pokaam
  'njan-innale-chaaya-kudichu', // -> njan innale oru cinema kandu
  // l4u5l1, l4u8l1 — the Level 4 second-half sign-off (2026-10-12): the
  // probable-sentence rule replaced sentences a listener could not place.
  'ithu-chaaya-alla', // -> ithu ente bag alla
  'ithu-ente-veedu-alla', // -> athu ente laptop alla
  'kada-evide-aanu', // -> ninte veedu evide aanu
  // l4u5l1, l4u6l1 — the same round's corrections (2026-10-12):
  'avan-ente-chettan-alla', // -> ithu ente phone alla
  'ithu-engane-cheyyuva', // -> ithu engane aanu cheyyunnath
]
