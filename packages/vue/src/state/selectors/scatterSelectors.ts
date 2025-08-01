import { createSelector } from '@reduxjs/toolkit'
import type { RechartsRootState } from '../store'
import type { AxisId } from '../cartesianAxisSlice'
import { selectChartDataWithIndexesIfNotInPanorama } from './dataSelectors'
import type { ChartData, ChartDataState } from '../chartDataSlice'

import {
  selectAxisWithScale,
  selectTicksOfGraphicalItem,
  selectUnfilteredCartesianItems,
  selectZAxisWithScale,
} from './axisSelectors'
import type { DataKey, ScatterPointItem, TooltipType } from '@/types'

export type ResolvedScatterSettings = {
  data: ChartData | undefined
  dataKey: DataKey<any> | undefined
  tooltipType: TooltipType | undefined
  name: string | number
}

function selectXAxisWithScale(state: RechartsRootState, xAxisId: AxisId, _yAxisId: AxisId, _zAxisId: AxisId, _scatterSettings: ResolvedScatterSettings, isPanorama: boolean) {
  return selectAxisWithScale(state, 'xAxis', xAxisId, isPanorama)
}

function selectXAxisTicks(state: RechartsRootState, xAxisId: AxisId, _yAxisId: AxisId, _zAxisId: AxisId, _scatterSettings: ResolvedScatterSettings, isPanorama: boolean) {
  return selectTicksOfGraphicalItem(state, 'xAxis', xAxisId, isPanorama)
}

function selectYAxisWithScale(state: RechartsRootState, _xAxisId: AxisId, yAxisId: AxisId, _zAxisId: AxisId, _scatterSettings: ResolvedScatterSettings, isPanorama: boolean) {
  return selectAxisWithScale(state, 'yAxis', yAxisId, isPanorama)
}

function selectYAxisTicks(state: RechartsRootState, _xAxisId: AxisId, yAxisId: AxisId, _zAxisId: AxisId, _scatterSettings: ResolvedScatterSettings, isPanorama: boolean) {
  return selectTicksOfGraphicalItem(state, 'yAxis', yAxisId, isPanorama)
}

function selectZAxis(state: RechartsRootState, _xAxisId: AxisId, _yAxisId: AxisId, zAxisId: AxisId) {
  return selectZAxisWithScale(state, 'zAxis', zAxisId, false)
}

function pickScatterSettings(_state: RechartsRootState, _xAxisId: AxisId, _yAxisId: AxisId, _zAxisId: AxisId, scatterSettings: ResolvedScatterSettings) {
  return scatterSettings
}

// function pickCells(_state: RechartsRootState, _xAxisId: AxisId, _yAxisId: AxisId, _zAxisId: AxisId, _scatterSettings: ResolvedScatterSettings): ReadonlyArray<unknown> | undefined {
//   return cells
// }

function scatterChartDataSelector(state: RechartsRootState, xAxisId: AxisId, yAxisId: AxisId, _zAxisId: AxisId, _scatterSettings: ResolvedScatterSettings, isPanorama: boolean): ChartDataState {
  return selectChartDataWithIndexesIfNotInPanorama(state, xAxisId, yAxisId, isPanorama)
}

const selectSynchronisedScatterSettings: (
  state: RechartsRootState,
  xAxisId: AxisId,
  yAxisId: AxisId,
  _zAxisId: AxisId,
  scatterSettings: ResolvedScatterSettings,
) => ResolvedScatterSettings | undefined = createSelector(
  [selectUnfilteredCartesianItems, pickScatterSettings],
  (graphicalItems, scatterSettingsFromProps) => {
    if (
      graphicalItems.some(
        cgis =>
          cgis.type === 'scatter'
          && scatterSettingsFromProps.dataKey === cgis.dataKey
          && scatterSettingsFromProps.data === cgis.data,
      )
    ) {
      return scatterSettingsFromProps
    }
    return undefined
  },
)

export const selectScatterPoints: (
  state: RechartsRootState,
  xAxisId: AxisId,
  yAxisId: AxisId,
  zAxisId: AxisId,
  scatterSettings: ResolvedScatterSettings,
  isPanorama: boolean,
  // @ts-expect-error
) => ReadonlyArray<ScatterPointItem> = createSelector(
  [
    scatterChartDataSelector,
    selectXAxisWithScale,
    selectXAxisTicks,
    selectYAxisWithScale,
    selectYAxisTicks,
    selectZAxis,
    selectSynchronisedScatterSettings,
  ],
  (
    { chartData, dataStartIndex, dataEndIndex }: ChartDataState,
    xAxis,
    xAxisTicks,
    yAxis,
    yAxisTicks,
    // zAxis: ZAxisWithScale,
    scatterSettings: ResolvedScatterSettings,
    // cells,
  ): ReadonlyArray<ScatterPointItem> | undefined => {
    if (scatterSettings == null) {
      return undefined
    }
    let displayedData: ChartData | undefined
    if (scatterSettings?.data?.length! > 0) {
      displayedData = scatterSettings.data
    }
    else {
      displayedData = chartData?.slice(dataStartIndex, dataEndIndex + 1)
    }
    if (
      displayedData == null
      || xAxis == null
      || yAxis == null
      || xAxisTicks?.length === 0
      || yAxisTicks?.length === 0
    ) {
      return undefined
    }
    return undefined
    // return computeScatterPoints({
    //   displayedData,
    //   xAxis,
    //   yAxis,
    //   zAxis,
    //   scatterSettings,
    //   xAxisTicks,
    //   yAxisTicks,
    // })
  },
)
