'use client'

/**
 * Lesson player (PLAN.md §6). Intro screen doubles as the audio unlock
 * gate (first tap creates the shared AudioContext); then hear-reveal
 * steps for every item, then the authored drills, then a summary.
 * Works end to end with no audio: playback is skipped gracefully and
 * every affected state says so.
 *
 * Design read (design-taste-frontend, Overhaul): warm neutral product
 * language for a mobile-first learner, one kasavu-gold accent, layered
 * dark surfaces, light gated motion. Dials: DESIGN_VARIANCE 7 (split
 * intro, left-aligned steps), MOTION_INTENSITY 4 (entry transitions,
 * transform/opacity only, reduced-motion gated), VISUAL_DENSITY 4
 * (step readouts and lesson meta).
 */

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { Lesson } from '@/content/types'
import { buildSteps, type Outcome, type Step } from '@/lib/lesson/steps'
import { audioEngine } from '@/lib/audio/engine'
import { useLessonAudio, type AudioState } from '@/lib/audio/useLessonAudio'
import { usePreferences } from '@/lib/preferences'
import { recordReview } from '@/lib/fsrs/client'
import { getStore } from '@/lib/store/singleton'
import { drillTargets } from '@/lib/fsrs/targets'
import { earn, recordLearningActivity } from '@/lib/progress/learning'
import { awardXp } from '@/lib/xp/award'
import { XP_AMOUNTS } from '@/lib/xp/xp'
import { PreferencesButton } from '@/components/PreferencesDialog'
import { ReviewStep } from '@/components/review/ReviewStep'
import { BackIcon } from '@/components/icons'
import { DrillStep } from './DrillStep'
import { HearRevealStep } from './HearRevealStep'
import { LessonComplete } from './LessonComplete'

/** The audio status as a quiet line, never an alert pill. */
function AudioNote({ audioState, silent }: { audioState: AudioState; silent: boolean }) {
  if (silent) return <p className="text-xs text-stone-500 dark:text-stone-400">Silent mode is on.</p>
  if (audioState === 'loading')
    return <p className="text-xs text-stone-500 dark:text-stone-400">Preparing audio.</p>
  return (
    <p className="text-xs text-stone-500 dark:text-stone-400">
      Audio is on its way. This lesson runs without sound for now.
    </p>
  )
}

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
    <div className="mx-auto grid min-h-dvh w-full max-w-3xl grid-cols-1 content-start gap-8 px-6 pt-16 md:grid-cols-12 md:pt-24">
      <div className="space-y-6 md:col-span-7">
        <h2 className="animate-rise-in max-w-prose text-3xl font-bold tracking-tight text-balance md:text-4xl">
          {lesson.title}
        </h2>
        <p className="animate-rise-in max-w-prose text-lg text-stone-600 text-balance [animation-delay:80ms] dark:text-stone-300">
          {lesson.items.length} items. You will hear each sound first, then see it.
        </p>
        <button
          type="button"
          onClick={onStart}
          className="animate-rise-in inline-flex min-h-14 w-full max-w-xs items-center justify-center rounded-full bg-stone-900 px-7 text-lg font-medium text-stone-50 outline-2 outline-offset-2 outline-stone-900 hover:bg-stone-700 focus-visible:outline active:bg-stone-700 [animation-delay:160ms] dark:bg-stone-100 dark:text-stone-900 dark:outline-stone-100 dark:hover:bg-stone-300 dark:active:bg-stone-300"
        >
          {silent ? 'Start lesson' : 'Tap to start'}
        </button>
        {!silent && (
          <p className="text-sm text-stone-500 dark:text-stone-400">Sound plays on your first tap.</p>
        )}
      </div>
      <aside className="animate-rise-in h-fit md:col-span-5 md:justify-self-end md:pt-2 [animation-delay:200ms]">
        <div className="space-y-4 rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
          <p className="text-sm font-medium text-stone-500 dark:text-stone-400">About this lesson</p>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-stone-600 dark:text-stone-400">Items</dt>
              <dd className="font-medium tabular-nums">{lesson.items.length}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-stone-600 dark:text-stone-400">Drills</dt>
              <dd className="font-medium tabular-nums">{lesson.drills.length}</dd>
            </div>
          </dl>
          <AudioNote audioState={audioState} silent={silent} />
        </div>
      </aside>
    </div>
  )
}

export function LessonPlayer({ lesson, nextLesson }: { lesson: Lesson; nextLesson?: Lesson }) {
  const { prefs, setPref } = usePreferences()
  const audio = useLessonAudio(lesson)
  const allSteps = useMemo(() => buildSteps(lesson), [lesson])
  /** Built on start, once due review cards are known (PLAN.md §7 injection). */
  const [steps, setSteps] = useState<Step[] | null>(null)
  /** -1 = intro, steps.length = complete */
  const [stepIndex, setStepIndex] = useState(-1)
  const [outcomes, setOutcomes] = useState<Outcome[]>([])

  const start = async () => {
    if (!prefs.silent) audioEngine.unlock()
    const due = lesson.reviewSlots > 0 ? await getStore().listDue(new Date(), lesson.reviewSlots) : []
    setSteps(buildSteps(lesson, due))
    setStepIndex(0)
  }

  const advance = (outcome?: Outcome) => {
    audio.stop()
    if (outcome) setOutcomes((prev) => [...prev, outcome])
    const step = steps?.[stepIndex]
    if (step?.kind === 'drill' && (outcome === 'correct' || outcome === 'wrong')) {
      // Auto-scored drills grade their {itemId, skill} cards; self-assessed
      // drills are logged by the session, never scheduled (PLAN.md §7).
      const pairItems = (pairId: string): [string, string] | null => {
        const pair = lesson.pairs.find((p) => p.id === pairId)
        return pair ? [pair.aItemId, pair.bItemId] : null
      }
      for (const target of drillTargets(step.spec, pairItems)) {
        void recordReview(target.itemId, target.skill, outcome === 'correct' ? 'good' : 'again').catch(
          console.error,
        )
      }
    }
    setStepIndex((index) => index + 1)
    const allOutcomes = outcome ? [...outcomes, outcome] : outcomes
    const finished = stepIndex + 1 >= (steps?.length ?? allSteps.length)
    if (finished) {
      // Achievements, streaks, and XP run on real events (PLAN.md §8).
      if (allOutcomes.length > 0 && !allOutcomes.includes('wrong')) {
        void earn('perfectLesson').catch(console.error)
      }
      void recordLearningActivity().catch(console.error)
      void awardXp(XP_AMOUNTS.lesson).catch(console.error)
      void getStore().putLesson({ id: lesson.id, completedAt: Date.now() }).catch(console.error)
    }
  }

  const header = (
    <header className="border-b border-stone-200 dark:border-stone-800">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3 px-4 pt-safe">
        <Link
          href="/"
          aria-label="Back to lessons"
          className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-full text-stone-700 outline-2 outline-offset-2 outline-stone-900 hover:bg-stone-200/70 focus-visible:outline active:bg-stone-300/70 dark:text-stone-300 dark:outline-stone-100 dark:hover:bg-stone-800/70 dark:active:bg-stone-700/70"
        >
          <BackIcon />
        </Link>
        <h1 className="min-w-0 truncate text-base font-semibold">{lesson.title}</h1>
        <PreferencesButton />
      </div>
    </header>
  )

  if (stepIndex === -1) {
    return (
      <>
        {header}
        <IntroScreen lesson={lesson} audioState={audio.state} silent={prefs.silent} onStart={() => void start()} />
      </>
    )
  }

  const activeSteps = steps ?? allSteps

  if (stepIndex >= activeSteps.length) {
    return (
      <>
        {header}
        <LessonComplete lesson={lesson} nextLesson={nextLesson} outcomes={outcomes} />
      </>
    )
  }

  const step = activeSteps[stepIndex]

  return (
    <>
      {header}
      <div className="mx-auto w-full max-w-3xl px-4 pt-3">
        <div className="flex items-center gap-3">
          <div
            className="h-1 flex-1 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800"
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={activeSteps.length}
            aria-valuenow={stepIndex + 1}
            aria-label="Lesson progress"
          >
            <div
              className="h-full rounded-full bg-amber-600 transition-[width] motion-reduce:transition-none dark:bg-amber-400"
              style={{ width: `${((stepIndex + 1) / activeSteps.length) * 100}%` }}
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
          <span className="shrink-0 text-xs font-medium tabular-nums text-stone-500 dark:text-stone-400">
            {stepIndex + 1} / {activeSteps.length}
          </span>
        </div>
      </div>
      {step.kind === 'hear' ? (
        <HearRevealStep key={step.key} item={step.item} audio={audio} onNext={() => advance()} />
      ) : step.kind === 'review' ? (
        <ReviewStep key={step.key} cardKey={step.cardKey} onDone={() => advance('done')} />
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
