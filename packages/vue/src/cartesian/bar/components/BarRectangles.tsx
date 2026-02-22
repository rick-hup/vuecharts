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
    let animationId = 0
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

      if (isAnimationActive && previousRectangles !== data) {
        const prevData = previousRectangles
        // Increment animationId on every data change so the Animate component
        // remounts and restarts its 0→1 animation. This matches React Recharts'
        // useAnimationId(props) which generates a new key per render.
        // The key difference from naively restarting: previousRectangles is
        // updated at t>0 with interpolated step data, so rapid restarts during
        // Brush drag interpolate from the current visual position (not the
        // original start), creating a smooth "chase" effect.
        animationId++
        return (
          <Animate
            key={animationId}
            transition={props.transition}
            isActive={isAnimationActive}
            onAnimationStart={onAnimationStart}
            onAnimationEnd={onAnimationEnd}
          >
            {
              (t) => {
                const stepData = t === 1
                  ? data
                  : data.map((entry, index) => {
                      const prev = prevData?.[index]
                      if (prev) {
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

                      // 新出现的柱子：从堆叠基线开始动画
                      if (layout.value === 'horizontal') {
                        const h = interpolateNumber(0, entry.height)(t)
                        const y = interpolateNumber(entry.stackedBarStart, entry.y!)(t)

                        return { ...entry, y, height: h }
                      }

                      // 垂直布局
                      const w = interpolateNumber(0, entry.width!)(t)
                      const x = interpolateNumber(entry.stackedBarStart, entry.x!)(t)

                      return { ...entry, width: w, x }
                    })

                if (t > 0) {
                  previousRectangles = stepData
                }

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
      previousRectangles = data
      return (
        <g ref={domRef}>
          {renderRectangles(data)}
        </g>
      )
    }
  },
})
