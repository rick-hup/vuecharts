import type { RadialCursorPoints } from '@/components/types'
import type { ChartCoordinate, Coordinate, LayoutType } from '@/types'
import { polarToCartesian } from '@/utils/polar'
import type { ChartOffsetInternal } from '@/utils/types'

export function getCursorPoints(
  layout: LayoutType,
  activeCoordinate: ChartCoordinate,
  offset: ChartOffsetInternal,
): [Coordinate, Coordinate] | RadialCursorPoints {
  let x1, y1, x2, y2

  if (layout === 'horizontal') {
    x1 = activeCoordinate.x
    x2 = x1
    y1 = offset.top
    y2 = offset.top + offset.height
  }
  else if (layout === 'vertical') {
    y1 = activeCoordinate.y
    y2 = y1
    x1 = offset.left
    x2 = offset.left + offset.width
  }
  else if (activeCoordinate.cx != null && activeCoordinate.cy != null) {
    if (layout === 'centric') {
      const { cx, cy, innerRadius, outerRadius, angle } = activeCoordinate
      const innerPoint = polarToCartesian(cx!, cy!, innerRadius!, angle!)
      const outerPoint = polarToCartesian(cx!, cy!, outerRadius!, angle!)
      x1 = innerPoint.x
      y1 = innerPoint.y
      x2 = outerPoint.x
      y2 = outerPoint.y
    }
    else {
      // @ts-expect-error TODO the state is marked as containing Coordinate but actually in polar charts it contains PolarCoordinate, we should keep the polar state separate
      return getRadialCursorPoints(activeCoordinate)
    }
  }

  return [
    { x: x1!, y: y1! },
    { x: x2!, y: y2! },
  ]
}
