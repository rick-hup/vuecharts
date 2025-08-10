# Vue Charts Project Overview

## Project Purpose
Vue Charts is a composable charting library built for Vue 3. It's an unofficial Vue.js port of Recharts, bringing the power of React's most popular charting library to the Vue ecosystem. The library is built specifically for Vue 3 with Composition API and maintains the same intuitive API as Recharts.

## Tech Stack
- **Core Framework**: Vue 3 with Composition API
- **State Management**: Redux Toolkit via @reduxjs/vue-redux
- **Mathematical Calculations**: victory-vendor (D3 utilities)
- **Animations**: motion-v for smooth transitions
- **Utilities**: lodash-es, es-toolkit, eventemitter3, immer
- **TypeScript**: Full TypeScript support with comprehensive type definitions
- **Build System**: Vite with vite-plugin-dts for TypeScript declaration files
- **Testing**: Vitest with JSDOM environment and Istanbul coverage provider
- **Linting/Formatting**: ESLint with @antfu/eslint-config
- **Component Development**: Storybook for component development and documentation

## Codebase Structure
```
packages/
  vue/                 # Main library source code
    src/
      cartesian/       # Cartesian chart components (area, bar, line, axis, grid, etc.)
      chart/           # Main chart components (AreaChart, BarChart, etc.)
      container/       # Layout containers (ResponsiveContainer, Surface, etc.)
      components/      # Shared components (legend, tooltip, text, etc.)
      state/           # Redux state management for chart interactions
      utils/           # Utility functions and helpers
      hooks/           # Vue composition hooks
      context/         # Vue context providers
      synchronisation/ # Chart synchronization utilities
      events/          # Event handling utilities
      shape/           # Shape components
      types/           # TypeScript type definitions
      test/            # Test utilities and helpers
      storybook/       # Storybook stories and configurations
```

## Development Guidelines
1. Components are organized by chart type in the `cartesian/` directory
2. Uses a composable pattern similar to Recharts
3. State slices for different chart aspects (brush, axis, legend, tooltip, etc.)
4. Selectors for computed state values
5. Outputs both ES modules and CommonJS formats
6. Responsive design with built-in responsive container support
7. Highly customizable with extensive theming and styling options