/**
 * Typed content format — see PLAN.md §12 (data model) and §9 (romanization).
 * Content lives as typed TS modules; `npm run content:check` validates it.
 */

export type ItemKind = 'word' | 'phrase' | 'sentence' | 'expression';

export type Pos = 'noun' | 'verb' | 'pronoun' | 'particle' | 'suffix' | 'other';

/** Slow/medium/normal tiers are derived locally from the normal clip (PLAN.md §10). */
export const AUDIO_TIERS = ['slow', 'medium', 'normal'] as const;
export type AudioTier = (typeof AUDIO_TIERS)[number];

/**
 * Tag registry. content:check rejects any tag not listed here, so extending
 * the vocabulary of tags is a deliberate, linted change.
 */
export const TAG_REGISTRY = [
  'sound:zh',
  'sound:coronal',
  'sound:geminate',
  'sound:vowel-length',
] as const;
export type Tag = (typeof TAG_REGISTRY)[number];

export interface Articulation {
  /** Brief production cue — articulation coaching is text + audio only, no visuals (PLAN.md §4). */
  cue: string;
}

export interface Item {
  /** Immutable ID — learner progress is keyed on it; never reuse or rename (PLAN.md §11) */
  id: string;
  /** Strict display romanization per PLAN.md §9 (diacritics included) */
  manglish: string;
  /** Malayalam script, colloquial spelling per §9 rule 6; omitted where a colloquial spelling would mislead */
  script?: string;
  /** English gloss */
  meaning: string;
  kind: ItemKind;
  pos?: Pos;
  /** Illustration asset for concrete nouns/verbs (license record in images/manifest.ts) */
  image?: string;
  articulation?: Articulation;
  /** Clip keys into the lesson's audio sprite (see audio/manifest.ts) */
  audio: {
    slow: string;
    medium: string;
    normal: string;
    /** Segment-level sound-focus clips, required for sound:* items */
    focus?: string[];
  };
  /** Forgiving ASCII answers for typing drills — diacritic-folded, lowercase, never require diacritics */
  acceptedInputs?: string[];
  /** Formal-form, politeness, and usage notes */
  notes?: string[];
  tags: Tag[];
}

export type MinimalPairSegment = 'zh' | 'coronal' | 'geminate' | 'vowelLength';

export interface MinimalPair {
  id: string;
  aItemId: string;
  bItemId: string;
  /** The sound contrast the pair drills */
  segment: MinimalPairSegment;
  /** Clip keys into the lesson sprite */
  aClip: string;
  bClip: string;
}

/** Drill kinds used by the comprehension-only first lessons (more arrive with the player, M2) */
export type DrillSpec =
  | { kind: 'multipleChoice'; itemId: string; distractors: string[] }
  | { kind: 'minimalPair'; pairId: string };

export interface Lesson {
  /** e.g. 'l1u1l1' */
  id: string;
  levelId: string;
  unitId: string;
  title: string;
  /** Comprehension-only lessons skip repeat/speak drills (PLAN.md §6) */
  comprehensionOnly: boolean;
  /** 3-8 new items per lesson */
  items: Item[];
  minimalPairs: MinimalPair[];
  drills: DrillSpec[];
  /** How many review items from 3-5 lessons back are injected (0 until a review pool exists) */
  reviewSlots: number;
  /** Audio sprite this lesson's clips live in (see audio/manifest.ts) */
  spriteId: string;
}

export interface Level {
  id: string;
  name: string;
  /** CEFR-style can-do statements for the whole level */
  canDo: string[];
  lessons: Lesson[];
}
