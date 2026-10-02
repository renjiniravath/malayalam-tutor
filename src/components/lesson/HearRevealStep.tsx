'use client'

/**
 * Hear-then-reveal step (PLAN.md §6 steps 1-2): audio plays first (slow),
 * romanization and script stay hidden until the item has been heard —
 * tap to reveal, or auto-reveal when the clip ends. Script appears
 * passively, styled secondary, with lang="ml". In silent mode or while
 * audio is not generated, the step becomes "think, then reveal" with a
 * visible state note. The a11y preference reveals text immediately.
 */

import { useState } from 'react'
import Image from 'next/image'
import type { Item } from '@/content/types'
import type { useLessonAudio } from '@/lib/audio/useLessonAudio'
import { usePreferences } from '@/lib/preferences'
import { SpeakerIcon } from '@/components/icons'
import { ArticulationView } from './ArticulationView'

type LessonAudio = ReturnType<typeof useLessonAudio>

function AudioStateBadge({ audio, silent }: { audio: LessonAudio; silent: boolean }) {
  if (silent)
    return (
      <span className="rounded-full bg-stone-200 px-3 py-1 text-xs font-medium text-stone-700 dark:bg-stone-800 dark:text-stone-300">
        Silent mode
      </span>
    )
  if (audio.state === 'loading')
    return (
      <span className="rounded-full bg-stone-200 px-3 py-1 text-xs font-medium text-stone-700 dark:bg-stone-800 dark:text-stone-300">
        Preparing audio…
      </span>
    )
  if (audio.unavailable)
    return (
      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-900 dark:bg-amber-950 dark:text-amber-200">
        Audio not generated yet
      </span>
    )
  return null
}

export function HearRevealStep({
  item,
  audio,
  onNext,
}: {
  item: Item
  audio: LessonAudio
  onNext: () => void
}) {
  const { prefs } = usePreferences()
  const [revealed, setRevealed] = useState(false)
  const [playing, setPlaying] = useState(false)

  const showGate = !prefs.revealTextImmediately && !revealed

  const hear = async (ref: string) => {
    setPlaying(true)
    const result = await audio.play(ref)
    setPlaying(false)
    if (result === 'played') setRevealed(true)
  }

  if (showGate) {
    return (
      <div className="flex flex-col items-center gap-8 px-6 pt-10 text-center">
        <AudioStateBadge audio={audio} silent={prefs.silent} />
        {item.image && (
          <Image
            src={`/images/${item.image}`}
            alt=""
            width={512}
            height={512}
            className="max-h-48 w-auto rounded-xl"
          />
        )}
        {audio.available ? (
          <button
            type="button"
            onClick={() => hear(item.audio.slow)}
            disabled={playing}
            aria-label={`Hear the sound for ${item.meaning}`}
            className="inline-flex size-32 items-center justify-center rounded-full border-2 border-stone-900 text-stone-900 outline-2 outline-offset-4 outline-stone-900 transition hover:bg-stone-900 hover:text-stone-50 focus-visible:outline active:scale-95 disabled:opacity-60 dark:border-stone-100 dark:text-stone-100 dark:outline-stone-100 dark:hover:bg-stone-100 dark:hover:text-stone-900"
          >
            {playing ? (
              <span className="text-lg font-medium">…</span>
            ) : (
              <SpeakerIcon />
            )}
          </button>
        ) : (
          <div className="text-stone-600 dark:text-stone-300">
            {prefs.silent
              ? 'Think of the sound, then reveal it.'
              : 'No sound yet — think of what this lesson teaches, then reveal.'}
          </div>
        )}
        <div className="space-y-2">
          <p className="text-stone-600 dark:text-stone-300">
            {playing
              ? 'Listening…'
              : audio.available
                ? 'Listen first. You will see the word after.'
                : 'Tap reveal to see the word.'}
          </p>
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-stone-300 px-7 text-base font-medium text-stone-700 outline-2 outline-offset-2 outline-stone-900 hover:border-stone-400 focus-visible:outline active:bg-stone-100 dark:border-stone-700 dark:text-stone-300 dark:outline-stone-100 dark:hover:border-stone-600 dark:active:bg-stone-900"
          >
            Reveal
          </button>
        </div>
      </div>
    )
  }

  return (
    <div aria-live="polite" className="mx-auto flex max-w-md flex-col gap-6 px-6 pb-6 pt-8">
      {audio.available && (
        <button
          type="button"
          onClick={() => hear(item.audio.normal)}
          disabled={playing}
          className="inline-flex min-h-12 w-fit items-center gap-2 rounded-full border border-stone-300 px-5 text-sm font-medium text-stone-700 outline-2 outline-offset-2 outline-stone-900 hover:border-stone-400 focus-visible:outline active:bg-stone-100 disabled:opacity-60 dark:border-stone-700 dark:text-stone-300 dark:outline-stone-100 dark:hover:border-stone-600 dark:active:bg-stone-900"
        >
          <SpeakerIcon />
          {playing ? 'Playing…' : 'Hear again'}
        </button>
      )}
      {item.image && (
        <Image
          src={`/images/${item.image}`}
          alt={item.meaning}
          width={512}
          height={512}
          className="max-h-48 w-auto rounded-xl"
        />
      )}
      <div>
        <p className="text-4xl font-semibold tracking-tight">{item.manglish}</p>
        {item.script && (
          <p className="mt-1 flex items-center gap-2">
            <span lang="ml" className="font-malayalam text-2xl text-stone-500 dark:text-stone-400">
              {item.script}
            </span>
            {item.scriptForm === 'written' && (
              <span className="rounded-full bg-stone-200 px-2 py-0.5 text-xs text-stone-600 dark:bg-stone-800 dark:text-stone-400">
                written form
              </span>
            )}
          </p>
        )}
      </div>
      <p className="text-lg text-stone-700 dark:text-stone-300">{item.meaning}</p>
      {item.articulation && <ArticulationView articulation={item.articulation} />}
      {item.notes && (
        <ul className="space-y-1 text-sm text-stone-500 dark:text-stone-400">
          {item.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      )}
      <button
        type="button"
        onClick={() => {
          audio.stop()
          onNext()
        }}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-stone-900 px-7 text-base font-medium text-stone-50 outline-2 outline-offset-2 outline-stone-900 hover:bg-stone-700 focus-visible:outline active:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:outline-stone-100 dark:hover:bg-stone-300 dark:active:bg-stone-300"
      >
        Next
      </button>
    </div>
  )
}
