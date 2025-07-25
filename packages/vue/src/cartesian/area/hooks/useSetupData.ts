import type { AreaProps, AreaPropsWithOutSVG } from '@/cartesian/area/type'
import type { LegendPayload } from '@/components/DefaultLegendContent'
import { useIsPanorama } from '@/context/PanoramaContextProvider'
import { SetCartesianGraphicalItem } from '@/state/SetGraphicalItem'
import { SetLegendPayload } from '@/state/SetLegendPayload'
import { SetTooltipEntrySettings } from '@/state/SetTooltipEntrySettings'
import { getTooltipNameProp } from '@/utils/chart'
import type { SVGAttributes } from 'vue'
import { computed, useAttrs } from 'vue'

function getLegendItemColor(stroke: string | undefined, fill: string): string {
  return stroke && stroke !== 'none' ? stroke : fill
}

export function useSetupData(props: AreaPropsWithOutSVG) {
  const attrs = useAttrs() as SVGAttributes
  const isPanorama = useIsPanorama()
  const legendPayload = computed(() => {
    return [
      {
        inactive: props.hide,
        dataKey: props.dataKey,
        type: props.legendType,
        color: getLegendItemColor(attrs.stroke, props.fill!),
        value: getTooltipNameProp(props.name, props.dataKey)!,
        payload: {
          ...props,
        },
      },
    ] as ReadonlyArray<LegendPayload>
  })
  SetCartesianGraphicalItem(computed(() => {
    return {
      ...props,
      isPanorama,
      type: 'area',
    }
  }))

  SetLegendPayload(legendPayload)
  SetTooltipEntrySettings({ fn: getTooltipEntrySettings, args: computed(() => ({
    ...props,
    ...attrs,
  } as AreaProps)) })
}

function getTooltipEntrySettings(props: AreaProps) {
  const { dataKey, data, stroke, fill, name, hide, unit } = props
  return {
    dataDefinedOnItem: data,
    positions: undefined,
    settings: {
      stroke,
      strokeWidth: props['stroke-width'],
      fill,
      dataKey,
      nameKey: undefined,
      name: getTooltipNameProp(name, dataKey),
      hide,
      type: props.tooltipType,
      color: getLegendItemColor(stroke, fill!),
      unit,
    },
  }
}
