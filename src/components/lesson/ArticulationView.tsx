/**
 * Tongue-position diagram for sound-teaching items (PLAN.md §4):
 * SVG diagram + brief cue, never text-only.
 */

import Image from 'next/image'
import type { Articulation } from '@/content/types'
import { ARTICULATION_ASSETS } from '@/lib/articulationAssets'

export function ArticulationView({ articulation }: { articulation: Articulation }) {
  return (
    <figure className="space-y-2 rounded-xl border border-stone-200 bg-white p-3 dark:border-stone-800 dark:bg-stone-900">
      <Image
        src={ARTICULATION_ASSETS[articulation.diagram]}
        alt={`Tongue movement diagram for ${articulation.diagram}`}
        width={360}
        height={220}
        className="h-auto w-full rounded-lg"
      />
      <figcaption className="text-sm text-stone-600 dark:text-stone-400">
        {articulation.tip}
      </figcaption>
    </figure>
  )
}
