import type { SVGAttributes, SlotsType } from 'vue'
import { Fragment, defineComponent } from 'vue'
import type { LineProps, LinePropsWithSVG } from './type'
import { LineVueProps } from './type'
import { useLine } from '@/cartesian/line/hooks/useLine'
import { Layer } from '@/container/Layer'
import { StaticLine } from '@/cartesian/line/StaticLine'
import { ActivePoints } from '@/cartesian/line/ActivePoints'
import type { ActivePointsSlots } from './ActivePoints'
import { useSetupGraphicalItem } from '@/hooks/useSetupGraphicalItem'

export const Line = defineComponent({
  name: 'Line',
  props: LineVueProps,
  inheritAttrs: false,
  slots: Object as SlotsType<ActivePointsSlots & { shape?: (props: any) => any, dot?: (props: any) => any, label?: (props: any) => any }>,
  setup(props: LineProps, { attrs, slots }: { attrs: SVGAttributes, slots: any }) {
    useSetupGraphicalItem(props, 'line')
    const { shouldRender, lineData, points } = useLine(props, attrs, slots.shape, slots.dot, slots.label)

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

      return (
        <Fragment>
          <Layer class={['v-charts-line', attrs.class]}>
            <StaticLine />
          </Layer>
          <ActivePoints
            points={lineData.value ?? []}
            mainColor={attrs.stroke ?? props.stroke!}
            itemDataKey={props.dataKey}
            activeDot={props.activeDot}
          >
            {activeDot}
          </ActivePoints>
        </Fragment>
      )
    }
  },
})
