# Plan: Learn Malayalam

> **Learn Malayalam — the way Kerala actually talks.**

Interactive web app teaching **conversational Manglish** — casual, English-mixed Malayalam as actually spoken in Kerala and in modern Malayalam movies — to adult English speakers.

Research this plan is based on: [`research-language-learning.md`](./research-language-learning.md) (evidence-based methods, gamification) and [`research-malayalam.md`](./research-malayalam.md) (Malayalam linguistics, romanization, audio tech).

---

## 1. What we are building

A boot.dev-style web app: the student progresses through levels, earns XP, and passes tests that deliberately recall earlier lessons. Every word and sentence has **audio at multiple speeds** (slow, medium, normal) and — for concrete nouns and verbs — a **visual** of the object or action. **Malayalam script is displayed passively** alongside the romanization (reading/writing *lessons* remain a later version). The primary device is a **phone**: installable PWA, offline-ready audio, touch-first UI.

**The wedge:** no existing resource (Moag, Ling, uTalk, 50Languages, EliKutty) teaches the colloquial cinema register. They teach formal written Malayalam or generic phrasebook vocabulary. We teach the way people actually talk.

## 2. Goals

1. A learner can start from zero English-only and reach the point of **framing small sentences** and **understanding common fast conversational Malayalam**, with romanization as the working alphabet and script shown passively.
2. The experience is interactive and rewarding: XP, levels, streaks with grace, achievements, and visible competence progress — progress without punishment.
3. **Mobile-first from day one** — designed for phone screens and real-life practice gaps; installable and usable offline for lessons.
4. **Pronunciation is tested, not just demonstrated**: auto-scored minimal-pair discrimination plus speak-and-compare self-assessment on every lesson, because the words and sentences are simple enough for it.
5. Content is authored by native Malayalam speakers in a fast, typed, validated format; audio is generated once and reviewed, never synthesized at runtime.

**Scale targets (v1):** ~400–450 items (words, phrases, sentences) across 5 levels; ~40 lessons × 5–10 minutes ≈ **6–8 h of core content**; with review, tests, and repetition cycles, realistic completion is ~30–50 h of app time. Honest framing: that lands in the A1–A2 conversational range (CEFR A2 ≈ 50–100 guided hours).

## 3. Non-goals (v1)

- Malayalam script **reading/writing lessons** — a later version (script is displayed passively in v1, never taught)
- Speech recognition (ASR) — closed-set minimal-pair discrimination + self-assessment instead
- Formal/literary register as the base — casual Manglish is primary
- Accounts, sync, social features — local-first progress (but see §11: durability is treated as a hard requirement)
- Runtime TTS or Web Speech API dependence
- Native-speaker articulation **video** — articulation coaching ships as a brief text cue + sound-focus audio (visual diagrams and video are dropped)

## 4. Design principles (from research)

| Principle | Evidence | How it shapes the app |
|---|---|---|
| Audio-first, text-second | Segment-based orthography impaired adults' prosody learning on first exposure (Cambridge study) | Romanization **and script** stay hidden until the item is heard; audio is mandatory on every item. (Deliberate deviation from the research suggestion to always show script — the orthography finding is stronger.) |
| Spaced retrieval, not re-reading | Testing beats re-reading by ~30% (Roediger & Karpicke) | Tests are the teaching mechanism; learners cannot skip them |
| FSRS over SM-2/Leitner | ~700M-review benchmarks: same retention, 20–30% fewer reviews | `ts-fsrs` drives all review scheduling, desired retention 0.90 |
| Mastery-based progression | Advance on accuracy, not repetition counts | Level unlock = passing the level test; failed items re-enter the queue |
| Pimsleur anticipation loop | Prompt → pause → learner speaks → model answer = retrieval + production + feedback in one | The core drill mechanic, using our slow/normal audio pair |
| Comprehension before production | Delayed oral practice evidence; input-only designs underdevelop output | The first 2–3 lessons of Level 1 are audio-only (hear, recognize, discriminate); aloud repetition starts after that |
| Block first, interleave later | Interleaving wins for confusable items (Malayalam minimal pairs); blocking wins for first exposure and pronunciation | New material grouped; review and tests interleave |
| Visuals for concrete items only | Gesture/visual benefit is specific to iconic, meaning-bearing words | Nouns and verbs get visuals; grammar gets pattern frames instead |
| Frequency-ordered vocabulary | Top 100 words ≈ 50% of running text; 1,000 ≈ 80–85% | Early levels feel productive fast |
| CEFR-style can-do levels | Can-do statements make a level mean something | Every level states what you can *do* after passing |
| 5–10 minute lessons | Adult attention span; microlearning completion data | Streak winnable in under 10 minutes; daily review is capped so it stays that way |
| Gamify progress, never punish | Hearts caused anxiety; no-break streaks produced "not quitting, not learning"; XP-gaming | No hearts, no XP loss for help, streaks with earned grace + explicit pause, no public leaderboards |
| Mobile-first | Product decision — the learner practices in daily gaps, on a phone | 360 px viewport floor, 44 px touch targets, safe-area handling, offline audio sprites, PWA install |

Malayalam-specific principles (from `research-malayalam.md`):

- **Pronunciation is sequenced by perceptual difficulty**, not alphabet order: ഴ (zh) first, then dental/retroflex/alveolar, then gemination, then vowel length. These four get slow audio + minimal-pair drills.
- **Articulation coaching is a brief text cue + audio.** Early visual tongue diagrams were tried and dropped as confusing; the cue names the gesture in plain words ("curl the tongue tip up and back, let air flow over it") and the sound-focus clips do the teaching. Gemination and vowel length are *duration* features and get duration drills, not tongue cues. Cues appear **passively** during the comprehension-only first lessons; motor practice starts when the Repeat drill unlocks.
- **The core teachable pattern is suffix assimilation into English nouns**: `office → officil`, `joli → jolikku` (fast speech: `jolikk`). Teach this early — it is the actual mechanic of Manglish and immediately usable.
- **Verbs don't agree for person/gender/number** — say this explicitly; it removes a burden English speakers expect.
- **Colloquial forms are the primary forms**: `pokuva` not `pokunnu`; `vaa` not `varoo`; `ippo`, `enthaa`; tag questions (`alle?`, `kettiyo?`) and the `-o` particle appear early (Level 1, expressions unit; Level 2, in sentences) — they carry most conversational turn-taking.
- **Politeness is a first-class early module**: `nee / ningal / taankal` and the honorific ladder (`ayaan / iyaal / addeham`, honorific `avar`), with **pro-drop and title substitution as the safe default**.
- **Audio is the source of truth for pronunciation.** No romanization is unambiguous; the UI never lets text override sound.

## 5. Curriculum map

All levels use English-alphabet romanization; Malayalam script is shown passively (secondary) after each audio reveal. Can-do statements follow CEFR framing. Unit item counts are targets; word lists below are **shorthand ASCII** (shipped content uses strict §9 spellings, e.g. `chaaya`, `veedu`, `kaashu`, `veḷḷam`). Each unit = 1–3 lessons of 5–10 minutes.

### Level 1 — Sounds & Words (Building Blocks) · ~80 items, 10 lessons
**Can do:** recognize and produce the four hard sound classes; greet; use ~40 highest-frequency nouns, ~10 core verbs (as casual present forms), and pronouns; use ~10 everyday expressions.

Units:
1. **First sounds** (3 lessons, comprehension-only — no speaking yet) — ഴ, dental/retroflex/alveolar, gemination, vowel length. Sound-focus clips + minimal-pair discrimination + **text articulation cues for ഴ and the coronal series** (no visuals).
2. **Greetings & expressions** (~10 items) — `engane und?`, `ennaa vishesham?`, `seri`, `nokkam`, `ayyo`, `pinnalla`, `alle?`, `poyi varatte`.
3. **Pronouns** — `njan`, `nee`, `ningal`, `taankal`, `avan`, `aval`, `nammal`, `namukku`, plus pro-drop.
4. **High-frequency nouns** (visuals) — food/drink (`vellam`, `chaya`, `kaapi`, `choru`), people (`amma`, `achan`, `chechi`, `kuttikal`), home/city (`veedu`, `joli`, `kashu`, `vazhi`), ~40 items.
5. **Core verbs** (action visuals) — taught as **casual present-tense chunks** usable in sentences immediately: `pokuva`, `varuva`, `cheyyuva`, `parayuva`, `kudikkuva`, `kazhikkuva`, `irikkuva`, `kodukkuva`, `edukkuva`, `vaanguva`, `nokkuva`, `kittuva` — with the root noted (`pok`) for later pattern work.

### Level 2 — First Sentences · ~80 items, 8 lessons
**Can do:** understand and say simple present-tense sentences built from Level 1 words; ask and answer yes/no questions.

- The **present-tense pattern** (`-uva`) made explicit, using the Level 1 verb chunks: `njan chaaya kudikkuva`, `avan varuva`
- The **copula**: `aanu` / `aano` ("X is Y" — `njan ready aa`), and yes/no answers: `athe`, `alla`, `illa` (moved here from Level 4 — dialogues depend on them)
- **Every new word in a sentence is explained** — word-by-word breakdown on a tap
- Tag questions (`alle?`, `kettiyo?`), the `-o` particle (`niyyo?`)
- Politeness in context: `nee` vs `ningal` vs `taankal`; the third-person ladder (`ayaan`, `iyaal`, `addeham`, honorific `avar`); title substitution (`Aunty`, `Chetta`)

### Level 3 — Cases & Connectors (Beginner+) · ~60 items, 6 lessons
**Can do:** attach case suffixes to English and Malayalam words to say where, where-to, whose, for-whom.

- `-il` (in/at), `-ilekk` (to), `-kku` (to/for), `-nte` (of), `-um` (also/and), `-aayi` (as/with), `-il ninnu` (from)
- **Suffix assimilation with English words** as the flagship pattern: `officil`, `jolikku` (fast speech `jolikk`), `shoppil`, `busil`, `hotelilekk`
- Frame drills: `[word] + [suffix] + [verb]` — `njan officil pokuva`

### Level 4 — Making Sentences (Intermediate) · ~85 items, 8 lessons
**Can do:** build small original sentences from learned words; use past and future patterns; negate fully; ask wh-questions.

- Casual verb patterns beyond present: past (`poi`), future/intent (`pokum`, `pokam`)
- Negation in full: `illa`, `alla`, `venda`
- Question words: `evide`, `eppo`, `enthaa`, `ethra`, `engane`, `aaru`
- Sentence-builder exercises (word bank → assemble; type free-form answers)

### Level 5 — Real Conversations (Pre-advanced, still romanized) · ~100 phrases/dialogues, 8 lessons
**Can do:** follow and take part in short natural conversations in the target register.

- Dialogue scenes: chaya kada, market, auto ride, phone call, family visit
- Listening to fast natural speech: slow (0.6) → medium (0.75) → normal ("real speed") ladder
- Manglish mix ratio: learn where English words slot in (`order cheyyam`, `ready aano?`)
- Role-play: prompt → learner's line → model answer (anticipation loop at sentence level)

### Later versions (explicitly out of scope now)
Malayalam script reading/writing lessons, accounts & sync, ASR-based speaking practice (revisit when Malayalam ASR improves), custom illustration set, articulation video, ISO 15919 display toggle (deferred: the strict Manglish display layer + passive script covers teaching needs).

## 6. The lesson loop (core interaction)

0. **Audio unlock (one-time):** first visit shows a "Tap to start" gate; the tap unlocks a single shared `AudioContext`. All playback routes through it (handles mobile autoplay policy, iOS silent switch via `navigator.audioSession.type = 'playback'`, and avoids per-clip `<audio>` element fragility — each lesson's clips are a single **audio sprite**: one MP3 + offset table for gapless, sample-accurate prompts).

1. **Hear** — audio plays (slow first); visual shown for concrete items; romanization and script stay hidden
2. **See** — romanization + English meaning revealed (tap, or auto after audio completes); **Malayalam script appears passively alongside, styled secondary** (`lang="ml"` for screen readers)
3. **Repeat** — anticipation drill: prompt → silence → learner says it aloud → model audio plays (slow, then normal). **Skipped in the first 2–3 lessons** (comprehension-first phase). **Silent mode** available everywhere: "think, then reveal" without the spoken step, for buses and offices.
4. **Recognize** — multiple-choice meaning, image-to-word, word-to-image
5. **Discriminate** — closed-set minimal pairs (which sound did you hear?), interleaved from earlier lessons. This is the **auto-scored pronunciation test**.
6. **Speak & compare** — **pronunciation practice on every item**: play model → learner says it aloud → model plays again for self-comparison. No microphone, no recording, no scoring — the self-assessment is logged but never blocks progress.
7. **Produce** — type the romanization (forgiving ASCII input matching, never diacritics; **per-drill accepted-variant lists** cover pro-drop and word-order freedom) or assemble from a word bank. Sentence-builder variant at Level 4; dialogue role-play at Level 5.

New material is **blocked** within a lesson; **review items from 3–5 lessons back are injected at random positions** inside the lesson (Duolingo's Review Exercises pattern). Lessons target 5–10 minutes, 3–8 new items.

Accessibility (WCAG 2.2 AA target): everything keyboard-navigable; the anticipation pause is user-extendable (WCAG 2.2.1); `prefers-reduced-motion` honored; an **accessibility preference reveals text immediately** for screen-reader and deaf/HoH users (the audio-first pedagogy applies to sighted hearing learners).

## 7. Tests and spaced recall

- **Level test** (terminal, `TestSpec`): 20–25 items drawn on the whole level, interleaved, in three sections — **recognition** (auto-scored), **production** (auto-scored), **pronunciation** (auto-scored minimal-pair discrimination). Pass ≥ 80% unlocks the next level. **Retakes are unlimited and free**: to retake, first complete the failed-items review module — the cooldown *is* the relearning, not a punishment. Self-assessed speak-and-compare items are logged, never part of the pass bar.
- **Sounds checkpoint**: at the end of Level 1 unit 1, a discrimination-only test (≥ 80%) gates the speaking phase.
- **FSRS review queue**: every item is a card **keyed by `{itemId, skill}`** — recognition and production decay independently, so each gets its own card. Scheduled by `ts-fsrs` (desired retention 0.90 — a long-run per-card target, separate from the test bar). Review is interleaved into lessons and surfaced daily as a "do you remember this?" module.
- **Daily review is capped** (~10 min of due cards per day; overflow rolls over) so the streak promise is never broken by a post-lapse pile.
- **Review logs**: every `ts-fsrs` review returns a log; persist it from day one so FSRS parameters can be optimized on real data later.
- **Mistakes collection**: any wrong answer is added and revisited. Practice Hub also gets a **"Sound check"** module (discrimination drills) alongside the mistakes module.
- **Progress dashboard**: per-level can-do checklist + per-sound mastery (e.g., "zh mastered") rather than vague percentages.
- All scheduling/streak logic runs against an **injectable clock** so day-boundary, grace, and freeze behavior are unit-testable.

## 8. Gamification (boot.dev-style, minus the dark patterns)

**Do:**
- XP for learning behaviors (drills completed, tests passed, reviews done); level thresholds ramp up so early levels come fast
- Ranks/titles per level
- Daily streak **winnable in under 10 minutes**
- Streak **grace**: earn freezes by completing bonus review milestones (boot.dev's Frozen Flame analog); an explicit **pause** button that preserves the streak without consuming freezes
- Achievements: "First 100 words", "Perfect lesson", "Zh Master", "7-day streak"
- Optional: private stats only — no public leaderboards in v1

**Don't (documented harms):**
- Hearts/lives — anxiety, sessions cut short
- XP penalties for viewing help or retrying
- Unbreakable streaks — produced "not quitting, not learning — just maintaining"
- Leaderboard XP gaming

## 9. Romanization spec (enforced by content lint, not convention)

| Sound | Spelling | | Sound | Spelling |
|---|---|---|---|---|
| long a/i/u | **always double**: `aa ii uu` (`chaaya`, `veedu`, `kaapi`) | | ഴ | `zh` |
| long e/o | **always single**: `e o` (`pokuva`, `ippo`, `chechi`) — matches Malayalee typing; audio disambiguates | | ഞ (ഞ്ഞ) | `nj` |
| dental ത / ദ | `th` / `dh` | | ശ | `sh` |
| retroflex ട / ഡ | `t` / `d` | | ഫ | `ph` |
| gemination | double the consonant (`tt` = ട്ട, `tth` = ത്ത, `kk`, `pp`, `mm`) | | ങ (ങ്ങ) | `ng` |
| ള ണ (common!) | `ḷ` `ṇ` | | ന്ത / ന്റ | `nth` / `nt` (e.g. `-nte`) |
| റ (rare) | `ṟ` in sound-teaching items; `r` in colloquial words (`choru`, `parayuva`) | | colloquial voicing | ട/ഡ written `d` when pronounced so (`veedu`, `evide`, `und`) |

Rules:
1. Long a/i/u always doubled; long e/o never doubled (deliberate — matches how Malayalees actually type; `content:check` enforces it).
2. Dental vs retroflex always distinguished (`th` vs `t`).
3. ള and ണ are common sounds (`veḷḷam`, `veṇṇa`), not rare — dedicated symbols in the **display layer**.
4. Never use capitalization as a phonemic signal (mobile auto-capitalize).
5. **Display layer is strict** (this table, diacritics included). **Input layer is ASCII-forgiving**: accept loose Manglish (`l` for ള, `n` for ണ, plain `t/d` for either dental or retroflex), case-insensitive, diacritic-folded, with small typo tolerance. Learners never type diacritics on a phone.
6. **Script rule**: the Malayalam script field spells the **colloquial form** the way Malayalis write it informally (e.g., `pokuva` → പോകുവാ). Where no natural colloquial spelling exists, show the standard written form with a small "written form" badge; if that misleads, omit script for that item. Never source script from formal texts (Moag et al.). Native-speaker sign-off per item — this rule protects the app's entire register promise.
7. Audio is the source of truth; UI copy never claims romanization is unambiguous.

## 10. Audio pipeline

- **Pre-generate everything** into static files at content/build time. No runtime TTS, no Web Speech API dependency (device voice availability is unreliable).
- **Provider selection is an M0 spike, not an assumption**: generate reference clips of colloquial Manglish samples with (a) **Sarvam Bulbul V3** (best reported quality on code-mixed input — verify voice availability and output format with a live call), (b) **Google Cloud TTS WaveNet ml-IN**, (c) **Google Chirp 3 HD ml-IN** (earlier research found no SSML/rate support on it — irrelevant to our pipeline since we derive slow audio locally; include only if its colloquial quality merits a listen test). Verify the ml-IN voice list against live provider docs, and check **provider terms permit redistributing generated audio in a public product** before committing.
- **Generate ONE normal clip per item via TTS** (mono MP3, ~64 kbps). **Derive slow (0.6) and medium (0.75) locally** with `rubberband`/`ffmpeg atempo` — pitch-preserving, deterministic, and guarantees the clips match; naive TTS rate control flattens exactly the duration cues (gemination, vowel length) learners need.
- **Post-process every clip**: trim the leading/trailing silence TTS adds (untamed, it desynchronizes anticipation pauses) and loudness-normalize (EBU R128, ~-16 LUFS) so tiers are level-matched.
- **Audio sprites**: per lesson, one MP3 + JSON offset table — gapless playback, fewer files, content-hashed filenames with long-lived cache headers (avoid `public/`'s `max-age=0` revalidation on every play). **Each sprite includes clips for the lesson's review pool** (items from 3–5 lessons back), so injected reviews need no cross-lesson loading.
- **Sound-focus clips** for the four hard sound classes (segment-level holds).
- **Native-speaker review gate**: every clip **and every articulation cue** is reviewed by a native Malayalam speaker before shipping. TTS accuracy on colloquial forms is not guaranteed. The pipeline is **incremental** (hash text/voice/settings; skip unchanged clips) and review happens in a small keyboard-driven batch review UI — the full pass is ~2.5 h of audio, which realistically costs **10+ h of reviewer time** per pass, so human review (not spend) is the bottleneck.
- **Cost is a non-issue**: ~60k characters for the entire v1 curriculum is cents to ~$1 at any candidate provider; even 50 regeneration passes won't register.
- Audio files are **build artifacts, not committed to git** — `npm run audio:gen` regenerates them from content.

## 11. Tech stack & architecture

- **Next.js (App Router) + TypeScript + Tailwind CSS v4** (CSS-first config — pin the version; v3 snippets won't build). Deployed on **Vercel**, prerendered — **not** `output: 'export'` (keeps the option of image optimization, API routes, middleware for later analytics/sync).
- **Audio playback**: one shared `AudioContext` unlocked by a first-tap gate; `navigator.audioSession.type = 'playback'` so the iOS silent switch doesn't mute the app; per-lesson audio sprites (§10). The **service worker caches audio sprites for offline lessons**, within an explicit iOS storage budget.
- **`ts-fsrs`** (MIT, TypeScript) for spaced repetition. Cards (`{itemId, skill}`), review logs, progress (XP, rank, per-sound mastery, can-do state), streak/achievement/mistake state stored **local-first in IndexedDB** (via `dexie`), indexed on due; isolated behind a store interface so sync can be added later.
- **Durability (hard requirement for local-first)**: installable **PWA** with `navigator.storage.persist()` (iOS Safari evicts IndexedDB after ~7 days of inactivity otherwise — exactly the lapse a streak-with-grace system must survive), **JSON export/import from day one**, and in-app Add-to-Home-Screen guidance. Ship in M3.
- **Mobile-first concrete specs**: 360 px viewport floor; ≥44 px touch targets; `100dvh` + safe-area insets in the player; no hover-only affordances; Playwright runs include mobile viewports.
- **Script & fonts**: Malayalam text via **Noto Sans Malayalam** (OFL, `next/font/google`); `lang="ml"` on all script spans (WCAG 3.1.2 — screen readers switch voice); content:check validates script fields (NFC normalization, ZWJ/ZWNJ sanity, characters within Malayalam Unicode block).
- **Content = typed TypeScript modules** in `src/content/`, one file per lesson. `npm run content:check` enforces: §9 romanization rules, **script-field sanity**, audio/manifest presence, **image present for every concrete noun/verb (and never an emoji character)**, **image license record present and on-allowlist**, duplicate `manglish` strings, tag referential integrity, every `sound:*` item has focus clips **and articulation info**, clip size/duration sanity (catches truncated or silent generations), **minimal-pair validation** (duration-delta + perceptual-hash comparison; pairs below a similarity threshold are flagged for human review).
- **Images**: free images and icon/illustration sets (photos are weak for verbs — sets stay allowed), with a per-asset **license record** (source, author, license). Allowlist: CC0/Public Domain, CC BY (editable); CC BY-SA displayed as-is only (editing re-publishes as SA); **ND excluded**. "Edited to fit our style" is implemented as a **runtime/build styling treatment** (consistent color treatment, framing, filters) rather than re-published edits, which avoids SA share-alike obligations. A generated **credits page** carries attributions (CC BY requires it). Images are committed (unlike audio) with a size budget.
- **Content versioning**: a `contentRevision` is stored with progress; on load, reconcile — retire cards for removed items gracefully, never orphan learner state. **Item IDs are immutable.**
- **Deployment scale**: `vercel deploy --archive=tgz` (15k-file CLI cap); move `/audio` to Vercel Blob or R2 once past ~5k files. **Vercel Pro** at public launch (Hobby is non-commercial and caps data transfer at 100 GB/month — audio-heavy free traffic needs Pro).
- **Observability**: client analytics (Vercel Analytics or Plausible) + Sentry added with the M5 private beta — launching blind otherwise.
- **Testing**: unit tests for the store/FSRS layer with an injectable clock (streak/day-boundary/grace), and Playwright runs of the lesson loop (desktop + mobile viewports).
- Accessible (WCAG 2.2 AA) and mobile-first — the learner will most likely be on a phone.

## 12. Data model (sketch)

```ts
type Item = {
  id: string                 // immutable
  manglish: string           // strict display romanization per §9
  script?: string            // Malayalam script, colloquial spelling per §9 rule 6 (required unless omitted by rule)
  meaning: string            // English gloss
  kind: 'word' | 'phrase' | 'sentence' | 'expression'
  pos?: 'noun' | 'verb' | 'pronoun' | 'particle' | 'suffix' | 'other'
  image?: string             // illustration asset (license record in a sibling manifest)
  articulation?: { diagram: string; tip: string }  // required for sound:* items (diagram + brief cue, never text-only)
  audio: { slow: string; medium: string; normal: string; focus?: string[] } // offsets into lesson sprite
  acceptedInputs?: string[]  // forgiving ASCII answers (diacritic-folded, case-insensitive)
  notes?: string[]           // formal form, politeness, usage notes
  tags: string[]             // e.g. 'sound:zh', 'case:il', 'level:1'
}
type MinimalPair = { id: string; aItemId: string; bItemId: string;
  segment: 'zh' | 'coronal' | 'geminate' | 'vowelLength'; aClip: string; bClip: string }
type Dialogue = { id: string; lines: { role: 'learner' | 'model'; itemId: string }[] }
type DrillSpec =
  | { kind: 'anticipation'; itemId: string; tier: 'slow' | 'normal' }
  | { kind: 'multipleChoice' | 'imageToWord' | 'wordToImage'; itemId: string; distractors: string[] }
  | { kind: 'minimalPair'; pairId: string }
  | { kind: 'speakAndCompare'; itemId: string }              // no mic, no scoring
  | { kind: 'typing'; itemId: string; acceptedInputs?: string[] } // per-drill variants (pro-drop, word order)
  | { kind: 'sentenceBuilder'; sentenceId: string; bank: string[]; acceptedInputs?: string[] }
  | { kind: 'dialogueRolePlay'; dialogueId: string }
type Lesson = { id: string; levelId: string; title: string; items: Item[];
  drills: DrillSpec[]; reviewSlots: number;
  sprite: { file: string; offsets: Record<string, [number, number]> } } // includes review-pool clips
type TestSpec = { itemCount: 20 | 25; passPct: 0.8;
  sections: ['recognition', 'production', 'pronunciation']; retake: 'unlimited-after-failed-review' }
type Level = { id: string; name: string; canDo: string[]; lessons: Lesson[]; test: TestSpec }
// progress (IndexedDB): Card { itemId, skill: 'recognition' | 'production', fsrs, due, logs[] },
//   streak { day, timezone, freezes, pausedUntil, dailyReviewCap }, achievements,
//   testAttempts, mistakes, xp, rank, soundMastery { soundTag: mastery }, canDo { levelId: done[] },
//   contentRevision
```

## 13. Content authoring workflow

1. **Source**: dialogues and sentences are patterned on modern Malayalam cinema and real conversation (rewritten/adapted — no copyrighted audio or scripts reused verbatim). This sourcing step is what keeps the register authentic.
2. Native Malayalam speaker(s) author or review a lesson file: romanization per §9, **script per §9 rule 6** (colloquial spelling, native sign-off), meanings, notes, visuals with license records.
3. Articulation diagrams (SVG) authored for sound items and reviewed by a native speaker for accuracy.
4. `npm run content:check` validates structure, spelling rules, script sanity, visuals, licenses, and audio manifests.
5. `npm run audio:gen` (incremental) generates the normal clips and derives slow/medium/focus variants; native-speaker review happens in the batch review UI; mispronunciations are fixed by editing text, voice, or regenerating.
6. Lesson ships only when audio and diagrams pass review.

## 14. Milestones

| Milestone | Contents |
|---|---|
| M0 | Scaffold (Next.js + TS + Tailwind v4 pinned) **deployed as hello-world on Vercel** (cache headers, file caps validated early); **audio provider spike**: reference clips in colloquial Manglish from Bulbul V3 / Google WaveNet / Chirp 3 HD, native-speaker listen test, provider-terms check |
| M1 | Content format finalized + `content:check` (incl. script sanity, license checks); image sourcing + license tracking + styling treatment + credits page; full audio pipeline (normal → derive → trim/normalize → sprites) with incremental generation + batch review UI; **Level 1 units 1–2 authored, including SVG articulation diagrams** |
| M2 | Core lesson player: tap-to-start audio unlock, Web Audio sprites, anticipation / multiple-choice / minimal-pair / speak-and-compare / typing drills, reveal-after-hear (romanization + passive script), articulation cue (text), silent mode, a11y preferences; **Level 1 units 3–5 authored**; contentRevision reconciliation |
| M3 | Tests + FSRS (per-skill cards, review logs, review injection, mistakes, **TestSpec incl. pronunciation section**, daily review cap) + **PWA/install + `storage.persist()` + JSON export/import**; streak/achievement logic with injectable-clock tests |
| M4 | Gamification polish: XP/levels/ranks, grace + pause, achievements UI, progress dashboard |
| M5 | Sentence-builder drill; Levels 2–4 content; **private beta** + analytics + Sentry |
| M6 | Dialogue/role-play drills; Level 5 content; landing/SEO page with the tagline; **name-availability check**; public launch (Vercel Pro) |
| Later | Malayalam script reading/writing lessons, accounts/sync, custom illustration set, articulation video, ISO 15919 toggle, audio moved to Blob/R2, revisit ASR |

## 15. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Romanized-only text harms pronunciation learning | Audio-first UI: text and script hidden until heard; slow/medium/normal tiers; minimal-pair drills; research-validated |
| **Passive script reintroduces the formal register** | §9 rule 6: script spells the colloquial form, native sign-off per item, formal spelling only behind a "written form" badge |
| TTS mispronounces colloquial Manglish | M0 provider spike with native-speaker listen test; review gate on every clip; incremental regeneration keeps re-review cheap |
| Retroflex/ഴ/gemination are genuinely hard for English speakers | Sequenced by difficulty, articulation diagrams + sound-focus clips, discrimination drills, per-sound mastery tracking |
| **Articulation diagrams are inaccurate** | Diagrams limited to place-of-articulation (ഴ, coronals); native-speaker review gate; text cues kept brief (abstract descriptions demonstrably fail) |
| Human audio review is the bottleneck (~2.5 h audio ≈ 10+ h reviewer time per full pass) | Incremental `audio:gen` + keyboard-driven batch review UI; cost is irrelevant, reviewer time is not |
| **Image license violation** | Allowlist (CC0/PD, CC BY; SA as-is; no ND), per-asset license records, content:check enforcement, generated credits page |
| **Script font/rendering failure** | Noto Sans Malayalam (OFL), `lang="ml"`, NFC/ZWJ linting, fallback stack |
| Mobile browser audio policies (autoplay gating, iOS silent switch, decode gaps) | Resolved in M0/M2 architecture: first-tap unlock, shared AudioContext, `audioSession = 'playback'`, audio sprites |
| iOS IndexedDB eviction kills progress during a lapse | PWA install + `storage.persist()` + JSON export/import, shipped in M3 before private beta |
| Content edits orphan learner progress | Immutable item IDs, `contentRevision` reconciliation on load |
| Vercel file cap / stale audio caching | `--archive=tgz`, content-hashed sprite filenames with long-lived headers, Blob/R2 migration path |
| Gamification backfires (motivation quality) | §8 guardrails: progress-focused rewards only, grace and pause built in, no loss mechanics |
| Streak maintenance replacing learning | Streak winnable in <10 min; daily review capped; review content counts toward it; pause is free |
| Scope creep (script lessons, accounts, ASR) | Explicitly deferred to later versions (§3, §5) |

## 16. Owner decisions (recorded)

1. **Name & tagline**: "Learn Malayalam — the way Kerala actually talks." (Name-availability check at M6.)
2. **Articulation coaching**: in v1 as text cues + sound-focus audio (no visuals).
3. **Proverbs**: none — retracted; everyday conversational expressions only.
4. **Script display**: passive in v1, colloquial spelling, hidden until heard; reading/writing lessons remain a later version.
5. **Visuals**: free images, license-tracked, unified by a styling treatment (runtime/build filters).
6. **Level 1 verbs**: taught as casual present-tense chunks (`pokuva`), making Level 2 sentences buildable.
7. **Romanization display layer**: strict with diacritics (`ḷ`, `ṇ`); input always ASCII-forgiving.
8. **Pronunciation tests**: auto-scored minimal-pair discrimination (gates progress) + speak-and-compare self-assessment (logged, non-blocking, no mic).
9. **Mobile-first**: primary device is a phone (PWA, offline lessons, touch-first specs).
