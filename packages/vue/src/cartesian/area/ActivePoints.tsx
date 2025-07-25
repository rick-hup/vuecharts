import { defineComponent, h } from 'vue'
import type { PropType } from 'vue'
import type { DataKey } from '@/types'
import { useActiveTooltipDataPoints, useAppSelector } from '@/state/hooks'
import { selectActiveLabel, selectActiveTooltipIndex } from '@/state/selectors/tooltipSelectors'
import type { Point } from '@/shape/Curve'
import { useTooltipAxis } from '@/context/useTooltipAxis'
import { findEntryInArray } from '@/utils/data'
import { isNullish } from '@/utils'
import { filterProps } from '@/utils/VueUtils'
import { Dot } from '@/shape/Dot'
import { Layer } from '@/container/Layer'

export interface PointType {
  readonly x: number
  readonly y: number
  readonly value?: any
  readonly payload?: any
}

/**
 * ActivePoints component for rendering the active point in Area chart.
 */
export const ActivePoints = defineComponent({
  name: 'ActivePoints',
  props: {
    points: { type: Array as PropType<ReadonlyArray<Point>>, required: true },
    mainColor: { type: String, required: true },
    itemDataKey: { type: [String, Number, Function] as PropType<DataKey<any>>, required: true },
    activeDot: { type: [Object, Boolean, Function] as PropType<any>, required: true },
  },
  setup(props) {
    const activeTooltipIndex = useAppSelector(selectActiveTooltipIndex)

    return () => {
      const { points } = props
      if (!points?.length || isNullish(activeTooltipIndex.value))
        return null

      const activePoint: PointType | undefined = points[Number(activeTooltipIndex.value)]
      if (isNullish(activePoint)) {
        return null
      }

      return renderActivePoint({
        point: activePoint!,
        childIndex: Number(activeTooltipIndex.value),
        mainColor: props.mainColor,
        dataKey: props.itemDataKey,
        activeDot: props.activeDot,
      })
    }
  },
})

function renderActivePoint({
  point,
  childIndex,
  mainColor,
  activeDot,
  dataKey,
}: {
  point: PointType
  activeDot: any
  childIndex: number
  dataKey: DataKey<any>
  /**
   * Different graphical elements have different opinion on what is their main color.
   * Sometimes stroke, sometimes fill, sometimes combination.
   */
  mainColor: string
}) {
  if (activeDot === false) {
    return null
  }
  const dotProps: any = {
    'index': childIndex,
    dataKey,
    'cx': point.x,
    'cy': point.y,
    'r': 4,
    'fill': mainColor,
    'stroke-width': 2,
    'stroke': '#fff',
    'payload': point.payload,
    'value': point.value,
    ...filterProps(activeDot, false),
  }

  let dot
  if (typeof activeDot === 'function') {
    dot = activeDot(dotProps)
  }
  else {
    dot = <Dot {...dotProps} />
  }

  return (
    <Layer class="v-charts-active-dot">
      {dot}
    </Layer>
  )
}
