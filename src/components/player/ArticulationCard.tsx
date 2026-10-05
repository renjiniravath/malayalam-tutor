"use client";

import type { Articulation } from "@/content/types";

interface ArticulationCardProps {
  articulation: Articulation;
  /** The item's sound:* tag, so the cue is scoped to the sound, not the word */
  soundTag?: string;
}

/** Heading names the sound itself; the cue describes how to produce it. */
const SOUND_HEADING: Record<string, string> = {
  "sound:zh": "How to make the zh sound",
  "sound:coronal": "How to make the Malayalam t sounds",
  "sound:geminate": "How to hold the doubled sound",
  "sound:vowel-length": "How to stretch the long vowel",
};

/** Short chip label, shown next to the heading. */
const SOUND_CHIP: Record<string, string> = {
  "sound:zh": "zh",
  "sound:coronal": "t sounds",
  "sound:geminate": "doubled",
  "sound:vowel-length": "long vowel",
};

/**
 * Articulation display: the brief text production cue, styled as part of
 * the reveal. Coaching is text + audio only, visuals were tried and
 * dropped (PLAN.md §4), so sound items never render a diagram or image.
 */
export function ArticulationCard({ articulation, soundTag }: ArticulationCardProps) {
  const heading = (soundTag && SOUND_HEADING[soundTag]) || "How to make this sound";
  const chip = soundTag && SOUND_CHIP[soundTag];
  return (
    <aside className="mt-5 rounded-2xl border border-accent/25 bg-accent/10 p-4">
      <p className="flex flex-wrap items-center gap-2 text-sm font-semibold">
        {chip && (
          <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
            {chip}
          </span>
        )}
        {heading}
      </p>
      <p className="mt-2 text-sm leading-snug text-text-2">{articulation.cue}</p>
    </aside>
  );
}
