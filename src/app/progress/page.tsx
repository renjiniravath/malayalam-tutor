'use client'

/**
 * Progress dashboard (PLAN.md §7 and §8): rank and XP, streak with
 * grace freezes and pause, achievements in earned / in-progress / not
 * yet states, the per-level can-do checklist, per-sound mastery, and
 * review statistics from the persisted logs. Real data only, no fake
 * decoration, no risk framing.
 */

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { LEVELS } from '@/content/levels'
import { BackIcon } from '@/components/icons'
import { PreferencesButton } from '@/components/PreferencesDialog'
import { getStore } from '@/lib/store/singleton'
import type { CardRecord, ReviewLogRecord } from '@/lib/store/db'
import { pauseStreakNow, resumeStreakNow } from '@/lib/progress/learning'
import { achievementProgress, type AchievementId } from '@/lib/streaks/achievements'
import { currentStreak, EMPTY_STREAK, type StreakState } from '@/lib/streaks/streaks'
import { levelFor, rankFor, progressToNext, EMPTY_XP, type XpState } from '@/lib/xp/xp'
import { computeSoundMastery } from '@/lib/progress/mastery'
import { canDoRows, recentRecall, reviewsByDay } from '@/lib/progress/dashboard'

const ALL_ITEMS = LEVELS.flatMap((level) => level.lessons).flatMap((lesson) => lesson.items)

interface DashboardData {
  xp: XpState
  streak: StreakState
  earnedIds: AchievementId[]
  reviewCount: number
  completedLessonIds: Set<string>
  cards: CardRecord[]
  logs: ReviewLogRecord[]
  dueCount: number
}

export default function ProgressPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [busy, setBusy] = useState(false)

  const fetchData = async (): Promise<DashboardData> => {
    const store = getStore()
    const now = new Date()
    const [xp, streak, achievements, reviewCount, lessons, cards, logs, dueCount] = await Promise.all([
      store.getXp(),
      store.getStreak(),
      store.listAchievements(),
      store.countLogs(),
      store.listLessons(),
      store.listCards(),
      store.listLogs(),
      store.countDue(now),
    ])
    return {
      xp: xp ?? EMPTY_XP,
      streak: streak ?? EMPTY_STREAK,
      earnedIds: achievements.map((a) => a.id as AchievementId),
      reviewCount,
      completedLessonIds: new Set(lessons.map((l) => l.id)),
      cards,
      logs,
      dueCount,
    }
  }

  useEffect(() => {
    let alive = true
    void fetchData().then((loaded) => {
      if (alive) setData(loaded)
    })
    return () => {
      alive = false
    }
  }, [])

  const togglePause = async () => {
    setBusy(true)
    try {
      if (data?.streak.pausedAt) await resumeStreakNow()
      else await pauseStreakNow()
      setData(await fetchData())
    } finally {
      setBusy(false)
    }
  }

  const now = new Date()
  const level = levelFor(data?.xp.total ?? 0)
  const rank = rankFor(level)
  const progress = progressToNext(data?.xp.total ?? 0)
  const displayStreak = currentStreak(data?.streak ?? EMPTY_STREAK, now)
  const paused = (data?.streak.pausedAt ?? null) !== null
  const events = {
    reviewCount: data?.reviewCount ?? 0,
    perfectLessons: data?.earnedIds.includes('perfectLesson') ? 1 : 0,
    streak: displayStreak,
  }
  const achievements = achievementProgress(events, data?.earnedIds ?? [])
  const recall = recentRecall(data?.logs ?? [])
  const weekReviews = (data ? reviewsByDay(data.logs, 7, now) : []).reduce((n, day) => n + day.count, 0)
  const mastery = computeSoundMastery(ALL_ITEMS, data?.cards ?? [])

  return (
    <main className="min-h-dvh pb-safe">
      <header className="border-b border-stone-200 dark:border-stone-800">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3 px-4 pt-safe">
          <Link
            href="/"
            aria-label="Back to lessons"
            className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-full text-stone-700 outline-2 outline-offset-2 outline-stone-900 hover:bg-stone-200/70 focus-visible:outline active:bg-stone-300/70 dark:text-stone-300 dark:outline-stone-100 dark:hover:bg-stone-800/70 dark:active:bg-stone-700/70"
          >
            <BackIcon />
          </Link>
          <h1 className="text-base font-semibold">Progress</h1>
          <PreferencesButton />
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-6 pt-8">
        <section className="space-y-3">
          <p className="text-3xl font-bold tracking-tight text-amber-700 dark:text-amber-400">{rank}</p>
          <p className="text-sm text-stone-600 dark:text-stone-300">
            Level {level} · {data?.xp.total ?? 0} XP
          </p>
          {progress && (
            <div className="space-y-1">
              <div className="h-1 w-full overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800">
                <div
                  className="h-full rounded-full bg-amber-600 dark:bg-amber-400"
                  style={{ width: `${Math.min(100, Math.round((progress.have / progress.need) * 100))}%` }}
                />
              </div>
              <p className="text-xs tabular-nums text-stone-500 dark:text-stone-400">
                {progress.have} of {progress.need} XP to {progress.nextRank}
              </p>
            </div>
          )}
        </section>

        <section className="space-y-3 rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium">
              {displayStreak > 0 ? `${displayStreak}-day streak` : 'No active streak'}
            </span>
            {paused && (
              <span className="rounded-full bg-stone-200 px-3 py-1 text-xs font-medium text-stone-600 dark:bg-stone-800 dark:text-stone-400">
                Paused
              </span>
            )}
            <button
              type="button"
              disabled={busy}
              onClick={() => void togglePause()}
              className="inline-flex min-h-11 items-center rounded-full border-2 border-stone-300 px-4 text-sm font-medium text-stone-700 outline-2 outline-offset-2 outline-stone-900 hover:border-stone-400 focus-visible:outline active:bg-stone-100 disabled:opacity-60 dark:border-stone-700 dark:text-stone-300 dark:outline-stone-100 dark:hover:border-stone-600 dark:active:bg-stone-900"
            >
              {paused ? 'Resume' : 'Pause'}
            </button>
          </div>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            {data && data.streak.freezes > 0
              ? `${data.streak.freezes} ${data.streak.freezes === 1 ? 'freeze' : 'freezes'} ready.`
              : 'No freezes yet.'}{' '}
            Missed a day? A freeze covers it. Finishing a review session earns one. Pause keeps the
            streak safe without using a freeze.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Achievements</h2>
          <ul className="space-y-3">
            {achievements.map((achievement) => (
              <li
                key={achievement.id}
                className="rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-medium">{achievement.title}</span>
                  {achievement.earned ? (
                    <span className="text-sm font-medium text-amber-700 dark:text-amber-400">Earned</span>
                  ) : achievement.progress > 0 ? (
                    <span className="text-sm tabular-nums text-stone-500 dark:text-stone-400">
                      {achievement.progress} of {achievement.target}
                    </span>
                  ) : (
                    <span className="text-sm text-stone-500 dark:text-stone-400">Not yet</span>
                  )}
                </div>
                <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">{achievement.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">What you can do</h2>
          {LEVELS.map((level) => (
            <ul key={level.id} className="space-y-2">
              {canDoRows(level, data?.completedLessonIds ?? new Set()).map((row) => (
                <li key={row.statement} className="flex items-baseline justify-between gap-4 text-sm">
                  <span className="text-stone-600 dark:text-stone-300">{row.statement}</span>
                  <span
                    className={
                      row.done
                        ? 'shrink-0 font-medium text-amber-700 dark:text-amber-400'
                        : 'shrink-0 text-stone-500 dark:text-stone-400'
                    }
                  >
                    {row.done ? 'Done' : 'Not yet'}
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Sounds</h2>
          <ul className="space-y-2">
            {mastery.map((sound) => (
              <li key={sound.tag} className="flex items-baseline justify-between gap-4 text-sm">
                <span className="text-stone-600 dark:text-stone-300">{sound.label}</span>
                <span
                  className={
                    sound.mastered
                      ? 'shrink-0 font-medium text-amber-700 dark:text-amber-400'
                      : 'shrink-0 tabular-nums text-stone-500 dark:text-stone-400'
                  }
                >
                  {sound.mastered ? 'Mastered' : `${sound.retained} of ${sound.total} words retained`}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight">Reviews</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-stone-600 dark:text-stone-400">Reviews all time</dt>
              <dd className="font-medium tabular-nums">{data?.reviewCount ?? 0}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-stone-600 dark:text-stone-400">Reviews this week</dt>
              <dd className="font-medium tabular-nums">{weekReviews}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-stone-600 dark:text-stone-400">Cards due now</dt>
              <dd className="font-medium tabular-nums">{data?.dueCount ?? 0}</dd>
            </div>
            {recall && (
              <div className="flex justify-between gap-4">
                <dt className="text-stone-600 dark:text-stone-400">Recent recall</dt>
                <dd className="font-medium tabular-nums">
                  {recall.rate}% ({recall.correct} of {recall.total})
                </dd>
              </div>
            )}
          </dl>
        </section>
      </div>
    </main>
  )
}
