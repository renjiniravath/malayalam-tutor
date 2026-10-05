/**
 * Shared client-side store instance (one Dexie connection per page).
 * Kept separate from db.ts so tests can inject isolated stores.
 */

import { createStore, type ProgressStore } from './db'

let store: ProgressStore | undefined

export function getStore(): ProgressStore {
  if (!store) store = createStore()
  return store
}
