import type { CSSProperties, PropType } from 'vue'
import { defineComponent } from 'vue'
import type { LegendType } from '@/types/legend'
import type { LegendPayload } from '@/components/DefaultLegendContent'

export const SIZE = 32

export const LegendSymbol = defineComponent({
  name: 'LegendSymbol',
  props: {
    type: String as PropType<LegendType>,
    color: String,
    size: { type: Number, default: 14 },
    data: {
      type: Object as PropType<LegendPayload>,
    },
  },
  setup(props) {
    return () => {
      const { type, color, size, data } = props
      if (type === 'none') {
        return null
      }

      const symbolStyle: CSSProperties = {
        fill: color,
        stroke: color,
        strokeWidth: 2,
      }

      const halfSize = SIZE / 2
      const thirdSize = SIZE / 3
      const sixthSize = SIZE / 6

      switch (type) {
        case 'line':
          return (
            <path
              stroke-width={4}
              fill="none"
              stroke={color}
              d={`M0,${halfSize}h${thirdSize}
            A${sixthSize},${sixthSize},0,1,1,${2 * thirdSize},${halfSize}
            H${SIZE}M${2 * thirdSize},${halfSize}
            A${sixthSize},${sixthSize},0,1,1,${thirdSize},${halfSize}`}
              class="v-charts-legend-icon"
            />
          )
        case 'plainline':
          return (
            <line
              stroke-width={4}
              fill="none"
              stroke={color}
              stroke-dasharray={data?.payload?.strokeDasharray}
              x1={0}
              y1={halfSize}
              x2={SIZE}
              y2={halfSize}
              class="v-charts-legend-icon"
            />
          )
        case 'rect':
          return (
            <path
              stroke="none"
              fill={color}
              d={`M0,${SIZE / 8}h${SIZE}v${(SIZE * 3) / 4}h${-SIZE}z`}
              class="v-charts-legend-icon"
            />
          )
        default:
          return (
            <rect
              x={2}
              y={2}
              width={size - 4}
              height={size - 4}
              style={symbolStyle}
            />
          )
      }
    }
  },
})
