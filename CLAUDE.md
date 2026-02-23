# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

<!-- AUTO-MANAGED: project-description -->
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

# Lint and typecheck
pnpm lint
pnpm typecheck

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
│   └── cartesian-axis/     # CartesianAxis
├── chart/                  # Chart containers (AreaChart, BarChart, LineChart, ComposedChart)
├── components/             # Shared: legend, tooltip, text
├── container/              # ResponsiveContainer, Surface, Layer
├── context/                # Context providers
├── events/                 # Event handling
├── hooks/                  # Shared composition hooks
├── shape/                  # SVG shape utilities
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
- React `useState`/`useEffect` → Vue `ref`/`watch`
- React Context → Vue `provide`/`inject`
- React Redux hooks → `@reduxjs/vue-redux` hooks (`useSelector`, `useDispatch`)
- React `useMemo`/`useCallback` → Vue `computed` / plain functions
- React JSX → Vue JSX (mostly compatible, watch for `class` vs `className`, event handlers)

### Redux Store Pattern
- Each chart instance has its own Redux store created by `createRechartsStore(preloadedState?, chartName?)`
- Graphical items (Area, Bar, Line) register themselves via `useSetupGraphicalItem`
- State slices: `brushSlice`, `cartesianAxisSlice`, `chartDataSlice`, `graphicalItemsSlice`, `layoutSlice`, `legendSlice`, `optionsSlice`, `polarAxisSlice`, `polarOptionsSlice`, `referenceElementsSlice`, `rootPropsSlice`, `tooltipSlice`
- Middleware stack: `mouseClickMiddleware`, `mouseMoveMiddleware`, `keyboardEventsMiddleware`, `externalEventsMiddleware`, `touchEventMiddleware`
- Middleware config: `serializableCheck: false` and `immutableCheck: false` (both disabled to avoid Redux warnings with mutable Vue reactive objects)
- DevTools named `v-charts-${chartName}` with `reduxDevtoolsJsonStringifyReplacer` for serialization

### Hook Composition
- Each graphical component has a dedicated hook (e.g., `useArea`, `useBar`)
- Hooks return render-ready data: `{ shouldRender, data, points, clipPathId, shouldShowAnimation }`
- Setup hooks register component with the Redux store
- `useSetupGraphicalItem` uses type-aware `getItemColor(type, stroke, fill)` for tooltip color: Bar → `fill` (primary visual is fill); Area/Line → `getLegendItemColor(stroke, fill)` (stroke-preferring); `_itemType` is forwarded into `getTooltipEntrySettings` via the args spread

### Testing Patterns
- Use `isAnimationActive={false}` on graphical items in tests for deterministic, synchronous rendering
- Use `mockGetBoundingClientRect({ width, height })` in `beforeEach` to simulate container dimensions
- Test helpers in `@/test/helper`:
  - `getBarRectangles(container)`: queries `.v-charts-bar-rectangle` nodes
  - `getBarRects(container)`: maps each `.v-charts-bar-rectangle` to its inner `<path>` element (falls back to `<rect>`); asserts not null; use `.getAttribute('d')` to inspect path data
  - `expectAreaCurve(container, expectedAreas)`: queries `.v-charts-area-curve` nodes, compares `d` attribute array
  - `assertNotNull<T>(item)`: throws on null/undefined
- Two levels of bar tests: `cartesian/bar/__tests__/Bar.test.tsx` (simple smoke tests, no helpers), `chart/__tests__/BarChart.spec.tsx` (comprehensive suite using helpers + `mockGetBoundingClientRect`)
- Tooltip interaction test pattern: `fireEvent.mouseEnter(bars[0])` then check `container.querySelector('.v-charts-tooltip-content')`
- Context provider tests: create a `defineComponent` child that calls `useViewBox()`/`useClipPathId()`/`useChartWidth()`/`useChartHeight()` and records values via `vi.fn()` spy; render via template string `<BarChart ...><Comp /></BarChart>`
- Radius tests: assert `rect.getAttribute('d')` contains `'A '` (SVG arc commands) for rounded corners; `Rectangle` renders `<path>` not `<rect>`

### Tooltip Rendering Pattern
- `Tooltip` renders into a portal via Vue `Teleport` (target from `usePortal()` context or `portal` prop); returns `null` until portal is available
- `TooltipBoundingBox` uses `motion.div` directly (not the `Animate` wrapper) for animated CSS `transform` transitions on position changes
- Cursor only renders when `tooltipEventType === 'axis'`; shape is chart-type-specific: BarChart renders a `Rectangle` band (full chart height/width, centered on coordinate, sized via `useTooltipAxisBandSize()`); other chart types render a `Curve` line
- Cursor `Teleport`s into `CursorLayerContext` ref (`<g class="v-charts-cursor-layer">` in `chart/Surface.vue`) so it renders behind graphical items; falls back to inline if ref is unavailable
- Custom cursor: pass a render function as the `cursor` **slot** on `Tooltip` — `<Tooltip>{{ cursor: (props) => <Rectangle {...props} fill="red" /> }}</Tooltip>`; the slot function receives position/dimension props (same as the default cursor element); `cursorSlot` is forwarded from `Tooltip`'s `slots.cursor` to the internal `Cursor` component
- Plain-object `cursor` prop (not boolean) is treated as SVG prop overrides: `cursorSvgProps = (typeof cursor === 'object') ? cursor : {}`; spread onto base `rectProps`/`cursorProps` after defaults so user props win; `style: { pointerEvents: 'none' }` is in base props before the spread
- `shared` prop is three-state (`true`/`false`/`undefined`); `undefined` lets Recharts decide based on chart type
- `useTooltipChartSynchronisation` wires tooltip state to cross-chart sync

### Storybook Interactive Story Pattern
- Wrap interactive stories in a `defineComponent` + `ref` wrapper when story needs reactive state (e.g., `StackedAndDynamic` uses `ref` for `focusedDataKey` and `locked` driven by Legend `onMouseEnter`/`onMouseLeave`/`onClick` events)
- Use `Bar` `hide` prop for dynamic series toggling; `activeBar` prop (e.g., `{ fill: 'gold' }`) for hover highlight
- `Tooltip` `shared={false}` shows tooltip for individual bar only (not all series at that x position)
- When story args contain array values Storybook freezes (e.g., `[100, 200]` error bounds), construct derived data inside the `render` function rather than in `args` to avoid Vue proxy invariant errors: `const data = (args.data as typeof pageData).map(d => ({ ...d, pvError: [100, 200] }))` inside render
- `Brush` `dy` prop offsets the brush vertically (e.g., `dy={30}`) to avoid overlap with `XAxis` when `tickMargin` is large; pair with adequate `margin.bottom` on the chart
- `HasLabelBasedOnSeparateDataKey` story: demonstrates `Bar` `label` prop as an object (`{ dataKey: 'label', position: 'top', fill: '#111' }`); compute enriched data inside `render` (not in `args`) to avoid Vue proxy invariant errors with derived fields
- `NoPadding` story: demonstrates `Bar` `background` prop as an object (`{ fill: '#eee' }`) to customize background rectangle fill; uses `XAxis scale="point"` with `padding={{ left, right }}` and fixed `barSize`
- `WithMinPointSize` story: demonstrates `Bar` `minPointSize` as a function `(value: number) => number` — returns `0` when `value === 0` so zero-value bars are invisible, returns `2` otherwise to guarantee a minimum pixel height; uses `dataWithSmallValuesAndZero` local dataset; covers stacked and non-stacked bars in one chart
- `OneDataPointPercentSize` story: demonstrates `barSize="30%"` (string percentage) when there is only one data point on a numerical domain (band size cannot be auto-calculated); uses function `dataKey` (`dataKey={(v: number[]) => v[0]}`) and `type="number"` on `XAxis` with explicit `domain`
- `RangedBarChart` story: demonstrates ranged bars where `dataKey="temperature"` and each data entry's `temperature` is a `[low, high]` tuple; clone array data inside `render` (`rangeData.map(d => ({ ...d, temperature: [...d.temperature] }))`) to avoid Vue proxy invariant errors when Storybook freezes array args
- `CustomCursorBarChart` story: demonstrates a custom cursor via `Tooltip`'s `cursor` **slot** — `<Tooltip>{{ cursor: (props: any) => <Rectangle {...props} fill="red" fill-opacity={0.6} stroke="#111" /> }}</Tooltip>`; slot function receives position/dimension props from `Cursor` internals; `Rectangle` imported from `@/shape/Rectangle`
- `ChangingDataKey` story: demonstrates live dataset + function-dataKey switching; `ChangingDataKeyWrapper` `defineComponent` holds `useData2` (`ref(false)`) and `visible` (`ref(true)`) — three buttons swap between `data1` (objects with `x.value`) / `data2` (objects with `y.value`) and hide the bar; both `YAxis` `dataKey` and `Bar` `dataKey` are function refs that switch together with the data; `Bar` uses `animationDuration={1000}` and `label={{ fill: 'red' }}`; demonstrates that function dataKeys and chart data can be swapped atomically without chart teardown
- `ChangingDataKeyAndStacked` story: demonstrates stacked bars with live `dataKey` swapping; `ChangingDataKeyAndStackedWrapper` `defineComponent` has two `Bar`s with `stackId="1"` — Bar1 switches between `dataKey="pv"` and `dataKey="uv"`, Bar2 between `dataKey="uv"` and `dataKey="amt"` via a shared `useData2` toggle; each bar specifies its own `transition` prop (`{ duration: 3 }` and `{ duration: 1 }`) to demonstrate per-bar animation duration control; `label={{ fill: 'red' }}` on both bars
- `ChangingData` story: demonstrates rapid and async data changes with animation chase behavior; `ChangingDataWrapper` `defineComponent` holds `data = ref([{ number: 10 }])`; three buttons — "Change data synchronously" (immediate update to 50), "Change data with setTimeout" (sets 90, then 30 after 150ms delay), "Reset"; uses a minimal 100×100 chart with `<YAxis hide domain={[0, 100]} />` and `<Bar dataKey="number" fill="chocolate" background={{ fill: 'bisque' }} />`; the setTimeout case validates that rapid data changes cause the `Animate` component to interpolate from the current visual position (not the stale target), producing a smooth "chase" effect
- `VerticalWithLabelLists` story: demonstrates multiple `LabelList` components placed as **slot children** of `Bar` (rather than via the `label` prop); `<Bar dataKey="value" fill="#aebbae" isAnimationActive={false}>` contains `<LabelList dataKey="value" position="insideLeft" />` and `<LabelList dataKey="label" position="right" />`; uses `layout="vertical"` with `verticalLabelListData` (entries with long `label` strings and numeric `value`); `XAxis type="number"` + `YAxis dataKey="label" hide type="category"`

### ErrorBar Child Slot Pattern
- `ErrorBar` is placed as a child in the `default` slot of `Bar` (and eventually `Line`/`Area`): `<Bar><ErrorBar dataKey="err" /></Bar>`
- Parent (`Bar`) calls `provideErrorBarContext({ data, xAxisId, yAxisId, dataPointFormatter, errorBarOffset })` so `ErrorBar` can inject data without prop drilling
- `errorBarOffset` is `computed` from the first bar's half-width (horizontal) or half-height (vertical) to center error bars on each data point
- `ErrorBar` auto-detects `direction` from chart layout (`horizontal` → `'y'`, `vertical` → `'x'`) when not explicitly set; returns `null` if `direction='x'` and x-axis is not numeric
- Accepts asymmetric bounds: `dataKey` value can be a `[low, high]` tuple or a single number (symmetric)
- CSS classes: `.v-charts-errorBars` (wrapper `Layer`), `.v-charts-errorBar` (per-point `Layer`)

### Label / LabelList Pattern
- `LabelList` renders a `<Layer class="v-charts-label-list">` containing one `Label` per data point
- Value resolution: if `dataKey` is set, reads from `entry.payload` via `getValueByDataKey`; otherwise calls `valueAccessor(entry, index)` (default: last element of `entry.value` array, or `entry.value` directly)
- `parseViewBox(entry)` is called first and extracted into a local `viewBox` variable; `width` and `height` are then passed explicitly to `Label` alongside the `viewBox` object (needed for correct cartesian label positioning)
- `Label` falls back to `useViewBox()` context when no `viewBox` prop is provided; supports `content` slot for custom rendering; renders via `Text.vue` with class `v-charts-label`; polar radial positions (`insideStart`/`insideEnd`/`end`) are TODO stubs
- `LabelListVueProps` props: `id`, `data`, `valueAccessor`, `clockWise`, `dataKey`, `textBreakAll`, `position`, `offset`, `angle`
- Usage in `Bar` via `label` prop: `<LabelList {...labelProps} data={barData.value} />` rendered after `BarRectangles`; when `label` prop is an object, its keys are spread as props onto `LabelList`; only rendered when `!isAnimating.value && props.label` — suppressed during animation to prevent label flicker
- Usage in `Bar` via slot children: `<Bar><LabelList dataKey="value" position="insideLeft" /></Bar>` — slot-placed `LabelList` receives data via `CartesianLabelListContext` (`[useCartesianLabelListData, provideCartesianLabelListData]` from `@/context/cartesianLabelListContext.ts`); `Bar` provides a computed `labelListData` ref (`{ x, y, width, height, value, payload, parentViewBox }` per bar, `undefined` during animation)
- Usage in `RenderArea`: `<LabelList {...labelProps} data={areaData.value?.points ?? []} dataKey={props.dataKey} />` rendered only when `!isAnimating && props.label`

### SVG Layer Teleport Pattern
`chart/Surface.vue` manages a three-tier SVG layer system for z-ordering. All three `<g>` elements are appended after `<slot />`:
- **Tier 1 — cursor layer** (`<g class="v-charts-cursor-layer">`): tooltip cursor renders here, behind graphical items; context: `CursorLayerContext` (`@/context/cursorLayerContext.ts`)
- **Tier 2 — graphical layer** (`<g class="v-charts-graphical-layer">`): bars and other graphical items `Teleport` here, above cursor; context: `GraphicalLayerContext` (`@/context/graphicalLayerContext.ts`)
- **Tier 3 — label layer** (`<g class="v-charts-label-layer">`): `LabelList` teleports here, topmost; context: `LabelLayerContext` (`@/context/labelLayerContext.ts`)

Each context exports `[useXxxLayerRef, provideXxxLayerRef]` via `createContext<Ref<SVGGElement | null>>`. `chart/Surface.vue` provides all three; `container/Surface.tsx` does NOT (lower-level primitive). Fallback when ref is null: components render inline in document order.

### Vue Reactivity + D3 Integration
- Always call `toRaw(entry)` before passing reactive data entries to D3 scale functions (e.g., in `computeBarRectangles`); Vue Proxy objects cause incorrect behavior with D3 property access
- Pattern: `displayedData.map((rawEntry, index) => { const entry = toRaw(rawEntry); ... })`

### Brush Component Pattern
- `Brush` composes five sub-components: `Background`, `Panorama`, `Slide`, `TravellerLayer` (startX), `TravellerLayer` (endX), and conditional `BrushText`
- `Panorama` sub-component: accepts exactly one VNode child (a chart e.g. `<BarChart>`); uses `cloneVNode` to inject `x`, `y`, `width`, `height`, `margin` (from `padding`), `compact=true`, `data` props into the child; wraps in `<PanoramaContextProvider isPanorama>` so descendants detect panorama mode via `useIsPanorama()`; returns null if child count is not exactly 1
- `useIsPanorama()` composable (`@/context/PanoramaContextProvider`): returns injected `isPanorama` boolean (default: `false`); use to suppress non-panorama UI in compact chart renders
- Panorama slot usage: pass a chart as `Brush`'s default slot child — `<Brush><BarChart><Bar .../></BarChart></Brush>`; `Panorama` clones it with brush dimensions and `compact=true`
- `compact=true` chart rendering: `generateCategoricalChart` compact branch wraps render in `<Fragment>` and renders `ChartDataContextProvider` + `ReportMainChartProps` as siblings before `Surface`, ensuring panorama child charts have access to chart data and layout from Redux
- `Slide` sub-component: renders `<rect class="recharts-brush-slide">` (note: `recharts-` prefix, not `v-charts-`); `fill={stroke}` at `fill-opacity=0.2`, `stroke="none"`, `cursor: move`; geometry computed from `startX`/`endX`: `x = min(startX, endX) + travellerWidth`, `width = max(|endX - startX| - travellerWidth, 0)` (clamped to 0 minimum)
- `useBrushState`: maintains `brushState` ref via `d3 scalePoint` mapping data indices to pixel positions; `watch` with `immediate: true` re-syncs on data/dimension changes; uses 3-way branch: (1) dimension change (`x`/`width`/`travellerWidth` changed) always recalculates `startX`/`endX` from new scale (even during drag, to handle resize); (2) index-only change during active drag (`isSlideMoving || isTravellerMoving || isTravellerFocused`) only updates `scale`/`scaleValues`, not `startX`/`endX`, to preserve drag positions; (3) no interaction, no dimension change: full update of all four fields; tracks previous dimensions via `prevX`/`prevWidth`/`prevTravellerWidth` variables inside the hook closure
- `useBrushHandlers`: attaches global `window` `mouseup`/`touchend`/`mousemove` listeners on drag start; detaches on drag end via `handleDragEnd`; `gap` prop snaps traveller movement to data index intervals; keyboard navigation via `handleTravellerMoveKeyboard` (+1/-1 step)
- `handlerProps` uses `reactive()` with getter properties (e.g., `get x() { return x.value! }`) so event handlers always read current values without stale closure issues
- `BrushText` sub-component: renders start/end data labels via two `<Text value={...} />` calls (pass content as `value` prop, not slot children); `Text` must be imported as default export (`import Text from '...'`), not named export; CSS class `recharts-brush-texts`
- BrushText visibility condition: `isTextActive || isSlideMoving || isTravellerMoving || isTravellerFocused || alwaysShowText`
- `dy` prop offsets: `calculatedY = (y ?? 0) + (dy ?? 0)`; pair with `margin.bottom` on chart to avoid XAxis overlap
- Redux fallbacks: `x`/`y`/`width` use `selectBrushDimensions` when props are undefined; `startIndex`/`endIndex` fall back to `chartData` Redux slice values
- Keyboard support: `TravellerLayer` emits `traveller-move-keyboard` event with `(direction: 1 | -1, id: BrushTravellerId)`; focus/blur update `isTravellerFocused` on `brushState`
<!-- END AUTO-MANAGED -->

<!-- AUTO-MANAGED: git-insights -->
## Git Insights

### Active Development Areas
- **Animation system**: `Animate` component wraps `motion-v`'s `animate()` with a scoped `currentValue = ref(0)` that is updated on every frame; `from`/`to` props are plain numbers (default `0`/`1`); `onUpdate` callback prop called each frame; `onAnimationStart`/`onAnimationEnd` prop callbacks (no Vue `emits`); `isActive` change is tracked via `watch(..., { immediate: true })` — setting `false` stops animation and jumps `currentValue` to `props.to`; `onUnmounted` stops any in-flight animation; `DEFAULT_TRANSITION` (`{ duration: 0.4, ease: 'easeOut' }`) always merged before `props.transition`; render always calls `slots.default(currentValue.value)` (no null-during-animation pattern)
- **Line chart**: Recently added LineChart, ActivePoints, StaticLine
- **Bar component**: Composes BarBackground + BarRectangles directly (RenderBar removed); clipping via useNeedsClip + GraphicalItemClipPath; `activeBar` prop on BarRectangles gates highlight (`false` disables, object merges extra SVG props onto active rect); provides `ErrorBarContext` to child slots; `label` prop (boolean or object) renders `LabelList` after `BarRectangles` — when object, its keys are spread as props onto `LabelList` and `data={barData.value}` is always passed — `LabelList` only renders when `!isAnimating.value && props.label` (labels are suppressed during bar animation); `background` prop accepts `boolean | Record<string, any>` — when an object, its keys are merged into `barRectangleProps` with highest priority inside `BarBackground`, allowing per-bar background SVG prop overrides; `barSize` accepts a number or a string percentage (e.g., `"30%"`) — useful when there is only one data point on a numerical domain where band size cannot be auto-calculated; `minPointSize` accepts a number or a callback `(value: number, index: number) => number` resolved via `minPointSizeCallback` in `utils.ts`; `fill` prop default is `undefined` (no hardcoded fallback color — callers must supply fill explicitly); `shape` **slot** accepts a render function — when provided, `BarRectangles` calls `shapeSlot(barRectangleProps)` in place of the default `<Rectangle>`, passing bar geometry (`x`, `y`, `width`, `height`, `value`, `index`, `dataKey`, etc.) as props; `shapeSlot` is stored on `BarContext` (provided by `useBar(props, slots.shape)`) so `BarRectangles` consumes it from context; custom shape components should use `inheritAttrs: false` and read geometry from `attrs`; slot syntax: `<Bar>{{ shape: (props: any) => <CustomShape {...props} /> }}</Bar>`; `BarRectangleItem` carries `tooltipPosition` (center of bar `{ x: x + width/2, y: y + height/2 }`), `stackedBarStart: number` (pixel coordinate of the stack base value, defaults to 0), and `parentViewBox?: CartesianViewBox` (chart plotting area `{ x: offset.left, y: offset.top, width: offset.width, height: offset.height }` — computed once per `computeBarRectangles` call and set on every item, used by `LabelList` for text wrapping); `Bar` also calls `provideCartesianLabelListData(labelListData)` via `CartesianLabelListContext` — a computed ref that maps `barData` entries to `{ x, y, width, height, value, payload, parentViewBox }` and returns `undefined` when animating, enabling slot-placed `<LabelList>` children to receive data without prop drilling; `isAnimating` is a `Ref<boolean>` owned by `useBar`, shared via `BarContext` (`provideBarContext`/`useBarContext`) — `BarRectangles` sets it `true` on animation start and `false` on `onAnimationEnd` (and in the non-animated render path); animation uses an incrementing `animationId` integer as the `Animate` key — increments on every data change; animation interpolation guard: only interpolates from previous rectangle positions when `prev.stackedBarStart === entry.stackedBarStart` — if the coordinate space changed (e.g., axis scale change), falls back to growing from `stackedBarStart` to avoid stale-coordinate artifacts; `previousRectangles` is updated at `t > 0` so rapid restarts during Brush drag interpolate from the current visual position, producing a smooth "chase" effect; new bars (or bars after coordinate-space change) animate from `stackedBarStart` — horizontal: `y`/`height` from `stackedBarStart`/`0`; vertical: `x`/`width` from `stackedBarStart`/`0`; `Teleport`s bar content into `GraphicalLayerContext` ref so bars render above the cursor layer but below the label layer; falls back to inline rendering when ref is unavailable
- **Rectangle shape**: Renders `<path>` (not `<rect>`); `getRectanglePath()` generates SVG path data with `A r,r,0,0,clockWise,...` arc commands for rounded corners; `clockWise` flag derived from sign of `width * height`; `radius` prop accepts a number (uniform) or `[tl, tr, br, bl]` array (per-corner), each clamped to `maxRadius = min(|width|, |height|) / 2`; returns `null` when any of `x`/`y`/`width`/`height` is non-numeric or zero
- **Tooltip component**: Cursor restricted to `tooltipEventType === 'axis'` only; BarChart cursor is a `Rectangle` band sized via `useTooltipAxisBandSize()`, other charts use a `Curve`; cursor `Teleport`s into `CursorLayerContext` ref so it renders behind graphical items; custom cursor via `cursor` **slot** on `Tooltip` (`<Tooltip>{{ cursor: (props) => ... }}</Tooltip>`) — `slots.cursor` forwarded as `cursorSlot` prop to internal `Cursor` component; plain-object `cursor` prop → `cursorSvgProps` spread onto base cursor props after defaults; `shared` prop now three-state (`true`/`false`/`undefined`); portal rendering via Vue `Teleport`; `TooltipBoundingBox` uses `motion.div` for animated CSS transform transitions; integrates `useTooltipChartSynchronisation`
- **Label/LabelList components**: `components/label/` module with `Label`, `LabelList`, `types`, `utils`; `LabelList` iterates data points and renders `Label` per point; `parseViewBox` result extracted as local variable so `width`/`height` can be passed explicitly to `Label`; used by both `Bar` (`label` prop) and `RenderArea` (post-animation, `label` prop); `LabelList` teleports its `<Layer>` into a `<g class="v-charts-label-layer">` provided by `chart/Surface.vue` via `LabelLayerContext` so labels always render above chart shapes; falls back to inline rendering when ref is unavailable; slot-based `LabelList` children (e.g., `<Bar><LabelList .../></Bar>`) receive data via `CartesianLabelListContext` (`@/context/cartesianLabelListContext.ts`) — `Bar` calls `provideCartesianLabelListData(labelListData)` where `labelListData` is a computed ref mapping `barData` entries to `{ x, y, width, height, value, payload, parentViewBox }`, returning `undefined` when animating; each entry carries `parentViewBox?: CartesianViewBox` (the chart's full plotting area: `{ x: offset.left, y: offset.top, width: offset.width, height: offset.height }`) computed in `computeBarRectangles` from the `ChartOffsetInternal` — used by `LabelList` for text wrapping calculations
- **ErrorBar component**: New `cartesian/error-bar/` module; `ErrorBar` rendered as default slot child of `Bar`; context-based data flow via `provideErrorBarContext`/`useErrorBarContext`; supports symmetric and asymmetric `[low, high]` error bounds; auto-detects direction from chart layout
- **Brush component**: Fully implemented; composes Background, Panorama, Slide, TravellerLayer (x2 for startX/endX), BrushText sub-components; `Panorama` clones single child chart VNode with brush dimensions + `compact=true` and wraps in `PanoramaContextProvider`; `useBrushHandlers` manages all drag/slide/traveller/keyboard interaction with global `window` mouseup/touchend/mousemove listeners attached on drag start and detached on drag end; `useBrushState` uses `d3 scalePoint` (from `victory-vendor/d3-scale`) to map data indices to pixel positions, 3-way watch branch: dimension change always recalculates positions (handles resize even during drag), index-only change during drag only updates scale/scaleValues, otherwise full update; Redux integration: reads `chartData`/`dataStartIndex`/`dataEndIndex` from store, `x`/`y`/`width` fall back to `selectBrushDimensions` selector when not passed as props, dispatches `setDataStartEndIndexes` on change; `dy` prop offsets Y via `calculatedY = y + dy`; `alwaysShowText` forces BrushText visibility; `isTravellerFocused` tracks keyboard focus; guard returns null if dimensions are invalid; CSS class `.v-charts-brush`; calls `useBrushChartSynchronisation()` for cross-chart sync
- **generateCategoricalChart compact mode**: compact branch now wraps in `<Fragment>` and renders `ChartDataContextProvider` + `ReportMainChartProps` as siblings before `Surface`; required for Panorama child charts to receive chart data and layout context from Redux
- **ComposedChart**: New chart container created via `generateCategoricalChart` with axis-only tooltip (`defaultTooltipEventType: 'axis'`, `validateTooltipEventTypes: ['axis']`, `tooltipPayloadSearcher: arrayTooltipSearcher`); exported from `chart/index.ts`; stories under `'examples/ComposedChart'` in `chart/__stories__/AccessibilityLayer.stories.tsx`
- **Storybook ComposedChart**: `AreaChartWithAccessibilityLayer` story demonstrates keyboard accessibility — tab to focus the chart, then use arrow keys to navigate along it; references Recharts issue [#5477](https://github.com/recharts/recharts/issues/5477); uses `isAnimationActive={false}` on `Area` for deterministic rendering; `BoxPlotChart` story (`chart/__stories__/BoxPlot.stories.tsx`, `title: 'examples/ComposedChart'`) demonstrates a box plot built from stacked `Bar`s in `ComposedChart` — uses `Bar` `shape` **slot** with custom `defineComponent` shapes: `<Bar>{{ shape: (props: any) => <HorizonBar {...props} /> }}</Bar>` — `HorizonBar` (renders an `<line>` across the bar width for whisker endpoints), `DotBar` (renders a vertical dashed `<line>` for whiskers), and invisible bars (`fill="none"`) for spacing; `AverageDots` child component reads axis scales via `useAppSelector(selectAxisScale)` and chart data via `selectChartDataWithIndexes`, computes circle positions from scale functions (with `xS.bandwidth()` for band centering), then `Teleport`s the `<g class="v-charts-average-dots">` into `useLabelLayerRef()` for correct z-ordering above bars (falls back to inline if ref is null); custom shape components use `inheritAttrs: false` and read `x`/`y`/`width`/`height` from `attrs`; data structure: each entry has stacked segment fields (`min`, `bottomWhisker`, `bottomBox`, `bar-avg`, `topBox`, `topWhisker`, `bar-max`) and a non-stacked `average` for the dot overlay
- **Storybook BarChart**: Stories cover `StackedAndDynamic` (interactive legend-driven series toggling), `StackedWithErrorBar` (vertical layout, `direction="x"` error bars), `XAxisTickMarginWithBrushDy` (XAxis `tickMargin={30}` + Brush `dy={30}` + `margin.bottom=35`, no Panorama), `StackedWithBrush` (stacked bars with basic Brush integration, no `dy` offset or Panorama), `HasLabelBasedOnSeparateDataKey` (Bar `label` prop with `dataKey` pointing to a derived field, data enriched inside `render`), `NoPadding` (`Bar` `background` as object `{ fill: '#eee' }`, `XAxis scale="point"` with `padding`, fixed `barSize`), `WithMinPointSize` (`Bar` `minPointSize` as a function returning `0` for zero values and `2` otherwise, covering stacked + non-stacked bars with small/zero data), `OneDataPointPercentSize` (`barSize="30%"` string percentage for single-data-point numerical-domain charts; function `dataKey`; explicit `domain` on `XAxis`), `RangedBarChart` (`Bar` `dataKey="temperature"` where each entry's `temperature` is a `[low, high]` tuple from `rangeData`; data cloned in render via `rangeData.map(d => ({ ...d, temperature: [...d.temperature] }))` to avoid Vue proxy invariant errors; `fill="violet"` `stroke="indigo"`), `CustomCursorBarChart` (custom Tooltip cursor via `cursor` slot: `<Tooltip>{{ cursor: (props: any) => <Rectangle {...props} fill="red" fill-opacity={0.6} stroke="#111" /> }}</Tooltip>`; cursor receives position/dimension props from `Cursor` internals; `Rectangle` imported from `@/shape/Rectangle`), and `ChangingDataKey` (interactive story using `ChangingDataKeyWrapper` `defineComponent`; three buttons toggle between two datasets — `data1` uses `x.value` accessor, `data2` uses `y.value` accessor — and a third button hides the bar; function `dataKey` on both `YAxis` and `Bar` switches dynamically via `useData2` ref; `Bar` has `hide={!visible.value}`, `label={{ fill: 'red' }}`, `animationDuration={1000}`; demonstrates live dataset + dataKey switching with animation), `ChangingDataKeyAndStacked` (`ChangingDataKeyAndStackedWrapper` `defineComponent`; two stacked bars with `stackId="1"` — Bar1 switches `dataKey` between `pv`/`uv`, Bar2 between `uv`/`amt` via `useData2` toggle; each bar carries a custom `transition` prop (`duration: 3` and `duration: 1` respectively) and `label={{ fill: 'red' }}`; uses `pageData`; demonstrates stacked bar `dataKey` swapping with different per-bar animation durations), and `ChangingData` (`ChangingDataWrapper` `defineComponent`; `data = ref([{ number: 10 }])`; three buttons — "Change data synchronously" (sets 50), "Change data with setTimeout" (sets 90 then 30 after 150ms), "Reset"; minimal 100×100 chart with hidden `YAxis domain={[0, 100]}` and single `Bar dataKey="number" fill="chocolate" background={{ fill: 'bisque' }}`; demonstrates rapid/async data changes and animation "chase" interpolation behavior), and `VerticalWithLabelLists` (vertical `layout="vertical"` bar chart with `isAnimationActive={false}`; `Bar dataKey="value"` has two `LabelList` slot children: `<LabelList dataKey="value" position="insideLeft" />` and `<LabelList dataKey="label" position="right" />`; demonstrates placing multiple `LabelList` as direct slot children of `Bar` rather than via the `label` prop; uses `verticalLabelListData` with long label strings)
- **Storybook ChartLayout**: `chart/__stories__/ChartLayout.stories.tsx` (`title: 'examples/ChartLayout'`); `WithAbsolutePositionAndFlexboxParents` story reproduces recharts issue #5477 — renders a `BarChart` inside nested flex/absolute-positioned divs (`display: flex, height: 100vh` > `flex: 1` centered > `position: absolute` full-fill); two custom child components: `ChartSizeDimensions` (reads `useChartWidth()`/`useChartHeight()`, renders SVG overlay with red horizontal width-arrow labeled `useChartWidth: Npx` and blue vertical height-arrow labeled `useChartHeight: Npx`, `pointerEvents: none`) and `ShowScale` (reads `useAppSelector(selectContainerScale)`, renders absolute SVG overlay showing `scale: N` at bottom-right corner)
- **Testing**: BarChart test suite covers rendering (bar count, empty data, missing dataKey, single point), props (fill, background, hide, radius number + array), stacked bars (stackId, stacked+unstacked mix), vertical layout, context providers (viewBox, clipPathId, width, height via spy + template render), tooltip interaction (fireEvent.mouseEnter → `.v-charts-tooltip-content`), and CartesianGrid co-rendering

### Commit Convention
- Conventional commits: `feat:`, `fix:`, `refactor:`, `chore:`, `test:`
<!-- END AUTO-MANAGED -->

## Development Workflow

1. Make changes in `packages/vue/src/`
2. Test changes in the playground with `pnpm play`
3. Run tests with `pnpm test`
4. Build with `pnpm --filter vccs build`
5. View Storybook components with `pnpm storybook`

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
