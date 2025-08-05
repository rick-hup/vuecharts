import type { SVGAttributes, SlotsType } from 'vue'
import { Fragment, defineComponent } from 'vue'
import type { BarProps, BarPropsWithSVG } from './type'
import { BarVueProps } from './type'
import { useBar } from '@/cartesian/bar/hooks/useBar'
import { Layer } from '@/container/Layer'
import { RenderBar } from '@/cartesian/bar/RenderBar'
import { useSetupGraphicalItem } from '@/hooks/useSetupGraphicalItem'

export const Bar = defineComponent<BarPropsWithSVG>({
  name: 'Bar',
  props: BarVueProps,
  inheritAttrs: false,
  setup(props: BarProps, { attrs }: { attrs: SVGAttributes }) {
    useSetupGraphicalItem(props, 'bar')
    const { shouldRender } = useBar(props)

    return () => {
      if (!shouldRender.value) {
        return null
      }

      return (
        <Fragment>
          <Layer class={['v-charts-bar', attrs.class]}>
            <RenderBar />
          </Layer>
        </Fragment>
      )
    }
  },
})
