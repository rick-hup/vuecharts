import type { ChartData } from '@/state/chartDataSlice'
import type {
  DataKey,
  LayoutType,
  TooltipType,
  VuePropsToType,
  WithSVGProps,
} from '@/types'
import type { AnimationOptions } from 'motion-v'
import type { BaseValue } from '@/types/area'
import type { AxisId } from '@/types/axis'
import type { LegendType } from '@/types/legend'
import type { PropType } from 'vue'
import { CurveVueProps } from '@/shape/Curve'

export const AreaVueProps = {
  ...CurveVueProps,
  layout: { type: String as PropType<LayoutType>, default: 'horizontal' },
  activeDot: { type: Boolean, default: true },
  baseValue: {
    type: [Number, String] as PropType<BaseValue>,
    default: undefined,
  },
  connectNulls: { type: Boolean, default: false },
  data: { type: Array as PropType<ChartData>, default: undefined },
  dataKey: {
    type: [String, Number, Function] as PropType<DataKey<any>>,
    required: true,
  },
  dot: { type: Boolean, default: false },
  fill: { type: String, default: '#3182bd' },
  fillOpacity: { type: Number, default: 0.6 },
  strokeWidth: { type: Number },
  stroke: { type: String, default: '#3182bd' },
  hide: { type: Boolean, default: false },
  isAnimationActive: { type: Boolean, default: true },
  /**
   * Label for each data point.
   * - boolean: true for default label rendering
   * - object: config object for label style/behavior
   * - function: custom render function
   * - VNode: custom Vue element
   */
  label: {
    type: [Boolean, Object, Function] as PropType<
      | boolean
      | Record<string, any>
      | ((props: any) => any)
    >,
    default: undefined,
  },
  legendType: { type: String as PropType<LegendType>, default: 'line' },
  onAnimationEnd: {
    type: Function as PropType<() => void>,
    default: undefined,
  },
  onAnimationStart: {
    type: Function as PropType<() => void>,
    default: undefined,
  },
  transition: {
    type: Object as PropType<AnimationOptions>,
    default: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
  needClip: { type: Boolean, default: false },
  stackId: {
    type: [String, Number] as PropType<string | number>,
    default: undefined,
  },
  tooltipType: { type: String as PropType<TooltipType>, default: undefined },
  unit: {
    type: [String, Number] as PropType<string | number>,
    default: undefined,
  },
  xAxisId: { type: [String, Number] as PropType<AxisId>, default: 0 },
  yAxisId: { type: [String, Number] as PropType<AxisId> },
  activeIndex: { type: Number, default: undefined },
  activePoint: { type: Object as PropType<any>, default: undefined },
  id: { type: String, default: undefined },
  left: { type: Number, default: 0 },
  top: { type: Number, default: 0 },
  width: { type: Number, default: 0 },
  height: { type: Number, default: 0 },
  name: { type: [String, Number] as PropType<string | number> },
  class: { type: String, default: undefined },
}

export type AreaPropsWithOutSVG = VuePropsToType<typeof AreaVueProps>
export type AreaProps = WithSVGProps<
  typeof AreaVueProps
>
