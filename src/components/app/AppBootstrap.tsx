'use client'

/**
 * One-time client bootstrap: registers the service worker (production
 * only, so dev HMR is untouched) and requests persistent storage
 * quietly — granted silently, noted once in the console otherwise.
 * No nagging (CLAUDE.md durability).
 */

import { useEffect } from 'react'

export function AppBootstrap() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // The app works without the worker; nothing to tell the learner.
      })
    }
    if (navigator.storage?.persist) {
      void navigator.storage.persist().then((granted) => {
        if (!granted) console.info('Persistent storage not granted yet')
      })
    }
  }, [])
  return null
}
