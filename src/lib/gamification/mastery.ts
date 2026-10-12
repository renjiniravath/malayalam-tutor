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
 *  - a statement is done when every item of the unit that teaches it has
 *    been reviewed at least once
 *  - Level 1's first line is the sound classes instead: done when all four
 *    sound tags are mastered. Its greetings line rides on unit 2 and the
 *    nouns/verbs/pronouns line on unit 3 (pronouns); the noun and verb
 *    units are not authored yet, so this reflects what the course teaches
 *    today
 *  - Level 4 has eight units of one lesson each, one line per unit, so
 *    finishing a lesson lights exactly one statement; a level with no
 *    mapping yet reports every line open
 */

/**
 * The unit carrying each can-do statement, by level id. 'sound' marks
 * Level 1's sound-classes line, which the sound tags evidence rather than a
 * unit.
 */
const CAN_DO_UNITS: Record<string, string[]> = {
  l1: ['sound', 'l1u2', 'l1u3'],
  l4: ['l4u1', 'l4u2', 'l4u3', 'l4u4', 'l4u5', 'l4u6', 'l4u7', 'l4u8'],
};

export function levelCanDo(level: Level, logs: ReviewLogRecord[]): CanDoState[] {
  const reviewedOnce = new Set(logs.map((log) => log.itemId));
  const unitReviewed = (unitId: string): boolean => {
    const items = level.lessons.filter((lesson) => lesson.unitId === unitId).flatMap((lesson) => lesson.items);
    return items.length > 0 && items.every((item) => reviewedOnce.has(item.id));
  };
  const sounds = soundMastery(level, logs);
  const units = CAN_DO_UNITS[level.id] ?? [];
  return level.canDo.map((statement, index) => {
    const target = units[index];
    return {
      statement,
      done:
        target === 'sound'
          ? sounds.length > 0 && sounds.every((sound) => sound.mastered)
          : target !== undefined && unitReviewed(target),
    };
  });
}
