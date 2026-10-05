'use client'

/**
 * Lesson summary (M2): what was covered and how the drills went.
 * XP, streaks and review scheduling arrive with M3/M4 — nothing here
 * blocks progress.
 */

import Link from 'next/link'
import type { Lesson } from '@/content/types'
import type { Outcome } from '@/lib/lesson/steps'

export function LessonComplete({
  lesson,
  nextLesson,
  outcomes,
}: {
  lesson: Lesson
  nextLesson?: Lesson
  outcomes: Outcome[]
}) {
  const correct = outcomes.filter((o) => o === 'correct').length
  const wrong = outcomes.filter((o) => o === 'wrong').length
  const skipped = outcomes.filter((o) => o === 'skipped').length

  return (
    <div className="mx-auto grid w-full max-w-3xl animate-rise-in grid-cols-1 gap-8 px-6 pb-safe pt-12 md:grid-cols-12">
      <div className="space-y-6 md:col-span-7">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Lesson complete</h2>
          <p className="mt-2 text-stone-600 dark:text-stone-400">{lesson.title}. Done.</p>
        </div>
        <div className="space-y-3">
          {nextLesson && (
            <Link
              href={`/lesson/${nextLesson.id}`}
              className="inline-flex min-h-12 w-full max-w-xs items-center justify-center rounded-full bg-stone-900 px-7 text-base font-medium text-stone-50 outline-2 outline-offset-2 outline-stone-900 hover:bg-stone-700 focus-visible:outline active:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:outline-stone-100 dark:hover:bg-stone-300 dark:active:bg-stone-300"
            >
              Next lesson: {nextLesson.title}
            </Link>
          )}
          <Link
            href="/"
            className="inline-flex min-h-12 w-full max-w-xs items-center justify-center rounded-full border-2 border-stone-300 px-7 text-base font-medium text-stone-700 outline-2 outline-offset-2 outline-stone-900 hover:border-stone-400 focus-visible:outline active:bg-stone-100 dark:border-stone-700 dark:text-stone-300 dark:outline-stone-100 dark:hover:border-stone-600 dark:active:bg-stone-900"
          >
            Back to lessons
          </Link>
        </div>
      </div>
      <aside className="h-fit md:col-span-5 md:justify-self-end">
        <div className="rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-stone-600 dark:text-stone-400">Words and sounds heard</dt>
              <dd className="font-medium tabular-nums">{lesson.items.length}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-stone-600 dark:text-stone-400">Drill answers correct</dt>
              <dd className="font-medium tabular-nums text-amber-700 dark:text-amber-400">
                {correct} of {correct + wrong}
              </dd>
            </div>
            {skipped > 0 && (
              <div className="flex justify-between gap-4">
                <dt className="text-stone-600 dark:text-stone-400">Skipped (needed audio)</dt>
                <dd className="font-medium tabular-nums">{skipped}</dd>
              </div>
            )}
          </dl>
        </div>
      </aside>
    </div>
  )
}
