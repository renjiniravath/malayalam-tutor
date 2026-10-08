import type { Level } from './types';
import { level1 } from './level1';
import { level2 } from './level2';
import { level3 } from './level3';

export { level1, level2, level3 };
export { audioManifest } from './audio/manifest';
export { imageManifest } from './images/manifest';
export * from './types';

/**
 * Content revision marker (PLAN.md §11). Bump `revision` on every content
 * change that affects learner state; it is stored with progress and
 * reconciled on load so edits never orphan cards. Item IDs themselves stay
 * immutable.
 */
export interface ContentRevision {
  revision: number;
  /**
   * Item ids removed at some revision. A re-added id is re-keyed on
   * reconciliation: its old records are archived and it starts fresh.
   */
  removedItemIds: string[];
}

export const contentRevision: ContentRevision = {
  // 20: the -o and -um particles write a plain y (neeyo, neeyum) — display
  // spellings changed under the unchanged ids, so nothing is re-keyed.
  revision: 20,
  removedItemIds: [
    // Native-speaker corrections re-keyed these items under their corrected spellings.
    'kettiyo',
    'varunno',
    'ningal-varunno',
    'avan-varunno',
    'nii-varunno',
    'njan-chaaya-venam',
    'njan-veedu-pokuva',
    // Final rulings: long i is written ee (not ii), and the retired
    // vowel-length pair varam/vaaram was replaced by aadi/adi.
    'niyyo',
    'niyyum',
    'nii-varunnundo',
    'njan-viittil-pokuva',
    'varam',
    'vaaram',
    // Native-speaker corrections: 'njan parayuva' is not said in
    // conversation, and 'njan sheri' means "I correct" — the fine
    // answer is njan okay aanu.
    'njan-parayuva',
    'njan-sheri',
    // Final ruling: the geminate minimal-pair slot is ila/illa,
    // replacing kallam/kalam.
    'kallam',
    'kalam',
    // Beginner-sentence rule: the kaapi illa id retired when the item
    // moved to the English slot; the kaappi ruling later brought the
    // Malayalam word back, under the unchanged coffee-illa id.
    'kaapi-illa',
    // Final rulings: standalone kudi is dropped and the u/oo pair
    // slot has no pair; kuudi re-keyed as koodi (long u = oo).
    'kudi',
    'kuudi',
    // Ruling: kudikkuka is the formal directive form and is not
    // taught now — learners get kudikkuva and kudikkum only.
    'kudikkuka',
    // Rulings on L2U2/L3U1: njan busil varuva became njan angott
    // varuva; nee chaaya kudikkum became the tag form kudikkumello,
    // alle; hotel keeps its English single t; officekku dropped
    // (officilekk is the to-form).
    'njan-busil-varuva',
    'nee-chaaya-kudikkum',
    'hottelil',
    'hottelilekk',
    'njan-hottelilekk-pokuva',
    'nammal-hottelilekk-pokuva',
    'officekku',
    'avan-officekku-pokuva',
    // Rulings on politeness and cases: question forms for the ladder
    // (ayaaḷ/addheham/avar), the iyaaḷ copula item dropped, chetta
    // njan ippo varuva dropped, and the shop words became the native
    // kada (kadayil, kadayilott).
    'ayaal-varuva',
    'iyaal-ready-aanu',
    'addheham-varuva',
    'avar-varuva',
    'chetta-njan-ippo-varuva',
    'shoppil',
    'njan-shoppil-pokuva',
    'shoppilekk',
    'avan-shoppilekk-pokuva',
    // Refinement: kadayilott became kadayilekk for consistency with
    // the -ilekk lesson pattern.
    'kadayilott',
    'avan-kadayilott-pokuva',
    // Mega-round: puzha replaces vali; greetings reworked (nannayitt
    // pokunnu, ennaa und vishesham, appo sheri bye); avan varunnund;
    // njan veettil ninn irangi; nammal veettil pokuva; chettan/chechi
    // replace aunty; busil keran pokuva replaces busilekk pokuva.
    'vali',
    'nalla-irippu',
    'ennaa-vishesham',
    'poyi-varatte',
    'avan-varuva',
    'njan-ippo-varuva',
    'nammal-ippo-pokuva',
    'aunty',
    'aunty-ready-aano',
    'aunty-chaaya-veno',
    'njan-busilekk-pokuva',
    // Gap-fill: plan spellings — enna und vishesham (single a),
    // nannaayitt pokunnu (double aa), eppozhaa (double aa). The
    // spelling rulings then reverted nannaayitt and eppozha to their
    // earlier ids, which are current again; only the intermediate
    // double-aa ids stay removed.
    'ennaa-und-vishesham',
    'nannaayitt-pokunnu',
    'eppozhaa',
    // Deep pass: puzha takes the zh teaching slot, azhaku drops out.
    'azhaku',
    // Spec audit: avar's question matches the ingott pattern; the
    // ladder gains iyaaḷ ingott varunnundo.
    'avar-varunnundo',
    // Near/far ruling: nammal is not part of the i-/a- paradigm, so the
    // near/far pair item is gone — nammal itself is taught with the
    // pronouns in L1U3L2 (id 'nammal').
    'nammal-pair',
  ],
};

/** Every item id in current content — the key set progress reconciles against. */
export function currentItemIds(): string[] {
  return levels.flatMap((level) =>
    level.lessons.flatMap((lesson) => lesson.items.map((item) => item.id)),
  );
}

export const levels: Level[] = [level1, level2, level3];
