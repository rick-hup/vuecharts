import type { LegendPayload } from '@/component/DefaultLegendContent'
import type { TooltipPayloadConfiguration } from '@/state/tooltipSlice'
import { getTooltipNameProp } from '@/utils/ChartUtils'
import type { BarProps } from './type'

export function computeLegendPayloadFromBarData(props: BarProps): ReadonlyArray<LegendPayload> {
  const { dataKey, name, fill, legendType, hide } = props
  return [
    {
      inactive: hide,
      dataKey,
      type: legendType,
      color: fill,
      value: getTooltipNameProp(name, dataKey),
      payload: props,
    },
  ]
}

export function getTooltipEntrySettings(props: BarProps): TooltipPayloadConfiguration {
  const { dataKey, stroke, strokeWidth, fill, name, hide, unit } = props
  return {
    dataDefinedOnItem: undefined,
    positions: undefined,
    settings: {
      stroke,
      strokeWidth,
      fill,
      dataKey,
      nameKey: undefined,
      name: getTooltipNameProp(name, dataKey),
      hide,
      type: props.tooltipType,
      color: props.fill,
      unit,
    },
  }
}

// 其他工具函数将在实现过程中添加
