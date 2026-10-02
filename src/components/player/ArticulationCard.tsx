"use client";

import type { Articulation } from "@/content/types";

interface ArticulationCardProps {
  articulation: Articulation;
  /** Inlined SVG markup, loaded server-side (content:check bans scripts/external refs) */
  svg: string;
}

/**
 * Animated tongue-position diagram + brief cue — articulation is never
 * text-only (PLAN.md §4). The SVGs carry their own CSS animation and
 * degrade to a static target pose under prefers-reduced-motion.
 */
export function ArticulationCard({ articulation, svg }: ArticulationCardProps) {
  return (
    <figure className="mt-5 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <div
        className="mx-auto aspect-[16/11] w-full max-w-[300px] [&_svg]:h-full [&_svg]:w-full"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      <figcaption className="mt-3 text-sm leading-snug text-neutral-700 dark:text-neutral-300">
        <span className="block font-semibold">How to make this sound</span>
        {articulation.tip}
      </figcaption>
    </figure>
  );
}
