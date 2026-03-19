import type { PropType } from 'vue'
import { defineComponent, watchEffect } from 'vue'
import { classProp } from '@/types'
import type { StackOffsetType, SyncMethod } from '@/types'
import { useAppDispatch } from './hooks'
import { updateOptions } from './rootPropsSlice'

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
    class: classProp,
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

    watchEffect(() => {
      dispatch(updateOptions({
        accessibilityLayer: props.accessibilityLayer,
        barCategoryGap: props.barCategoryGap,
        barGap: props.barGap,
        barSize: props.barSize,
        class: props.class,
        maxBarSize: props.maxBarSize,
        stackOffset: props.stackOffset,
        syncId: props.syncId,
        syncMethod: props.syncMethod,
      }))
    })

    return () => null
  },
})
