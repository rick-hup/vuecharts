import { expect } from 'vitest'

export type ExpectedArea = {
  d: string
}

export function assertNotNull<T>(item: T): asserts item is NonNullable<T> {
  if (item == null) {
    throw new Error('Unexpected null')
  }
}

export function expectAreaCurve(container: Element, expectedAreas: ReadonlyArray<ExpectedArea>) {
  assertNotNull(container)
  const areaCurves = container.querySelectorAll('.v-charts-area-curve')
  assertNotNull(areaCurves)
  const actualAreas = Array.from(areaCurves).map(area => ({ d: area.getAttribute('d') ?? '' }))
  expect(actualAreas).toEqual(expectedAreas)
}
