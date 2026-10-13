import type { Lesson } from '../types';

/**
 * Level 5 Unit 6 Lesson 1 — a ticket on the bus (PLAN.md §5 Level 5): the
 * sixth dialogue scene, and the first with two moments in it. At the door the
 * learner asks where the bus goes and hears the destination; a few minutes
 * later, seated, the learner buys for themselves and the friend beside them in
 * one payment. Nothing in the player marks a break, so the seam is said in
 * plain English in the notes: the learner reads it on the line that ends the
 * first moment and on the conductor's line that opens the second. Seven turns,
 * the learner opening, every role-play cued by the line before it, and the
 * ticket is the English word conductors use.
 */
export const l5u6l1: Lesson = {
  id: 'l5u6l1',
  levelId: 'l5',
  unitId: 'l5u6',
  title: 'A ticket on the bus',
  comprehensionOnly: false,
  items: [
    {
      id: 'chetta-ee-bus-engott-aanu-pokunnath',
      manglish: 'chetta, ee bus engott aanu pokunnath',
      script: 'ചേട്ടാ ഈ ബസ്സ് എങ്ങോട്ട് ആണ് പോകുന്നത്',
      meaning: 'chetta, where does this bus go?',
      kind: 'sentence',
      audio: {
        slow: 'l5u6l1_chetta-ee-bus-engott-aanu-pokunnath_slow',
        medium: 'l5u6l1_chetta-ee-bus-engott-aanu-pokunnath_medium',
        normal: 'l5u6l1_chetta-ee-bus-engott-aanu-pokunnath_normal',
      },
      acceptedInputs: ['chetta ee bus engott aanu pokunnath', 'ee bus engott aanu pokunnath'],
      sentence: {
        bank: ['chetta,', 'ee', 'bus', 'engott', 'aanu', 'pokunnath', 'pokum'],
        orders: ['chetta, ee bus engott aanu pokunnath', 'ee bus engott aanu pokunnath'],
        parts: [
          { word: 'chetta,', meaning: 'chetta! — the call form of chettan' },
          { word: 'ee', meaning: 'this' },
          { word: 'bus', meaning: 'bus' },
          { word: 'engott', meaning: 'where' },
          { word: 'aanu', meaning: 'is' },
          { word: 'pokunnath', meaning: 'the going' },
        ],
      },
      notes: [
        'The bus question from Level 4, word for word, with the chetta in front of it.',
        'Asked at the door before stepping up, so the destination comes before the money does.',
      ],
      tags: [],
    },
    {
      id: 'athe-ernakulam',
      manglish: 'athe, ernakuḷam',
      script: 'അതെ എറണാകുളം',
      meaning: 'yes, Ernakulam',
      kind: 'sentence',
      audio: {
        slow: 'l5u6l1_athe-ernakulam_slow',
        medium: 'l5u6l1_athe-ernakulam_medium',
        normal: 'l5u6l1_athe-ernakulam_normal',
      },
      acceptedInputs: ['athe ernakulam', 'ernakulam'],
      sentence: {
        bank: ['athe,', 'ernakuḷam', 'evide'],
        orders: ['athe, ernakuḷam'],
        parts: [
          { word: 'athe,', meaning: 'yes' },
          { word: 'ernakuḷam', meaning: 'Ernakulam' },
        ],
      },
      notes: [
        'The conductor answers the where with the place itself — the name of the town is the whole answer.',
        'Ernakuḷam keeps its ḷ on screen, the same sound as in veḷḷam and thakkaaḷikk; typing it without the ḷ is accepted.',
      ],
      tags: [],
    },
    {
      id: 'sheri-chetta-njan-keri',
      manglish: 'sheri, chetta, njan keri',
      script: 'ശരി ചേട്ടാ ഞാൻ കേറി',
      meaning: "okay chetta, I'm getting in",
      kind: 'sentence',
      audio: {
        slow: 'l5u6l1_sheri-chetta-njan-keri_slow',
        medium: 'l5u6l1_sheri-chetta-njan-keri_medium',
        normal: 'l5u6l1_sheri-chetta-njan-keri_normal',
      },
      acceptedInputs: ['sheri chetta njan keri', 'njan keri'],
      sentence: {
        bank: ['sheri,', 'chetta,', 'njan', 'keri', 'pokaam'],
        orders: ['sheri, chetta, njan keri', 'njan keri'],
        parts: [
          { word: 'sheri,', meaning: 'okay' },
          { word: 'chetta,', meaning: 'chetta! — the call form of chettan' },
          { word: 'njan', meaning: 'I' },
          { word: 'keri', meaning: 'getting in' },
        ],
      },
      notes: [
        'Keri is the get-in from the auto ride, and here the learner says it about themselves as they step up.',
        'This is where the first moment ends: the learner gets in and takes a seat. The next line comes a few minutes later, when the conductor walks down the bus.',
      ],
      tags: [],
    },
    {
      id: 'evide-chetta-bus',
      manglish: 'evide, chetta',
      script: 'എവിടെ ചേട്ടാ',
      meaning: 'where to, chetta?',
      kind: 'sentence',
      audio: {
        slow: 'l5u6l1_evide-chetta-bus_slow',
        medium: 'l5u6l1_evide-chetta-bus_medium',
        normal: 'l5u6l1_evide-chetta-bus_normal',
      },
      acceptedInputs: ['evide chetta'],
      sentence: {
        bank: ['evide,', 'chetta', 'ethra'],
        orders: ['evide, chetta'],
        parts: [
          { word: 'evide,', meaning: 'where' },
          { word: 'chetta', meaning: 'chetta! — the call form of chettan' },
        ],
      },
      notes: [
        'A few minutes into the ride, the second moment: the conductor comes down the aisle with his tickets, asking each row where they are going.',
        'The chetta comes last here, the way it does at the counter: evide, chetta.',
      ],
      tags: [],
    },
    {
      id: 'ernakulam-randu-ticket',
      manglish: 'ernakuḷam, randu ticket',
      script: 'എറണാകുളം രണ്ട് ടിക്കറ്റ്',
      meaning: 'Ernakulam, two tickets',
      kind: 'sentence',
      audio: {
        slow: 'l5u6l1_ernakulam-randu-ticket_slow',
        medium: 'l5u6l1_ernakulam-randu-ticket_medium',
        normal: 'l5u6l1_ernakulam-randu-ticket_normal',
      },
      acceptedInputs: ['ernakulam randu ticket', 'randu ticket'],
      sentence: {
        bank: ['ernakuḷam,', 'randu', 'ticket', 'pathinanchu'],
        orders: ['ernakuḷam, randu ticket', 'randu ticket'],
        parts: [
          { word: 'ernakuḷam,', meaning: 'Ernakulam — the town the bus is going to' },
          { word: 'randu', meaning: 'two' },
          { word: 'ticket', meaning: 'tickets — the English word' },
        ],
      },
      notes: [
        'Randu is two, and ticket is the English word every conductor says; the script spells it the way it sounds.',
        'Two tickets in one go: the friend is on the next seat, so the conductor counts two heads and answers with the fare for the pair.',
      ],
      tags: [],
    },
    {
      id: 'irupathu-roopa-bus',
      manglish: 'irupathu roopa',
      script: 'ഇരുപത് രൂപ',
      meaning: 'twenty rupees',
      kind: 'sentence',
      audio: {
        slow: 'l5u6l1_irupathu-roopa-bus_slow',
        medium: 'l5u6l1_irupathu-roopa-bus_medium',
        normal: 'l5u6l1_irupathu-roopa-bus_normal',
      },
      sentence: {
        bank: ['irupathu', 'roopa', 'muppatthu'],
        orders: ['irupathu roopa'],
        parts: [
          { word: 'irupathu', meaning: 'twenty' },
          { word: 'roopa', meaning: 'rupees' },
        ],
      },
      notes: [
        'Irupathu is twenty — ten a head, two heads, one fare.',
        'The fare comes back the way every price does: the number and roopa, nothing else.',
      ],
      tags: [],
    },
    {
      id: 'ithaa-irupathu-roopa',
      manglish: 'ithaa, irupathu roopa',
      script: 'ഇതാ ഇരുപത് രൂപ',
      meaning: "here's twenty rupees",
      kind: 'sentence',
      audio: {
        slow: 'l5u6l1_ithaa-irupathu-roopa_slow',
        medium: 'l5u6l1_ithaa-irupathu-roopa_medium',
        normal: 'l5u6l1_ithaa-irupathu-roopa_normal',
      },
      acceptedInputs: ['ithaa irupathu roopa', 'irupathu roopa'],
      sentence: {
        bank: ['ithaa,', 'irupathu', 'roopa', 'nooru'],
        orders: ['ithaa, irupathu roopa', 'irupathu roopa'],
        parts: [
          { word: 'ithaa,', meaning: 'here you are' },
          { word: 'irupathu', meaning: 'twenty' },
          { word: 'roopa', meaning: 'rupees' },
        ],
      },
      notes: [
        'Ithaa is the here-you-are of handing something over — money, a bag, a phone.',
        'One payment for both tickets: the learner holds out one note and the conductor tears off two.',
      ],
      tags: [],
    },
  ],
  minimalPairs: [],
  drills: [
    { kind: 'sentenceBuilder', itemId: 'chetta-ee-bus-engott-aanu-pokunnath', mode: 'bank' },
    { kind: 'rolePlay', itemId: 'sheri-chetta-njan-keri', promptItemId: 'athe-ernakulam', mode: 'typing' },
    { kind: 'rolePlay', itemId: 'ernakulam-randu-ticket', promptItemId: 'evide-chetta-bus', mode: 'typing' },
    { kind: 'rolePlay', itemId: 'ithaa-irupathu-roopa', promptItemId: 'irupathu-roopa-bus', mode: 'bank' },
    {
      kind: 'multipleChoice',
      itemId: 'irupathu-roopa-bus',
      distractors: ['where to, chetta?', 'Ernakulam, two tickets'],
    },
  ],
  reviewSlots: 0,
  spriteId: 'l5u6l1',
};
