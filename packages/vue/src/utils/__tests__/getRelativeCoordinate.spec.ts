import { describe, expect, it } from 'vitest'
import { getRelativeCoordinate } from '@/utils/getRelativeCoordinate'

describe('getRelativeCoordinate', () => {
  it('returns relative coordinates from a mouse event', () => {
    const rect = { left: 100, top: 50, width: 500, height: 500 }
    const mockTarget = {
      getBoundingClientRect: () => ({ ...rect, right: 600, bottom: 550 }),
      offsetWidth: 500,
      offsetHeight: 500,
    }
    const event = {
      clientX: 350,
      clientY: 200,
      currentTarget: mockTarget,
    } as any

    const { relativeX, relativeY } = getRelativeCoordinate(event)
    expect(relativeX).toBe(250) // 350 - 100
    expect(relativeY).toBe(150) // 200 - 50
  })

  it('uses inline style width/height when the element is flexbox-stretched smaller than its declared size', () => {
    // Simulates the case where CSS flexbox shrinks the chart wrapper div from
    // 500px (its declared width) down to 254px (the container width).
    // offsetWidth reflects the stretched size (254), but the SVG coordinate
    // space is still 500x500. The scale must be 254/500, not 254/254=1.
    const rect = { left: 10, top: 10, width: 254, height: 254 }
    const mockTarget = {
      getBoundingClientRect: () => ({ ...rect, right: 264, bottom: 264 }),
      offsetWidth: 254,
      offsetHeight: 254,
      style: { width: '500px', height: '500px' },
    }
    const event = {
      clientX: 10 + 127, // click at horizontal center of 254px display
      clientY: 10 + 127, // click at vertical center of 254px display
      currentTarget: mockTarget,
    } as any

    const { relativeX, relativeY } = getRelativeCoordinate(event)
    // Center of display (127px) should map to center of SVG coordinate space (250)
    expect(relativeX).toBe(250) // 127 / (254/500) = 127 / 0.508 ≈ 250
    expect(relativeY).toBe(250)
  })

  it('falls back to offsetWidth when no inline style is set', () => {
    const rect = { left: 0, top: 0, width: 300, height: 300 }
    const mockTarget = {
      getBoundingClientRect: () => ({ ...rect, right: 300, bottom: 300 }),
      offsetWidth: 300,
      offsetHeight: 300,
      style: { width: '', height: '' },
    }
    const event = {
      clientX: 150,
      clientY: 150,
      currentTarget: mockTarget,
    } as any

    const { relativeX, relativeY } = getRelativeCoordinate(event)
    expect(relativeX).toBe(150)
    expect(relativeY).toBe(150)
  })
})
