import { defineComponent } from 'vue'

const HorizontalStripes = defineComponent({
  name: 'HorizontalStripes',
  inheritAttrs: false,
  props: {
    horizontalFill: Array,
    fillOpacity: Number,
    x: Number,
    y: Number,
    width: Number,
    height: Number,
    horizontalPoints: Array,
    horizontal: Boolean,
  },
  setup(props) {
    return () => {
      const { horizontalFill, fillOpacity, x, y, width, height, horizontalPoints, horizontal = true } = props
      if (!horizontal || !horizontalFill || !horizontalFill.length) {
        return null
      }

      const roundedSortedHorizontalPoints = horizontalPoints?.map((e: any) => Math.round(e + y! - y!)).sort((a, b) => a - b)
      if (y !== roundedSortedHorizontalPoints?.[0]) {
        roundedSortedHorizontalPoints?.unshift(0)
      }

      const items = roundedSortedHorizontalPoints?.map((entry, i) => {
        const lastStripe = !roundedSortedHorizontalPoints[i + 1]
        const lineHeight = lastStripe ? y! + height! - entry : roundedSortedHorizontalPoints[i + 1] - entry
        if (lineHeight <= 0) {
          return null
        }
        const colorIndex = i % horizontalFill.length
        return (
          <rect
            key={`react-${i}`}
            y={entry}
            x={x}
            height={lineHeight}
            width={width}
            stroke="none"
            fill={horizontalFill[colorIndex]}
            fillOpacity={fillOpacity}
            class="v-charts-cartesian-grid-bg"
          />
        )
      })

      return <g class="v-charts-cartesian-gridstripes-horizontal">{items}</g>
    }
  },
})

export default HorizontalStripes
