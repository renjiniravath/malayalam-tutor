---
name: content-review
description: Native-speaker review loop for lesson content — list every new or changed word, phrase and sentence, collect the user's rulings, then have the maker agent apply them and a validator agent check the delta. Use when the user wants to review lessons, after any content round, or when they send corrections to lesson material.
---

# Content review loop

The native speaker (the user) is the content authority. This skill runs the loop: **list → their rulings → apply → validate → re-serve.** Never declare content done on green checks alone.

One build is in play: DeepSeek (`~/Renji/Projects/malayalam-tutor-deepseek`, branch `model-deepseek`, served on 3121). The model-comparison experiment closed on 2026-10-12 and the Claude build (`model-claude`) is frozen as a reference — read it when a learning is worth porting, never dispatch work to it. The spec is `planning/PLAN.md` in this repo; rulings land there first.

## 1. List the material

Produce the listing in this repo's terminal and do not summarize items away — the user reads the complete list here, not on the phone.

Dump it from the content modules rather than transcribing (write a throwaway script to `/tmp/<name>.mts` and run `npx tsx /tmp/<name>.mts` from the build's repo root; top-level await needs the `.mts` extension):

- DeepSeek: `import { levels } from '<repo>/src/content/index.ts'` — level ids `l1`..`l4`.

For each affected lesson print, in order: level heading and its can-do statements; lesson id, title, unit, item and drill counts; then **every** item as `[kind] manglish | script | meaning` — words, phrases and sentences alike.

## 2. Take the rulings

The user's feedback arrives as prose corrections. Turn it into a numbered ruling list, each mapped to the exact items and lessons it touches.

Their romanization is loose — `veetil` for `veettil`, `verunnund` for `varunnund`, `ishttapette` for `ishttappette`. Treat a quoted word as naming the word, then apply the §9 spec for the display form. When a doubling or allomorph choice is genuinely open, ask a pointed either/or and record the answer; never guess a display spelling.

## 3. Record the rulings

Update `planning/PLAN.md` (and `CLAUDE.md` when it is a standing rule, not a one-off), commit and push `main`. The makers work from the recorded ruling text.

## 4. Apply — the maker agent

Dispatch `maker-deepseek` with the numbered rulings as a concrete edit list: exact target strings, sites, and the judgement calls. It must sync docs (`git fetch origin && git checkout origin/main -- planning/PLAN.md CLAUDE.md`), keep ids immutable, add audio-manifest entries for new items, bump `contentRevision`, and pass `npm run content:check`, the test suite and `npm run build` before committing and pushing. Require a before → after report per site.

New lessons follow the same conventions as existing ones.

## 5. Validate — the validator agent

A fresh-eyes validator (`validator-deepseek`), pinned to the maker's commit, on throwaway copies only (`/tmp`); it reports, never fixes. Two scopes, and the round report says which ran:

**Delta check — every iteration (the default).** Scope it to the commit range the round produced (`base..tip`):
- Before → after per site, driven through the real modules, for the items the round touched only.
- No id churn: retirements recorded, no id reused, no stale string from a retired form anywhere, no surviving item touched.
- The changed items resolve through the real player path (steps, drills, banks, matcher).
- The three gates once at the tip: `content:check`, the test suite, the build.
- Read the round's accepted inputs by eye — the checker cannot see an unsanctioned one.
- One targeted mutation proof per rule the delta leaned on; a few, not a dozen.
- Do not re-sweep the untouched build, dump every item, or re-run exhaustive permutation and neighbour sweeps.

**Full validation — every 5 chapters.** A chapter is one lesson delivered (for a round with no new lesson, the round itself counts). The full pass adds everything the delta check skips: keyed structural dumps base → tip over the whole build, build-wide integrity sweeps (orphan drills, distractor integrity, duplicate manglish, jargon scan, script correspondence on every item, cross-lesson references), exhaustive order permutations and one-edit neighbour sweeps, and the full mutation set. The round report carries the tally ("delta 3 of 5 since the last full pass") so the cadence is visible.

## 6. Re-serve

Fast-forward the served worktree (`.claude/worktrees/task-35-native-calls`) to the branch tip, rebuild, and restart the 3121 server — **ask the user before killing the running process**. Then verify end-to-end by fetching the served lesson page and grepping for a distinctive string from the round. Route shape: DeepSeek uses `/lessons/<id>`.

## Round report

End with the items awaiting sign-off (manglish, script, meaning) and any judgement calls flagged for the native speaker, then wait — the rulings restart the loop at step 3.
