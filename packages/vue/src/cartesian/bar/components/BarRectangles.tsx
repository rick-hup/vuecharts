import type { PropType } from 'vue'
import { defineComponent, ref, watch } from 'vue'
import type { BarProps, BarRectangleItem } from '../type'
import { useAppSelector } from '@/state/hooks'
import {
  selectActiveTooltipDataKey,
  selectActiveTooltipIndex,
} from '@/state/selectors/tooltipSelectors'
import { filterProps } from '@/utils/VueUtils'
import { Layer } from '@/container/Layer'
import { Rectangle } from '@/shape/Rectangle'
import { useBarContext } from '../hooks/useBar'
import { animate, useDomRef } from 'motion-v'

export const BarRectangles = defineComponent({
  name: 'BarRectangles',
  inheritAttrs: false,

  setup(_, { attrs }) {
    const activeIndex = useAppSelector(selectActiveTooltipIndex)
    const activeDataKey = useAppSelector(selectActiveTooltipDataKey)
    const previousRectangles = ref<ReadonlyArray<BarRectangleItem> | null>(null)
    const isAnimating = ref(false)
    const animationProgress = ref(0)
    const domRef = useDomRef()

    const { props, data: barData, layout } = useBarContext()

    const {
      dataKey,
      isAnimationActive,
      onAnimationStart,
      onAnimationEnd,
      transition,
    } = props

    // 模拟事件处理函数 - 这些需要根据实际的tooltip context实现
    const onMouseEnterFromContext = (entry: BarRectangleItem, index: number) => (e: MouseEvent) => {
      // TODO: 实现鼠标进入事件处理
    }
    const onMouseLeaveFromContext = (entry: BarRectangleItem, index: number) => (e: MouseEvent) => {
      // TODO: 实现鼠标离开事件处理
    }
    const onClickFromContext = (entry: BarRectangleItem, index: number) => (e: MouseEvent) => {
      // TODO: 实现点击事件处理
    }

    const baseProps = filterProps(props, false)

    // 监听数据变化并触发动画
    watch([barData, domRef], ([newData]) => {
      if (!domRef.value || !newData)
        return

      if (newData && newData !== previousRectangles.value) {
        if (isAnimationActive && previousRectangles.value != null) {
          // 开始动画
          isAnimating.value = true
          animate(
            { progress: 0 },
            { progress: 1 },
            {
              ...transition,
              onUpdate(latest) {
                animationProgress.value = latest.progress
              },
              onComplete() {
                isAnimating.value = false
                animationProgress.value = 1
                previousRectangles.value = newData as any
                onAnimationEnd?.()
              },
              onPlay() {
                onAnimationStart?.()
              },
            },
          )
        }
        else {
          // 无动画直接更新
          previousRectangles.value = newData as any
          animationProgress.value = 1
        }
      }
    }, {
      immediate: true,
    })

    // 插值函数
    const interpolateNumber = (from: number, to: number) => (t: number) => from + (to - from) * t

    const renderRectangles = (data: ReadonlyArray<BarRectangleItem> | undefined, showLabels: boolean) => {
      if (!data)
        return null

      return (
        <>
          {data.map((entry: BarRectangleItem, i: number) => {
            const isActive = String(i) === activeIndex.value && (activeDataKey.value == null || dataKey === activeDataKey.value)

            const barRectangleProps = {
              ...baseProps,
              ...entry,
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

      // 如果正在动画中，计算插值数据
      if (isAnimating.value && previousRectangles.value) {
        const t = animationProgress.value
        const stepData = data.map((entry, index) => {
          const prev = previousRectangles.value?.[index]

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
            {renderRectangles(stepData as any, !isAnimating.value)}
          </g>
        )
      }

      return (
        <g ref={domRef}>
          {renderRectangles(data as any, true)}
        </g>
      )
    }
  },
})
