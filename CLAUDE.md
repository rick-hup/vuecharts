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
- Monorepo: `vccs` (library) + `play` (Nuxt playground) + `docs` (Nuxt docs site), managed by pnpm workspaces
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
pnpm docs                 # Docs site (Nuxt 3, port 3001)
pnpm pub:release          # Publish

# Run specific test
pnpm test packages/vue/src/chart/__tests__/AreaChart.spec.tsx
```
<!-- END AUTO-MANAGED -->

<!-- AUTO-MANAGED: architecture -->
## Architecture

```
packages/vue/src/           # Main library source (vccs)
├── cartesian/              # Area, Bar, Line, Scatter, Axis, Brush, CartesianGrid
├── polar/                  # Pie, Radar, RadialBar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
├── chart/                  # Chart containers (AreaChart, BarChart, LineChart, ComposedChart, etc.)
├── components/             # Legend, Tooltip, Text, Label, Cell
├── container/              # ResponsiveContainer, Surface, Layer
├── shape/                  # Rectangle, Symbols, Dot, Sector (public); Curve, Cross (internal)
├── state/                  # Redux store, slices, middleware, selectors
├── animation/              # Animate component, motion-v utilities
├── context/                # provide/inject context providers
├── hooks/                  # Shared composition hooks
├── storybook/              # Stories
├── types/                  # Shared type definitions
├── utils/                  # Utility functions
└── index.ts                # Public API

docs/                       # Documentation site (Nuxt 3, Nuxt Content v3)
├── app/
│   ├── charts/             # Live chart demos (SFCs with plain vccs imports, hardcoded colors)
│   ├── components/
│   │   ├── content/        # ProseCode, CodeGroup, ChartDemo, Callout, PropsTable
│   │   └── docs/           # ChartContainer, DocsHeader, DocsSearch, DocsSidebar, DocsPagination, DocsToc
│   ├── composables/        # useLocale, useSearch, useToc
│   ├── layouts/            # default.vue, docs.vue
│   └── pages/              # index.vue (home), docs/[...slug].vue (catch-all)
├── content/                # Markdown; folder metadata via .navigation.yml (NOT _dir.yml)
└── nuxt.config.ts          # Nuxt 3, @nuxt/content, Tailwind v4, shadcn-nuxt, @nuxt/fonts

playground/nuxt/            # Nuxt 3 playground for manual testing
├── app/components/
│   ├── area-charts/        # 10 Area chart SFCs
│   ├── bar-charts/         # 10 Bar chart SFCs
│   ├── line-charts/        # 10 Line chart SFCs
│   ├── radar-charts/       # 11 Radar chart SFCs
│   ├── radial-charts/      # 6 RadialBar chart SFCs
│   ├── tooltip-charts/     # 9 Tooltip demo SFCs
│   └── ui/chart/           # ChartContainer, ChartTooltipContent, ChartLegendContent, types.ts
└── nuxt.config.ts          # Nuxt 3, Tailwind v4, shadcn-nuxt, @nuxtjs/color-mode
```

**Playground stack**: Nuxt 3, Tailwind CSS v4, shadcn-nuxt, lucide-vue-next, vccs (`workspace:*`).
- `ChartContainer`: accepts `ChartConfig` prop, provides `--color-{key}` CSS vars + `chart-config` inject
- `ChartTooltipContent`: props `indicator` (`dot`|`line`|`dashed`), `hideLabel`, `hideIndicator`, `labelKey`, `nameKey`, `labelFormatter`
- Tailwind v4 parenthesis syntax: `border-(--color-border) bg-(--color-bg)` (NOT v3 `border-[--color-border]`)
- Tooltip slot pattern: `<Tooltip><template #content="tooltipProps"><ChartTooltipContent v-bind="tooltipProps" /></template></Tooltip>`
- Legend slot pattern: `<Legend #content="legendProps"><ChartLegendContent v-bind="legendProps" /></Legend>`
- Label-inside-PolarRadiusAxis: `<PolarRadiusAxis :tick="false" :tick-line="false" :axis-line="false"><Label><template #content="{ viewBox }">...</template></Label></PolarRadiusAxis>` — `viewBox` provides `{ cx, cy }` via `POLAR_LABEL_VIEW_BOX_KEY`

**Docs site stack**: Nuxt 3, Nuxt Content v3, Tailwind v4, shadcn-nuxt, @nuxt/fonts (Doto/JetBrains Mono/Instrument Sans).
- Content uses MDC `::chart-demo{src="..."}::` to embed live demos
- `useLocale`: English-only, `collectionName` is plain string `'content_en'` (NOT a ref)
- DocsSidebar: `queryCollectionNavigation(collectionName, ['icon'])` — Nuxt Content v3 stores `_dir.yml` metadata as child entry, so `getGroupIcon` checks child list fallback
- Docs `ChartContainer` has NO `ChartConfig` support (unlike playground version)

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
- `getItemColor`: Bar/RadialBar → `fill`; Area/Line/Radar → `getLegendItemColor(stroke, fill)` (stroke-preferring)
- Middleware must be plain `Middleware` (synchronous) — `createListenerMiddleware` defers to microtask, breaking `e.currentTarget`

### SVG Layers (Teleport)
Three-tier z-ordering: cursor → graphical → label (via `Surface.vue`). `Area`, `Line`, `Radar` use `<Teleport to={graphicalLayerRef.value}>` via `useGraphicalLayerRef(null)`.

### Animation Chase Pattern
All animated components (Bar, Line, Scatter, Radar, RadialBar) use: `previousData` + incrementing `animationId` as `Animate` key; previous state updated at `t > 0` so rapid changes interpolate from current visual position.

### Vue + D3
- Always `toRaw(entry)` before passing to D3 scale functions (Vue Proxy breaks D3)

### Slots (not VNode props)
Customization uses **named slots**: `shape`, `activeBar`, `dot`, `activeDot`, `label`, `content`, `cursor`, `tick`, `horizontal`, `vertical`. Example: `<Bar>{{ shape: (props) => <Custom {...props} /> }}</Bar>`.

**Bar slot priority** (`BarRectangles`): (1) `isActive && #activeBar` → (2) `#shape` → (3) default `<Rectangle>`. Rectangle props merge (low→high): `baseProps` → `entry.payload?.fill` → `entry` → `cellPropsForIndex` → `activeBarProps`.

### Cell Component
- Marker component rendering nothing — parents read Cell VNode children and apply props by index
- `Bar` integration: `extractCellProps(slots.default?.())` collects per-index props; `cellProps` applied at highest priority (below `activeBarProps`)
- Usage: `<Bar dataKey="value"><Cell v-for="(entry, i) in data" :key="i" :fill="COLORS[i]" /></Bar>`

### LabelList
- Place as **child slot** inside series component (Bar, Line, RadialBar): `<Bar><LabelList position="top" /></Bar>`
- Data flows via `provideCartesianLabelListData` context
- Teleports to label SVG layer when available

### Tooltip
- **`#content` slot** (preferred): `<Tooltip><template #content="{ active, payload, label }">...</template></Tooltip>`
- **IMPORTANT**: use destructured props, NOT `v-bind="tooltipProps"` — `@antfu/eslint-config` auto-fix strips `v-bind` spread on slot props
- Key props: `defaultIndex`, `trigger="click"`, `shared={false}`, `cursor={false}`

### Tooltip Payload Selection
- `tooltipEventType='axis'`: returns all items at hovered index
- `tooltipEventType='item'`: filters by `filterByDataKey`; special cases for sync and defaultIndex

### Polar Components
- **PolarAngleAxis**: slot `#tick` with `{ x, y, value, textAnchor }` for custom tick labels; full-circle dedup removes last tick at 360°=0°
- **PolarRadiusAxis**: `type='auto'` resolves by layout (radial→category, centric→number); default `domain` is `[0, 'auto']`; provides `POLAR_LABEL_VIEW_BOX_KEY` for child `<Label>` to access `{ cx, cy }`
- **PolarGrid**: `gridType` (`polygon`|`circle`), `radialLines` (default `true`), `polarRadius` (number[] override)

### Pie
- Chain-sweep animation: all slices sweep as one continuous arc
- `activeIndex`: controlled (`!== -1`) vs uncontrolled; slot `#shape` for custom sectors

### RadialBar
- Two layout modes: `centric` (radius numeric) and `radial` (angle numeric)
- Does NOT use `useSetupGraphicalItem` — registers via `SetPolarGraphicalItem` directly
- `cornerRadius`/`forceCornerRadius`/`cornerIsExternal` forwarded to background sectors

### CartesianGrid
- Custom line rendering via `#horizontal`/`#vertical` slots (Function type removed from props)
- `renderLineItem(slot, option, props)` — slot is first argument
- Rendering layers: Background → HorizontalStripes → VerticalStripes → HorizontalGridLines → VerticalGridLines

### ErrorBar
- Place as child of `<Scatter>` or `<Bar>`; consumes `ErrorBarContext` from parent
- Self-registers into parent's `ErrorBarRegistry` for axis domain extension

### Testing
- `isAnimationActive={false}` for deterministic rendering
- `mockGetBoundingClientRect({ width, height })` in `beforeEach`
- Helpers: `@/test/helper` (`getBarRectangles`, `expectAreaCurve`, etc.)

### Storybook
- Story titles must match Recharts conventions
- Clone array data in `render`: `data={[...data1]}` (Vue proxy errors)
- Shared data: `@/storybook/data`; `timeData`: 7-entry daily dataset `{ x: Date, y: number, z: number }`
- `syncId` links chart tooltips; `syncMethod="index"` syncs by data index
- Item-level data: `<Line data={s.data}>` passes series data directly

### TimeSeries / Date Axis
- `XAxis` with Date: use `domain={['auto', 'auto']}`
- Custom d3 scale: `scaleTime()` via `scale` prop with `type='number'`
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
