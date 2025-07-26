import type { SVGAttributes } from 'vue'
import { Fragment, defineComponent } from 'vue'
import type { AreaProps, AreaPropsWithSVG } from './type'
import { AreaVueProps } from './type'
import { useSetupData } from '@/cartesian/area/hooks/useSetupData'
import { useArea } from '@/cartesian/area/hooks/useArea'
import { Layer } from '@/container/Layer'
import { RenderArea } from '@/cartesian/area/RenderArea'
import { ActivePoints } from '@/cartesian/area/ActivePoints'
// Area component props definition
export const Area = defineComponent<AreaPropsWithSVG>({
  name: 'Area',
  props: AreaVueProps,
  inheritAttrs: false,
  setup(props: AreaProps, { attrs }: { attrs: SVGAttributes }) {
    useSetupData(props)
    const { shouldRender, areaData } = useArea(props, attrs)

    return () => {
      if (!shouldRender.value) {
        return null
      }

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
          />
        </Fragment>
      )
    }
  },
})

function getLegendItemColor(stroke: string | undefined, fill: string): string {
  return stroke && stroke !== 'none' ? stroke : fill
}
