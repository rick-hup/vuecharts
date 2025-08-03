import type { ChartData } from '@/state/chartDataSlice'
import type {
  Coordinate,
  DataKey,
  TooltipType,
  VuePropsToType,
  WithSVGProps,
} from '@/types'
import type { AnimationOptions } from 'motion-v'
import type { AxisId } from '@/types/axis'
import type { PropType } from 'vue'
import type { LegendType } from '@/types/legend'
import type { MinPointSize } from '@/shape'

export type Rectangle = {
  x: number | null
  y: number | null
  width: number
  height: number
}

export type BarRectangleItem = {
  value?: number | [number, number]
  background?: Rectangle
  tooltipPosition: Coordinate
  readonly payload?: any
  x: number | null
  y: number | null
  width: number
  height: number
}

export const BarVueProps = {
  class: { type: String, default: undefined },
  barSize: { type: [String, Number] as PropType<string | number> },
  data: { type: Array as PropType<ChartData>, default: undefined },
  dataKey: {
    type: [String, Number, Function] as PropType<DataKey<any>>,
    required: true,
  },
  fill: { type: String, default: '#3182bd' },
  stroke: { type: String, default: '#3182bd' },
  strokeWidth: { type: Number, default: 0 },
  unit: {
    type: [String, Number] as PropType<string | number>,
    default: undefined,
  },
  name: { type: [String, Number] as PropType<string | number> },
  tooltipType: { type: String as PropType<TooltipType>, default: undefined },
  legendType: { type: String as PropType<LegendType>, default: 'rect' },
  minPointSize: { type: [Number, Function] as PropType<MinPointSize>, default: 0 },
  maxBarSize: { type: Number },
  hide: { type: Boolean, default: false },
  background: {
    type: Boolean,
    default: false,
  },
  radius: {
    type: [Number, Array] as PropType<number | [number, number, number, number]>,
    default: undefined,
  },
  onAnimationStart: {
    type: Function as PropType<() => void>,
    default: undefined,
  },
  onAnimationEnd: {
    type: Function as PropType<() => void>,
    default: undefined,
  },
  isAnimationActive: { type: Boolean, default: true },
  id: { type: String, default: undefined },
  stackId: {
    type: [String, Number] as PropType<string | number>,
    default: undefined,
  },
  xAxisId: { type: [String, Number] as PropType<AxisId>, default: 0 },
  yAxisId: { type: [String, Number] as PropType<AxisId>, default: 0 },

  transition: {
    type: Object as PropType<AnimationOptions>,
    default: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  needClip: { type: Boolean, default: false },
}

export type BarProps = VuePropsToType<typeof BarVueProps>
export type BarPropsWithSVG = WithSVGProps<typeof BarVueProps>

export type BarSettings = {
  barSize?: string | number
  data?: ChartData
  dataKey: DataKey<any>
  maxBarSize?: number
  minPointSize: MinPointSize
  stackId?: string | number
}

export type BarMouseEvent = (
  data: BarRectangleItem,
  index: number,
  event: MouseEvent,
) => void

export interface BarEvents {
  onClick: BarMouseEvent
  onMouseEnter: BarMouseEvent
  onMouseLeave: BarMouseEvent
  onMouseMove: BarMouseEvent
}
