import type { MinPointSize } from '@/shape'
import type { BaseAxisWithScale } from '@/state/selectors/axisSelectors'
import type { BarSettings } from '@/state/selectors/barSelectors'
import type { ChartOffset, DataKey, TickItem } from '@/types'
import type { BarPositionPosition, BarRectangleItem } from '@/types/bar'
import { isNan, isNullish, isNumber } from '@/utils'
import { getValueByDataKey, truncateByDomain } from '@/utils/chart'
import { mathSign } from '@/utils/data'
import type { Series } from 'victory-vendor/d3-shape'

export function getBaseValueOfBar({ numericAxis }: { numericAxis: BaseAxisWithScale }): number | unknown {
  const domain = numericAxis.scale.domain()

  if (numericAxis.type === 'number') {
    // @ts-expect-error type number means the domain has numbers in it but this relationship is not known to typescript
    const minValue = Math.min(domain[0], domain[1])
    // @ts-expect-error type number means the domain has numbers in it but this relationship is not known to typescript
    const maxValue = Math.max(domain[0], domain[1])

    if (minValue <= 0 && maxValue >= 0) {
      return 0
    }
    if (maxValue < 0) {
      return maxValue
    }

    return minValue
  }

  return domain[0]
}

/**
 * Safely gets minPointSize from the minPointSize prop if it is a function
 * @param minPointSize minPointSize as passed to the Bar component
 * @param defaultValue default minPointSize
 * @returns minPointSize
 */
export function minPointSizeCallback(minPointSize: MinPointSize, defaultValue = 0) {
  return (value: unknown, index: number): number => {
    if (isNumber(minPointSize))
      return minPointSize
    const isValueNumber = isNumber(value)
    if (isValueNumber) {
      return minPointSize(value, index)
    }

    // invariant(
    //   isValueNumber,
    //   `minPointSize callback function received a value with type of ${typeof value}. Currently only numbers are supported.`,
    // )
    return defaultValue
  }
}

export function getCateCoordinateOfBar({
  axis,
  ticks,
  offset,
  bandSize,
  entry,
  index,
}: {
  axis: BaseAxisWithScale
  ticks: ReadonlyArray<TickItem>
  offset: number
  bandSize: number
  entry: any
  index: number
}) {
  if (axis.type === 'category') {
    return ticks[index] ? ticks[index].coordinate + offset : null
  }
  const value = getValueByDataKey(entry, axis.dataKey!, axis.scale.domain()[index])

  return !isNullish(value) ? axis.scale(value) - bandSize / 2 + offset : null
}

const defaultMinPointSize: number = 0

export function computeBarRectangles({
  layout,
  barSettings: { dataKey, minPointSize: minPointSizeProp },
  pos,
  bandSize,
  xAxis,
  yAxis,
  xAxisTicks,
  yAxisTicks,
  stackedData,
  dataStartIndex,
  displayedData,
  offset,
  // cells,
}: {
  layout: 'horizontal' | 'vertical'
  barSettings: BarSettings
  pos: BarPositionPosition
  bandSize: number
  xAxis?: BaseAxisWithScale
  yAxis?: BaseAxisWithScale
  xAxisTicks: TickItem[]
  yAxisTicks: TickItem[]
  stackedData: Series<Record<number, number>, DataKey<any>> | undefined
  dataStartIndex: number
  offset: ChartOffset
  displayedData: any[]
  // cells: ReadonlyArray<ReactElement> | undefined
}): ReadonlyArray<BarRectangleItem> | undefined {
  const numericAxis = (layout === 'horizontal' ? yAxis : xAxis)!
  // @ts-expect-error this assumes that the domain is always numeric, but doesn't check for it
  const stackedDomain: ReadonlyArray<number> = stackedData ? numericAxis.scale.domain() : null
  const baseValue = getBaseValueOfBar({ numericAxis })

  return displayedData.map((entry, index): BarRectangleItem => {
    let value, x, y, width, height, background

    if (stackedData) {
      value = truncateByDomain(stackedData[dataStartIndex + index], stackedDomain)
    }
    else {
      value = getValueByDataKey(entry, dataKey)

      if (!Array.isArray(value)) {
        value = [baseValue, value]
      }
    }

    const minPointSize = minPointSizeCallback(minPointSizeProp, defaultMinPointSize)(value[1], index)

    if (layout === 'horizontal') {
      const [baseValueScale, currentValueScale] = [yAxis?.scale(value[0]), yAxis?.scale(value[1])]
      x = getCateCoordinateOfBar({
        axis: xAxis!,
        ticks: xAxisTicks,
        bandSize,
        offset: pos.offset,
        entry,
        index,
      })
      y = currentValueScale ?? baseValueScale ?? undefined
      width = pos.size
      const computedHeight = baseValueScale! - currentValueScale!
      height = isNan(computedHeight) ? 0 : computedHeight
      background = { x, y: offset.top, width, height: offset.height }

      if (Math.abs(minPointSize) > 0 && Math.abs(height) < Math.abs(minPointSize)) {
        const delta = mathSign(height || minPointSize) * (Math.abs(minPointSize) - Math.abs(height))

        y! -= delta
        height += delta
      }
    }
    else {
      const [baseValueScale, currentValueScale] = [xAxis?.scale(value[0]), xAxis?.scale(value[1])]
      x = baseValueScale
      y = getCateCoordinateOfBar({
        axis: yAxis!,
        ticks: yAxisTicks,
        bandSize,
        offset: pos.offset,
        entry,
        index,
      })
      width = currentValueScale! - baseValueScale!
      height = pos.size
      background = { x: offset.left, y, width: offset.width, height }

      if (Math.abs(minPointSize) > 0 && Math.abs(width) < Math.abs(minPointSize)) {
        const delta = mathSign(width || minPointSize) * (Math.abs(minPointSize) - Math.abs(width))
        width += delta
      }
    }

    return {
      ...entry,
      x,
      y,
      width,
      height,
      value: stackedData ? value : value[1],
      payload: entry,
      background,
      tooltipPosition: { x: x! + width! / 2, y: y! + height! / 2 },
      // ...(cells && cells[index] && cells[index].props),
    }
  })
}
