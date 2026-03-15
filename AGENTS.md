# AGENTS.md

## Cursor Cloud specific instructions

### Overview

**vccs** is a Vue 3 charting library monorepo (pnpm workspaces). No external services, databases, or Docker required — purely front-end.

| Package | Command | Purpose |
|---------|---------|---------|
| `vccs` (library) | `pnpm build` / `pnpm dev` | Core library — build or watch mode |
| Tests | `pnpm --filter vccs exec vitest run` | 589 unit/integration tests (jsdom) |
| Playground | `pnpm play` | Nuxt 3 app on port 3000 |
| Docs | `pnpm docs` | Nuxt 3 + Docus on port 3001 |
| Storybook | `pnpm storybook` | Storybook on port 6006 |

### Running tests

- `pnpm test` runs `vitest` in **watch mode** (blocks indefinitely). Use `pnpm --filter vccs exec vitest run` for a single CI-style run.
- Run a specific test: `pnpm test packages/vue/src/chart/__tests__/AreaChart.spec.tsx`

### Running lint

- `npx eslint packages/vue/src` — the codebase has ~250 pre-existing lint warnings/errors; this is normal.

### Key gotchas

- The `vccs` library must be **built** (`pnpm build`) before running the playground or docs, since they consume it via `workspace:*`.
- Playground pages other than `/bar-charts` and `/` have a pre-existing SSR bug: `Identifier 'h' has already been declared` (duplicate Vue `h` imports conflicting with Nuxt 3 auto-imports). This is a known codebase issue, not an environment problem.
- Standard commands are documented in `CLAUDE.md` and root `package.json` scripts.
