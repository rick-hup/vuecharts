import type { AnimationEasing } from '@/types/bar'

export interface Point {
  readonly x: number
  readonly y: number
}

export type MinPointSize = number | ((value: number, index: number) => number)

export type NormalizedStackId = string

export interface TrapezoidProps {
  className?: string
  x?: number
  y?: number
  width?: number
  upperWidth?: number
  lowerWidth?: number
  height?: number

  isUpdateAnimationActive?: boolean
  animationBegin?: number
  animationDuration?: number
  animationEasing?: AnimationEasing
}
