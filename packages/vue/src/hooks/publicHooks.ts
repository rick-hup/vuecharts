import { computed } from 'vue'
import { useAppSelector } from '@/state/hooks'
import { selectActiveLabel, selectActiveTooltipCoordinate, selectIsTooltipActive } from '@/state/selectors/tooltipSelectors'
import { selectAxisDomain, selectTicksOfAxis } from '@/state/selectors/axisSelectors'
import { useChartHeight, useChartWidth, useMargin, useOffset } from '@/context/chartLayoutContext'
import type { AxisId } from '@/state/cartesianAxisSlice'

// Re-export existing layout hooks
export { useChartWidth, useChartHeight, useMargin, useOffset }

// Re-export existing tooltip hook
export { useActiveTooltipDataPoints } from '@/state/hooks'

/**
 * Returns whether the tooltip is currently active (visible).
 *
 * Must be used inside a chart component tree (where the Redux store is provided).
 *
 * @returns A reactive boolean indicating tooltip active state
 */
export function useIsTooltipActive() {
  return useAppSelector(selectIsTooltipActive)
}

/**
 * Returns the current coordinate of the active tooltip.
 *
 * Must be used inside a chart component tree (where the Redux store is provided).
 *
 * @returns A reactive Coordinate ({ x, y }) or undefined when no tooltip is active
 */
export function useActiveTooltipCoordinate() {
  return useAppSelector(selectActiveTooltipCoordinate)
}

/**
 * Returns the label of the currently active tooltip (the value from the axis dataKey at the hovered index).
 *
 * Must be used inside a chart component tree (where the Redux store is provided).
 *
 * @returns A reactive string label or undefined when no tooltip is active
 */
export function useActiveTooltipLabel() {
  return useAppSelector(selectActiveLabel)
}

/**
 * Returns the plot area rectangle { x, y, width, height }.
 * This is the area inside all axes, legend, and brush — where graphical items render.
 *
 * Must be used inside a chart component tree (where the Redux store is provided).
 *
 * @returns A reactive object with x, y, width, height or undefined if offset is not yet available
 */
export function usePlotArea() {
  const offset = useOffset()
  return computed(() => {
    const o = offset.value
    if (o == null)
      return undefined
    return {
      x: o.left,
      y: o.top,
      width: o.width,
      height: o.height,
    }
  })
}

/**
 * Returns the computed domain of an X axis.
 *
 * @param axisId - The axis ID (defaults to 0)
 * @returns A reactive domain (categorical or numerical) or undefined
 */
export function useXAxisDomain(axisId: AxisId = 0) {
  return useAppSelector(state => selectAxisDomain(state, 'xAxis', axisId, false))
}

/**
 * Returns the computed domain of a Y axis.
 *
 * @param axisId - The axis ID (defaults to 0)
 * @returns A reactive domain (categorical or numerical) or undefined
 */
export function useYAxisDomain(axisId: AxisId = 0) {
  return useAppSelector(state => selectAxisDomain(state, 'yAxis', axisId, false))
}

/**
 * Returns the computed tick items of an X axis.
 *
 * @param axisId - The axis ID (defaults to 0)
 * @returns A reactive array of TickItem or undefined
 */
export function useXAxisTicks(axisId: AxisId = 0) {
  return useAppSelector(state => selectTicksOfAxis(state, 'xAxis', axisId, false))
}

/**
 * Returns the computed tick items of a Y axis.
 *
 * @param axisId - The axis ID (defaults to 0)
 * @returns A reactive array of TickItem or undefined
 */
export function useYAxisTicks(axisId: AxisId = 0) {
  return useAppSelector(state => selectTicksOfAxis(state, 'yAxis', axisId, false))
}
