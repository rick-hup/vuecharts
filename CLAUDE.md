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

- When porting, refer to React source for behavior parity
- Monorepo: `vccs` (library) + `play` (Nuxt playground) + `docs` (Nuxt docs site), managed by pnpm workspaces
<!-- END AUTO-MANAGED -->

<!-- AUTO-MANAGED: build-commands -->
## Build & Development Commands

```bash
pnpm install              # Install dependencies
pnpm dev                  # Watch mode
pnpm build                # Build library (alias for --filter vccs build)
pnpm test                 # Run tests
pnpm test:coverage        # Tests with coverage
pnpm storybook            # Storybook
pnpm play                 # Playground
pnpm docs                 # Docs site (Nuxt 3, port 3001)
pnpm pub:release          # Publish

# Run specific test
pnpm test packages/vue/src/chart/__tests__/AreaChart.spec.tsx
```

**CI** (`.github/workflows/test.yml`): triggers on PRs to `main`; runs `pnpm install --frozen-lockfile` → `pnpm --filter vccs build` → `pnpm test` on Node 20 / ubuntu-latest.
<!-- END AUTO-MANAGED -->

<!-- AUTO-MANAGED: architecture -->
## Architecture

```
packages/vue/src/           # Main library source (vccs)
├── cartesian/              # Area, Bar, Line, Scatter, Axis, Brush, CartesianGrid, ZAxis; funnel/ subdirectory contains Funnel component
├── polar/                  # Pie, Radar, RadialBar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
├── chart/                  # Chart containers (AreaChart, BarChart, LineChart, ComposedChart, FunnelChart, etc.)
├── components/             # Legend, Tooltip, Text, Label, Cell
├── container/              # ResponsiveContainer, Surface, Layer
├── shape/                  # Rectangle, Symbols, Dot, Sector, Cross, Curve, Trapezoid (all exported from barrel)
├── state/                  # Redux store, slices, middleware, selectors
├── animation/              # Animate component, motion-v utilities
├── context/                # provide/inject context providers
├── hooks/                  # Shared composition hooks
├── storybook/              # Stories
├── types/                  # Shared type definitions
├── utils/                  # Utility functions
└── index.ts                # Public API

docs/                       # Documentation site (Nuxt 3, Docus framework)
├── app/
│   ├── charts/             # Live chart demos; naming: {variant}-{chart-type}-chart.vue; each is a self-contained SFC (<script setup> + <template>); no props/emits; local const data=[...]; root element always <ResponsiveContainer width="100%" :height="300">; color palette: #f97316 orange, #14b8a6 teal, #f59e0b amber, #06b6d4 cyan; negative bars use #f87171; #93c5fd only as Pie fallback fill
│   │   ├── area-charts/    # gradient (SVG <defs><linearGradient> + fill="url(#id)"), legend (multi-series+<Legend> :fill-opacity="0.3" on each Area), simple (:fill-opacity="0.3"), stacked (stack-id="a" solid fill), step (type="step" :fill-opacity="0.3")
│   │   ├── bar-charts/     # horizontal (layout="vertical" + XAxis type="number" + YAxis data-key="name" type="category"), label (<LabelList position="top" :offset="12" :font-size="12"> child slot + BarChart :margin="{top:20}"), negative (<Cell v-for> conditional fill), simple (two Bars side-by-side, no stack-id)
│   │   ├── composed-charts/# simple (<Area :fill-opacity="0.3">+<Bar :bar-size="20">+<Line> on one ComposedChart)
│   │   ├── line-charts/    # simple (type="monotone"), dots (:dot="{ fill, r: 4 }" :active-dot="{ r: 6 }"), dashed (stroke-dasharray per Line), multi (two Lines), step (type="step")
│   │   ├── pie-charts/     # all use cx/cy="50%" + <Cell v-for> + COLORS array; donut (inner-radius+outer-radius), half (start-angle=180 end-angle=0, 5 COLORS adds #ef4444), label (:label="true")
│   │   ├── radar-charts/   # circle-grid (PolarGrid grid-type="circle"), dots (<Radar :dot={r,fillOpacity}>), multiple (two <Radar> series)
│   │   ├── radial-charts/  # label (<RadialBar :background> + <LabelList position="insideStart">), stacked (two <RadialBar stack-id="a" :corner-radius>)
│   │   └── scatter-charts/ # simple (two <Scatter :data> + <ZAxis :range>)
│   ├── components/
│   │   ├── ChartDemo.vue   # Lazy-loaded chart demo card (IntersectionObserver rootMargin 200px); props: name?, description?, src (required); loads component+raw source lazily via import.meta.glob (NOT eager); Shiki syntax highlighting via codeToHtml({ lang: 'vue', themes: { light: 'github-light', dark: 'github-dark' } }); skeleton pulse while loading; ARIA-compliant tab buttons 'Preview'/'Code' (role=tablist/tab/tabpanel, aria-selected, aria-controls); ClientOnly wraps chart component; copy button 'Copy'/'Copied!' (2s, copyTimer cleared onBeforeUnmount); clipboard: navigator.clipboard?.writeText with textarea+execCommand fallback; error state via loadError ref (chart-not-found + load-failed); CSS vars: --ui-border/--ui-bg-elevated/--ui-text/--ui-text-muted; dark mode via :global(.dark) + --shiki-dark-bg/--shiki-dark CSS vars; Shiki line fix: .chart-demo-code :deep(pre code .line) font-size 0.8125rem + line-height 1.5; code block max-height 28rem
│   │   └── DotGrid.vue     # Interactive canvas dot grid background for hero section; props: dotSize (16), gap (32), baseColor, activeColor, proximity (150), speedTrigger (100), shockRadius (250), shockStrength (5), maxSpeed (5000); canvas 2D + RAF loop, DPR-aware; color lerp between baseColor/activeColor by proximity distance; `kickDot()` uses underdamped spring analytical solution — x(t) = e^(-γt)·[x₀·cos(ωd·t) + ((v₀+γ·x₀)/ωd)·sin(ωd·t)] with stiffness=35, damping=2.5, mass=1; smooth re-kick mid-animation by capturing current offset as x₀; dots shoot out and elastically return via pure RAF springTick loop (no motion-v at runtime); onMove throttled 50ms, kicks dots when speed>speedTrigger && dist<proximity; onClick shockwave within shockRadius with distance falloff; ResizeObserver rebuilds grid; SSR-safe (Path2D guard); used in index.vue wrapped in `<ClientOnly>`, dotBaseColor from useColorMode() (dark:#404040, light:#c0c0c0), dotActiveColor #f97316
│   ├── assets/
│   │   └── main.css        # Global CSS: --font-sans system stack, -webkit-font-smoothing/-moz-osx-font-smoothing antialiasing, body font-family; defines chart CSS vars (light: --chart-1..5 = #f97316/#14b8a6/#f59e0b/#06b6d4/#ef4444; dark .dark override: #fb923c/#2dd4bf/#fbbf24/#22d3ee/#f87171); `:focus-visible` keyboard focus ring: `outline: 2px solid var(--chart-1, #f97316)`, `outline-offset: 2px`, `border-radius: 4px` (WCAG 2.4.7); `@media (prefers-reduced-motion: reduce)` disables all animations/transitions/scroll-behavior globally
│   ├── pages/              # index.vue (home) — two full-screen scroll-snap sections (`:global(html) scroll-snap-type: y mandatory`, each section `scroll-snap-align: start`): (1) `.landing-hero` (height: 100vh/100dvh) centered hero: `<DotGrid>` interactive canvas background (`<ClientOnly>`, dotBaseColor via useColorMode dark:#404040/light:#c0c0c0, dotActiveColor #f97316) + two floating glow orbs with `filter:blur(10px)` (`.hero-glow-orange` x:23s/y:19s drift, `.hero-glow-teal` x:17s/y:29s drift — prime-number durations for organic movement, fade in over 1.2s/1.4s); staggered hero content via `containerVariants` (`staggerChildren:0.1, delayChildren:0.15`) + `itemVariants` (hidden: `opacity:0, y:40, blur(4px)` → visible: `opacity:1, y:0, blur(0px)`, spring `stiffness:120 damping:20`); `motion.div` wraps `.landing-hero-inner` with `initial="hidden" animate="visible"`; install snippet `.landing-install` pill (click-to-copy `npm install vccs`, UIcon toggles `i-lucide-copy`↔`i-lucide-check` via `installCopied` ref, copyTimer cleared onBeforeUnmount), title `vccs v0.1`, tagline, CTA buttons (Get Started + GitHub via UButton), feature pills (Vue 3/TypeScript/Composable/Animated), scroll indicator `.landing-scroll` bounces via `motion.div` `animate: { y: [0,8,0] }` repeat Infinity easeInOut, calls `scrollToShowcase()` (`getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' })`); (2) `.showcase` evilcharts-style: left 40% `.showcase-content` z-10 (heading "Explore Charts" + desc + category tabs) + right 55% `.showcase-charts` position:absolute overflow-hidden (left fade gradient + background chart grid + featured card); `ChartEntry` interface: `{ component, title, desc, category, trend, trendUp }`; `allCharts` 28 entries; **2D grid layout**: `categoryLayout` maps each category to `{col, row}` in a 3×2 macro grid (bar:0,0 / area:1,0 / line:2,0 / pie:0,1 / radar:1,1 / radial:2,1); `categoryGroups` computed splits each category's charts into col1 (even indices) + col2 (odd indices), placed on CSS grid via `gridColumn`/`gridRow`; col2 gets `chart-col-offset` (margin-top); `motion.div` spring `{ stiffness:75, damping:25 }` animates BOTH `x` and `y` to `gridOffset` (bar:{x:0,y:-100}, area:{x:-760,y:-100}, line:{x:-1520,y:-100}, pie:{x:0,y:-950}, radar:{x:-760,y:-950}, radial:{x:-1520,y:-950}); category chevron: `<ClientOnly>` wraps `<LayoutGroup>`; active button has `<motion.div layout-id="category-chevron" v-if="activeCategory===cat.key">` for shared layout transition with `<UIcon name="i-lucide-chevron-right" />`; `activeCategory` ref drives grid pan + featured card; `featuredComponent = shallowRef<Component | null>` (no flicker); `onMounted` eagerly loads bar chart; `switchCategory(key)` async — awaits `featuredLoaders[key]?.()`, sets `featuredComponent.value = mod.default` then `activeCategory.value = key`; separate `featuredLoaders` + `featuredMeta` maps (per-category title/desc/trend/trendUp); featured card `.featured-card` 26rem wide, absolutely centered z-10, `::before` frosted glow; `<AnimatePresence mode="wait">` wraps `motion.div` keyed by `activeCategory` with `initial/animate/exit: { opacity, scale:0.95→1→0.95 }` `{ duration:0.3, ease:'easeOut' }`; `asyncChart()`: `defineAsyncComponent({ loader, loadingComponent:ChartLoading, delay:0, errorComponent:ChartError, timeout:10000 })` (ChartError renders null; ChartLoading renders 300px-tall div); `copyInstall()` clipboard with textarea+execCommand fallback; trend badges `.trend-up`/`.trend-down`; responsive: stacks at 768px; uses `useSeoMeta` + UButton/UIcon (Nuxt UI)
│   └── app.config.ts       # Docus config (name/url/socials) + UI colors (primary: zinc, neutral: zinc)
├── content/                # Markdown content (1.getting-started/, 2.charts/, 3.components/, index.md)
└── nuxt.config.ts          # Minimal Nuxt 3 config (global components); Docus provides the rest

playground/nuxt/            # Nuxt 3 playground for manual testing
├── app/components/
│   ├── area-charts/        # Area chart SFCs
│   ├── bar-charts/         # Bar chart SFCs
│   ├── line-charts/        # Line chart SFCs
│   ├── radar-charts/       # Radar chart SFCs
│   ├── radial-charts/      # RadialBar chart SFCs
│   ├── tooltip-charts/     # Tooltip demo SFCs
│   ├── test-charts/        # Visual verification SFCs mirroring unit test cases (e.g. TestXAxisTickLabels)
│   └── ui/chart/           # ChartContainer, ChartTooltipContent, ChartLegendContent, types.ts
├── app/pages/
│   └── test.vue            # /test route — grid of test-charts/ components for visual verification
└── nuxt.config.ts          # Nuxt 3, Tailwind v4, shadcn-nuxt, @nuxtjs/color-mode
```

**Playground stack**: Nuxt 3, Tailwind CSS v4, shadcn-nuxt, lucide-vue-next, vccs (`workspace:*`).
- `ChartContainer`: accepts `ChartConfig` prop, provides `--color-{key}` CSS vars + `chart-config` inject
- `ChartTooltipContent`: props `indicator` (`dot`|`line`|`dashed`), `hideLabel`, `hideIndicator`, `labelKey`, `nameKey`, `labelFormatter`
- Tailwind v4 parenthesis syntax: `border-(--color-border) bg-(--color-bg)` (NOT v3 `border-[--color-border]`)
- Tooltip slot pattern: `<Tooltip><template #content="tooltipProps"><ChartTooltipContent v-bind="tooltipProps" /></template></Tooltip>`
- Legend slot pattern: `<Legend #content="legendProps"><ChartLegendContent v-bind="legendProps" /></Legend>`
- Label-inside-PolarRadiusAxis: `<PolarRadiusAxis :tick="false" :tick-line="false" :axis-line="false"><Label><template #content="{ viewBox }">...</template></Label></PolarRadiusAxis>` — `viewBox` provides `{ cx, cy }` via `POLAR_LABEL_VIEW_BOX_KEY`

**Docs site stack**: Nuxt 3, Docus framework, Shiki (syntax highlighting), vccs (`workspace:*`).
- Docus configured via `app/app.config.ts` (`docus` key + `ui.colors`: primary zinc, neutral zinc)
- Content uses MDC `::chart-demo{src="..."}::` to embed live demos (rendered by `components/ChartDemo.vue` — lazy-loaded)
- `nuxt.config.ts` is minimal — loads `assets/main.css` globally, registers global components; Docus handles layouts, nav, theming
- **Chart demo color palette** (warm family, hardcoded): `#f97316` orange, `#14b8a6` teal, `#f59e0b` amber, `#06b6d4` cyan

### Key Decisions

1. **Components**: `defineComponent` + JSX (not SFC)
2. **State**: Redux Toolkit via `@reduxjs/vue-redux` — one store per chart (`createRechartsStore`)
3. **Context**: `provide/inject` for parent-child communication
4. **Chart Factory**: `generateCategoricalChart()` creates chart containers
5. **Animation**: `motion-v` with `Animate` wrapper
6. **Events**: Redux middleware — mouse events use `createListenerMiddleware` (chartPointer captured synchronously in `RechartsWrapper` before dispatch); external/keyboard/touch use plain synchronous `Middleware`
7. **Build output**: ESM-only (`dist/es/*.mjs`, `preserveModules: true`); no CJS output; all `dependencies` + `peerDependencies` auto-externalized via `externalDeps` array in `vite.config.ts`
<!-- END AUTO-MANAGED -->

<!-- AUTO-MANAGED: conventions -->
## Code Conventions

### Naming
- Components: PascalCase; Directories: kebab-case; Hooks: `use` prefix; Types: `Props` suffix
- Type files: `type.ts`; Tests: `__tests__/*.spec.tsx`; Stories: `__stories__/*.stories.tsx`
- Exception: `animation/__tests__/Animate.test.tsx` uses `.test.tsx` (not `.spec.tsx`)

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

**Volar slot type preservation** (for components with slots in compiled `.d.ts`): wrap with the `new () => { $slots }` pattern so Volar picks up slot types from package consumers:
```typescript
const _Component = defineComponent<PropsWithSVG>({ /* ... */ })
export const Component = _Component as typeof _Component & {
  new (): { $slots: ComponentSlots }
}
```
Currently used by: `Area` (exports `AreaSlots`).

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
- Mouse event middleware (`mouseEventsMiddleware`) uses `createListenerMiddleware`; to avoid `e.currentTarget` being null in the deferred microtask, `RechartsWrapper` captures `getChartPointer(e)` synchronously *before* dispatching `mouseMoveAction`/`mouseClickAction`; both `mouseClickMiddleware` and `mouseMoveMiddleware` check `selectTooltipEventType` and only handle `'axis'`-type interactions — item-level click events are handled by graphical items directly
- External event handlers (`externalEventsMiddleware`) and keyboard/touch middleware remain plain synchronous `Middleware`
- `ReportChartProps` (internal): syncs chart-level props (barCategoryGap, barGap, barSize, stackOffset, syncId, syncMethod, etc.) into Redux store via `watchEffect`; rendered internally by `generateCategoricalChart`

### SVG Layers (Teleport)
Three-tier z-ordering: cursor → graphical → label (via `Surface.vue`). `Area`, `Line`, `Radar` use `<Teleport to={graphicalLayerRef.value}>` via `useGraphicalLayerRef(null)`.

### Animation Chase Pattern
All animated components (Bar, Line, Scatter, Radar, RadialBar) use: `previousData` + incrementing `animationId` as `Animate` key; previous state updated at `t > 0` so rapid changes interpolate from current visual position.

`Animate` respects `prefers-reduced-motion`: uses `usePreferredReducedMotion()` from `@vueuse/core`; when `reducedMotion === 'reduce'` and `isActive=true`, animation is skipped — fires `onAnimationStart`, snaps `currentValue` to `props.to`, fires `onAnimationEnd`. Watch target is `[() => props.isActive, reducedMotion]`.

### Area Animation (Different from Chase Pattern)
`Area` does NOT use `Animate` wrapper. It has two distinct mechanisms:
1. **Initial entrance** (`ClipRect` animation): `isClipRectAnimating` ref + clip-path `#animationClipPath-${clipPathId}` — `ClipRect` component handles the reveal sweep
2. **Subsequent data changes** (`StaticArea`): direct `motion-v` `animate(0, 1, {...})` call in `watch(points)` with manual x/y lerp of `currentPoints`/`currentBaseLine`; skips interpolation while `isClipRectAnimating` is true
- Context shared via `provideAreaContext`/`useAreaContext` (InjectionKey `AreaContextKey`); sub-components `StaticArea` and `Dots` consume via `useAreaContext()`

### Vue + D3
- Always `toRaw(entry)` before passing to D3 scale functions (Vue Proxy breaks D3)

### Slots (not VNode props)
Customization uses **named slots**: `shape`, `activeBar`, `dot`, `activeDot`, `label`, `content`, `cursor`, `tick`, `horizontal`, `vertical`. Example: `<Bar>{{ shape: (props) => <Custom {...props} /> }}</Bar>`.
- `Area` slots: `#dot` (`AreaDotSlotProps`), `#activeDot` — `slots.dot` passed directly to `useArea(props, attrs, slots.dot)` hook

**Bar slot priority** (`BarRectangles`): (1) `isActive && #activeBar` → (2) `#shape` → (3) default `<Rectangle>`. Rectangle props merge (low→high): `baseProps` → `entry.payload?.fill` → `entry` → `cellPropsForIndex` → `activeBarProps`. Each bar rectangle wrapped in `<Layer class="v-charts-bar-rectangle">` (use this selector to query individual bars in tests).

### Legend Accessibility
- Legend items: `tabindex={0}`, `role="button"`, `aria-label="Toggle {name} series"`, keyboard handler fires `handleClick` on Enter/Space
- LegendSymbol `<Surface>` SVG: `aria-label="{name} legend icon"`
- `Legend` exported as `default` (not named); cast to `DefineSetupFnComponent<LegendPropsWithSVG, {}, SlotsType<LegendSlots>>` for correct slot type inference

### Cell Component
- Marker component rendering nothing — parents read Cell VNode children and apply props by index
- `Bar` integration: `extractCellProps(slots.default?.())` collects per-index props; `cellProps` applied at highest priority (below `activeBarProps`)
- Usage: `<Bar dataKey="value"><Cell v-for="(entry, i) in data" :key="i" :fill="COLORS[i]" /></Bar>`

### LabelList
- Place as **child slot** inside series component (Bar, Line, RadialBar): `<Bar><LabelList position="top" /></Bar>`
- Data flows via `provideCartesianLabelListData` context
- Teleports to label SVG layer when available
- Supports `#label` slot for fully custom label rendering: `slots.label({ ...props, ...viewBox, value, index, key })`
- `entryFill` priority: explicit attrs/props > `entry.fill` (entry fill only used when no `fill` prop/attr present)

### Tooltip
- **`#content` slot** (preferred): `<Tooltip><template #content="{ active, payload, label }">...</template></Tooltip>`
- **`#cursor` slot**: `<Tooltip><template #cursor="props">...</template></Tooltip>` — receives shape-specific props (cross for ScatterChart, rect for BarChart, sector for radial, curve for others); slot prop type is `(props: Record<string, any>) => VNode`
- **IMPORTANT**: use destructured props, NOT `v-bind="tooltipProps"` — `@antfu/eslint-config` auto-fix strips `v-bind` spread on slot props
- **Docs demos standard**: always add `:cursor="false"` to `<Tooltip>`; pass `ChartTooltipContent` with explicit `:active="active" :payload="payload" :label="label"` (NOT `v-bind` spread)
- Key props: `defaultIndex`, `trigger="click"`, `shared={false}`, `cursor={false}`
- `DefaultTooltipContent` `itemSorter` prop accepts function OR string literals: `'dataKey' | 'value' | 'name'`
- `TooltipIndex` type is `string | null` (null = no active index; NOT a number)
- **TooltipBoundingBox animation**: uses imperative `animate(element, { transform }, options)` from motion-v via `watchPostEffect`; `animationControls` stopped before guard and via `onCleanup` (handles unmount + re-trigger); respects `usePreferredReducedMotion()` — snaps to final value when `'reduce'`; `currentTransform` is a `computed()` so position updates reactively trigger the effect; `transition` prop (type: `AnimationOptions`) customizes easing/duration (default: `{ duration: 0.4, ease: 'easeOut' }`)
- **TooltipBoundingBox accessibility**: rendered as `<div role="tooltip" aria-live="polite">` (NOT `motion.div`)

### Tooltip Payload Selection
- `tooltipEventType='axis'`: returns all items at hovered index
- `tooltipEventType='item'`: filters by `filterByDataKey`; special cases for sync and defaultIndex

### Polar Components
- **PolarAngleAxis**: slot `#tick` with `{ x, y, value, textAnchor }` for custom tick labels; full-circle dedup removes last tick at 360°=0°
- **PolarRadiusAxis**: `type='auto'` resolves by layout (radial→category, centric→number); default `domain` is `[0, 'auto']`; provides `POLAR_LABEL_VIEW_BOX_KEY` for child `<Label>` to access `{ cx, cy }`; uses `watchEffect` for dispatch; renders slot children even when `tick=false` and `axisLine=false` (needed for `<Label>` child pattern)
- **PolarGrid**: `gridType` (`polygon`|`circle`), `radialLines` (default `true`), `polarRadius` (number[] override)

### Pie
- Chain-sweep animation: all slices sweep as one continuous arc
- `activeIndex`: controlled (`!== -1`) vs uncontrolled; slot `#shape` for custom sectors

### RadialBar
- Two layout modes: `centric` (radius numeric) and `radial` (angle numeric)
- Does NOT use `useSetupGraphicalItem` — registers via `SetPolarGraphicalItem` directly
- `cornerRadius`/`forceCornerRadius`/`cornerIsExternal` forwarded to background sectors

### Funnel
- `FunnelChart`: created via `generateCategoricalChart({ defaultTooltipEventType: 'item', validateTooltipEventTypes: ['item'], tooltipPayloadSearcher: arrayTooltipSearcher })`
- `Funnel` is a polar-style graphical item: registers via `SetPolarGraphicalItem` with `type: 'funnel'`; does NOT use `useSetupGraphicalItem`
- Layout computed by `selectFunnelTrapezoids` selector; renders `<Trapezoid>` per data item inside `<Layer class="v-charts-funnel">`
- Animation: `<Animate from={0} to={1} transition={{ duration: 1.5 }}>` — interpolates `height` and `lowerWidth` per trapezoid
- `Cell` children supported via `extractCellProps(slots.default?.())` for per-item `fill`/`stroke` overrides
- `#shape` slot receives `FunnelTrapezoidItem` props for fully custom trapezoid rendering
- Key props: `dataKey` (required), `nameKey` (default `'name'`), `lastShapeType` (`'triangle'|'rectangle'`, default `'triangle'`), `reversed` (default `false`), `fill` (default `'#808080'`), `width`
- `FunnelTrapezoidItem`: extends `TrapezoidProps` + `{ value, payload, isActive, tooltipPosition, parentViewBox, labelViewBox }`
- `Trapezoid` shape (`shape/Trapezoid.tsx`): renders `<path class="v-charts-trapezoid">` from `getTrapezoidPath(x, y, upperWidth, lowerWidth, height)` (M top-left L top-right L bottom-right L bottom-left Z); returns null for zero height or NaN dims; passes SVG attrs through

### YAxis / XAxis Internal Architecture
- Both split into three tiers: `{X|Y}AxisImpl` (reads Redux state, renders `<CartesianAxis>`) + `{X|Y}AxisSettingsDispatcher` (dispatches `add{X|Y}Axis`/`remove{X|Y}Axis` via `watchEffect`) + public `{X|Y}Axis`
- `{X|Y}AxisImpl` returns `null` when `axisSize` or `position` is not yet available from the store
- Default `interval` is `'preserveEnd'` (applied in the Dispatcher, not in the public props)
- **XAxisImpl** supports `#tick` slot forwarded through XAxisSettingsDispatcher; **YAxisImpl** does NOT support `#tick` slot
- `XAxisSettingsDispatcher` also defaults: `includeHidden=false`, `angle=0`, `minTickGap=5`, `tick=true`

### CartesianGrid
- Custom line rendering via `#horizontal`/`#vertical` slots (Function type removed from props)
- `renderLineItem(slot, option, props)` — slot is first argument
- Rendering layers: Background → HorizontalStripes → VerticalStripes → HorizontalGridLines → VerticalGridLines
- `horizontalPoints` and `verticalPoints` are declared Vue props (not attrs); must be declared to be picked up by `propsIncludingDefaults`

### ErrorBar
- Place as child of `<Scatter>` or `<Bar>`; consumes `ErrorBarContext` from parent
- Self-registers into parent's `ErrorBarRegistry` for axis domain extension

### Brush
- Prop defaults: `height=40`, `travellerWidth=5`, `gap=1`, `fill='#fff'`, `stroke='#666'`, `padding={top:1,right:1,bottom:1,left:1}`, `leaveTimeOut=1000`, `alwaysShowText=false`
- `BrushTravellerId`: `'startX' | 'endX'`
- `onChange` / `onDragEnd` both receive `BrushStartEndIndex` (re-exported from `chartDataSlice`)
- Internal `BrushState`: `isTravellerMoving`, `isTravellerFocused`, `isSlideMoving`, `startX`, `endX`, `slideMoveStartX`, `movingTravellerId`, `isTextActive`, `brushMoveStartX`, `scale`, `scaleValues`

### TooltipSlice State Shape
- `TooltipState`: `{ itemInteraction: {click, hover}, axisInteraction: {click, hover}, keyboardInteraction, syncInteraction, tooltipItemPayloads, settings }`
- Each interaction field is a `TooltipInteractionState`: `{ active: boolean, index: TooltipIndex, dataKey, coordinate }` — `active` is separate from `index` so `active=true` prop keeps tooltip visible after mouse-leave without clearing last position
- `itemInteraction` (click/hover) vs `axisInteraction` (click/hover): independent; `mouseLeaveItem` only clears `itemInteraction.hover.active`; `mouseLeaveChart` clears both hover flags
- `syncInteraction` extends `TooltipInteractionState` with `label: string | undefined`
- `TooltipSettingsState`: `{ shared, trigger, axisId, active: boolean|undefined, defaultIndex: TooltipIndex|undefined }`
- `TooltipPayloadConfiguration`: `{ settings: TooltipEntrySettings, dataDefinedOnItem: unknown, positions: Record<...> | ReadonlyArray<Coordinate> | undefined }`
- Actions: `setActiveMouseOverItemIndex`, `mouseLeaveItem`, `mouseLeaveChart`, `setActiveClickItemIndex`, `setMouseOverAxisIndex`, `setMouseClickAxisIndex`, `setSyncInteraction`, `setKeyboardInteraction`, `addTooltipEntrySettings`, `removeTooltipEntrySettings`, `setTooltipSettingsState`

### ReferenceArea / ReferenceLine
- Both register via `addArea`/`addLine` (referenceElementsSlice) on `onMounted`/`onUnmounted`
- **ReferenceArea**: supports `radius` prop for rounded corners (passed to `<Rectangle>`); `ifOverflow` defaults to `'discard'`
- **ReferenceLine**: `scaleCoord()` adds `bandwidth/2` to center on band-scale categories; respects `yAxisSettings.orientation` (left/right) and `xAxisSettings.orientation` to order line endpoint coordinates

### Testing
- `isAnimationActive={false}` for deterministic rendering
- `mockGetBoundingClientRect({ width, height })` in `beforeEach`
- Helpers: `@/test/helper` (`getBarRectangles`, `expectAreaCurve`, etc.)
- Tests written as render functions (arrow function JSX, not SFC): `render(() => <Component />)`
- Public API imports from `@/index`; internal component imports use direct paths (e.g. `@/chart/RadarChart`)
- Layout context assertions: `defineComponent` + `useViewBox()`, `useChartWidth()`, `useChartHeight()`, `useClipPathId()` from `@/context/chartLayoutContext` / `@/chart/provideClipPathId`
- CSS class selectors by component: `.v-charts-cross`, `.v-charts-dot`, `.v-charts-symbols`, `.v-charts-line`/`.v-charts-line-curve`/`.v-charts-line-dots`/`.v-charts-line-dot`, `.v-charts-area`/`.v-charts-area-area`/`.v-charts-area-curve`/`.v-charts-area-dots`/`.v-charts-area-dot`, `.v-charts-radar-polygon path`/`.v-charts-radar-dots`, `.v-charts-scatter`/`.v-charts-scatter-symbol`/`.v-charts-scatter-line`, `.v-charts-sector`, `.v-charts-polar-grid`/`.v-charts-polar-angle-axis`/`.v-charts-polar-angle-axis-tick`/`.v-charts-polar-radius-axis`, `.v-charts-xAxis`/`.v-charts-yAxis`; axis sub-elements: `.v-charts-cartesian-axis-tick`/`.v-charts-cartesian-axis-tick-line`/`.v-charts-cartesian-axis-line`, `.v-charts-brush`, `.v-charts-reference-area`/`.v-charts-reference-line`, `.v-charts-label`, `.v-charts-legend-wrapper`/`.v-charts-legend-item`/`.v-charts-legend-item-text`, `.v-charts-text`; bar: `.v-charts-bar-rectangle` (each individual bar's `<Layer>` wrapper); funnel: `.v-charts-funnel` (Funnel Layer wrapper), `.v-charts-trapezoid` (each individual trapezoid `<path>`); tooltip: `.v-charts-tooltip-wrapper` (hidden via `style.visibility='hidden'` when inactive), `.v-charts-tooltip-content`, `.v-charts-tooltip-item`, `.v-charts-tooltip-item-name`, `.v-charts-tooltip-item-value`, `.v-charts-tooltip-label`; **ResponsiveContainer** uses `vcharts-` prefix (not `v-charts-`): `.vcharts-responsive-container`
- Line test helpers: `getLineCurves(container)` = `container.querySelectorAll('.v-charts-line .v-charts-line-curve')`; dots: `dot={true}` renders `.v-charts-line-dots` wrapper + `.v-charts-line-dot` per data point; single data point renders dot but no curve
- Line curve type detection via path `d` attribute: monotone → contains `'C'` (cubic bezier); step/linear → no `'C'`, contains `'L'`; connectNulls=false → 2 `'M'` commands in `d`; connectNulls=true → 1 `'M'` command
- Line `#activeDot` slot: dot only appears after `fireEvent(chart, new MouseEvent('mousemove', {...}))` (no extra `nextTick` needed unlike Tooltip defaultIndex)
- Bar radius testing: `radius={5}` or `radius={[10,10,0,0]}` produces arc commands `'A '` in path `d` attribute; background bars queried via `path[fill="#eee"]`
- ResizeObserver testing: use `MockResizeObserver` with static `instances` array + `trigger(width, height)` method; `vi.stubGlobal('ResizeObserver', MockResizeObserver)` in `beforeEach`; reset `MockResizeObserver.instances = []` each test
- Selector tests in `state/selectors/__tests__/`: render real charts with `isAnimationActive={false}` and assert DOM output; covers axisSelectors, barSelectors, legendSelectors, lineSelectors, radarSelectors, tooltipSelectors
- Selector test helpers: `getBarDimensions(rect)` reads `x`/`y`/`width`/`height` from bar `<path>` element attributes directly; `getCurveYCoords(container, index)` / `getCurveXCoords` parse `.v-charts-line-curve` path `d`; `parseCurvePoints(d)` / `extractPathPoints(d)` share regex `/[ML]\s*([\d.eE+-]+)[,\s]+([\d.eE+-]+)/g`
- Tooltip selector integration tests: hover via `fireEvent(chart, new MouseEvent('mousemove', { clientX, clientY }))` on `.v-charts-wrapper` + 2x `nextTick()`; `defaultIndex` requires 3x `nextTick()` to activate
- SVG path parsing in tests: `extractPathPoints(d)` matches `/[ML]\s*([\d.eE+-]+)[,\s]+([\d.eE+-]+)/g` to extract polygon vertices from `d` attribute
- YAxis tests (`cartesian/axis/__tests__/YAxis.spec.tsx`): tick rendering requires 2x `await nextTick()`; orientation verified via `transform` translate-X (left < 100, right > 200)
- Animation testing (`Animate`): `motion-v`'s `animate()` uses RAF — value stays at `from` in JSDOM when `isActive=true`; when `isActive=false`, value snaps to `to` after `nextTick()`; default slot is a render function `(value: number) => JSX`; `onAnimationStart` is called synchronously before `animate()` runs; when `usePreferredReducedMotion()` returns `'reduce'` and `isActive=true`, animation is skipped — `onAnimationStart`/`onAnimationEnd` fire and value snaps to `props.to` immediately
- Test suite phases: shapes, chart containers, cartesian items, polar items, components, state/selectors/utils; progress tracked in `tasks/todo.md`

### Scatter
- Each `<Scatter>` receives its own `:data` array (not on the chart container, unlike Bar/Line/Area)
- `ZAxis` (exported from `vccs`) maps a third data dimension to dot size: `<ZAxis data-key="z" :range="[60, 400]" />`
- `XAxis`/`YAxis` require `type="number"` for numeric scatter data
- `shape` prop accepts: `circle`, `cross`, `diamond`, `square`, `star`, `triangle`, `wye`
- `line={true}` connects dots with a line
- Uses `useSetupGraphicalItem` with `{ skipTooltip: true }` — tooltip handled via `SetTooltipEntrySettings` with per-point `tooltipPayload` arrays as `dataDefinedOnItem`
- Supports `<ErrorBar>` children via `createErrorBarRegistry`/`provideErrorBarRegistry`

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
| `motion-v` | SVG animations (external peer dep — not bundled; externalized in vite.config.ts) |
| `victory-vendor` | D3 math/scale utilities |
| `lodash-es` / `es-toolkit` | Utility functions |
| `@vueuse/core` | Vue composition utilities |

<!-- MANUAL -->
## Custom Notes

Add project-specific notes here. This section is never auto-modified.

<!-- END MANUAL -->
