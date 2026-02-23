import type { PropType, SVGAttributes } from 'vue'
import { Teleport, defineComponent } from 'vue'
import { useScatter } from './hooks/useScatter'
import { useSetupGraphicalItem } from '@/hooks/useSetupGraphicalItem'
import { Layer } from '@/container/Layer'
import { Symbols } from '@/shape/Symbols'
import type { SymbolType, SymbolsProps } from '@/shape/Symbols'
import { useGraphicalLayerRef } from '@/context/graphicalLayerContext'
import type { DataKey } from '@/types'

const ScatterVueProps = {
  xAxisId: { type: [String, Number] as PropType<string | number>, default: 0 },
  yAxisId: { type: [String, Number] as PropType<string | number>, default: 0 },
  zAxisId: { type: [String, Number] as PropType<string | number>, default: 0 },
  dataKey: { type: [String, Number, Function] as PropType<DataKey<any>>, default: undefined },
  data: { type: Array as PropType<ReadonlyArray<Record<string, any>>>, default: undefined },
  name: { type: [String, Number] as PropType<string | number>, default: undefined },
  hide: { type: Boolean, default: false },
  fill: { type: String, default: undefined },
  shape: { type: String as PropType<SymbolType>, default: 'circle' },
  isAnimationActive: { type: Boolean, default: false },
  legendType: { type: String, default: 'circle' },
  tooltipType: { type: String, default: undefined },
}

export const Scatter = defineComponent({
  name: 'Scatter',
  props: ScatterVueProps,
  inheritAttrs: false,
  setup(props, { attrs }) {
    useSetupGraphicalItem(props as any, 'scatter')
    const { shouldRender, points } = useScatter(props)
    const graphicalLayerRef = useGraphicalLayerRef()

    return () => {
      if (!shouldRender.value) {
        return null
      }

      const svgAttrs = attrs as SVGAttributes

      const content = (
        <Layer class="v-charts-scatter">
          {points.value!.map((point, i) => {
            if (point.cx == null || point.cy == null) {
              return null
            }
            const symbolProps: SymbolsProps = {
              ...svgAttrs,
              cx: point.cx,
              cy: point.cy,
              size: point.size,
              type: props.shape as SymbolType,
              fill: props.fill,
              stroke: svgAttrs.stroke as string,
            }
            return Symbols(symbolProps)
          })}
        </Layer>
      )

      if (graphicalLayerRef?.value) {
        return <Teleport to={graphicalLayerRef.value}>{content}</Teleport>
      }
      return content
    }
  },
})
