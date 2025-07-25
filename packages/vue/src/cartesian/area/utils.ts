import type { ChartData } from '@/state/chartDataSlice'
import type { AreaPointItem, AreaSettings, ComputedArea } from '@/state/selectors/areaSelectors'
import type { BaseAxisWithScale } from '@/state/selectors/axisSelectors'
import type { Coordinate, TickItem } from '@/types'
import type { BaseValue } from '@/types/area'
import { isNumber } from '@/utils'
import { getCateCoordinateOfLine, getValueByDataKey } from '@/utils/chart'

export function getBaseValue(layout: 'horizontal' | 'vertical', chartBaseValue: BaseValue | undefined, itemBaseValue: BaseValue | undefined, xAxis: BaseAxisWithScale, yAxis: BaseAxisWithScale): number {
  // The baseValue can be defined both on the AreaChart, and on the Area.
  // The value for the item takes precedence.
  const baseValue = itemBaseValue ?? chartBaseValue

  if (isNumber(baseValue)) {
    return baseValue
  }

  const numericAxis = layout === 'horizontal' ? yAxis : xAxis
  const domain: [number, number] = numericAxis.scale.domain() as [number, number]

  if (numericAxis.type === 'number') {
    const domainMax = Math.max(domain[0], domain[1])
    const domainMin = Math.min(domain[0], domain[1])

    if (baseValue === 'dataMin') {
      return domainMin
    }
    if (baseValue === 'dataMax') {
      return domainMax
    }

    return domainMax < 0 ? domainMax : Math.max(Math.min(domain[0], domain[1]), 0)
  }

  if (baseValue === 'dataMin') {
    return domain[0]
  }
  if (baseValue === 'dataMax') {
    return domain[1]
  }

  return domain[0]
}

export function computeArea({
  areaSettings: { connectNulls, baseValue: itemBaseValue, dataKey },
  stackedData,
  layout,
  chartBaseValue,
  xAxis,
  yAxis,
  displayedData,
  dataStartIndex,
  xAxisTicks,
  yAxisTicks,
  bandSize,
}: {
  areaSettings: AreaSettings
  stackedData: number[][]
  layout: 'horizontal' | 'vertical'
  chartBaseValue: BaseValue | undefined
  xAxis: BaseAxisWithScale
  yAxis: BaseAxisWithScale
  displayedData: ChartData
  dataStartIndex: number
  xAxisTicks: TickItem[]
  yAxisTicks: TickItem[]
  bandSize: number
}): ComputedArea {
  const hasStack = stackedData && stackedData.length
  const baseValue = getBaseValue(layout, chartBaseValue, itemBaseValue, xAxis, yAxis)
  const isHorizontalLayout = layout === 'horizontal'
  let isRange = false

  const points = displayedData.map((entry, index) => {
    let value

    if (hasStack) {
      value = stackedData[dataStartIndex + index]
    }
    else {
      value = getValueByDataKey(entry, dataKey)

      if (!Array.isArray(value)) {
        value = [baseValue, value]
      }
      else {
        isRange = true
      }
    }

    const isBreakPoint = value[1] == null || (hasStack && !connectNulls && getValueByDataKey(entry, dataKey) == null)

    if (isHorizontalLayout) {
      return {
        x: getCateCoordinateOfLine({ axis: xAxis, ticks: xAxisTicks, bandSize, entry, index }),
        y: isBreakPoint ? null : yAxis.scale(value[1]),
        value,
        payload: entry,
      }
    }

    // For vertical layout
    let xCoordinate
    if (xAxis.type === 'number') {
      // Use the same coordinate calculation logic as the axis
      const xValue = getValueByDataKey(entry, xAxis.dataKey!)
      xCoordinate = xAxis.scale(xValue)

      // Find the exact tick if the value matches
      const exactTick = xAxisTicks.find(tick => tick.value === xValue)
      if (exactTick) {
        xCoordinate = exactTick.coordinate
      }
    }
    else {
      // For category type x-axis
      xCoordinate = getCateCoordinateOfLine({ axis: xAxis, ticks: xAxisTicks, bandSize, entry, index })
    }

    return {
      x: isBreakPoint ? null : xCoordinate,
      y: getCateCoordinateOfLine({ axis: yAxis, ticks: yAxisTicks, bandSize, entry, index }),
      value,
      payload: entry,
    }
  }) as AreaPointItem[]

  let baseLine
  if (hasStack || isRange) {
    baseLine = points.map((entry) => {
      const x = Array.isArray(entry.value) ? entry.value[0] : null
      if (isHorizontalLayout) {
        return {
          x: entry.x,
          y: x != null && entry.y != null ? yAxis.scale(x) : null,
        }
      }
      return {
        x: x != null ? xAxis.scale(x) : null,
        y: entry.y,
      }
    })
  }
  else {
    baseLine = isHorizontalLayout ? yAxis.scale(baseValue) : xAxis.scale(baseValue)
  }

  return {
    points,
    baseLine: baseLine as Coordinate[],
    isRange,
  }
}
