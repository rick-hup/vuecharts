import type { PropType } from 'vue'
import { defineComponent, onUnmounted, watch } from 'vue'
import { useAppDispatch } from '@/state/hooks'
import { setChartData } from '@/state/chartDataSlice'
import type { ChartData } from '@/state/chartDataSlice'

/**
 * ChartDataContextProvider for Vue
 * Sets chartData in store on mount/update, clears on unmount. Renders nothing.
 */
export const ChartDataContextProvider = defineComponent({
  name: 'ChartDataContextProvider',
  props: {
    chartData: {
      type: Array as PropType<ChartData>,
      required: true,
    },
  },
  setup(props) {
    const dispatch = useAppDispatch()

    watch(() => props.chartData, (val) => {
      dispatch(setChartData(Array.from(val)))
    }, { immediate: true })

    onUnmounted(() => {
      dispatch(setChartData(undefined))
    })

    // Render nothing
    return () => null
  },
})
