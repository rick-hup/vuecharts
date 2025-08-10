import type { SVGAttributes, SlotsType } from 'vue'
import { Fragment, defineComponent } from 'vue'
import type { BarProps, BarPropsWithSVG } from './type'
import { BarVueProps } from './type'
import { useBar } from '@/cartesian/bar/hooks/useBar'
import { Layer } from '@/container/Layer'
import { useSetupGraphicalItem } from '@/hooks/useSetupGraphicalItem'
import { GraphicalItemClipPath } from '@/cartesian/GraphicalItemClipPath'
import { BarBackground } from '@/cartesian/bar/components/BarBackground'
import { BarRectangles } from '@/cartesian/bar/components/BarRectangles'
import { useNeedsClip } from '@/cartesian/useNeedsClip'

export const Bar = defineComponent<BarPropsWithSVG>({
  name: 'Bar',
  props: BarVueProps,
  inheritAttrs: false,
  slots: Object as SlotsType<{
    activeDot?: (props: any) => any
  }>,
  setup(props: BarProps, { attrs, slots }: { attrs: SVGAttributes, slots: any }) {
    useSetupGraphicalItem(props, 'bar')
    const { shouldRender, clipPathId } = useBar(props)
    const { needClip } = useNeedsClip(props.xAxisId, props.yAxisId)

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
          <Layer class="v-charts-bar-rectangles" clip-path={needClip ? `url(#clipPath-${clipPathId})` : null}>
            {props.background && <BarBackground />}
            <BarRectangles />
          </Layer>
        </Layer>
      )
    }
  },
})
