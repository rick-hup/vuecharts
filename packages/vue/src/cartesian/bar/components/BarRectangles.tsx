import type { PropType } from 'vue'
import { defineComponent, ref, watch } from 'vue'
import type { BarProps } from '../type'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import {
  selectActiveTooltipDataKey,
  selectActiveTooltipIndex,
} from '@/state/selectors/tooltipSelectors'
import {
  mouseLeaveItem,
  setActiveClickItemIndex,
  setActiveMouseOverItemIndex,
} from '@/state/tooltipSlice'
import { filterProps } from '@/utils/VueUtils'
import { Layer } from '@/container/Layer'
import { Rectangle } from '@/shape/Rectangle'
import { useBarContext } from '../hooks/useBar'
import { useDomRef } from 'motion-v'
import { Animate } from '@/animation/Animate'
import type { BarRectangleItem } from '@/types/bar'

export const BarRectangles = defineComponent({
  name: 'BarRectangles',
  inheritAttrs: false,

  setup(_) {
    const dispatch = useAppDispatch()
    const activeIndex = useAppSelector(selectActiveTooltipIndex)
    const activeDataKey = useAppSelector(selectActiveTooltipDataKey)
    let previousRectangles: ReadonlyArray<BarRectangleItem> | null = null
    const domRef = useDomRef()

    const { props, data: barData, layout } = useBarContext()

    const {
      dataKey,
      isAnimationActive,
      onAnimationStart,
      onAnimationEnd,
      activeBar,
    } = props

    // 事件处理函数
    const onMouseEnterFromContext = (entry: BarRectangleItem, index: number) => (e: MouseEvent) => {
      dispatch(setActiveMouseOverItemIndex({
        activeDataKey: dataKey,
        activeIndex: String(index),
        activeCoordinate: {
          x: entry.tooltipPosition.x,
          y: entry.tooltipPosition.y,
        },
        activePayload: entry.payload ? [entry.payload] : [],
        activeLabel: entry.payload?.name || String(index),
        chartX: e.clientX,
        chartY: e.clientY,
      }))
    }
    const onMouseLeaveFromContext = (entry: BarRectangleItem, index: number) => (e: MouseEvent) => {
      dispatch(mouseLeaveItem())
    }
    const onClickFromContext = (entry: BarRectangleItem, index: number) => (e: MouseEvent) => {
      dispatch(setActiveClickItemIndex({
        activeDataKey: dataKey,
        activeIndex: String(index),
        activeCoordinate: {
          x: entry.tooltipPosition.x,
          y: entry.tooltipPosition.y,
        },
        activePayload: entry.payload ? [entry.payload] : [],
        activeLabel: entry.payload?.name || String(index),
        chartX: e.clientX,
        chartY: e.clientY,
      }))
    }

    const baseProps = filterProps(props, false)

    // 插值函数
    const interpolateNumber = (from: number, to: number) => (t: number) => from + (to - from) * t

    const renderRectangles = (data: ReadonlyArray<BarRectangleItem>) => {
      if (!data)
        return null

      return (
        <>
          {data.map((entry: BarRectangleItem, i: number) => {
            const isActive = activeBar !== false && String(i) === activeIndex.value && (activeDataKey.value == null || dataKey === activeDataKey.value)

            const activeBarProps = isActive && typeof activeBar === 'object' ? activeBar : {}

            const barRectangleProps = {
              ...baseProps,
              ...entry,
              ...(isActive ? activeBarProps : {}),
              isActive,
              index: i,
              dataKey,
            }

            return (
              <Layer
                key={`rectangle-${entry?.x}-${entry?.y}-${entry?.value}-${i}`}
                class="v-charts-bar-rectangle"
                onMouseenter={onMouseEnterFromContext(entry, i)}
                onMouseleave={onMouseLeaveFromContext(entry, i)}
                onClick={onClickFromContext(entry, i)}
              >
                <Rectangle {...barRectangleProps} />
              </Layer>
            )
          })}
        </>
      )
    }

    return () => {
      const data = barData.value
      if (!data) {
        return null
      }

      // // 如果启用动画且有之前的数据，则使用Animate组件
      if (isAnimationActive && previousRectangles == null && previousRectangles !== data) {
        return (
          <Animate
            transition={props.transition}
            isActive={isAnimationActive}
            onAnimationStart={onAnimationStart}
            onAnimationEnd={onAnimationEnd}
          >
            {
              (t) => {
                const stepData = t === 1
                  ? (previousRectangles = data)
                  : data.map((entry, index) => {
                      const prev = previousRectangles?.[index]
                      if (prev) {
                        // 从前一个状态插值到当前状态
                        const interpolatorX = interpolateNumber(prev.x || 0, entry.x || 0)
                        const interpolatorY = interpolateNumber(prev.y || 0, entry.y || 0)
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

                      // 新出现的柱子，从0开始动画
                      if (layout.value === 'horizontal') {
                        const interpolatorHeight = interpolateNumber(0, entry.height)
                        const h = interpolatorHeight(t)

                        return {
                          ...entry,
                          y: (entry.y || 0) + entry.height - h,
                          height: h,
                        }
                      }

                      // 垂直布局
                      const interpolator = interpolateNumber(0, entry.width)
                      const w = interpolator(t)

                      return { ...entry, width: w }
                    })

                return (
                  <g ref={domRef}>
                    {renderRectangles(stepData)}
                  </g>
                )
              }
            }
          </Animate>
        )
      }

      // 无动画或数据未变化时直接渲染
      return (
        <g ref={domRef}>
          {renderRectangles(data)}
        </g>
      )
    }
  },
})
