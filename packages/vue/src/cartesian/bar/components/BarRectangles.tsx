import type { PropType } from 'vue'
import { defineComponent, ref, watch } from 'vue'
import type { BarProps, BarRectangleItem } from '../type'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import {
  selectActiveTooltipDataKey,
  selectActiveTooltipIndex,
} from '@/state/selectors/tooltipSelectors'
import { filterProps } from '@/utils/VueUtils'
import { Layer } from '@/container/Layer'
import { Rectangle } from '@/shape/Rectangle'
import { useBarContext } from '../hooks/useBar'
import { LabelList } from '@/components/label'

export const BarRectangles = defineComponent({
  name: 'BarRectangles',
  inheritAttrs: false,

  setup(_, { attrs }) {
    const activeIndex = useAppSelector(selectActiveTooltipIndex)
    const activeDataKey = useAppSelector(selectActiveTooltipDataKey)
    const previousRectangles = ref<ReadonlyArray<BarRectangleItem> | null>(null)
    const isAnimating = ref(false)

    const { props, data: barData } = useBarContext()

    const {
      shape,
      dataKey,
      activeBar,
      isAnimationActive,
      animationBegin,
      animationDuration,
      animationEasing,
      onAnimationStart,
      onAnimationEnd,
    } = props

    const onMouseEnterFromContext = useMouseEnterItemDispatch(attrs.onMouseEnter as any, dataKey)
    const onMouseLeaveFromContext = useMouseLeaveItemDispatch(attrs.onMouseLeave as any)
    const onClickFromContext = useMouseClickItemDispatch(attrs.onClick as any, dataKey)

    const baseProps = filterProps(props, false)

    watch(
      () => barData.value?.rectangles,
      (newData) => {
        if (newData && newData !== previousRectangles.value) {
          previousRectangles.value = newData
        }
      },
    )

    const renderRectangles = (data: ReadonlyArray<BarRectangleItem> | undefined, showLabels: boolean) => {
      if (!data)
        return null
      return (
        <>
          {data.map((entry: BarRectangleItem, i: number) => {
            const isActive
              = activeBar && String(i) === activeIndex && (activeDataKey == null || dataKey === activeDataKey)
            const option = isActive ? activeBar : shape

            const barRectangleProps = {
              ...baseProps,
              ...entry,
              isActive,
              option,
              index: i,
              dataKey,
            }

            return (
              <Layer
                key={`rectangle-${entry?.x}-${entry?.y}-${entry?.value}-${i}`}
                class="recharts-bar-rectangle"
                {...adaptEventsOfChild(props, entry, i)}
                onMouseEnter={onMouseEnterFromContext(entry, i)}
                onMouseLeave={onMouseLeaveFromContext(entry, i)}
                onClick={onClickFromContext(entry, i)}
              >
                <Rectangle {...barRectangleProps} />
              </Layer>
            )
          })}
          {showLabels && <LabelList data={data} dataKey={dataKey} />}
        </>
      )
    }

    return () => {
      const data = barData.value?.rectangles
      if (!data) {
        return null
      }

      if (
        isAnimationActive
        && data
        && data.length
        && (previousRectangles.value == null || previousRectangles.value !== data)
      ) {
        return (
          <Animate
            begin={animationBegin}
            duration={animationDuration}
            isActive={isAnimationActive}
            easing={animationEasing}
            from={{ t: 0 }}
            to={{ t: 1 }}
            onAnimationEnd={() => {
              if (typeof onAnimationEnd === 'function') {
                onAnimationEnd()
              }
              isAnimating.value = false
            }}
            onAnimationStart={() => {
              if (typeof onAnimationStart === 'function') {
                onAnimationStart()
              }
              isAnimating.value = true
            }}
          >
            {{
              default: ({ t }: { t: number }) => {
                const stepData = t === 1
                  ? data
                  : data.map((entry, index) => {
                      const prev = previousRectangles.value?.[index]

                      if (prev) {
                        const interpolatorX = interpolateNumber(prev.x!, entry.x!)
                        const interpolatorY = interpolateNumber(prev.y!, entry.y!)
                        const interpolatorWidth = interpolateNumber(prev.width, entry.width)
                        const interpolatorHeight = interpolateNumber(prev.height, entry.height)

                        return {
                          ...entry,
                          x: interpolatorX(t),
                          y: interpolatorY(t),
                          width: interpolatorWidth(t),
                          height: interpolatorHeight(t),
                        }
                      }

                      if (props.layout === 'horizontal') {
                        const interpolatorHeight = interpolateNumber(0, entry.height)
                        const h = interpolatorHeight(t)

                        return {
                          ...entry,
                          y: entry.y! + entry.height - h,
                          height: h,
                        }
                      }

                      const interpolator = interpolateNumber(0, entry.width)
                      const w = interpolator(t)

                      return { ...entry, width: w }
                    })

                return (
                  <Layer>
                    {renderRectangles(stepData, !isAnimating.value)}
                  </Layer>
                )
              },
            }}
          </Animate>
        )
      }

      return renderRectangles(data, true)
    }
  },
})
