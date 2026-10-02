'use client'

/**
 * Accessibility preferences dialog (PLAN.md §6): silent mode and the
 * immediate text reveal for screen-reader and deaf/HoH learners.
 */

import { useEffect, useRef, useState } from 'react'
import { usePreferences } from '@/lib/preferences'
import { CloseIcon, GearIcon } from './icons'

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string
  description: string
  checked: boolean
  onChange: (value: boolean) => void
}) {
  return (
    <label className="flex items-start justify-between gap-4 rounded-xl border border-stone-200 p-4 dark:border-stone-800">
      <span className="space-y-1">
        <span className="block font-medium">{label}</span>
        <span className="block text-sm text-stone-600 dark:text-stone-400">{description}</span>
      </span>
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 size-6 shrink-0 accent-stone-900 dark:accent-stone-100"
      />
    </label>
  )
}

export function PreferencesButton({ className = '' }: { className?: string }) {
  const { prefs, setPref } = usePreferences()
  const [open, setOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open accessibility preferences"
        className={`inline-flex min-h-12 min-w-12 items-center justify-center rounded-full text-stone-700 outline-2 outline-offset-2 outline-stone-900 hover:bg-stone-200/70 focus-visible:outline active:bg-stone-300/70 dark:text-stone-300 dark:outline-stone-100 dark:hover:bg-stone-800/70 dark:active:bg-stone-700/70 ${className}`}
      >
        <GearIcon />
      </button>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Accessibility preferences"
          className="fixed inset-0 z-50 flex items-end justify-center bg-stone-950/40 sm:items-center"
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpen(false)
          }}
        >
          <div className="w-full max-w-md rounded-t-2xl bg-stone-50 p-5 pb-safe shadow-xl sm:rounded-2xl dark:bg-stone-900">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Accessibility</h2>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close preferences"
                className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-full text-stone-600 outline-2 outline-offset-2 outline-stone-900 hover:bg-stone-200/70 focus-visible:outline active:bg-stone-300/70 dark:text-stone-300 dark:outline-stone-100 dark:hover:bg-stone-800/70 dark:active:bg-stone-700/70"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="space-y-3">
              <ToggleRow
                label="Silent mode"
                description="No sound anywhere. Think, then reveal."
                checked={prefs.silent}
                onChange={(value) => setPref('silent', value)}
              />
              <ToggleRow
                label="Show text immediately"
                description="Reveal romanization and script without hearing first. For screen readers and deaf or hard-of-hearing learners."
                checked={prefs.revealTextImmediately}
                onChange={(value) => setPref('revealTextImmediately', value)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
