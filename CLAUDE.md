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
- `getItemColor`: Bar/RadialBar → `fill`; Area/Line/Radar → `getLegendItemColor(stroke, fill)` (stroke-preferring)
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
- Clone array data in `render` to avoid Vue proxy errors: `data={[...data1]}`
- Story titles must match Recharts conventions
- Shared data: `@/storybook/data` (`pageData`, `logData`, `subjectData`, `timeData`, etc.); domain-specific datasets imported directly by path (e.g. `babiesAndVideosCorrelation` from `@/storybook/data/spurriousCorrelations`)
- `timeData`: 7-entry daily dataset `{ x: Date, y: number, z: number }` (2019-07-04 → 2019-07-10), exported from `@/storybook/data`
- Synchronised charts: add `syncId="<id>"` to chart containers to link tooltip/hover; use `syncMethod="index"` to sync by data index rather than x-value
- Item-level data: series data can be passed to the graphical item directly (`<Line data={s.data}>`) instead of the chart container; mix both styles in the same chart
- `Tooltip cursor` prop: `cursor={false}` disables cursor entirely; `cursor={{ stroke: 'red' }}` for stroke-only styling — object form is NOT a VNode, just a style config
- `Tooltip content` prop: accepts a **component reference** (e.g. `content={MyComponent}`) — not a VNode and not a slot; the component receives `active` + `payload` props
- Tooltip key props: `defaultIndex` (pre-select index), `trigger="click"` (click activation), `shared={false}` (item-level mode), `includeHidden` (show hidden series), `offset` (pixel offset from cursor)

### TimeSeries / Date Axis
- `XAxis` with Date dataKey: use `domain={['auto', 'auto']}` for automatic date domain inference
- Custom d3 scale: pass `scaleTime()` via `scale` prop with `type='number'`, manual `ticks` array (numeric timestamps), and a `tickFormatter`
- Multi-scale tick formatter pattern: use `victory-vendor/d3-time` boundary helpers (`timeSecond`, `timeMinute`, `timeHour`, `timeDay`, `timeWeek`, `timeMonth`, `timeYear`) with native `Date` methods — avoids importing `d3-time-format`; see `TimeSeries.stories.tsx` `multiFormat()` for reference
- Story title convention: `'Examples/TimeSeries'`

### PolarRadiusAxis
- Props: `radiusAxisId` (default `0`), `dataKey` (DataKey, default `undefined` — passed through to Redux store), `angle` (default `0`), `tick` (default `true`), `axisLine` (default `true`), `orientation` (`'left'|'right'|'middle'`, default `'right'` — controls textAnchor), `tickFormatter`, `stroke` (default `'#ccc'`), `allowDecimals` (default `false`), `domain`, `tickCount` (default `5`), `type` (default `'number'`)
- Dispatches `addRadiusAxis`/`removeRadiusAxis`; when both `tick={false}` and `axisLine={false}`: renders `null` (use to set domain without visual output)
- Tick label rotation uses `angle={90 - angle}` prop on `<Text>` (not CSS `transform`)
- CSS classes: `v-charts-polar-radius-axis` (g), `v-charts-polar-radius-axis-line` (axis line), `v-charts-polar-radius-axis-ticks` (tick group g), `v-charts-polar-radius-axis-tick-value` (tick Text)
- **Scale type in radial layout**: `combineRealScaleType` (`state/selectors/axisSelectors.ts`) does NOT override scale for polar axes based on layout — polar axes use their `type` prop just like cartesian axes (`type='number'` → `'linear'`, `type='category'` + bar → `'band'`); there are no special `layout === 'radial'` overrides for `radiusAxis`/`angleAxis` scale type selection

### RadialBar
- Props: `dataKey` (required), `angleAxisId`/`radiusAxisId` (default `0`), `background` (Boolean|Object, default `false`), `label` (Boolean|Object, default `false`), `isAnimationActive` (default `true`), `minPointSize` (default `0`), `maxBarSize`, `barSize`, `stackId`, `fill`, `stroke`, `fillOpacity`, `strokeWidth`, `strokeDasharray`, `legendType` (default `'rect'`), `tooltipType`, `hide`, `name`
- Two layout modes: `'centric'` (radius axis numeric — innerRadius/outerRadius from radius scale, startAngle/endAngle from angle ticks) and `'radial'` (angle axis numeric — startAngle/endAngle from angle scale, innerRadius/outerRadius from radius ticks)
- Registers via `SetPolarGraphicalItem` (type: `'radialBar'`), `SetLegendPayload`, and `SetTooltipEntrySettings` directly (does NOT use `useSetupGraphicalItem`)
- `getLegendItemColor` returns `fill` only (not stroke-preferring, unlike Line/Area/Radar)
- Animation chase pattern: `prevSectors` + incrementing `animationId` as `<Animate key>`; interpolates `startAngle`, `endAngle`, `innerRadius`, `outerRadius`; new sectors animate from zero (endAngle from startAngle, outerRadius from innerRadius); existing sectors interpolate from previous values
- `background` prop: renders background `<Sector>` elements behind each data sector with `fill="#eee"` `fill-opacity=0.5`; pass object to override background sector props
- `label` prop: renders `<LabelList>` outside the animation block (always shows at final data position); hidden while `isAnimating`
- `provideCartesianLabelListData`: passes `fill` from per-entry sector data (`sector.fill ?? props.fill`) so each label inherits entry color
- Sector fill: `sector.fill ?? props.fill`; stroke: `props.stroke ?? sectorFill`
- `minPointSize`: enforces minimum angular span (radial layout) or radial thickness (centric layout) via `mathSign` delta correction
- Stacking: reuses `combineStackGroups` + `combineStackedData` from `barSelectors`; bar positioning reuses `combineAllBarPositions` + `combineBarSizeList`
- `RadialBarDataItem`: `{ cx, cy, innerRadius, outerRadius, startAngle, endAngle, value?, payload?, background?: SectorProps, [key]: any }`
- `selectRadialBarLegendPayload`: maps `chartData` entries to `{ type, value: entry.name, color: entry.fill, payload }` (legend color from `entry.fill`)
- Mouse events: `onMouseenter` → `setActiveMouseOverItemIndex`; `onMouseleave` → `mouseLeaveItem`
- CSS class: `v-charts-radial-bar` (outer Layer)

### Scatter
- Props: `line` (Boolean|Object, default `false`), `lineType` (`'joint'|'fitting'`, default `'joint'`), `lineJointType` (CurveType, default `'linear'`), `label` (Boolean|Object, default `false`)
- `line` prop: when `lineType='joint'` renders a `<Curve>` through all points in order; when `lineType='fitting'` computes least-squares regression via `getLinearRegression(data)` (`utils/getLinearRegression.ts`) and draws a two-point best-fit line; pass object to `line` to override stroke/fill on the curve
- `getLinearRegression` takes `{ cx?, cy? }[]` (pixel coords) and returns `{ xmin, xmax, a, b }` (y = ax + b)
- `label` prop: renders `<LabelList>` outside the animation block using `data.map(point => ({ x, y, width: 0, height: 0, value: undefined, payload }))` — labels always show current frame position, not animated position
- Animation: symbols and line are wrapped together inside `<Animate>`; the `label` layer is rendered outside animation so it always shows at final data position
- Tooltip: uses `skipTooltip: true` in `useSetupGraphicalItem` and sets its own `SetTooltipEntrySettings` with per-point `tooltipPayload` arrays; dispatches both `setMouseOverAxisIndex` and `setActiveMouseOverItemIndex` per symbol so it works in both `ComposedChart` (axis tooltip) and `ScatterChart` (item tooltip)
- CSS classes: `v-charts-scatter` (outer Layer), `v-charts-scatter-line` (line Layer), `v-charts-scatter-symbol` (per-symbol `<g>`)
- Provides `ErrorBarContext` + `ErrorBarRegistry` in setup so child `<ErrorBar>` components in `slots.default` work; `errorBarOffset` is always `0` for Scatter (non-zero only for grouped Bar)

### ErrorBar
- Props: `dataKey` (required, DataKey — resolved against parent series payload), `width` (default `5`, half-width of end caps), `direction` (`'x'|'y'`, default: `'y'` for horizontal layout, `'x'` for vertical layout), `stroke` (default `'black'`), `strokeWidth` (default `1.5`)
- Consumes `ErrorBarContext` provided by the parent series (`Scatter`, `Bar`); context supplies `data`, `dataPointFormatter`, `xAxisId`, `yAxisId`, `errorBarOffset`
- Self-registers into parent's `ErrorBarRegistry` (via `useErrorBarRegistry`) on mount and unregisters `onUnmounted`; registry propagates `ErrorBarsSettings` to Redux so the axis domain extends to include error bar ranges
- `errorVal` resolved via `dataKey` on payload: number → symmetric error; `[low, high]` tuple → asymmetric error
- Direction `'x'` requires `xAxis.type === 'number'` — silently renders nothing otherwise
- Renders 3 SVG `<line>` elements per point: main bar + two end caps; `errorBarOffset` shifts the midpoint perpendicular to the error direction
- CSS classes: `v-charts-errorBars` (outer Layer), `v-charts-errorBar` (per-point Layer)
- Usage: place as a child slot of `<Scatter>` or `<Bar>` — e.g. `<Scatter>{{ default: () => <ErrorBar dataKey="error" /> }}</Scatter>`

### useSetupGraphicalItem
- Signature: `useSetupGraphicalItem(props, type, options?)` — `options: { skipTooltip?: boolean, errorBars?: ShallowRef<ReadonlyArray<ErrorBarsSettings>> }`
- `skipTooltip: true`: skip `SetTooltipEntrySettings` (used by Scatter which registers its own custom tooltip entries)
- `errorBars`: passed to `SetCartesianGraphicalItem` so Redux knows each error bar's `direction` + `dataKey` for axis domain extension
- Both `Bar` and `Scatter` call `createErrorBarRegistry()` + `provideErrorBarRegistry()` in setup, then pass `errorBarRegistry.errorBars` to this hook

### Tooltip Payload Selection
- `combineTooltipPayloadConfigurations` (`state/selectors/combiners/`) filters `tooltipState.tooltipItemPayloads` for display
- `tooltipEventType='axis'`: returns all items (every series shown at the hovered axis index)
- `tooltipEventType='item'`: filters by `filterByDataKey` from hover/click `itemInteraction`; three special cases:
  1. `syncInteraction.active && filterByDataKey == null` → return all items (receiving chart hasn't been hovered; show full data at synced index, matching axis-tooltip behaviour)
  2. `filterByDataKey == null && defaultIndex != null` → return first item only (`defaultIndex` pre-selection with no hover)
  3. Normal case: filter by matching `settings.dataKey`

### Cross Shape
- Functional component (not `defineComponent`): `Cross(props) → <path class="v-charts-cross">`
- Props: `x`, `y`, `width`, `height`, `top`, `left` (all optional, default `0`); returns `null` if any is non-numeric
- Path formula: `M{x},{top}v{height}M{left},{y}h{width}` (vertical line + horizontal line forming a cross)
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
