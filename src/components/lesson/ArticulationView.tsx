/**
 * Articulation coaching for sound-teaching items (PLAN.md §4): a brief
 * text cue shown with the reveal, plus the sound-focus audio. Visual
 * tongue diagrams were tried and dropped.
 */

import type { Articulation } from '@/content/types'

export function ArticulationView({ articulation }: { articulation: Articulation }) {
  return (
    <p className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-600 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-400">
      {articulation.cue}
    </p>
  )
}
