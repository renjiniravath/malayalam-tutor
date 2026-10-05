'use client'

/**
 * Home progress section (PLAN.md §8): the streak with its pause control
 * and grace freezes, earned achievements as quiet labels, and the JSON
 * backup (export + validated import). No streaks-at-risk messaging, no
 * loss shaming — a lapse just starts a new count.
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import type { AchievementRecord } from '@/lib/store/db'
import { exportProgress, importProgress } from '@/lib/store/backup'
import { getStore } from '@/lib/store/singleton'
import { pauseStreakNow, resumeStreakNow } from '@/lib/progress/learning'
import { ACHIEVEMENTS } from '@/lib/streaks/achievements'
import { currentStreak, dayKey, EMPTY_STREAK, type StreakState } from '@/lib/streaks/streaks'

export function HomeProgress() {
  const [streak, setStreak] = useState<StreakState>(EMPTY_STREAK)
  const [achievements, setAchievements] = useState<AchievementRecord[]>([])
  const [message, setMessage] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const fileInput = useRef<HTMLInputElement>(null)

  const refresh = useCallback(async () => {
    const store = getStore()
    setStreak((await store.getStreak()) ?? EMPTY_STREAK)
    setAchievements(await store.listAchievements())
  }, [])

  useEffect(() => {
    let alive = true
    const load = async () => {
      const store = getStore()
      const [streakState, achievementRecords] = await Promise.all([
        store.getStreak(),
        store.listAchievements(),
      ])
      if (!alive) return
      setStreak(streakState ?? EMPTY_STREAK)
      setAchievements(achievementRecords)
    }
    void load()
    return () => {
      alive = false
    }
  }, [])

  const run = async (action: () => Promise<void>) => {
    setBusy(true)
    try {
      await action()
      await refresh()
    } catch (error) {
      console.error(error)
      setMessage('Something went wrong. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  const exportBackup = async () => {
    const payload = await exportProgress(getStore())
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `learn-malayalam-backup-${dayKey(new Date())}.json`
    anchor.click()
    URL.revokeObjectURL(url)
    setMessage('Backup downloaded.')
  }

  const importBackup = async (file: File) => {
    const text = await file.text()
    const result = await importProgress(getStore(), text)
    if (result.ok) {
      const { restoredCards, skippedCards, restoredLogs } = result.summary
      setMessage(
        `Restored ${restoredCards} cards and ${restoredLogs} review logs.${
          skippedCards > 0 ? ` Skipped ${skippedCards} removed items.` : ''
        }`,
      )
    } else {
      setMessage(`Could not restore: ${result.reason}`)
    }
  }

  const display = currentStreak(streak, new Date())
  const paused = streak.pausedAt !== null

  return (
    <section className="border-t border-stone-200 pt-12 dark:border-stone-800">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Progress</h2>

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm text-stone-600 dark:text-stone-300">
            {display > 0 ? `${display}-day streak` : 'No active streak'}
          </span>
          <span className="text-sm text-stone-500 dark:text-stone-400">
            {streak.freezes > 0 ? `${streak.freezes} ${streak.freezes === 1 ? 'freeze' : 'freezes'}` : ''}
          </span>
          {paused ? (
            <span className="rounded-full bg-stone-200 px-3 py-1 text-xs font-medium text-stone-600 dark:bg-stone-800 dark:text-stone-400">
              Paused
            </span>
          ) : null}
          <button
            type="button"
            disabled={busy}
            onClick={() =>
              void run(async () => {
                if (paused) await resumeStreakNow()
                else await pauseStreakNow()
              })
            }
            className="inline-flex min-h-11 items-center rounded-full border-2 border-stone-300 px-4 text-sm font-medium text-stone-700 outline-2 outline-offset-2 outline-stone-900 hover:border-stone-400 focus-visible:outline active:bg-stone-100 disabled:opacity-60 dark:border-stone-700 dark:text-stone-300 dark:outline-stone-100 dark:hover:border-stone-600 dark:active:bg-stone-900"
          >
            {paused ? 'Resume' : 'Pause'}
          </button>
        </div>

        {achievements.length > 0 && (
          <ul className="space-y-1">
            {achievements.map((achievement) => (
              <li key={achievement.id} className="text-sm">
                <span className="font-medium text-amber-700 dark:text-amber-400">
                  {ACHIEVEMENTS[achievement.id as keyof typeof ACHIEVEMENTS]?.title ?? achievement.id}
                </span>{' '}
                <span className="text-stone-500 dark:text-stone-400">
                  {ACHIEVEMENTS[achievement.id as keyof typeof ACHIEVEMENTS]?.description ?? ''}
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={busy}
            onClick={() => void run(exportBackup)}
            className="inline-flex min-h-11 items-center rounded-full border-2 border-stone-300 px-4 text-sm font-medium text-stone-700 outline-2 outline-offset-2 outline-stone-900 hover:border-stone-400 focus-visible:outline active:bg-stone-100 disabled:opacity-60 dark:border-stone-700 dark:text-stone-300 dark:outline-stone-100 dark:hover:border-stone-600 dark:active:bg-stone-900"
          >
            Export backup
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => fileInput.current?.click()}
            className="inline-flex min-h-11 items-center rounded-full border-2 border-stone-300 px-4 text-sm font-medium text-stone-700 outline-2 outline-offset-2 outline-stone-900 hover:border-stone-400 focus-visible:outline active:bg-stone-100 disabled:opacity-60 dark:border-stone-700 dark:text-stone-300 dark:outline-stone-100 dark:hover:border-stone-600 dark:active:bg-stone-900"
          >
            Import backup
          </button>
          <input
            ref={fileInput}
            type="file"
            accept="application/json,.json"
            className="hidden"
            aria-label="Import backup file"
            onChange={(event) => {
              const file = event.target.files?.[0]
              if (file) void run(() => importBackup(file))
              event.target.value = ''
            }}
          />
        </div>

        {message && <p className="text-sm text-stone-500 dark:text-stone-400">{message}</p>}
      </div>
    </section>
  )
}
