import { render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import { Polygon } from '@/shape/Polygon'

describe('<Polygon />', () => {
  const trianglePoints = [
    { x: 100, y: 0 },
    { x: 200, y: 200 },
    { x: 0, y: 200 },
  ]

  it('renders a path from an array of points', () => {
    const { container } = render(() => (
      <Polygon points={trianglePoints} fill="#ff0000" stroke="#000" />
    ))

    const path = container.querySelector('.v-charts-polygon')
    expect(path).not.toBeNull()
    expect(path!.getAttribute('d')).toBe('M100,0L200,200L0,200Z')
  })

  it('does not render when points is empty', () => {
    const { container } = render(() => (
      <Polygon points={[]} />
    ))

    expect(container.querySelectorAll('.v-charts-polygon')).toHaveLength(0)
  })

  it('does not render when points is undefined', () => {
    const { container } = render(() => (
      <Polygon />
    ))

    expect(container.querySelectorAll('.v-charts-polygon')).toHaveLength(0)
  })

  it('does not render when points contain invalid coordinates', () => {
    const { container } = render(() => (
      <Polygon points={[{ x: NaN, y: 0 }, { x: 100, y: 100 }]} />
    ))

    expect(container.querySelectorAll('.v-charts-polygon')).toHaveLength(0)
  })

  it('passes through SVG attributes', () => {
    const { container } = render(() => (
      <Polygon points={trianglePoints} fill="#ff0000" stroke="#000" stroke-width={2} />
    ))

    const path = container.querySelector('.v-charts-polygon')
    expect(path).not.toBeNull()
    expect(path!.getAttribute('fill')).toBe('#ff0000')
    expect(path!.getAttribute('stroke')).toBe('#000')
    expect(path!.getAttribute('stroke-width')).toBe('2')
  })

  it('renders a single-point polygon', () => {
    const { container } = render(() => (
      <Polygon points={[{ x: 50, y: 50 }]} />
    ))

    const path = container.querySelector('.v-charts-polygon')
    expect(path).not.toBeNull()
    expect(path!.getAttribute('d')).toBe('M50,50Z')
  })
})
