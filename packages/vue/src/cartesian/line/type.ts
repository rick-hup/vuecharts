import type { Point } from '@/shape'
import type { AnimationDuration, DataKey, LayoutType, TooltipType } from '@/types'
import type { AxisId } from '@/types/axis'
import type { AnimationEasing } from '@/types/bar'
import type { LegendType } from '@/types/legend'
import type { CurveFactory } from 'victory-vendor/d3-shape'

export interface LinePointItem extends Point {
  readonly value?: number
  readonly payload?: any
}

export type CurveType =
  | 'basis'
  | 'basisClosed'
  | 'basisOpen'
  | 'bumpX'
  | 'bumpY'
  | 'bump'
  | 'linear'
  | 'linearClosed'
  | 'natural'
  | 'monotoneX'
  | 'monotoneY'
  | 'monotone'
  | 'step'
  | 'stepBefore'
  | 'stepAfter'
  | CurveFactory

interface CurveProps {
  className?: string
  type?: CurveType
  layout?: LayoutType
  baseLine?: number | ReadonlyArray<Point>
  points?: ReadonlyArray<Point>
  connectNulls?: boolean
  path?: string
}
export interface LineProps extends CurveProps {
  // activeDot?: ActiveDotType
  animateNewValues?: boolean
  animationBegin?: number
  animationDuration?: AnimationDuration
  animationEasing?: AnimationEasing
  className?: string
  connectNulls?: boolean
  data?: any
  dataKey?: DataKey<any>
  // dot?: ActiveDotType
  hide?: boolean

  id?: string
  isAnimationActive?: boolean

  // label?: ImplicitLabelType
  legendType?: LegendType

  name?: string | number
  onAnimationEnd?: () => void
  onAnimationStart?: () => void
  tooltipType?: TooltipType
  type?: CurveType
  unit?: string | number
  xAxisId?: AxisId
  yAxisId?: AxisId
}
