import type { SVGAttributes, SlotsType } from 'vue'
import { Fragment, computed, defineComponent, provide, ref } from 'vue'
import type { AreaProps, AreaPropsWithSVG } from './type'
import { AreaVueProps } from './type'
import { useArea } from '@/cartesian/area/hooks/useArea'
import { Layer } from '@/container/Layer'
import { StaticArea } from '@/cartesian/area/RenderArea'
import { ClipRect } from './ClipRect'
import { ActivePoints } from '@/cartesian/area/ActivePoints'
import type { ActivePointsSlots } from './ActivePoints'
import { useSetupGraphicalItem } from '@/hooks/useSetupGraphicalItem'

export const Area = defineComponent<AreaPropsWithSVG>({
  name: 'Area',
  props: AreaVueProps,
  inheritAttrs: false,
  slots: Object as SlotsType<ActivePointsSlots>,
  setup(props: AreaProps, { attrs, slots }: { attrs: SVGAttributes, slots: ActivePointsSlots }) {
    useSetupGraphicalItem(props, 'area')
    const { shouldRender, areaData, points, clipPathId } = useArea(props, attrs)
    const animationCompleted = ref(false)

    const shouldShowAnimation = computed(() => {
      return props.isAnimationActive && points.value?.length && !animationCompleted.value
    })

    // Provide animation completion handler to ClipRect
    provide('onAnimationComplete', () => {
      animationCompleted.value = true
    })

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

      const renderAreaContent = () => {
        if (shouldShowAnimation.value) {
          return (
            <Layer key="area-with-animation">
              <defs>
                <clipPath id={`animationClipPath-${clipPathId.value}`}>
                  <ClipRect />
                </clipPath>
              </defs>
              <Layer clip-path={`url(#animationClipPath-${clipPathId.value})`}>
                <StaticArea />
              </Layer>
            </Layer>
          )
        }

        return <StaticArea key="static-area" />
      }

      return (
        <Fragment>
          <Layer class={['v-charts-area', attrs.class]}>
            {renderAreaContent()}
          </Layer>
          <ActivePoints
            points={areaData.value?.points ?? []}
            mainColor={getLegendItemColor(attrs.stroke, props.fill!)}
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

function getLegendItemColor(stroke: string | undefined, fill: string): string {
  return stroke && stroke !== 'none' ? stroke : fill
}
