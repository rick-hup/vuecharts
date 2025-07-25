import { createSelector } from '@reduxjs/toolkit'
import type { Series } from 'victory-vendor/d3-shape'
import { selectChartDataAndAlwaysIgnoreIndexes, selectChartDataWithIndexes } from './dataSelectors'
import type { RechartsRootState } from '../store'
import type { ChartDataState } from '../chartDataSlice'
import type { AxisId } from '../cartesianAxisSlice'
import { selectPolarAxisScale, selectPolarAxisTicks, selectPolarGraphicalItemAxisTicks } from './polarScaleSelectors'
import type { BaseAxisWithScale, StackGroup } from './axisSelectors'
import { combineStackGroups } from './axisSelectors'
import { selectAngleAxis, selectPolarViewBox, selectRadiusAxis } from './polarAxisSelectors'
import type {
  BarWithPosition,
  MaybeStackedGraphicalItem,
  SizeList,
} from './barSelectors'
import {
  combineAllBarPositions,
  combineBarSizeList,
  combineStackedData,
} from './barSelectors'
import {
  selectBarCategoryGap,
  selectBarGap,
  selectRootBarSize,
  selectRootMaxBarSize,
  selectStackOffsetType,
} from './rootPropsSelectors'
import type { PolarGraphicalItemSettings } from '../graphicalItemsSlice'
import type {
  PolarAxisType,
} from './polarSelectors'
import {
  selectPolarDisplayedData,
  selectPolarItemsSettings,
  selectUnfilteredPolarItems,
} from './polarSelectors'
import type { AngleAxisSettings, RadiusAxisSettings } from '../polarAxisSlice'
import type { DataKey, LayoutType, TickItem } from '@/types'
import type { StackId } from '@/types/tick'
import type { RechartsScale } from '@/types/scale'
import { isCategoricalAxis, isNullish } from '@/utils'
import { getBandSizeOfAxis } from '@/utils/chart'
import { getBaseValueOfBar } from '@/cartesian/bar/utils'
import type { BarPositionPosition } from '@/types/bar'
import type { PolarViewBox } from '@/cartesian/type'
import type { LegendType } from '@/types/legend'
import type { LegendPayload } from '@/components/DefaultLegendContent'
import { selectChartLayout } from '@/state/selectors/common'

export interface RadialBarSettings extends MaybeStackedGraphicalItem {
  dataKey: DataKey<any> | undefined
  minPointSize: number
  stackId: StackId | undefined
  maxBarSize: number | undefined
}

function selectRadiusAxisForRadialBar(state: RechartsRootState, radiusAxisId: AxisId): RadiusAxisSettings {
  return selectRadiusAxis(state, radiusAxisId)!
}

function selectRadiusAxisScaleForRadar(state: RechartsRootState, radiusAxisId: AxisId): RechartsScale | undefined {
  return selectPolarAxisScale(state, 'radiusAxis', radiusAxisId)
}

export const selectRadiusAxisWithScale: (state: RechartsRootState, radiusAxisId: AxisId) => BaseAxisWithScale | undefined
  = createSelector(
    [selectRadiusAxisForRadialBar, selectRadiusAxisScaleForRadar],
    (axis: RadiusAxisSettings, scale: RechartsScale | undefined) => {
      if (axis == null || scale == null) {
        return undefined
      }
      return { ...axis, scale }
    },
  )

export function selectRadiusAxisTicks(state: RechartsRootState, radiusAxisId: AxisId, _angleAxisId: AxisId, isPanorama: boolean): ReadonlyArray<TickItem> | undefined {
  return selectPolarGraphicalItemAxisTicks(state, 'radiusAxis', radiusAxisId, isPanorama)
}

function selectAngleAxisForRadialBar(state: RechartsRootState, _radiusAxisId: AxisId, angleAxisId: AxisId): AngleAxisSettings {
  return selectAngleAxis(state, angleAxisId)!
}

function selectAngleAxisScaleForRadialBar(state: RechartsRootState, _radiusAxisId: AxisId, angleAxisId: AxisId): RechartsScale | undefined {
  return selectPolarAxisScale(state, 'angleAxis', angleAxisId)
}

export const selectAngleAxisWithScale: (
  state: RechartsRootState,
  _radiusAxisId: AxisId,
  angleAxisId: AxisId,
) => BaseAxisWithScale | undefined = createSelector(
  [selectAngleAxisForRadialBar, selectAngleAxisScaleForRadialBar],
  (axis: AngleAxisSettings, scale: RechartsScale | undefined) => {
    if (axis == null || scale == null) {
      return undefined
    }
    return { ...axis, scale }
  },
)

function selectAngleAxisTicks(state: RechartsRootState, _radiusAxisId: AxisId, angleAxisId: AxisId, isPanorama: boolean): ReadonlyArray<TickItem> | undefined {
  return selectPolarAxisTicks(state, 'angleAxis', angleAxisId, isPanorama)
}

function pickRadialBarSettings(_state: RechartsRootState, _radiusAxisId: AxisId, _angleAxisId: AxisId, radialBarSettings: RadialBarSettings): RadialBarSettings {
  return radialBarSettings
}

const selectSynchronisedRadialBarSettings: (
  state: RechartsRootState,
  _radiusAxisId: AxisId,
  _angleAxisId: AxisId,
  radialBarSettings: RadialBarSettings,
) => RadialBarSettings | undefined = createSelector(
  [selectUnfilteredPolarItems, pickRadialBarSettings],
  (graphicalItems, radialBarSettingsFromProps) => {
    if (
      graphicalItems.some(
        pgis =>
          pgis.type === 'radialBar'
          && radialBarSettingsFromProps.dataKey === pgis.dataKey
          && radialBarSettingsFromProps.stackId === pgis.stackId,
      )
    ) {
      return radialBarSettingsFromProps
    }
    return undefined
  },
)

export const selectBandSizeOfPolarAxis: (
  state: RechartsRootState,
  radiusAxisId: AxisId,
  angleAxisId: AxisId,
  isPanorama: boolean,
) => number | undefined = createSelector(
  [selectChartLayout, selectRadiusAxisWithScale, selectRadiusAxisTicks, selectAngleAxisWithScale, selectAngleAxisTicks],
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

export const selectBaseValue: (
  state: RechartsRootState,
  radiusAxisId: AxisId,
  angleAxisId: AxisId,
) => number | unknown = createSelector(
  [selectAngleAxisWithScale, selectRadiusAxisWithScale, selectChartLayout],
  (angleAxis, radiusAxis, layout) => {
    const numericAxis = layout === 'radial' ? angleAxis : radiusAxis
    if (numericAxis == null || numericAxis.scale == null) {
      return undefined
    }
    return getBaseValueOfBar({ numericAxis })
  },
)

function pickCells(_state: RechartsRootState, _radiusAxisId: AxisId, _angleAxisId: AxisId, _radialBarSettings: RadialBarSettings) {
  return undefined
}

function pickAngleAxisId(_state: RechartsRootState, _radiusAxisId: AxisId, angleAxisId: AxisId, _radialBarSettings: RadialBarSettings): AxisId {
  return angleAxisId
}

function pickRadiusAxisId(_state: RechartsRootState, radiusAxisId: AxisId, _angleAxisId: AxisId, _radialBarSettings: RadialBarSettings): AxisId {
  return radiusAxisId
}

export function pickMaxBarSize(_state: RechartsRootState, _radiusAxisId: AxisId, _angleAxisId: AxisId, radialBarSettings: RadialBarSettings): number | undefined {
  return radialBarSettings.maxBarSize
}

const selectAllVisibleRadialBars: (
  state: RechartsRootState,
  radiusAxisId: AxisId,
  angleAxisId: AxisId,
  radialBarSettings: RadialBarSettings,
) => ReadonlyArray<PolarGraphicalItemSettings> = createSelector(
  [selectChartLayout, selectUnfilteredPolarItems, pickAngleAxisId, pickRadiusAxisId],
  (
    layout: LayoutType,
    allItems: ReadonlyArray<PolarGraphicalItemSettings>,
    angleAxisId: AxisId,
    radiusAxisId: AxisId,
  ): ReadonlyArray<PolarGraphicalItemSettings> => {
    return allItems
      .filter((i) => {
        if (layout === 'centric') {
          return i.angleAxisId === angleAxisId
        }
        return i.radiusAxisId === radiusAxisId
      })
      .filter(i => i.hide === false)
      .filter(i => i.type === 'radialBar')
  },
)

/**
 * The generator never returned the totalSize which means that barSize in polar chart can not support percent values.
 * We can add that if we want to I suppose.
 * @returns undefined - but it should be a total size of numerical axis in polar chart
 */
const selectPolarBarAxisSize = (): undefined => undefined

export const selectPolarBarSizeList: (
  state: RechartsRootState,
  radiusAxisId: AxisId,
  angleAxisId: AxisId,
  radialBarSettings: RadialBarSettings,
  // @ts-expect-error createSelector is not typed well
) => SizeList | undefined = createSelector(
  [selectAllVisibleRadialBars, selectRootBarSize, selectPolarBarAxisSize],
  combineBarSizeList,
)

// @ts-expect-error createSelector is not typed well
export const selectPolarBarBandSize: (
  state: RechartsRootState,
  radiusAxisId: AxisId,
  angleAxisId: AxisId,
  radialBarSettings: RadialBarSettings,
) => number | undefined = createSelector(
  [
    selectChartLayout,
    selectRootMaxBarSize,
    selectAngleAxisWithScale,
    selectAngleAxisTicks,
    selectRadiusAxisWithScale,
    selectRadiusAxisTicks,
    pickMaxBarSize,
  ],
  (
    layout: LayoutType,
    globalMaxBarSize: number | undefined,
    angleAxis,
    angleAxisTicks,
    radiusAxis,
    radiusAxisTicks,
    childMaxBarSize: number | undefined,
  ): number | undefined => {
    const maxBarSize: number = isNullish(childMaxBarSize) ? globalMaxBarSize! : childMaxBarSize!
    if (layout === 'centric') {
      return getBandSizeOfAxis(angleAxis, angleAxisTicks, true) ?? maxBarSize ?? 0
    }
    return getBandSizeOfAxis(radiusAxis, radiusAxisTicks, true) ?? maxBarSize ?? 0
  },
)

export const selectAllPolarBarPositions: (
  state: RechartsRootState,
  radiusAxisId: AxisId,
  angleAxisId: AxisId,
  radialBarSettings: RadialBarSettings,
  // @ts-expect-error createSelector is not typed well
) => ReadonlyArray<BarWithPosition> | undefined = createSelector(
  [
    selectPolarBarSizeList,
    selectRootMaxBarSize,
    selectBarGap,
    selectBarCategoryGap,
    selectPolarBarBandSize,
    selectBandSizeOfPolarAxis,
    pickMaxBarSize,
  ],
  combineAllBarPositions,
)

export const selectPolarBarPosition: (
  state: RechartsRootState,
  radiusAxisId: AxisId,
  angleAxisId: AxisId,
  radialBarSettings: RadialBarSettings,
  // @ts-expect-error createSelector is not typed well
) => BarPositionPosition | undefined = createSelector(
  [selectAllPolarBarPositions, selectSynchronisedRadialBarSettings],
  (allBarPositions: ReadonlyArray<BarWithPosition>, barSettings: RadialBarSettings) => {
    if (allBarPositions == null || barSettings == null) {
      return undefined
    }
    const position = allBarPositions.find(
      (p: BarWithPosition) => p.stackId === barSettings.stackId && p.dataKeys.includes(barSettings.dataKey!),
    )
    if (position == null) {
      return undefined
    }
    return position.position
  },
)

const selectStackGroups: (
  state: RechartsRootState,
  axisType: PolarAxisType,
  polarAxisId: AxisId,
  // @ts-expect-error createSelector is not typed well
) => Record<StackId, StackGroup> | undefined = createSelector(
  [selectPolarDisplayedData, selectPolarItemsSettings, selectStackOffsetType],
  combineStackGroups,
)

const selectRadialBarStackGroups: (
  state: RechartsRootState,
  radiusAxisId: AxisId,
  angleAxisId: AxisId,
  radialBarSettings: RadialBarSettings,
) => Record<StackId, StackGroup> | undefined = (state, radiusAxisId, angleAxisId) => {
  const layout = selectChartLayout(state)
  if (layout === 'centric') {
    return selectStackGroups(state, 'radiusAxis', radiusAxisId)
  }
  return selectStackGroups(state, 'angleAxis', angleAxisId)
}

const selectPolarStackedData: (
  state: RechartsRootState,
  radiusAxisId: AxisId,
  angleAxisId: AxisId,
  radialBarSettings: RadialBarSettings,
  // @ts-expect-error createSelector is not typed well
) => Series<Record<number, number>, DataKey<any>> | undefined = createSelector(
  [selectRadialBarStackGroups, selectSynchronisedRadialBarSettings],
  combineStackedData,
)

export const selectRadialBarSectors: (
  state: RechartsRootState,
  radiusAxisId: AxisId,
  angleAxisId: AxisId,
  radialBarSettings: RadialBarSettings,
) => ReadonlyArray<any> | undefined = createSelector(
  [
    selectAngleAxisWithScale,
    selectAngleAxisTicks,
    selectRadiusAxisWithScale,
    selectRadiusAxisTicks,
    selectChartDataWithIndexes,
    selectSynchronisedRadialBarSettings,
    selectBandSizeOfPolarAxis,
    selectChartLayout,
    selectBaseValue,
    selectPolarViewBox,
    pickCells,
    selectPolarBarPosition,
    selectPolarStackedData,
  ],
  (
    angleAxis: BaseAxisWithScale,
    angleAxisTicks: ReadonlyArray<TickItem> | undefined,
    radiusAxis: BaseAxisWithScale,
    radiusAxisTicks: ReadonlyArray<TickItem> | undefined,
    { chartData, dataStartIndex, dataEndIndex }: ChartDataState,
    radialBarSettings: RadialBarSettings,
    bandSize: number | undefined,
    layout: LayoutType,
    baseValue: number | unknown,
    polarViewBox: PolarViewBox,
    pos: BarPositionPosition | undefined,
    stackedData: Series<Record<number, number>, DataKey<any>> | undefined,
  ) => {
    if (
      radialBarSettings == null
      || radiusAxis == null
      || angleAxis == null
      || chartData == null
      || bandSize == null
      || pos == null
      || (layout !== 'centric' && layout !== 'radial')
    ) {
      return undefined
    }
    // const { dataKey, minPointSize } = radialBarSettings
    // const { cx, cy, startAngle, endAngle } = polarViewBox
    // const displayedData = chartData.slice(dataStartIndex, dataEndIndex + 1)
    // const numericAxis = layout === 'centric' ? radiusAxis : angleAxis
    // const stackedDomain: ReadonlyArray<unknown> | null = stackedData ? numericAxis.scale.domain() : null
    return undefined
    // return computeRadialBarDataItems({
    //   angleAxis,
    //   angleAxisTicks,
    //   bandSize,
    //   baseValue,
    //   cells,
    //   cx,
    //   cy,
    //   dataKey,
    //   dataStartIndex,
    //   displayedData,
    //   endAngle,
    //   layout,
    //   minPointSize,
    //   pos,
    //   radiusAxis,
    //   radiusAxisTicks,
    //   stackedData,
    //   stackedDomain,
    //   startAngle,
    // })
  },
)

// @ts-expect-error createSelector is not typed well
export const selectRadialBarLegendPayload: (state: RechartsRootState, legendType: LegendType) => Array<LegendPayload> | undefined
  = createSelector(
    [selectChartDataAndAlwaysIgnoreIndexes, (_s: RechartsRootState, l: LegendType) => l],
    ({ chartData, dataStartIndex, dataEndIndex }: ChartDataState, legendType: LegendType) => {
      if (chartData == null) {
        return []
      }
      const displayedData = chartData.slice(dataStartIndex, dataEndIndex + 1)

      if (displayedData.length === 0) {
        return []
      }

      return displayedData.map((entry) => {
        return {
          type: legendType,
          // @ts-expect-error we need a better typing for our data inputs
          value: entry.name,
          // @ts-expect-error we need a better typing for our data inputs
          color: entry.fill,
          payload: entry,
        }
      })
    },
  )
