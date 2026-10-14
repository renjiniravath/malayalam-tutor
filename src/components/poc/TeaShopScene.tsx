"use client";

import { useCallback, useEffect, useState } from "react";
import { PORTRAIT } from "./scenes";
import { BOX, Stage } from "./stage";
import type { Beat } from "./scene-script";

/**
 * The tea-shop scene, played a beat at a time (POC, branch poc-visuals).
 *
 * One turn is one panel: the scene is drawn, the speaker's face replaces
 * the other's in the portrait panel, and the box carries the line with the
 * speaker's name in front of it, the way the games this follows do it.
 * Nothing animates — a beat change is an instant swap, like a page turn.
 */

const SPEAKER_LABEL: Record<Beat["speaker"], string> = {
  chettan: "Chettan",
  you: "You",
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
        <div className="flex items-center gap-1" aria-hidden="true">
          {beats.map((candidate, i) => (
            <span
              key={candidate.itemId}
              className="h-2.5 w-2.5"
              // Chrome, not illustration: the app's tokens, so the marks
              // survive the dark theme the way the scene colours do not
              // need to.
              style={{ background: i <= index ? "var(--accent)" : "var(--line)" }}
            />
          ))}
        </div>
      </div>

      {/* Tap the frame to go on, the way a reader taps a page. The buttons
          below are the real, keyboard-reachable controls. */}
      <div onClick={() => go(1)} className="mt-3 cursor-pointer">
        <Stage
          panel={beat.panel}
          panelLabel={beat.panelLabel}
          portrait={PORTRAIT[beat.speaker]}
          speaker={beat.speaker}
          caption={beat.caption}
        >
          <div aria-live="polite" aria-atomic="true">
            {/*
              18px, not 15. A pixel face has no hinting to fall back on: at
              15px its strokes land on fractional pixels and mush together,
              which is what made the line hard to read. Measured against
              16/18/20/22 in the browser, 18 is the first size that reads
              cleanly without the line wrapping early. The tracking keeps
              the tiny counters of a,e and o from closing up.
            */}
            <p className="font-pixel text-[18px] leading-[1.4] tracking-[0.02em]">
              <span style={{ color: BOX.name }}>{SPEAKER_LABEL[beat.speaker]}:</span>{" "}
              <span style={{ color: BOX.line }}>{beat.manglish}</span>
            </p>
            {beat.script && (
              <p
                lang="ml"
                className="mt-1 font-malayalam text-[13px] leading-snug"
                style={{ color: BOX.script }}
              >
                {beat.script}
              </p>
            )}
            <p className="mt-0.5 text-[13px] leading-snug" style={{ color: BOX.gloss }}>
              {beat.meaning}
            </p>
          </div>
        </Stage>
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
