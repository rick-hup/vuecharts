import { defineComponent, ref, watch } from 'vue'
import type { PropType } from 'vue'
import type { BarProps, BarRectangleItem } from '../type'
import { useAppSelector } from '@/state/hooks'
import {
  selectActiveTooltipIndex,
  selectActiveTooltipDataKey,
} from '@/state/selectors/tooltipSelectors'
import { filterProps } from '@/utils/ReactUtils'
import { Layer } from '@/container/Layer'
import { BarRectangle } from '@/util/BarUtils'
import { LabelList } from '@/component/LabelList'
import {
  useMouseEnterItemDispatch,
  useMouseLeaveItemDispatch,
  useMouseClickItemDispatch,
} from '@/context/tooltipContext'
import { adaptEventsOfChild } from '@/utils/types'
import { Animate } from '@/animation/Animate'
import { interpolateNumber } from '@/utils/DataUtils'

export const BarRectangles = defineComponent({
  name: 'BarRectangles',
  inheritAttrs: false,

  props: {
    data: {
      type: Array as PropType<ReadonlyArray<BarRectangleItem>>,
      required: true,
    },
  },

  setup(props, { attrs }) {
    const activeIndex = useAppSelector(selectActiveTooltipIndex)
    const activeDataKey = useAppSelector(selectActiveTooltipDataKey)
    const previousRectangles = ref<ReadonlyArray<BarRectangleItem> | null>(null)
    const isAnimating = ref(false)

    const allProps = attrs as unknown as BarProps
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
    } = allProps

    const onMouseEnterFromContext = useMouseEnterItemDispatch(attrs.onMouseEnter as any, dataKey)
    const onMouseLeaveFromContext = useMouseLeaveItemDispatch(attrs.onMouseLeave as any)
    const onClickFromContext = useMouseClickItemDispatch(attrs.onClick as any, dataKey)

    const baseProps = filterProps(allProps, false)

    watch(
      () => props.data,
      (newData) => {
        if (newData && newData !== previousRectangles.value) {
          previousRectangles.value = newData
        }
      },
    )

    const renderRectangles = (data: ReadonlyArray<BarRectangleItem>, showLabels: boolean) => {
      return (
        <>
          {data.map((entry: BarRectangleItem, i: number) => {
            const isActive =
              activeBar && String(i) === activeIndex && (activeDataKey == null || dataKey === activeDataKey)
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
                {...adaptEventsOfChild(allProps, entry, i)}
                onMouseEnter={onMouseEnterFromContext(entry, i)}
                onMouseLeave={onMouseLeaveFromContext(entry, i)}
                onClick={onClickFromContext(entry, i)}
              >
                <BarRectangle {...barRectangleProps} />
              </Layer>
            )
          })}
          {showLabels && LabelList.renderCallByParent(allProps, data)}
        </>
      )
    }

    return () => {
      if (!props.data) {
        return null
      }

      if (
        isAnimationActive &&
        props.data &&
        props.data.length &&
        (previousRectangles.value == null || previousRectangles.value !== props.data)
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
                  ? props.data
                  : props.data.map((entry, index) => {
                    const prev = previousRectangles.value?.[index]

                    if (prev) {
                      const interpolatorX = interpolateNumber(prev.x, entry.x)
                      const interpolatorY = interpolateNumber(prev.y, entry.y)
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

                    if (allProps.layout === 'horizontal') {
                      const interpolatorHeight = interpolateNumber(0, entry.height)
                      const h = interpolatorHeight(t)

                      return {
                        ...entry,
                        y: entry.y + entry.height - h,
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

      return renderRectangles(props.data, true)
    }
  },
})
