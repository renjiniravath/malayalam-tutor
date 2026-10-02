# Benchmark rubric — judge only, never share with either model

## Setup recap

- Two clones: `malayalam-tutor-claude` (branch `model-claude`), `malayalam-tutor-deepseek` (branch `model-deepseek`).
- Models: Claude side = `claude --model claude-opus-5-5` (most powerful Claude); DeepSeek side = `deepseek --pro` (most powerful DeepSeek).
- Identical task: `benchmark/TASK.md`, passed as each session's first prompt.
- Neither model knows it is being benchmarked or that the other exists.
- Same starting commit, same plugins, same user skills, same budget guidance.

## Metrics to collect (per model)

1. Wall-clock time: first prompt to "done" (session timestamps).
2. Cost and tokens: `/cost` and `/usage` in each session, recorded at the end.
3. User prompts needed: how many messages you sent before it finished, including corrections.
4. Commits: count and size (`git log --stat` on each branch).
5. Scope drift: did it over- or under-engineer relative to the task?

## Quality gates (pass/fail)

- [ ] `npm run build` passes
- [ ] `npm run dev` serves the page
- [ ] Tailwind v4 pinned, CSS-first config
- [ ] Noto Sans Malayalam via `next/font/google`
- [ ] 360 px viewport renders correctly
- [ ] ≥44 px touch targets, safe-area handling present
- [ ] No emojis, no personal references
- [ ] README concise

## Scoring (judge at the end)

- Functional completeness (gates + spirit of task): /10
- Fidelity to CLAUDE.md / PLAN.md (stack exact, content rules untouched): /10
- Code quality (idiom, simplicity, no overengineering): /10
- Design quality of the hello-world page (mobile-first feel): /10
- Efficiency (time, tokens, prompts needed): /10
- Total: /50

## Judging protocol

1. Review each branch blind (model name hidden from the reviewer), fill the gates, score 1-4.
2. Unblind, add efficiency score (5).
3. Record everything in `benchmark/results-task1.md`.
