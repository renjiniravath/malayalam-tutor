# Learn Malayalam

**Learn Malayalam — the way Kerala actually talks.**

Interactive web app that teaches conversational Malayalam ("Manglish") to English speakers: the casual, English-mixed register actually spoken in Kerala and heard in modern Malayalam movies. Public-facing product — keep all content and docs generic, no personal references.

Full plan: `planning/PLAN.md`. Research: `planning/research-language-learning.md`, `planning/research-malayalam.md`.

## Content rules (mandatory)

- **Casual register is primary.** Always use daily conversational Manglish: `pokuva` not `pokunnu`, `ippo` not `ippol`, `vaa` not `varoo`. Formal/written forms appear only as a secondary note.
- **No linguistic jargon in learner copy** — explain in plain English (`veedu + -il` → `veettil`, "the d doubles"); never write `sandhi` (`chandi` means butt). Glosses are natural English ("we're off to work", never "we are going to work"). Coffee is always `kaappi`.
- **Romanization** (audio is the source of truth; full spec in PLAN.md §9):
  - Long **a/i/u** are always doubled: `aa`, `ee`, `oo` (`chaaya`, `veedu`, `koodi`) — long i is written `ee` and long u is written `oo`, the way Malayalees type (`nee`, `veedu`, `koodi`), never `ii`/`uu`
  - Long **e/o** are never doubled: `e`, `o` (`pokuva`, `ippo`, `chechi`) — matches how Malayalees type
  - Gemination is a doubled consonant: `kk`, `pp`, `tt`, `mm`
  - `th` = dental ത, plain `t` = retroflex ട (so `tth` = ത്ത, `tt` = ട്ട); same pattern for `dh`/`d`
  - `zh` = ഴ, `nj` = ഞ, `sh` = ശ, `ph` = ഫ, `ng` = ങ (each also covers its geminate)
  - `ḷ` (ള) and `ṇ` (ണ) are **common** and keep diacritics in the display layer; `ṟ` (റ) appears only in sound-teaching items — colloquial words write it `r` (`choru`, `parayuva`)
  - Colloquial voicing: ട/ഡ written `d` when pronounced so (`veedu`, `evide`, `und`)
  - Input layer is ASCII-forgiving: accept `l`/`n`/plain `t` for retroflexes, case-insensitive, diacritic-folded — learners never type diacritics
  - `ni` is an accepted alternate spelling of `nee` (more common in casual typing) — accept it as an input and mention it on the item; display stays `nee`
  - Never use capitalization as a phonemic signal (mobile auto-capitalize)
- **Script rule**: every item has a Malayalam script field spelling the **colloquial form** as Malayalis write it informally (`pokuva` → പോകുവാ). No natural colloquial spelling → standard written form with a "written form" badge; if misleading → omit. Never source script from formal texts. Native-speaker sign-off per item.
- **Audio-first UI.** Romanization and script are hidden until the learner has heard the item — never show text before audio (orthography harms early prosody learning). Script appears passively, styled secondary, with `lang="ml"`. Exception: an accessibility preference reveals text immediately.
- Every content item needs: slow + medium + normal audio (offsets into its lesson's audio sprite) + English meaning. Concrete nouns/verbs additionally need a visual (free image, license record required, never emoji characters in code). Sound-teaching items need an articulation entry as a **brief text cue only** — no diagrams or visuals (visual articulation was tried and dropped; learners rely on audio + text).
- No emojis in code, logs, or UI copy (illustrations are image assets).
- Content lives as typed TS modules in `src/content/`; **item IDs are immutable** and a `contentRevision` reconciles learner progress when content changes. Run `npm run content:check` to lint romanization, script sanity (NFC/ZWJ), audio manifest presence, image presence + license, articulation presence, duplicate spellings, tag integrity, and minimal-pair sanity.

## Stack

- Next.js (App Router) + TypeScript + **Tailwind CSS v4** (CSS-first config, pinned — v3 snippets won't build); deploy on Vercel (prerendered, not `output: 'export'`)
- **Mobile-first**: 360 px viewport floor, ≥44 px touch targets, safe-area handling, no hover-only affordances, installable PWA with offline audio sprites (service worker, iOS storage budget)
- Audio playback via one shared `AudioContext` (first-tap unlock, `navigator.audioSession.type = 'playback'`), per-lesson audio sprites — no per-clip `<audio>` elements, no runtime TTS, no Web Speech API dependency, no ASR, no microphone in v1
- Malayalam text via **Noto Sans Malayalam** (`next/font/google`)
- `ts-fsrs` for spaced repetition (desired retention ~0.90; cards keyed `{itemId, skill}`; persist review logs; daily review capped)
- Progress is local-first in IndexedDB (PWA + `storage.persist()` + JSON export/import); no accounts in v1; keep the data layer shaped so sync can be added later
- Audio is generated once (TTS normal clip → slow/medium derived locally → trim/normalize → lesson sprites) and **not committed to git** — see PLAN.md §10. Images are committed with license records and a generated credits page.

## Commands

- `npm run dev` — dev server
- `npm run content:check` — validate all content
- `npm run audio:gen` — (re)generate audio from content incrementally (needs TTS API keys)

## Decisions live in planning/PLAN.md

Pedagogy (FSRS, Pimsleur anticipation gap, comprehension-first opening, block-then-interleave), gamification guardrails (no hearts, streaks with grace), curriculum levels, the romanization spec, the script rule, and the audio pipeline are all specified there. Change them there first, not ad hoc.
