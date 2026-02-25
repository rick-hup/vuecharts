import { computed, defineComponent, ref } from 'vue'
import type { SlotsType } from 'vue'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { Layer } from '@/container/Layer'
import { Sector } from '@/shape/Sector'
import { Animate } from '@/animation/Animate'
import { SetPolarGraphicalItem } from '@/state/SetGraphicalItem'
import { SetLegendPayload } from '@/state/SetLegendPayload'
import { SetTooltipEntrySettings } from '@/state/SetTooltipEntrySettings'
import type { PieSectorDataItem, ResolvedPieSettings } from '@/state/selectors/pieSelectors'
import { computePieSectors, selectDisplayedData, selectPieLegend, selectSynchronisedPieSettings } from '@/state/selectors/pieSelectors'
import { selectChartOffset } from '@/state/selectors/selectChartOffset'
import { mouseLeaveItem, setActiveMouseOverItemIndex } from '@/state/tooltipSlice'
import { polarToCartesian } from '@/utils/polar'
import type { PiePropsWithSVG } from './type'
import { PieVueProps } from './type'

const LABEL_OFFSET = 20

export const Pie = defineComponent<PiePropsWithSVG>({
  name: 'Pie',
  props: PieVueProps,
  inheritAttrs: false,
  slots: Object as SlotsType<{
    shape?: (props: PieSectorDataItem & { isActive: boolean }) => any
  }>,
  setup(props, { attrs, slots }) {
    const dispatch = useAppDispatch()
    const activeIndex = ref(props.activeIndex)

    const pieSettings = computed<ResolvedPieSettings>(() => ({
      data: props.data,
      dataKey: props.dataKey,
      nameKey: props.nameKey,
      cx: props.cx,
      cy: props.cy,
      innerRadius: props.innerRadius,
      outerRadius: props.outerRadius,
      startAngle: props.startAngle,
      endAngle: props.endAngle,
      paddingAngle: props.paddingAngle,
      minAngle: props.minAngle,
      fill: props.fill,
      legendType: props.legendType,
      tooltipType: props.tooltipType,
      presentationProps: {},
    }))

    SetPolarGraphicalItem(computed(() => ({
      type: 'pie' as const,
      data: props.data ?? [],
      dataKey: props.dataKey,
      hide: props.hide,
      angleAxisId: 0,
      radiusAxisId: 0,
    })))

    const displayedData = useAppSelector(state => selectDisplayedData(state, pieSettings.value))
    const synchronisedSettings = useAppSelector(state => selectSynchronisedPieSettings(state, pieSettings.value))
    const offset = useAppSelector(state => selectChartOffset(state))

    const legendPayload = useAppSelector(state => selectPieLegend(state, pieSettings.value))
    SetLegendPayload(computed(() => legendPayload.value ?? []))

    const sectors = computed(() => {
      if (synchronisedSettings.value == null || displayedData.value == null) {
        return undefined
      }
      return computePieSectors({
        offset: offset.value,
        pieSettings: pieSettings.value,
        displayedData: displayedData.value,
      })
    })

    SetTooltipEntrySettings({
      fn: v => v,
      args: computed(() => ({
        dataDefinedOnItem: displayedData.value ?? [],
        positions: sectors.value?.map(s => s.tooltipPosition),
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

    return () => {
      if (!sectors.value || sectors.value.length === 0) {
        return null
      }
      const stroke = (attrs.stroke as string) ?? props.stroke
      return (
        <Layer class={['v-charts-pie', props.className]}>
          <Animate isActive={props.isAnimationActive} from={0} to={1} transition={{ duration: 1.5 }}>
            {(progress: number) => {
              // Recharts chain animation: curAngle accumulates so all sectors sweep as one continuous arc
              let curAngle = sectors.value![0]?.startAngle ?? 0
              const sectorNodes = sectors.value!.map((sector, i) => {
                const isActive = activeIndex.value === i
                const paddingAngle = i > 0 ? sector.paddingAngle : 0
                const deltaAngle = (sector.endAngle - sector.startAngle) * progress
                const animatedStartAngle = curAngle + paddingAngle
                const animatedEndAngle = curAngle + deltaAngle + paddingAngle
                curAngle = animatedEndAngle
                const onEnter = (e: MouseEvent) => {
                  activeIndex.value = i
                  dispatch(setActiveMouseOverItemIndex({
                    activeIndex: String(i),
                    activeDataKey: props.dataKey,
                    activeCoordinate: sector.tooltipPosition,
                  }))
                }
                const onLeave = () => {
                  activeIndex.value = -1
                  dispatch(mouseLeaveItem())
                }
                if (slots.shape) {
                  return (
                    <g
                      key={`sector-${i}`}
                      onMouseenter={onEnter}
                      onMouseleave={onLeave}
                    >
                      {slots.shape({ ...sector, startAngle: animatedStartAngle, endAngle: animatedEndAngle, stroke, isActive })}
                    </g>
                  )
                }
                return (
                  <Sector
                    key={`sector-${i}`}
                    {...attrs}
                    cx={sector.cx}
                    cy={sector.cy}
                    innerRadius={sector.innerRadius}
                    outerRadius={sector.outerRadius}
                    startAngle={animatedStartAngle}
                    endAngle={animatedEndAngle}
                    fill={sector.fill}
                    stroke={stroke}
                    onMouseenter={onEnter}
                    onMouseleave={onLeave}
                  />
                )
              })
              const labelNodes = progress >= 1 && props.label
                ? sectors.value!.map((sector, i) => {
                    const edgePoint = polarToCartesian(sector.cx, sector.cy, sector.outerRadius, sector.midAngle)
                    const pos = polarToCartesian(sector.cx, sector.cy, sector.outerRadius + LABEL_OFFSET, sector.midAngle)
                    const anchor = pos.x > sector.cx ? 'start' : pos.x < sector.cx ? 'end' : 'middle'
                    return (
                      <g key={`label-${i}`}>
                        <line
                          x1={edgePoint.x}
                          y1={edgePoint.y}
                          x2={pos.x}
                          y2={pos.y}
                          stroke={sector.fill}
                          fill="none"
                        />
                        <text
                          x={pos.x}
                          y={pos.y}
                          text-anchor={anchor}
                          dominant-baseline="middle"
                          fill={sector.fill}
                          font-size={12}
                        >
                          {String(sector.value)}
                        </text>
                      </g>
                    )
                  })
                : []
              return [...sectorNodes, ...labelNodes]
            }}
          </Animate>
        </Layer>
      )
    }
  },
})
