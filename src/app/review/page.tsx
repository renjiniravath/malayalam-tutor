'use client'

/**
 * Daily review (PLAN.md §7): a "do you remember this?" session over the
 * due FSRS cards, capped at ~10 minutes — overflow rolls over. Answers
 * are graded on the four-point ladder; every grade schedules the next
 * review and persists the ts-fsrs log to IndexedDB.
 */

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { BackIcon } from '@/components/icons'
import { PreferencesButton } from '@/components/PreferencesDialog'
import { REVIEW_CAP, ReviewSession } from '@/components/review/ReviewSession'
import { getStore } from '@/lib/fsrs/client'

export default function ReviewPage() {
  const [keys, setKeys] = useState<string[] | null>(null)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    let alive = true
    void getStore()
      .listDue(new Date(), REVIEW_CAP)
      .then((cards) => alive && setKeys(cards.map((card) => card.key)))
    return () => {
      alive = false
    }
  }, [])

  return (
    <main className="min-h-dvh pb-safe">
      <header className="border-b border-stone-200 dark:border-stone-800">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3 px-4 pt-safe">
          <Link
            href="/"
            aria-label="Back to lessons"
            className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-full text-stone-700 outline-2 outline-offset-2 outline-stone-900 hover:bg-stone-200/70 focus-visible:outline active:bg-stone-300/70 dark:text-stone-300 dark:outline-stone-100 dark:hover:bg-stone-800/70 dark:active:bg-stone-700/70"
          >
            <BackIcon />
          </Link>
          <h1 className="text-base font-semibold">Daily review</h1>
          <PreferencesButton />
        </div>
      </header>
      {finished ? (
        <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-6 pt-16 text-center">
          <h2 className="text-2xl font-semibold tracking-tight">Review done</h2>
          <p className="text-stone-600 dark:text-stone-300">
            Every card is scheduled for its next visit.
          </p>
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-stone-900 px-7 text-base font-medium text-stone-50 outline-2 outline-offset-2 outline-stone-900 hover:bg-stone-700 focus-visible:outline active:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:outline-stone-100 dark:hover:bg-stone-300 dark:active:bg-stone-300"
          >
            Back to lessons
          </Link>
        </div>
      ) : keys === null ? (
        <p className="px-6 pt-8 text-center text-stone-500 dark:text-stone-400">Preparing your review.</p>
      ) : keys.length === 0 ? (
        <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-6 pt-16 text-center">
          <h2 className="text-2xl font-semibold tracking-tight">Nothing due right now</h2>
          <p className="text-stone-600 dark:text-stone-300">
            Cards come back on their own schedule. Keep going through the lessons.
          </p>
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-stone-900 px-7 text-base font-medium text-stone-50 outline-2 outline-offset-2 outline-stone-900 hover:bg-stone-700 focus-visible:outline active:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:outline-stone-100 dark:hover:bg-stone-300 dark:active:bg-stone-300"
          >
            Back to lessons
          </Link>
        </div>
      ) : (
        <ReviewSession cardKeys={keys} onDone={() => setFinished(true)} />
      )}
    </main>
  )
}
