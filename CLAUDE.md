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
├── chart/                  # Chart containers (AreaChart, BarChart, LineChart)
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
4. **Chart Factory**: `generateCategoricalChart()` factory creates chart containers (BarChart, AreaChart, LineChart)
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
  fill: { type: String, default: '#3182bd' },
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

### Testing Patterns
- Use `isAnimationActive={false}` on graphical items in tests for deterministic, synchronous rendering
- Use `mockGetBoundingClientRect({ width, height })` in `beforeEach` to simulate container dimensions
- Test helpers in `@/test/helper`: `getBarRectangles` (`.v-charts-bar-rectangle` nodes), `getBarRects` (inner `<rect>` elements), `expectAreaCurve` (`.v-charts-area-curve` `d` attribute)

### Tooltip Rendering Pattern
- `Tooltip` renders into a portal via Vue `Teleport` (target from `usePortal()` context or `portal` prop); returns `null` until portal is available
- `TooltipBoundingBox` uses `motion.div` directly (not the `Animate` wrapper) for animated CSS `transform` transitions on position changes
- Cursor renders only when `tooltipEventType === 'axis'`; uses `Curve` shape with pointer-events disabled
- `useTooltipChartSynchronisation` wires tooltip state to cross-chart sync

### Storybook Interactive Story Pattern
- Wrap interactive stories in a `defineComponent` + `ref` wrapper when story needs reactive state (e.g., `StackedAndDynamic` uses `ref` for `focusedDataKey` and `locked` driven by Legend `onMouseEnter`/`onMouseLeave`/`onClick` events)
- Use `Bar` `hide` prop for dynamic series toggling; `activeBar` prop (e.g., `{ fill: 'gold' }`) for hover highlight
- `Tooltip` `shared={false}` shows tooltip for individual bar only (not all series at that x position)

### ErrorBar Child Slot Pattern
- `ErrorBar` is placed as a child in the `default` slot of `Bar` (and eventually `Line`/`Area`): `<Bar><ErrorBar dataKey="err" /></Bar>`
- Parent (`Bar`) calls `provideErrorBarContext({ data, xAxisId, yAxisId, dataPointFormatter, errorBarOffset })` so `ErrorBar` can inject data without prop drilling
- `errorBarOffset` is `computed` from the first bar's half-width (horizontal) or half-height (vertical) to center error bars on each data point
- `ErrorBar` auto-detects `direction` from chart layout (`horizontal` → `'y'`, `vertical` → `'x'`) when not explicitly set; returns `null` if `direction='x'` and x-axis is not numeric
- Accepts asymmetric bounds: `dataKey` value can be a `[low, high]` tuple or a single number (symmetric)
- CSS classes: `.v-charts-errorBars` (wrapper `Layer`), `.v-charts-errorBar` (per-point `Layer`)

### Vue Reactivity + D3 Integration
- Always call `toRaw(entry)` before passing reactive data entries to D3 scale functions (e.g., in `computeBarRectangles`); Vue Proxy objects cause incorrect behavior with D3 property access
- Pattern: `displayedData.map((rawEntry, index) => { const entry = toRaw(rawEntry); ... })`
<!-- END AUTO-MANAGED -->

<!-- AUTO-MANAGED: git-insights -->
## Git Insights

### Active Development Areas
- **Animation system**: Animate component, motion-v integration, ClipRect animations
- **Line chart**: Recently added LineChart, ActivePoints, StaticLine
- **Bar component**: Composes BarBackground + BarRectangles directly (RenderBar removed); clipping via useNeedsClip + GraphicalItemClipPath; `activeBar` prop on BarRectangles gates highlight (`false` disables, object merges extra SVG props onto active rect); animation re-triggers on every data change via keyed Animate + linear interpolation of x/y/width/height
- **Rectangle shape**: Rounded corner support via `radius` prop (number or `[tl, tr, br, bl]` array)
- **Tooltip component**: Cursor now restricted to `tooltipEventType === 'axis'` only; portal rendering via Vue `Teleport`; `TooltipBoundingBox` uses `motion.div` for animated CSS transform transitions; integrates `useTooltipChartSynchronisation`
- **ErrorBar component**: New `cartesian/error-bar/` module; `ErrorBar` rendered as default slot child of `Bar`; context-based data flow via `provideErrorBarContext`/`useErrorBarContext`; supports symmetric and asymmetric `[low, high]` error bounds; auto-detects direction from chart layout
- **Bar component**: Now provides `ErrorBarContext` to child slots; `tooltipPosition` added to `BarRectangleItem` (center of bar)
- **Storybook BarChart**: Added `StackedWithErrorBar` story (vertical layout, `direction="x"` error bars); stories now cover Tiny, Simple, Stacked, Mix, PositiveAndNegative, StackedBySign, HasBackground, VerticalBarChart, Biaxial, WithMinPointSize, StackedAndDynamic, StackedWithErrorBar
- **Testing**: BarChart test suite covers rendering, props (fill, background, hide, radius), stacked bars, vertical layout, context providers (viewBox, clipPathId, width, height), and tooltip interaction

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
