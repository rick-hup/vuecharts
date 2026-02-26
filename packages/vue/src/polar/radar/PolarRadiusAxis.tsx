import { defineComponent, onUnmounted, watchEffect } from 'vue'
import type { PropType } from 'vue'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { addRadiusAxis, removeRadiusAxis } from '@/state/polarAxisSlice'
import { selectPolarAxisTicks } from '@/state/selectors/polarScaleSelectors'
import { selectPolarViewBox } from '@/state/selectors/polarAxisSelectors'
import { polarToCartesian } from '@/utils/polar'
import type { AxisDomain } from '@/types/axis'
import type { AxisTick } from '@/types/tick'
import type { DataKey } from '@/types'
import Text from '@/components/Text.vue'

export const PolarRadiusAxis = defineComponent({
  name: 'PolarRadiusAxis',
  props: {
    radiusAxisId: { type: [String, Number] as PropType<string | number>, default: 0 },
    dataKey: { type: [String, Number, Function] as PropType<DataKey<any>>, default: undefined },
    angle: { type: Number, default: 0 },
    tick: { type: Boolean, default: true },
    axisLine: { type: Boolean, default: true },
    orientation: { type: String as PropType<'left' | 'right' | 'middle'>, default: 'right' },
    tickFormatter: { type: Function as PropType<(value: any, index: number) => string>, default: undefined },
    ticks: { type: Array as PropType<ReadonlyArray<AxisTick>>, default: undefined },
    tickCount: { type: Number, default: 5 },
    domain: { type: Array as PropType<AxisDomain>, default: undefined },
    type: { type: String as PropType<'number' | 'category'>, default: 'number' },
    stroke: { type: String, default: '#ccc' },
    allowDecimals: { type: Boolean, default: false },
  },
  setup(props) {
    const dispatch = useAppDispatch()

    let prevSettings: any = null
    watchEffect(() => {
      const settings = {
        id: props.radiusAxisId,
        type: props.type,
        dataKey: props.dataKey,
        scale: 'auto' as const,
        allowDuplicatedCategory: true,
        allowDataOverflow: props.domain != null,
        reversed: false,
        includeHidden: false,
        domain: props.domain,
        unit: undefined,
        name: undefined,
        allowDecimals: props.allowDecimals,
        tickCount: props.tickCount,
        ticks: props.ticks,
        tick: props.tick,
      }
      dispatch(addRadiusAxis(settings))
      prevSettings = settings
    })

    onUnmounted(() => {
      if (prevSettings) {
        dispatch(removeRadiusAxis(prevSettings))
        prevSettings = null
      }
    })

    const polarViewBox = useAppSelector(state => selectPolarViewBox(state))
    const ticks = useAppSelector(state => selectPolarAxisTicks(state, 'radiusAxis', props.radiusAxisId, false))

    return () => {
      const viewBox = polarViewBox.value
      const tickItems = ticks.value

      if (viewBox == null || !props.tick || tickItems == null || tickItems.length === 0) {
        return null
      }

      const { cx, cy } = viewBox
      const { angle, orientation, axisLine, tick, tickFormatter, stroke } = props

      const textAnchor = orientation === 'left' ? 'end' : orientation === 'right' ? 'start' : 'middle'

      // Compute axis line extent from min to max tick coordinate
      const coords = tickItems.map(t => t.coordinate)
      const minR = Math.min(...coords)
      const maxR = Math.max(...coords)

      return (
        <g class="v-charts-polar-radius-axis">
          {axisLine && (
            (() => {
              const p0 = polarToCartesian(cx, cy, minR, angle)
              const p1 = polarToCartesian(cx, cy, maxR, angle)
              return (
                <line
                  class="v-charts-polar-radius-axis-line"
                  x1={p0.x}
                  y1={p0.y}
                  x2={p1.x}
                  y2={p1.y}
                  stroke={stroke}
                  fill="none"
                />
              )
            })()
          )}
          {tick && (
            <g class="v-charts-polar-radius-axis-ticks">
              {tickItems.map((entry, i) => {
                const coord = polarToCartesian(cx, cy, entry.coordinate, angle)
                const value = tickFormatter ? tickFormatter(entry.value, i) : entry.value
                return (
                  <Text
                    key={`tick-${entry.coordinate}`}
                    class="v-charts-polar-radius-axis-tick-value"
                    x={coord.x}
                    y={coord.y}
                    textAnchor={textAnchor}
                    verticalAnchor="middle"
                    fill={stroke}
                    angle={90 - angle}
                    value={String(value)}
                  />
                )
              })}
            </g>
          )}
        </g>
      )
    }
  },
})
