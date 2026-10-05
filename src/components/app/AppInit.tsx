"use client";

import { useEffect } from "react";

const PERSIST_KEY = "storage-persisted";

/**
 * First-launch app setup: registers the service worker (production
 * only, so dev hot reloads stay clean) and requests persistent storage
 * quietly. The persist result is remembered for the preferences sheet;
 * a refusal is never nagged about.
 */
export function AppInit() {
  useEffect(() => {
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    }
    if (navigator.storage?.persist) {
      navigator.storage
        .persist()
        .then((persisted) => {
          try {
            window.localStorage.setItem(PERSIST_KEY, persisted ? "yes" : "no");
          } catch {
            // storage unavailable: the sheet just shows nothing
          }
        })
        .catch(() => undefined);
    }
  }, []);

  return null;
}

/** Whether persistent storage is granted, for quiet display. */
export function isStoragePersisted(): "yes" | "no" | undefined {
  try {
    const value = window.localStorage.getItem(PERSIST_KEY);
    return value === "yes" || value === "no" ? value : undefined;
  } catch {
    return undefined;
  }
}
