import type { Coordinate } from '@/types/common'

export type BarPositionPosition = {
  /**
   * Offset is returned always from zero position.
   * So in a way it's "absolute".
   *
   * NOT inbetween bars, but always from zero.
   */
  offset: number
  /**
   * Size of the bar.
   * This will be usually a number.
   * But if the input data is not well-formed, undefined or NaN will be on the output too.
   */
  size: number | undefined | typeof NaN
}

export type RectRadius = [number, number, number, number]

export type AnimationEasing = 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear'

interface RectangleProps {
  className?: string
  x?: number
  y?: number
  width?: number
  height?: number
  radius?: number | RectRadius
  isAnimationActive?: boolean
  isUpdateAnimationActive?: boolean
  animationBegin?: number
  animationDuration?: number
  animationEasing?: AnimationEasing
}

export interface BarRectangleItem extends RectangleProps {
  value?: number | [number, number]
  /** the original data entry */
  payload?: any
  /** the coordinate of background rectangle */
  background?: {
    x?: number
    y?: number
    width?: number
    height?: number
  }
  tooltipPosition: Coordinate
}

export type ErrorBarDirection = 'x' | 'y'
