"use client";

import { useEffect, useRef, useState } from "react";
import type { Prefs } from "@/lib/prefs";
import {
  ACHIEVEMENTS,
  pauseLearnerStreak,
  resumeLearnerStreak,
  type StreakState,
} from "@/lib/gamification/progress";
import { buildBackup, downloadBackup, importBackup, parseBackup } from "@/lib/progress/backup";
import { progressStore } from "@/lib/progress/store";
import { isStoragePersisted } from "@/components/app/AppInit";

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

/** Silent mode, accessibility, progress, and backup (PLAN.md §6, §8, §11). */
export function PreferencesSheet({ prefs, onChange, onClose }: PreferencesSheetProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [streak, setStreak] = useState<StreakState | undefined>(undefined);
  const [unlocked, setUnlocked] = useState<string[]>([]);
  const [dataStatus, setDataStatus] = useState<string | null>(null);

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

  useEffect(() => {
    const load = async () => {
      try {
        const stored = await progressStore.getMeta<StreakState>("streak");
        const achievements = await progressStore.getMeta<Record<string, string>>("achievements");
        setStreak(stored);
        setUnlocked(Object.keys(achievements ?? {}));
      } catch {
        // progress display is best-effort
      }
    };
    void load();
  }, []);

  const pause = async () => {
    await pauseLearnerStreak(progressStore, new Date());
    setStreak(await progressStore.getMeta<StreakState>("streak"));
  };

  const resume = async () => {
    await resumeLearnerStreak(progressStore);
    setStreak(await progressStore.getMeta<StreakState>("streak"));
  };

  const exportBackup = async () => {
    try {
      const envelope = await buildBackup(progressStore, new Date());
      downloadBackup(envelope);
      setDataStatus(null);
    } catch {
      setDataStatus("The backup could not be created.");
    }
  };

  const importFile = async (file: File) => {
    try {
      const envelope = parseBackup(await file.text());
      const result = await importBackup(progressStore, envelope);
      setDataStatus(
        `Backup restored: ${result.cards} cards, ${result.logs} review logs.` +
          (result.droppedCards > 0 ? ` ${result.droppedCards} cards no longer in the course were skipped.` : ""),
      );
      const stored = await progressStore.getMeta<StreakState>("streak");
      const achievements = await progressStore.getMeta<Record<string, string>>("achievements");
      setStreak(stored);
      setUnlocked(Object.keys(achievements ?? {}));
    } catch (error) {
      setDataStatus(error instanceof Error ? error.message : "The backup could not be restored.");
    }
  };

  const persisted = isStoragePersisted();

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
      <div className="max-h-[85dvh] w-full max-w-md overflow-y-auto rounded-3xl border border-line bg-surface p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
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
            description="No sound anywhere. Think, then reveal."
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

        <section className="mt-5 rounded-2xl border border-line bg-surface-2 p-4">
          <h3 className="font-semibold">Progress</h3>
          {streak && (
            <p className="mt-1 text-sm text-text-2">
              {streak.pausedUntil !== undefined ? (
                <>Paused until {streak.pausedUntil}. Your streak is safe.</>
              ) : (
                <>
                  {streak.count === 0 ? "No streak yet." : `Streak: ${streak.count} ${streak.count === 1 ? "day" : "days"}.`}
                  {streak.freezes > 0
                    ? ` ${streak.freezes} ${streak.freezes === 1 ? "freeze" : "freezes"} saved. A missed day uses one automatically.`
                    : " Finish a ten-card review to earn a freeze."}
                </>
              )}
            </p>
          )}
          <div className="mt-3 flex gap-2">
            {streak?.pausedUntil === undefined ? (
              <button
                type="button"
                onClick={() => void pause()}
                className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-line px-4 text-sm font-medium transition-opacity active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              >
                Pause streak
              </button>
            ) : (
              <button
                type="button"
                onClick={() => void resume()}
                className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-line px-4 text-sm font-medium transition-opacity active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              >
                Resume streak
              </button>
            )}
          </div>
          {unlocked.length > 0 && (
            <p className="mt-3 text-sm text-text-2">
              Achievements: {unlocked.length} of {ACHIEVEMENTS.length} unlocked.
              <span className="mt-1 block text-text-3">
                {unlocked
                  .map((id) => ACHIEVEMENTS.find((definition) => definition.id === id)?.name)
                  .filter(Boolean)
                  .join(", ")}
              </span>
            </p>
          )}
        </section>

        <section className="mt-3 rounded-2xl border border-line bg-surface-2 p-4">
          <h3 className="font-semibold">Storage</h3>
          <p className="mt-1 text-sm text-text-2">
            {persisted === "yes"
              ? "Progress is protected from storage cleanup."
              : persisted === "no"
                ? "Storage cleanup protection was not granted."
                : "Progress is kept on this device."}
          </p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => void exportBackup()}
              className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full bg-accent px-4 text-sm font-medium text-accent-foreground transition-opacity active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
            >
              Export backup
            </button>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-line px-4 text-sm font-medium transition-opacity active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
            >
              Import backup
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json,.json"
              className="hidden"
              aria-label="Import backup file"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void importFile(file);
                event.target.value = "";
              }}
            />
          </div>
          {dataStatus && <p className="mt-3 text-sm text-text-2">{dataStatus}</p>}
        </section>
      </div>
    </div>
  );
}
