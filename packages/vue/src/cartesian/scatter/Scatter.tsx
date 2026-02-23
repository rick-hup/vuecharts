import type { PropType, SVGAttributes } from 'vue'
import type { AnimationOptions } from 'motion-v'
import { Teleport, defineComponent } from 'vue'
import { useScatter } from './hooks/useScatter'
import { useSetupGraphicalItem } from '@/hooks/useSetupGraphicalItem'
import { Layer } from '@/container/Layer'
import { Symbols } from '@/shape/Symbols'
import type { SymbolType, SymbolsProps } from '@/shape/Symbols'
import { useGraphicalLayerRef } from '@/context/graphicalLayerContext'
import type { DataKey } from '@/types'
import type { ScatterPointItem } from '@/types/common'
import { Animate } from '@/animation/Animate'

const interpolateNumber = (from: number, to: number) => (t: number) => from + (to - from) * t

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
  isAnimationActive: { type: Boolean, default: true },
  legendType: { type: String, default: 'circle' },
  tooltipType: { type: String, default: undefined },
  transition: { type: Object as PropType<AnimationOptions>, default: undefined },
}

export const Scatter = defineComponent({
  name: 'Scatter',
  props: ScatterVueProps,
  inheritAttrs: false,
  setup(props, { attrs }) {
    useSetupGraphicalItem(props as any, 'scatter')
    const { shouldRender, points } = useScatter(props)
    const graphicalLayerRef = useGraphicalLayerRef()

    let previousPoints: ReadonlyArray<ScatterPointItem> | null = null
    let animationId = 0

    const renderSymbols = (data: ReadonlyArray<ScatterPointItem>, svgAttrs: SVGAttributes) => {
      return data.map((point, i) => {
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
      })
    }

    return () => {
      if (!shouldRender.value) {
        return null
      }

      const svgAttrs = attrs as SVGAttributes
      const data = points.value!
      const isAnimationActive = props.isAnimationActive

      let content: any

      if (isAnimationActive && previousPoints !== data) {
        const prevData = previousPoints
        animationId++
        content = (
          <Layer class="v-charts-scatter">
            <Animate
              key={animationId}
              transition={props.transition}
              isActive={isAnimationActive}
            >
              {(t: number) => {
                const stepData: ReadonlyArray<ScatterPointItem> = t === 1
                  ? data
                  : data.map((entry, index) => {
                      const prev = prevData && prevData[index]
                      if (prev) {
                        return {
                          ...entry,
                          cx: entry.cx == null ? undefined : interpolateNumber(prev.cx ?? 0, entry.cx)(t),
                          cy: entry.cy == null ? undefined : interpolateNumber(prev.cy ?? 0, entry.cy)(t),
                          size: interpolateNumber(prev.size ?? 0, entry.size ?? 0)(t),
                        }
                      }
                      // New point: animate size from 0
                      return { ...entry, size: interpolateNumber(0, entry.size ?? 0)(t) }
                    })

                if (t > 0) {
                  previousPoints = stepData
                }

                return <>{renderSymbols(stepData, svgAttrs)}</>
              }}
            </Animate>
          </Layer>
        )
      }
      else {
        previousPoints = data
        content = (
          <Layer class="v-charts-scatter">
            {renderSymbols(data, svgAttrs)}
          </Layer>
        )
      }

      if (graphicalLayerRef?.value) {
        return <Teleport to={graphicalLayerRef.value}>{content}</Teleport>
      }
      return content
    }
  },
})
