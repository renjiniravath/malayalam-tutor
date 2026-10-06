import type { Level } from '@/content/types';
import type { ReviewLogRecord } from '@/lib/fsrs/types';

/**
 * Per-sound mastery and the per-level can-do checklist (PLAN.md §7:
 * concrete states, not vague percentages). Everything here derives from
 * real review logs: a sound is mastered when every item tagged with it
 * has at least one passing (good or easy) review.
 */

export interface SoundMastery {
  tag: string;
  label: string;
  total: number;
  reviewed: number;
  mastered: boolean;
}

export interface CanDoState {
  statement: string;
  done: boolean;
}

const SOUND_LABELS: Record<string, string> = {
  'sound:zh': 'zh',
  'sound:coronal': 't sounds',
  'sound:geminate': 'doubled consonants',
  'sound:vowel-length': 'long vowels',
};

/** Mastery per sound:tag in the level, from passing review logs only. */
export function soundMastery(level: Level, logs: ReviewLogRecord[]): SoundMastery[] {
  const items = level.lessons.flatMap((lesson) => lesson.items);
  const passing = new Set(
    logs
      .filter((log) => log.rating === 'good' || log.rating === 'easy')
      .map((log) => log.itemId),
  );
  const tags = [...new Set(items.flatMap((item) => item.tags).filter((tag) => tag.startsWith('sound:')))];
  return tags.map((tag) => {
    const tagged = items.filter((item) => item.tags.includes(tag));
    const reviewed = tagged.filter((item) => passing.has(item.id)).length;
    return {
      tag,
      label: SOUND_LABELS[tag] ?? tag,
      total: tagged.length,
      reviewed,
      mastered: tagged.length > 0 && reviewed === tagged.length,
    };
  });
}

/**
 * The level's can-do checklist with real evidence:
 *  - the sound-classes statement is done when all four sound tags are
 *    mastered
 *  - the greetings statement is done when every unit-2 item has been
 *    reviewed at least once
 *  - the nouns/verbs/pronouns statement is done when every unit-3
 *    (pronouns) item has been reviewed; the noun and verb units are
 *    not authored yet, so this reflects what the course teaches today
 */
export function levelCanDo(level: Level, logs: ReviewLogRecord[]): CanDoState[] {
  const reviewedOnce = new Set(logs.map((log) => log.itemId));
  const unitReviewed = (unitId: string): boolean => {
    const items = level.lessons.filter((lesson) => lesson.unitId === unitId).flatMap((lesson) => lesson.items);
    return items.length > 0 && items.every((item) => reviewedOnce.has(item.id));
  };
  const sounds = soundMastery(level, logs);
  return level.canDo.map((statement, index) => ({
    statement,
    done:
      index === 0
        ? sounds.length > 0 && sounds.every((sound) => sound.mastered)
        : index === 1
          ? unitReviewed('l1u2')
          : unitReviewed('l1u3'),
  }));
}
