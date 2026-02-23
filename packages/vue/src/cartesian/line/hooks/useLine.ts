import { useChartLayout } from '@/context/chartLayoutContext'
import { useChartName } from '@/state/selectors/selectors'
import type { LinePointItem, LinePropsInternal } from '../type'
import { computed, inject, provide, ref } from 'vue'
import type { InjectionKey, Ref, SVGAttributes, ShallowRef } from 'vue'
import { useIsPanorama } from '@/context/PanoramaContextProvider'
import { useAppSelector } from '@/state/hooks'
import { selectLinePoints } from '@/state/selectors/lineSelectors'
import { uniqueId } from '@/utils'
import { isClipDot } from '@/utils/chart'
import { filterProps } from '@/utils/VueUtils'

// Line Context 类型定义
export interface LineContext {
  clipPathId: Ref<string>
  layout: Readonly<Ref<string>>
  points: Ref<ReadonlyArray<LinePointItem> | undefined>
  props: LinePropsInternal
  attrs: SVGAttributes
  lineData: Readonly<ShallowRef<ReadonlyArray<LinePointItem> | undefined>>
  isAnimating: Ref<boolean>
  dot: any
  clipDot: boolean
  dotSize: number
  shapeSlot?: (props: any) => any
}

// Injection Key
export const LineContextKey: InjectionKey<LineContext> = Symbol('LineContext')

// 提供 Line Context
export function provideLineContext(context: LineContext) {
  provide(LineContextKey, context)
}

// 使用 Line Context
export function useLineContext() {
  const context = inject(LineContextKey)
  if (!context) {
    throw new Error('useLineContext must be used within Line component')
  }
  return context
}

export function useLine(props: LinePropsInternal, attrs: SVGAttributes = {}, shapeSlot?: (props: any) => any) {
  const layout = useChartLayout()
  const chartName = useChartName()
  const localId = uniqueId('v-charts-line-')
  const clipPathId = computed(() => props.id || localId)
  const isPanorama = useIsPanorama()

  const isAnimating = ref(props.isAnimationActive)

  const shouldRender = computed(() =>
    (layout.value === 'horizontal' || layout.value === 'vertical')
    && (chartName.value === 'LineChart' || chartName.value === 'ComposedChart')
    && !props.hide,
  )

  const lineSettings = computed(
    () => ({
      data: props.data,
      dataKey: props.dataKey!,
    }),
  )

  const lineData = useAppSelector(state =>
    selectLinePoints(state, props.xAxisId!, props.yAxisId!, isPanorama, lineSettings.value),
  )

  // Dot related logic
  const dot = props.dot
  const clipDot = isClipDot(dot)
  const { r = 3, strokeWidth = 2 } = filterProps(dot, false) ?? { r: 3, strokeWidth: 2 }
  const dotSize = r * 2 + strokeWidth

  // Create Line Context - 保持响应式
  const lineContext: LineContext = {
    clipPathId,
    layout,
    points: computed(() => lineData.value),
    props,
    attrs,
    lineData,
    isAnimating,
    dot,
    clipDot,
    dotSize,
    shapeSlot,
  }

  // Provide context
  provideLineContext(lineContext)

  return {
    shouldRender,
    lineData,
    points: lineContext.points,
    clipPathId,
  }
}
