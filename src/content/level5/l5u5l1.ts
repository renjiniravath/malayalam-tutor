import type { Lesson } from '../types';

/**
 * Level 5 Unit 5 Lesson 1 — visiting family (PLAN.md §5 Level 5): the fifth
 * dialogue scene. Seven turns, and the learner opens it: the greeting at the
 * door, the answer and the come-in, the ask about sitting, the sit and the
 * tea in one breath, the yes to the tea, the when-will-you-come-next, and the
 * goodbye. This is the register scene — the polite you does the work here,
 * and the polite lines the course already taught (njan ivide irikkatte,
 * venam, pinne kaanam) are the lines the visit runs on. Each learner turn
 * after the opener carries a role-play drill whose cue is the line right
 * before it.
 */
export const l5u5l1: Lesson = {
  id: 'l5u5l1',
  levelId: 'l5',
  unitId: 'l5u5',
  title: 'Visiting family',
  comprehensionOnly: false,
  items: [
    {
      id: 'chechi-ningal-engane-und',
      manglish: 'chechi, ningaḷ engane und',
      script: 'ചേച്ചി നിങ്ങൾ എങ്ങനെ ഉണ്ട്',
      meaning: 'chechi, how are you?',
      kind: 'sentence',
      audio: {
        slow: 'l5u5l1_chechi-ningal-engane-und_slow',
        medium: 'l5u5l1_chechi-ningal-engane-und_medium',
        normal: 'l5u5l1_chechi-ningal-engane-und_normal',
      },
      acceptedInputs: ['chechi ningal engane und'],
      sentence: {
        bank: ['chechi,', 'ningaḷ', 'engane', 'und', 'njan'],
        orders: ['chechi, ningaḷ engane und'],
        parts: [
          { word: 'chechi,', meaning: 'chechi — the everyday address for women' },
          { word: 'ningaḷ', meaning: 'you — the polite you' },
          { word: 'engane', meaning: 'how' },
          { word: 'und', meaning: 'is' },
        ],
      },
      notes: [
        'The learner arrives and greets the elder with ningaḷ, the polite you — never nee to someone older.',
        'Engane und is the how-are-you from the greetings, and it takes the same answer here as anywhere.',
      ],
      tags: [],
    },
    {
      id: 'nannayitt-pokunnu-vaa',
      manglish: 'nannayitt pokunnu, vaa',
      script: 'നന്നായിട്ട് പോകുന്നു വാ',
      meaning: "it's going well — come in",
      kind: 'sentence',
      audio: {
        slow: 'l5u5l1_nannayitt-pokunnu-vaa_slow',
        medium: 'l5u5l1_nannayitt-pokunnu-vaa_medium',
        normal: 'l5u5l1_nannayitt-pokunnu-vaa_normal',
      },
      sentence: {
        bank: ['nannayitt', 'pokunnu,', 'vaa', 'pokaam'],
        orders: ['nannayitt pokunnu, vaa'],
        parts: [
          { word: 'nannayitt', meaning: 'well' },
          { word: 'pokunnu,', meaning: 'is going' },
          { word: 'vaa', meaning: 'come' },
        ],
      },
      notes: [
        'The answer to engane und, and the door opening in the same breath — a house does both at once.',
        'Vaa is come: the plain call for someone you are glad to see, and the everyday form of the invitation.',
      ],
      tags: [],
    },
    {
      id: 'njan-ivide-irikkatte-visit',
      manglish: 'njan ivide irikkatte',
      script: 'ഞാൻ ഇവിടെ ഇരിക്കട്ടെ',
      meaning: 'may I sit here?',
      kind: 'sentence',
      audio: {
        slow: 'l5u5l1_njan-ivide-irikkatte-visit_slow',
        medium: 'l5u5l1_njan-ivide-irikkatte-visit_medium',
        normal: 'l5u5l1_njan-ivide-irikkatte-visit_normal',
      },
      sentence: {
        bank: ['njan', 'ivide', 'irikkatte', 'venam'],
        orders: ['njan ivide irikkatte'],
        parts: [
          { word: 'njan', meaning: 'I' },
          { word: 'ivide', meaning: 'here' },
          { word: 'irikkatte', meaning: 'may I sit' },
        ],
      },
      notes: [
        'The polite line from the outings lesson, doing its real work here: the guest asks, and the house says sit.',
        'Irikkatte carries the asking the way idaṇo did at the tea shop — the whole question is may I sit.',
      ],
      tags: [],
    },
    {
      id: 'ivide-irikk-chaaya-veno',
      manglish: 'ivide irikk, chaaya veno',
      script: 'ഇവിടെ ഇരിക്ക് ചായ വേണോ',
      meaning: 'sit here — want tea?',
      kind: 'sentence',
      audio: {
        slow: 'l5u5l1_ivide-irikk-chaaya-veno_slow',
        medium: 'l5u5l1_ivide-irikk-chaaya-veno_medium',
        normal: 'l5u5l1_ivide-irikk-chaaya-veno_normal',
      },
      sentence: {
        bank: ['ivide', 'irikk,', 'chaaya', 'veno', 'venda'],
        orders: ['ivide irikk, chaaya veno'],
        parts: [
          { word: 'ivide', meaning: 'here' },
          { word: 'irikk,', meaning: 'sit' },
          { word: 'chaaya', meaning: 'tea' },
          { word: 'veno', meaning: 'do you want?' },
        ],
      },
      notes: [
        'Two moves in one line the way a house makes them: sit, and something to drink.',
        'Veno is the do-you-want from chechi, chaaya veno, and the answer comes back as venam or venda.',
      ],
      tags: [],
    },
    {
      id: 'venam-chechi',
      manglish: 'venam, chechi',
      script: 'വേണം ചേച്ചി',
      meaning: 'yes please, chechi',
      kind: 'sentence',
      audio: {
        slow: 'l5u5l1_venam-chechi_slow',
        medium: 'l5u5l1_venam-chechi_medium',
        normal: 'l5u5l1_venam-chechi_normal',
      },
      acceptedInputs: ['venam chechi', 'venam'],
      sentence: {
        bank: ['venam,', 'chechi', 'venda'],
        orders: ['venam, chechi'],
        parts: [
          { word: 'venam,', meaning: 'want; yes please' },
          { word: 'chechi', meaning: 'chechi — the everyday address for women' },
        ],
      },
      notes: [
        'The yes to the offer: venam, with the chechi after it to keep it warm — the same move as venda chetta at the tea shop.',
        'Venda would refuse. At a house the first offer is taken.',
      ],
      tags: [],
    },
    {
      id: 'ini-ningal-eppo-varum',
      manglish: 'ini ningaḷ eppo varum',
      script: 'ഇനി നിങ്ങൾ എപ്പോ വരും',
      meaning: 'when will you come next?',
      kind: 'sentence',
      audio: {
        slow: 'l5u5l1_ini-ningal-eppo-varum_slow',
        medium: 'l5u5l1_ini-ningal-eppo-varum_medium',
        normal: 'l5u5l1_ini-ningal-eppo-varum_normal',
      },
      sentence: {
        bank: ['ini', 'ningaḷ', 'eppo', 'varum', 'evide'],
        orders: ['ini ningaḷ eppo varum'],
        parts: [
          { word: 'ini', meaning: 'next' },
          { word: 'ningaḷ', meaning: 'you — the polite you' },
          { word: 'eppo', meaning: 'when' },
          { word: 'varum', meaning: 'will come' },
        ],
      },
      notes: [
        'The question every house asks at the door: ini is next time, and the polite you is doing the work again.',
        'Eppo varum is the when-will-you-come from ningaḷ eppo varum, with ini in front of it.',
      ],
      tags: [],
    },
    {
      id: 'pinne-kaanam-chechi',
      manglish: 'pinne kaanam, chechi',
      script: 'പിന്നെ കാണാം ചേച്ചി',
      meaning: 'see you, chechi',
      kind: 'sentence',
      audio: {
        slow: 'l5u5l1_pinne-kaanam-chechi_slow',
        medium: 'l5u5l1_pinne-kaanam-chechi_medium',
        normal: 'l5u5l1_pinne-kaanam-chechi_normal',
      },
      acceptedInputs: ['pinne kaanam chechi', 'pinne kaanam'],
      sentence: {
        bank: ['pinne', 'kaanam,', 'chechi', 'bye'],
        orders: ['pinne kaanam, chechi'],
        parts: [
          { word: 'pinne', meaning: 'then, later' },
          { word: 'kaanam,', meaning: 'we will see each other' },
          { word: 'chechi', meaning: 'chechi — the everyday address for women' },
        ],
      },
      notes: [
        'The goodbye from the shop scenes with the chechi on the end — a house goodbye sounds like a counter one.',
        'The learner says it and the scene closes, the guest speaking last.',
      ],
      tags: [],
    },
  ],
  minimalPairs: [],
  drills: [
    { kind: 'sentenceBuilder', itemId: 'chechi-ningal-engane-und', mode: 'bank' },
    { kind: 'rolePlay', itemId: 'njan-ivide-irikkatte-visit', promptItemId: 'nannayitt-pokunnu-vaa', mode: 'typing' },
    { kind: 'rolePlay', itemId: 'venam-chechi', promptItemId: 'ivide-irikk-chaaya-veno', mode: 'typing' },
    { kind: 'rolePlay', itemId: 'pinne-kaanam-chechi', promptItemId: 'ini-ningal-eppo-varum', mode: 'bank' },
    {
      kind: 'multipleChoice',
      itemId: 'ivide-irikk-chaaya-veno',
      distractors: ['may I sit here?', 'see you, chechi'],
    },
  ],
  reviewSlots: 0,
  spriteId: 'l5u5l1',
};
