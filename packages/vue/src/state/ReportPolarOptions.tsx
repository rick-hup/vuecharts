import { defineComponent, watch } from 'vue'
import type { PropType } from 'vue'
import { useAppDispatch } from './hooks'
import { updatePolarOptions } from './polarOptionsSlice'

export const ReportPolarOptions = defineComponent({
  name: 'ReportPolarOptions',
  props: {
    cx: { type: [Number, String] as PropType<number | string>, default: '50%' },
    cy: { type: [Number, String] as PropType<number | string>, default: '50%' },
    startAngle: { type: Number, default: 90 },
    endAngle: { type: Number, default: -270 },
    innerRadius: { type: [Number, String] as PropType<number | string>, default: 0 },
    outerRadius: { type: [Number, String] as PropType<number | string>, default: '80%' },
  },
  setup(props) {
    const dispatch = useAppDispatch()

    watch(
      [() => props.cx, () => props.cy, () => props.startAngle, () => props.endAngle, () => props.innerRadius, () => props.outerRadius],
      () => {
        dispatch(updatePolarOptions({
          cx: props.cx,
          cy: props.cy,
          startAngle: props.startAngle,
          endAngle: props.endAngle,
          innerRadius: props.innerRadius,
          outerRadius: props.outerRadius,
        }))
      },
      { immediate: true },
    )

    return () => null
  },
})
