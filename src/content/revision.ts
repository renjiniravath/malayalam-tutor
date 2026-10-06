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
 */
export const CONTENT_REVISION = 9
