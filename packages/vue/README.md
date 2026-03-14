<h1 align="center">vccs</h1>

<p align="center">
  <strong>Composable charting components for Vue 3</strong>
</p>

<p align="center">
  An unofficial Vue.js port of <a href="https://recharts.org">Recharts</a>, bringing React's most popular charting library to the Vue ecosystem.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/vccs"><img src="https://img.shields.io/npm/v/vccs.svg" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/vccs"><img src="https://img.shields.io/npm/l/vccs.svg" alt="license"></a>
</p>

---

## Install

```bash
pnpm add vccs

# or
npm install vccs
```

**Peer dependency**: `vue >= 3.0.0`

## Quick Start

```vue
<script setup>
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'vccs'

const data = [
  { name: 'Page A', uv: 4000, pv: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398 },
  { name: 'Page C', uv: 2000, pv: 9800 },
  { name: 'Page D', uv: 2780, pv: 3908 },
]
</script>

<template>
  <ResponsiveContainer width="100%" :height="300">
    <BarChart :data="data">
      <CartesianGrid stroke-dasharray="3 3" />
      <XAxis data-key="name" />
      <YAxis />
      <Tooltip />
      <Bar data-key="pv" fill="#8884d8" />
      <Bar data-key="uv" fill="#82ca9d" />
    </BarChart>
  </ResponsiveContainer>
</template>
```

## Chart Types

| Chart | Component | Status |
|-------|-----------|--------|
| Area | `<AreaChart>` + `<Area>` | Supported |
| Bar | `<BarChart>` + `<Bar>` | Supported |
| Line | `<LineChart>` + `<Line>` | Supported |
| Scatter | `<ScatterChart>` + `<Scatter>` | Supported |
| Composed | `<ComposedChart>` | Supported |
| Pie | `<PieChart>` + `<Pie>` | Supported |
| Radar | `<RadarChart>` + `<Radar>` | Supported |
| Radial Bar | `<RadialBarChart>` + `<RadialBar>` | Supported |
| Funnel | `<FunnelChart>` + `<Funnel>` | Not yet |
| Treemap | `<Treemap>` | Not yet |
| Sankey | `<Sankey>` | Not yet |
| Sunburst | `<SunburstChart>` | Not yet |

## Features

- **Vue 3 Native** — Composition API + JSX, full TypeScript support
- **Recharts API** — Same intuitive composable component design
- **Animated** — Smooth transitions powered by [Motion for Vue](https://motion.dev/docs/vue)
- **Interactive** — Tooltip, Legend, Brush, click/hover events
- **Responsive** — `<ResponsiveContainer>` adapts to parent width
- **Customizable** — Named slots for shapes, ticks, tooltip content, and more

## License

[MIT](../../LICENSE)
