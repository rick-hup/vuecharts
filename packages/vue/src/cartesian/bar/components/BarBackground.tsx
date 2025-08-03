import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { BarProps, BarRectangleItem } from '../type'
import { useAppSelector } from '@/state/hooks'
import { selectActiveTooltipIndex } from '@/state/selectors/tooltipSelectors'
import { Layer } from '@/container/Layer'

export const BarBackground = defineComponent({
  name: 'BarBackground',
  inheritAttrs: false,
  props: {
    data: {
      type: Array as PropType<ReadonlyArray<BarRectangleItem>>,
      required: true,
    },
    dataKey: {
      type: [String, Number, Function],
      required: true,
    },
    background: {
      type: [Function, Object],
      default: undefined,
    },
  },

  setup(props, { attrs }) {
    const activeIndex = useAppSelector(selectActiveTooltipIndex)

    return () => {
      const { data, background: backgroundFromProps } = props
      const allOtherProps = attrs as unknown as BarProps

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

            // const onMouseEnter = onMouseEnterFromContext(entry, i)
            // const onMouseLeave = onMouseLeaveFromContext(entry, i)
            // const onClick = onClickFromContext(entry, i)

            const barRectangleProps = {
              option: backgroundFromProps,
              // isActive: String(i) === activeIndex,
              ...rest,
              fill: '#eee',
              ...backgroundFromDataEntry,
              // ...backgroundProps,
              // ...adaptEventsOfChild(allOtherProps, entry, i),
              // onMouseEnter,
              // onMouseLeave,
              // onClick,
              // dataKey: props.dataKey,
              // index: i,
              // class: 'recharts-bar-background-rectangle',
            }

            return (
              <Layer key={`background-bar-${i}`}>
                {/* <BarRectangle {...barRectangleProps} /> */}
              </Layer>
            )
          })}
        </>
      )
    }
  },
})
