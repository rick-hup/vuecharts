# Scale Hooks Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 9 public scale hooks (useXAxisScale, useYAxisScale, inverse variants, snap variants, useCartesianScale) matching Recharts' public API.

**Architecture:** Hooks wrap Redux selectors via `useAppSelector`. Three new selectors needed: `selectAxisInverseScale`, `selectAxisInverseDataSnapScale`, `selectAxisInverseTickSnapScale`. Utility `createCategoricalInverse` with bisect for categorical/ordinal scale inversion. All hooks go in `publicHooks.ts`, exported from `index.ts`.

**Tech Stack:** Vue 3 Composition API, Redux Toolkit selectors, D3 scales (via victory-vendor)

---

## File Structure

| File | Action | Responsibility |
|------|--------|---------------|
| `packages/vue/src/utils/createCategoricalInverse.ts` | Create | Bisect + categorical inverse factory |
| `packages/vue/src/state/selectors/axisSelectors.ts` | Modify | Add 3 selectors + `selectSortedDataPoints` |
| `packages/vue/src/hooks/publicHooks.ts` | Modify | Add 9 scale hooks + types |
| `packages/vue/src/index.ts` | Modify | Export `ScaleFunction`, `InverseScaleFunction`, `CartesianDataPoint` types |
| `packages/vue/src/hooks/__tests__/publicHooks.spec.tsx` | Modify | Add integration tests |
| `tasks/todo.md` | Modify | Check off Treemap playground demo + update Scale Hooks |

---

### Task 0: Check off Treemap Playground Demo

**Files:**
- Modify: `tasks/todo.md`

- [ ] **Step 1:** Mark `添加 Playground demo` as checked under Treemap section (it already exists)
- [ ] **Step 2:** Commit

```bash
git add tasks/todo.md
git commit -m "docs: mark Treemap playground demo as complete"
```

---

### Task 1: Create `createCategoricalInverse` Utility

Port from Recharts `src/util/scale/createCategoricalInverse.ts`.

**Files:**
- Create: `packages/vue/src/utils/createCategoricalInverse.ts`

- [ ] **Step 1: Create the utility**

```typescript
import type { RechartsScale } from '@/types/scale'

export type InverseScaleFunction = (pixelValue: number) => unknown

/**
 * Binary search for sorted arrays (ascending or descending).
 */
export function bisect(haystack: ReadonlyArray<number>, needle: number): number {
  let lo = 0
  let hi = haystack.length
  const ascending = haystack[0]! < haystack[haystack.length - 1]!

  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2)
    if (ascending ? haystack[mid]! < needle : haystack[mid]! > needle) {
      lo = mid + 1
    } else {
      hi = mid
    }
  }
  return lo
}

/**
 * Creates an inverse scale function for categorical/ordinal scales.
 * Uses bisect to find the closest domain value for a given pixel coordinate.
 */
export function createCategoricalInverse(
  scale: RechartsScale | undefined,
  allDataPointsOnAxis?: ReadonlyArray<unknown>,
): InverseScaleFunction | undefined {
  if (!scale) {
    return undefined
  }
  const domain = allDataPointsOnAxis ?? scale.domain()
  const pixelPositions: number[] = domain.map(d => scale(d) ?? 0)
  const range = scale.range()

  if (domain.length === 0 || range.length < 2) {
    return undefined
  }

  return (pixelValue: number): unknown => {
    const index = bisect(pixelPositions, pixelValue)

    if (index <= 0) {
      return domain[0]
    }
    if (index >= domain.length) {
      return domain[domain.length - 1]
    }

    const leftPixel = pixelPositions[index - 1] ?? 0
    const rightPixel = pixelPositions[index] ?? 0
    if (Math.abs(pixelValue - leftPixel) <= Math.abs(pixelValue - rightPixel)) {
      return domain[index - 1]
    }
    return domain[index]
  }
}

/**
 * Creates an inverse function: uses native `.invert` for numeric scales,
 * falls back to categorical bisect for ordinal/band/point scales.
 */
export function combineInverseScaleFunction(
  scale: RechartsScale | undefined,
): InverseScaleFunction | undefined {
  if (scale == null) {
    return undefined
  }
  if ('invert' in scale && typeof (scale as any).invert === 'function') {
    return (scale as any).invert.bind(scale)
  }
  return createCategoricalInverse(scale, undefined)
}
```

- [ ] **Step 2:** Verify no TypeScript errors

Run: `cd /Users/huangpeng/Documents/workspace/web/mygithub/charts/vue-charts && npx tsc --noEmit --project packages/vue/tsconfig.json 2>&1 | head -20`

- [ ] **Step 3:** Commit

```bash
git add packages/vue/src/utils/createCategoricalInverse.ts
git commit -m "feat: add createCategoricalInverse utility for scale inversion"
```

---

### Task 2: Add Selectors to axisSelectors.ts

**Files:**
- Modify: `packages/vue/src/state/selectors/axisSelectors.ts`

Add after `selectAxisScale` (line ~1176):

- [ ] **Step 1: Add `selectSortedDataPoints` selector**

```typescript
function sortBy(a: unknown, b: unknown): number {
  const aNum = Number(a)
  const bNum = Number(b)
  if (Number.isNaN(aNum) && Number.isNaN(bNum)) {
    return 0
  }
  if (Number.isNaN(aNum)) {
    return -1
  }
  if (Number.isNaN(bNum)) {
    return 1
  }
  return aNum - bNum
}

export const selectSortedDataPoints: (
  state: RechartsRootState,
  axisType: XorYorZType,
  axisId: AxisId,
  isPanorama: boolean,
) => ReadonlyArray<unknown> | undefined = createSelector([selectAllAppliedValues], (appliedData) => {
  return appliedData?.map(item => item.value).sort(sortBy)
})
```

- [ ] **Step 2: Add `selectAxisInverseScale` selector**

Import `combineInverseScaleFunction` from `@/utils/createCategoricalInverse`, then add:

```typescript
export const selectAxisInverseScale: (
  state: RechartsRootState,
  axisType: XorYorZType,
  axisId: AxisId,
  isPanorama: boolean,
) => InverseScaleFunction | undefined = createSelector([selectAxisScale], combineInverseScaleFunction)
```

- [ ] **Step 3: Add `selectAxisInverseDataSnapScale` selector**

Import `createCategoricalInverse` from `@/utils/createCategoricalInverse`, then add:

```typescript
export const selectAxisInverseDataSnapScale: (
  state: RechartsRootState,
  axisType: XorYorZType,
  axisId: AxisId,
  isPanorama: boolean,
) => InverseScaleFunction | undefined = createSelector(
  [selectAxisScale, selectSortedDataPoints],
  createCategoricalInverse,
)
```

- [ ] **Step 4: Add `selectAxisInverseTickSnapScale` selector**

```typescript
export const selectAxisInverseTickSnapScale: (
  state: RechartsRootState,
  axisType: XorYorZType,
  axisId: AxisId,
  isPanorama: boolean,
) => InverseScaleFunction | undefined = createSelector(
  [selectTicksOfAxis],
  (ticks: ReadonlyArray<TickItem> | undefined): InverseScaleFunction | undefined => {
    if (!ticks || ticks.length === 0) {
      return undefined
    }

    return (pixelValue: number) => {
      let minDistance = Infinity
      let closestTick = ticks[0]

      for (const tick of ticks) {
        const distance = Math.abs(tick.coordinate - pixelValue)
        if (distance < minDistance) {
          minDistance = distance
          closestTick = tick
        }
      }
      return closestTick?.value
    }
  },
)
```

- [ ] **Step 5:** Verify no TypeScript errors

Run: `cd /Users/huangpeng/Documents/workspace/web/mygithub/charts/vue-charts && npx tsc --noEmit --project packages/vue/tsconfig.json 2>&1 | head -20`

- [ ] **Step 6:** Commit

```bash
git add packages/vue/src/state/selectors/axisSelectors.ts packages/vue/src/utils/createCategoricalInverse.ts
git commit -m "feat: add inverse scale selectors for public hooks"
```

---

### Task 3: Add Scale Hooks to publicHooks.ts

**Files:**
- Modify: `packages/vue/src/hooks/publicHooks.ts`

- [ ] **Step 1: Add imports and types**

Add imports at top:
```typescript
import { selectAxisScale, selectAxisInverseScale, selectAxisInverseDataSnapScale, selectAxisInverseTickSnapScale } from '@/state/selectors/axisSelectors'
import type { InverseScaleFunction } from '@/utils/createCategoricalInverse'
import type { Coordinate } from '@/types/types'
```

Add type exports after the existing imports:
```typescript
export type { InverseScaleFunction } from '@/utils/createCategoricalInverse'

export type ScaleFunction = (value: unknown) => number | undefined

export interface CartesianDataPoint {
  x: number | string
  y: number | string
}
```

- [ ] **Step 2: Add useXAxisScale / useYAxisScale**

```typescript
export function useXAxisScale(axisId: AxisId = 0): ComputedRef<ScaleFunction | undefined> {
  const scale = useAppSelector(state => selectAxisScale(state, 'xAxis', axisId, false))
  return computed(() => {
    const s = scale.value
    if (s == null) return undefined
    return (value: unknown) => {
      const result = s(value)
      return typeof result === 'number' ? result : undefined
    }
  })
}

export function useYAxisScale(axisId: AxisId = 0): ComputedRef<ScaleFunction | undefined> {
  const scale = useAppSelector(state => selectAxisScale(state, 'yAxis', axisId, false))
  return computed(() => {
    const s = scale.value
    if (s == null) return undefined
    return (value: unknown) => {
      const result = s(value)
      return typeof result === 'number' ? result : undefined
    }
  })
}
```

- [ ] **Step 3: Add inverse hooks**

```typescript
export function useXAxisInverseScale(axisId: AxisId = 0) {
  return useAppSelector(state => selectAxisInverseScale(state, 'xAxis', axisId, false))
}

export function useYAxisInverseScale(axisId: AxisId = 0) {
  return useAppSelector(state => selectAxisInverseScale(state, 'yAxis', axisId, false))
}

export function useXAxisInverseDataSnapScale(axisId: AxisId = 0) {
  return useAppSelector(state => selectAxisInverseDataSnapScale(state, 'xAxis', axisId, false))
}

export function useYAxisInverseDataSnapScale(axisId: AxisId = 0) {
  return useAppSelector(state => selectAxisInverseDataSnapScale(state, 'yAxis', axisId, false))
}

export function useXAxisInverseTickSnapScale(axisId: AxisId = 0) {
  return useAppSelector(state => selectAxisInverseTickSnapScale(state, 'xAxis', axisId, false))
}

export function useYAxisInverseTickSnapScale(axisId: AxisId = 0) {
  return useAppSelector(state => selectAxisInverseTickSnapScale(state, 'yAxis', axisId, false))
}
```

- [ ] **Step 4: Add useCartesianScale**

```typescript
export function useCartesianScale(
  dataPoint: CartesianDataPoint,
  xAxisId: AxisId = 0,
  yAxisId: AxisId = 0,
): ComputedRef<Coordinate | undefined> {
  const xScale = useXAxisScale(xAxisId)
  const yScale = useYAxisScale(yAxisId)

  return computed(() => {
    const xFn = xScale.value
    const yFn = yScale.value
    if (xFn == null || yFn == null) return undefined

    const pixelX = xFn(dataPoint.x)
    const pixelY = yFn(dataPoint.y)
    if (pixelX == null || pixelY == null) return undefined

    return { x: pixelX, y: pixelY }
  })
}
```

- [ ] **Step 5: Add `ComputedRef` import**

Add to existing vue import: `import { computed, type ComputedRef } from 'vue'`

- [ ] **Step 6:** Verify no TypeScript errors and run existing tests

Run: `cd /Users/huangpeng/Documents/workspace/web/mygithub/charts/vue-charts && pnpm test packages/vue/src/hooks/__tests__/publicHooks.spec.tsx`

- [ ] **Step 7:** Commit

```bash
git add packages/vue/src/hooks/publicHooks.ts
git commit -m "feat: add 9 public scale hooks (useXAxisScale, inverse, snap, cartesian)"
```

---

### Task 4: Export Types from index.ts

**Files:**
- Modify: `packages/vue/src/index.ts`

- [ ] **Step 1:** Verify `export * from './hooks/publicHooks'` already handles all exports (it does — types are re-exported from publicHooks.ts)

- [ ] **Step 2:** If `Coordinate` type is not already exported, add it. Check and add if needed:

```typescript
export type { Coordinate } from './types/types'
```

- [ ] **Step 3:** Commit (if changes needed)

```bash
git add packages/vue/src/index.ts
git commit -m "feat: export scale hook types from public API"
```

---

### Task 5: Integration Tests

**Files:**
- Modify: `packages/vue/src/hooks/__tests__/publicHooks.spec.tsx`

- [ ] **Step 1: Add scale hook imports**

Add to existing import line:
```typescript
import { ..., useXAxisScale, useYAxisScale, useXAxisInverseScale, useYAxisInverseScale, useXAxisInverseDataSnapScale, useYAxisInverseDataSnapScale, useXAxisInverseTickSnapScale, useYAxisInverseTickSnapScale, useCartesianScale } from '../publicHooks'
```

- [ ] **Step 2: Add `useXAxisScale` test**

```tsx
describe('Scale public hooks', () => {
  beforeEach(() => {
    mockGetBoundingClientRect({ width: 500, height: 300 })
  })

  const data = [
    { name: 'A', value: 100 },
    { name: 'B', value: 200 },
    { name: 'C', value: 300 },
  ]

  describe('useXAxisScale', () => {
    it('returns a function that maps data values to pixel coordinates', async () => {
      let scaleFn: any

      const SpyComponent = defineComponent({
        setup() {
          const scale = useXAxisScale()
          return () => {
            scaleFn = scale.value
            return <text data-testid="spy" />
          }
        },
      })

      render(() => (
        <LineChart width={500} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Line dataKey="value" isAnimationActive={false} />
          <Customized>
            {{ default: () => <SpyComponent /> }}
          </Customized>
        </LineChart>
      ))

      await nextTick()
      await nextTick()

      expect(scaleFn).toBeDefined()
      expect(typeof scaleFn).toBe('function')

      const pixelA = scaleFn('A')
      const pixelC = scaleFn('C')
      expect(typeof pixelA).toBe('number')
      expect(typeof pixelC).toBe('number')
      // A should be left of C
      expect(pixelA).toBeLessThan(pixelC!)
    })
  })

  describe('useYAxisScale', () => {
    it('returns a function that maps numeric values to pixel coordinates', async () => {
      let scaleFn: any

      const SpyComponent = defineComponent({
        setup() {
          const scale = useYAxisScale()
          return () => {
            scaleFn = scale.value
            return <text data-testid="spy" />
          }
        },
      })

      render(() => (
        <LineChart width={500} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Line dataKey="value" isAnimationActive={false} />
          <Customized>
            {{ default: () => <SpyComponent /> }}
          </Customized>
        </LineChart>
      ))

      await nextTick()
      await nextTick()

      expect(scaleFn).toBeDefined()
      const pixel100 = scaleFn(100)
      const pixel300 = scaleFn(300)
      expect(typeof pixel100).toBe('number')
      // In SVG, higher values have lower y coordinates
      expect(pixel100).toBeGreaterThan(pixel300!)
    })
  })

  describe('useXAxisInverseScale', () => {
    it('returns a function that maps pixel coordinates back to data values', async () => {
      let scaleFn: any
      let inverseFn: any

      const SpyComponent = defineComponent({
        setup() {
          const scale = useXAxisScale()
          const inverse = useXAxisInverseScale()
          return () => {
            scaleFn = scale.value
            inverseFn = inverse.value
            return <text data-testid="spy" />
          }
        },
      })

      render(() => (
        <LineChart width={500} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Line dataKey="value" isAnimationActive={false} />
          <Customized>
            {{ default: () => <SpyComponent /> }}
          </Customized>
        </LineChart>
      ))

      await nextTick()
      await nextTick()

      expect(inverseFn).toBeDefined()
      // For categorical axis, inverse should snap to closest category
      const pixelA = scaleFn('A')
      const result = inverseFn(pixelA)
      expect(result).toBe('A')
    })
  })

  describe('useXAxisInverseDataSnapScale', () => {
    it('snaps to closest data point value', async () => {
      let dataSnapFn: any

      const SpyComponent = defineComponent({
        setup() {
          const snap = useXAxisInverseDataSnapScale()
          return () => {
            dataSnapFn = snap.value
            return <text data-testid="spy" />
          }
        },
      })

      render(() => (
        <LineChart width={500} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Line dataKey="value" isAnimationActive={false} />
          <Customized>
            {{ default: () => <SpyComponent /> }}
          </Customized>
        </LineChart>
      ))

      await nextTick()
      await nextTick()

      expect(dataSnapFn).toBeDefined()
      expect(typeof dataSnapFn).toBe('function')
    })
  })

  describe('useXAxisInverseTickSnapScale', () => {
    it('snaps to closest tick value', async () => {
      let tickSnapFn: any

      const SpyComponent = defineComponent({
        setup() {
          const snap = useXAxisInverseTickSnapScale()
          return () => {
            tickSnapFn = snap.value
            return <text data-testid="spy" />
          }
        },
      })

      render(() => (
        <LineChart width={500} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Line dataKey="value" isAnimationActive={false} />
          <Customized>
            {{ default: () => <SpyComponent /> }}
          </Customized>
        </LineChart>
      ))

      await nextTick()
      await nextTick()

      expect(tickSnapFn).toBeDefined()
      expect(typeof tickSnapFn).toBe('function')
    })
  })

  describe('useCartesianScale', () => {
    it('converts data point to pixel coordinates', async () => {
      let coords: any

      const SpyComponent = defineComponent({
        setup() {
          const c = useCartesianScale({ x: 'B', y: 200 })
          return () => {
            coords = c.value
            return <text data-testid="spy" />
          }
        },
      })

      render(() => (
        <LineChart width={500} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Line dataKey="value" isAnimationActive={false} />
          <Customized>
            {{ default: () => <SpyComponent /> }}
          </Customized>
        </LineChart>
      ))

      await nextTick()
      await nextTick()

      expect(coords).toBeDefined()
      expect(typeof coords.x).toBe('number')
      expect(typeof coords.y).toBe('number')
      // Should be within chart area
      expect(coords.x).toBeGreaterThan(0)
      expect(coords.x).toBeLessThan(500)
      expect(coords.y).toBeGreaterThan(0)
      expect(coords.y).toBeLessThan(300)
    })
  })
})
```

- [ ] **Step 3: Run all tests**

Run: `cd /Users/huangpeng/Documents/workspace/web/mygithub/charts/vue-charts && pnpm test packages/vue/src/hooks/__tests__/publicHooks.spec.tsx`

- [ ] **Step 4:** Commit

```bash
git add packages/vue/src/hooks/__tests__/publicHooks.spec.tsx
git commit -m "test: add integration tests for public scale hooks"
```

---

### Task 6: Update todo.md

**Files:**
- Modify: `tasks/todo.md`

- [ ] **Step 1:** Check off all Scale Hooks items in section 3.4
- [ ] **Step 2:** Add completion record entry
- [ ] **Step 3:** Commit

```bash
git add tasks/todo.md
git commit -m "docs: mark Scale Hooks as complete in todo"
```

---

## Execution Order

Tasks 0 → 1 → 2 → 3 → 4 → 5 → 6 (sequential — each depends on prior)

## Verification

After all tasks, run full test suite: `pnpm test`
