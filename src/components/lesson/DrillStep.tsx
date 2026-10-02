'use client'

/**
 * Dispatches a DrillSpec to its drill component. Drill kinds not shipped
 * yet (image drills, sentence builder, dialogue, speak-and-compare) show
 * a plain placeholder so authored content never breaks the player.
 */

import type { DrillSpec, Item, Lesson, MinimalPair } from '@/content/types'
import type { useLessonAudio } from '@/lib/audio/useLessonAudio'
import type { Outcome } from '@/lib/lesson/steps'
import { itemById } from '@/lib/lesson/steps'
import { AnticipationDrill } from './drills/AnticipationDrill'
import { MinimalPairDrill } from './drills/MinimalPairDrill'
import { MultipleChoiceDrill } from './drills/MultipleChoiceDrill'
import { TypingDrill } from './drills/TypingDrill'

type LessonAudio = ReturnType<typeof useLessonAudio>

function pairById(lesson: Lesson, pairId: string): MinimalPair {
  const pair = lesson.pairs.find((p) => p.id === pairId)
  if (!pair) throw new Error(`unknown pair id: ${pairId}`)
  return pair
}

export function DrillStep({
  lesson,
  spec,
  audio,
  onDone,
}: {
  lesson: Lesson
  spec: DrillSpec
  audio: LessonAudio
  onDone: (outcome: Outcome) => void
}) {
  const item = (id: string): Item => itemById(lesson, id)

  switch (spec.kind) {
    case 'multipleChoice':
      return (
        <MultipleChoiceDrill
          lesson={lesson}
          item={item(spec.itemId)}
          distractors={spec.distractors}
          audio={audio}
          onDone={onDone}
        />
      )
    case 'minimalPair': {
      const pair = pairById(lesson, spec.pairId)
      return (
        <MinimalPairDrill
          pair={pair}
          itemA={item(pair.aItemId)}
          itemB={item(pair.bItemId)}
          audio={audio}
          onDone={onDone}
        />
      )
    }
    case 'typing':
      return (
        <TypingDrill
          item={item(spec.itemId)}
          acceptedInputs={spec.acceptedInputs}
          audio={audio}
          onDone={onDone}
        />
      )
    case 'anticipation':
      return (
        <AnticipationDrill
          item={item(spec.itemId)}
          tier={spec.tier}
          audio={audio}
          onDone={onDone}
        />
      )
    default:
      return (
        <div className="mx-auto flex max-w-md flex-col gap-5 px-6 pb-6 pt-8">
          <h2 className="text-lg font-semibold">Drill</h2>
          <p className="text-stone-600 dark:text-stone-300">
            This drill type arrives in a later part of the course.
          </p>
          <button
            type="button"
            onClick={() => onDone('skipped')}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-stone-900 px-7 text-base font-medium text-stone-50 outline-2 outline-offset-2 outline-stone-900 hover:bg-stone-700 focus-visible:outline active:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:outline-stone-100 dark:hover:bg-stone-300 dark:active:bg-stone-300"
          >
            Continue
          </button>
        </div>
      )
  }
}
