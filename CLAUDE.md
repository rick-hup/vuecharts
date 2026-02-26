# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Workflow

- Enter plan mode for non-trivial tasks (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan — don't keep pushing
- Use subagents to keep main context clean; one task per subagent
- After corrections: update `tasks/lessons.md` with the pattern
- Never mark a task complete without proving it works (run tests, check logs)
- Autonomous bug fixing: just fix it, don't ask for hand-holding

## Task Management

1. Write plan to `tasks/todo.md` with checkable items
2. Check in before starting implementation
3. Mark items complete as you go; capture lessons in `tasks/lessons.md`

## Core Principles

- **Simplicity First**: Make every change as simple as possible. Minimal code impact.
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact**: Only touch what's necessary. Avoid introducing bugs.

## Overview

**Vue Charts (vccs)** — An unofficial Vue 3 port of [Recharts](https://recharts.org/). Composable charting components built with Vue 3 Composition API + JSX/TSX.

- **Recharts source:** `/Users/huangpeng/Documents/workspace/web/mygithub/charts/recharts`
- When porting, refer to React source for behavior parity
- Monorepo: `vccs` (library) + `play` (Nuxt playground), managed by pnpm workspaces
<!-- END AUTO-MANAGED -->

<!-- AUTO-MANAGED: build-commands -->
## Build & Development Commands

```bash
pnpm install              # Install dependencies
pnpm dev                  # Watch mode
pnpm test                 # Run tests
pnpm test:coverage        # Tests with coverage
pnpm --filter vccs build  # Build library
pnpm storybook            # Storybook
pnpm play                 # Playground
pnpm pub:release          # Publish

# Run specific test
pnpm test packages/vue/src/chart/__tests__/AreaChart.spec.tsx
```
<!-- END AUTO-MANAGED -->

<!-- AUTO-MANAGED: architecture -->
## Architecture

```
packages/vue/src/           # Main library source (vccs)
├── cartesian/              # Area, Bar, Line, Scatter, Axis, Brush, CartesianGrid, etc.
├── polar/                  # Pie, Radar, RadialBar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
├── chart/                  # Chart containers (AreaChart, BarChart, LineChart, ComposedChart, etc.)
├── components/             # Legend, Tooltip, Text, Label
├── container/              # ResponsiveContainer, Surface, Layer
├── shape/                  # SVG shapes (Rectangle, Symbols, Curve, Dot, Sector)
├── state/                  # Redux store, slices, middleware, selectors
├── animation/              # Animate component, motion-v utilities
├── context/                # provide/inject context providers
├── hooks/                  # Shared composition hooks
├── storybook/              # Stories
├── types/                  # Shared type definitions
├── utils/                  # Utility functions
└── index.ts                # Public API
```

### Key Decisions

1. **Components**: `defineComponent` + JSX (not SFC)
2. **State**: Redux Toolkit via `@reduxjs/vue-redux` — one store per chart (`createRechartsStore`)
3. **Context**: `provide/inject` for parent-child communication
4. **Chart Factory**: `generateCategoricalChart()` creates chart containers
5. **Animation**: `motion-v` with `Animate` wrapper
6. **Events**: Redux middleware (must be synchronous — no `createListenerMiddleware`)
<!-- END AUTO-MANAGED -->

<!-- AUTO-MANAGED: conventions -->
## Code Conventions

### Naming
- Components: PascalCase; Directories: kebab-case; Hooks: `use` prefix; Types: `Props` suffix
- Type files: `type.ts`; Tests: `__tests__/*.spec.tsx`; Stories: `__stories__/*.stories.tsx`

### Component Pattern
```typescript
export const Component = defineComponent<PropsWithSVG>({
  name: 'Component',
  props: ComponentVueProps,
  inheritAttrs: false,
  slots: Object as SlotsType<Slots>,
  setup(props, { attrs, slots }) {
    useSetupGraphicalItem(props, 'itemType')
    const { ...data } = useComponentHook(props, attrs)
    return () => (/* JSX */)
  },
})
```

### Props Pattern
```typescript
export const ComponentVueProps = {
  dataKey: { type: [String, Number, Function] as PropType<DataKey<any>>, required: true },
  fill: { type: String, default: undefined },
}
export type ComponentPropsWithSVG = WithSVGProps<VuePropsToType<typeof ComponentVueProps>>
```

### Imports
- `@/` → `packages/vue/src/`
- Prefer `import type` for type-only imports
<!-- END AUTO-MANAGED -->

<!-- AUTO-MANAGED: patterns -->
## Key Patterns

### Porting from Recharts
- React `useState`/`useEffect` → Vue `ref`/`watch`; Context → `provide`/`inject`
- React `useMemo`/`useCallback` → Vue `computed` / plain functions
- React JSX → Vue JSX (`class` not `className`, kebab-case SVG attrs)

### Redux
- One store per chart; graphical items register via `useSetupGraphicalItem`
- `getItemColor`: Bar → `fill`; Area/Line/Radar → `getLegendItemColor(stroke, fill)` (stroke-preferring)
- Middleware must be plain `Middleware` (synchronous) — `createListenerMiddleware` defers to microtask, breaking `e.currentTarget`

### SVG Layers (Teleport)
Three-tier z-ordering: cursor → graphical → label (via `Surface.vue`)

### Animation Chase Pattern
All animated components (Bar, Line, Scatter, Radar, RadialBar) use: `previousData` + incrementing `animationId` as `Animate` key; previous state updated at `t > 0` so rapid changes interpolate from current visual position.

### Vue + D3
- Always `toRaw(entry)` before passing to D3 scale functions (Vue Proxy breaks D3)

### Slots (not VNode props)
Customization uses **named slots**: `shape`, `dot`, `activeDot`, `label`, `content`, `cursor`, `tick`. Example: `<Bar>{{ shape: (props) => <Custom {...props} /> }}</Bar>`

### Testing
- `isAnimationActive={false}` for deterministic rendering
- `mockGetBoundingClientRect({ width, height })` in `beforeEach`
- Helpers: `@/test/helper` (`getBarRectangles`, `expectAreaCurve`, etc.)

### Storybook
- Interactive stories: wrap in `defineComponent` + `ref`
- Clone array data in `render` to avoid Vue proxy errors
- Story titles must match Recharts conventions
- Shared data: `@/storybook/data` (`pageData`, `logData`, `subjectData`, etc.)

### PolarRadiusAxis
- Props: `radiusAxisId` (default `0`), `dataKey` (DataKey, default `undefined` — passed through to Redux store), `angle` (default `0`), `tick` (default `true`), `axisLine` (default `true`), `orientation` (`'left'|'right'|'middle'`, default `'right'` — controls textAnchor), `tickFormatter`, `stroke` (default `'#ccc'`), `allowDecimals` (default `false`), `domain`, `tickCount` (default `5`), `type` (default `'number'`)
- Dispatches `addRadiusAxis`/`removeRadiusAxis`; when both `tick={false}` and `axisLine={false}`: renders `null` (use to set domain without visual output)
- Tick label rotation uses `angle={90 - angle}` prop on `<Text>` (not CSS `transform`)
- CSS classes: `v-charts-polar-radius-axis` (g), `v-charts-polar-radius-axis-line` (axis line), `v-charts-polar-radius-axis-ticks` (tick group g), `v-charts-polar-radius-axis-tick-value` (tick Text)
<!-- END AUTO-MANAGED -->

## Dependencies

| Library | Purpose |
|---------|---------|
| `@reduxjs/toolkit` + `@reduxjs/vue-redux` | Chart state management |
| `motion-v` | SVG animations |
| `victory-vendor` | D3 math/scale utilities |
| `lodash-es` / `es-toolkit` | Utility functions |
| `@vueuse/core` | Vue composition utilities |

<!-- MANUAL -->
## Custom Notes

Add project-specific notes here. This section is never auto-modified.

<!-- END MANUAL -->
