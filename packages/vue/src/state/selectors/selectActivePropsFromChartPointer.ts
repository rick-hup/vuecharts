import { createSelector } from '@reduxjs/toolkit'
import type { RechartsRootState } from '../store'
import type { ActiveTooltipProps } from '../tooltipSlice'
import { selectTooltipAxisRangeWithReverse, selectTooltipAxisTicks, selectTooltipAxisType } from './tooltipSelectors'
import { selectChartOffset } from './selectChartOffset'
import { combineActiveProps, selectOrderedTooltipTicks } from './selectors'
import { selectPolarViewBox } from './polarAxisSelectors'
import type { ChartPointer } from '@/types'
import { selectChartLayout } from '@/state/selectors/common'

const pickChartPointer = (_state: RechartsRootState, chartPointer: ChartPointer) => chartPointer

// @ts-expect-error createSelector is not typed well
export const selectActivePropsFromChartPointer: (
  state: RechartsRootState,
  chartPointer: ChartPointer,
) => ActiveTooltipProps = createSelector(
  [
    pickChartPointer,
    selectChartLayout,
    selectPolarViewBox,
    selectTooltipAxisType,
    selectTooltipAxisRangeWithReverse,
    selectTooltipAxisTicks,
    selectOrderedTooltipTicks,
    selectChartOffset,
  ],
  combineActiveProps,
)
