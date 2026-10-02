'use client'

/**
 * Lesson player (PLAN.md §6). Intro screen doubles as the audio unlock
 * gate (first tap creates the shared AudioContext); then hear-reveal
 * steps for every item, then the authored drills, then a summary.
 * Works end to end with no audio: playback is skipped gracefully and
 * every affected state says so.
 */

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { Lesson } from '@/content/types'
import { buildSteps, type Outcome } from '@/lib/lesson/steps'
import { audioEngine } from '@/lib/audio/engine'
import { useLessonAudio, type AudioState } from '@/lib/audio/useLessonAudio'
import { usePreferences } from '@/lib/preferences'
import { PreferencesButton } from '@/components/PreferencesDialog'
import { BackIcon } from '@/components/icons'
import { DrillStep } from './DrillStep'
import { HearRevealStep } from './HearRevealStep'
import { LessonComplete } from './LessonComplete'

function IntroScreen({
  lesson,
  audioState,
  silent,
  onStart,
}: {
  lesson: Lesson
  audioState: AudioState
  silent: boolean
  onStart: () => void
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-6 px-6 pt-10 text-center">
      <h2 className="text-2xl font-semibold tracking-tight">{lesson.title}</h2>
      <p className="text-stone-600 text-balance dark:text-stone-300">
        {lesson.items.length} items. You will hear each sound first, then see it.
      </p>
      {audioState === 'loading' && (
        <span className="rounded-full bg-stone-200 px-3 py-1 text-xs font-medium text-stone-700 dark:bg-stone-800 dark:text-stone-300">
          Preparing audio…
        </span>
      )}
      {(audioState === 'missing' || audioState === 'error') && (
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-900 dark:bg-amber-950 dark:text-amber-200">
          Audio not generated yet — this lesson runs silently
        </span>
      )}
      {silent && (
        <span className="rounded-full bg-stone-200 px-3 py-1 text-xs font-medium text-stone-700 dark:bg-stone-800 dark:text-stone-300">
          Silent mode is on
        </span>
      )}
      <button
        type="button"
        onClick={onStart}
        className="inline-flex min-h-14 w-full max-w-xs items-center justify-center rounded-full bg-stone-900 px-7 text-lg font-medium text-stone-50 outline-2 outline-offset-2 outline-stone-900 hover:bg-stone-700 focus-visible:outline active:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:outline-stone-100 dark:hover:bg-stone-300 dark:active:bg-stone-300"
      >
        {silent ? 'Start lesson' : 'Tap to start'}
      </button>
      {!silent && (
        <p className="text-sm text-stone-500 dark:text-stone-400">
          Sound plays on your first tap.
        </p>
      )}
    </div>
  )
}

export function LessonPlayer({ lesson, nextLesson }: { lesson: Lesson; nextLesson?: Lesson }) {
  const { prefs, setPref } = usePreferences()
  const audio = useLessonAudio(lesson)
  const steps = useMemo(() => buildSteps(lesson), [lesson])
  /** -1 = intro, steps.length = complete */
  const [stepIndex, setStepIndex] = useState(-1)
  const [outcomes, setOutcomes] = useState<Outcome[]>([])

  const start = () => {
    if (!prefs.silent) audioEngine.unlock()
    setStepIndex(0)
  }

  const advance = (outcome?: Outcome) => {
    audio.stop()
    if (outcome) setOutcomes((prev) => [...prev, outcome])
    setStepIndex((index) => index + 1)
  }

  if (stepIndex === -1) {
    return (
      <>
        <header className="mx-auto flex w-full max-w-md items-center justify-between px-4 pt-safe">
          <Link
            href="/"
            aria-label="Back to lessons"
            className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-full text-stone-700 outline-2 outline-offset-2 outline-stone-900 hover:bg-stone-200/70 focus-visible:outline active:bg-stone-300/70 dark:text-stone-300 dark:outline-stone-100 dark:hover:bg-stone-800/70 dark:active:bg-stone-700/70"
          >
            <BackIcon />
          </Link>
          <h1 className="text-base font-semibold">{lesson.title}</h1>
          <PreferencesButton />
        </header>
        <IntroScreen
          lesson={lesson}
          audioState={audio.state}
          silent={prefs.silent}
          onStart={start}
        />
      </>
    )
  }

  if (stepIndex >= steps.length) {
    return (
      <LessonComplete lesson={lesson} nextLesson={nextLesson} outcomes={outcomes} />
    )
  }

  const step = steps[stepIndex]

  return (
    <>
      <header className="mx-auto w-full max-w-md px-4 pt-safe">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            aria-label="Back to lessons"
            className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-full text-stone-700 outline-2 outline-offset-2 outline-stone-900 hover:bg-stone-200/70 focus-visible:outline active:bg-stone-300/70 dark:text-stone-300 dark:outline-stone-100 dark:hover:bg-stone-800/70 dark:active:bg-stone-700/70"
          >
            <BackIcon />
          </Link>
          <h1 className="text-base font-semibold">{lesson.title}</h1>
          <PreferencesButton />
        </div>
        <div className="mt-1 flex items-center gap-3">
          <div
            className="h-1.5 flex-1 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800"
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={steps.length}
            aria-valuenow={stepIndex + 1}
            aria-label="Lesson progress"
          >
            <div
              className="h-full rounded-full bg-stone-900 transition-[width] motion-reduce:transition-none dark:bg-stone-100"
              style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
            />
          </div>
          <button
            type="button"
            onClick={() => setPref('silent', !prefs.silent)}
            aria-pressed={prefs.silent}
            className={`inline-flex min-h-11 shrink-0 items-center rounded-full border px-3 text-xs font-medium outline-2 outline-offset-2 outline-stone-900 focus-visible:outline dark:outline-stone-100 ${
              prefs.silent
                ? 'border-stone-900 bg-stone-900 text-stone-50 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900'
                : 'border-stone-300 text-stone-600 hover:border-stone-400 dark:border-stone-700 dark:text-stone-400 dark:hover:border-stone-600'
            }`}
          >
            Silent
          </button>
        </div>
      </header>
      {step.kind === 'hear' ? (
        <HearRevealStep key={step.key} item={step.item} audio={audio} onNext={() => advance()} />
      ) : (
        <DrillStep
          key={step.key}
          lesson={lesson}
          spec={step.spec}
          audio={audio}
          onDone={advance}
        />
      )}
    </>
  )
}
