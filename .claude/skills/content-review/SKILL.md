---
name: content-review
description: Native-speaker review loop for lesson content — list every new or changed word, phrase and sentence per build, collect the user's rulings, then have maker agents apply them and validator agents check the delta. Use when the user wants to review lessons, after any content round, or when they send corrections to lesson material.
---

# Content review loop

The native speaker (the user) is the content authority. This skill runs the loop: **list → their rulings → apply on both builds → validate → re-serve.** Never declare content done on green checks alone.

Two builds are always in play — Claude (`~/Renji/Projects/malayalam-tutor-claude`, branch `model-claude`, served on 3120) and DeepSeek (`~/Renji/Projects/malayalam-tutor-deepseek`, branch `model-deepseek`, served on 3121). The spec is `planning/PLAN.md` in this repo; rulings land there first.

## 1. List the material

Produce the listing in this repo's terminal, per build, and do not summarize items away — the user reads the complete list here, not on the phone.

Dump it from the content modules rather than transcribing (write a throwaway script to `/tmp/<name>.mts` and run `npx tsx /tmp/<name>.mts` from the build's repo root; top-level await needs the `.mts` extension):

- Claude: `import { LEVELS } from '<repo>/src/content/levels.ts'` — level ids `level1`..`level3`.
- DeepSeek: `import { levels } from '<repo>/src/content/index.ts'` — level ids `l1`..`l3`.

For each affected lesson print, in order: level heading and its can-do statements; lesson id, title, unit, item and drill counts; then **every** item as `[kind] manglish | script | meaning` — words, phrases and sentences alike.

## 2. Take the rulings

The user's feedback arrives as prose corrections. Turn it into a numbered ruling list, each mapped to the exact items and lessons it touches **on each build** (the builds diverge, so state per-build sites).

Their romanization is loose — `veetil` for `veettil`, `verunnund` for `varunnund`, `ishttapette` for `ishttappette`. Treat a quoted word as naming the word, then apply the §9 spec for the display form. When a doubling or allomorph choice is genuinely open, ask a pointed either/or and record the answer; never guess a display spelling.

## 3. Record the rulings

Update `planning/PLAN.md` (and `CLAUDE.md` when it is a standing rule, not a one-off), commit and push `main`. The makers work from the recorded ruling text.

## 4. Apply — one maker agent per build

Dispatch the standing makers (`maker-claude`, `maker-deepseek`) with the numbered rulings as a concrete edit list: exact target strings, per-build sites, and the judgement calls. Each maker must sync docs (`git fetch origin && git checkout origin/main -- planning/PLAN.md CLAUDE.md`), keep ids immutable, add audio-manifest entries for new items, bump `contentRevision`, and pass `npm run content:check`, the test suite and `npm run build` before committing and pushing. Require a before → after report per site.

New lessons follow the same conventions as existing ones; keep the two builds' content in step.

## 5. Validate — one validator agent per build

Fresh-eyes validators (`validator-claude`, `validator-deepseek`), pinned to the maker's commit: verify every ruling applied, no id churn, the three gates green, and probe adversarially on throwaway copies. They report, never fix.

## 6. Re-serve

Fast-forward each served worktree to its branch tip, rebuild, and restart the two servers — **ask the user before killing the running processes**. Then verify end-to-end by fetching the served lesson pages and grepping for a distinctive string from the round. Route shapes differ: Claude `/lesson/<id>`, DeepSeek `/lessons/<id>`.

## Round report

End with the items awaiting sign-off (manglish, script, meaning) and any judgement calls flagged for the native speaker, then wait — the rulings restart the loop at step 3.
