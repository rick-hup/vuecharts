import type { Point } from '@/shape'
import type { PropType } from 'vue'
import { defineComponent, ref, watch } from 'vue'
import { animate, useDomRef } from 'motion-v'
import { isNumber, isWellBehavedNumber } from '@/utils'
import { AreaVueProps } from '@/cartesian/area/type'
import { useAreaContext } from '@/cartesian/area/hooks/useArea'

const HorizontalRect = defineComponent({
  name: 'HorizontalRect',
  props: {
    alpha: {
      type: Number,
      required: true,
    },
    points: {
      type: Array as PropType<ReadonlyArray<Point>>,
      required: true,
    },
    baseLine: {
      type: [Number, Array] as PropType<number | ReadonlyArray<Point>>,
      required: true,
    },
    strokeWidth: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const { points } = props
    return () => {
      const { alpha, baseLine, strokeWidth } = props
      const startX = points[0].x
      const endX = points[points.length - 1].x
      const width = alpha * Math.abs(startX - endX)
      let maxY = Math.max(...points.map(entry => entry.y || 0))
      if (isNumber(baseLine)) {
        maxY = Math.max(baseLine, maxY)
      }
      else if (baseLine && Array.isArray(baseLine) && baseLine.length) {
        maxY = Math.max(...baseLine.map(entry => entry.y || 0), maxY)
      }
      if (isNumber(maxY)) {
        return (
          <rect
            x={startX < endX ? startX : startX - width}
            y={0}
            width={width}
            height={Math.floor(maxY + (strokeWidth ? parseInt(`${strokeWidth}`, 10) : 1))}
          />
        )
      }
      return null
    }
  },
})
const VerticalRect = defineComponent({
  name: 'VerticalRect',
  props: {
    alpha: {
      type: Number,
      required: true,
    },
    points: {
      type: Array as PropType<ReadonlyArray<Point>>,
      required: true,
    },
    baseLine: {
      type: [Number, Array] as PropType<number | ReadonlyArray<Point>>,
      required: true,
    },
    strokeWidth: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const { points } = props
    return () => {
      const { alpha, baseLine, strokeWidth } = props
      const startY = points[0].y
      const endY = points[points.length - 1].y
      if (!isWellBehavedNumber(startY) || !isWellBehavedNumber(endY)) {
        return null
      }
      const height = alpha * Math.abs(startY - endY)
      let maxX = Math.max(...points.map(entry => entry.x || 0))
      if (isNumber(baseLine)) {
        maxX = Math.max(baseLine, maxX)
      }
      else if (baseLine && Array.isArray(baseLine) && baseLine.length) {
        maxX = Math.max(...baseLine.map(entry => entry.x || 0), maxX)
      }
      return (
        <rect
          x={0}
          y={startY < endY ? startY : startY - height}
          width={maxX + (strokeWidth ? parseInt(`${strokeWidth}`, 10) : 1)}
          height={Math.floor(height)}
        />
      )
    }
  },
})
export const ClipRect = defineComponent({
  name: 'ClipRect',
  props: {
    onAnimationEnd: AreaVueProps.onAnimationEnd,
  },
  setup(_props) {
    const { points, props, areaData, layout } = useAreaContext()
    let isAnimate = false
    const alpha = ref(0)
    const domRef = useDomRef()
    watch([points, domRef], (newPoints) => {
      if (!domRef.value)
        return
      if (newPoints.length && !isAnimate) {
        isAnimate = true
        animate({ x: 0 }, { x: 1 }, {
          ...props.transition,
          onUpdate(latest) {
            alpha.value = latest
          },
          onComplete() {
            _props.onAnimationEnd?.()
          },
          onPlay() {
            props.onAnimationStart?.()
          },
        })
      }
    }, {
      immediate: true,
    })
    return () => {
      const baseLine = areaData.value?.baseLine
      if (layout.value === 'horizontal') {
        return <HorizontalRect ref={domRef} alpha={alpha.value} points={points.value!} baseLine={baseLine!} strokeWidth={props.strokeWidth || 2} />
      }
      return <VerticalRect ref={domRef} alpha={alpha.value} points={points.value!} baseLine={baseLine!} strokeWidth={props.strokeWidth || 2} />
    }
  },
})
