import type { Lesson } from '../types';

/**
 * Level 5 Unit 3 Lesson 1 — the auto ride (PLAN.md §5 Level 5): the third
 * dialogue scene, re-authored to the native speaker's line-by-line dialogue
 * (2026-10-13). Five turns and the learner opens it: the place named and the
 * asking whether the driver will go, the get-in, the stop with the fare
 * question, the fare, and the thanks that ends the ride. The fare is a plain
 * exchange — the price is asked, answered and taken — and the place is named
 * the way it is said, with the to-form going straight onto the English word.
 * Each learner turn after the opener carries a role-play drill whose cue is
 * the line right before it, so the ride plays through as a conversation.
 */
export const l5u3l1: Lesson = {
  id: 'l5u3l1',
  levelId: 'l5',
  unitId: 'l5u3',
  title: 'The auto ride',
  comprehensionOnly: false,
  items: [
    {
      id: 'government-hospital-ilekk-povumo',
      manglish: 'government hospital-ilekk povumo',
      script: 'ഗവൺമെന്റ് ഹോസ്പിറ്റലിലേക്ക് പോവുമോ',
      meaning: 'will you go to the government hospital?',
      kind: 'sentence',
      audio: {
        slow: 'l5u3l1_government-hospital-ilekk-povumo_slow',
        medium: 'l5u3l1_government-hospital-ilekk-povumo_medium',
        normal: 'l5u3l1_government-hospital-ilekk-povumo_normal',
      },
      acceptedInputs: [
        'government hospital-ilekk povumo',
        'government hospital ilekk povumo',
        'government hospitalilekk povumo',
        'hospital-ilekk povumo',
      ],
      sentence: {
        bank: ['government', 'hospital-ilekk', 'povumo', 'pokaam'],
        orders: ['government hospital-ilekk povumo', 'hospital-ilekk povumo'],
        parts: [
          { word: 'government', meaning: 'government — the English word' },
          { word: 'hospital-ilekk', meaning: 'to the hospital' },
          { word: 'povumo', meaning: 'will you go?' },
        ],
      },
      notes: [
        'The learner signals an auto and names the place before getting in: the word first, then povumo, the will-you-go.',
        'The to-form goes straight onto the English word — hospital-ilekk, to the hospital — the same ending as veettilekku and busilekk.',
      ],
      tags: [],
    },
    {
      id: 'kerikko',
      manglish: 'kerikko',
      script: 'കേറിക്കോ',
      meaning: 'get in, then',
      kind: 'sentence',
      audio: {
        slow: 'l5u3l1_kerikko_slow',
        medium: 'l5u3l1_kerikko_medium',
        normal: 'l5u3l1_kerikko_normal',
      },
      sentence: {
        bank: ['kerikko', 'keri'],
        orders: ['kerikko'],
        parts: [{ word: 'kerikko', meaning: 'get in, then' }],
      },
      notes: [
        'Keri is get in, and the -ikko on the end makes it go on, then — the same ending as the nirtthikko the ride ends with.',
        'Nothing to answer: the driver has taken the place, and the learner steps in.',
      ],
      tags: [],
    },
    {
      id: 'ivide-nirtthikko-ethra-aayi-chetta',
      manglish: 'ivide nirtthikko, ethra aayi chetta',
      script: 'ഇവിടെ നിർത്തിക്കോ എത്ര ആയി ചേട്ടാ',
      meaning: 'stop here, how much is it, chetta?',
      kind: 'sentence',
      audio: {
        slow: 'l5u3l1_ivide-nirtthikko-ethra-aayi-chetta_slow',
        medium: 'l5u3l1_ivide-nirtthikko-ethra-aayi-chetta_medium',
        normal: 'l5u3l1_ivide-nirtthikko-ethra-aayi-chetta_normal',
      },
      acceptedInputs: [
        'ivide nirtthikko ethra aayi chetta',
        'ivide nirtthikko ethra aayi',
        'nirtthikko ethra aayi chetta',
      ],
      sentence: {
        bank: ['ivide', 'nirtthikko,', 'ethra', 'aayi', 'chetta', 'evide'],
        orders: ['ivide nirtthikko, ethra aayi chetta'],
        parts: [
          { word: 'ivide', meaning: 'here' },
          { word: 'nirtthikko,', meaning: 'stop, then' },
          { word: 'ethra', meaning: 'how much' },
          { word: 'aayi', meaning: 'did it come to' },
          { word: 'chetta', meaning: 'chetta! — the call form of chettan' },
        ],
      },
      notes: [
        'The junction comes up and the learner says both halves at once: stop here, and the fare question from the counter.',
        'Nirtthikko is stop with the -ikko on it, the same shape as kerikko — the doubled tt is the held sound in the middle.',
      ],
      tags: [],
    },
    {
      id: 'nooru-roopa',
      manglish: 'nooru roopa',
      script: 'നൂറ് രൂപ',
      meaning: 'a hundred rupees',
      kind: 'sentence',
      audio: {
        slow: 'l5u3l1_nooru-roopa_slow',
        medium: 'l5u3l1_nooru-roopa_medium',
        normal: 'l5u3l1_nooru-roopa_normal',
      },
      sentence: {
        bank: ['nooru', 'roopa', 'ethra'],
        orders: ['nooru roopa'],
        parts: [
          { word: 'nooru', meaning: 'a hundred' },
          { word: 'roopa', meaning: 'rupees' },
        ],
      },
      notes: [
        'Nooru is a hundred: patthu with two noughts on it, the biggest counting word the ride needs.',
        'The fare comes back the way the price did at the stall — the number and roopa, nothing else.',
      ],
      tags: [],
    },
    {
      id: 'ok-thank-you',
      manglish: 'ok, thank you',
      meaning: 'ok, thank you',
      kind: 'sentence',
      audio: {
        slow: 'l5u3l1_ok-thank-you_slow',
        medium: 'l5u3l1_ok-thank-you_medium',
        normal: 'l5u3l1_ok-thank-you_normal',
      },
      acceptedInputs: ['ok thank you', 'ok thanks'],
      sentence: {
        bank: ['ok,', 'thank', 'you', 'venda'],
        orders: ['ok, thank you'],
        parts: [
          { word: 'ok,', meaning: 'ok' },
          { word: 'thank', meaning: 'thank' },
          { word: 'you', meaning: 'you' },
        ],
      },
      notes: [
        'Ok and thank you are part English, so this line carries no script.',
        'The learner settles the fare and thanks the driver in the same breath — two English words that Kerala says every day.',
      ],
      tags: [],
    },
  ],
  minimalPairs: [],
  drills: [
    { kind: 'sentenceBuilder', itemId: 'government-hospital-ilekk-povumo', mode: 'bank' },
    {
      kind: 'rolePlay',
      itemId: 'ivide-nirtthikko-ethra-aayi-chetta',
      promptItemId: 'kerikko',
      mode: 'bank',
    },
    { kind: 'rolePlay', itemId: 'ok-thank-you', promptItemId: 'nooru-roopa', mode: 'typing' },
    { kind: 'multipleChoice', itemId: 'nooru-roopa', distractors: ['get in, then', 'ok, thank you'] },
  ],
  reviewSlots: 0,
  spriteId: 'l5u3l1',
};
