"use client";

import { useEffect, useRef } from "react";
import type { Prefs } from "@/lib/prefs";

interface PreferencesSheetProps {
  prefs: Prefs;
  onChange: (prefs: Prefs) => void;
  onClose: () => void;
}

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex min-h-16 cursor-pointer items-center justify-between gap-4 rounded-2xl border border-line bg-surface-2 px-4 py-3">
      <span>
        <span className="block font-medium">{label}</span>
        <span className="block text-sm text-text-2">{description}</span>
      </span>
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-6 w-11 shrink-0 accent-accent"
      />
    </label>
  );
}

/** Silent mode + accessibility preferences (PLAN.md §6). */
export function PreferencesSheet({ prefs, onChange, onClose }: PreferencesSheetProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Preferences"
      className="fixed inset-0 z-10 flex items-end justify-center bg-black/40 p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md rounded-3xl border border-line bg-surface p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Preferences</h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line px-3 font-medium transition-opacity active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            Close
          </button>
        </div>
        <div className="mt-4 flex flex-col gap-3">
          <ToggleRow
            label="Silent mode"
            description="Practice without speaking out loud. Think, then reveal."
            checked={prefs.silent}
            onChange={(silent) => onChange({ ...prefs, silent })}
          />
          <ToggleRow
            label="Show text immediately"
            description="Accessibility: reveal text without hearing audio first."
            checked={prefs.revealImmediately}
            onChange={(revealImmediately) => onChange({ ...prefs, revealImmediately })}
          />
        </div>
      </div>
    </div>
  );
}
