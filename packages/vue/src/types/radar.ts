import type { DataKey } from '@/types'
import type { RechartsScale } from '@/types/scale'

export type RadiusAxisForRadar = { scale: RechartsScale }

export type AngleAxisForRadar = {
  scale: RechartsScale
  type: 'number' | 'category'
  dataKey: DataKey<any>
  cx: number
  cy: number
}

interface RadarPoint {
  x: number
  y: number
  cx?: number
  cy?: number
  angle?: number
  radius?: number
  value?: number
  payload?: any
  name?: string
}
export type RadarComposedData = {
  points: RadarPoint[]
  baseLinePoints: RadarPoint[]
  isRange: boolean
}
