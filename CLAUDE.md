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
Used by both `Bar` and `Scatter`: `previousData` + incrementing `animationId` as `Animate` key; `previousData` updated at `t > 0` so rapid data changes interpolate from current visual position (not stale target); new items animate from zero

### Vue Reactivity + D3 Integration
- Always call `toRaw(entry)` before passing reactive data to D3 scale functions; Vue Proxy objects cause incorrect D3 behavior

### Key Component Gotchas
- `XAxis.dataKey`/`YAxis.dataKey` default to `undefined` (not `''`); `YAxis.unit` defaults to `undefined`
- `selectHasBar(state)` uses `cartesianItems.some(item => item.type === 'bar')` (not `countOfBars`)
- `Rectangle` renders `<path>` (not `<rect>`) with `getRectanglePath()` for rounded corner support
- `Symbols` is a functional component (not `defineComponent`); renders D3-based `<path>` with class `.v-charts-symbols`
- `Bar` `fill` defaults to `undefined` — callers must supply fill explicitly
- `Bar` `shape` uses **named slot** (not prop): `<Bar>{{ shape: (props) => <Custom {...props} /> }}</Bar>`
- `ErrorBar` as child slot of `Bar`: data via `provideErrorBarContext`/`useErrorBarContext`; supports `[low, high]` tuples
- `LabelList` suppressed during animation (`!isAnimating`); slot-based children receive data via `CartesianLabelListContext`
- `Tooltip` cursor only renders when `tooltipEventType === 'axis'`; custom cursor via `cursor` **slot**
- `Brush` `Panorama` uses `cloneVNode` + `compact=true`; `useIsPanorama()` for detection; `BrushText` uses `<Text value={...} />` (value prop, not children)
- `Scatter` `isAnimationActive` defaults to `true`; `transition` prop for custom `AnimationOptions`
- `ZAxis` is data-only (renders `null`); pairs with `Scatter` for symbol sizing

### Storybook Patterns
- Wrap interactive stories in `defineComponent` + `ref` for reactive state
- When story args contain arrays, construct derived data inside `render` to avoid Vue proxy invariant errors
- Clone array data in render (`data.map(d => ({ ...d, arr: [...d.arr] }))`) for the same reason
<!-- END AUTO-MANAGED -->

<!-- AUTO-MANAGED: git-insights -->
## Git Insights

### Commit Convention
- Conventional commits: `feat:`, `fix:`, `refactor:`, `chore:`, `test:`

### Active Development Areas
- Scatter animation (current branch `feat/zaxis-scatter`)
- Bar component (shape slot, ErrorBar, LabelList, animation)
- Brush component (Panorama, drag handling, keyboard support)
- Tooltip (cursor rendering, custom cursor slot, chart synchronization)
- ComposedChart + BoxPlot story (Scatter + ZAxis integration)
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
