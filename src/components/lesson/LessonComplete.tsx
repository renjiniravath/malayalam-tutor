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
    <div className="mx-auto flex max-w-md flex-col gap-6 px-6 pb-6 pt-10">
      <h2 className="text-2xl font-semibold tracking-tight">Lesson complete</h2>
      <p className="text-stone-600 dark:text-stone-300">{lesson.title} — done.</p>
      <ul className="space-y-2 rounded-xl border border-stone-200 p-4 text-sm dark:border-stone-800">
        <li className="flex justify-between gap-4">
          <span className="text-stone-600 dark:text-stone-400">Words and sounds heard</span>
          <span className="font-medium">{lesson.items.length}</span>
        </li>
        <li className="flex justify-between gap-4">
          <span className="text-stone-600 dark:text-stone-400">Drill answers correct</span>
          <span className="font-medium">
            {correct} of {correct + wrong}
          </span>
        </li>
        {skipped > 0 && (
          <li className="flex justify-between gap-4">
            <span className="text-stone-600 dark:text-stone-400">Skipped (needed audio)</span>
            <span className="font-medium">{skipped}</span>
          </li>
        )}
      </ul>
      <div className="space-y-3">
        {nextLesson && (
          <Link
            href={`/lesson/${nextLesson.id}`}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-stone-900 px-7 text-base font-medium text-stone-50 outline-2 outline-offset-2 outline-stone-900 hover:bg-stone-700 focus-visible:outline active:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:outline-stone-100 dark:hover:bg-stone-300 dark:active:bg-stone-300"
          >
            Next lesson: {nextLesson.title}
          </Link>
        )}
        <Link
          href="/"
          className="inline-flex min-h-12 w-full items-center justify-center rounded-full border-2 border-stone-300 px-7 text-base font-medium text-stone-700 outline-2 outline-offset-2 outline-stone-900 hover:border-stone-400 focus-visible:outline active:bg-stone-100 dark:border-stone-700 dark:text-stone-300 dark:outline-stone-100 dark:hover:border-stone-600 dark:active:bg-stone-900"
        >
          Back to lessons
        </Link>
      </div>
    </div>
  )
}
