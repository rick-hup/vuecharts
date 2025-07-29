import type { SVGAttributes, SlotsType } from 'vue'
import { Fragment, defineComponent } from 'vue'
import type { AreaProps, AreaPropsWithSVG } from './type'
import { AreaVueProps } from './type'
import { useSetupData } from '@/cartesian/area/hooks/useSetupData'
import { useArea } from '@/cartesian/area/hooks/useArea'
import { Layer } from '@/container/Layer'
import { RenderArea } from '@/cartesian/area/RenderArea'
import { ActivePoints } from '@/cartesian/area/ActivePoints'
import type { ActivePointsSlots } from './ActivePoints'
import { LabelList } from '@/components/label/LabelList'
import { selectChartDataWithIndexesIfNotInPanorama } from '@/state/selectors/dataSelectors'
import { useAppSelector } from '@/state/hooks'
import { useIsPanorama } from '@/context/PanoramaContextProvider'

export const Area = defineComponent<AreaPropsWithSVG>({
  name: 'Area',
  props: AreaVueProps,
  inheritAttrs: false,
  slots: Object as SlotsType<ActivePointsSlots>,
  setup(props: AreaProps, { attrs, slots }: { attrs: SVGAttributes, slots: ActivePointsSlots }) {
    useSetupData(props)
    const { shouldRender, areaData } = useArea(props, attrs)

    return () => {
      if (!shouldRender.value) {
        return null
      }
      let activeDot
      if (slots.activeDot) {
        activeDot = {
          activeDot: slots.activeDot,
        }
      }
      console.log('areaData.value?.points', areaData.value?.points, props.dataKey)
      return (
        <Fragment>
          <Layer class={['v-charts-area', attrs.class]}>
            <RenderArea />
          </Layer>
          <ActivePoints
            points={areaData.value?.points ?? []}
            mainColor={getLegendItemColor(attrs.stroke, props.fill!)}
            itemDataKey={props.dataKey}
            activeDot={props.activeDot}
          >
            {activeDot}
          </ActivePoints>
          <LabelList data={areaData.value?.points ?? []} dataKey={props.dataKey} />
        </Fragment>
      )
    }
  },
})

function getLegendItemColor(stroke: string | undefined, fill: string): string {
  return stroke && stroke !== 'none' ? stroke : fill
}
