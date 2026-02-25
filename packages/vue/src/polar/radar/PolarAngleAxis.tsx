import { defineComponent, onUnmounted, watchEffect } from 'vue'
import type { PropType } from 'vue'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { addAngleAxis, removeAngleAxis } from '@/state/polarAxisSlice'
import { selectPolarAxisTicks } from '@/state/selectors/polarScaleSelectors'
import { selectPolarViewBox } from '@/state/selectors/polarAxisSelectors'
import { polarToCartesian, RADIAN } from '@/utils/polar'
import type { DataKey } from '@/types'
import type { AxisTick } from '@/types/tick'
import Text from '@/components/Text.vue'

const eps = 1e-5
const COS_45 = Math.cos(45 * RADIAN)

function getTickTextAnchor(coordinate: number, orientation: 'inner' | 'outer'): string {
  const cos = Math.cos(-coordinate * RADIAN)
  if (cos > eps) return orientation === 'outer' ? 'start' : 'end'
  if (cos < -eps) return orientation === 'outer' ? 'end' : 'start'
  return 'middle'
}

function getTickVerticalAnchor(coordinate: number): string {
  const cos = Math.cos(-coordinate * RADIAN)
  const sin = Math.sin(-coordinate * RADIAN)
  if (Math.abs(cos) <= COS_45) {
    return sin > 0 ? 'start' : 'end'
  }
  return 'middle'
}

export const PolarAngleAxis = defineComponent({
  name: 'PolarAngleAxis',
  props: {
    angleAxisId: { type: [String, Number] as PropType<string | number>, default: 0 },
    dataKey: { type: [String, Number, Function] as PropType<DataKey<any>>, default: undefined },
    tick: { type: Boolean, default: true },
    tickLine: { type: Boolean, default: true },
    tickSize: { type: Number, default: 8 },
    axisLine: { type: Boolean, default: true },
    axisLineType: { type: String as PropType<'polygon' | 'circle'>, default: 'polygon' },
    orientation: { type: String as PropType<'inner' | 'outer'>, default: 'outer' },
    tickFormatter: { type: Function as PropType<(value: any, index: number) => string>, default: undefined },
    ticks: { type: Array as PropType<ReadonlyArray<AxisTick>>, default: undefined },
    stroke: { type: String, default: '#666' },
    type: { type: String as PropType<'category' | 'number'>, default: 'category' },
  },
  setup(props) {
    const dispatch = useAppDispatch()

    let prevSettings: any = null
    watchEffect(() => {
      const settings = {
        id: props.angleAxisId,
        type: props.type,
        dataKey: props.dataKey,
        scale: 'auto' as const,
        allowDuplicatedCategory: true,
        allowDataOverflow: false,
        reversed: false,
        includeHidden: false,
        domain: undefined,
        unit: undefined,
        name: undefined,
        allowDecimals: false,
        tickCount: undefined as any,
        ticks: props.ticks,
        tick: props.tick,
      }
      dispatch(addAngleAxis(settings))
      prevSettings = settings
    })

    onUnmounted(() => {
      if (prevSettings) {
        dispatch(removeAngleAxis(prevSettings))
        prevSettings = null
      }
    })

    const polarViewBox = useAppSelector(state => selectPolarViewBox(state))
    const ticks = useAppSelector(state => selectPolarAxisTicks(state, 'angleAxis', props.angleAxisId, false))

    return () => {
      const viewBox = polarViewBox.value
      const tickItems = ticks.value

      if (viewBox == null || tickItems == null || tickItems.length === 0) {
        return null
      }

      const { cx, cy, outerRadius: radius } = viewBox
      const { orientation, tickSize, axisLine, axisLineType, tickLine, tick, tickFormatter, stroke } = props

      return (
        <g class="v-charts-polar-angle-axis">
          {/* Axis line */}
          {axisLine && (
            axisLineType === 'circle'
              ? <circle cx={cx} cy={cy} r={radius} fill="none" stroke={stroke} />
              : (
                <polygon
                  points={tickItems.map(t => {
                    const p = polarToCartesian(cx, cy, radius, t.coordinate)
                    return `${p.x},${p.y}`
                  }).join(' ')}
                  fill="none"
                  stroke={stroke}
                />
              )
          )}
          {/* Ticks */}
          <g class="v-charts-polar-angle-axis-ticks">
            {tickItems.map((entry, i) => {
              const p1 = polarToCartesian(cx, cy, radius, entry.coordinate)
              const p2 = polarToCartesian(cx, cy, radius + (orientation === 'inner' ? -1 : 1) * tickSize, entry.coordinate)
              const textAnchor = getTickTextAnchor(entry.coordinate, orientation)
              const verticalAnchor = getTickVerticalAnchor(entry.coordinate)
              const value = tickFormatter ? tickFormatter(entry.value, i) : entry.value

              return (
                <g key={`tick-${entry.coordinate}`} class="v-charts-polar-angle-axis-tick">
                  {tickLine && (
                    <line
                      class="v-charts-polar-angle-axis-tick-line"
                      x1={p1.x}
                      y1={p1.y}
                      x2={p2.x}
                      y2={p2.y}
                      stroke={stroke}
                      fill="none"
                    />
                  )}
                  {tick && (
                    <Text
                      class="v-charts-polar-angle-axis-tick-value"
                      x={p2.x}
                      y={p2.y}
                      textAnchor={textAnchor}
                      verticalAnchor={verticalAnchor}
                      fill={stroke}
                      value={String(value)}
                    />
                  )}
                </g>
              )
            })}
          </g>
        </g>
      )
    }
  },
})
