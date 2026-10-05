'use client'

/**
 * Home link to the daily review (PLAN.md §7), shown only when due cards
 * exist. The count is read from the local-first store.
 */

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getStore } from '@/lib/store/singleton'

export function ReviewLink() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let alive = true
    void getStore().countDue(new Date()).then((n) => alive && setCount(n))
    return () => {
      alive = false
    }
  }, [])

  if (count === 0) return null

  return (
    <Link
      href="/review"
      className="inline-flex min-h-11 items-center rounded-full border-2 border-stone-200 px-4 text-sm font-medium text-stone-700 outline-2 outline-offset-2 outline-stone-900 hover:border-stone-400 focus-visible:outline active:bg-stone-100 dark:border-stone-800 dark:text-stone-300 dark:outline-stone-100 dark:hover:border-stone-600 dark:active:bg-stone-900"
    >
      Daily review ({count})
    </Link>
  )
}
