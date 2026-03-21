import { useAppSelector } from '@/state/hooks'
import { selectActiveLabel, selectActiveTooltipCoordinate, selectIsTooltipActive } from '@/state/selectors/tooltipSelectors'

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
