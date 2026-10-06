/**
 * XP persistence: award XP for a real event and store the new state.
 * Pure scheduling lives in xp.ts; this is the store side.
 */

import { getStore } from '@/lib/store/singleton'
import { addXp, EMPTY_XP, type XpState } from './xp'

export async function awardXp(amount: number): Promise<XpState> {
  const store = getStore()
  const next = addXp((await store.getXp()) ?? EMPTY_XP, amount)
  await store.putXp(next)
  return next
}
