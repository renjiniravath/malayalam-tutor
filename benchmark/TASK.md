# Task 1: M0 scaffold

Build the M0 milestone from `planning/PLAN.md`, minus the Vercel deploy and the audio provider spike (both explicitly out of scope for this task).

## Required

1. Scaffold the app per the Stack section of `CLAUDE.md`:
   - Next.js (App Router) + TypeScript
   - Tailwind CSS v4, pinned, CSS-first config (no v3 snippets)
   - Malayalam text via Noto Sans Malayalam (`next/font/google`)
2. Build a mobile-first hello-world home page:
   - Title "Learn Malayalam" with the tagline "the way Kerala actually talks"
   - 360 px viewport floor, ≥44 px touch targets, safe-area handling
   - No hover-only affordances
   - No emojis anywhere (code, UI copy, logs)
   - No personal references
3. `npm run dev` and `npm run build` must both pass.
4. Keep README.md concise.

## Constraints

- Do not modify `planning/` or `CLAUDE.md`.
- Do not start Level 1 content, the lesson player, FSRS, PWA, or audio (later milestones).
- Commit your work on this repo's current branch with clear messages; push to origin.

## Done when

- Build and dev pass, home page renders at 360 px width, all Stack requirements from CLAUDE.md are met.
- All work is committed and pushed to origin.
