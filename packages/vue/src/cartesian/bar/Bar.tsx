import type { SVGAttributes } from 'vue'
import { defineComponent } from 'vue'
import type { BarProps, BarPropsWithSVG } from './type'
import { BarVueProps } from './type'
import { Layer } from '@/container/Layer'
import { useBar } from '@/cartesian/bar/hooks/useBar'
import { useSetupGraphicalItem } from '@/hooks/useSetupGraphicalItem'
import { GraphicalItemClipPath } from '@/cartesian/GraphicalItemClipPath'
import { uniqueId } from '@/utils'

export const Bar = defineComponent<BarPropsWithSVG>({
  name: 'Bar',
  props: BarVueProps,
  inheritAttrs: false,
  setup(props: BarProps, { attrs }: { attrs: SVGAttributes }) {
    // Setup data and report to Redux store first
    useSetupGraphicalItem(props, 'bar')
    const { shouldRender, needClip, clipPathId } = useBar(props)

    return () => {
      if (!shouldRender.value) {
        return null
      }
      const id = props.id ?? clipPathId
      return (
        <Layer class={['v-charts-bar', props.class]}>
          {
            needClip.value && (
              <defs>
                <GraphicalItemClipPath
                  clipPathId={id}
                  xAxisId={props.xAxisId}
                  yAxisId={props.yAxisId}
                />
              </defs>
            )
          }
          <Layer class="v-charts-bar-rectangles" clip-path={needClip.value ? `url(#clipPath-${clipPathId})` : null}>
            {/* <BarBackground data={data} dataKey={dataKey} background={background} allOtherBarProps={this.props} /> */}
            {/* <RenderRectangles {...props} /> */}
          </Layer>
        </Layer>
      )
    }
  },
})
