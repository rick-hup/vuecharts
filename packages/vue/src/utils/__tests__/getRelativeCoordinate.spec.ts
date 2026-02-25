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
})
