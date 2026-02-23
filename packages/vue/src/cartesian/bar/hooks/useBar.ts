import type { Ref, SVGAttributes, ShallowRef } from 'vue'
import { computed, ref, useAttrs } from 'vue'
import { createContext } from 'motion-v'
import type { BarProps } from '../type'
import { useIsPanorama } from '@/context/PanoramaContextProvider'
import { getNormalizedStackId } from '@/utils/chart'
import { useChartLayout } from '@/context/chartLayoutContext'
import { useNeedsClip } from '@/cartesian/useNeedsClip'
import { uniqueId } from '@/utils'
import { useAppSelector } from '@/state/hooks'
import { selectBarRectangles } from '@/state/selectors/barSelectors'
import type { BarRectangleItem } from '@/types/bar'

export interface BarContext {
  // 基础计算属性
  clipPathId: string
  layout: Ref<'horizontal' | 'vertical' | 'centric' | 'radial'>
  props: BarProps
  attrs: SVGAttributes
  data: Readonly<ShallowRef<readonly BarRectangleItem[]>>
  isAnimating: Ref<boolean>
  shapeSlot?: (props: any) => any
}
export const [useBarContext, provideBarContext] = createContext<BarContext>('BarContext')

export function useBar(props: BarProps, shapeSlot?: (props: any) => any) {
  const isPanorama = useIsPanorama()
  const attrs = useAttrs() as SVGAttributes
  const layout = useChartLayout()
  const { needClip } = useNeedsClip(props.xAxisId, props.yAxisId)
  const barSettings = computed(() => ({
    barSize: props.barSize,
    data: props.data,
    dataKey: props.dataKey,
    maxBarSize: props.maxBarSize,
    minPointSize: props.minPointSize,
    stackId: getNormalizedStackId(props.stackId),
  }))
  const rects = useAppSelector(state => selectBarRectangles(state, props.xAxisId, props.yAxisId, isPanorama, barSettings.value))

  const shouldRender = computed(() => {
    return (layout.value === 'vertical' || layout.value === 'horizontal') && !props.hide
  })

  const clipPathId = uniqueId('v-charts-bar-')
  const isAnimating = ref(false)

  provideBarContext({
    clipPathId,
    layout,
    props,
    attrs,
    data: rects,
    isAnimating,
    shapeSlot,
  })

  return {
    shouldRender,
    needClip,
    clipPathId,
    barData: rects,
    isAnimating,
  }
}
