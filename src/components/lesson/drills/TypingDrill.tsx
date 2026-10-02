'use client'

/**
 * Production drill (PLAN.md §6 step 7): hear the word and type the
 * romanization. Input is ASCII-forgiving (PLAN.md §9 rule 5): plain t/d
 * for either dental or retroflex, l for ḷ, n for ṇ, no diacritics,
 * case-insensitive, one small typo tolerated.
 */

import { useState, type FormEvent } from 'react'
import type { Item } from '@/content/types'
import type { useLessonAudio } from '@/lib/audio/useLessonAudio'
import type { Outcome } from '@/lib/lesson/steps'
import { matchesInput } from '@/lib/lesson/normalize'
import { usePreferences } from '@/lib/preferences'
import { SpeakerIcon } from '@/components/icons'

type LessonAudio = ReturnType<typeof useLessonAudio>

export function TypingDrill({
  item,
  acceptedInputs,
  audio,
  onDone,
}: {
  item: Item
  acceptedInputs?: string[]
  audio: LessonAudio
  onDone: (outcome: Outcome) => void
}) {
  const { prefs } = usePreferences()
  const [playing, setPlaying] = useState(false)
  const [value, setValue] = useState('')
  const [outcome, setOutcome] = useState<Outcome | null>(null)

  const accepted = [...(acceptedInputs ?? []), ...(item.acceptedInputs ?? []), item.manglish]

  const hear = async () => {
    setPlaying(true)
    await audio.play(item.audio.slow)
    setPlaying(false)
  }

  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (outcome || !value.trim()) return
    setOutcome(matchesInput(value, accepted) ? 'correct' : 'wrong')
  }

  return (
    <div className="mx-auto flex max-w-md flex-col gap-5 px-6 pb-6 pt-8">
      <h2 className="text-lg font-semibold">Type the word</h2>
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
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-900 dark:bg-amber-950 dark:text-amber-200">
              {prefs.silent ? 'Silent mode' : 'Audio not generated yet'}
            </span>
            <p className="text-2xl font-semibold">{item.manglish}</p>
          </>
        )}
      </div>
      <form onSubmit={submit} className="space-y-3">
        <label className="block">
          <span className="sr-only">Type the word in roman letters</span>
          <input
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            disabled={outcome !== null}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="send"
            placeholder="Type it here"
            className="w-full rounded-xl border-2 border-stone-200 bg-white px-4 py-3 text-lg text-stone-900 outline-2 outline-offset-2 outline-stone-900 placeholder:text-stone-400 focus-visible:outline disabled:opacity-60 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:outline-stone-100 dark:placeholder:text-stone-600"
          />
        </label>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          Typing is forgiving: plain t works for th, l for ḷ, n for ṇ. No special marks needed.
        </p>
        {!outcome && (
          <button
            type="submit"
            disabled={!value.trim()}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-stone-900 px-7 text-base font-medium text-stone-50 outline-2 outline-offset-2 outline-stone-900 hover:bg-stone-700 focus-visible:outline active:bg-stone-700 disabled:opacity-50 dark:bg-stone-100 dark:text-stone-900 dark:outline-stone-100 dark:hover:bg-stone-300 dark:active:bg-stone-300"
          >
            Check
          </button>
        )}
      </form>
      {outcome && (
        <div className="space-y-4" role="status">
          <p className="text-base font-medium">
            {outcome === 'correct' ? (
              'Correct.'
            ) : (
              <>
                It is written <span className="font-semibold">{item.manglish}</span> — {item.meaning}.
              </>
            )}
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
