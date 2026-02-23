import type { PropType } from 'vue'
import { Fragment, defineComponent, ref, watch } from 'vue'
import { Layer } from '@/container/Layer'
import type { Point } from '@/shape/Curve'
import { Curve } from '@/shape/Curve'
import type { LinePointItem } from './type'
import { useLineContext } from './hooks/useLine'
import { Dot } from '@/shape/Dot'
import { animate } from 'motion-v'
import { interpolate } from '@/utils'
import { LabelList } from '@/components/label'

// Dots component
export const Dots = defineComponent({
  name: 'LineDots',
  props: {
    points: {
      type: Array as PropType<ReadonlyArray<Point>>,
      default: () => [],
    },
  },
  setup(_props) {
    const { clipPathId, clipDot, props, attrs } = useLineContext()

    return () => {
      const { points } = _props
      if (!shouldRenderDots(points!, props.dot!)) {
        return null
      }
      const dotsProps = {
        'fill': '#fff',
        'stroke': props.stroke,
        'stroke-width': props.strokeWidth,
      }
      return (
        <Layer
          class="v-charts-line-dots"
          clip-path={props.needClip ? `url(#clipPath-${clipDot ? '' : 'dots-'}${clipPathId.value})` : undefined}
        >
          {
            points?.map((point) => {
              return <Dot {...dotsProps} {...attrs} r={3} cx={point.x} cy={point.y} class="v-charts-line-dot" clipDot={clipDot} />
            })
          }
        </Layer>
      )
    }
  },
})

// StaticLine component with animation
export const StaticLine = defineComponent({
  name: 'StaticLine',
  setup() {
    const { points, clipPathId, layout, attrs, lineData, props, isAnimating } = useLineContext()
    const currentPoints = ref<ReadonlyArray<LinePointItem>>(points.value || [])

    let prevPoints: ReadonlyArray<LinePointItem> = currentPoints.value || []
    let animationStopped = false

    watch(points, (newPoints, _, onCleanup) => {
      if (newPoints && newPoints.length > 0) {
        animationStopped = false
        isAnimating.value = true
        const animation = animate(0 as number, 1, {
          ...props.transition,
          onUpdate(t) {
            if (animationStopped)
              return
            if (prevPoints.length) {
              const prevPointsDiffFactor = prevPoints.length / newPoints.length
              const stepPoints = t === 1
                ? newPoints
                : newPoints.map((entry, index): LinePointItem => {
                    const prevPointIndex = Math.floor(index * prevPointsDiffFactor)
                    if (prevPoints[prevPointIndex]) {
                      const prev: LinePointItem = prevPoints[prevPointIndex]
                      return {
                        ...entry,
                        x: interpolate(prev.x, entry.x, t),
                        y: interpolate(prev.y, entry.y, t),
                      }
                    }
                    return entry
                  })

              currentPoints.value = stepPoints
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
        })
      }
      else {
        isAnimating.value = false
        currentPoints.value = newPoints || []
        prevPoints = currentPoints.value
      }
    }, { immediate: true })

    return () => {
      const curveAttrs = {
        ...attrs,
        'fill': 'none',
        'stroke': props.stroke,
        'stroke-width': props.strokeWidth,
      }

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
                layout={layout.value as any}
                class="v-charts-line-curve"
              />
            </Layer>
          )}
          <Dots points={currentPoints.value} />
          {
            showLabels && (
              <LabelList {...labelProps} data={lineData.value ?? []} dataKey={props.dataKey} />
            )
          }
        </Fragment>
      )
    }
  },
})

function shouldRenderDots(points: ReadonlyArray<LinePointItem>, dot: any): boolean {
  if (points == null || !points.length) {
    return false
  }
  if (dot) {
    return true
  }
  return points.length === 1
}
