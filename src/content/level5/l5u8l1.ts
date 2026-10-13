import type { Lesson } from '../types';

/**
 * Level 5 Unit 8 Lesson 1 — at a wedding (PLAN.md §5 Level 5): the eighth
 * dialogue scene, and the register scene. The learner arrives and wishes the
 * family, is waved in, asks after the host before eating (the polite ningaḷ,
 * earning its keep), is sent to the meal, comes back to say they have eaten,
 * is offered more, and takes their leave with the may-I-go the first lessons
 * taught. Seven turns, the learner opening, every role-play cued by the line
 * before it. The retired spelling kettiyo is banned (native-speaker ruling
 * 2026-10-12), so the scene never asks about the marriage itself — the wish
 * carries the whole greeting.
 */
export const l5u8l1: Lesson = {
  id: 'l5u8l1',
  levelId: 'l5',
  unitId: 'l5u8',
  title: 'At a wedding',
  comprehensionOnly: false,
  items: [
    {
      id: 'chechi-aashamsakal',
      manglish: 'chechi, aashamsakaḷ',
      script: 'ചേച്ചി ആശംസകൾ',
      meaning: 'chechi, congratulations',
      kind: 'sentence',
      audio: {
        slow: 'l5u8l1_chechi-aashamsakal_slow',
        medium: 'l5u8l1_chechi-aashamsakal_medium',
        normal: 'l5u8l1_chechi-aashamsakal_normal',
      },
      acceptedInputs: ['chechi aashamsakal', 'aashamsakal'],
      sentence: {
        bank: ['chechi,', 'aashamsakaḷ', 'sheri,'],
        orders: ['chechi, aashamsakaḷ'],
        parts: [
          { word: 'chechi,', meaning: 'chechi! — the elder-sister call' },
          { word: 'aashamsakaḷ', meaning: 'congratulations' },
        ],
      },
      notes: [
        'Aashamsakaḷ is the word for the wish, said to the family as you arrive — the one word covers the whole of it.',
        'Chechi first, the way the visit opened: the name, then the wish.',
      ],
      tags: [],
    },
    {
      id: 'athe-chetta-vaa',
      manglish: 'athe, chetta, vaa',
      script: 'അതെ ചേട്ടാ വാ',
      meaning: 'yes, chetta — come in',
      kind: 'sentence',
      audio: {
        slow: 'l5u8l1_athe-chetta-vaa_slow',
        medium: 'l5u8l1_athe-chetta-vaa_medium',
        normal: 'l5u8l1_athe-chetta-vaa_normal',
      },
      acceptedInputs: ['athe chetta vaa', 'chetta vaa'],
      sentence: {
        bank: ['athe,', 'chetta,', 'vaa', 'irikk'],
        orders: ['athe, chetta, vaa'],
        parts: [
          { word: 'athe,', meaning: 'yes' },
          { word: 'chetta,', meaning: 'chetta! — the call form of chettan' },
          { word: 'vaa', meaning: 'come' },
        ],
      },
      notes: [
        'Athe takes the wish and vaa waves the learner in — the same come as at the family visit.',
        "The chetta goes the other way here: the host is the learner's chechi, and she calls the guest chetta. The same word, both ways round.",
      ],
      tags: [],
    },
    {
      id: 'chechi-ningal-kazhicho',
      manglish: 'chechi, ningaḷ kazhicho',
      script: 'ചേച്ചി നിങ്ങൾ കഴിച്ചോ',
      meaning: 'chechi, have you eaten?',
      kind: 'sentence',
      audio: {
        slow: 'l5u8l1_chechi-ningal-kazhicho_slow',
        medium: 'l5u8l1_chechi-ningal-kazhicho_medium',
        normal: 'l5u8l1_chechi-ningal-kazhicho_normal',
      },
      acceptedInputs: ['chechi ningal kazhicho', 'ningal kazhicho'],
      sentence: {
        bank: ['chechi,', 'ningaḷ', 'kazhicho', 'kazhichu'],
        orders: ['chechi, ningaḷ kazhicho'],
        parts: [
          { word: 'chechi,', meaning: 'chechi! — the elder-sister call' },
          { word: 'ningaḷ', meaning: 'you — the polite one' },
          { word: 'kazhicho', meaning: 'have you eaten?' },
        ],
      },
      notes: [
        'Ningaḷ is the polite you, and asking after the host before eating is the courtesy the moment calls for.',
        'Kazhicho is the eaten question: the -o on the end turns kazhichu into have you eaten.',
      ],
      tags: [],
    },
    {
      id: 'njan-kazhichu-avide-poyi-kazhikku',
      manglish: 'njan kazhichu, avide poyi kazhikku',
      script: 'ഞാൻ കഴിച്ചു അവിടെ പോയി കഴിക്ക്',
      meaning: 'I have eaten — go and eat over there',
      kind: 'sentence',
      audio: {
        slow: 'l5u8l1_njan-kazhichu-avide-poyi-kazhikku_slow',
        medium: 'l5u8l1_njan-kazhichu-avide-poyi-kazhikku_medium',
        normal: 'l5u8l1_njan-kazhichu-avide-poyi-kazhikku_normal',
      },
      acceptedInputs: ['njan kazhichu avide poyi kazhikku', 'avide poyi kazhikku'],
      sentence: {
        bank: ['njan', 'kazhichu,', 'avide', 'poyi', 'kazhikku', 'ivide'],
        orders: ['njan kazhichu, avide poyi kazhikku', 'avide poyi kazhikku'],
        parts: [
          { word: 'njan', meaning: 'I' },
          { word: 'kazhichu,', meaning: 'have eaten' },
          { word: 'avide', meaning: 'there' },
          { word: 'poyi', meaning: 'having gone' },
          { word: 'kazhikku', meaning: 'eat!' },
        ],
      },
      notes: [
        'The host answers for herself and sends the guest to the meal: the food is that way, and go and eat is poyi kazhikku.',
        'Kazhikku is the eat! said to someone — the meal word with the direction to it. Poyi before it is the going — go, and eat.',
      ],
      tags: [],
    },
    {
      id: 'chechi-kazhichu',
      manglish: 'chechi, kazhichu',
      script: 'ചേച്ചി കഴിച്ചു',
      meaning: 'chechi, I have eaten',
      kind: 'sentence',
      audio: {
        slow: 'l5u8l1_chechi-kazhichu_slow',
        medium: 'l5u8l1_chechi-kazhichu_medium',
        normal: 'l5u8l1_chechi-kazhichu_normal',
      },
      acceptedInputs: ['chechi kazhichu', 'kazhichu'],
      sentence: {
        bank: ['chechi,', 'kazhichu', 'kazhikkaam'],
        orders: ['chechi, kazhichu'],
        parts: [
          { word: 'chechi,', meaning: 'chechi! — the elder-sister call' },
          { word: 'kazhichu', meaning: 'have eaten' },
        ],
      },
      notes: [
        'Kazhichu is the ate from the evening at home, and one word of it answers the whole meal.',
        'The learner comes back to the host to say it, rather than slipping away from the line.',
      ],
      tags: [],
    },
    {
      id: 'athe-chetta-vere-veno',
      manglish: 'athe, chetta, vere veno',
      script: 'അതെ ചേട്ടാ വേറെ വേണോ',
      meaning: 'yes, chetta — want more?',
      kind: 'sentence',
      audio: {
        slow: 'l5u8l1_athe-chetta-vere-veno_slow',
        medium: 'l5u8l1_athe-chetta-vere-veno_medium',
        normal: 'l5u8l1_athe-chetta-vere-veno_normal',
      },
      acceptedInputs: ['athe chetta vere veno', 'vere veno'],
      sentence: {
        bank: ['athe,', 'chetta,', 'vere', 'veno', 'mathi'],
        orders: ['athe, chetta, vere veno'],
        parts: [
          { word: 'athe,', meaning: 'yes' },
          { word: 'chetta,', meaning: 'chetta! — the call form of chettan' },
          { word: 'vere', meaning: 'more; other' },
          { word: 'veno', meaning: 'want?' },
        ],
      },
      notes: [
        'Vere veno is the short want-more question; the stall asked it the long way, vere vallathum veno.',
        'A second helping is the Kerala way of saying the food was good, so the host always asks.',
      ],
      tags: [],
    },
    {
      id: 'venda-chechi-njan-pokatte',
      manglish: 'venda, chechi, njan pokatte',
      script: 'വേണ്ട ചേച്ചി ഞാൻ പോകട്ടെ',
      meaning: 'no, chechi — let me go',
      kind: 'sentence',
      audio: {
        slow: 'l5u8l1_venda-chechi-njan-pokatte_slow',
        medium: 'l5u8l1_venda-chechi-njan-pokatte_medium',
        normal: 'l5u8l1_venda-chechi-njan-pokatte_normal',
      },
      acceptedInputs: ['venda chechi njan pokatte', 'njan pokatte'],
      sentence: {
        bank: ['venda,', 'chechi,', 'njan', 'pokatte', 'venam'],
        orders: ['venda, chechi, njan pokatte', 'njan pokatte'],
        parts: [
          { word: 'venda,', meaning: 'do not want' },
          { word: 'chechi,', meaning: 'chechi! — the elder-sister call' },
          { word: 'njan', meaning: 'I' },
          { word: 'pokatte', meaning: 'may I go' },
        ],
      },
      notes: [
        'Venda turns down the second helping and njan pokatte takes the leave — the may-I-go from the first lessons, said to an elder.',
        'Turning the food down with a word and asking to go in the same breath is how a wedding visit ends.',
      ],
      tags: [],
    },
  ],
  minimalPairs: [],
  drills: [
    { kind: 'sentenceBuilder', itemId: 'chechi-aashamsakal', mode: 'bank' },
    { kind: 'rolePlay', itemId: 'chechi-ningal-kazhicho', promptItemId: 'athe-chetta-vaa', mode: 'typing' },
    { kind: 'rolePlay', itemId: 'chechi-kazhichu', promptItemId: 'njan-kazhichu-avide-poyi-kazhikku', mode: 'typing' },
    { kind: 'rolePlay', itemId: 'venda-chechi-njan-pokatte', promptItemId: 'athe-chetta-vere-veno', mode: 'bank' },
    {
      kind: 'multipleChoice',
      itemId: 'athe-chetta-vere-veno',
      distractors: ['chechi, have you eaten?', 'chechi, I have eaten'],
    },
  ],
  reviewSlots: 0,
  spriteId: 'l5u8l1',
};
