'use client'

/**
 * Discrimination drill (PLAN.md §6 step 5, the auto-scored pronunciation
 * test): one of two sounds plays, the learner picks which. Purely a
 * listening exercise — with no audio (silent mode or before generation)
 * it is skipped, never faked.
 */

import { useState } from 'react'
import type { Item, MinimalPair } from '@/content/types'
import type { useLessonAudio } from '@/lib/audio/useLessonAudio'
import type { Outcome } from '@/lib/lesson/steps'
import { usePreferences } from '@/lib/preferences'
import { SpeakerIcon } from '@/components/icons'

type LessonAudio = ReturnType<typeof useLessonAudio>

export function MinimalPairDrill({
  pair,
  itemA,
  itemB,
  audio,
  onDone,
}: {
  pair: MinimalPair
  itemA: Item
  itemB: Item
  audio: LessonAudio
  onDone: (outcome: Outcome) => void
}) {
  const { prefs } = usePreferences()
  const [side] = useState<'a' | 'b'>(() => (Math.random() < 0.5 ? 'a' : 'b'))
  const [playing, setPlaying] = useState(false)
  const [picked, setPicked] = useState<'a' | 'b' | null>(null)
  const [outcome, setOutcome] = useState<Outcome | null>(null)

  if (!audio.available) {
    return (
      <div className="mx-auto flex max-w-md flex-col gap-5 px-6 pb-6 pt-8">
        <h2 className="text-lg font-semibold">Sound drill</h2>
        <p className="text-stone-600 dark:text-stone-300">
          This drill is about listening for the difference between two sounds.
        </p>
        <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200">
          {prefs.silent
            ? 'Silent mode is on, so this drill is skipped.'
            : 'Audio is not generated yet, so this drill is skipped.'}
        </p>
        <button
          type="button"
          onClick={() => onDone('skipped')}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-stone-900 px-7 text-base font-medium text-stone-50 outline-2 outline-offset-2 outline-stone-900 hover:bg-stone-700 focus-visible:outline active:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:outline-stone-100 dark:hover:bg-stone-300 dark:active:bg-stone-300"
        >
          Skip
        </button>
      </div>
    )
  }

  const hear = async () => {
    setPlaying(true)
    await audio.play(side === 'a' ? pair.aClip : pair.bClip)
    setPlaying(false)
  }

  const pick = (pickedSide: 'a' | 'b') => {
    if (outcome) return
    setPicked(pickedSide)
    setOutcome(pickedSide === side ? 'correct' : 'wrong')
  }

  const options: { side: 'a' | 'b'; item: Item }[] = [
    { side: 'a', item: itemA },
    { side: 'b', item: itemB },
  ]

  return (
    <div className="mx-auto flex max-w-md flex-col gap-5 px-6 pb-6 pt-8">
      <h2 className="text-lg font-semibold">Which one did you hear?</h2>
      <div className="flex flex-col items-center gap-3 rounded-xl border border-stone-200 p-5 dark:border-stone-800">
        <button
          type="button"
          onClick={hear}
          disabled={playing}
          aria-label="Hear the sound again"
          className="inline-flex min-h-12 items-center gap-2 rounded-full bg-stone-900 px-6 text-stone-50 outline-2 outline-offset-2 outline-stone-900 hover:bg-stone-700 focus-visible:outline active:bg-stone-700 disabled:opacity-60 dark:bg-stone-100 dark:text-stone-900 dark:outline-stone-100 dark:hover:bg-stone-300 dark:active:bg-stone-300"
        >
          <SpeakerIcon />
          {playing ? 'Playing…' : 'Tap to hear'}
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2" role="group" aria-label="Sound options">
        {options.map((option) => {
          const showCorrect = outcome !== null && option.side === side
          const showWrong = outcome !== null && picked === option.side && !showCorrect
          return (
            <button
              key={option.side}
              type="button"
              onClick={() => pick(option.side)}
              disabled={outcome !== null}
              className={`flex min-h-24 flex-col items-center justify-center gap-1 rounded-xl border-2 px-3 outline-2 outline-offset-2 outline-stone-900 focus-visible:outline disabled:opacity-60 ${
                showCorrect
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-900 dark:border-emerald-500 dark:bg-emerald-950 dark:text-emerald-100'
                  : showWrong
                    ? 'border-red-600 bg-red-50 text-red-900 dark:border-red-500 dark:bg-red-950 dark:text-red-100'
                    : 'border-stone-200 text-stone-800 hover:border-stone-400 active:bg-stone-100 dark:border-stone-800 dark:text-stone-200 dark:hover:border-stone-600 dark:active:bg-stone-900'
              }`}
            >
              <span className="text-xl font-semibold">{option.item.manglish}</span>
              {option.item.script && (
                <span lang="ml" className="font-malayalam text-stone-500 dark:text-stone-400">
                  {option.item.script}
                </span>
              )}
            </button>
          )
        })}
      </div>
      {outcome && (
        <div className="space-y-4" role="status">
          <p className="text-base font-medium">
            {outcome === 'correct' ? 'Correct.' : 'Not quite — the right answer is highlighted.'}
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
