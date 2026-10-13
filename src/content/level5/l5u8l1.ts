import type { Lesson } from '../types';

/**
 * Level 5 Unit 8 Lesson 1 — at a wedding (PLAN.md §5 Level 5): the eighth
 * dialogue scene, re-authored to the native speaker's line-by-line dialogue
 * (2026-10-13). Six turns, and the learner opens it: the greeting to a friend,
 * the friend's hello back with the state-of-things question, the learner's
 * how-it-goes with the eaten question, the friend's no and the same question
 * back, the learner's come-and-sit, and the friend's let-me-call-the-others.
 * Two old friends at a wedding, not a formal call on a host — the register is
 * the familiar one, so the friend talks to the learner with nee and ends the
 * address with eda (native-speaker ruling 2026-10-13: the familiar address is
 * the eda form, never edi, because the app does not gender the learner). The
 * retired spelling kettiyo stays banned (native-speaker ruling 2026-10-12), so
 * the scene never asks about the marriage itself. Every learner turn after the
 * opener carries a role-play drill whose cue is the line right before it.
 */
export const l5u8l1: Lesson = {
  id: 'l5u8l1',
  levelId: 'l5',
  unitId: 'l5u8',
  title: 'At a wedding',
  comprehensionOnly: false,
  items: [
    {
      id: 'hello-bro-enna-und-vishesham',
      manglish: 'hello bro, enna und vishesham',
      meaning: "hello bro, what's up?",
      kind: 'sentence',
      audio: {
        slow: 'l5u8l1_hello-bro-enna-und-vishesham_slow',
        medium: 'l5u8l1_hello-bro-enna-und-vishesham_medium',
        normal: 'l5u8l1_hello-bro-enna-und-vishesham_normal',
      },
      acceptedInputs: ['hello bro enna und vishesham', 'enna und vishesham'],
      sentence: {
        bank: ['hello', 'bro,', 'enna', 'und', 'vishesham', 'evide'],
        orders: ['hello bro, enna und vishesham'],
        parts: [
          { word: 'hello', meaning: 'hello' },
          { word: 'bro,', meaning: 'bro — the English word friends use' },
          { word: 'enna', meaning: 'what is it?' },
          { word: 'und', meaning: 'there is' },
          { word: 'vishesham', meaning: 'news' },
        ],
      },
      notes: [
        'Bro is part English, so this line carries no script.',
        'The same enna und vishesham the learner said at the family door, said to a friend instead — hello, the what-is-up, and nothing formal in between.',
      ],
      tags: [],
    },
    {
      id: 'hello-sugham-aayitt-irikkunneda-ninakk-enna-und',
      manglish: 'hello, sugham aayitt irikkunneda, ninakk enna und',
      script: 'ഹലോ സുഖം ആയിട്ട് ഇരിക്കുന്നെടാ നിനക്ക് എന്നാ ഉണ്ട്',
      meaning: "hello — I'm well, what about you?",
      kind: 'sentence',
      audio: {
        slow: 'l5u8l1_hello-sugham-aayitt-irikkunneda-ninakk-enna-und_slow',
        medium: 'l5u8l1_hello-sugham-aayitt-irikkunneda-ninakk-enna-und_medium',
        normal: 'l5u8l1_hello-sugham-aayitt-irikkunneda-ninakk-enna-und_normal',
      },
      acceptedInputs: [
        'hello sugham aayitt irikkunneda ninakk enna und',
        'sugham aayitt irikkunneda ninakk enna und',
      ],
      sentence: {
        bank: ['hello,', 'sugham', 'aayitt', 'irikkunneda,', 'ninakk', 'enna', 'und', 'evide'],
        orders: ['hello, sugham aayitt irikkunneda, ninakk enna und'],
        parts: [
          { word: 'hello,', meaning: 'hello' },
          { word: 'sugham', meaning: 'comfort; fine' },
          { word: 'aayitt', meaning: 'the -aayitt that turns it into a state' },
          { word: 'irikkunneda,', meaning: 'am — with the friendly -eda on the end' },
          { word: 'ninakk', meaning: 'to you' },
          { word: 'enna', meaning: 'what is it?' },
          { word: 'und', meaning: 'there is' },
        ],
      },
      notes: [
        'The same sugham aayitt irikkunnu the family visit answered with, and this time the address is on the end of it: irikkunneda.',
        'Ninakk is the to-you form — the question is turned around and handed back, the way a friend answers a greeting.',
      ],
      tags: [],
    },
    {
      id: 'oh-ingane-pokunnu-kazhicho',
      manglish: 'oh ingane pokunnu, kazhicho',
      script: 'ഓ ഇങ്ങനെ പോകുന്നു കഴിച്ചോ',
      meaning: 'oh, going along like this — have you eaten?',
      kind: 'sentence',
      audio: {
        slow: 'l5u8l1_oh-ingane-pokunnu-kazhicho_slow',
        medium: 'l5u8l1_oh-ingane-pokunnu-kazhicho_medium',
        normal: 'l5u8l1_oh-ingane-pokunnu-kazhicho_normal',
      },
      acceptedInputs: ['oh ingane pokunnu kazhicho', 'ingane pokunnu kazhicho'],
      sentence: {
        bank: ['oh', 'ingane', 'pokunnu,', 'kazhicho', 'kazhichu'],
        orders: ['oh ingane pokunnu, kazhicho'],
        parts: [
          { word: 'oh', meaning: 'oh' },
          { word: 'ingane', meaning: 'like this' },
          { word: 'pokunnu,', meaning: 'it goes' },
          { word: 'kazhicho', meaning: 'have you eaten?' },
        ],
      },
      notes: [
        'Oh is the recognising sound, and ingane pokunnu is the how-it-goes: things are going along like this, nothing to report.',
        'Kazhicho is the eaten question the wedding is really about — the food is the point of the day, so it comes before anything else.',
      ],
      tags: [],
    },
    {
      id: 'illa-nee-kazhicho',
      manglish: 'illa, nee kazhicho',
      script: 'ഇല്ല നീ കഴിച്ചോ',
      meaning: 'no — have you eaten?',
      kind: 'sentence',
      audio: {
        slow: 'l5u8l1_illa-nee-kazhicho_slow',
        medium: 'l5u8l1_illa-nee-kazhicho_medium',
        normal: 'l5u8l1_illa-nee-kazhicho_normal',
      },
      acceptedInputs: ['illa nee kazhicho', 'illa ni kazhicho', 'nee kazhicho'],
      sentence: {
        bank: ['illa,', 'nee', 'kazhicho', 'ningaḷ'],
        orders: ['illa, nee kazhicho', 'nee kazhicho'],
        parts: [
          { word: 'illa,', meaning: 'no — there is none of it' },
          { word: 'nee', meaning: 'you — the familiar one' },
          { word: 'kazhicho', meaning: 'have you eaten?' },
        ],
      },
      notes: [
        'Illa is the no of not-having: the same word as in vellam illa, answering a question with what there is not.',
        'Nee is the familiar you two friends use with each other, and the question comes straight back at the learner. Ni is accepted in typing; the display keeps nee.',
      ],
      tags: [],
    },
    {
      id: 'enna-vaa-irikkam',
      manglish: 'enna vaa irikkam',
      script: 'എന്നാ വാ ഇരിക്കാം',
      meaning: "then come, let's sit down",
      kind: 'sentence',
      audio: {
        slow: 'l5u8l1_enna-vaa-irikkam_slow',
        medium: 'l5u8l1_enna-vaa-irikkam_medium',
        normal: 'l5u8l1_enna-vaa-irikkam_normal',
      },
      acceptedInputs: ['enna vaa irikkam', 'vaa irikkam'],
      sentence: {
        bank: ['enna', 'vaa', 'irikkam', 'irikkunnu'],
        orders: ['enna vaa irikkam'],
        parts: [
          { word: 'enna', meaning: 'then' },
          { word: 'vaa', meaning: 'come' },
          { word: 'irikkam', meaning: "let's sit" },
        ],
      },
      notes: [
        'Vaa is the come from the family visit, and irikkam is the let-us-sit: the -aam ending on a verb makes it a let-us, an invitation rather than an order.',
        'Enna opens it the way it closed the visit — then, in that case — and turns the greeting into the two of them finding a place to sit.',
      ],
      tags: [],
    },
    {
      id: 'ok-njan-avare-koode-vilikkette',
      manglish: 'ok, njan avare koode viḷikkette',
      meaning: 'ok — let me call them along too',
      kind: 'sentence',
      audio: {
        slow: 'l5u8l1_ok-njan-avare-koode-vilikkette_slow',
        medium: 'l5u8l1_ok-njan-avare-koode-vilikkette_medium',
        normal: 'l5u8l1_ok-njan-avare-koode-vilikkette_normal',
      },
      acceptedInputs: ['ok njan avare koode vilikkette', 'njan avare koode vilikkette'],
      sentence: {
        bank: ['ok,', 'njan', 'avare', 'koode', 'viḷikkette', 'vilikku'],
        orders: ['ok, njan avare koode viḷikkette', 'njan avare koode viḷikkette'],
        parts: [
          { word: 'ok,', meaning: 'ok' },
          { word: 'njan', meaning: 'I' },
          { word: 'avare', meaning: 'them' },
          { word: 'koode', meaning: 'along, with' },
          { word: 'viḷikkette', meaning: 'let me call' },
        ],
      },
      notes: [
        'Ok is part English, so this line carries no script.',
        'Avare is them, and koode is along: the friend is going to fetch the others so they can all sit together.',
        'Viḷikkette is the call with the let-me ending on it — the same shape as edukkette, said instead of done.',
      ],
      tags: [],
    },
  ],
  minimalPairs: [],
  drills: [
    { kind: 'sentenceBuilder', itemId: 'hello-bro-enna-und-vishesham', mode: 'bank' },
    { kind: 'rolePlay', itemId: 'oh-ingane-pokunnu-kazhicho', promptItemId: 'hello-sugham-aayitt-irikkunneda-ninakk-enna-und', mode: 'typing' },
    { kind: 'rolePlay', itemId: 'enna-vaa-irikkam', promptItemId: 'illa-nee-kazhicho', mode: 'typing' },
    {
      kind: 'multipleChoice',
      itemId: 'oh-ingane-pokunnu-kazhicho',
      distractors: ["hello — I'm well, what about you?", 'no — have you eaten?'],
    },
  ],
  reviewSlots: 0,
  spriteId: 'l5u8l1',
};
