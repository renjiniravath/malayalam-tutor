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
 */
export const CONTENT_REVISION = 4
