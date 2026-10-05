'use client'

/**
 * FSRS review session (PLAN.md §7): due cards, one at a time. The learner
 * recalls the answer, reveals it, then rates the four-grade ladder
 * (Again / Hard / Good / Easy). Every rating schedules the next review
 * with ts-fsrs and persists the review log to IndexedDB.
 */

import { useEffect, useState } from 'react'
import { LEVELS } from '@/content/levels'
import type { Item } from '@/content/types'
import type { CardRecord } from '@/lib/store/db'
import { getStore, recordReview } from '@/lib/fsrs/client'
import type { Grade, Skill } from '@/lib/fsrs/scheduler'

/** ~10 minutes of due cards per day; overflow rolls over (PLAN.md §7). */
export const REVIEW_CAP = 10

const ALL_ITEMS = new Map<string, Item>(
  LEVELS.flatMap((level) => level.lessons)
    .flatMap((lesson) => lesson.items)
    .map((item) => [item.id, item]),
)

const GRADES: { grade: Grade; label: string }[] = [
  { grade: 'again', label: 'Again' },
  { grade: 'hard', label: 'Hard' },
  { grade: 'good', label: 'Good' },
  { grade: 'easy', label: 'Easy' },
]

function Prompt({ card, item }: { card: CardRecord; item: Item }) {
  if (card.skill === 'production') {
    return (
      <div className="text-center">
        <p className="text-xs font-semibold tracking-wide text-amber-700 dark:text-amber-400">
          Say it in Malayalam
        </p>
        <p className="mt-4 text-2xl font-medium">{item.meaning}</p>
      </div>
    )
  }
  return (
    <div className="text-center">
      <p className="text-xs font-semibold tracking-wide text-amber-700 dark:text-amber-400">
        What does it mean?
      </p>
      <p className="mt-4 text-4xl font-semibold tracking-tight">{item.manglish}</p>
    </div>
  )
}

function Answer({ card, item }: { card: CardRecord; item: Item }) {
  if (card.skill === 'production') {
    return (
      <div className="text-center">
        <p className="text-4xl font-semibold tracking-tight">{item.manglish}</p>
        {item.script && (
          <p lang="ml" className="mt-1 font-malayalam text-2xl text-stone-500 dark:text-stone-400">
            {item.script}
          </p>
        )}
      </div>
    )
  }
  return <p className="text-center text-2xl font-medium">{item.meaning}</p>
}

export function ReviewSession({
  cardKeys,
  onDone,
}: {
  cardKeys: readonly string[]
  onDone: () => void
}) {
  const [cards, setCards] = useState<CardRecord[] | null>(null)
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [graded, setGraded] = useState(false)
  const [reviewedCount, setReviewedCount] = useState(0)

  useEffect(() => {
    let alive = true
    const load = async () => {
      const store = getStore()
      const loaded = (await Promise.all(cardKeys.map((key) => store.getCard(key)))).filter(
        (c): c is CardRecord => c !== undefined,
      )
      if (alive) setCards(loaded)
    }
    void load()
    return () => {
      alive = false
    }
  }, [cardKeys])

  if (cards === null) {
    return <p className="px-6 pt-8 text-center text-stone-500 dark:text-stone-400">Preparing your review.</p>
  }
  if (cards.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-6 pt-16 text-center">
        <p className="text-lg text-stone-600 dark:text-stone-300">Nothing due right now.</p>
        <button
          type="button"
          onClick={onDone}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-stone-900 px-7 text-base font-medium text-stone-50 outline-2 outline-offset-2 outline-stone-900 hover:bg-stone-700 focus-visible:outline active:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:outline-stone-100 dark:hover:bg-stone-300 dark:active:bg-stone-300"
        >
          Continue
        </button>
      </div>
    )
  }

  const card = cards[index]
  const item = ALL_ITEMS.get(card.itemId)

  const grade = (grade: Grade) => {
    if (graded || !item) return
    setGraded(true)
    void recordReview(item.id, card.skill as Skill, grade).catch(console.error)
  }

  const next = () => {
    if (index + 1 >= cards.length) {
      onDone()
      return
    }
    setReviewedCount((n) => n + 1)
    setIndex((i) => i + 1)
    setRevealed(false)
    setGraded(false)
  }

  if (!item) {
    // A card whose item no longer exists is skipped; reconciliation
    // (contentRevision) archives it on the next pass.
    void next()
    return null
  }

  return (
    <div aria-live="polite" className="mx-auto flex w-full max-w-2xl animate-rise-in flex-col gap-6 px-6 pb-safe pt-8">
      <div className="flex items-center justify-between text-xs font-medium tabular-nums text-stone-500 dark:text-stone-400">
        <span>
          {card.skill === 'production' ? 'Production' : 'Recognition'} review
        </span>
        <span>
          {index + 1} / {cards.length}
        </span>
      </div>
      <div className="rounded-2xl border border-stone-200 bg-white p-8 dark:border-stone-800 dark:bg-stone-900">
        <Prompt card={card} item={item} />
      </div>
      {!revealed ? (
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-full border-2 border-stone-300 px-7 text-base font-medium text-stone-700 outline-2 outline-offset-2 outline-stone-900 hover:border-stone-400 focus-visible:outline active:bg-stone-100 dark:border-stone-700 dark:text-stone-300 dark:outline-stone-100 dark:hover:border-stone-600 dark:active:bg-stone-900"
        >
          Reveal
        </button>
      ) : (
        <>
          <Answer card={card} item={item} />
          <div role="group" aria-label="How well did you remember?" className="grid grid-cols-4 gap-2">
            {GRADES.map(({ grade: g, label }) => (
              <button
                key={g}
                type="button"
                onClick={() => grade(g)}
                disabled={graded}
                className={`inline-flex min-h-12 items-center justify-center rounded-full border-2 px-2 text-sm font-medium outline-2 outline-offset-2 outline-stone-900 focus-visible:outline disabled:opacity-60 dark:outline-stone-100 ${
                  g === 'good'
                    ? 'border-amber-700 text-amber-700 hover:bg-amber-50 dark:border-amber-400 dark:text-amber-400 dark:hover:bg-amber-950'
                    : 'border-stone-300 text-stone-700 hover:border-stone-400 dark:border-stone-700 dark:text-stone-300 dark:hover:border-stone-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </>
      )}
      {graded && (
        <div className="space-y-4" role="status">
          <p className="text-base font-medium">Scheduled.</p>
          <button
            type="button"
            onClick={next}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-stone-900 px-7 text-base font-medium text-stone-50 outline-2 outline-offset-2 outline-stone-900 hover:bg-stone-700 focus-visible:outline active:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:outline-stone-100 dark:hover:bg-stone-300 dark:active:bg-stone-300"
          >
            {index + 1 >= cards.length ? `Done (${reviewedCount + 1} reviewed)` : 'Continue'}
          </button>
        </div>
      )}
    </div>
  )
}
