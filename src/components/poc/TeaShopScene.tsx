"use client";

import { useCallback, useEffect, useState } from "react";
import { PALETTE } from "./palette";
import { ScenePanel } from "./panels";
import type { Beat } from "./scene-script";

/**
 * The tea-shop scene as a run of static panels (POC, branch poc-visuals).
 *
 * One turn is one panel: the picture on top, the dialogue box under it,
 * carrying a name plate, the caption of what happens around the line, and
 * the line in the three layers the product uses (romanization primary,
 * script secondary, English under it). Nothing animates — a beat change is
 * an instant swap, the way a page turn is.
 */

const SPEAKER_LABEL: Record<Beat["speaker"], string> = {
  chettan: "Chettan",
  you: "You",
};

// Plate colours are the app's ink-on-cream at accessible contrast, not the
// scene palette: the plate is interface, the panel is illustration.
const SPEAKER_PLATE: Record<Beat["speaker"], string> = {
  chettan: PALETTE.woodDark,
  you: PALETTE.palmDark,
};

export function TeaShopScene({ beats }: { beats: Beat[] }) {
  const [index, setIndex] = useState(0);
  const beat = beats[index];
  const last = index === beats.length - 1;

  const go = useCallback(
    (step: number) => {
      setIndex((current) => Math.min(beats.length - 1, Math.max(0, current + step)));
    },
    [beats.length],
  );

  // Arrow keys and space advance the scene on desktop. Keys pressed while a
  // control has focus are left alone — that button already handles them.
  // The target is tested for being an element first: a key event can land on
  // the document itself, which has no closest().
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target;
      if (target instanceof HTMLElement && target.closest("button, a, input, textarea")) return;
      if (event.key === "ArrowRight" || event.key === " ") {
        event.preventDefault();
        go(1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  return (
    <div>
      <div className="flex items-center justify-between gap-4 text-sm text-text-2">
        <p>
          Turn {index + 1} of {beats.length}
        </p>
        <div className="flex items-center gap-1.5" aria-hidden="true">
          {beats.map((candidate, i) => (
            <span
              key={candidate.itemId}
              className="h-2 w-2 rounded-full"
              // Chrome, not illustration: the app's tokens, so the dots
              // survive the dark theme the way the scene colours do not
              // need to.
              style={{ background: i <= index ? "var(--accent)" : "var(--line)" }}
            />
          ))}
        </div>
      </div>

      {/* Tap anywhere on the panel to go on, the way a reader taps a page.
          The buttons below are the real, keyboard-reachable controls. */}
      <div
        onClick={() => go(1)}
        className="mt-3 cursor-pointer overflow-hidden rounded-2xl border-2"
        style={{ borderColor: PALETTE.ink }}
      >
        <ScenePanel id={beat.panel} label={beat.panelLabel} />

        <div
          className="relative px-4 pb-4 pt-5"
          style={{ background: PALETTE.box, color: PALETTE.boxEdge }}
        >
          <span
            className="absolute -top-3.5 left-3 rounded-md border-2 px-3 py-1 text-sm font-semibold tracking-wide"
            style={{
              background: SPEAKER_PLATE[beat.speaker],
              borderColor: PALETTE.ink,
              color: PALETTE.boxEdge,
            }}
          >
            {SPEAKER_LABEL[beat.speaker]}
          </span>

          <div aria-live="polite" aria-atomic="true">
            <p className="text-sm italic" style={{ color: "#c9bda2" }}>
              {beat.caption}
            </p>
            <p className="mt-2 text-2xl font-semibold leading-snug">{beat.manglish}</p>
            {beat.script && (
              <p lang="ml" className="mt-1 font-malayalam text-lg" style={{ color: "#d8c9a8" }}>
                {beat.script}
              </p>
            )}
            <p className="mt-1.5 text-base" style={{ color: "#e6d9bd" }}>
              {beat.meaning}
            </p>
          </div>

          {/* Static "there is more" mark; it does not blink. */}
          <span
            aria-hidden="true"
            className="absolute bottom-3 right-4 text-lg leading-none"
            style={{ color: last ? "transparent" : PALETTE.boxEdge }}
          >
            ▸
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={index === 0}
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-line px-5 font-medium transition-opacity active:opacity-70 disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        >
          Back
        </button>

        <button
          type="button"
          onClick={() => go(1)}
          disabled={last}
          className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-accent px-6 font-medium text-accent-foreground transition-opacity active:opacity-80 disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        >
          {last ? "The end" : "Next turn"}
        </button>
      </div>
    </div>
  );
}
