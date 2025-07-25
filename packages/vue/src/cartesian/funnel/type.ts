import type { ViewBox } from '@/cartesian/type'
import type { TrapezoidProps } from '@/shape'
import type { Coordinate, DataKey, TooltipType } from '@/types'
import type { AnimationEasing } from '@/types/bar'
import type { LegendType } from '@/types/legend'

export interface FunnelTrapezoidItem extends TrapezoidProps {
  value?: number | string
  payload?: any
  isActive: boolean
  tooltipPosition: Coordinate
  parentViewBox?: ViewBox
  labelViewBox?: ViewBox
}

export interface FunnelProps {
  // activeShape?: ActiveShape<FunnelTrapezoidItem, SVGPathElement>
  animationBegin?: number
  animationDuration?: number
  animationEasing?: AnimationEasing
  className?: string
  data?: any[]
  dataKey: DataKey<any>
  hide?: boolean
  id?: string
  isAnimationActive?: boolean
  // label?: ImplicitLabelListType<any>
  lastShapeType?: 'triangle' | 'rectangle'
  legendType?: LegendType
  nameKey?: DataKey<any>
  onAnimationEnd?: () => void
  onAnimationStart?: () => void
  reversed?: boolean
  // shape?: ActiveShape<FunnelTrapezoidItem, SVGPathElement>
  tooltipType?: TooltipType
}

type RealFunnelData = any

export type FunnelComposedData = {
  trapezoids: ReadonlyArray<FunnelTrapezoidItem>
  data: RealFunnelData[]
}
