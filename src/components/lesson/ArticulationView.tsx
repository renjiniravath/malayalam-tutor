/**
 * Articulation coaching for sound-teaching items (PLAN.md §4): a brief
 * text cue shown with the reveal, plus the sound-focus audio. Visual
 * tongue diagrams were tried and dropped. The label scopes the cue to
 * the sound itself, never to the example word.
 */

import type { Articulation } from '@/content/types'

export function ArticulationView({
  articulation,
  sound,
}: {
  articulation: Articulation
  /** The sound being taught, e.g. "zha" — used for the cue label. */
  sound: string
}) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
      <p className="text-xs font-semibold tracking-wide text-amber-700 dark:text-amber-400">
        How to make the {sound} sound
      </p>
      <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">{articulation.cue}</p>
    </div>
  )
}
