/**
 * Articulation diagram assets, keyed by file name as referenced from
 * content (`item.articulation.diagram`). Next.js serves the SVGs as
 * static assets; the player renders them via <img> with an alt text.
 */

import aVowel from '@/content/articulations/a-vowel.svg'
import iVowel from '@/content/articulations/i-vowel.svg'
import kHold from '@/content/articulations/k-hold.svg'
import k from '@/content/articulations/k.svg'
import l from '@/content/articulations/l.svg'
import r from '@/content/articulations/r.svg'
import t from '@/content/articulations/t.svg'
import th from '@/content/articulations/th.svg'
import uVowel from '@/content/articulations/u-vowel.svg'
import zh from '@/content/articulations/zh.svg'

export const ARTICULATION_ASSETS: Record<string, string> = {
  'a-vowel.svg': aVowel,
  'i-vowel.svg': iVowel,
  'k-hold.svg': kHold,
  'k.svg': k,
  'l.svg': l,
  'r.svg': r,
  't.svg': t,
  'th.svg': th,
  'u-vowel.svg': uVowel,
  'zh.svg': zh,
}
