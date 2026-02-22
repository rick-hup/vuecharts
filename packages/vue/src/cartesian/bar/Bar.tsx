import type { SVGAttributes, SlotsType } from 'vue'
import { computed, defineComponent } from 'vue'
import type { BarProps, BarPropsWithSVG } from './type'
import { BarVueProps } from './type'
import { useBar } from '@/cartesian/bar/hooks/useBar'
import { Layer } from '@/container/Layer'
import { useSetupGraphicalItem } from '@/hooks/useSetupGraphicalItem'
import { GraphicalItemClipPath } from '@/cartesian/GraphicalItemClipPath'
import { BarBackground } from '@/cartesian/bar/components/BarBackground'
import { BarRectangles } from '@/cartesian/bar/components/BarRectangles'
import { useNeedsClip } from '@/cartesian/useNeedsClip'
import { useChartLayout } from '@/context/chartLayoutContext'
import { provideErrorBarContext } from '@/cartesian/error-bar/ErrorBarContext'
import { LabelList } from '@/components/label'
import type { ErrorBarDataItem, ErrorBarDataPointFormatter } from '@/cartesian/error-bar/ErrorBarContext'
import type { BarRectangleItem } from '@/types/bar'
import { getValueByDataKey } from '@/utils/chart'

const errorBarDataPointFormatter: ErrorBarDataPointFormatter<BarRectangleItem> = (
  dataPoint,
  dataKey,
): ErrorBarDataItem => {
  const value = Array.isArray(dataPoint.value) ? dataPoint.value[1] : dataPoint.value
  return {
    x: dataPoint.x,
    y: dataPoint.y,
    value: value as number,
    errorVal: getValueByDataKey(dataPoint.payload ?? dataPoint, dataKey),
  }
}

export const Bar = defineComponent<BarPropsWithSVG>({
  name: 'Bar',
  props: BarVueProps,
  inheritAttrs: false,
  slots: Object as SlotsType<{
    default?: () => any
    activeDot?: (props: any) => any
  }>,
  setup(props: BarProps, { attrs, slots }: { attrs: SVGAttributes, slots: any }) {
    useSetupGraphicalItem(props, 'bar')
    const { shouldRender, clipPathId, barData } = useBar(props)
    const { needClip } = useNeedsClip(props.xAxisId, props.yAxisId)
    const layout = useChartLayout()

    const errorBarOffset = computed(() => {
      const first = barData.value?.[0]
      if (first == null || first.height == null || first.width == null) return 0
      return layout.value === 'vertical' ? first.height / 2 : first.width / 2
    })

    provideErrorBarContext({
      data: barData,
      xAxisId: props.xAxisId ?? 'xAxis-0',
      yAxisId: props.yAxisId ?? 'yAxis-0',
      dataPointFormatter: errorBarDataPointFormatter,
      errorBarOffset,
    })

    return () => {
      if (!shouldRender.value) {
        return null
      }

      return (
        <Layer class={['v-charts-bar', attrs.class]}>
          {
            needClip.value && (
              <defs>
                <GraphicalItemClipPath clipPathId={clipPathId} xAxisId={props.xAxisId} yAxisId={props.yAxisId} />
              </defs>
            )
          }
          <Layer class="v-charts-bar-rectangles" clip-path={needClip.value ? `url(#clipPath-${clipPathId})` : null}>
            {props.background && <BarBackground />}
            <BarRectangles />
          </Layer>
          {props.label && (
            <LabelList
              {...(typeof props.label === 'object' ? props.label : {})}
              data={barData.value}
            />
          )}
          {slots.default?.()}
        </Layer>
      )
    }
  },
})
