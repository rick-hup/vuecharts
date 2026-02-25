import { describe, expect, it } from 'vitest'
import { getRelativeCoordinate } from '@/utils/getRelativeCoordinate'

/** Build a minimal SVG mock whose CTM encodes the given transform. */
function makeSvgMock(scaleX: number, scaleY: number, originX: number, originY: number) {
  return {
    getScreenCTM: () => ({ inverse: () => ({ scaleX, scaleY, originX, originY }) }),
    createSVGPoint() {
      let _x = 0
      let _y = 0
      return {
        get x() { return _x },
        set x(v) { _x = v },
        get y() { return _y },
        set y(v) { _y = v },
        matrixTransform(m: { scaleX: number, scaleY: number, originX: number, originY: number }) {
          return {
            x: (_x - m.originX) / m.scaleX,
            y: (_y - m.originY) / m.scaleY,
          }
        },
      }
    },
  }
}

describe('getRelativeCoordinate', () => {
  it('uses SVG getScreenCTM when a child SVG is present (square viewport, no letterboxing)', () => {
    // Wrapper div is square 500×500, SVG scales 1:1, origin at (100, 50)
    const svgMock = makeSvgMock(1, 1, 100, 50)
    const event = {
      clientX: 350,
      clientY: 200,
      currentTarget: {
        querySelector: (_sel: string) => svgMock,
      },
    } as any

    const { relativeX, relativeY } = getRelativeCoordinate(event)
    expect(relativeX).toBe(250) // (350 - 100) / 1
    expect(relativeY).toBe(150) // (200 - 50) / 1
  })

  it('uses SVG getScreenCTM and handles preserveAspectRatio letterboxing (non-square viewport)', () => {
    // Simulates the case where the wrapper is flex-shrunk to 358×500.
    // The SVG viewBox is 500×500, so preserveAspectRatio="xMidYMid meet" scales
    // uniformly by 358/500 ≈ 0.716 and centers content vertically (+71px offset).
    //
    // SVG CTM: scale=0.716 uniform, origin at (60.8 viewport-left, 220.8 = wrapper-top + 71)
    const scale = 358 / 500
    const svgOriginX = 60.8
    const svgOriginY = 150 + (500 - 500 * scale) / 2 // 150 + 71 = 221
    const svgMock = makeSvgMock(scale, scale, svgOriginX, svgOriginY)

    // User clicks at the TOP of the pie: SVG coord (250, 50)
    // Screen position = (svgOriginX + 250*scale, svgOriginY + 50*scale)
    const clickX = svgOriginX + 250 * scale
    const clickY = svgOriginY + 50 * scale

    const event = {
      clientX: clickX,
      clientY: clickY,
      currentTarget: {
        querySelector: (_sel: string) => svgMock,
      },
    } as any

    const { relativeX, relativeY } = getRelativeCoordinate(event)
    expect(relativeX).toBe(250)
    expect(relativeY).toBe(50)
  })

  it('falls back to style.width/height when no child SVG is found', () => {
    // No querySelector result — falls back to inline-style coordinate space
    const rect = { left: 10, top: 10, width: 254, height: 254 }
    const mockTarget = {
      getBoundingClientRect: () => ({ ...rect, right: 264, bottom: 264 }),
      offsetWidth: 254,
      offsetHeight: 254,
      style: { width: '500px', height: '500px' },
      querySelector: (_sel: string) => null,
    }
    const event = {
      clientX: 10 + 127,
      clientY: 10 + 127,
      currentTarget: mockTarget,
    } as any

    const { relativeX, relativeY } = getRelativeCoordinate(event)
    expect(relativeX).toBe(250) // 127 / (254/500) = 250
    expect(relativeY).toBe(250)
  })

  it('falls back to offsetWidth when no inline style and no SVG', () => {
    const rect = { left: 0, top: 0, width: 300, height: 300 }
    const mockTarget = {
      getBoundingClientRect: () => ({ ...rect, right: 300, bottom: 300 }),
      offsetWidth: 300,
      offsetHeight: 300,
      style: { width: '', height: '' },
      querySelector: (_sel: string) => null,
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
