import { defineComponent } from 'vue'
import { renderLineItem } from '@/cartesian/cartesian-grid/utils'

const HorizontalGridLines = defineComponent({
  name: 'HorizontalGridLines',
  inheritAttrs: false,
  props: {
    x: Number,
    width: Number,
    horizontal: Boolean,
    horizontalPoints: Array,
    xAxisId: [String, Number],
    yAxisId: [String, Number],
    offset: Object,
    xAxis: Object,
    yAxis: Object,
  },
  setup(props, { attrs }) {
    return () => {
      const { x, width, horizontal = true, horizontalPoints } = props

      if (!horizontal || !horizontalPoints || !horizontalPoints.length) {
        return null
      }

      const { xAxisId, yAxisId, ...otherLineItemProps } = {
        ...props,
        ...attrs,
      }

      const items = horizontalPoints.map((entry, i) => {
        const lineItemProps = {
          ...otherLineItemProps,
          ...attrs,
          x1: x,
          y1: entry,
          x2: x! + width!,
          y2: entry,
          key: `line-${i}`,
          index: i,
        }
        return renderLineItem(horizontal, lineItemProps)
      })
      return <g class="v-charts-cartesian-grid-horizontal">{items}</g>
    }
  },
})

export default HorizontalGridLines
