"use client";

import type { Articulation } from "@/content/types";

interface ArticulationCardProps {
  articulation: Articulation;
  /** Inlined SVG markup, loaded server-side (content:check bans scripts/external refs) */
  svg: string;
}

/** Tongue-position diagram + brief cue — articulation is never text-only (PLAN.md §4). */
export function ArticulationCard({ articulation, svg }: ArticulationCardProps) {
  return (
    <figure className="mt-5 flex items-center gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <div
        className="h-28 w-32 shrink-0"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      <figcaption className="text-sm leading-snug text-neutral-700 dark:text-neutral-300">
        <span className="block font-semibold">How to make this sound</span>
        {articulation.tip}
      </figcaption>
    </figure>
  );
}
