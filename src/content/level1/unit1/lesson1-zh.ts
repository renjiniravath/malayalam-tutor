/**
 * Level 1 Unit 1 Lesson 1 — The zha sound (ഴ).
 * Comprehension-only: hear, reveal, discriminate. No speaking drills yet.
 */

import type { Lesson } from '../../types'

export const lesson1Zh: Lesson = {
  id: 'l1u1l1',
  levelId: 'level1',
  unitId: 'unit1',
  title: 'The zha sound',
  reviewSlots: 0,
  sprite: { file: 'audio/l1u1l1.mp3' },
  items: [
    {
      id: 'zha',
      manglish: 'zha',
      script: 'ഴ',
      meaning: 'the zh sound — tongue curled back',
      kind: 'sound',
      articulation: {
        cue: 'Curl the tongue tip up and back and let air flow over it — a soft, buzzy r.',
      },
      audio: { slow: 'zha.slow', medium: 'zha.medium', normal: 'zha.normal', focus: ['zha.focus'] },
      notes: ['The sound in mazha (rain) and vazhi (way).'],
      tags: ['sound:zh', 'level:1'],
    },
    {
      id: 'la',
      manglish: 'la',
      script: 'ല',
      meaning: 'the la sound — like English l',
      kind: 'sound',
      articulation: {
        cue: 'Tongue tip behind the upper teeth, air flowing along the sides — like English l.',
      },
      audio: { slow: 'la.slow', medium: 'la.medium', normal: 'la.normal', focus: ['la.focus'] },
      tags: ['sound:zh', 'level:1'],
    },
    {
      id: 'mazha',
      manglish: 'mazha',
      script: 'മഴ',
      meaning: 'rain',
      kind: 'word',
      alsoIn: 'mazhakkaalam, the rainy season',
      audio: { slow: 'mazha.slow', medium: 'mazha.medium', normal: 'mazha.normal' },
      tags: ['sound:zh', 'level:1'],
    },
    {
      id: 'pazhaya',
      manglish: 'pazhaya',
      script: 'പഴയ',
      meaning: 'old',
      kind: 'word',
      pos: 'adjective',
      audio: { slow: 'pazhaya.slow', medium: 'pazhaya.medium', normal: 'pazhaya.normal' },
      tags: ['sound:zh', 'level:1'],
    },
    {
      id: 'kazhinju',
      manglish: 'kazhinju',
      script: 'കഴിഞ്ഞ്',
      meaning: 'over, finished',
      kind: 'word',
      audio: { slow: 'kazhinju.slow', medium: 'kazhinju.medium', normal: 'kazhinju.normal' },
      tags: ['sound:zh', 'level:1'],
    },
    {
      id: 'vazhi',
      manglish: 'vazhi',
      script: 'വഴി',
      meaning: 'way, route',
      kind: 'word',
      audio: { slow: 'vazhi.slow', medium: 'vazhi.medium', normal: 'vazhi.normal' },
      tags: ['sound:zh', 'level:1'],
    },
    {
      id: 'vali',
      manglish: 'vali',
      script: 'വലി',
      meaning: 'pain, ache',
      kind: 'word',
      audio: { slow: 'vali.slow', medium: 'vali.medium', normal: 'vali.normal' },
      tags: ['sound:zh', 'level:1'],
    },
  ],
  pairs: [
    { id: 'pair-zha-la', aItemId: 'zha', bItemId: 'la', segment: 'zh', aClip: 'zha.focus', bClip: 'la.focus' },
    { id: 'pair-vazhi-vali', aItemId: 'vazhi', bItemId: 'vali', segment: 'zh', aClip: 'vazhi.normal', bClip: 'vali.normal' },
  ],
  drills: [
    { kind: 'multipleChoice', itemId: 'mazha', distractors: ['pazhaya', 'kazhinju', 'vazhi'] },
    { kind: 'multipleChoice', itemId: 'pazhaya', distractors: ['mazha', 'kazhinju', 'vali'] },
    { kind: 'multipleChoice', itemId: 'kazhinju', distractors: ['mazha', 'pazhaya', 'vali'] },
    { kind: 'multipleChoice', itemId: 'vazhi', distractors: ['mazha', 'pazhaya', 'kazhinju'] },
    { kind: 'multipleChoice', itemId: 'vali', distractors: ['pazhaya', 'kazhinju', 'vazhi'] },
    { kind: 'minimalPair', pairId: 'pair-zha-la' },
    { kind: 'minimalPair', pairId: 'pair-vazhi-vali' },
  ],
}
