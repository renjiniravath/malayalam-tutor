/**
 * Learner preferences (PLAN.md §6 accessibility, §6 silent mode).
 * Kept in localStorage; every read/write is guarded because storage can
 * throw or be unavailable (private windows, blocked site data).
 *
 * Exposed as a useSyncExternalStore-compatible snapshot so components can
 * read prefs hydration-safely: the server snapshot is the default, and the
 * stored value is swapped in after hydration.
 */

const KEY = "learner-prefs";

export interface Prefs {
  /** Silent mode: practice without speaking aloud — "think, then reveal" */
  silent: boolean;
  /** Accessibility preference: reveal text immediately, without hearing audio first */
  revealImmediately: boolean;
}

const DEFAULTS: Prefs = { silent: false, revealImmediately: false };

function load(): Prefs {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw) as Partial<Prefs>;
    return {
      silent: parsed.silent === true,
      revealImmediately: parsed.revealImmediately === true,
    };
  } catch {
    return DEFAULTS;
  }
}

let current: Prefs = typeof window === "undefined" ? DEFAULTS : load();
const listeners = new Set<() => void>();

export function writePrefs(next: Prefs): void {
  current = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // no storage — preferences just won't persist
  }
  for (const listener of listeners) listener();
}

export function subscribePrefs(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getPrefsSnapshot(): Prefs {
  return current;
}

export function getPrefsServerSnapshot(): Prefs {
  return DEFAULTS;
}
