'use client'

/**
 * Install prompt (CLAUDE.md PWA): a small "Install app" button shown
 * only when the browser offers beforeinstallprompt and the app is not
 * already running standalone.
 */

import { useEffect, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null)
  const [installed, setInstalled] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(display-mode: standalone)').matches,
  )

  useEffect(() => {
    const onPrompt = (event: Event) => {
      event.preventDefault()
      setDeferred(event as BeforeInstallPromptEvent)
    }
    const onInstalled = () => {
      setDeferred(null)
      setInstalled(true)
    }
    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  if (installed || !deferred) return null

  const install = async () => {
    await deferred.prompt()
    await deferred.userChoice
    setDeferred(null)
  }

  return (
    <button
      type="button"
      onClick={() => void install()}
      className="inline-flex min-h-11 items-center rounded-full border-2 border-stone-200 px-3 text-xs font-medium text-stone-700 outline-2 outline-offset-2 outline-stone-900 hover:border-stone-400 focus-visible:outline active:bg-stone-100 dark:border-stone-800 dark:text-stone-300 dark:outline-stone-100 dark:hover:border-stone-600 dark:active:bg-stone-900"
    >
      Install app
    </button>
  )
}
