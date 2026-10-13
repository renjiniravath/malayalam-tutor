import type { Level } from './types';
import { level1 } from './level1';
import { level2 } from './level2';
import { level3 } from './level3';
import { level4 } from './level4';
import { level5 } from './level5';

export { level1, level2, level3, level4, level5 };
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
  // 21: Level 3 lessons 4-6 add the -nte, -um, -aayi and -il ninnu items —
  // 38 new ids, nothing existing moved.
  // 22: native-speaker rulings — varuva and varunnund are the same (varuva
  // the casual one); the -aayi model became the just-happened ee bucket full
  // aayi; -il ninnu displays as the clipped ninn; the bare coming-from
  // statements gave way to the aarokke question and the cleft pair, and the
  // new lesson l3u2l1 teaches the ... aanu ...ath question.
  // 23: the pointless avarude veedu avide und retired for the model
  // belonging sentence akhilinte car black color aanu (l3u1l4).
  // 24: the -a on entha/etha/eppozha taught as the fused copula (notes in
  // l2u3l2 and l3u2l1, the eppozha same-word note corrected), and the model
  // sentence eth busa added to l2u3l2.
  // 25: no linguistic jargon in learner copy — dative, declarative, vocative
  // and the phonetics labels rewritten in plain English (notes, one canDo,
  // one articulation cue); no ids or keys moved.
  // 26: the last jargon stragglers in learner copy — particle, case suffix and
  // the calling-word note's "stands as the subject" — rewritten in plain
  // English (two notes, one canDo); no ids moved.
  // 27: Level 4 (Making Sentences) opens with its first four lessons — the
  // casual past, the -um future and -aam plans, the person + time + verb
  // frames, and the day words. 40 new ids; nothing existing moved.
  // 28: the Level 4 sign-off rulings — the level becomes four units of one
  // lesson (ids l4u1l1, l4u2l1, l4u3l1, l4u4l1, one can-do line each, so
  // three lesson ids and three sprite ids move; item ids stay), poyi and the
  // doubled -aam are the displays (poi/nokkam/pokam stay accepted), the
  // sentences take their time, place and to-us forms, and the -aam notes
  // gain its second job.
  // 29: nammaḷkku is the display for both datives (native-speaker ruling
  // 2026-10-12) — the Level 1 pronoun item (id namukku) and the Level 4
  // sentence (id namukku-ippo-pokaam) now display nammaḷkku with the script
  // നമ്മൾക്ക്, and namukku stays an accepted input; no ids or keys moved.
  // 30: English words take the full -kku (native-speaker ruling 2026-10-12)
  // — the movie sentence (id nammal-innu-kadayil-pokaam) displays cinemakku
  // and now accepts the fast-speech cinemakk as an explicit input, the same
  // split the jolikku item already carries; no ids or keys moved.
  // 31: the same split reaches the four jolikku sentences (ids
  // njan-jolikku-pokuva, nammal-jolikku-pokuva, njan-jolikku-pokum and
  // avan-jolikku-pokum) — each accepts the clipped jolikk explicitly
  // instead of resting on the one-typo rule, with the fast-speech note;
  // no ids or keys moved.
  // 32: Level 4 completed — l4u5l1 (saying no), l4u6l1 (asking in
  // sentences), l4u7l1 and l4u8l1 (the assembling block) are new lessons
  // with new items; nothing existing changed, and no ids or keys moved.
  // 33: the Level 4 second-half sign-off (native-speaker rulings
  // 2026-10-12) — sixteen sentences re-keyed under their corrected words
  // (time not kaashu, vannilla, the bag and the laptop, ninte veedu,
  // enthaanu vendath, medichath, tonight going angott, the ninn in the
  // eating suggestion, the glass of water, the morning pokum, chechi enth
  // paranju, ivide irikkatte, nammal evide aanu pokunnath, kaappikku and
  // the Ernakulam bus uḷḷath), the three -illa past words vannilla,
  // kandilla and etthiyilla added as items, and the same entha-before-a-
  // verb correction applied to avan enth paranju in l4u1l1 (the ruled
  // form, found by sweeping the build for it). Two loan pins (glass,
  // laptop) carry the spellings the script requires.
  // 34: the second Level 4 sign-off round (native-speaker, 2026-10-12) —
  // three items in l4u6l1 re-keyed: the bus question becomes ee bus
  // engotta (the fused asking a, as in aara and eppozha), the how-do-I
  // question becomes ithu engane aanu cheyyunnath, and the who question
  // becomes athu aara paranje; nothing else moved.
  // 35: the same round's refinement, superseding two of those three —
  // the bus question takes the long aanu ...unnath shape (ee bus engott
  // aanu pokunnath, no fused a) and the who question takes the ...ath
  // ending (athu aara paranjath, lining up with pokunnath and medichath);
  // the how-do-I question stands as ruled.
  // 36: two more cleft questions from the same native-speaker round join
  // l4u8l1 — the lunch question and the game question, both part English
  // and so shown without script, both accepting the typed ni for nee.
  // New ids; nothing existing moved.
  // 37: Level 5 (Real Conversations) opens with its first two scenes —
  // l5u1l1 at the tea shop and l5u2l1 at the market, the first lessons
  // played with the new role-play step, where the other speaker's line is
  // the cue and the learner answers it. 16 new ids; nothing existing moved.
  // 38: the native-speaker second round on both scenes — shop scenes do not
  // haggle and the learner opens the exchange, so both scenes are re-cut to
  // seven turns: the tea shop runs chetta, oru chaaya / sugar idaano /
  // venda chetta / chaaya ready / ethra aayi, chetta / patthu roopa /
  // thanks chetta, pinne kaanam, and the market runs chetta, thakkaaḷikk
  // ethra aanu / muppatthu roopa / sheri chetta, ara kilo eduttho / vere
  // vallathum veno / venda, ithu mathi / pathinanchu roopa / sheri, pinne
  // kaanam. The haggling arc and the keeper's greeting lines retire (13
  // ids), 11 ids are new, and sheri-pinne-kaanam moves from l5u1l1 to
  // l5u2l1 under its own id. Both recognition drills are re-authored on
  // turns that survive.
  // 39: the tea-shop sugar question takes its ruled form (native-speaker
  // correction 2026-10-12) — the word is ഇടണോ, not ഇടാണോ, so the item
  // displays sugar idaṇo and retires the sugar-idaano id it shipped under
  // in revision 38; the folded sugar idano is accepted in typing. The
  // script, the id, the drill references and the can-do line move with it.
  // 40: Level 5 gains three more scenes on the same role-play machinery
  // (native-speaker brief 2026-10-12) — l5u3l1 the auto ride, l5u4l1 the
  // phone call and l5u5l1 visiting family, seven turns each, the learner
  // opening and the other speaker cued by the turn before. The fare is a
  // plain exchange (no haggling), the phone questions carry their own
  // context, and the visit is the register scene, where the polite you and
  // the already-taught polite lines do the work. 21 new ids; nothing
  // existing moved, and the hello loan pin carries the script's single ല.
  // 41: Level 5 completed — l5u6l1 a ticket on the bus, l5u7l1 a meal at the
  // hotel and l5u8l1 at a wedding join the five scenes (native-speaker brief
  // 2026-10-12), seven turns each, the learner opening and every role-play
  // cued by the line before it. The bus scene carries two moments, and the
  // gap is said in plain English on the line that ends the first and on the
  // conductor's line that opens the second; the fare for two is one payment.
  // The hotel ends on the bill and a small tip, and the note says the tip is
  // optional. The wedding is the register scene — the polite ningaḷ and the
  // may-I-go — and it never asks about the marriage itself, since kettiyo is
  // a banned spelling. 21 new ids; nothing existing moved, and the ticket and
  // bill loan pins carry the scripts those two English words are written with.
  // 42: the native speaker's line-by-line re-authoring of scenes 3-8
  // (2026-10-13), on the same role-play machinery — longer, more natural
  // turns, the same cue chains. The auto ride runs government hospital-ilekk
  // povumo / kerikko / ivide nirtthikko, ethra aayi chetta / nooru roopa /
  // ok, thank you. The phone call runs hello / hello, babunte veed aano /
  // athelo, pakshe babu ippo sthalath illallo / oh, babu eppo varum enn
  // ariyamo / oru ara manikkoor kazhiyumbo varum enna paranjath / ok, babu
  // verumbo suresh call cheythayirunnu enn paranjal mathi / ok / thank you.
  // The family visit runs hello, chechi, enna und vishesham / sugham aayitt
  // irikkunnu, entha ee vazhi onnum parayathe pettannu / kurach kaalam
  // aayallo ellarem kanditt, chumma irangiyath / keri vaa, ellarum und /
  // chaaya edukkette / venda chechi, kozhappamilla / enna njan iranguva,
  // pinne oru dhivasam veram / sheri enna, njangaḷ oru dhivasam angott
  // varaam. The bus ride runs chechi, ee bus pala vazhi aano pokunnath /
  // athe, kerikko / chechi, rand pala / muppathu roopa / ithaa baakki
  // irupathu, with the conductor a woman the learner addresses as chechi
  // (native-speaker ruling 2026-10-13, the opening question included). The
  // hotel runs chetta, chicken biriyani undo / undello, aa tablil irunno /
  // oru chicken biriyaniyum oru fresh lime-um edukkaamo chetta / vere
  // enthelum veno / vere onnum venda chetta / ok, oru pathinanchu minute /
  // appo sheri chetta, kaanam, with the bill and its optional tip a stage
  // direction in the last note rather than a line. The wedding runs hello
  // bro, enna und vishesham / hello, sugham aayitt irikkunneda, ninakk enna
  // und / oh ingane pokunnu, kazhicho / illa, nee kazhicho / enna vaa
  // irikkam / ok, njan avare koode viḷikkette, the familiar address the eda
  // form and never edi (native-speaker ruling 2026-10-13). 41 ids retire,
  // 38 are new, and nooru-roopa carries over in the auto ride. Chicken,
  // biriyani, fresh, lime-um, tablil and the government/hospital pair are
  // pinned as English loans; ok, thank you and bro take no script, because
  // those lines mix in English the script rules cannot spell sound for
  // sound.
  // 43 (native-speaker rulings 2026-10-13): questions carry '?' in the
  // display — both the manglish and the script — across all five levels, 76
  // items marked; the word bank, the accepted orders and the accepted inputs
  // stay punctuation-free, and the matcher folds a trailing '?' away, so a
  // learner never types one (§9 rule 8). Display spellings changed under the
  // unchanged ids, so nothing is re-keyed. The family visit's second line
  // carries the native gloss ("I'm doing great — what's up? I didn't expect
  // to see you today."), its manglish unchanged. The hotel's seating line
  // takes the to-form — undello, aa tableilekk irunno — so that one id is
  // re-keyed (see removedItemIds) and tableilekk joins the loan pins. The
  // scene stage directions (the auto reaching the junction, the learner
  // sitting down, the conductor coming down the aisle, the food and the
  // bill) are visible learner notes on the turns they lead into.
  revision: 43,
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
    // Native-speaker ruling 2026-10-07: -aayi is for something that just
    // happened, so avan teacher aayi is out (ee bucket full aayi replaces
    // it); the bare coming-from statements are replaced by the aarokke
    // question and the cleft pair taught in l3u2l1.
    'avan-teacher-aayi',
    'njan-veettil-ninn-varunnund',
    'avan-officil-ninn-varunnund',
    // Native-speaker ruling 2026-10-08: a belonging sentence must carry
    // information — avarude veedu avide und was pointless and is replaced
    // by the model akhilinte car black color aanu.
    'avarude-veedu-avide-und',
    // Level 4 second-half rulings: sixteen sentences re-keyed under the
    // corrected words (see revision 33).
    'enikk-ippo-kaashu-illa',
    'avan-innale-officil-illa',
    'ithu-ente-chaaya-alla',
    'athu-ente-veedu-alla',
    'kada-evide-aanu',
    'ningalkku-entha-venam',
    'ithu-evide-ninn-aanu-vaangiyath',
    'njan-innu-raathri-veettil-kazhikkum',
    'nammalkku-avide-kazhikkaam',
    'enikk-ippo-oru-kaappi-venam',
    'njan-innu-raavile-officil-pokuva',
    'chechi-entha-paranju',
    'njan-evide-irikkam',
    'nammalkku-evide-pokaam',
    'oru-kaappi-ethra-aanu',
    'ippo-oru-bus-undo',
    // The same entha-before-a-verb correction in l4u1l1.
    'avan-entha-paranju',
    // Second Level 4 sign-off round: three l4u6l1 questions re-keyed
    // under the native speaker's preferred forms (see revision 34).
    'ee-bus-evide-pokum',
    'ithu-engane-cheyyum',
    'athu-aaru-paranju',
    // The round's refinement superseded two of those three (see
    // revision 35): the bus question and the who question re-keyed again.
    'ee-bus-engotta',
    'athu-aara-paranje',
    // The Level 5 second round (see revision 38): the keeper's greeting
    // lines retire when the learner opens the scene, and the market
    // haggling arc is gone — shop scenes do not haggle.
    'oru-chaaya-veno',
    'athe-oru-chaaya',
    'sugar-veno',
    'sugar-venda',
    'ithaa-chaaya',
    'chetta-ethra-aanu',
    'chetta-thakkaali-ethra-aanu',
    'irupathu-roopa',
    'athu-kooduthal-aanu',
    'pathinettu-roopa',
    'arai-kilo-mathi',
    'illa-ithu-mathi',
    'sheri-patthu-roopa',
    // The sugar question re-keyed under its ruled word (see revision 39):
    // ഇടണോ, so the id and the display carry idaṇo, not idaano.
    'sugar-idaano',
    // The six scenes re-authored to the native speaker's line-by-line
    // dialogue (see revision 42). Scene by scene: the auto ride's old
    // opening, get-in, stop and hundred, keeping nooru-roopa; the phone
    // call's whole first cut; the family visit's whole first cut; the bus
    // ride's whole first cut, including the Ernakulam destination; the
    // hotel's whole first cut, including the bill and the tip line; and the
    // wedding's whole first cut, including the aashamsakaḷ wish.
    'chetta-veettilekku-pokaam',
    'sheri-keri',
    'ethra-aayi-auto',
    'ivide-nirtthu',
    'ivide-aano',
    'athe-ivide-mathi',
    'hello-aara',
    'njan-suresh-aanu',
    'enna-und-vishesham-call',
    'innu-raathri-angott-varunnundo',
    'athe-njan-varaam',
    'sheri-raathri-kaanam',
    'sheri-bye',
    'chechi-ningal-engane-und',
    'nannayitt-pokunnu-vaa',
    'njan-ivide-irikkatte-visit',
    'ivide-irikk-chaaya-veno',
    'venam-chechi',
    'ini-ningal-eppo-varum',
    'pinne-kaanam-chechi',
    'chetta-ee-bus-engott-aanu-pokunnath',
    'athe-ernakulam',
    'sheri-chetta-njan-keri',
    'evide-chetta-bus',
    'ernakulam-randu-ticket',
    'irupathu-roopa-bus',
    'ithaa-irupathu-roopa',
    'chetta-oru-choru-venam',
    'sheri-chetta-vere-vallathum-veno',
    'oru-chaaya-koodi',
    'ithaa-choru',
    'chetta-bill-ethra-aanu',
    'nooru-roopa-hotel',
    'ithaa-nooru-roopa-anchu-koodi',
    'chechi-aashamsakal',
    'athe-chetta-vaa',
    'chechi-ningal-kazhicho',
    'njan-kazhichu-avide-poyi-kazhikku',
    'chechi-kazhichu',
    'athe-chetta-vere-veno',
    'venda-chechi-njan-pokatte',
    // Native-speaker correction 2026-10-13: the waiter's seating line takes
    // the to-form, so it is re-keyed under the corrected spelling.
    'undello-aa-tablil-irunno',
  ],
};

/** Every item id in current content — the key set progress reconciles against. */
export function currentItemIds(): string[] {
  return levels.flatMap((level) =>
    level.lessons.flatMap((lesson) => lesson.items.map((item) => item.id)),
  );
}

export const levels: Level[] = [level1, level2, level3, level4, level5];
