'use client'

/**
 * Sentence-builder drill (PLAN.md §6, M5): assemble the sentence from a
 * word bank. Tapping a bank token appends it to the answer; tapping an
 * answer token returns it. The check compares the joined answer against
 * the accepted orders with the same forgiving matching as typing.
 */

import { useMemo, useState } from 'react'
import type { Item } from '@/content/types'
import type { useLessonAudio } from '@/lib/audio/useLessonAudio'
import type { Outcome } from '@/lib/lesson/steps'
import { matchesInput } from '@/lib/lesson/normalize'
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

export function SentenceBuilderDrill({
  item,
  bank,
  acceptedInputs,
  audio,
  onDone,
}: {
  item: Item
  bank: string[]
  acceptedInputs?: string[]
  audio: LessonAudio
  onDone: (outcome: Outcome) => void
}) {
  const { prefs } = usePreferences()
  const [playing, setPlaying] = useState(false)
  const [answer, setAnswer] = useState<string[]>([])
  const [outcome, setOutcome] = useState<Outcome | null>(null)
  const [checked, setChecked] = useState<string | null>(null)

  const bankOrder = useMemo(() => shuffle(bank), [bank])

  const unused = bankOrder.filter((token) => !answer.includes(token))

  const add = (token: string) => {
    if (outcome) return
    setAnswer((prev) => [...prev, token])
  }

  const remove = (index: number) => {
    if (outcome) return
    setAnswer((prev) => prev.filter((_, i) => i !== index))
  }

  const hear = async () => {
    setPlaying(true)
    await audio.play(item.audio.slow)
    setPlaying(false)
  }

  const check = () => {
    if (outcome || answer.length === 0) return
    const sentence = answer.join(' ')
    const accepted = [...(acceptedInputs ?? []), item.manglish]
    const correct = matchesInput(sentence, accepted)
    setChecked(sentence)
    setOutcome(correct ? 'correct' : 'wrong')
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl animate-rise-in flex-col gap-5 px-6 pb-safe pt-8">
      <h2 className="text-lg font-semibold">Build the sentence</h2>
      <div className="flex flex-col items-center gap-3 rounded-xl border border-stone-200 p-5 dark:border-stone-800">
        {audio.available ? (
          <button
            type="button"
            onClick={hear}
            disabled={playing}
            aria-label="Hear the sentence"
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-stone-900 px-6 text-stone-50 outline-2 outline-offset-2 outline-stone-900 hover:bg-stone-700 focus-visible:outline active:bg-stone-700 disabled:opacity-60 dark:bg-stone-100 dark:text-stone-900 dark:outline-stone-100 dark:hover:bg-stone-300 dark:active:bg-stone-300"
          >
            <SpeakerIcon />
            {playing ? 'Playing…' : 'Tap to hear'}
          </button>
        ) : (
          <p className="text-xs text-stone-500 dark:text-stone-400">
            {prefs.silent ? 'Silent mode is on.' : 'Audio is on its way.'}
          </p>
        )}
        <p className="text-lg text-stone-700 dark:text-stone-300">Say: {item.meaning}</p>
      </div>

      <div
        className="flex min-h-20 flex-wrap items-start gap-2 rounded-xl border-2 border-dashed border-stone-300 p-3 dark:border-stone-700"
        role="group"
        aria-label="Your sentence"
      >
        {answer.length === 0 ? (
          <span className="py-3 text-sm text-stone-400 dark:text-stone-600">Tap the words below.</span>
        ) : (
          answer.map((token, index) => (
            <button
              key={`${token}-${index}`}
              type="button"
              onClick={() => remove(index)}
              disabled={outcome !== null}
              aria-label={`${token}. Tap to send back to the bank.`}
              title="Send back to the bank"
              className="inline-flex min-h-11 items-center rounded-full border-2 border-dashed border-amber-700 px-4 text-sm font-medium text-amber-700 outline-2 outline-offset-2 outline-stone-900 hover:bg-amber-50 focus-visible:outline active:bg-amber-100 dark:border-amber-400 dark:text-amber-400 dark:outline-stone-100 dark:hover:bg-amber-950 dark:active:bg-amber-900"
            >
              {token}
            </button>
          ))
        )}
      </div>
      <p className="-mt-3 text-xs text-stone-500 dark:text-stone-400">
        Tap an assembled word to send it back to the bank.
      </p>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Word bank">
        {unused.map((token) => (
          <button
            key={token}
            type="button"
            onClick={() => add(token)}
            disabled={outcome !== null}
            className="inline-flex min-h-11 items-center rounded-full border-2 border-stone-300 px-4 text-sm font-medium text-stone-700 outline-2 outline-offset-2 outline-stone-900 hover:border-stone-400 focus-visible:outline active:bg-stone-100 dark:border-stone-700 dark:text-stone-300 dark:outline-stone-100 dark:hover:border-stone-600 dark:active:bg-stone-900"
          >
            {token}
          </button>
        ))}
      </div>

      {!outcome && (
        <button
          type="button"
          onClick={check}
          disabled={answer.length === 0}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-stone-900 px-7 text-base font-medium text-stone-50 outline-2 outline-offset-2 outline-stone-900 hover:bg-stone-700 focus-visible:outline active:bg-stone-700 disabled:opacity-50 dark:bg-stone-100 dark:text-stone-900 dark:outline-stone-100 dark:hover:bg-stone-300 dark:active:bg-stone-300"
        >
          Check
        </button>
      )}

      {outcome && (
        <div className="space-y-4" role="status">
          <p className="text-base font-medium">
            {outcome === 'correct' ? (
              'Correct.'
            ) : (
              <>
                Not quite. It is <span className="font-semibold">{item.manglish}</span>.
              </>
            )}
          </p>
          {checked && checked !== item.manglish && outcome === 'wrong' && (
            <p className="text-sm text-stone-500 dark:text-stone-400">You wrote: {checked}</p>
          )}
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
