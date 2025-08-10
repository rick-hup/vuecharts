import { defineComponent } from 'vue'
import type { BarRectangleItem } from '@/types/bar'
import { useAppSelector } from '@/state/hooks'
import { selectActiveTooltipIndex } from '@/state/selectors/tooltipSelectors'
import { Layer } from '@/container/Layer'
import { Rectangle } from '@/shape/Rectangle'
import { useBarContext } from '../hooks/useBar'

export const BarBackground = defineComponent({
  name: 'BarBackground',
  inheritAttrs: false,
  setup(_, { attrs }) {
    const { props, data: barData } = useBarContext()

    return () => {
      const data = barData.value
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
                <Rectangle {...barRectangleProps} />
              </Layer>
            )
          })}
        </>
      )
    }
  },
})
