import { createSelector } from '@reduxjs/toolkit'
import type { RechartsRootState } from '../store'
import { selectChartDataAndAlwaysIgnoreIndexes } from './dataSelectors'
import type { ChartData, ChartDataState } from '../chartDataSlice'
import { selectChartOffset } from './selectChartOffset'
import { selectUnfilteredPolarItems } from './polarSelectors'
import type { ChartOffset, DataKey, TooltipType } from '@/types'
import type { LegendType } from '@/types/legend'
import type { LegendPayload } from '@/components/DefaultLegendContent'

export type ResolvedPieSettings = {
  name: string | number | undefined
  nameKey: DataKey<any>
  data: ChartData | undefined
  dataKey: DataKey<any> | undefined
  tooltipType?: TooltipType | undefined

  legendType: LegendType
  fill: string

  cx?: number | string
  cy?: number | string
  startAngle?: number
  endAngle?: number
  paddingAngle?: number
  minAngle?: number
  innerRadius?: number | string
  outerRadius?: number | string | ((element: any) => number)
  cornerRadius?: number | string
  presentationProps?: Record<string, string>
}

const pickPieSettings = (_state: RechartsRootState, pieSettings: ResolvedPieSettings) => pieSettings

// Keep stable reference to an empty array to prevent re-renders
// const emptyArray: ReadonlyArray<ReactElement> = []
function pickCells(_state: RechartsRootState, _pieSettings: ResolvedPieSettings,
  // cells: ReadonlyArray<ReactElement> | undefined
): ReadonlyArray<any> | undefined {
  // if (cells?.length === 0) {
  //   // return
  //   return []
  // }
  // return cells
  return []
}

export const selectDisplayedData: (
  state: RechartsRootState,
  pieSettings: ResolvedPieSettings,
  // cells: ReadonlyArray<ReactElement> | undefined,
) => ChartData | undefined = createSelector(
  [selectChartDataAndAlwaysIgnoreIndexes, pickPieSettings, pickCells],
  ({ chartData }: ChartDataState, pieSettings: ResolvedPieSettings, cells): ChartData | undefined => {
    let displayedData: ChartData | undefined
    if (pieSettings?.data?.length! > 0) {
      displayedData = pieSettings.data
    }
    else {
      displayedData = chartData
    }

    if (!displayedData || !displayedData.length) {
      // displayedData = cells.map((cell: ReactElement<CellProps>) => ({
      //   ...pieSettings.presentationProps,
      //   ...cell.props,
      // }))
    }

    if (displayedData == null) {
      return undefined
    }

    return displayedData
  },
)

export const selectPieLegend: (
  state: RechartsRootState,
  pieSettings: ResolvedPieSettings,
  // cells: ReadonlyArray<ReactElement> | undefined,
) => ReadonlyArray<LegendPayload> | undefined = createSelector(
  [selectDisplayedData, pickPieSettings, pickCells],
  (
    displayedData,
    pieSettings: ResolvedPieSettings,
    // cells: ReadonlyArray<ReactElement>,
  ): ReadonlyArray<LegendPayload> => {
    return []
    // return displayedData.map((entry, i): LegendPayload => {
    //   const name = getValueByDataKey(entry, pieSettings.nameKey, pieSettings.name)
    //   let color
    //   if (cells?.[i]?.props?.fill) {
    //     color = cells[i].props.fill
    //   }
    //   else if (typeof entry === 'object' && entry != null && 'fill' in entry) {
    //     color = entry.fill
    //   }
    //   else {
    //     color = pieSettings.fill
    //   }
    //   return {
    //     value: getTooltipNameProp(name, pieSettings.dataKey),
    //     color,
    //     payload: entry,
    //     type: pieSettings.legendType,
    //   }
    // })
  },
)

const selectSynchronisedPieSettings: (
  state: RechartsRootState,
  pieSettings: ResolvedPieSettings,
) => ResolvedPieSettings | undefined = createSelector(
  [selectUnfilteredPolarItems, pickPieSettings],
  (graphicalItems, pieSettingsFromProps) => {
    if (
      graphicalItems.some(
        pgis =>
          pgis.type === 'pie'
          && pieSettingsFromProps.dataKey === pgis.dataKey
          && pieSettingsFromProps.data === pgis.data,
      )
    ) {
      return pieSettingsFromProps
    }
    return undefined
  },
)

export const selectPieSectors: (
  state: RechartsRootState,
  pieSettings: ResolvedPieSettings,
  // cells: ReadonlyArray<ReactElement> | undefined,
  // @ts-ignore
) => Readonly<any[]> | undefined = createSelector(
  [selectDisplayedData, selectSynchronisedPieSettings, pickCells, selectChartOffset],
  (
    displayedData: ChartData | undefined,
    pieSettings: ResolvedPieSettings,
    // cells,
    offset: ChartOffset,
  ): Readonly<any[]> | undefined => {
    if (pieSettings == null || displayedData == null) {
      return undefined
    }
    return []
    // return computePieSectors({
    //   offset,
    //   pieSettings,
    //   displayedData,
    //   cells,
    // })
  },
)
