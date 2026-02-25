import { computed, defineComponent } from 'vue'
import type { PropType } from 'vue'
import { useAppSelector } from '@/state/hooks'
import { selectPolarViewBox } from '@/state/selectors/polarAxisSelectors'
import { selectPolarGridAngles, selectPolarGridRadii } from '@/state/selectors/polarGridSelectors'
import { polarToCartesian } from '@/utils/polar'

function getPolygonPath(radius: number, cx: number, cy: number, polarAngles: ReadonlyArray<number>): string {
  let path = ''
  polarAngles.forEach((angle, i) => {
    const point = polarToCartesian(cx, cy, radius, angle)
    path += i === 0 ? `M ${point.x},${point.y}` : `L ${point.x},${point.y}`
  })
  return `${path}Z`
}

export const PolarGrid = defineComponent({
  name: 'PolarGrid',
  props: {
    angleAxisId: { type: [String, Number] as PropType<string | number>, default: 0 },
    radiusAxisId: { type: [String, Number] as PropType<string | number>, default: 0 },
    gridType: { type: String as PropType<'polygon' | 'circle'>, default: 'polygon' },
    radialLines: { type: Boolean, default: true },
    stroke: { type: String, default: '#ccc' },
    fill: { type: String, default: 'none' },
  },
  setup(props) {
    const polarViewBox = useAppSelector(state => selectPolarViewBox(state))
    const polarAngles = useAppSelector(state => selectPolarGridAngles(state, props.angleAxisId))
    const polarRadii = useAppSelector(state => selectPolarGridRadii(state, props.radiusAxisId))

    return () => {
      const viewBox = polarViewBox.value
      const angles = polarAngles.value
      const radii = polarRadii.value

      if (viewBox == null || angles == null || radii == null || viewBox.outerRadius <= 0) {
        return null
      }

      const { cx, cy, innerRadius } = viewBox
      const stroke = props.stroke

      return (
        <g class="v-charts-polar-grid">
          {/* Concentric grid shapes */}
          <g class="v-charts-polar-grid-concentric">
            {radii.map((radius, i) => {
              if (props.gridType === 'circle') {
                return (
                  <circle
                    key={`circle-${i}`}
                    class="v-charts-polar-grid-concentric-circle"
                    cx={cx}
                    cy={cy}
                    r={radius}
                    stroke={stroke}
                    fill="none"
                  />
                )
              }
              return (
                <path
                  key={`polygon-${i}`}
                  class="v-charts-polar-grid-concentric-polygon"
                  d={getPolygonPath(radius, cx, cy, angles)}
                  stroke={stroke}
                  fill="none"
                />
              )
            })}
          </g>
          {/* Radial lines */}
          {props.radialLines && angles.length > 0 && (
            <g class="v-charts-polar-grid-angle">
              {angles.map((angle) => {
                const start = polarToCartesian(cx, cy, innerRadius, angle)
                const end = polarToCartesian(cx, cy, viewBox.outerRadius, angle)
                return (
                  <line
                    key={`line-${angle}`}
                    x1={start.x}
                    y1={start.y}
                    x2={end.x}
                    y2={end.y}
                    stroke={stroke}
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
