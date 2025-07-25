import { useOffset } from '@/context/chartLayoutContext'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ClipPath',
  props: {
    clipPathId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const offset = useOffset()

    return () => {
      if (!offset.value)
        return null
      const { left, top, height, width } = offset.value

      return (
        <defs>
          <clipPath id={props.clipPathId}>
            <rect x={left} y={top} height={height} width={width} />
          </clipPath>
        </defs>
      )
    }
  },
})
