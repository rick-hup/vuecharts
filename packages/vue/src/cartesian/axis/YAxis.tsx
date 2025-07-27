import type { PropType } from 'vue'
import { defineComponent, watchEffect } from 'vue'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import type { YAxisSettings } from '@/state/cartesianAxisSlice'
import { addYAxis, removeYAxis } from '@/state/cartesianAxisSlice'
import { implicitYAxis, selectAxisScale, selectTicksOfAxis, selectYAxisPosition, selectYAxisSize } from '@/state/selectors/axisSelectors'
import { useIsPanorama } from '@/context/PanoramaContextProvider'
import { CartesianAxis } from '@/cartesian'
import type { DataKey } from '@/types'
import { selectAxisViewBox } from '@/state/selectors/selectChartOffset'
import type { AxisDomain } from '@/types/axis'
import { dataKey } from '@/storybook/api/props/chart-props'

// Implementation of the YAxis rendering logic
const YAxisImpl = defineComponent({
  props: {
    yAxisId: {
      type: [String, Number],
      default: 0,
    },
  },
  inheritAttrs: false,
  setup(props, { attrs }) {
    const isPanorama = useIsPanorama()
    const axisType = 'yAxis'
    const scale = useAppSelector(state => selectAxisScale(state, axisType, props.yAxisId, isPanorama))
    const axisSize = useAppSelector(state => selectYAxisSize(state, props.yAxisId!))
    const position = useAppSelector(state => selectYAxisPosition(state, props.yAxisId!))
    const cartesianTickItems = useAppSelector(state => selectTicksOfAxis(state, axisType, props.yAxisId!, isPanorama))
    const viewBox = useAppSelector(selectAxisViewBox)

    return () => {
      const { ...allOtherProps } = props
      if (axisSize.value == null || position.value == null) {
        return null
      }
      return (
        <CartesianAxis
          {...allOtherProps}
          {...attrs}
          viewBox={viewBox.value}
          scale={scale.value!}
          x={position.value?.x}
          y={position.value?.y}
          width={axisSize.value?.width}
          height={axisSize.value?.height}
          ticks={cartesianTickItems.value!}
          class={['v-charts-yAxis yAxis', attrs.class]}
        />
      )
    }
  },
})

// Handles YAxis settings registration in the store
const YAxisSettingsDispatcher = defineComponent({
  props: {
    interval: String,
    yAxisId: {
      type: [String, Number],
      default: 0,
    },
    scale: [String, Function],
    type: String,
    padding: Object,
    allowDataOverflow: Boolean,
    allowDuplicatedCategory: Boolean,
    allowDecimals: Boolean,
    tickCount: Number,
    includeHidden: Boolean,
    reversed: Boolean,
    ticks: Array,
    width: Number,
    orientation: String,
    mirror: Boolean,
    hide: Boolean,
    unit: String,
    name: String,
    angle: Number,
    minTickGap: Number,
    tick: { type: [Boolean, Object], default: true },
    tickFormatter: Function,
    domain: Array as PropType<AxisDomain>,
    dataKey: {
      type: [String, Number, Function] as PropType<DataKey<any>>,
      default: '',
    },
  },
  setup(props) {
    const dispatch = useAppDispatch()
    watchEffect((onCleanup) => {
      const settings = {
        ...props,
        interval: props.interval ?? 'preserveEnd',
        id: props.yAxisId,
        dataKey: props.dataKey,
        includeHidden: props.includeHidden ?? false,
        angle: props.angle ?? 0,
        minTickGap: props.minTickGap ?? 5,
        tick: props.tick ?? true,
      } as YAxisSettings
      dispatch(addYAxis(settings))
      onCleanup(() => {
        dispatch(removeYAxis(settings))
      })
    })
    return () => (
      <YAxisImpl {...props} />
    )
  },
})

export const YAxis = defineComponent({
  name: 'YAxis',
  props: {
    allowDataOverflow: {
      type: Boolean,
      default: implicitYAxis.allowDataOverflow,
    },
    allowDecimals: {
      type: Boolean,
      default: implicitYAxis.allowDecimals,
    },
    allowDuplicatedCategory: {
      type: Boolean,
      default: implicitYAxis.allowDuplicatedCategory,
    },
    width: {
      type: Number,
      default: implicitYAxis.width,
    },
    hide: {
      type: Boolean,
      default: false,
    },
    mirror: {
      type: Boolean,
      default: implicitYAxis.mirror,
    },
    orientation: {
      type: String,
      default: implicitYAxis.orientation,
    },
    padding: {
      type: Object,
      default: implicitYAxis.padding,
    },
    reversed: {
      type: Boolean,
      default: implicitYAxis.reversed,
    },
    scale: {
      type: [String, Function],
      default: implicitYAxis.scale,
    },
    tickCount: {
      type: Number,
      default: implicitYAxis.tickCount,
    },
    type: {
      type: String,
      default: implicitYAxis.type,
    },
    yAxisId: {
      type: [String, Number],
    },
    dataKey: {
      type: [String, Number, Function] as PropType<DataKey<any>>,
      default: '',
    },
    tickFormatter: {
      type: Function,
      default: undefined,
    },
    unit: {
      type: String,
      default: '',
    },
    domain: {
      type: Array as PropType<AxisDomain>,
      default: undefined,
    },
  },
  setup(props, { attrs }) {
    return () => <YAxisSettingsDispatcher {...props} {...attrs} />
  },
})
