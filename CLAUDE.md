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
├── cartesian/              # Area, Bar, Line, Scatter, Axis, Brush, CartesianGrid, etc.
├── polar/                  # Pie, Radar, RadialBar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
├── chart/                  # Chart containers (AreaChart, BarChart, LineChart, ComposedChart, etc.)
├── components/             # Legend, Tooltip, Text, Label, Cell; index.ts exports: Cell, label, legend, Tooltip
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

docs/                       # Documentation site (Nuxt 3, standalone)
├── app/
│   ├── charts/             # Live chart demos (area-charts/, bar-charts/, line-charts/*.vue) — use ChartContainer
│   ├── components/
│   │   ├── content/        # ProseCode (code block + copy, filename/language header), CodeGroup (Tabs for multi-file blocks), ChartDemo (Card+Tabs: preview/code, loads chart via import.meta.glob('~/charts/**/*.vue') matched by src), Callout (info/warning/danger/tip), PropsTable (placeholder)
│   │   └── docs/           # ChartContainer, DocsHeader, DocsSearch, DocsSidebar, DocsPagination, DocsToc
│   ├── composables/        # useLocale (English-only; returns msg, collectionName), useSearch (Cmd+K dialog state), useToc (TOC activeId via IntersectionObserver)
│   ├── layouts/            # default.vue (minimal), docs.vue (SidebarProvider, DocsSidebar, DocsHeader; main content max-w-4xl)
│   └── pages/              # index.vue (home: hero + animated 3-column 9-chart showcase, category selector Bar/Area/Line), docs/[...slug].vue (catch-all, ContentRenderer)
├── content/                # Nuxt Content markdown (en/ with _dir.yml)
│   └── en/docs/            # content_en (include: en/**, prefix: /docs)
│       ├── 1.getting-started/   # 1.introduction.md, 2.installation.md; _dir.yml (title, icon)
│       └── 2.charts/           # Chart docs; _dir.yml
├── content.config.ts       # defineContentConfig: content_en only (en/docs/**, prefix /docs); schema: z.object({ icon: z.string().optional() })
└── nuxt.config.ts          # Nuxt 3 (compatibilityVersion 4), @nuxt/content, Tailwind v4 (@tailwindcss/vite), shadcn-nuxt, @nuxtjs/color-mode (classSuffix: ''), @nuxt/fonts (Doto/JetBrains Mono/Instrument Sans via Google)

playground/nuxt/            # Nuxt 3 playground for manual testing of vccs
├── app/
│   ├── components/
│   │   ├── bar-charts/     # 10 Bar chart SFCs (auto-imported as BarChartsBarChart*): BarChartBasic, BarChartHorizontal, BarChartMultiple, BarChartStacked, BarChartLabel, BarChartCustomLabel, BarChartMixed, BarChartActive, BarChartNegative, BarChartInteractive
│   │   └── ui/chart/       # ChartContainer.vue (config-driven: accepts ChartConfig, provides --color-{key} CSS vars + inject context), ChartTooltipContent.vue, ChartLegendContent.vue, types.ts (ChartConfig/ChartConfigItem), index.ts
│   ├── layouts/
│   │   └── default.vue     # Persistent layout: sticky header (BarChart3 icon + "vccs playground" logo, nav links /bar-charts + /area with active bg-accent state, dark mode toggle Moon/Sun via useColorMode()), main <slot />
│   ├── app.vue             # Root: <NuxtLayout> wrapping <NuxtRouteAnnouncer /> + <NuxtPage />
│   └── pages/              # index.vue (card-grid with shadcn Card/CardHeader/CardTitle/CardDescription/CardFooter + ArrowRight "View demos" link; routes array: bar-charts 10 demos, area 1 demo), bar-charts.vue (10 variants: BarChartInteractive spans full md:col-span-2 lg:col-span-3, 9 others in responsive grid), area.vue (stacked interactive AreaChart with time-range select 90d/30d/7d + linearGradient fills + Legend+ChartLegendContent)
└── nuxt.config.ts          # compatibilityVersion 4, compatibilityDate '2025-07-15', Tailwind v4 (@tailwindcss/vite), shadcn-nuxt (prefix: '', componentDir: ./app/components/ui), @nuxtjs/color-mode (classSuffix: '')
```

**Playground stack**: Nuxt 3, Tailwind CSS v4, shadcn-nuxt, lucide-vue-next, vccs (`workspace:*`). `playground/nuxt/app/assets/css/tailwind.css`: @import tailwindcss + tw-animate-css, `@custom-variant dark (&:is(.dark *))`, @theme inline (shadcn color vars + chart-1..5 + sidebar variants), `:root`/`.dark` oklch color tokens, `@utility container` (responsive padding-inline), `@layer base` (`*` border-border outline-ring/50, body bg-background text-foreground). No font utilities, no `.prose`, no `.no-scroll-bar`, no callout vars, no Shiki theme vars — those are docs-site only. `ChartContainer` accepts `config: ChartConfig` prop, provides `--color-{key}` CSS vars from config entries, injects config via `provide('chart-config')`, and wraps `<ResponsiveContainer>` with vccs SVG theme CSS selectors. `ChartConfig = Record<string, { label?, icon?, color?, theme? }>`. `ChartTooltipContent` and `ChartLegendContent` inject `chart-config` to resolve label/color per payload item. **`ChartTooltipContent` props**: `active`, `payload: ReadonlyArray<...>`, `label`, `labelFormatter: (value, payload: ReadonlyArray<...>) => string`, `nameKey`, `indicator` (`'dot'`(default)|`'line'`|`'dashed'`), `hideLabel`, `hideIndicator`, `labelKey`, `className`. **`getPayloadConfig(item)` resolution order**: (1) `cfg[nameKey]` or `cfg[payload[nameKey]]` if `nameKey` provided, (2) `cfg[dataKey]`, (3) fallback to `item.name`/`item.color`. **`formattedLabel`**: applies `labelFormatter` if provided, then `cfg[labelKey].label` if `labelKey` set, then raw `label`. **`nestLabel`**: `true` when `payload.length === 1 && indicator !== 'dot'` — renders label nested inside the payload row instead of as a header. Indicator uses CSS vars `--color-bg`/`--color-border` set to resolved color via **Tailwind v4 parenthesis syntax**: `border-(--color-border) bg-(--color-bg)` (NOT square-bracket `border-[--color-border]` — that is v3 syntax); dot=`h-2.5 w-2.5`, line=`w-1`, dashed=`border-dashed bg-transparent`. Values formatted with `.toLocaleString()` if number. All bar chart demos use the shadcn/ui chart pattern: define `chartConfig`, use `<Tooltip><template #content="tooltipProps"><ChartTooltipContent v-bind="tooltipProps" [options] /></template></Tooltip>` (preferred slot pattern), use `var(--color-{key})` for fills. Pages: `index.vue` (card-grid nav with shadcn Cards + lucide icons), `bar-charts.vue` (10 variants: basic, horizontal, multiple, stacked+legend, label, custom-label, mixed per-bar fills, active hover, negative values, interactive toggle). Bar chart data: 6-month visitor data (Jan-Jun) + 90-day date series for interactive chart. State: `activeChart` ref (desktop/mobile toggle in BarChartInteractive). Notable patterns: `BarChartActive` uses `:active-index="2"` to pin a bar as permanently active (independent of tooltip hover), `#shape` slot for base per-bar rendering (`<Rectangle v-bind="props" :fill="props.payload?.fill" />`), and `#activeBar` slot for the highlighted state (`fill-opacity=0.8`, `stroke-dasharray=4`, `stroke-dashoffset=4`, stroke matching entry fill); `BarChartMixed` is layout=vertical (horizontal bars), uses `#shape` slot reading `props.payload?.fill` (fill per data entry, no fill prop on Bar), uses `#content` slot on Tooltip with `hide-label` (migrated from `:content` render-function prop); `BarChartNegative` uses `<Cell v-for="(item, index) in data" :key="index" :fill="item.visitors > 0 ? 'var(--chart-1)' : 'var(--chart-2)'">` as children of `<Bar>` to color each bar by sign (positive=`--chart-1`, negative=`--chart-2`); `<LabelList position="top" data-key="month" :fill-opacity="1">` as sibling child of `<Bar>`; imports `Cell, LabelList` from `vccs`; tooltip uses `#content` slot with `hide-label` + `hide-indicator`; no XAxis; chartConfig has no color entry (colors driven entirely by Cell fill, not `--color-{key}` vars); `BarChartLabel` uses `<LabelList position="top" :offset="12" class="fill-foreground" :font-size="12" />` as a child slot of `<Bar>` (no `data-key` needed — inherits from Bar), `:margin="{ top: 20 }"` on BarChart to provide space above bars; tooltip uses `#content` slot with `hide-label`; imports `LabelList` from `vccs`; `BarChartCustomLabel` is layout=vertical with both axes hidden (`:hide="true"`), chartConfig must include `label: { color: 'var(--background)' }` key; uses two `<LabelList>` children inside `<Bar>`: (1) `data-key="month"` `position="insideLeft"` `class="fill-(--color-label)"` `:font-size="12"` and (2) `data-key="desktop"` `position="right"` `class="fill-foreground"` `:font-size="12"`; tooltip uses `#content` slot (not `:content` prop); imports `LabelList` from `vccs`; `BarChartInteractive` chartConfig: desktop=`'var(--chart-2)'`, mobile=`'var(--chart-1)'`; uses `#content` slot pattern (`<Tooltip><template #content="tooltipProps"><ChartTooltipContent v-bind="tooltipProps" name-key="views" :label-formatter="labelFormatter" class="w-[150px]" /></template></Tooltip>`) — not the `:content` prop with `h()`; `labelFormatter` formats date string for display; `BarChartStacked` uses `ChartLegendContent` via `<Legend #content="legendProps"><ChartLegendContent v-bind="legendProps" /></Legend>`.

**Docs site stack**: Nuxt 3, Nuxt Content v3 (`@nuxt/content`), Tailwind CSS v4 (`@tailwindcss/vite`), tw-animate-css, shadcn-nuxt (style: `new-york`, baseColor: `zinc`, icons: `lucide`), `@nuxtjs/color-mode` (`classSuffix: ''` → class `dark`), `@nuxt/fonts` (Google: Doto 100-900, JetBrains Mono 100-800, Instrument Sans 400-700), `vccs` (`workspace:*`). `app/assets/css/tailwind.css`: @import tailwindcss + tw-animate-css, `@custom-variant dark (&:is(.dark *))` (class-based dark mode), @theme inline (shadcn vars, chart-1..5, sidebar, callout-info/warning/danger/tip), `:root`/`.dark` (oklch colors incl. callout vars: `--callout-info/warning/danger/tip`), font utilities `.doto` (Doto) + `.jetbrains` (JetBrains Mono), body font Instrument Sans, `::selection` (#4f4f4f bg), `.no-scroll-bar` utility, base `pre`/`code` styles (`code` font: JetBrains Mono first), `.prose` (h1–h4, p, a, strong, ul, ol, li, blockquote, hr, table, th/td, code/pre, img) for ContentRenderer markdown. Shiki dual-theme: `--shiki-light`/`--shiki-dark` CSS vars on `code span` control light/dark syntax colors.

**Docs migration**: Old page-based docs (getting-started.vue, area-charts.vue, etc.), i18n (en.ts, zh.ts), ChartDisplay, ChartSection, sidebar-options removed. Replaced by content-driven `[...slug].vue` + markdown in `content/`; UI strings inlined in `useLocale.UI_MESSAGES` (docs, search, searchShortcut, noResults, onThisPage, previous, next, getStarted, heroTitle, heroDescription, footer, copyCode, copied, preview, code); DocsSidebar nav from `queryCollectionNavigation(collectionName)`. Content frontmatter supports `icon` field (string, optional) — mapped to lucide icon in DocsSidebar nav. MDC `::chart-demo{name="..." description="..." src="..."}::` syntax used in chart docs to embed live demos (src = path under `charts/`, e.g. `area-charts/simple-area-chart`).

**Docs key components**:
- `ProseCode`: code block wrapper with copy button; props `code`, `language`, `filename`, `highlights`, `meta`; used by Nuxt Content Prose
- `CodeGroup`: Tabs for multi-file code blocks; reads slot children's `filename`/`language` props
- `ChartDemo`: Card with Tabs (preview/code); props `name`, `description`, `src`; loads chart via `import.meta.glob('~/charts/**/*.vue')` at build time then matches by `src` at runtime (supports subdirectory paths like `area-charts/simple-area-chart`; plain `import()` with variable paths only resolves one level deep); uses `msg.preview`, `msg.code`; renders chart inside `<ClientOnly>`
- `Callout`: info/warning/danger/tip callout; props `type`; uses lucide-vue-next icons (Info/TriangleAlert/AlertCircle/Lightbulb); colors via semantic CSS vars (`border-callout-{type}/50`, `bg-callout-{type}/10`, `text-callout-{type}`) — defined in `tailwind.css` @theme + `:root`/`.dark`
- `PropsTable`: placeholder for props table; props `items` (JSON); renders slot
- `ChartContainer` (docs): wraps `<ResponsiveContainer>` + applies vccs SVG theme CSS selectors; props: `id?` only — no `config: ChartConfig`, no `--color-{key}` CSS vars, no `chart-config` provide; used by live demos in `charts/` (distinct from playground `ChartContainer` which has full ChartConfig support)
- `DocsHeader`: sticky top-0 header; left: `SidebarTrigger` only (logo moved to DocsSidebar); right: outline search button (`msg.search` + `msg.searchShortcut` kbd, hidden mobile) + icon-only search button (mobile) + theme toggle (Moon/Sun via `useColorMode()`, toggles `colorMode.preference`) + "Star Github" link; `DocsSearch` rendered inline with `v-model:open="searchOpen"` (bound to `useSearch().isOpen`); no breadcrumbs, no LanguageToggle, no separate ThemeToggle component
- `DocsSearch`: Dialog-based search; uses `queryCollectionSearchSections(collectionName)`; filters by `title`, `description`, `titles[]` (section headings array); shows up to 10 results; `msg.search`, `msg.noResults`; takes `open` prop + emits `update:open`; DocsHeader binds `useSearch().isOpen` to the `open` prop
- `DocsPagination`: prev/next links from flattened navigation; props `prev`, `next` (`{ path, title }`); uses `msg.previous`, `msg.next`
- `DocsSidebar`: shadcn `<Sidebar class="z-50">` with `SidebarHeader` (logo: `vccs v0.1` with `.doto`/`.jetbrains` classes, NuxtLink to `/`) + `SidebarContent`/`SidebarGroup`/`SidebarGroupLabel`/`SidebarGroupContent`/`SidebarMenu`/`SidebarMenuButton`/`SidebarMenuItem`/`SidebarFooter`; nav from `queryCollectionNavigation(collectionName, ['icon'])` (second arg fetches `icon` frontmatter field); `groups` computed unwraps root nav node (`navigation[0].children`); `filterDirEntries` skips `_dir` entries; 2-level nesting (group → leaf items only); group and item `icon` frontmatter field mapped via `iconMap` (`rocket`, `bar-chart`, `book-open`, `package`, `area-chart`, `bar-chart-3` → lucide-vue-next components); **`getGroupIcon(group)`**: resolves a group's icon by checking `group.icon` first, then falling back to the `_dir` child entry's `icon` — required because Nuxt Content v3 stores `_dir.yml` metadata as a child entry (path ending `/_dir`) rather than merging it into the parent group node, so group-level icons set in `_dir.yml` are only accessible via the child list; `SidebarMenuButton :is-active="route.path === item.path"` + active inset shadow (`shadow-[inset_0px_0px_0px_1px_#fff] dark:shadow-[inset_0px_0px_0px_1px_#000]`); mobile auto-close: `setOpenMobile(false)` on link click via `useSidebar()`; `SidebarFooter`: "Request Chart" link (border-dashed) to `https://github.com/nicepkg/vccs/issues/new?labels=chart-request&template=chart_request.md`
- `DocsToc`: floating collapsible/hover+pinnable TOC panel (`fixed right-4 top-20 z-40 hidden xl:block`); props `links` (TocLink[]); state: `isPinned` + `isHovered` refs; `showPanel = computed(() => isPinned || isHovered)`; `@mouseenter`/`@mouseleave` on `<aside>` toggle `isHovered`; collapsed: icon-only button with `TableOfContents` lucide icon (click → `isPinned = true`); expanded: `<AnimatePresence>` + `<motion.div>` fade+slide (`opacity 0→1, x 8→0`, duration 0.2), `w-56`; header row: `msg.onThisPage` + X button (click → `isPinned = false`, only shown when pinned); `isPinned` resets on route change; nav: `max-h-[60vh] overflow-y-auto no-scroll-bar`; active heading: spring-animated `<motion.div layout-id="toc-indicator">` left-border indicator (`h-full w-0.5 bg-primary`, spring stiffness 300 damping 30); active link: `text-foreground font-medium`; depth-3 links: `ml-3`
- `docs/[...slug].vue`: catch-all `layout: docs`, `queryCollection(collectionName).path(slug).first()`; slug `/docs/<path>` from `route.params.slug` (path = `params.slug` joined by `/`); `useAsyncData` with `watch: [slug]`; `useHead` sets title (`${page.title} | vccs` or `'vccs'`); `tocLinks` built via `walkToc(items, depth=2)` — recursively flattens `page.body.toc.links` including nested `children`, tracking depth (h2=2, h3=3, ...); prev/next from flattened `queryCollectionNavigation`; `DocsToc` rendered as sibling outside main `<div>` (template root level); "Page not found" fallback with link to introduction
- `useLocale`: returns `msg` (static UI_MESSAGES: docs, search, searchShortcut, noResults, onThisPage, previous, next, getStarted, heroTitle, heroDescription, footer, copyCode, copied, preview, code) and `collectionName` (plain string `'content_en'`, NOT a ref — use directly without `.value`); English-only, no locale switching, no `toggle`, no `useLocalStorage`; used by content query + DocsHeader/DocsPagination/DocsToc/DocsSearch
- `useSearch`: returns `isOpen`, `open`, `close`, `toggle`; Cmd+K / Ctrl+K opens, Escape closes; used by DocsHeader to trigger DocsSearch
- `useToc`: returns `activeId` (ref); IntersectionObserver on `.prose h2[id], .prose h3[id]` with `rootMargin: '-80px 0px -80% 0px'`; used by DocsToc for active heading highlight
- `index.vue` (home): hero left + animated chart showcase right; left: Recharts quote card, vccs logo (`.doto`/`.jetbrains` fonts), description, CTA buttons, category selector (Bar/Area/Line Charts); right: 3-column grid of 9 chart cards (`absolute h-full w-1/2 right-0 hidden sm:block`), CSS translate animation via `gridOffset` computed (`-col*400px, -row*340px+100px`); clicking a category sets `activeChartId` to a random chart in that category; charts imported directly from `~/charts/`

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
Customization uses **named slots**: `shape`, `activeBar`, `dot`, `activeDot`, `label`, `content`, `cursor`, `tick`, `horizontal`, `vertical`. Example: `<Bar>{{ shape: (props) => <Custom {...props} /> }}</Bar>`. CartesianGrid custom line renderers use `#horizontal` / `#vertical` slots (Function type was removed from `horizontal`/`vertical` props).

**`Bar` slot rendering priority** (`BarRectangles`): (1) if `isActive && activeBarSlot` → render `#activeBar` slot; (2) else if `shapeSlot` → render `#shape` slot; (3) else default `<Rectangle>`. The `#activeBar` slot receives the same props as `#shape` (including `isActive: true`, `payload`, SVG attrs). **`activeIndex` prop**: when set (Number), pins that bar index as always-active regardless of tooltip hover state — `isActive = i === activeIndex`; when omitted, `isActive` is derived from Redux tooltip hover state. **Rectangle props merge order** (lowest → highest priority): `baseProps (Bar SVG attrs)` → `entryFill (entry.payload?.fill)` → `entry (BarRectangleItem)` → `cellPropsForIndex (Cell props by index)` → `activeBarProps (activeBar object if isActive)`. **Per-entry fill auto-merge**: `BarRectangles` automatically merges `entry.payload?.fill` into rectangle props, so data entries with a `fill` field get per-bar color without needing a custom `#shape` slot — matches Recharts behavior.

### Cell Component
- Location: `packages/vue/src/components/Cell.tsx`, exported from `packages/vue/src/components/index.ts`
- Marker component that renders nothing — parent components read Cell VNode children from the default slot and apply their props by index
- Props: `fill?: string`, `stroke?: string` (plus SVGAttributes)
- **Bar integration**: `Bar` calls `extractCellProps(slots.default?.())` in render to collect Cell props per index into `cellPropsRef`; `filterOutCells()` removes Cell vnodes from rendered content (handles Fragment wrapping from `v-for`); `cellProps` flows through `BarContext` → `BarRectangles` where `cellPropsForIndex = cellProps.value?.[i]` is applied at highest priority (overrides entry fill and base props, below only `activeBarProps`); `labelListData` fill resolution: `cellPropsRef.value?.[i]?.fill ?? entry.payload?.fill ?? props.fill` — Cell fill propagates to labels automatically
- Usage: `<Bar dataKey="value"><Cell v-for="(entry, index) in data" :key="index" :fill="COLORS[index]" /></Bar>`

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
- `Tooltip #content slot` (**preferred Vue pattern**): `<Tooltip><template #content="{ active, payload, label }"><MyContent :active="active" :payload="payload" :label="label" /></template></Tooltip>`; slot takes priority over `content` prop; slot props type is `TooltipContentProps`: `{ label, payload, coordinate, active, accessibilityLayer, ...rest }`; Tooltip also exposes `#cursor` and `#default` typed slots. **IMPORTANT**: use destructured props, NOT `v-bind="tooltipProps"` — `@antfu/eslint-config` auto-fix strips `v-bind` spread on slot props, breaking the tooltip
- `Tooltip content` prop (legacy): accepts a **component reference** (e.g. `content={MyComponent}`) — component receives `active` + `payload` props; superseded by `#content` slot in Vue usage
- Tooltip key props: `defaultIndex` (pre-select index), `trigger="click"` (click activation), `shared={false}` (item-level mode), `includeHidden` (show hidden series), `offset` (pixel offset from cursor)

### TimeSeries / Date Axis
- `XAxis` with Date dataKey: use `domain={['auto', 'auto']}` for automatic date domain inference
- Custom d3 scale: pass `scaleTime()` via `scale` prop with `type='number'`, manual `ticks` array (numeric timestamps), and a `tickFormatter`
- Multi-scale tick formatter pattern: use `victory-vendor/d3-time` boundary helpers (`timeSecond`, `timeMinute`, `timeHour`, `timeDay`, `timeWeek`, `timeMonth`, `timeYear`) with native `Date` methods — avoids importing `d3-time-format`; see `TimeSeries.stories.tsx` `multiFormat()` for reference
- Story title convention: `'Examples/TimeSeries'`

### XAxis / YAxis
- **Two-layer internal architecture**: public `XAxis`/`YAxis` → `XAxisSettingsDispatcher`/`YAxisSettingsDispatcher` (registers settings into Redux via `addXAxis`/`removeXAxis` / `addYAxis`/`removeYAxis` in `watchEffect`) → `XAxisImpl`/`YAxisImpl` (reads selectors, renders `<CartesianAxis>`)
- **Default interval**: `'preserveEnd'` (set in dispatcher if prop is omitted)
- **CSS classes**: XAxis → `v-charts-xAxis xAxis`; YAxis → `v-charts-yAxis yAxis`
- **Slots**: `XAxis` supports a `tick` named slot (forwarded through all layers to `CartesianAxis`); `YAxis` does NOT currently forward a tick slot
- **XAxis props**: `xAxisId` (default `0`), `allowDataOverflow`, `allowDecimals`, `allowDuplicatedCategory`, `height`, `hide` (default `false`), `mirror`, `orientation`, `padding`, `reversed`, `scale`, `tickCount`, `type`, `dataKey`, `domain` (AxisDomain[]), `axisLine` (Boolean, default `true`), `ticks` (AxisTick[]), `interval` (AxisInterval), `unit`, `tickLine` ([Boolean, Object], default `true`), `tickMargin` (Number), `minTickGap` (Number, default `5`), `tickFormatter`
- **YAxis props**: `yAxisId`, `allowDataOverflow`, `allowDecimals`, `allowDuplicatedCategory`, `width`, `hide` (default `false`), `mirror`, `orientation`, `padding`, `reversed`, `scale`, `tickCount`, `type`, `dataKey`, `domain` (AxisDomain[]), `axisLine` ([Boolean, Object], default `true`), `tickLine` ([Boolean, Object], default `true`), `tickMargin` (Number), `minTickGap` (Number, default `5`), `tickFormatter`, `interval` (AxisInterval), `unit`

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

### CartesianGrid
- Props: `xAxisId`/`yAxisId` (default `0`), `x`, `y`, `width`, `height` (fall back to chart offset if omitted), `horizontal` ([Boolean, Object], default `true`), `vertical` ([Boolean, Object], default `true`), `horizontalPoints`/`verticalPoints` (pixel coords, highest priority), `horizontalValues`/`verticalValues` (data-domain values, force `syncWithTicks=true` for that axis), `syncWithTicks` (only draw lines at axis tick positions), `fill`, `fillOpacity`, `ry`, `horizontalCoordinatesGenerator`, `verticalCoordinatesGenerator`, `horizontalFill`/`verticalFill` (stripe color arrays, cycling)
- **`horizontal`/`vertical` type change**: Function type was removed from the prop type; custom line rendering is now done via named slots `#horizontal` / `#vertical` on `<CartesianGrid>`, matching the project-wide "slots not VNode props" convention
- Reads `useChartWidth()`, `useChartHeight()`, `useOffset()` + `useAppSelector(selectAxisPropsNeededForCartesianGridTicksGenerator)` for both axes; returns `null` if dimensions are invalid
- **Rendering layers** (in order inside `<g class="v-charts-cartesian-grid">`):
  1. `Background` — full-area `<rect>` for background fill
  2. `HorizontalStripes` — alternating `<rect>` fills using `horizontalFill[]`
  3. `VerticalStripes` — alternating `<rect>` fills using `verticalFill[]`
  4. `HorizontalGridLines` — `<g class="v-charts-cartesian-grid-horizontal">` with one `<line>` per `horizontalPoints[i]`
  5. `VerticalGridLines` — `<g class="v-charts-cartesian-grid-vertical">` with one `<line>` per `verticalPoints[i]`
- **`horizontal`/`vertical` prop (GridLineType — Boolean|Object)**: `false`/`true` show/hide the default `<line>`; Object form merges SVG attribute overrides onto the default `<line>`; stripes and grid lines skip rendering if the value is falsy; custom renderers use the `#horizontal` / `#vertical` slots instead
- **`renderLineItem(slot, option, props)`** in `utils.tsx`: if `slot` is provided, calls `slot(props)` and returns the result; otherwise renders a default `<line>` merging filtered SVG attrs from `props` with `option`'s overrides; signature changed from `renderLineItem(option, props)` to `renderLineItem(slot, option, props)` — slot is the first argument
- **Slot forwarding**: `CartesianGrid` passes `slots.horizontal` → `HorizontalGridLines` and `slots.vertical` → `VerticalGridLines` as named child slots; the grid-line components call `renderLineItem(slots.horizontal, horizontal, lineItemProps)` per tick
- **Coordinate priority**: explicit `horizontalPoints`/`verticalPoints` → `horizontalValues`/`verticalValues` (data-domain, overrides ticks) → coordinate generators → default generators (use `CartesianAxisDefaultProps` + axis ticks via `getCoordinatesOfGrid` + `getTicks`)
- CSS classes: `v-charts-cartesian-grid` (outer g), `v-charts-cartesian-grid-horizontal` (horizontal lines g), `v-charts-cartesian-grid-vertical` (vertical lines g)
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
