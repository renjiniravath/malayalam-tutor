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
 */
export const CONTENT_REVISION = 18
