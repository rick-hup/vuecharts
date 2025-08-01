import type { Coordinate } from '@/types'

export type RadialCursorPoints = {
  points: [startPoint: Coordinate, endPoint: Coordinate]
  cx?: number
  cy?: number
  radius?: number
  startAngle?: number
  endAngle?: number
}
