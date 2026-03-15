import { Fragment, computed, defineComponent } from 'vue'
import type { SlotsType, VNode } from 'vue'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { Layer } from '@/container/Layer'
import { Trapezoid } from '@/shape/Trapezoid'
import { Animate } from '@/animation/Animate'
import { SetPolarGraphicalItem } from '@/state/SetGraphicalItem'
import { SetLegendPayload } from '@/state/SetLegendPayload'
import { SetTooltipEntrySettings } from '@/state/SetTooltipEntrySettings'
import { type ResolvedFunnelSettings, selectFunnelTrapezoids } from '@/state/selectors/funnelSelectors'
import { mouseLeaveItem, setActiveMouseOverItemIndex } from '@/state/tooltipSlice'
import { Cell } from '@/components/Cell'
import type { FunnelPropsWithSVG, FunnelTrapezoidItem } from './type'
import { FunnelVueProps } from './type'

function extractCellProps(vnodes: VNode[]): Record<string, any>[] {
  const result: Record<string, any>[] = []
  for (const vnode of vnodes) {
    if (vnode.type === Cell) {
      result.push(vnode.props ?? {})
    }
    else if (vnode.type === Fragment && Array.isArray(vnode.children)) {
      result.push(...extractCellProps(vnode.children as VNode[]))
    }
  }
  return result
}

export const Funnel = defineComponent<FunnelPropsWithSVG>({
  name: 'Funnel',
  props: FunnelVueProps,
  inheritAttrs: false,
  slots: Object as SlotsType<{
    shape?: (props: FunnelTrapezoidItem) => any
    default?: () => any
  }>,
  setup(props, { attrs, slots }) {
    const dispatch = useAppDispatch()

    const funnelSettings = computed<ResolvedFunnelSettings>(() => ({
      data: props.data,
      dataKey: props.dataKey,
      nameKey: props.nameKey,
      tooltipType: props.tooltipType,
      lastShapeType: props.lastShapeType,
      reversed: props.reversed,
      customWidth: props.width,
      presentationProps: {
        fill: props.fill,
        stroke: props.stroke,
      },
    }))

    SetPolarGraphicalItem(computed(() => ({
      type: 'funnel' as const,
      data: props.data ?? [],
      dataKey: props.dataKey,
      hide: props.hide,
      angleAxisId: 0,
      radiusAxisId: 0,
    })))

    const composedData = useAppSelector(state => selectFunnelTrapezoids(state, funnelSettings.value))

    const trapezoids = computed(() => composedData.value?.trapezoids ?? [])

    // Legend payload: one entry per data item (like Pie)
    const legendPayload = computed(() => {
      const data = props.data ?? []
      return data.map((entry: any, i: number) => {
        const name = typeof props.nameKey === 'string' ? entry[props.nameKey] : `Item ${i}`
        const color = entry.fill ?? props.fill
        return {
          type: props.legendType,
          value: String(name ?? ''),
          color,
          payload: entry,
        }
      })
    })
    SetLegendPayload(legendPayload)

    SetTooltipEntrySettings({
      fn: v => v,
      args: computed(() => ({
        dataDefinedOnItem: props.data ?? [],
        positions: trapezoids.value.map((t: any) => t.tooltipPosition),
        settings: {
          dataKey: props.dataKey,
          nameKey: props.nameKey,
          name: String(props.dataKey ?? ''),
          hide: props.hide,
          type: props.tooltipType,
          color: props.fill,
          fill: props.fill,
          stroke: props.stroke,
          unit: '',
        },
      })),
    })

    function handleTrapezoidEnter(trap: FunnelTrapezoidItem, index: number) {
      dispatch(setActiveMouseOverItemIndex({
        activeIndex: String(index),
        activeDataKey: props.dataKey,
        activeCoordinate: trap.tooltipPosition,
      }))
    }

    function handleTrapezoidLeave() {
      dispatch(mouseLeaveItem())
    }

    return () => {
      if (props.hide) {
        return null
      }

      const trapList = trapezoids.value
      if (!trapList || trapList.length === 0) {
        return null
      }

      // Extract Cell props from default slot
      const defaultContent = slots.default?.() ?? []
      const cells = extractCellProps(defaultContent)
      const stroke = (attrs.stroke as string) ?? props.stroke

      return (
        <Layer class={['v-charts-funnel', props.className]}>
          <Animate isActive={props.isAnimationActive} from={0} to={1} transition={{ duration: 1.5 }}>
            {(progress: number) => {
              return trapList.map((trap: any, i: number) => {
                const animatedHeight = trap.height * progress
                const yOffset = trap.height * (1 - progress)
                // Interpolate widths: at progress=0 all same as upperWidth, at progress=1 final widths
                const animatedLowerWidth = trap.upperWidth + (trap.lowerWidth - trap.upperWidth) * progress
                const animatedX = trap.x + (trap.upperWidth - animatedLowerWidth) / 2 * 0 // x stays same since upper is anchored

                const cellProps = cells[i] ?? {}
                const trapFill = cellProps.fill ?? trap.fill ?? props.fill
                const trapStroke = cellProps.stroke ?? stroke

                const trapezoidProps = {
                  ...trap,
                  height: animatedHeight,
                  lowerWidth: animatedLowerWidth,
                  y: trap.y + yOffset / 2,
                  fill: trapFill,
                  stroke: trapStroke,
                }

                const content = slots.shape
                  ? slots.shape(trapezoidProps)
                  : (
                      <Trapezoid
                        {...attrs}
                        x={trapezoidProps.x}
                        y={trapezoidProps.y}
                        upperWidth={trapezoidProps.upperWidth}
                        lowerWidth={trapezoidProps.lowerWidth}
                        height={trapezoidProps.height}
                        fill={trapFill}
                        stroke={trapStroke}
                      />
                    )

                return (
                  <g
                    key={`trapezoid-${i}`}
                    onMouseenter={() => handleTrapezoidEnter(trap, i)}
                    onMouseleave={handleTrapezoidLeave}
                  >
                    {content}
                  </g>
                )
              })
            }}
          </Animate>
        </Layer>
      )
    }
  },
})
