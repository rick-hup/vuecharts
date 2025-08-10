# Suggested Commands for Vue Charts Development

## Core Development Commands
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
```

## Package-specific Commands
```bash
# Build the main library
pnpm --filter vccs build

# Clean build artifacts
pnpm --filter vccs clean

# Run library tests
pnpm --filter vccs test

# Development build with watch mode
pnpm --filter vccs dev

# Bump version
pnpm --filter vccs bumpp

# Check bundle size
pnpm --filter vccs size
```

## Quality Assurance Commands
```bash
# Run ESLint
pnpm eslint .

# Run ESLint with auto-fix
pnpm eslint . --fix

# Run tests with coverage
pnpm test:coverage

# Run commitlint on last commit
pnpm commitlint --from HEAD~1 --to HEAD --verbose
```

## Git Hooks
The project uses simple-git-hooks for pre-commit and commit-msg hooks:
- Pre-commit: Runs lint-staged to lint changed files
- Commit-msg: Runs commitlint to validate commit messages

## Testing Commands
```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Run specific test file
pnpm test packages/vue/src/path/to/test-file.spec.ts

# Run tests with coverage
pnpm test:coverage
```