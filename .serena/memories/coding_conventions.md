# Coding Conventions for Vue Charts

## Code Style
- Uses @antfu/eslint-config for linting with custom overrides
- Vue 3 Composition API patterns
- TypeScript for type safety
- Functional programming patterns with utilities from es-toolkit and lodash-es

## Naming Conventions
- Component names follow PascalCase
- Vue composition hooks follow useCamelCase pattern
- File names generally match the main export (e.g., component name)
- Test files use .spec.ts or .test.ts suffix

## Type Safety
- Full TypeScript support with strict typing
- Comprehensive type definitions for all components and utilities
- Uses TypeScript declaration files generation via vite-plugin-dts

## Component Architecture
- Components are built with Vue 3 Composition API
- Uses a composable pattern similar to Recharts
- Components are organized by chart type in the `cartesian/` directory
- Shared components are in the `components/` directory

## State Management
- Uses Redux Toolkit via @reduxjs/vue-redux for complex chart state
- State slices for different chart aspects (brush, axis, legend, tooltip, etc.)
- Selectors for computed state values
- Immer for immutable state updates

## Testing
- Vitest with JSDOM environment
- Coverage reporting with Istanbul
- Testing Library for component testing
- Test files located in `__tests__` directories or with .spec.ts suffix

## Build System
- Vite for building and development
- Outputs both ES modules and CommonJS formats
- TypeScript declaration files generation
- Externalizes Vue and motion-v dependencies

## Documentation
- Storybook for component development and documentation
- Inline JSDoc comments for complex functions
- README.md for project overview and usage
