"use client";

import type { Articulation } from "@/content/types";

interface ArticulationCardProps {
  articulation: Articulation;
}

/**
 * Articulation display: the brief text production cue, styled as part of
 * the reveal. Coaching is text + audio only — visuals were tried and
 * dropped (PLAN.md §4), so sound items never render a diagram or image.
 */
export function ArticulationCard({ articulation }: ArticulationCardProps) {
  return (
    <aside className="mt-4 rounded-2xl border border-neutral-200 border-l-4 border-l-accent bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <p className="text-sm leading-snug text-neutral-700 dark:text-neutral-300">
        <span className="block font-semibold">How to make this sound</span>
        {articulation.cue}
      </p>
    </aside>
  );
}
