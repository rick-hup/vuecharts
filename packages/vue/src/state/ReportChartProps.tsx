import type { PropType } from 'vue'
import { defineComponent, watch } from 'vue'
import type { StackOffsetType, SyncMethod } from '@/types'
import { useAppDispatch } from './hooks'
import { updateOptions } from './rootPropsSlice'
import type { UpdatableChartOptions } from './rootPropsSlice'

export default defineComponent({
  name: 'ReportChartProps',
  props: {
    accessibilityLayer: {
      type: Boolean,
      default: true,
    },
    barCategoryGap: {
      type: [Number, String],
      default: '10%',
    },
    barGap: {
      type: Number,
      default: 4,
    },
    barSize: {
      type: [String, Number],
      default: undefined,
    },
    class: {
      type: String,
      default: undefined,
    },
    maxBarSize: {
      type: Number,
      default: undefined,
    },
    stackOffset: {
      type: String as PropType<StackOffsetType>,
      default: 'none',
    },
    syncId: {
      type: [Number, String],
      default: undefined,
    },
    syncMethod: {
      type: [String, Function] as PropType<SyncMethod>,
      default: 'index',
    },
  },
  setup(props) {
    const dispatch = useAppDispatch()

    watch(
      props,
      (newProps) => {
        dispatch(updateOptions(newProps as UpdatableChartOptions))
      },
      { immediate: true, deep: true },
    )

    return () => null
  },
})
