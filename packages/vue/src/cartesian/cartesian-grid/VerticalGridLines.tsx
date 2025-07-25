import { renderLineItem } from '@/cartesian/cartesian-grid/utils'
import { defineComponent } from 'vue'

const VerticalGridLines = defineComponent({
  name: 'VerticalGridLines',
  inheritAttrs: false,
  props: {
    x: Number,
    y: Number,
    width: Number,
    height: Number,
    verticalPoints: Array,
    xAxisId: [String, Number],
    yAxisId: [String, Number],
    offset: Object,
    xAxis: Object,
    yAxis: Object,
    vertical: Boolean,
  },
  setup(props, { attrs }) {
    return () => {
      const { y, height, vertical = true, verticalPoints } = props

      if (!vertical || !verticalPoints || !verticalPoints.length) {
        return null
      }

      const { xAxisId, yAxisId, ...otherLineItemProps } = { ...props, ...attrs }

      const items = verticalPoints.map((entry, i) => {
        const lineItemProps = {
          ...otherLineItemProps,
          x1: entry,
          y1: y,
          x2: entry,
          y2: y! + height!,
          key: `line-${i}`,
          index: i,
        }

        return renderLineItem(vertical, lineItemProps)
      })
      return <g class="v-charts-cartesian-grid-vertical">{items}</g>
    }
  },
})

export default VerticalGridLines
