import type { Lesson } from '../types';

/**
 * Level 5 Unit 7 Lesson 1 — a meal at the hotel (PLAN.md §5 Level 5): the
 * seventh dialogue scene, re-authored to the native speaker's line-by-line
 * dialogue (2026-10-13). Seven turns, and the learner opens it: the question
 * about the biriyani, the waiter's yes and the table, the order itself with
 * the -um that joins the two things, the anything-else question, the refusal,
 * the waiting time, and the goodbye. The order line is the learner's, the way
 * the dialogue reads — it carries the chetta at the end and only the customer
 * has one to address. The bill and the money are a stage direction, not a
 * line, so they live in the last item's note, with the tip said to be
 * optional (native-speaker ruling 2026-10-12, PLAN.md §5). Each learner turn
 * carries a role-play drill whose cue is the line right before it.
 */
export const l5u7l1: Lesson = {
  id: 'l5u7l1',
  levelId: 'l5',
  unitId: 'l5u7',
  title: 'A meal at the hotel',
  comprehensionOnly: false,
  items: [
    {
      id: 'chetta-chicken-biriyani-undo',
      manglish: 'chetta, chicken biriyani undo',
      script: 'ചേട്ടാ ചിക്കൻ ബിരിയാണി ഉണ്ടോ',
      meaning: 'chetta, do you have chicken biriyani?',
      kind: 'sentence',
      audio: {
        slow: 'l5u7l1_chetta-chicken-biriyani-undo_slow',
        medium: 'l5u7l1_chetta-chicken-biriyani-undo_medium',
        normal: 'l5u7l1_chetta-chicken-biriyani-undo_normal',
      },
      acceptedInputs: ['chetta chicken biriyani undo', 'chicken biriyani undo'],
      sentence: {
        bank: ['chetta,', 'chicken', 'biriyani', 'undo', 'venam'],
        orders: ['chetta, chicken biriyani undo', 'chicken biriyani undo'],
        parts: [
          { word: 'chetta,', meaning: 'chetta! — the call form of chettan' },
          { word: 'chicken', meaning: 'chicken — the English word' },
          { word: 'biriyani', meaning: 'biriyani — the English word' },
          { word: 'undo', meaning: 'is there?' },
        ],
      },
      notes: [
        'A hotel in Kerala is where you eat — the everyday word for a restaurant, not a place to sleep.',
        'Undo is the is-there question, the is-it-there that asks whether the kitchen has the dish today. Chicken and biriyani are English words Kerala uses every day, so they keep their English spelling and are written in Malayalam the way every hotel writes them.',
        'Name the dish before the undo, the same way the place came before povumo in the auto.',
      ],
      tags: [],
    },
    {
      id: 'undello-aa-tablil-irunno',
      manglish: 'undello, aa tablil irunno',
      script: 'ഉണ്ടെല്ലോ ആ ടേബിളിൽ ഇരുന്നോ',
      meaning: 'yes we do — sit at that table',
      kind: 'sentence',
      audio: {
        slow: 'l5u7l1_undello-aa-tablil-irunno_slow',
        medium: 'l5u7l1_undello-aa-tablil-irunno_medium',
        normal: 'l5u7l1_undello-aa-tablil-irunno_normal',
      },
      acceptedInputs: ['undello aa tablil irunno', 'aa tablil irunno'],
      sentence: {
        bank: ['undello,', 'aa', 'tablil', 'irunno', 'illa'],
        orders: ['undello, aa tablil irunno', 'aa tablil irunno'],
        parts: [
          { word: 'undello,', meaning: 'yes, we do — the yes both sides already know' },
          { word: 'aa', meaning: 'that' },
          { word: 'tablil', meaning: 'at the table' },
          { word: 'irunno', meaning: 'sit down' },
        ],
      },
      notes: [
        'Undello is undu with the -ello on it, the same as-you-know ending as illallo on the phone — the waiter is agreeing with a question that was already hopeful.',
        'Tablil is table with the in-form on it: the English word takes a Malayalam ending the way hospital does in the auto, and the script spells it the way the sound goes.',
        'Irunno is the sit — aa tablil irunno points at a table and tells the learner to take it.',
      ],
      tags: [],
    },
    {
      id: 'oru-chicken-biriyaniyum-oru-fresh-lime-um-edukkaamo-chetta',
      manglish: 'oru chicken biriyaniyum oru fresh lime-um edukkaamo chetta',
      script: 'ഒരു ചിക്കൻ ബിരിയാണിയും ഒരു ഫ്രഷ് ലൈമും എടുക്കാമോ ചേട്ടാ',
      meaning: 'one chicken biriyani and a fresh lime, chetta',
      kind: 'sentence',
      audio: {
        slow: 'l5u7l1_oru-chicken-biriyaniyum-oru-fresh-lime-um-edukkaamo-chetta_slow',
        medium: 'l5u7l1_oru-chicken-biriyaniyum-oru-fresh-lime-um-edukkaamo-chetta_medium',
        normal: 'l5u7l1_oru-chicken-biriyaniyum-oru-fresh-lime-um-edukkaamo-chetta_normal',
      },
      acceptedInputs: [
        'oru chicken biriyaniyum oru fresh lime-um edukkaamo chetta',
        'chicken biriyaniyum fresh lime-um edukkaamo chetta',
      ],
      sentence: {
        bank: ['oru', 'chicken', 'biriyaniyum', 'fresh', 'lime-um', 'edukkaamo', 'chetta', 'venam'],
        orders: [
          'oru chicken biriyaniyum oru fresh lime-um edukkaamo chetta',
          'chicken biriyaniyum fresh lime-um edukkaamo chetta',
        ],
        parts: [
          { word: 'oru', meaning: 'one' },
          { word: 'chicken', meaning: 'chicken — the English word' },
          { word: 'biriyaniyum', meaning: 'biriyani, and' },
          { word: 'fresh', meaning: 'fresh — the English word' },
          { word: 'lime-um', meaning: 'lime, and' },
          { word: 'edukkaamo', meaning: 'can I take?' },
          { word: 'chetta', meaning: 'chetta! — the call form of chettan' },
        ],
      },
      notes: [
        'The -um on the end is the and: biriyaniyum, lime-um — one thing and another thing, joined by putting -um on each. English words take it too, which is why lime has a small dash before its -um.',
        'Edukkaamo is the can-I-take: the -aamo ending asks whether it is all right to do the thing, the polite shape of an order in a hotel.',
        'The chetta comes at the end here, after the order rather than in front of it — both places work, and this is the one that comes out when the order is two things long.',
      ],
      tags: [],
    },
    {
      id: 'vere-enthelum-veno',
      manglish: 'vere enthelum veno',
      script: 'വേറെ എന്തേലും വേണോ',
      meaning: 'anything else?',
      kind: 'sentence',
      audio: {
        slow: 'l5u7l1_vere-enthelum-veno_slow',
        medium: 'l5u7l1_vere-enthelum-veno_medium',
        normal: 'l5u7l1_vere-enthelum-veno_normal',
      },
      sentence: {
        bank: ['vere', 'enthelum', 'veno', 'venam'],
        orders: ['vere enthelum veno'],
        parts: [
          { word: 'vere', meaning: 'other, else' },
          { word: 'enthelum', meaning: 'anything' },
          { word: 'veno', meaning: 'want?' },
        ],
      },
      notes: [
        'The anything-else question the market taught, in its hotel shape: vere is else, enthelum is anything, and veno is the want with a question on it.',
        'Vallathum and enthelum both mean anything — vallathum is what the market keeper said, enthelum is what comes out at the table.',
      ],
      tags: [],
    },
    {
      id: 'vere-onnum-venda-chetta',
      manglish: 'vere onnum venda chetta',
      script: 'വേറെ ഒന്നും വേണ്ട ചേട്ടാ',
      meaning: 'nothing else, chetta',
      kind: 'sentence',
      audio: {
        slow: 'l5u7l1_vere-onnum-venda-chetta_slow',
        medium: 'l5u7l1_vere-onnum-venda-chetta_medium',
        normal: 'l5u7l1_vere-onnum-venda-chetta_normal',
      },
      acceptedInputs: ['vere onnum venda chetta', 'onnum venda chetta'],
      sentence: {
        bank: ['vere', 'onnum', 'venda', 'chetta', 'venam'],
        orders: ['vere onnum venda chetta', 'onnum venda chetta'],
        parts: [
          { word: 'vere', meaning: 'other, else' },
          { word: 'onnum', meaning: 'anything at all' },
          { word: 'venda', meaning: "no need; don't want" },
          { word: 'chetta', meaning: 'chetta! — the call form of chettan' },
        ],
      },
      notes: [
        'Onnum is the anything of a no: with venda after it, the pair means nothing at all. The same two words turned the tea down.',
        'The chetta at the end keeps the no warm — the waiter asked, there is nothing else, and the address says the asking was fine.',
      ],
      tags: [],
    },
    {
      id: 'ok-oru-pathinanchu-minute',
      manglish: 'ok, oru pathinanchu minute',
      meaning: 'ok, fifteen minutes',
      kind: 'sentence',
      audio: {
        slow: 'l5u7l1_ok-oru-pathinanchu-minute_slow',
        medium: 'l5u7l1_ok-oru-pathinanchu-minute_medium',
        normal: 'l5u7l1_ok-oru-pathinanchu-minute_normal',
      },
      acceptedInputs: ['ok oru pathinanchu minute', 'oru pathinanchu minute'],
      sentence: {
        bank: ['ok,', 'oru', 'pathinanchu', 'minute', 'venam'],
        orders: ['ok, oru pathinanchu minute', 'oru pathinanchu minute'],
        parts: [
          { word: 'ok,', meaning: 'ok' },
          { word: 'oru', meaning: 'one' },
          { word: 'pathinanchu', meaning: 'fifteen' },
          { word: 'minute', meaning: 'minutes' },
        ],
      },
      notes: [
        'Ok is part English, so this line carries no script.',
        'Pathinanchu is fifteen, and it is written out as the word rather than as a numeral, because the learner is hearing it and typing it the way it is said.',
        'The waiter gives a time instead of an ithaa — the biriyani is not sitting ready, so the waiting is said out loud, and the learner waits.',
      ],
      tags: [],
    },
    {
      id: 'appo-sheri-chetta-kaanam',
      manglish: 'appo sheri chetta, kaanam',
      script: 'അപ്പോ ശരി ചേട്ടാ കാണാം',
      meaning: 'okay then chetta, see you',
      kind: 'sentence',
      audio: {
        slow: 'l5u7l1_appo-sheri-chetta-kaanam_slow',
        medium: 'l5u7l1_appo-sheri-chetta-kaanam_medium',
        normal: 'l5u7l1_appo-sheri-chetta-kaanam_normal',
      },
      acceptedInputs: ['appo sheri chetta kaanam', 'sheri chetta kaanam'],
      sentence: {
        bank: ['appo', 'sheri', 'chetta,', 'kaanam', 'venda'],
        orders: ['appo sheri chetta, kaanam', 'sheri chetta, kaanam'],
        parts: [
          { word: 'appo', meaning: 'then; at that point' },
          { word: 'sheri', meaning: 'okay' },
          { word: 'chetta,', meaning: 'chetta! — the call form of chettan' },
          { word: 'kaanam', meaning: 'see you — literally, will see' },
        ],
      },
      notes: [
        'The food comes, the learner eats, and the bill is settled before this line: three hundred and twenty rupees left on the table, twenty of that a small tip.',
        'Tipping is optional in Kerala — twenty on three hundred is a thank-you on the way out, never something the waiter is waiting for.',
        'Appo sheri is the then-okay that closes a visit, and kaanam is the see-you: the goodbye to someone the learner will come back to, the same shape as pinne kaanam.',
      ],
      tags: [],
    },
  ],
  minimalPairs: [],
  drills: [
    { kind: 'sentenceBuilder', itemId: 'chetta-chicken-biriyani-undo', mode: 'bank' },
    {
      kind: 'rolePlay',
      itemId: 'oru-chicken-biriyaniyum-oru-fresh-lime-um-edukkaamo-chetta',
      promptItemId: 'undello-aa-tablil-irunno',
      mode: 'typing',
    },
    { kind: 'rolePlay', itemId: 'vere-onnum-venda-chetta', promptItemId: 'vere-enthelum-veno', mode: 'typing' },
    { kind: 'rolePlay', itemId: 'appo-sheri-chetta-kaanam', promptItemId: 'ok-oru-pathinanchu-minute', mode: 'bank' },
    {
      kind: 'multipleChoice',
      itemId: 'vere-enthelum-veno',
      distractors: ['nothing else, chetta', 'ok, fifteen minutes'],
    },
  ],
  reviewSlots: 0,
  spriteId: 'l5u7l1',
};
