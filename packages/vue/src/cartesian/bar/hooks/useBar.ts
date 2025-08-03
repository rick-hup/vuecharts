import type { SVGAttributes } from 'vue'
import { computed, useAttrs } from 'vue'
import { createContext } from 'motion-v'
import type { BarProps, BarSettings } from '../type'
import { useIsPanorama } from '@/context/PanoramaContextProvider'
import { getNormalizedStackId } from '@/utils/chart'
import { useChartLayout } from '@/context/chartLayoutContext'
import { useNeedsClip } from '@/cartesian/useNeedsClip'
import { uniqueId } from '@/utils'

export interface BarContext {
  // 基础计算属性
  clipPathId: string
  props: BarProps
  attrs: SVGAttributes
}
export const [useBarContext, provideBarContext] = createContext<BarContext>('BarContext')

export function useBar(props: BarProps) {
  const isPanorama = useIsPanorama()
  const attrs = useAttrs() as SVGAttributes
  const layout = useChartLayout()
  const { needClip } = useNeedsClip(props.xAxisId, props.yAxisId)
  const barSettings = computed((): BarSettings => ({
    barSize: props.barSize,
    data: undefined,
    dataKey: props.dataKey,
    maxBarSize: props.maxBarSize,
    minPointSize: props.minPointSize,
    stackId: getNormalizedStackId(props.stackId),
  }))

  const shouldRender = computed(() => {
    return (layout.value === 'vertical' || layout.value === 'horizontal') && !props.hide
  })
  const clipPathId = uniqueId('v-charts-bar-')

  provideBarContext({
    clipPathId,
    props,
    attrs,
  })

  return {
    shouldRender,
    // barData,
    needClip,
    clipPathId,
  }
}
