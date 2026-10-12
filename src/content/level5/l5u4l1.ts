import type { Lesson } from '../types';

/**
 * Level 5 Unit 4 Lesson 1 — the phone call (PLAN.md §5 Level 5): the fourth
 * dialogue scene. Seven turns, and the learner opens it: the answer to the
 * ring, the caller's name, the what's-up, the reason for the call, the yes,
 * the caller's see-you, and the bye that ends it. Nobody can be seen on a
 * line, so every question here carries its own context — aara is who-is-it
 * with the asking built in, and varunnundo asks the coming without a face in
 * front of it. Each learner turn after the opener carries a role-play drill
 * whose cue is the line right before it.
 */
export const l5u4l1: Lesson = {
  id: 'l5u4l1',
  levelId: 'l5',
  unitId: 'l5u4',
  title: 'The phone call',
  comprehensionOnly: false,
  items: [
    {
      id: 'hello-aara',
      manglish: 'hello, aara',
      script: 'ഹലോ ആരാ',
      meaning: 'hello, who is it?',
      kind: 'sentence',
      audio: {
        slow: 'l5u4l1_hello-aara_slow',
        medium: 'l5u4l1_hello-aara_medium',
        normal: 'l5u4l1_hello-aara_normal',
      },
      acceptedInputs: ['hello aara'],
      sentence: {
        bank: ['hello,', 'aara', 'evide'],
        orders: ['hello, aara'],
        parts: [
          { word: 'hello,', meaning: 'hello' },
          { word: 'aara', meaning: 'who is it — the asking is inside the word' },
        ],
      },
      notes: [
        'Aara is who with the is folded in: the whole question is who is it. Malayalis write it ആരാ, the final ാ doing the work of aanu.',
        'The learner answers the ring with this one, and the voice at the other end says the name.',
      ],
      tags: [],
    },
    {
      id: 'njan-suresh-aanu',
      manglish: 'njan suresh aanu',
      script: 'ഞാൻ സുരേഷ് ആണ്',
      meaning: "I'm Suresh",
      kind: 'sentence',
      audio: {
        slow: 'l5u4l1_njan-suresh-aanu_slow',
        medium: 'l5u4l1_njan-suresh-aanu_medium',
        normal: 'l5u4l1_njan-suresh-aanu_normal',
      },
      sentence: {
        bank: ['njan', 'suresh', 'aanu', 'aara'],
        orders: ['njan suresh aanu'],
        parts: [
          { word: 'njan', meaning: 'I' },
          { word: 'suresh', meaning: 'Suresh — a name, spelled the way it sounds' },
          { word: 'aanu', meaning: 'am' },
        ],
      },
      notes: [
        'A name with aanu after it is how a caller says who is speaking; the learner asked aara, and this is the answer.',
        'Suresh is a name, so it goes into the line as it sounds and keeps its place in the middle.',
      ],
      tags: [],
    },
    {
      id: 'enna-und-vishesham-call',
      manglish: 'enna und vishesham',
      script: 'എന്നാ ഉണ്ട് വിശേഷം',
      meaning: "what's up?",
      kind: 'sentence',
      audio: {
        slow: 'l5u4l1_enna-und-vishesham-call_slow',
        medium: 'l5u4l1_enna-und-vishesham-call_medium',
        normal: 'l5u4l1_enna-und-vishesham-call_normal',
      },
      acceptedInputs: ['enna und vishesham'],
      sentence: {
        bank: ['enna', 'und', 'vishesham', 'onnum'],
        orders: ['enna und vishesham'],
        parts: [
          { word: 'enna', meaning: 'what is it?' },
          { word: 'und', meaning: 'there is' },
          { word: 'vishesham', meaning: 'news' },
        ],
      },
      notes: [
        'The what-is-up from the greetings lesson, and the reason the phone rang: a caller does not ring without one.',
        'Enna is entha with the is folded in, the same fold as aara — no aanu is needed after it.',
      ],
      tags: [],
    },
    {
      id: 'innu-raathri-angott-varunnundo',
      manglish: 'innu raathri angott varunnundo',
      script: 'ഇന്ന് രാത്രി അങ്ങോട്ട് വരുന്നുണ്ടോ',
      meaning: 'are you coming over tonight?',
      kind: 'sentence',
      audio: {
        slow: 'l5u4l1_innu-raathri-angott-varunnundo_slow',
        medium: 'l5u4l1_innu-raathri-angott-varunnundo_medium',
        normal: 'l5u4l1_innu-raathri-angott-varunnundo_normal',
      },
      sentence: {
        bank: ['innu', 'raathri', 'angott', 'varunnundo', 'evide'],
        orders: ['innu raathri angott varunnundo'],
        parts: [
          { word: 'innu', meaning: 'today' },
          { word: 'raathri', meaning: 'night' },
          { word: 'angott', meaning: 'over there' },
          { word: 'varunnundo', meaning: 'are you coming?' },
        ],
      },
      notes: [
        'The reason for the call: angott is over there, the same word as in njan innu raathri angott pokum.',
        'Varunnundo carries the asking and the coming together, the shape of ningaḷ varunnundo — no face needed.',
      ],
      tags: [],
    },
    {
      id: 'athe-njan-varaam',
      manglish: 'athe, njan varaam',
      script: 'അതെ ഞാൻ വരാം',
      meaning: "yes, I'll come",
      kind: 'sentence',
      audio: {
        slow: 'l5u4l1_athe-njan-varaam_slow',
        medium: 'l5u4l1_athe-njan-varaam_medium',
        normal: 'l5u4l1_athe-njan-varaam_normal',
      },
      acceptedInputs: ['athe njan varaam', 'njan varaam'],
      sentence: {
        bank: ['athe,', 'njan', 'varaam', 'venda'],
        orders: ['athe, njan varaam'],
        parts: [
          { word: 'athe,', meaning: 'yes' },
          { word: 'njan', meaning: 'I' },
          { word: 'varaam', meaning: 'will come' },
        ],
      },
      notes: [
        'Varaam is the will-come of njan naaḷe avide varaam, said back to the caller.',
        'Athe is the yes from the greetings, the same one that answered the driver at the end of the ride.',
      ],
      tags: [],
    },
    {
      id: 'sheri-raathri-kaanam',
      manglish: 'sheri, raathri kaanam',
      script: 'ശരി രാത്രി കാണാം',
      meaning: 'okay, see you tonight',
      kind: 'sentence',
      audio: {
        slow: 'l5u4l1_sheri-raathri-kaanam_slow',
        medium: 'l5u4l1_sheri-raathri-kaanam_medium',
        normal: 'l5u4l1_sheri-raathri-kaanam_normal',
      },
      sentence: {
        bank: ['sheri,', 'raathri', 'kaanam', 'pinne'],
        orders: ['sheri, raathri kaanam'],
        parts: [
          { word: 'sheri,', meaning: 'okay' },
          { word: 'raathri', meaning: 'night' },
          { word: 'kaanam', meaning: 'we will see each other' },
        ],
      },
      notes: [
        'Kaanam is the see-you from pinne kaanam with the night put in front of it — the plan named as it is closed.',
        'The caller says it, and the learner is the one who ends the call.',
      ],
      tags: [],
    },
    {
      id: 'sheri-bye',
      manglish: 'sheri, bye',
      script: 'ശെരി ബൈ',
      meaning: 'okay, bye',
      kind: 'sentence',
      audio: {
        slow: 'l5u4l1_sheri-bye_slow',
        medium: 'l5u4l1_sheri-bye_medium',
        normal: 'l5u4l1_sheri-bye_normal',
      },
      acceptedInputs: ['sheri bye'],
      sentence: {
        bank: ['sheri,', 'bye', 'kaanam'],
        orders: ['sheri, bye'],
        parts: [
          { word: 'sheri,', meaning: 'okay' },
          { word: 'bye', meaning: 'bye' },
        ],
      },
      notes: [
        'The same bye as appo sheri, bye in the greetings, and the learner is the one who puts the phone down.',
        'Bye is part English and written ബൈ, the way the greetings lesson writes it.',
      ],
      tags: [],
    },
  ],
  minimalPairs: [],
  drills: [
    { kind: 'sentenceBuilder', itemId: 'hello-aara', mode: 'bank' },
    { kind: 'rolePlay', itemId: 'enna-und-vishesham-call', promptItemId: 'njan-suresh-aanu', mode: 'typing' },
    {
      kind: 'rolePlay',
      itemId: 'athe-njan-varaam',
      promptItemId: 'innu-raathri-angott-varunnundo',
      mode: 'typing',
    },
    { kind: 'rolePlay', itemId: 'sheri-bye', promptItemId: 'sheri-raathri-kaanam', mode: 'bank' },
    {
      kind: 'multipleChoice',
      itemId: 'innu-raathri-angott-varunnundo',
      distractors: ['okay, see you tonight', "I'm Suresh"],
    },
  ],
  reviewSlots: 0,
  spriteId: 'l5u4l1',
};
