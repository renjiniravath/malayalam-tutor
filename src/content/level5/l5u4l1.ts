import type { Lesson } from '../types';

/**
 * Level 5 Unit 4 Lesson 1 — the phone call (PLAN.md §5 Level 5): the fourth
 * dialogue scene, re-authored to the native speaker's line-by-line dialogue
 * (2026-10-13). Eight turns, and the house opens it: a bare hello, the
 * learner's question about Babu, the house's yes-and-bad-news, the learner
 * asking when he comes, the house's answer with the time in it, the learner's
 * message to pass on, the house's ok, and the learner's thank you. Nobody can
 * be seen on a line, so every question carries its own context, and the last
 * long learner turn is a message, not a question. The learner's first line is
 * the builder drill, since the house speaks before them; every learner turn
 * after it carries a role-play drill whose cue is the line right before it.
 */
export const l5u4l1: Lesson = {
  id: 'l5u4l1',
  levelId: 'l5',
  unitId: 'l5u4',
  title: 'The phone call',
  comprehensionOnly: false,
  items: [
    {
      id: 'hello',
      manglish: 'hello',
      script: 'ഹലോ',
      meaning: 'hello',
      kind: 'sentence',
      audio: {
        slow: 'l5u4l1_hello_slow',
        medium: 'l5u4l1_hello_medium',
        normal: 'l5u4l1_hello_normal',
      },
      sentence: {
        bank: ['hello', 'aara'],
        orders: ['hello'],
        parts: [{ word: 'hello', meaning: 'hello' }],
      },
      notes: [
        'The house picks up with one word and nothing else — no name, because the caller has not said anything yet.',
        'A bare hello is how a Kerala house answers the ring; the who-is-it comes after the caller speaks.',
      ],
      tags: [],
    },
    {
      id: 'hello-babunte-veed-aano',
      manglish: 'hello, babunte veed aano',
      script: 'ഹലോ ബാബുന്റെ വീട് ആണോ',
      meaning: "hello, is this Babu's house?",
      kind: 'sentence',
      audio: {
        slow: 'l5u4l1_hello-babunte-veed-aano_slow',
        medium: 'l5u4l1_hello-babunte-veed-aano_medium',
        normal: 'l5u4l1_hello-babunte-veed-aano_normal',
      },
      acceptedInputs: [
        'hello babunte veed aano',
        'babunte veed aano',
        'hello babunte veedu aano',
      ],
      sentence: {
        bank: ['hello,', 'babunte', 'veed', 'aano', 'evide'],
        orders: ['hello, babunte veed aano'],
        parts: [
          { word: 'hello,', meaning: 'hello' },
          { word: 'babunte', meaning: "Babu's — the name with the of-ending" },
          { word: 'veed', meaning: 'house' },
          { word: 'aano', meaning: 'is it?' },
        ],
      },
      notes: [
        'Babunte is Babu with the of-ending on it, and veed aano asks whether this is the house: the whole question is whose door the learner thinks they have rung.',
        'Same aano as ivide aano — the is-it question from the auto ride, pointed at a house this time.',
      ],
      tags: [],
    },
    {
      id: 'athelo-pakshe-babu-ippo-sthalath-illallo',
      manglish: 'athelo, pakshe babu ippo sthalath illallo',
      meaning: "well, yes — but Babu isn't around right now",
      kind: 'sentence',
      audio: {
        slow: 'l5u4l1_athelo-pakshe-babu-ippo-sthalath-illallo_slow',
        medium: 'l5u4l1_athelo-pakshe-babu-ippo-sthalath-illallo_medium',
        normal: 'l5u4l1_athelo-pakshe-babu-ippo-sthalath-illallo_normal',
      },
      acceptedInputs: [
        'athelo pakshe babu ippo sthalath illallo',
        'babu ippo sthalath illallo',
        'babu ippo illa',
      ],
      sentence: {
        bank: ['athelo,', 'pakshe', 'babu', 'ippo', 'sthalath', 'illallo', 'und'],
        orders: ['athelo, pakshe babu ippo sthalath illallo'],
        parts: [
          { word: 'athelo,', meaning: 'well, yes' },
          { word: 'pakshe', meaning: 'but' },
          { word: 'babu', meaning: 'Babu — the name' },
          { word: 'ippo', meaning: 'now' },
          { word: 'sthalath', meaning: 'at the place' },
          { word: 'illallo', meaning: "he isn't — the -allo makes it something both sides know" },
        ],
      },
      notes: [
        'Athelo is a spoken form whose written spelling is not settled, so this line carries no script — the sound is the thing to take from it.',
        'The house agrees and then says the bad news in the same breath: pakshe is the turn, and sthalath illallo is not at the place, the soft way of saying he is out.',
      ],
      tags: [],
    },
    {
      id: 'oh-babu-eppo-varum-enn-ariyamo',
      manglish: 'oh, babu eppo varum enn ariyamo',
      script: 'ഓ ബാബു എപ്പോ വരും എന്ന് അറിയാമോ',
      meaning: 'oh — do you know when Babu will come?',
      kind: 'sentence',
      audio: {
        slow: 'l5u4l1_oh-babu-eppo-varum-enn-ariyamo_slow',
        medium: 'l5u4l1_oh-babu-eppo-varum-enn-ariyamo_medium',
        normal: 'l5u4l1_oh-babu-eppo-varum-enn-ariyamo_normal',
      },
      acceptedInputs: [
        'oh babu eppo varum enn ariyamo',
        'babu eppo varum enn ariyamo',
        'babu eppo varum',
      ],
      sentence: {
        bank: ['oh,', 'babu', 'eppo', 'varum', 'enn', 'ariyamo', 'ippo'],
        orders: ['oh, babu eppo varum enn ariyamo'],
        parts: [
          { word: 'oh,', meaning: 'oh' },
          { word: 'babu', meaning: 'Babu — the name' },
          { word: 'eppo', meaning: 'when' },
          { word: 'varum', meaning: 'he will come' },
          { word: 'enn', meaning: 'that' },
          { word: 'ariyamo', meaning: 'do you know?' },
        ],
      },
      notes: [
        'Ariyamo is do-you-know, and the whole question sits in front of it: eppo varum, when he will come.',
        'Enn is the that which hands the first half over to ariyamo — without it the when and the knowing would not join.',
      ],
      tags: [],
    },
    {
      id: 'oru-ara-manikkoor-kazhiyumbo-varum-enna-paranjath',
      manglish: 'oru ara manikkoor kazhiyumbo varum enna paranjath',
      script: 'ഒരു അര മണിക്കൂർ കഴിയുമ്പോ വരും എന്നാ പറഞ്ഞത്',
      meaning: "he said he'll come in about half an hour",
      kind: 'sentence',
      audio: {
        slow: 'l5u4l1_oru-ara-manikkoor-kazhiyumbo-varum-enna-paranjath_slow',
        medium: 'l5u4l1_oru-ara-manikkoor-kazhiyumbo-varum-enna-paranjath_medium',
        normal: 'l5u4l1_oru-ara-manikkoor-kazhiyumbo-varum-enna-paranjath_normal',
      },
      sentence: {
        bank: ['oru', 'ara', 'manikkoor', 'kazhiyumbo', 'varum', 'enna', 'paranjath', 'ippo'],
        orders: ['oru ara manikkoor kazhiyumbo varum enna paranjath'],
        parts: [
          { word: 'oru', meaning: 'one' },
          { word: 'ara', meaning: 'half' },
          { word: 'manikkoor', meaning: 'hour' },
          { word: 'kazhiyumbo', meaning: 'when it passes' },
          { word: 'varum', meaning: 'he will come' },
          { word: 'enna', meaning: 'that' },
          { word: 'paranjath', meaning: 'is what was said' },
        ],
      },
      notes: [
        'Ara is half, so oru ara manikkoor is one half hour — the answer to the when, said as a span of time rather than a clock.',
        'Enna paranjath closes it: the coming-in-half-an-hour is what was said, and the house is telling the learner rather than asking.',
      ],
      tags: [],
    },
    {
      id: 'ok-babu-verumbo-suresh-call-cheythayirunnu',
      manglish: 'ok, babu verumbo suresh call cheythayirunnu enn paranjal mathi',
      meaning: 'ok — when Babu comes, just tell him Suresh called',
      kind: 'sentence',
      audio: {
        slow: 'l5u4l1_ok-babu-verumbo-suresh-call-cheythayirunnu_slow',
        medium: 'l5u4l1_ok-babu-verumbo-suresh-call-cheythayirunnu_medium',
        normal: 'l5u4l1_ok-babu-verumbo-suresh-call-cheythayirunnu_normal',
      },
      acceptedInputs: [
        'ok babu verumbo suresh call cheythayirunnu enn paranjal mathi',
        'babu verumbo suresh call cheythayirunnu enn paranjal mathi',
        'suresh call cheythayirunnu enn paranjal mathi',
      ],
      sentence: {
        bank: [
          'ok,',
          'babu',
          'verumbo',
          'suresh',
          'call',
          'cheythayirunnu',
          'enn',
          'paranjal',
          'mathi',
        ],
        orders: [
          'ok, babu verumbo suresh call cheythayirunnu enn paranjal mathi',
          'babu verumbo suresh call cheythayirunnu enn paranjal mathi',
        ],
        parts: [
          { word: 'ok,', meaning: 'ok' },
          { word: 'babu', meaning: 'Babu — the name' },
          { word: 'verumbo', meaning: 'when he comes' },
          { word: 'suresh', meaning: 'Suresh — the name of the caller' },
          { word: 'call', meaning: 'call — the English word' },
          { word: 'cheythayirunnu', meaning: 'had done' },
          { word: 'enn', meaning: 'that' },
          { word: 'paranjal', meaning: 'if you say' },
          { word: 'mathi', meaning: 'that is enough' },
        ],
      },
      notes: [
        'Ok is part English, so this line carries no script.',
        'This is a message to pass on, not a question — the learner is asking the house to say these words when Babu walks in.',
        'Paranjal mathi is the if-you-say-it-that-is-enough: the whole message sits in front of it, and mathi is the same enough as venda, ithu mathi.',
      ],
      tags: [],
    },
    {
      id: 'ok',
      manglish: 'ok',
      meaning: 'ok',
      kind: 'sentence',
      audio: {
        slow: 'l5u4l1_ok_slow',
        medium: 'l5u4l1_ok_medium',
        normal: 'l5u4l1_ok_normal',
      },
      sentence: {
        bank: ['ok', 'sheri'],
        orders: ['ok'],
        parts: [{ word: 'ok', meaning: 'ok' }],
      },
      notes: [
        'Ok is part English, so this line carries no script.',
        'The house takes the message with a single ok — the same word the learner put at the front of it.',
      ],
      tags: [],
    },
    {
      id: 'thank-you',
      manglish: 'thank you',
      meaning: 'thank you',
      kind: 'sentence',
      audio: {
        slow: 'l5u4l1_thank-you_slow',
        medium: 'l5u4l1_thank-you_medium',
        normal: 'l5u4l1_thank-you_normal',
      },
      acceptedInputs: ['thank you', 'thanks'],
      sentence: {
        bank: ['thank', 'you', 'sheri'],
        orders: ['thank you'],
        parts: [
          { word: 'thank', meaning: 'thank' },
          { word: 'you', meaning: 'you' },
        ],
      },
      notes: [
        'Thank you is part English, so this line carries no script.',
        'The call closes on the English word Kerala thanks with, and the learner is the one who ends it.',
      ],
      tags: [],
    },
  ],
  minimalPairs: [],
  drills: [
    { kind: 'sentenceBuilder', itemId: 'hello-babunte-veed-aano', mode: 'bank' },
    {
      kind: 'rolePlay',
      itemId: 'oh-babu-eppo-varum-enn-ariyamo',
      promptItemId: 'athelo-pakshe-babu-ippo-sthalath-illallo',
      mode: 'bank',
    },
    {
      kind: 'rolePlay',
      itemId: 'ok-babu-verumbo-suresh-call-cheythayirunnu',
      promptItemId: 'oru-ara-manikkoor-kazhiyumbo-varum-enna-paranjath',
      mode: 'typing',
    },
    { kind: 'rolePlay', itemId: 'thank-you', promptItemId: 'ok', mode: 'typing' },
    {
      kind: 'multipleChoice',
      itemId: 'athelo-pakshe-babu-ippo-sthalath-illallo',
      distractors: ['oh — do you know when Babu will come?', "he said he'll come in about half an hour"],
    },
  ],
  reviewSlots: 0,
  spriteId: 'l5u4l1',
};
