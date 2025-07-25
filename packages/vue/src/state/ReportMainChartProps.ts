import { useAppDispatch } from '@/state/hooks'
import { setChartSize, setLayout, setMargin } from '@/state/layoutSlice'
import type { LayoutType } from '@/types'
import type { PropType } from 'vue'
import { defineComponent, watch } from 'vue'

export const ReportMainChartProps = defineComponent({
  name: 'ReportMainChartProps',
  props: {
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    layout: {
      type: String as PropType<LayoutType>,
      required: true,
    },
    margin: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const dispatch = useAppDispatch()
    /*
    * Skip dispatching properties in panorama chart for two reasons:
    * 1. The root chart should be deciding on these properties, and
    * 2. Brush reads these properties from redux store, and so they must remain stable
    *      to avoid circular dependency and infinite re-rendering.
    */
    const isPanorama = false
    watch([() => props.width, () => props.height, () => props.layout, () => props.margin], () => {
      if (!isPanorama) {
        dispatch(setLayout(props.layout))
        dispatch(setChartSize({ width: props.width, height: props.height }))
        dispatch(setMargin(props.margin))
      }
    }, {
      immediate: true,
    })

    return () => {
      return null
    }
  },
})
