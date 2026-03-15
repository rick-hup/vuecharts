# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).

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
