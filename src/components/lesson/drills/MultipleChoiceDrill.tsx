'use client'

/**
 * Recognition drill (PLAN.md §6 step 4): hear the word (or read it, when
 * audio is unavailable or silent) and pick the English meaning. One
 * attempt, immediate feedback, never blocking.
 */

import { useMemo, useState } from 'react'
import type { Item, Lesson } from '@/content/types'
import type { useLessonAudio } from '@/lib/audio/useLessonAudio'
import type { Outcome } from '@/lib/lesson/steps'
import { itemById } from '@/lib/lesson/steps'
import { usePreferences } from '@/lib/preferences'
import { SpeakerIcon } from '@/components/icons'

type LessonAudio = ReturnType<typeof useLessonAudio>

function shuffle<T>(items: readonly T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function MultipleChoiceDrill({
  lesson,
  item,
  distractors,
  audio,
  onDone,
}: {
  lesson: Lesson
  item: Item
  distractors: string[]
  audio: LessonAudio
  onDone: (outcome: Outcome) => void
}) {
  const { prefs } = usePreferences()
  const [playing, setPlaying] = useState(false)
  const [outcome, setOutcome] = useState<Outcome | null>(null)
  const [picked, setPicked] = useState<string | null>(null)

  const options = useMemo(
    () =>
      shuffle(
        [item, ...distractors.map((id) => itemById(lesson, id))].map((i) => ({
          id: i.id,
          meaning: i.meaning,
        })),
      ),
    [item, distractors, lesson],
  )

  const hear = async () => {
    setPlaying(true)
    await audio.play(item.audio.slow)
    setPlaying(false)
  }

  const pick = (id: string) => {
    if (outcome) return
    setPicked(id)
    setOutcome(id === item.id ? 'correct' : 'wrong')
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl animate-rise-in flex-col gap-5 px-6 pb-safe pt-8">
      <h2 className="text-lg font-semibold">What does it mean?</h2>
      <div className="flex flex-col items-center gap-3 rounded-xl border border-stone-200 p-5 dark:border-stone-800">
        {audio.available ? (
          <button
            type="button"
            onClick={hear}
            disabled={playing}
            aria-label="Hear the word"
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-stone-900 px-6 text-stone-50 outline-2 outline-offset-2 outline-stone-900 hover:bg-stone-700 focus-visible:outline active:bg-stone-700 disabled:opacity-60 dark:bg-stone-100 dark:text-stone-900 dark:outline-stone-100 dark:hover:bg-stone-300 dark:active:bg-stone-300"
          >
            <SpeakerIcon />
            {playing ? 'Playing…' : 'Tap to hear'}
          </button>
        ) : (
          <>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {prefs.silent ? 'Silent mode is on.' : 'Audio is on its way.'}
            </p>
            <p className="text-2xl font-semibold">{item.manglish}</p>
          </>
        )}
      </div>
      <div className="space-y-2" role="group" aria-label="Meaning options">
        {options.map((option) => {
          const isPicked = picked === option.id
          const isCorrect = option.id === item.id
          const showCorrect = outcome !== null && isCorrect
          const showWrong = outcome !== null && isPicked && !isCorrect
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => pick(option.id)}
              disabled={outcome !== null}
              className={`w-full rounded-xl border-2 px-4 py-3 text-left text-base outline-2 outline-offset-2 outline-stone-900 focus-visible:outline disabled:opacity-60 ${
                showCorrect
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-900 dark:border-emerald-500 dark:bg-emerald-950 dark:text-emerald-100'
                  : showWrong
                    ? 'border-red-600 bg-red-50 text-red-900 dark:border-red-500 dark:bg-red-950 dark:text-red-100'
                    : 'border-stone-200 text-stone-800 hover:border-stone-400 active:bg-stone-100 dark:border-stone-800 dark:text-stone-200 dark:hover:border-stone-600 dark:active:bg-stone-900'
              }`}
            >
              {option.meaning}
            </button>
          )
        })}
      </div>
      {outcome && (
        <div className="space-y-4" role="status">
          <p className="text-base font-medium">
            {outcome === 'correct' ? 'Correct.' : 'Not quite. The right answer is highlighted.'}
          </p>
          <button
            type="button"
            onClick={() => {
              audio.stop()
              onDone(outcome)
            }}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-stone-900 px-7 text-base font-medium text-stone-50 outline-2 outline-offset-2 outline-stone-900 hover:bg-stone-700 focus-visible:outline active:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:outline-stone-100 dark:hover:bg-stone-300 dark:active:bg-stone-300"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  )
}
