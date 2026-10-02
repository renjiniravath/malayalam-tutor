# Claude Code setup — Learn Malayalam

Tailored to your `/context` output. Three parts: the basics, your MCP servers, plugins & skills. Every item names the exact command or file.

## 1. The basics

### /config
Opens the Settings UI: theme, model, output style, editor mode. Alias: `/settings`. Set values inline: `/config theme=dark`, `/config model=<name>`. `/model` opens the model picker and saves the default (your footer shows the current model, `deepseek-v4-pro[1m]`).

Permission modes are **not** in /config — use Shift+Tab or `/permissions` (below).

### Permission modes
| Mode | Behavior | When to use it |
|---|---|---|
| `default` (Manual) | Prompts the first time each tool runs | Default for now — you see what Claude does |
| `acceptEdits` | Auto-accepts file edits + common fs commands (mkdir/mv/cp) inside the project | M0 scaffolding, when diffs are cheap and you're watching |
| `plan` | Read-only: explores and proposes, no edits | Planning the TTS spike, reviewing before a risky change |
| `auto` | A classifier approves routine actions; the unusual still asks | Later, once your allow rules are tuned |
| `bypassPermissions` | Skips prompts (a few protected actions still ask) | Containers/VMs only. Not on your Mac |

- **In a session**: `Shift+Tab` cycles default → acceptEdits → plan → (auto).
- **Startup mode**: `"permissions": { "defaultMode": "acceptEdits" }` in a settings file. `auto` and `bypassPermissions` only take effect from user (`~/.claude/settings.json`) or managed settings, not project files.

### Keyboard shortcuts (macOS)
- `Esc` — interrupt mid-turn (work so far is kept)
- `Esc Esc` — empty prompt: rewind/checkpoint menu; with text: clear the draft
- `Shift+Tab` — cycle permission modes
- `Ctrl+C` — clear input; pressed twice, exits
- `Ctrl+O` — transcript view (full tool calls, not collapsed)
- `Ctrl+R` — search command history
- `Ctrl+B` — background a running command (dev servers, audio:gen)
- `Ctrl+T` — toggle Claude's task checklist
- `Shift+Enter` — newline; `Up` — navigate history
- `!command` — shell mode; `@path` — file mention; `/` — command menu

### Where settings live (precedence, highest first)
1. Managed settings (organization)
2. `--settings` command-line flag
3. `.claude/settings.local.json` — you, this repo only. The `/skills` menu writes here. Add it to `.gitignore` when M0 runs `git init`.
4. `.claude/settings.json` — committed and shared
5. `~/.claude/settings.json` — you, every project (theme, user-level plugins/MCP)

### Commands to know
- `/init` — generate CLAUDE.md (yours exists and is strong; rerun after big shifts)
- `/memory` — edit CLAUDE.md files, toggle auto memory, view entries
- `/skills` — list installed skills; manage what Claude sees (part 3)
- `/agents` — subagents; edit `.claude/agents/` or ask Claude to create one
- `/artifacts` — list/attach artifacts you own or that are shared with you
- `/context` — what you just ran; spot context hogs
- `/doctor` — setup checkup: unused skills/MCP/plugins vs their context cost, slow hooks. Run it after M0.
- `/permissions`, `/plugin`, `/usage`, `/mcp` — rules, plugins, cost, servers

## 2. Your MCP servers

All three arrive via plugins, so their tools and instructions load into **every** session; `/context` shows each one's footprint. Verdicts for this project:

- **context7 — KEEP.** Fetches current library docs on demand. Directly relevant: Tailwind v4 (CSS-first config — v3 snippets won't build), Next.js App Router, `ts-fsrs`, PWA/service-worker APIs.
- **chrome-devtools-mcp — KEEP.** Real Chrome + DevTools: console, network, performance, a11y. This is your debugging tool for the lesson player: audio unlock/first-tap, offline audio sprites, 360 px layouts, `lang="ml"` text. Its skill pack (a11y-debugging, memory-leak-debugging, debug-optimize-lcp, ...) rides along.
- **playwright — DISABLE for now.** Overlaps chrome-devtools for poking at pages; its real value is scripted E2E suites, which don't exist yet. You also have the project skill `/playwright-cli` (at `.claude/skills/playwright-cli/`) that drives Playwright from the CLI if needed. Re-enable when you write E2E tests.

**Toggle per project**: `/mcp` → pick the server → toggle off (non-interactive: `/mcp disable playwright`). This writes `disabledMcpServers` into `~/.claude.json` for this project only; re-enable anytime with `/mcp enable playwright`. Removing a plugin's server entirely means disabling its plugin.

**ralph-loop — disable for now.** It replays a prompt in a loop until a task completes; M0 has nothing that needs autonomous looping, and the built-in `/loop` covers recurring prompts. Turn it off in `/plugin` (Installed → disable); re-enable when a long unattended iteration actually appears.

## 3. Plugins & skills

**How they work.** A skill is markdown at `~/.claude/skills/<name>/SKILL.md` (all your projects) or `.claude/skills/<name>/SKILL.md` (this repo; commit it). Plugin skills are namespaced (`/plugin-name:skill`). Claude auto-invokes skills when relevant, or you type `/name`. Editing a `SKILL.md` is picked up live. Cost: every auto-invocable skill keeps its name + description in context each turn (budget ≈ 1% of the context window; the Skills row in `/context` shows the applied size). Bodies load only on use.

**See what you have.** `/skills` lists everything (press `t` to sort by token cost). `/skill-doctor` shows usage and flags never-invoked skills; `/doctor` does the same for plugins and MCP.

**Disable.** In `/skills`, highlight a skill and press `Space` to cycle: `on` → `name-only` → `user-invocable-only` (hidden from Claude, still in your `/` menu) → `off`. `Esc` saves to `skillOverrides` in `.claude/settings.local.json`. Plugin skills ignore `skillOverrides` — manage those with `/plugin` (or `claude plugin disable` in your shell).

**Recommendations**

KEEP (`on`) — serve a mobile-first Tailwind v4 PWA:
- `frontend-design` (plugin), `design-taste-frontend` — real UI direction, not templated defaults
- `dataviz` — progress/review/streak charts
- `verify`, `run`, `run-skill-generator` — drive the actual lesson player to prove changes; run `/run-skill-generator` once the scaffold exists
- `code-review`, `security-review`, `playwright-cli`

Set `user-invocable-only` (zero per-turn cost, still typeable):
- `imagegen-frontend-mobile` (mobile concepts, only when you want mockups), `high-end-visual-design`, `full-output-enforcement` (for long content-file generation), `deep-research`

TURN OFF (redundant, wrong aesthetic, or unused in v1):
- `brandkit`, `design-taste-frontend-v1`, `gpt-taste`, `image-to-code`, `imagegen-frontend-web`, `industrial-brutalist-ui`, `minimalist-ui`, `redesign-existing-projects`, `stitch-design-taste`, `artifact-design`, `artifact-diagramming`, `claude-api` (no Claude API in v1), `insights`, `team-onboarding`, `design`, `design-sync`. Leave built-ins otherwise alone.

**Fix me:** `.claude/web-design-guidelines/SKILL.md` sits outside `.claude/skills/`, and it's not in your available-skills list — move it to `.claude/skills/web-design-guidelines/SKILL.md` if you want it (worth it: Vercel Web Interface Guidelines review for your UI).

## Do now (M0 checklist)
1. `/mcp disable playwright`
2. `/plugin` → disable `ralph-loop`
3. `/skills` → apply the off / user-only buckets above, press `Esc` to save
4. Stay in `default` mode; `Shift+Tab` to `plan` for the TTS spike design, `acceptEdits` while scaffolding
5. `/doctor` after `git init` + first Vercel deploy
6. When you add git: `.gitignore` gets `.claude/settings.local.json`

Docs: [permissions & modes](https://code.claude.com/docs/en/permissions) · [settings](https://code.claude.com/docs/en/settings) · [interactive mode](https://code.claude.com/docs/en/interactive-mode) · [MCP](https://code.claude.com/docs/en/mcp) · [skills](https://code.claude.com/docs/en/skills) · [plugins](https://code.claude.com/docs/en/plugins/overview) · [commands](https://code.claude.com/docs/en/commands)
