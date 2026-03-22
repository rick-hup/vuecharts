# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).

## [0.4.0] - 2026-03-23

### Added

-   feat(text): support default slot as text content
-   feat(tooltip): type cursor slot props and align with Recharts

### Fixed

-   fix(axis): revert attrs forwarding in CartesianAxis
-   fix(axis): remove duplicate class and forward style in XAxis/YAxis
-   fix(axis): correct axisLine prop type to boolean | SVGAttributes
-   fix(filterProps): add kebab-case stroke attribute keys to SVGElementProps
-   fix(cartesian-axis): correct axisLine prop type from string to boolean

## [0.3.0] - 2026-03-22

### Added

-   feat: implement Treemap component with flat mode, nest mode (breadcrumb navigation), built-in tooltip, entrance animation, and arrow indicator for nest nodes
-   feat: add treemap layout utility (d3-hierarchy squarify)
-   feat: implement ReferenceDot component with `#shape` slot
-   feat: implement Customized component
-   feat: implement Polygon shape component
-   feat: export Treemap, Text, and Customized from public API
-   feat: add public hooks — tooltip (`useIsTooltipActive`, `useActiveTooltipCoordinate`, `useActiveTooltipLabel`), layout (`usePlotArea`, `useChartWidth`, `useChartHeight`), axis (`useXAxisDomain`, `useYAxisDomain`, `useXAxisTicks`, `useYAxisTicks`), and 9 scale hooks
-   feat: add `createCategoricalInverse` utility and inverse scale selectors

### Fixed

-   fix: legend is not taking into account user assign style (by @zernonia)
-   fix: tabindex typo and fixing accessibility layer (by @zernonia)
-   fix(Treemap): align event API with Recharts and fix onMouseLeave hover state
-   fix(Treemap): correct type imports and add missing positions field
-   fix: treemap nest mode drills into wrong group due to d3 sort reorder
-   fix: re-trigger slide-in animation on nest mode navigation
-   fix: align treemap animation with recharts — slide-in from left instead of center-scale
-   fix(ReferenceDot): make fill and stroke optional in ReferenceDotShapeProps
-   fix(rootProps): widen class prop type from string to VueClassValue
-   fix: align class type interfaces to VueClassValue across all components

### Changed

-   refactor: replace legacy `animationDuration`/`animationEasing`/`animationBegin` props with `transition`
-   refactor: replace `className` prop with native Vue `class` across all components
-   refactor: align Treemap with Recharts architecture — Redux store + standard Tooltip
-   refactor: extract shared `classProp` and `VueClassValue` type
-   refactor: extract duplicated scale and cell utils into shared modules

## [0.2.0] - 2025-03-15

### Added

- **FunnelChart**: New chart type with `<FunnelChart>` + `<Funnel>` + `<Trapezoid>` shape component

## [0.1.0] - 2025-03-14

Initial release of **vccs** — an unofficial Vue 3 port of [Recharts](https://recharts.org/).

### Added

- **Chart types**: AreaChart, BarChart, LineChart, ScatterChart, ComposedChart, PieChart, RadarChart, RadialBarChart
- **Cartesian components**: XAxis, YAxis, ZAxis, CartesianGrid, ReferenceLine, ReferenceArea, ErrorBar, Brush
- **Polar components**: PolarGrid, PolarAngleAxis, PolarRadiusAxis
- **General components**: Tooltip, Legend, Label, LabelList, Cell, ResponsiveContainer
- **Shape components**: Rectangle, Dot, Sector, Symbols, Cross, Curve
- **Animation**: Smooth SVG animations powered by `motion-v` with `prefers-reduced-motion` support
- **State management**: Redux Toolkit via `@reduxjs/vue-redux` (one store per chart instance)
- **Slots API**: Vue-idiomatic named slots (`#shape`, `#content`, `#cursor`, `#dot`, `#tick`, etc.) instead of React's render-prop pattern
- **Accessibility**: Legend keyboard navigation, ARIA attributes, focus-visible indicators
- **TypeScript**: Full type support with Volar-compatible slot types
- **Build**: ESM-only output (`preserveModules`) via Vite + Rolldown
- **Tooling**: Storybook stories, Vitest test suite, GitHub Actions CI, Nuxt playground, Docus documentation site
