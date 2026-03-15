import type { PropType } from 'vue'
import type { ViewBox } from '@/cartesian/type'
import type { TrapezoidProps } from '@/shape'
import type { Coordinate, DataKey, TooltipType, WithSVGProps } from '@/types'
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

export const FunnelVueProps = {
  data: { type: Array as PropType<Array<Record<string, unknown>>>, default: undefined },
  dataKey: { type: [String, Number, Function] as PropType<DataKey<any>>, required: true as const },
  nameKey: { type: [String, Number, Function] as PropType<DataKey<any>>, default: 'name' },
  lastShapeType: { type: String as PropType<'triangle' | 'rectangle'>, default: 'triangle' },
  reversed: { type: Boolean, default: false },
  fill: { type: String, default: '#808080' },
  stroke: { type: String, default: '#fff' },
  legendType: { type: String as PropType<LegendType>, default: 'rect' },
  tooltipType: { type: String as PropType<TooltipType>, default: undefined },
  hide: { type: Boolean, default: false },
  isAnimationActive: { type: Boolean, default: true },
  animationBegin: { type: Number, default: 400 },
  animationDuration: { type: Number, default: 1500 },
  animationEasing: { type: String as PropType<AnimationEasing>, default: 'ease' },
  className: { type: String, default: undefined },
  width: { type: [Number, String] as PropType<number | string>, default: undefined },
}

export type FunnelPropsWithSVG = WithSVGProps<typeof FunnelVueProps>

type RealFunnelData = any

export type FunnelComposedData = {
  trapezoids: ReadonlyArray<FunnelTrapezoidItem>
  data: RealFunnelData[]
}
