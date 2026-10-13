import type { Lesson } from '../types';

/**
 * Level 5 Unit 5 Lesson 1 — visiting family (PLAN.md §5 Level 5): the fifth
 * dialogue scene, re-authored to the native speaker's line-by-line dialogue
 * (2026-10-13). Eight turns, and the learner opens it: the greeting at the
 * door, the answer with the scolding inside it, the why-I-came, the come-in,
 * the tea announced, the polite refusal, the leaving, and the house's
 * goodbye with a visit of its own promised back. This is the register scene —
 * the polite lines the course already taught do the work here, and the
 * visitor is the one who arrives unannounced and declines the tea. Each
 * learner turn after the opener carries a role-play drill whose cue is the
 * line right before it.
 */
export const l5u5l1: Lesson = {
  id: 'l5u5l1',
  levelId: 'l5',
  unitId: 'l5u5',
  title: 'Visiting family',
  comprehensionOnly: false,
  items: [
    {
      id: 'hello-chechi-enna-und-vishesham',
      manglish: 'hello, chechi, enna und vishesham?',
      script: 'ഹലോ ചേച്ചി എന്നാ ഉണ്ട് വിശേഷം?',
      meaning: "hello chechi, what's up?",
      kind: 'sentence',
      audio: {
        slow: 'l5u5l1_hello-chechi-enna-und-vishesham_slow',
        medium: 'l5u5l1_hello-chechi-enna-und-vishesham_medium',
        normal: 'l5u5l1_hello-chechi-enna-und-vishesham_normal',
      },
      acceptedInputs: ['hello chechi enna und vishesham', 'chechi enna und vishesham'],
      sentence: {
        bank: ['hello,', 'chechi,', 'enna', 'und', 'vishesham', 'evide'],
        orders: ['hello, chechi, enna und vishesham'],
        parts: [
          { word: 'hello,', meaning: 'hello' },
          { word: 'chechi,', meaning: 'chechi — the everyday address for an elder sister' },
          { word: 'enna', meaning: 'what is it?' },
          { word: 'und', meaning: 'there is' },
          { word: 'vishesham', meaning: 'news' },
        ],
      },
      notes: [
        'The learner opens at the door with the greetings-lesson line: hello, the address, and enna und vishesham, the what-is-up.',
        'Chechi is the everyday address for an elder sister, or for any woman of that age — the same word the learner says to the conductor on the bus.',
      ],
      tags: [],
    },
    {
      id: 'sugham-aayitt-irikkunnu-entha-ee-vazhi',
      manglish: 'sugham aayitt irikkunnu, entha ee vazhi onnum parayathe pettannu?',
      script: 'സുഖം ആയിട്ട് ഇരിക്കുന്നു എന്താ ഈ വഴി ഒന്നും പറയാതെ പെട്ടന്ന്?',
      meaning: "I'm doing great — what's up? I didn't expect to see you today.",
      kind: 'sentence',
      audio: {
        slow: 'l5u5l1_sugham-aayitt-irikkunnu-entha-ee-vazhi_slow',
        medium: 'l5u5l1_sugham-aayitt-irikkunnu-entha-ee-vazhi_medium',
        normal: 'l5u5l1_sugham-aayitt-irikkunnu-entha-ee-vazhi_normal',
      },
      sentence: {
        bank: [
          'sugham',
          'aayitt',
          'irikkunnu,',
          'entha',
          'ee',
          'vazhi',
          'onnum',
          'parayathe',
          'pettannu',
          'veno',
        ],
        orders: ['sugham aayitt irikkunnu, entha ee vazhi onnum parayathe pettannu'],
        parts: [
          { word: 'sugham', meaning: 'comfort; fine' },
          { word: 'aayitt', meaning: 'the -aayitt that turns it into a state' },
          { word: 'irikkunnu,', meaning: 'am — literally am sitting' },
          { word: 'entha', meaning: 'what — the surprised what' },
          { word: 'ee', meaning: 'this' },
          { word: 'vazhi', meaning: 'way' },
          { word: 'onnum', meaning: 'anything' },
          { word: 'parayathe', meaning: 'without saying' },
          { word: 'pettannu', meaning: 'all at once' },
        ],
      },
      notes: [
        'The answer to engane und, with the scolding folded in: sugham aayitt irikkunnu says the learner is well, and the rest asks what this is.',
        'Onnum parayathe is without saying anything and pettannu is all at once — together they are the complaint that comes with every unannounced visit.',
      ],
      tags: [],
    },
    {
      id: 'kurach-kaalam-aayallo-ellarem-kanditt',
      manglish: 'kurach kaalam aayallo ellarem kanditt, chumma irangiyath',
      script: 'കുറച്ച് കാലം ആയല്ലോ എല്ലാരേം കണ്ടിട്ട് ചുമ്മാ ഇറങ്ങിയത്',
      meaning: "it's been a while since I saw everyone — I just came over",
      kind: 'sentence',
      audio: {
        slow: 'l5u5l1_kurach-kaalam-aayallo-ellarem-kanditt_slow',
        medium: 'l5u5l1_kurach-kaalam-aayallo-ellarem-kanditt_medium',
        normal: 'l5u5l1_kurach-kaalam-aayallo-ellarem-kanditt_normal',
      },
      acceptedInputs: [
        'kurach kaalam aayallo ellarem kanditt chumma irangiyath',
        'kurach kaalam aayallo ellarem kanditt',
        'chumma irangiyath',
      ],
      sentence: {
        bank: [
          'kurach',
          'kaalam',
          'aayallo',
          'ellarem',
          'kanditt,',
          'chumma',
          'irangiyath',
          'evide',
        ],
        orders: ['kurach kaalam aayallo ellarem kanditt, chumma irangiyath'],
        parts: [
          { word: 'kurach', meaning: 'a bit of' },
          { word: 'kaalam', meaning: 'time' },
          { word: 'aayallo', meaning: "it has been — the -allo hands it over to agree with" },
          { word: 'ellarem', meaning: 'everyone' },
          { word: 'kanditt,', meaning: 'since seeing' },
          { word: 'chumma', meaning: 'just' },
          { word: 'irangiyath', meaning: 'the stepping out' },
        ],
      },
      notes: [
        'Kurach kaalam aayallo is the it-has-been-a-while, said so the other person can agree instead of answering.',
        'Chumma irangiyath gives the reason without making a reason of it: chumma is just, and irangiyath is stepping out of the house.',
      ],
      tags: [],
    },
    {
      id: 'keri-vaa-ellarum-und',
      manglish: 'keri vaa, ellarum und',
      script: 'കേറി വാ എല്ലാരും ഉണ്ട്',
      meaning: "come in, everyone's here",
      kind: 'sentence',
      audio: {
        slow: 'l5u5l1_keri-vaa-ellarum-und_slow',
        medium: 'l5u5l1_keri-vaa-ellarum-und_medium',
        normal: 'l5u5l1_keri-vaa-ellarum-und_normal',
      },
      sentence: {
        bank: ['keri', 'vaa,', 'ellarum', 'und', 'evide'],
        orders: ['keri vaa, ellarum und'],
        parts: [
          { word: 'keri', meaning: 'get in' },
          { word: 'vaa,', meaning: 'come' },
          { word: 'ellarum', meaning: "everyone's" },
          { word: 'und', meaning: 'there is' },
        ],
      },
      notes: [
        'The come-in from the greetings lesson, with the reason attached: ellarum und, everyone is here.',
        'Keri vaa is the same step-up as the auto ride, said from the other side of the doorway — come up, come in.',
      ],
      tags: [],
    },
    {
      id: 'chaaya-edukkette',
      manglish: 'chaaya edukkette',
      script: 'ചായ എടുക്കട്ടെ',
      meaning: 'let me get some tea',
      kind: 'sentence',
      audio: {
        slow: 'l5u5l1_chaaya-edukkette_slow',
        medium: 'l5u5l1_chaaya-edukkette_medium',
        normal: 'l5u5l1_chaaya-edukkette_normal',
      },
      sentence: {
        bank: ['chaaya', 'edukkette', 'veno'],
        orders: ['chaaya edukkette'],
        parts: [
          { word: 'chaaya', meaning: 'tea' },
          { word: 'edukkette', meaning: 'let me get' },
        ],
      },
      notes: [
        'The learner goes in and sits down with the family; a few minutes later the tea is announced.',
        'Eduttho at the stall was the taking; edukkette is the same word with the -ette on it, which announces what the speaker is about to do rather than asking.',
        'No question comes with it — the house says it is getting tea, and the answer is yes or venda.',
      ],
      tags: [],
    },
    {
      id: 'venda-chechi-kozhappamilla',
      manglish: 'venda chechi, kozhappamilla',
      script: 'വേണ്ട ചേച്ചി കൊഴപ്പമില്ല',
      meaning: "no need, chechi — don't trouble yourself",
      kind: 'sentence',
      audio: {
        slow: 'l5u5l1_venda-chechi-kozhappamilla_slow',
        medium: 'l5u5l1_venda-chechi-kozhappamilla_medium',
        normal: 'l5u5l1_venda-chechi-kozhappamilla_normal',
      },
      acceptedInputs: ['venda chechi kozhappamilla', 'venda chechi', 'venda'],
      sentence: {
        bank: ['venda', 'chechi,', 'kozhappamilla', 'venam'],
        orders: ['venda chechi, kozhappamilla'],
        parts: [
          { word: 'venda', meaning: "no need; don't want" },
          { word: 'chechi,', meaning: 'chechi — the everyday address for an elder sister' },
          { word: 'kozhappamilla', meaning: 'no trouble' },
        ],
      },
      notes: [
        'The venda that refuses, with the chechi after it to keep it warm — the same move as venda chetta at the counter, said to the house instead.',
        'Kozhappamilla is no trouble: declining the tea is not declining the visit, and the second word says so.',
      ],
      tags: [],
    },
    {
      id: 'enna-njan-iranguva-pinne-oru-dhivasam-veram',
      manglish: 'enna njan iranguva, pinne oru dhivasam veram',
      script: 'എന്നാ ഞാൻ ഇറങ്ങുവാ പിന്നെ ഒരു ദിവസം വരാം',
      meaning: "well then, I'll head off — I'll come another day",
      kind: 'sentence',
      audio: {
        slow: 'l5u5l1_enna-njan-iranguva-pinne-oru-dhivasam-veram_slow',
        medium: 'l5u5l1_enna-njan-iranguva-pinne-oru-dhivasam-veram_medium',
        normal: 'l5u5l1_enna-njan-iranguva-pinne-oru-dhivasam-veram_normal',
      },
      acceptedInputs: [
        'enna njan iranguva pinne oru dhivasam veram',
        'njan iranguva pinne oru dhivasam veram',
        'pinne oru dhivasam veram',
      ],
      sentence: {
        bank: ['enna', 'njan', 'iranguva,', 'pinne', 'oru', 'dhivasam', 'veram', 'pokaam'],
        orders: ['enna njan iranguva, pinne oru dhivasam veram'],
        parts: [
          { word: 'enna', meaning: 'then' },
          { word: 'njan', meaning: 'I' },
          { word: 'iranguva,', meaning: 'will head off' },
          { word: 'pinne', meaning: 'later' },
          { word: 'oru', meaning: 'one' },
          { word: 'dhivasam', meaning: 'day' },
          { word: 'veram', meaning: 'will come' },
        ],
      },
      notes: [
        'The tea is turned down and the visit ends; the learner is the one who says it is time to go.',
        'Enna is the then that closes a visit, and iranguva is the same stepping out as chumma irangiyath — this time the learner is the one doing it.',
        'Pinne oru dhivasam veram is the promise made at the door: one day, not a date — the shape every goodbye takes.',
      ],
      tags: [],
    },
    {
      id: 'sheri-enna-njangal-oru-dhivasam-angott-varaam',
      manglish: 'sheri enna, njangaḷ oru dhivasam angott varaam',
      script: 'ശരി എന്നാ ഞങ്ങൾ ഒരു ദിവസം അങ്ങോട്ട് വരാം',
      meaning: "okay then — we'll come over one day",
      kind: 'sentence',
      audio: {
        slow: 'l5u5l1_sheri-enna-njangal-oru-dhivasam-angott-varaam_slow',
        medium: 'l5u5l1_sheri-enna-njangal-oru-dhivasam-angott-varaam_medium',
        normal: 'l5u5l1_sheri-enna-njangal-oru-dhivasam-angott-varaam_normal',
      },
      sentence: {
        bank: ['sheri', 'enna,', 'njangaḷ', 'oru', 'dhivasam', 'angott', 'varaam', 'evide'],
        orders: ['sheri enna, njangaḷ oru dhivasam angott varaam'],
        parts: [
          { word: 'sheri', meaning: 'okay' },
          { word: 'enna,', meaning: 'then' },
          { word: 'njangaḷ', meaning: 'we' },
          { word: 'oru', meaning: 'one' },
          { word: 'dhivasam', meaning: 'day' },
          { word: 'angott', meaning: 'that way, over there' },
          { word: 'varaam', meaning: 'will come' },
        ],
      },
      notes: [
        'Njangal is we — the learner and whoever they came with, never the person being spoken to.',
        'Angott is the over-there of njan ippo angott pokum, pointed back the other way: the visit is returned, not just accepted. Njangal keeps its ḷ on screen and typing it without the ḷ is accepted.',
      ],
      tags: [],
    },
  ],
  minimalPairs: [],
  drills: [
    { kind: 'sentenceBuilder', itemId: 'hello-chechi-enna-und-vishesham', mode: 'bank' },
    {
      kind: 'rolePlay',
      itemId: 'kurach-kaalam-aayallo-ellarem-kanditt',
      promptItemId: 'sugham-aayitt-irikkunnu-entha-ee-vazhi',
      mode: 'typing',
    },
    {
      kind: 'rolePlay',
      itemId: 'venda-chechi-kozhappamilla',
      promptItemId: 'chaaya-edukkette',
      mode: 'typing',
    },
    {
      kind: 'rolePlay',
      itemId: 'enna-njan-iranguva-pinne-oru-dhivasam-veram',
      promptItemId: 'venda-chechi-kozhappamilla',
      mode: 'bank',
    },
    {
      kind: 'multipleChoice',
      itemId: 'chaaya-edukkette',
      distractors: ["come in, everyone's here", "no need, chechi — don't trouble yourself"],
    },
  ],
  reviewSlots: 0,
  spriteId: 'l5u5l1',
};
