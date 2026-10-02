'use client'

/**
 * Per-lesson audio state for the player. Reports sprite availability up
 * front (fetchable before the AudioContext is unlocked) and routes clip
 * playback through the shared engine, respecting silent mode.
 */

import { useEffect, useMemo, useState } from 'react'
import type { Lesson } from '@/content/types'
import { audioEngine, type PlayStatus } from './engine'
import { usePreferences } from '@/lib/preferences'

export type AudioState = 'silent' | 'loading' | 'ready' | 'missing' | 'error'

export type PlayResult = PlayStatus | 'silent'

export function useLessonAudio(lesson: Lesson) {
  const { prefs } = usePreferences()
  const [prepared, setPrepared] = useState<AudioState>('loading')

  useEffect(() => {
    if (prefs.silent) return
    let cancelled = false
    audioEngine
      .prepareLesson(lesson.id, lesson.sprite.file)
      .then((status) => {
        if (!cancelled) setPrepared(status)
      })
    return () => {
      cancelled = true
    }
  }, [lesson, prefs.silent])

  const state: AudioState = prefs.silent ? 'silent' : prepared

  return useMemo(
    () => ({
      state,
      available: state === 'ready',
      unavailable: state === 'missing' || state === 'error',
      play: (ref: string): Promise<PlayResult> =>
        prefs.silent ? Promise.resolve('silent') : audioEngine.playClip(lesson.id, ref),
      stop: () => audioEngine.stopAll(),
    }),
    [state, lesson.id, prefs.silent],
  )
}
