import { isWellBehavedNumber } from '@/utils/validate'
import type { RechartsScale } from '@/types/scale'

/**
 * Convert a data value to pixel coordinate using a D3 scale.
 * Automatically centers on band-scale categories by adding half the bandwidth.
 */
export function scaleCoord(scale: RechartsScale, value: number | string): number | undefined {
  const coord = scale(value) as number
  if (!isWellBehavedNumber(coord))
    return undefined
  const bandwidth = scale.bandwidth?.() ?? 0
  return coord + bandwidth / 2
}

/**
 * Convert a data value to pixel coordinate for range boundaries.
 * `start` returns the left/top edge; `end` returns the right/bottom edge (adding full bandwidth).
 */
export function scaleValue(scale: RechartsScale, value: number | string, position: 'start' | 'end'): number | undefined {
  const coord = scale(value) as number
  if (!isWellBehavedNumber(coord))
    return undefined
  const bandwidth = scale.bandwidth?.() ?? 0
  return position === 'start' ? coord : coord + bandwidth
}

/**
 * Check whether a pixel coordinate falls within the scale's output range.
 */
export function isInRange(scale: RechartsScale, coord: number): boolean {
  const r = scale.range() as number[]
  const min = Math.min(r[0], r[1])
  const max = Math.max(r[0], r[1])
  return coord >= min && coord <= max
}

/**
 * Get the minimum value of a scale's range.
 */
export function rangeMin(scale: RechartsScale): number {
  const r = scale.range() as number[]
  return Math.min(r[0], r[1])
}

/**
 * Get the maximum value of a scale's range.
 */
export function rangeMax(scale: RechartsScale): number {
  const r = scale.range() as number[]
  return Math.max(r[0], r[1])
}
