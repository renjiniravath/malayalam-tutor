'use client'

/**
 * Accessibility preferences (PLAN.md §6): silent mode and immediate text
 * reveal, persisted to localStorage. The reveal preference exists for
 * screen-reader and deaf/HoH learners — the audio-first pedagogy applies
 * to sighted hearing learners.
 */

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export interface Preferences {
  silent: boolean
  revealTextImmediately: boolean
}

const DEFAULTS: Preferences = { silent: false, revealTextImmediately: false }
const STORAGE_KEY = 'mt-prefs-v1'

function loadPrefs(): Preferences {
  if (typeof window === 'undefined') return DEFAULTS
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULTS
    return { ...DEFAULTS, ...JSON.parse(raw) }
  } catch {
    return DEFAULTS
  }
}

interface PreferencesContextValue {
  prefs: Preferences
  setPref: <K extends keyof Preferences>(key: K, value: Preferences[K]) => void
}

const PreferencesContext = createContext<PreferencesContextValue | null>(null)

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<Preferences>(loadPrefs)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
    } catch {
      // storage unavailable (private mode) — preference lasts the session
    }
  }, [prefs])

  const setPref = <K extends keyof Preferences>(key: K, value: Preferences[K]) =>
    setPrefs((prev) => ({ ...prev, [key]: value }))

  return (
    <PreferencesContext.Provider value={{ prefs, setPref }}>
      {children}
    </PreferencesContext.Provider>
  )
}

export function usePreferences(): PreferencesContextValue {
  const value = useContext(PreferencesContext)
  if (!value) throw new Error('usePreferences must be used inside PreferencesProvider')
  return value
}
