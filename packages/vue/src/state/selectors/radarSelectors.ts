import { createSelector } from '@reduxjs/toolkit'
import type { RechartsRootState } from '../store'
import type { BaseAxisWithScale } from './axisSelectors'
import { selectPolarAxisScale, selectPolarAxisTicks } from './polarScaleSelectors'
import { selectAngleAxis, selectPolarViewBox, selectRadiusAxis } from './polarAxisSelectors'
import type { AxisId } from '../cartesianAxisSlice'
import { selectChartDataAndAlwaysIgnoreIndexes } from './dataSelectors'
import type { ChartDataState } from '../chartDataSlice'
import type { AngleAxisSettings, RadiusAxisSettings } from '../polarAxisSlice'
import { selectUnfilteredPolarItems } from './polarSelectors'
import type { RechartsScale } from '@/types/scale'
import type { AngleAxisForRadar, RadarComposedData, RadiusAxisForRadar } from '@/types/radar'
import type { DataKey, LayoutType, TickItem } from '@/types'
import type { PolarViewBox } from '@/cartesian/type'
import { isCategoricalAxis } from '@/utils'
import { getBandSizeOfAxis } from '@/utils/chart'
import { selectChartLayout } from '@/state/selectors/common'

function selectRadiusAxisScale(state: RechartsRootState, radiusAxisId: AxisId): RechartsScale | undefined {
  return selectPolarAxisScale(state, 'radiusAxis', radiusAxisId)
}

const selectRadiusAxisForRadar: (state: RechartsRootState, radiusAxisId: AxisId) => RadiusAxisForRadar | undefined = createSelector(
  [selectRadiusAxisScale],
  (scale: RechartsScale | undefined): RadiusAxisForRadar | undefined => {
    if (scale == null) {
      return undefined
    }
    return { scale }
  },
)

export const selectRadiusAxisForBandSize: (
  state: RechartsRootState,
  radiusAxisId: AxisId,
) => BaseAxisWithScale | undefined = createSelector(
  [selectRadiusAxis, selectRadiusAxisScale],
  (axisSettings: RadiusAxisSettings | undefined, scale: RechartsScale | undefined): BaseAxisWithScale | undefined => {
    if (axisSettings == null || scale == null) {
      return undefined
    }
    return {
      ...axisSettings,
      scale,
    }
  },
)

function selectRadiusAxisTicks(state: RechartsRootState, radiusAxisId: AxisId, _angleAxisId: AxisId, isPanorama: boolean): ReadonlyArray<TickItem> | undefined {
  return selectPolarAxisTicks(state, 'radiusAxis', radiusAxisId, isPanorama)
}

function selectAngleAxisForRadar(state: RechartsRootState, _radiusAxisId: AxisId, angleAxisId: AxisId): AngleAxisSettings | undefined {
  return selectAngleAxis(state, angleAxisId)
}

function selectPolarAxisScaleForRadar(state: RechartsRootState, _radiusAxisId: AxisId, angleAxisId: AxisId): RechartsScale | undefined {
  return selectPolarAxisScale(state, 'angleAxis', angleAxisId)
}

// @ts-ignore
export const selectAngleAxisForBandSize = createSelector(
  [selectAngleAxisForRadar, selectPolarAxisScaleForRadar],
  (axisSettings: AngleAxisSettings, scale: RechartsScale | undefined): BaseAxisWithScale | undefined => {
    if (axisSettings == null || scale == null) {
      return undefined
    }
    return {
      ...axisSettings,
      scale,
    }
  },
)

function selectAngleAxisTicks(state: RechartsRootState, _radiusAxisId: AxisId, angleAxisId: AxisId, isPanorama: boolean): ReadonlyArray<TickItem> | undefined {
  return selectPolarAxisTicks(state, 'angleAxis', angleAxisId, isPanorama)
}

// @ts-ignore
export const selectAngleAxisWithScaleAndViewport: (
  state: RechartsRootState,
  _radiusAxisId: AxisId,
  angleAxisId: AxisId,
) => AngleAxisForRadar = createSelector(
  [selectAngleAxisForRadar, selectPolarAxisScaleForRadar, selectPolarViewBox],
  (axisOptions: AngleAxisSettings, scale: RechartsScale | undefined, polarViewBox: PolarViewBox | undefined) => {
    if (polarViewBox == null) {
      return undefined
    }
    return {
      scale,
      type: axisOptions.type,
      dataKey: axisOptions.dataKey,
      cx: polarViewBox.cx,
      cy: polarViewBox.cy,
    }
  },
)

function pickDataKey(_state: RechartsRootState, _radiusAxisId: AxisId, _angleAxisId: AxisId, _isPanorama: boolean, radarDataKey: DataKey<any> | undefined): DataKey<any> | undefined {
  return radarDataKey
}

const selectBandSizeOfAxis: (
  state: RechartsRootState,
  radiusAxisId: AxisId,
  angleAxisId: AxisId,
  isPanorama: boolean,
  radarDataKey: DataKey<any> | undefined,
) => number | undefined = createSelector(
  [
    selectChartLayout,
    selectRadiusAxisForBandSize,
    selectRadiusAxisTicks,
    selectAngleAxisForBandSize,
    selectAngleAxisTicks,
  ],
  (
    layout: LayoutType,
    radiusAxis: BaseAxisWithScale | undefined,
    radiusAxisTicks: ReadonlyArray<TickItem> | undefined,
    angleAxis: BaseAxisWithScale | undefined,
    angleAxisTicks: ReadonlyArray<TickItem> | undefined,
  ) => {
    if (isCategoricalAxis(layout, 'radiusAxis')) {
      return getBandSizeOfAxis(radiusAxis, radiusAxisTicks, false)
    }
    return getBandSizeOfAxis(angleAxis, angleAxisTicks, false)
  },
)

const selectSynchronisedRadarDataKey: (
  state: RechartsRootState,
  _radiusAxisId: AxisId,
  _angleAxisId: AxisId,
  _isPanorama: boolean,
  radarDataKey: DataKey<any> | undefined,
) => DataKey<any> | undefined = createSelector(
  [selectUnfilteredPolarItems, pickDataKey],
  (graphicalItems, radarDataKey) => {
    if (graphicalItems.some(pgis => pgis.type === 'radar' && radarDataKey === pgis.dataKey)) {
      return radarDataKey
    }
    return undefined
  },
)

export const selectRadarPoints: (
  state: RechartsRootState,
  radiusAxisId: AxisId,
  angleAxisId: AxisId,
  isPanorama: boolean,
  radarDataKey: DataKey<any> | undefined,
  // @ts-ignore
) => RadarComposedData | undefined = createSelector(
  [
    selectRadiusAxisForRadar,
    selectAngleAxisWithScaleAndViewport,
    selectChartDataAndAlwaysIgnoreIndexes,
    selectSynchronisedRadarDataKey,
    selectBandSizeOfAxis,
  ],
  (
    radiusAxis: RadiusAxisForRadar,
    angleAxis: AngleAxisForRadar,
    { chartData, dataStartIndex, dataEndIndex }: ChartDataState,
    dataKey: DataKey<any> | undefined,
    bandSize: number | undefined,
  ) => {
    if (radiusAxis == null || angleAxis == null || chartData == null || bandSize == null || dataKey == null) {
      return undefined
    }
    // const displayedData = chartData.slice(dataStartIndex, dataEndIndex + 1)
    return undefined
    // return computeRadarPoints({
    //   radiusAxis,
    //   angleAxis,
    //   displayedData,
    //   dataKey,
    //   bandSize,
    // })
  },
)
