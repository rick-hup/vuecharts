import { expect } from 'vitest'

export type ExpectedArea = {
  d: string
}

export function assertNotNull<T>(item: T): asserts item is NonNullable<T> {
  if (item == null) {
    throw new Error('Unexpected null')
  }
}

export function getBarRectangles(container: Element): NodeListOf<Element> {
  return container.querySelectorAll('.v-charts-bar-rectangle')
}

export function getBarRects(container: Element): Element[] {
  return Array.from(getBarRectangles(container)).map((layer) => {
    const rect = layer.querySelector('rect')
    assertNotNull(rect)
    return rect
  })
}

export function expectAreaCurve(container: Element, expectedAreas: ReadonlyArray<ExpectedArea>) {
  assertNotNull(container)
  const areaCurves = container.querySelectorAll('.v-charts-area-curve')
  assertNotNull(areaCurves)
  const actualAreas = Array.from(areaCurves).map(area => ({ d: area.getAttribute('d') ?? '' }))
  expect(actualAreas).toEqual(expectedAreas)
}
