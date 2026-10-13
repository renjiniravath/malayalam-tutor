import type { Lesson } from '../types';

/**
 * Level 5 Unit 6 Lesson 1 — a ticket on the bus (PLAN.md §5 Level 5): the
 * sixth dialogue scene, re-authored to the native speaker's line-by-line
 * dialogue and their correction that the conductor is a woman (2026-10-13).
 * The learner addresses her as chechi throughout, and it is the friend
 * travelling along that makes it two tickets. Five turns: the question at the
 * door about the way this bus goes, the get-in, the two tickets asked for when
 * the conductor reaches the seat, the fare, and the change coming back with
 * the tickets. Each learner turn carries a role-play drill whose cue is the
 * line right before it.
 */
export const l5u6l1: Lesson = {
  id: 'l5u6l1',
  levelId: 'l5',
  unitId: 'l5u6',
  title: 'A ticket on the bus',
  comprehensionOnly: false,
  items: [
    {
      id: 'chechi-ee-bus-pala-vazhi-aano-pokunnath',
      manglish: 'chechi, ee bus pala vazhi aano pokunnath',
      script: 'ചേച്ചി ഈ ബസ്സ് പാലാ വഴി ആണോ പോകുന്നത്',
      meaning: 'chechi, does this bus go via Pala?',
      kind: 'sentence',
      audio: {
        slow: 'l5u6l1_chechi-ee-bus-pala-vazhi-aano-pokunnath_slow',
        medium: 'l5u6l1_chechi-ee-bus-pala-vazhi-aano-pokunnath_medium',
        normal: 'l5u6l1_chechi-ee-bus-pala-vazhi-aano-pokunnath_normal',
      },
      acceptedInputs: [
        'chechi ee bus pala vazhi aano pokunnath',
        'ee bus pala vazhi aano pokunnath',
        'pala vazhi aano pokunnath',
      ],
      sentence: {
        bank: ['chechi,', 'ee', 'bus', 'pala', 'vazhi', 'aano', 'pokunnath', 'engott'],
        orders: ['chechi, ee bus pala vazhi aano pokunnath', 'ee bus pala vazhi aano pokunnath'],
        parts: [
          { word: 'chechi,', meaning: 'chechi — the everyday address for an elder sister' },
          { word: 'ee', meaning: 'this' },
          { word: 'bus', meaning: 'bus' },
          { word: 'pala', meaning: 'Pala — the town on the way' },
          { word: 'vazhi', meaning: 'via' },
          { word: 'aano', meaning: 'is it?' },
          { word: 'pokunnath', meaning: 'the going' },
        ],
      },
      notes: [
        'Asked at the door before stepping up, of the chechi standing there taking tickets — the same woman who comes down the aisle a few stops later.',
        'The shape is the where-does-this-bus-go question the learner already has, with vazhi in the middle: pala vazhi is the via-Pala that makes it a route question rather than a destination one.',
        'Pala is a town and keeps its familiar spelling, the way Babu and Ernakulam do.',
      ],
      tags: [],
    },
    {
      id: 'athe-kerikko',
      manglish: 'athe, kerikko',
      script: 'അതെ കേറിക്കോ',
      meaning: 'yes, get in, then',
      kind: 'sentence',
      audio: {
        slow: 'l5u6l1_athe-kerikko_slow',
        medium: 'l5u6l1_athe-kerikko_medium',
        normal: 'l5u6l1_athe-kerikko_normal',
      },
      acceptedInputs: ['athe kerikko', 'athe'],
      sentence: {
        bank: ['athe,', 'kerikko', 'keri'],
        orders: ['athe, kerikko'],
        parts: [
          { word: 'athe,', meaning: 'yes' },
          { word: 'kerikko', meaning: 'get in, then' },
        ],
      },
      notes: [
        'Athe is the plain yes, and kerikko is the same get-in-then the auto driver said — the bus conductor says it from the doorway.',
        'Nothing to answer: the learner gets in with the friend and takes a seat.',
      ],
      tags: [],
    },
    {
      id: 'chechi-rand-pala',
      manglish: 'chechi, rand pala',
      script: 'ചേച്ചി രണ്ട് പാലാ',
      meaning: 'two to Pala, chechi',
      kind: 'sentence',
      audio: {
        slow: 'l5u6l1_chechi-rand-pala_slow',
        medium: 'l5u6l1_chechi-rand-pala_medium',
        normal: 'l5u6l1_chechi-rand-pala_normal',
      },
      acceptedInputs: ['chechi rand pala', 'rand pala'],
      sentence: {
        bank: ['chechi,', 'rand', 'pala', 'ethra'],
        orders: ['chechi, rand pala'],
        parts: [
          { word: 'chechi,', meaning: 'chechi — the everyday address for an elder sister' },
          { word: 'rand', meaning: 'two — one for the friend, one for me' },
          { word: 'pala', meaning: 'Pala — where we are getting off' },
        ],
      },
      notes: [
        'A while into the ride the conductor walks down the aisle for the tickets, and this is the learner\'s turn: the address, then the count, then the place — chechi, rand pala.',
        'Rand is two with the last sound clipped off, the way it comes out in a bus — the same word as randu, said fast. The friend beside the learner is the reason it is two.',
      ],
      tags: [],
    },
    {
      id: 'muppathu-roopa',
      manglish: 'muppathu roopa',
      script: 'മുപ്പത് രൂപ',
      meaning: 'thirty rupees',
      kind: 'sentence',
      audio: {
        slow: 'l5u6l1_muppathu-roopa_slow',
        medium: 'l5u6l1_muppathu-roopa_medium',
        normal: 'l5u6l1_muppathu-roopa_normal',
      },
      sentence: {
        bank: ['muppathu', 'roopa', 'pathinanchu'],
        orders: ['muppathu roopa'],
        parts: [
          { word: 'muppathu', meaning: 'thirty' },
          { word: 'roopa', meaning: 'rupees' },
        ],
      },
      notes: [
        'Muppathu is thirty — munnu with the -pathu ending that makes it a tens word, the same way irupathu is twenty.',
        'Two fares, one number: the count the learner gave is the count the conductor charges, and the fare comes back as the number and roopa, nothing else.',
      ],
      tags: [],
    },
    {
      id: 'ithaa-baakki-irupathu',
      manglish: 'ithaa baakki irupathu',
      script: 'ഇതാ ബാക്കി ഇരുപത്',
      meaning: "here's twenty back in change",
      kind: 'sentence',
      audio: {
        slow: 'l5u6l1_ithaa-baakki-irupathu_slow',
        medium: 'l5u6l1_ithaa-baakki-irupathu_medium',
        normal: 'l5u6l1_ithaa-baakki-irupathu_normal',
      },
      acceptedInputs: ['ithaa baakki irupathu', 'baakki irupathu'],
      sentence: {
        bank: ['ithaa', 'baakki', 'irupathu', 'muppathu'],
        orders: ['ithaa baakki irupathu'],
        parts: [
          { word: 'ithaa', meaning: 'here you are' },
          { word: 'baakki', meaning: 'the rest, the balance' },
          { word: 'irupathu', meaning: 'twenty' },
        ],
      },
      notes: [
        'The learner has handed over a fifty for the thirty-rupee fare, and this line is the change coming back with the tickets in the same hand.',
        'Ithaa is the here-you-are of handing something over, and baakki is what is left over — the two together are the change, said as it is counted out.',
      ],
      tags: [],
    },
  ],
  minimalPairs: [],
  drills: [
    { kind: 'sentenceBuilder', itemId: 'chechi-ee-bus-pala-vazhi-aano-pokunnath', mode: 'bank' },
    { kind: 'rolePlay', itemId: 'chechi-rand-pala', promptItemId: 'athe-kerikko', mode: 'typing' },
    {
      kind: 'multipleChoice',
      itemId: 'muppathu-roopa',
      distractors: ['two to Pala, chechi', "here's twenty back in change"],
    },
    {
      kind: 'multipleChoice',
      itemId: 'ithaa-baakki-irupathu',
      distractors: ['thirty rupees', 'yes, get in, then'],
    },
  ],
  reviewSlots: 0,
  spriteId: 'l5u6l1',
};
