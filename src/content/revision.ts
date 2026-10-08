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
 */
export const CONTENT_REVISION = 23

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
]
