import type { AreaProps, AreaPropsWithSVG } from '@/cartesian/area/type'
import type { LegendPayload } from '@/components/DefaultLegendContent'
import { useIsPanorama } from '@/context/PanoramaContextProvider'
import type { CartesianGraphicalItemType } from '@/state/graphicalItemsSlice'
import { SetCartesianGraphicalItem } from '@/state/SetGraphicalItem'
import { SetLegendPayload } from '@/state/SetLegendPayload'
import { SetTooltipEntrySettings } from '@/state/SetTooltipEntrySettings'
import { getTooltipNameProp } from '@/utils/chart'
import type { SVGAttributes } from 'vue'
import { computed, useAttrs } from 'vue'

function getLegendItemColor(stroke: string | undefined, fill: string): string {
  return stroke && stroke !== 'none' ? stroke : fill
}

export function useSetupGraphicalItem(props: AreaProps | any, type: CartesianGraphicalItemType) {
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
      type,
    }
  }))

  SetLegendPayload(legendPayload)
  SetTooltipEntrySettings({ fn: getTooltipEntrySettings as any, args: computed(() => ({
    ...props,
    ...attrs,
  } as AreaPropsWithSVG | any)) })
}

function getTooltipEntrySettings(props: AreaPropsWithSVG | any) {
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
