# Task Completion Checklist

When completing a task in the Vue Charts project, ensure you follow these steps:

## Code Quality
1. Follow the established coding conventions in coding_conventions.md
2. Ensure TypeScript types are correct and comprehensive
3. Write clean, functional code using Composition API patterns
4. Use existing utilities from es-toolkit and lodash-es where appropriate

## Testing
1. Write or update tests for any new or changed functionality
2. Run tests to ensure they pass: `pnpm test`
3. Check test coverage if significant changes were made: `pnpm test:coverage`
4. Use Testing Library patterns for component tests

## Linting and Formatting
1. Run ESLint to check for issues: `pnpm eslint .`
2. Auto-fix linting issues where possible: `pnpm eslint . --fix`
3. Ensure code follows the project's style guide

## Build Verification
1. Verify the build still works: `pnpm --filter vccs build`
2. Check that exports are correctly defined in package.json
3. Ensure no TypeScript compilation errors

## Documentation
1. Update Storybook stories if component APIs change
2. Add JSDoc comments for new public APIs
3. Update README.md if project usage changes significantly

## Git Practices
1. Write clear, conventional commit messages
2. Ensure commits pass pre-commit hooks (linting, testing)
3. Keep commits focused on single concerns

## Final Verification
1. Test changes in the playground: `pnpm play`
2. Verify Storybook components still work: `pnpm storybook`
3. Check that no existing functionality is broken