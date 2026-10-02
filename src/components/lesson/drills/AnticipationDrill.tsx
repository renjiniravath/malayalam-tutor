'use client'

/**
 * Anticipation drill (PLAN.md §6 step 3, Pimsleur loop): prompt, pause,
 * learner says it aloud, then the model audio plays. The pause is
 * user-extendable (WCAG 2.2.1). Skipped in the first lessons
 * (comprehension-first phase), and with no audio it stays a silent
 * think-then-reveal exercise.
 */

import { useEffect, useState } from 'react'
import type { Item } from '@/content/types'
import type { useLessonAudio } from '@/lib/audio/useLessonAudio'
import type { Outcome } from '@/lib/lesson/steps'
import { usePreferences } from '@/lib/preferences'

type LessonAudio = ReturnType<typeof useLessonAudio>

const THINK_SECONDS = 5

export function AnticipationDrill({
  item,
  tier,
  audio,
  onDone,
}: {
  item: Item
  tier: 'slow' | 'normal'
  audio: LessonAudio
  onDone: (outcome: Outcome) => void
}) {
  const { prefs } = usePreferences()
  const [secondsLeft, setSecondsLeft] = useState(THINK_SECONDS)

  /** Derived phase — the only state is the countdown. */
  const phase: 'think' | 'reveal' = secondsLeft > 0 ? 'think' : 'reveal'

  useEffect(() => {
    if (phase !== 'think') return
    const interval = setInterval(() => {
      setSecondsLeft((left) => left - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [phase])

  useEffect(() => {
    if (phase !== 'reveal') return
    if (!audio.available) return
    let cancelled = false
    const playModel = async () => {
      const first = await audio.play(tier === 'slow' ? item.audio.slow : item.audio.normal)
      if (cancelled || first !== 'played') return
      await audio.play(item.audio.normal)
    }
    void playModel()
    return () => {
      cancelled = true
      audio.stop()
    }
  }, [phase, audio, item, tier])

  if (phase === 'think') {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-6 px-6 pt-10 text-center">
        <h2 className="text-lg font-semibold">Say it aloud</h2>
        <p className="text-stone-600 dark:text-stone-300">
          You heard this one earlier. Say it before the answer comes.
        </p>
        <p className="text-3xl font-semibold tabular-nums" aria-live="off">
          {secondsLeft}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setSecondsLeft((left) => left + 5)}
            className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-stone-300 px-6 text-base font-medium text-stone-700 outline-2 outline-offset-2 outline-stone-900 hover:border-stone-400 focus-visible:outline active:bg-stone-100 dark:border-stone-700 dark:text-stone-300 dark:outline-stone-100 dark:hover:border-stone-600 dark:active:bg-stone-900"
          >
            More time (+5 s)
          </button>
          <button
            type="button"
            onClick={() => setSecondsLeft(0)}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-stone-900 px-6 text-base font-medium text-stone-50 outline-2 outline-offset-2 outline-stone-900 hover:bg-stone-700 focus-visible:outline active:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:outline-stone-100 dark:hover:bg-stone-300 dark:active:bg-stone-300"
          >
            Reveal now
          </button>
        </div>
      </div>
    )
  }

  return (
    <div aria-live="polite" className="mx-auto flex max-w-md flex-col gap-6 px-6 pb-6 pt-8">
      <h2 className="text-lg font-semibold">Here it is</h2>
      <div>
        <p className="text-4xl font-semibold tracking-tight">{item.manglish}</p>
        {item.script && (
          <p lang="ml" className="mt-1 font-malayalam text-2xl text-stone-500 dark:text-stone-400">
            {item.script}
          </p>
        )}
        <p className="mt-2 text-lg text-stone-700 dark:text-stone-300">{item.meaning}</p>
      </div>
      {audio.available ? (
        <p className="text-stone-600 dark:text-stone-300">Listen and compare with your attempt.</p>
      ) : (
        <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200">
          {prefs.silent
            ? 'Silent mode is on — compare in your head.'
            : 'Audio is not generated yet — compare in your head.'}
        </p>
      )}
      <button
        type="button"
        onClick={() => onDone('done')}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-stone-900 px-7 text-base font-medium text-stone-50 outline-2 outline-offset-2 outline-stone-900 hover:bg-stone-700 focus-visible:outline active:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:outline-stone-100 dark:hover:bg-stone-300 dark:active:bg-stone-300"
      >
        Continue
      </button>
    </div>
  )
}
