import { CartesianAxisDefaultProps } from '@/cartesian/cartesian-grid/const'
import type { AxisPropsForCartesianGridTicksGeneration } from '@/cartesian/cartesian-grid/type'
import { getTicks } from '@/cartesian/utils/get-ticks'
import type { ChartOffset, TickItem } from '@/types'
import { getTicksOfAxis } from '@/utils/chart'

/**
 * Calculate the Coordinates of grid
 * @param  {Array} ticks           The ticks in axis
 * @param {number} minValue        The minimum value of axis
 * @param {number} maxValue        The maximum value of axis
 * @param {boolean} syncWithTicks  Synchronize grid lines with ticks or not
 * @return {Array}                 Coordinates
 */
export function getCoordinatesOfGrid(ticks: ReadonlyArray<TickItem>, minValue: number, maxValue: number, syncWithTicks: boolean) {
  if (syncWithTicks) {
    return ticks.map(entry => entry.coordinate)
  }

  let hasMin, hasMax

  const values = ticks.map((entry) => {
    if (entry.coordinate === minValue) {
      hasMin = true
    }
    if (entry.coordinate === maxValue) {
      hasMax = true
    }

    return entry.coordinate
  })

  if (!hasMin) {
    values.push(minValue)
  }
  if (!hasMax) {
    values.push(maxValue)
  }

  return values
}

export type HorizontalCoordinatesGenerator = (
  props: {
    yAxis: AxisPropsForCartesianGridTicksGeneration
    width: number
    height: number
    offset: ChartOffset
  },
  syncWithTicks: boolean,
) => number[]

export const defaultHorizontalCoordinatesGenerator: HorizontalCoordinatesGenerator = (
  { yAxis, width, height, offset },
  syncWithTicks,
) => {
  return getCoordinatesOfGrid(
    getTicks({
      ...CartesianAxisDefaultProps,
      ...yAxis,
      ticks: getTicksOfAxis(yAxis, true)!,
      viewBox: { x: 0, y: 0, width, height },
    }),
    offset.top!,
    offset.top! + offset.height!,
    syncWithTicks,
  )
}

export type VerticalCoordinatesGenerator = (
  props: {
    xAxis: AxisPropsForCartesianGridTicksGeneration
    width: number
    height: number
    offset: ChartOffset
  },
  syncWithTicks: boolean,
) => number[]

export const defaultVerticalCoordinatesGenerator: VerticalCoordinatesGenerator = (
  { xAxis, width, height, offset },
  syncWithTicks,
) => {
  return getCoordinatesOfGrid(
    getTicks({
      ...CartesianAxisDefaultProps,
      ...xAxis,
      ticks: getTicksOfAxis(xAxis, true)!,
      viewBox: { x: 0, y: 0, width, height },
    }),
    offset.left!,
    offset.left! + offset.width!,
    syncWithTicks,
  )
}

export function calculateHorizontalPoints(
  yAxis: AxisPropsForCartesianGridTicksGeneration,
  width: number,
  height: number,
  offset: ChartOffset,
  syncWithTicks: boolean,
  customPoints?: number[],
  horizontalValues?: number[] | string[],
  horizontalCoordinatesGenerator?: (
    props: {
      yAxis: AxisPropsForCartesianGridTicksGeneration
      width: number
      height: number
      offset: ChartOffset
    },
    syncWithTicks: boolean,
  ) => number[],
): number[] {
  // 1. Use customPoints if provided and non-empty
  if (Array.isArray(customPoints) && customPoints.length > 0) {
    // Use directly provided horizontalPoints
    return customPoints
  }
  horizontalCoordinatesGenerator = horizontalCoordinatesGenerator ?? defaultHorizontalCoordinatesGenerator
  // 2. Use horizontalCoordinatesGenerator if provided
  if (typeof horizontalCoordinatesGenerator === 'function') {
    // If horizontalValues is provided, override yAxis.ticks
    const yAxisWithTicks = horizontalValues && horizontalValues.length
      ? { ...yAxis, ticks: horizontalValues }
      : yAxis
    // If horizontalValues is provided, force syncWithTicks to true
    const forceSyncWithTicks = !!(horizontalValues && horizontalValues.length) || syncWithTicks
    return horizontalCoordinatesGenerator(
      {
        yAxis: yAxisWithTicks,
        width,
        height,
        offset,
      },
      forceSyncWithTicks,
    )
  }
  return []
}

export function calculateVerticalPoints(
  xAxis: AxisPropsForCartesianGridTicksGeneration,
  width: number,
  height: number,
  offset: ChartOffset,
  syncWithTicks: boolean,
  customPoints?: number[],
  verticalValues?: number[] | string[],
  verticalCoordinatesGenerator?: (
    props: {
      xAxis: AxisPropsForCartesianGridTicksGeneration
      width: number
      height: number
      offset: ChartOffset
    },
    syncWithTicks: boolean,
  ) => number[],
): number[] {
  // 1. Use customPoints if provided and non-empty
  if (Array.isArray(customPoints) && customPoints.length > 0) {
    // Use directly provided verticalPoints
    return customPoints
  }
  verticalCoordinatesGenerator = verticalCoordinatesGenerator ?? defaultVerticalCoordinatesGenerator
  // 2. Use verticalCoordinatesGenerator if provided
  if (typeof verticalCoordinatesGenerator === 'function') {
    // If verticalValues is provided, override xAxis.ticks
    const xAxisWithTicks = verticalValues && verticalValues.length
      ? { ...xAxis, ticks: verticalValues }
      : xAxis
    // If verticalValues is provided, force syncWithTicks to true
    const forceSyncWithTicks = !!(verticalValues && verticalValues.length) || syncWithTicks
    const result = verticalCoordinatesGenerator(
      {
        xAxis: xAxisWithTicks,
        width,
        height,
        offset,
      },
      forceSyncWithTicks,
    )
    return result
  }
  return []
}
