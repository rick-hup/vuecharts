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
import type { FunctionalComponent, PropType } from 'vue'
import type { LegendType } from '@/types/legend'
import type { MinPointSize } from '@/shape'
import type { RectangleProps } from '@/shape/Rectangle'

export type BarShapeFunction = FunctionalComponent<RectangleProps>

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
  fill: { type: String, default: undefined },
  stroke: { type: String, default: undefined },
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
    type: [Boolean, Object] as PropType<boolean | Record<string, any>>,
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
  activeBar: { type: [Object, Boolean, Function] as PropType<Record<string, any> | boolean>, default: false },
  id: { type: String, default: undefined },
  stackId: {
    type: [String, Number] as PropType<string | number>,
    default: undefined,
  },
  xAxisId: { type: [String, Number] as PropType<AxisId>, default: 0 },
  yAxisId: { type: [String, Number] as PropType<AxisId>, default: 0 },
  animationBegin: { type: Number, default: 0 },
  animationDuration: { type: Number, default: 1500 },
  animationEasing: { type: String, default: 'ease' },

  transition: {
    type: Object as PropType<AnimationOptions>,
    default: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  needClip: { type: Boolean, default: false },
  label: {
    type: [Boolean, Object] as PropType<boolean | Record<string, any>>,
    default: false,
  },
  shape: {
    type: [Function, Object] as PropType<BarShapeFunction>,
    default: undefined,
  },
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
