import { defineComponent } from 'vue'

const Background = defineComponent({
  name: 'Background',
  inheritAttrs: false,
  props: {
    fill: String,
    fillOpacity: Number,
    x: Number,
    y: Number,
    width: Number,
    height: Number,
    ry: Number,
  },
  setup(props) {
    return () => {
      if (!props.fill || props.fill === 'none') {
        return null
      }
      return (
        <rect
          x={props.x}
          y={props.y}
          ry={props.ry}
          width={props.width}
          height={props.height}
          stroke="none"
          fill={props.fill}
          fillOpacity={props.fillOpacity}
          class="v-charts-cartesian-grid-bg"
        />
      )
    }
  },
})

export default Background
