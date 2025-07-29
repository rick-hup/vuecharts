import type { PropType } from 'vue'
import { Fragment, computed, defineComponent, ref, toRaw, watch } from 'vue'
import { AreaVueProps } from './type'
import type { Coordinate, WithSVGProps } from '@/types'
import { Layer } from '@/container/Layer'
import type { Point } from '@/shape/Curve'
import { Curve, getPath } from '@/shape/Curve'
import type { AreaPointItem } from '@/state/selectors/areaSelectors'
import { isClipDot } from '@/utils/chart'
import { Dot } from '@/shape/Dot'
import { animate, animateMini, useMotionValue, useTransform } from 'motion-v'
import { ClipRect } from './ClipRect'
import { useAreaContext } from './hooks/useArea'
import { useOffset } from '@/context/chartLayoutContext'
import { interpolate, isNan, isNullish, isNumber } from '@/utils'
import { LabelList } from '@/components/label'

// 简化的 Dots 组件 - 使用 context
export const Dots = defineComponent({
  name: 'Dots',
  props: {
    points: {
      type: Array as PropType<ReadonlyArray<Point>>,
      default: () => [],
    },
  },
  setup(_props) {
    const { clipPathId, props, attrs } = useAreaContext()

    return () => {
      const { points } = _props
      if (!shouldRenderDots(points!, props.dot!)) {
        return null
      }
      const clipDot = isClipDot(props.dot)
      const dotsProps = {
        'fill': props.fill,
        'fill-opacity': props.fillOpacity,
        'stroke-width': props.strokeWidth,
        'stroke': props.stroke as string,
      }
      return (
        <Layer
          class="v-charts-area-dots"
          clip-path={props.needClip ? `url(#clipPath-${clipDot ? '' : 'dots-'}${clipPathId.value})` : undefined}
        >
          {
            points?.map((point) => {
              return <Dot {...dotsProps} {...attrs} r={3} cx={point.x} cy={point.y} class="v-charts-area-dot" clipDot={clipDot} />
            })
          }
        </Layer>
      )
    }
  },
})

// 简化的 StaticArea 组件 - 使用 context
export const StaticArea = defineComponent({
  name: 'StaticArea',
  props: {
    isAnimationComplete: {
      type: Boolean,
      default: false,
    },
  },
  setup(_props) {
    const { points, clipPathId, layout, attrs, areaData, props, isAnimating } = useAreaContext()
    const offset = useOffset()
    const currentPoints = ref<ReadonlyArray<Point>>(points.value || [])
    const currentBaseLine = ref<number | ReadonlyArray<AreaPointItem>>(areaData.value?.baseLine || [])

    let prevPoints: ReadonlyArray<Point> = currentPoints.value || []
    let prevBaseLine: number | ReadonlyArray<AreaPointItem> = areaData.value?.baseLine || []
    /**
     * after animate stop,onUpdate still be called,so we need to check if the animation is stopped
     */
    let animationStopped = false
    watch(points, (newPoints, _, onCleanup) => {
      if (newPoints && newPoints.length > 0 && _props.isAnimationComplete) {
        animationStopped = false
        // update isAnimating state
        isAnimating.value = true
        const animation = animate(0 as number, 1, {
          ...props.transition,
          onUpdate(t) {
            if (animationStopped)
              return
            if (prevPoints.length) {
              const prevPointsDiffFactor = prevPoints.length / newPoints.length
              const stepPoints: ReadonlyArray<AreaPointItem>
                /*
                 * Here it is important that at the very end of the animation, on the last frame,
                 * we render the original points without any interpolation.
                 * This is needed because the code above is checking for reference equality to decide if the animation should run
                 * and if we create a new array instance (even if the numbers were the same)
                 * then we would break animations.
                 */
                = t === 1
                  ? newPoints
                  : newPoints.map((entry, index): AreaPointItem => {
                      const prevPointIndex = Math.floor(index * prevPointsDiffFactor)
                      if (prevPoints[prevPointIndex]) {
                        const prev: AreaPointItem = prevPoints[prevPointIndex]
                        return { ...entry, x: interpolate(prev.x, entry.x, t), y: interpolate(prev.y, entry.y, t) }
                      }

                      return entry
                    })
              let stepBaseLine: number | ReadonlyArray<AreaPointItem>

              if (isNumber(areaData.value?.baseLine)) {
                stepBaseLine = interpolate(prevBaseLine, areaData.value?.baseLine, t)
              }
              else if (isNullish(areaData.value?.baseLine) || isNan(areaData.value?.baseLine)) {
                stepBaseLine = interpolate(prevBaseLine, 0, t)
              }
              else {
                stepBaseLine = areaData?.value!.baseLine.map((entry, index) => {
                  const prevPointIndex = Math.floor(index * prevPointsDiffFactor)
                  if (Array.isArray(prevBaseLine) && prevBaseLine[prevPointIndex]) {
                    const prev = prevBaseLine[prevPointIndex]

                    return { ...entry, x: interpolate(prev.x, entry.x, t), y: interpolate(prev.y, entry.y, t) }
                  }

                  return entry
                })
              }

              currentPoints.value = stepPoints
              currentBaseLine.value = stepBaseLine
            }
          },
          onPlay() {
            props.onAnimationStart?.()
          },
          onComplete() {
            isAnimating.value = false
            props.onAnimationEnd?.()
          },
        })
        onCleanup(() => {
          animationStopped = true
          animation.stop()
          prevPoints = currentPoints.value
          prevBaseLine = currentBaseLine.value
        })
      }
      else {
        isAnimating.value = false
        currentPoints.value = newPoints || []
        currentBaseLine.value = areaData.value?.baseLine || []
        prevPoints = currentPoints.value
        prevBaseLine = currentBaseLine.value
      }
    })

    return () => {
      const curveAttrs = {
        ...attrs,
        'fill': props.fill,
        'fill-opacity': props.fillOpacity,
        'height': offset.value.height,
        'width': offset.value.width,
        'stroke-width': props.strokeWidth,
      }
      const isRange = areaData.value?.isRange
      const showLabels = !isAnimating.value && props.label
      const labelProps = typeof props.label === 'object' ? props.label : {}
      return (
        <Fragment>
          {currentPoints.value && currentPoints.value.length > 1 && (
            <Layer clip-path={props.needClip ? `url(#clipPath-${clipPathId.value})` : undefined}>
              <Curve
                {...curveAttrs}
                points={currentPoints.value}
                connectNulls={props.connectNulls}
                type={props.type}
                layout={layout.value}
                baseLine={currentBaseLine.value}
                stroke="none"
                class="v-charts-area-area"
              />
              {attrs.stroke !== 'none' && (
                <Curve
                  {...curveAttrs}
                  layout={layout.value}
                  type={props.type}
                  connectNulls={props.connectNulls}
                  fill="none"
                  points={currentPoints.value}
                  stroke={props.stroke}
                  class="v-charts-area-curve"
                />
              )}
              {attrs.stroke !== 'none' && isRange && (
                <Curve
                  {...curveAttrs}
                  class="v-charts-area-curve"
                  layout={layout.value}
                  type={props.type}
                  connectNulls={props.connectNulls}
                  fill="none"
                  points={currentBaseLine.value as ReadonlyArray<Point>}
                  stroke={props.stroke}
                />
              )}
            </Layer>
          )}
          <Dots points={currentPoints.value} />
          {
            showLabels && (
              <LabelList {...labelProps} data={areaData.value?.points ?? []} dataKey={props.dataKey} />
            )
          }
        </Fragment>
      )
    }
  },
})

export const RenderArea = defineComponent({
  name: 'RenderArea',
  setup(_) {
    const { points, clipPathId, props, isAnimating } = useAreaContext()

    const isAnimationComplete = ref(false)

    const shouldShowAnimation = computed(() => {
      return props.isAnimationActive && points.value?.length
    })

    const handleAnimationComplete = () => {
      isAnimationComplete.value = true
      isAnimating.value = false
      props.onAnimationEnd?.()
    }

    return () => {
      if (shouldShowAnimation.value) {
        return (
          <Layer key="area-with-animation">
            {
              !isAnimationComplete.value && (
                <defs>
                  <clipPath id={`animationClipPath-${clipPathId.value}`}>
                    <ClipRect
                      onAnimationEnd={handleAnimationComplete}
                    />
                  </clipPath>
                </defs>
              )
            }
            <Layer clip-path={`url(#animationClipPath-${clipPathId.value})`}>
              <StaticArea isAnimationComplete={isAnimationComplete.value} />
            </Layer>
          </Layer>
        )
      }

      return <StaticArea key="static-area" />
    }
  },
})

function shouldRenderDots(points: ReadonlyArray<AreaPointItem>, dot: any): boolean {
  if (points == null || !points.length) {
    return false
  }
  if (dot) {
    return true
  }
  return points.length === 1
}
