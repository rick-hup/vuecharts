# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3 charting library called "Vue Charts" - an unofficial Vue.js port of Recharts. It provides composable charting components built specifically for Vue 3 with Composition API.

## Repository Structure

- `packages/vue/` - Main library source code
- `playground/nuxt/` - Nuxt.js playground for testing components
- `packages/vue/src/` - Source code organized by component types:
  - `cartesian/` - Cartesian chart components (area, bar, line, axis, grid, etc.)
  - `chart/` - Main chart components (AreaChart, BarChart, etc.)
  - `components/` - Shared components (legend, tooltip, text, etc.)
  - `container/` - Layout containers (ResponsiveContainer, Surface, etc.)
  - `state/` - Redux state management for chart interactions
  - `utils/` - Utility functions and helpers
  - `animation/` - Animation components and utilities

## Common Development Commands

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

# Lint and typecheck (if available)
pnpm lint
pnpm typecheck

# Publish release
pnpm pub:release
```

## Architecture Overview

1. **Component Architecture**: 
   - Built with Vue 3 Composition API
   - Uses a composable pattern similar to Recharts
   - Components are organized by chart type in the `cartesian/` directory
   - Context pattern using `provide/inject` for sharing state between parent and child components (e.g., useAreaContext)

2. **State Management**:
   - Uses Redux Toolkit via @reduxjs/vue-redux for complex chart state
   - Store created per chart instance with `createRechartsStore`
   - State slices for different chart aspects (brush, axis, legend, tooltip, etc.)
   - Selectors for computed state values
   - Middleware for handling mouse, keyboard, touch, and external events

3. **Animation System**:
   - Uses motion-v library for smooth animations
   - Custom `Animate` component wrapper for consistent animation patterns
   - Animation props passed through context rather than component props

4. **Build System**:
   - Vite for building and development
   - TypeScript for type safety
   - Outputs both ES modules and CommonJS formats
   - Uses vite-plugin-dts for TypeScript declarations

5. **Testing**:
   - Vitest with JSDOM environment
   - Test files use `.spec.tsx` extension
   - Coverage reporting with Istanbul
   - Testing Library for component testing

6. **Dependencies**:
   - victory-vendor for mathematical calculations and D3 utilities
   - motion-v for animations
   - lodash-es for utility functions
   - VueUse for Vue composition utilities
   - @reduxjs/toolkit for state management
   - es-toolkit for modern JavaScript utilities

## Development Workflow

1. Make changes in `packages/vue/src/`
2. Test changes in the playground with `pnpm play`
3. Run tests with `pnpm test`
4. Build with `pnpm --filter vccs build`
5. View Storybook components with `pnpm storybook`

## Key Patterns

1. **Component Context Pattern**: Components use context providers (e.g., AreaContext) to share state and props with child components, avoiding prop drilling.

2. **Animation Integration**: Animation components should use the `Animate` wrapper component and receive animation callbacks through context rather than props.

3. **Redux Integration**: Chart components integrate with Redux store through hooks and selectors for reactive state management.