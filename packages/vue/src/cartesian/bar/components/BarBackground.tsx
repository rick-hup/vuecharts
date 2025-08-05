import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { BarProps, BarRectangleItem } from '../type'
import { useAppSelector } from '@/state/hooks'
import { selectActiveTooltipIndex } from '@/state/selectors/tooltipSelectors'
import { Layer } from '@/container/Layer'
import { BarRectangle } from '@/shape/BarRectangle'
import { useBarContext } from '../hooks/useBar'
import { useAppDispatch } from '@/state/hooks'
import { selectBar } from '@/state/selectors/barSelectors'

export const BarBackground = defineComponent({
  name: 'BarBackground',
  inheritAttrs: false,

  setup(_, { attrs }) {
    const activeIndex = useAppSelector(selectActiveTooltipIndex)
    const { props } = useBarContext()

    // Get bar data from Redux
    const barData = useAppSelector(state => selectBar(state, props.xAxisId!, props.yAxisId!, false, {
      barSize: props.barSize,
      data: props.data,
      dataKey: props.dataKey,
      maxBarSize: props.maxBarSize,
      minPointSize: props.minPointSize,
      stackId: props.stackId,
    }))

    return () => {
      const data = barData.value?.rectangles
      const backgroundFromProps = props.background

      if (!backgroundFromProps || !data) {
        return null
      }

      return (
        <>
          {data.map((entry: BarRectangleItem, i: number) => {
            const { value, background: backgroundFromDataEntry, tooltipPosition, ...rest } = entry

            if (!backgroundFromDataEntry) {
              return null
            }

            const barRectangleProps = {
              option: backgroundFromProps,
              ...rest,
              fill: '#eee',
              ...backgroundFromDataEntry,
            }

            return (
              <Layer key={`background-bar-${i}`}>
                <BarRectangle {...barRectangleProps} />
              </Layer>
            )
          })}
        </>
      )
    }
  },
})