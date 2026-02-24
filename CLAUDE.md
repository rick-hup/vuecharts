# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Workflow Orchestration

### 1. Plan Node Default
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately - don't keep pushing
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

### 2. Subagent Strategy
- Use subagents liberally to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One tack per subagent for focused execution

### 3. Self-Improvement Loop
- After ANY correction from the user: update `tasks/lessons.md` with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate drops
- Review lessons at session start for relevant project
### 4. Verification Before Done
- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

### 5. Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes - don't over-engineer
- Challenge your own work before presenting it

### 6. Autonomous Bug Fixing
- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, failing tests - then resolve them
- Zero context switching required from the user
- Go fix failing CI tests without being told how

## Task Management

1. **Plan First**: Write plan to `tasks/todo.md` with checkable items
2. **Verify Plan**: Check in before starting implementation
3. **Track Progress**: Mark items complete as you go
4. **Explain Changes**: High-level summary at each step
5. **Document Results**: Add review section to `tasks/todo.md`
6. **Capture Lessons**: Update `tasks/lessons.md` after corrections

## Core Principles

- **Simplicity First**: Make every change as simple as possible. Impact minimal code.
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimat Impact**: Changes should only touch what's necessary. Avoid introducing bugs.

## Overview

**Vue Charts (vccs)** - An unofficial Vue 3 port of [Recharts](https://recharts.org/). Provides composable charting components built with Vue 3 Composition API + JSX/TSX.

- **Recharts React source reference:** `/Users/huangpeng/Documents/workspace/web/mygithub/charts/recharts`
- When porting components, refer to the React source for behavior parity
- Monorepo with pnpm workspaces: `vccs` (library) + `play` (Nuxt playground)
<!-- END AUTO-MANAGED -->

<!-- AUTO-MANAGED: build-commands -->
## Build & Development Commands

```bash
# Install dependencies
pnpm install

# Start development mode (watch mode)
pnpm dev

# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Build the library
pnpm --filter vccs build

# Run Storybook
pnpm storybook

# Run playground
pnpm play

# Run specific test file
pnpm test packages/vue/src/chart/__tests__/AreaChart.spec.tsx

# Publish release
pnpm pub:release
```
<!-- END AUTO-MANAGED -->

<!-- AUTO-MANAGED: architecture -->
## Architecture

```
packages/vue/src/           # Main library source (vccs)
├── animation/              # Animate component, motion-v utilities
├── cartesian/              # Cartesian chart components
│   ├── area/               # Area component (hooks, context, types)
│   ├── bar/                # Bar component
│   ├── line/               # Line component
│   ├── error-bar/          # ErrorBar component (child slot of Bar/Line/Area)
│   ├── axis/               # XAxis, YAxis
│   ├── brush/              # Brush component
│   ├── cartesian-grid/     # CartesianGrid
│   ├── cartesian-axis/     # CartesianAxis
│   ├── funnel/             # Funnel component (types only, not yet implemented)
│   ├── scatter/            # Scatter component + useScatter hook
│   ├── reference-line/     # ReferenceLine component (horizontal/vertical reference lines)
│   ├── utils/              # Shared cartesian utilities (get-ticks)
│   └── z-axis/             # ZAxis component (data-only, no visual output)
├── chart/                  # Chart containers (AreaChart, BarChart, LineChart, ComposedChart)
├── components/             # Shared: legend, tooltip, text
├── container/              # ResponsiveContainer, Surface, Layer
├── context/                # Context providers
├── events/                 # Event handling
├── hooks/                  # Shared composition hooks
├── shape/                  # SVG shape utilities (Rectangle, Symbols, Curve, Dot)
├── state/                  # Redux store, slices, middleware, selectors
├── storybook/              # Storybook stories
├── synchronisation/        # Chart synchronization
├── test/                   # Test utilities
├── types/                  # Shared type definitions
├── utils/                  # Utility functions
└── index.ts                # Public API entry point

playground/nuxt/            # Nuxt 3 playground for testing
```

### Key Architecture Decisions

1. **Component Architecture**: Vue 3 `defineComponent` + JSX render functions (not SFC)
2. **State Management**: Redux Toolkit via `@reduxjs/vue-redux` - one store per chart instance created with `createRechartsStore`
3. **Context**: `provide/inject` pattern for parent-child component communication (e.g., `useAreaContext`)
4. **Chart Factory**: `generateCategoricalChart()` factory creates chart containers (BarChart, AreaChart, LineChart, ComposedChart)
5. **Animation**: `motion-v` library with custom `Animate` wrapper component
6. **Event Handling**: Redux middleware for mouse, keyboard, touch, and external events
7. **Build Output**: Dual format - ES Modules (`.mjs`) + CommonJS (`.js`) + TypeScript declarations
<!-- END AUTO-MANAGED -->

<!-- AUTO-MANAGED: conventions -->
## Code Conventions

### Naming
- **Components**: PascalCase (`Area`, `BarChart`, `CartesianGrid`)
- **Directories**: kebab-case (`cartesian-grid`, `cartesian-axis`)
- **Hooks**: `use` prefix (`useArea`, `useBar`, `useSetupGraphicalItem`)
- **Context hooks**: `use` + `Context` suffix (`useAreaContext`, `useBarContext`)
- **Types**: PascalCase + `Props` suffix (`AreaProps`, `BarPropsWithSVG`)
- **Type files**: `type.ts` in each component directory
- **Tests**: `__tests__/*.spec.tsx`
- **Stories**: `__stories__/*.stories.tsx`

### Component Structure Pattern
```typescript
export const Component = defineComponent<PropsWithSVG>({
  name: 'Component',
  props: ComponentVueProps,
  inheritAttrs: false,
  slots: Object as SlotsType<Slots>,
  setup(props, { attrs, slots }) {
    useSetupGraphicalItem(props, 'itemType')  // Register with Redux
    const { ...data } = useComponentHook(props, attrs)
    return () => (/* JSX */)
  },
})
```

### Props Definition Pattern
```typescript
// type.ts - Vue props object + TypeScript type extraction
export const ComponentVueProps = {
  dataKey: { type: [String, Number, Function] as PropType<DataKey<any>>, required: true },
  fill: { type: String, default: undefined },
}
export type ComponentPropsWithSVG = WithSVGProps<VuePropsToType<typeof ComponentVueProps>>
```

### Imports
- Path alias: `@/` maps to `packages/vue/src/`
- Prefer `import type` for type-only imports
- Re-export from `index.ts` barrel files
<!-- END AUTO-MANAGED -->

<!-- AUTO-MANAGED: patterns -->
## Detected Patterns

### Porting from Recharts
- Compare with React source at `/Users/huangpeng/Documents/workspace/web/mygithub/charts/recharts/src/`
- React `useState`/`useEffect` → Vue `ref`/`watch`; Context → `provide`/`inject`; Redux hooks → `@reduxjs/vue-redux`
- React `useMemo`/`useCallback` → Vue `computed` / plain functions
- React JSX → Vue JSX (watch for `class` vs `className`, event handlers)

### Redux Store Pattern
- One store per chart via `createRechartsStore(preloadedState?, chartName?)`; graphical items register via `useSetupGraphicalItem`
- Slices: `brushSlice`, `cartesianAxisSlice`, `chartDataSlice`, `graphicalItemsSlice`, `layoutSlice`, `legendSlice`, `optionsSlice`, `polarAxisSlice`, `polarOptionsSlice`, `referenceElementsSlice`, `rootPropsSlice`, `tooltipSlice`
- Middleware: `mouseClickMiddleware`, `mouseMoveMiddleware`, `keyboardEventsMiddleware`, `externalEventsMiddleware`, `touchEventMiddleware`; `serializableCheck: false`, `immutableCheck: false`

### Hook Composition
- Each graphical component has a dedicated hook (e.g., `useArea`, `useBar`, `useScatter`) returning render-ready data
- `useSetupGraphicalItem` uses `getItemColor(type, stroke, fill)`: Bar → `fill`; Area/Line → `getLegendItemColor(stroke, fill)` (stroke-preferring)

### Testing Patterns
- Use `isAnimationActive={false}` on graphical items for deterministic rendering
- Use `mockGetBoundingClientRect({ width, height })` in `beforeEach` to simulate container dimensions
- Test helpers in `@/test/helper`: `getBarRectangles`, `getBarRects`, `expectAreaCurve`, `assertNotNull`
- Tooltip interaction: `fireEvent.mouseEnter(bars[0])` then check `.v-charts-tooltip-content`
- Context provider tests: `defineComponent` child with spy → render via template string

### SVG Layer Teleport Pattern
`chart/Surface.vue` provides three-tier z-ordering via `Teleport`:
- **Tier 1** cursor layer (`CursorLayerContext`) → **Tier 2** graphical layer (`GraphicalLayerContext`) → **Tier 3** label layer (`LabelLayerContext`)
- Each context: `[useXxxLayerRef, provideXxxLayerRef]` via `createContext<Ref<SVGGElement | null>>`; fallback: inline rendering

### Animation Chase Pattern
- **Bar / Scatter**: `previousData` + incrementing `animationId` as `Animate` key; `previousData` updated at `t > 0` so rapid data changes interpolate from current visual position (not stale target); new items animate from zero
- **Line (`StaticLine`)**: dual strategy gated by `isFirstRender` flag (local `let`): first render uses pathLength reveal (`strokeDashRatio` ref 1→0, applied as `pathLength=1 stroke-dasharray=1 stroke-dashoffset=ratio` on `<Curve>`); subsequent updates use point interpolation (`prevPoints` + `prevPointsDiffFactor`); `prevPoints` updated in `onComplete` so rapid changes chase the current visual position; `animationTarget` tracks the destination of the in-flight animation — duplicate guard compares against target (not start) so new points matching the animation START correctly interrupt it; `revealAnimationRunning` flag — new points arriving during the initial reveal just update `currentPoints` + `animationTarget` without interrupting the reveal; `currentAnimation` ref + `stopCurrentAnimation()` cancels in-flight animation on re-trigger; `onBeforeUnmount` cleans up any in-flight animation; `isAnimationActive=false` bypasses all animation and sets points directly; **clipRect reveal exception**: pathLength animation cannot be used when `shapeSlot` is present (arbitrary JSX, not a single `<path>`) OR when a custom `stroke-dasharray` attr is set (pathLength would override it) — in both cases a `<clipPath>` rect (`width={(1-dashRatio)*100}%`) reveals the content from left (`needClipAnim = (shapeSlot || hasCustomDashArray) && dashRatio > 0`)

### Vue Reactivity + D3 Integration
- Always call `toRaw(entry)` before passing reactive data to D3 scale functions; Vue Proxy objects cause incorrect D3 behavior

### Key Component Gotchas
- `XAxis.dataKey`/`YAxis.dataKey` default to `undefined` (not `''`); `YAxis.unit` defaults to `undefined`
- `XAxis.interval`/`YAxis.interval` prop typed as `AxisInterval` (`number | 'preserveStart' | 'preserveEnd' | 'preserveStartEnd' | 'equidistantPreserveStart' | 'equidistantPreserveEnd'`); default applied in dispatcher: `interval ?? 'preserveEnd'`
- `selectHasBar(state)` uses `cartesianItems.some(item => item.type === 'bar')` (not `countOfBars`)
- `Rectangle` renders `<path>` (not `<rect>`) with `getRectanglePath()` for rounded corner support
- `Symbols` is a functional component (not `defineComponent`); renders D3-based `<path>` with class `.v-charts-symbols`
- `Bar` `fill` defaults to `undefined` — callers must supply fill explicitly
- `Bar` `shape` uses **named slot** (not prop): `<Bar>{{ shape: (props) => <Custom {...props} /> }}</Bar>`
- `Line` `shape` uses **named slot** (same pattern as `Bar`): `<Line>{{ shape: (payload: CurveProps) => <MyShape {...payload} /> }}</Line>`; slot receives `{ ...curveAttrs, points, connectNulls, type, layout, class: 'v-charts-line-curve' }`; replaces default `<Curve>` render; passed via context (`shapeSlot`) to `StaticLine` which is context-driven (no props)
- `ErrorBar` as child slot of `Bar`: data via `provideErrorBarContext`/`useErrorBarContext`; supports `[low, high]` tuples
- `LabelList` suppressed during animation (`!isAnimating`); slot-based children receive data via `CartesianLabelListContext`; supports named slot `label` for fully custom label rendering: `<LabelList>{{ label: (props) => <CustomLabel {...props} /> }}</LabelList>` — slot receives `{ ...others, ...attrs, ...viewBox, value, index }`; teleports to `labelLayerRef` when available (SVG z-ordering tier 3)
- `Tooltip` cursor only renders when `tooltipEventType === 'axis'`; custom cursor via `cursor` **slot**
- `Brush` `Panorama` uses `cloneVNode` + `compact=true`; `useIsPanorama()` for detection; `BrushText` uses `<Text value={...} />` (value prop, not children)
- `Scatter` `isAnimationActive` defaults to `true`; `transition` prop for custom `AnimationOptions`; always hosted inside `ComposedChart` (no standalone `ScatterChart`); accepts per-component `data` prop OR inherits chart-level `data`; `Scatter data={[]}` renders an empty chart (axes still render with custom `ticks`/`domain`/`tickFormatter`)
- `ZAxis` is data-only (renders `null`); pairs with `Scatter` for symbol sizing; `range={[60, 400]}` for variable bubble size, `range={[200, 200]}` for fixed size
- `Line` `dot` prop: plain object `{ stroke, 'stroke-width', r, clipDot }` for custom dot styling — SVG attribute names use kebab-case in Vue JSX plain objects (`'stroke-width'` not `strokeWidth`); `clipDot` boolean controls clipping to chart area; `hide` prop to conditionally show/hide series; `legendType="none"` + `tooltipType="none"` exclude a Line from legend/tooltip (trailing icon pattern); `connectNulls` bridges gaps over null values; `label` prop: plain object `{ fill, dy?, ... }` for inline data labels (`dy` offsets label vertically, e.g. `label={{ fill: 'red', dy: -25 }}` positions above point); `dot={false}` hides all dots; `dot` also accepts a **named slot**: `<Line>{{ dot: (props) => <CustomDot {...props} /> }}</Line>` — slot receives `{ fill, stroke, stroke-width, cx, cy, index, value, payload, ...attrs }` per point; implemented via `dotSlot` in `LineContext`; default dot `r=3`; `label` also accepts a **named slot**: `<Line>{{ label: (props) => <CustomLabel {...props} /> }}</Line>` — slot receives `{ ...labelProps, ...attrs, ...viewBox, value, index }` per point; implemented via `labelSlot` in `LineContext`; passed to `LabelList` as named `label` slot; suppressed during animation; `data` prop on `Line` directly provides component-level data (overrides chart-level `data`); `onMouseEnter={undefined}` / `onMouseLeave={undefined}` are safe to pass (no-ops)
- `Legend` CSS classes: `v-charts-legend-wrapper` (outer div via Teleport), `v-charts-default-legend` (ul), `v-charts-legend-item` (li), `v-charts-legend-item-text` (span); `content` **named slot** for fully custom legend: `<Legend>{{ content: (props) => <MyLegend {...props} /> }}</Legend>` — slot receives `{ ...legendProps, payload: LegendPayload[] }`; props: `layout` (`'horizontal'|'vertical'`), `align` (`'left'|'center'|'right'`), `verticalAlign` (`'top'|'middle'|'bottom'`), `iconSize` (default `14`), `iconType` (`LegendType`), `wrapperStyle`, `itemStyle`, `formatter`, `onClick`, `onMouseEnter`, `onMouseLeave`, `payloadUniqBy`, `itemSorter` (default `'value'`; accepts `'value'|'dataKey'|function`), `portal` (custom DOM target); `onClick` receives `(data: LegendPayload, index: number)` where `LegendPayload` has `{ dataKey, value, color, type, inactive }`; entries with `type === 'none'` are **entirely skipped** in default rendering (no `<li>` rendered — use `legendType="none"` on a series to exclude it from the legend list completely); `inactive` entries (not `'none'`) are rendered but dimmed with `color: '#ccc'`; renders via `Teleport` to `legendPortal` (from context or `portal` prop); `payloadUniqBy` deduplicates payload entries; payload sourced from Redux `selectLegendPayload`; bounding box synced to store via `setLegendSize`
- `LegendSymbol` (`components/legend/LegendSymbol.tsx`) renders the SVG icon for each legend entry; `SIZE=32` is the canvas constant; switch on `type`: `'none'` → null; `'line'` → `<path>` curved line with loops (stroke, no fill); `'plainline'` → `<line>` with optional `strokeDasharray` from `data.payload`; `'rect'` → filled rectangle `<path>`; default (circle, cross, diamond, square, star, triangle, wye, etc.) → `<Symbols fill cx cy size={SIZE} sizeType="diameter" type>` using D3-based shapes (NOT a plain `<rect>`)
- `CartesianAxis` is the base axis renderer (used by `XAxis`/`YAxis`); `label` prop: string/number → `<Label value={label} viewBox={axisViewBox} />`; object → `<Label {...label} viewBox={axisViewBox} />` (supports `value`, `position`, `offset`, `angle`, `style`); `tick` **named slot** for custom tick rendering: `slots.tick({ ...tickProps, value })`; CSS classes: `v-charts-cartesian-axis` (Layer), `v-charts-cartesian-axis-line` (axis line), `v-charts-cartesian-axis-ticks` (tick group), `v-charts-cartesian-axis-tick` (tick Layer), `v-charts-cartesian-axis-tick-value` (tick Text), `v-charts-cartesian-axis-tick-line` (tick line)
- `Label` component (`components/label/Label.tsx`) wraps `<Text>` for chart labels; `angle` prop is forwarded to `<Text>` (required for rotated axis labels); `content` **named slot**: `slots.content(props)` for fully custom content; gets `viewBox` from `useViewBox()` context when not passed as prop; CSS class: `v-charts-label`; `LabelPosition` covers 20+ named positions plus `{ x?, y? }` offset object
- `ReferenceLine` props: `x` or `y` (value on axis), `xAxisId`/`yAxisId` (default `0`), `stroke` (default `'#ccc'`), `strokeWidth`, `fill`, `label` (string/number → `<Label value>`, object → spread as `<Label>` props), `ifOverflow` (`'discard'` hides out-of-range, `'hidden'` clips via `clip-path`); registers with Redux via `addLine`/`removeLine` from `referenceElementsSlice`; CSS classes: `v-charts-reference-line` (Layer), `v-charts-reference-line-line` (line element)
- `ScaleType` (`types/scale.ts`) includes `'symlog'` — use `<YAxis scale="symlog" />` for logarithmic axes with negative-value support; explicit `ticks` array required for meaningful tick placement
- `Text` component (`components/Text.vue`) is a Vue SFC (not `defineComponent` + JSX); props: `x, y, dx, dy, lineHeight, capHeight, scaleToFit, textAnchor, verticalAnchor, fill, angle, style, breakAll, maxLines, width, value`; `dx`/`dy` are numeric offset props added to `x`/`y` position; `style` applied as CSS inline (`:style="props.style"`) — do NOT use `v-bind="props.style"` (would spread as SVG attributes); supports word-wrap + `<tspan>` per line, `maxLines` truncation with ellipsis, `scaleToFit`; CSS class `v-charts-text`
- `combineActiveTooltipIndex` (`state/selectors/combiners/combineActiveTooltipIndex.ts`) is domain-aware: accepts optional `axisDataKey` + `domain` args; returns `null` when the active entry's value falls outside the number domain — this drives `ActiveDotExcludedFromDomain` story behavior (`XAxis type="number" domain={[1.01, 1.15]} allowDataOverflow` hides the active dot for out-of-range points)
- Storybook shared data (`@/storybook/data`): exports `pageData` (7 pages, `{ name, uv, pv, amt }`), `logData` (11 entries, `{ year, performance }`, 1970–2020 exponential), `numberData`, `subjectData`, `pageDataWithFillColor`, `pageDataWithNegativeNumbers`, `rangeData`

### Storybook Patterns
- Wrap interactive stories in `defineComponent` + `ref` for reactive state
- When story args contain arrays, construct derived data inside `render` to avoid Vue proxy invariant errors
- Clone array data in render (`data.map(d => ({ ...d, arr: [...d.arr] }))`) for the same reason
- Legend `onClick` handler receives `{ dataKey }` payload; use reactive array (`activeSeries`) to toggle series visibility via `Line hide={activeSeries.includes(dataKey)}`
- Storybook canvas (`.storybook/global.css`): `#storybook-root:not([hidden='true'])` is full-viewport (`100vw`/`100vh`) column flex; direct children use `flex-shrink: 0`; stories that use `height: 100vh` (e.g., `WithAbsolutePositionAndFlexboxParents`) rely on this layout
<!-- END AUTO-MANAGED -->

<!-- AUTO-MANAGED: git-insights -->
## Git Insights

### Active Development Areas
- Scatter animation (current branch `feat/zaxis-scatter`)
- Bar component (shape slot, ErrorBar, LabelList, animation)
- Brush component (Panorama, drag handling, keyboard support)
- Tooltip (cursor rendering, custom cursor slot, chart synchronization)
- ComposedChart + BoxPlot story (Scatter + ZAxis integration)
- **Line chart** (`cartesian/line/`): `computeLinePoints({ layout, xAxis, yAxis, xAxisTicks, yAxisTicks, dataKey, bandSize, displayedData })` in `line/utils.ts` returns `ReadonlyArray<LinePointItem>`; uses `getValueByDataKey` from `@/utils/chart`; horizontal layout: `x` from `getCateCoordinateOfLine`, `y` from `yAxis.scale(value)` (null when value is nullish); vertical layout: `x` from `xAxis.scale(value)` (null when nullish), `y` from `getCateCoordinateOfLine`; `ActivePoints` renders highlighted dot at active tooltip index (`selectActiveTooltipIndex`): `activeDot === false` → nothing; plain object → SVG overrides on default dot; `slots.activeDot` → fully custom; default `<Dot cx cy r=4 fill=mainColor stroke-width=2 stroke="#fff" />` in `<Layer class="v-charts-active-dot">`; `StaticLine` is context-driven (no props) — reads all state via `useLineContext()` including `shapeSlot`; `Dots` (class `LineDots`) uses `fill: '#fff'` + `stroke: props.stroke`; `LabelList` suppressed while `isAnimating`; see Animation Chase Pattern for dual animation strategy; `shape` named slot supported (see Key Component Gotchas); story: `chart/__stories__/CustomLineShapeChart.stories.tsx` (`title: 'Examples/LineChart/CustomLineShapeChart'`) demonstrates custom shape slot with tick marks along line segments
- **Storybook EquidistantPreserveEnd** (`chart/__stories__/EquidistantPreserveEnd.stories.tsx`, `title: 'Examples/EquidistantPreserveEnd'`): `PreserveEndInterval` story — wraps `LineChart` in `ResponsiveContainer width="100%" height={300}` with 10 data points (Page A–J); uses `<XAxis dataKey="name" interval="equidistantPreserveEnd" />` to demonstrate equidistant tick spacing that preserves the last tick; `Line type="monotone" dataKey="uv" isAnimationActive={false}`; `'equidistantPreserveEnd'` is now part of `AxisInterval` type in `types/axis.ts`; handling in `get-ticks.ts` may still be pending if not yet implemented alongside `'equidistantPreserveStart'`
- **LineChart test suite** (`chart/__tests__/LineChart.spec.tsx`): in progress — parallel to `AreaChart.spec.tsx` and `BarChart.spec.tsx`
- **LineChart stories** (`cartesian/line/__stories__/LineChart.stories.tsx`, `title: 'examples/LineChart'`): exports `Simple`, `Dashed`, `Vertical`, `BiAxial`, `VerticalWithSpecifiedDomain`, `ConnectNulls`, `WithXAxisPadding`, `LineChartHasMultiSeries`, `LineChartAxisInterval`, `WithBrush`, `HideOnLegendClick`, `LineTrailingIcon`, `ReversedXAxis`, `ChangingDataKey`, `ToggleBetweenDataKeys`, `LogarithmicYAxis`, `WithReferenceLines`, `WithCustomizedDot`, `ClipDot`, `NegativeValuesWithReferenceLines`, `UndefinedEventHandlers`, `ActiveDotExcludedFromDomain`, `WithCustomizedLabel`, `HighlightAndZoom`, `ToggleChildrenComponentsExceptCartesianGrid`; `LineChartAxisInterval` demonstrates all `interval` variants (`preserveEnd`, `preserveStart`, `preserveStartEnd`, `0`); `BiAxial` uses two `YAxis` with `yAxisId`; `LineTrailingIcon` uses a second `Line` with `legendType="none"` `tooltipType="none"` for trailing icon effect; `LogarithmicYAxis` uses `YAxis scale="symlog"` with explicit `ticks` array (powers of 10 from 0 to 10^10) and `logData` dataset (`{ year, performance }` — 1970–2020 exponential values); `Line unit=" KFLOPS"` demonstrates axis unit labeling; `WithReferenceLines` uses `<ReferenceLine x="Page C" label="Anything" />` and `<ReferenceLine y={1600} label="Something" />`; `WithCustomizedDot` uses `dot` named slot for custom SVG icons per point; `ClipDot` demonstrates `clipDot` prop on the `dot` object (`dot={{ clipDot: bool, r, ... }}`); `NegativeValuesWithReferenceLines` uses `Line data={...}` (component-level data, not chart-level), `dot={false}`, conditional `ReferenceLine` at x=0/y=0, and `YAxis`/`XAxis` `label` object (`{ value, style, angle, position, offset }`); `ActiveDotExcludedFromDomain` uses `XAxis type="number" domain={[1.01, 1.15]} allowDataOverflow` to test active dot clipping at axis boundaries; `WithCustomizedLabel` demonstrates `XAxis` `tick` named slot (`<XAxis height={60}>{{ tick: (tickProps) => <CustomTick {...tickProps} /> }}</XAxis>`) for rotated custom ticks, and `Line` `label` named slot for inline data labels; `HighlightAndZoom` demonstrates drag-to-zoom using `onMouseDown`/`onMouseMove`/`onMouseUp` chart events + `ReferenceArea` to highlight selection region + dual `YAxis` (`yAxisId="1"`/`"2"`) + `Line transition={{ duration: 0.3 }}` for smooth zoom animation; `ToggleChildrenComponentsExceptCartesianGrid` wraps `ToggleChildrenWrapper` which conditionally mounts/unmounts all chart children except `CartesianGrid` (tests slot reactivity); uses `allowDuplicatedCategory={false}`, custom `ticks` array on `XAxis`, dual `YAxis` with `yAxisId`, `dot={false}` — `Legend` must be placed **inside** `LineChart` (not as a sibling after `</LineChart>`)
- **ScatterChart stories** (`cartesian/scatter/__stories__/ScatterChart.stories.tsx`, `title: 'examples/ScatterChart'`): exports `ChangingDataKey`, `SimpleScatter`, `EmptyChart`; all use `ComposedChart` (no standalone `ScatterChart`); `SimpleScatter` pairs `XAxis type="number" dataKey="x"` + `YAxis type="number" dataKey="y"` + `ZAxis dataKey="z" range={[60, 400]}`; `EmptyChart` uses `Scatter data={[]}` with timestamp-based `XAxis` (`ticks`, `domain`, `tickFormatter`) to render an empty chart with full axis configuration
<!-- END AUTO-MANAGED -->

## Dependencies

| Library | Purpose |
|---------|---------|
| `@reduxjs/toolkit` + `@reduxjs/vue-redux` | Chart state management |
| `motion-v` | SVG animations |
| `victory-vendor` | D3 math/scale utilities |
| `lodash-es` | Utility functions |
| `@vueuse/core` | Vue composition utilities |
| `es-toolkit` | Modern JS utilities |

<!-- MANUAL -->
## Custom Notes

Add project-specific notes here. This section is never auto-modified.

<!-- END MANUAL -->
