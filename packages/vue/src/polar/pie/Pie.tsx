import { computed, defineComponent, ref } from 'vue'
import type { SlotsType } from 'vue'
import { useAppSelector } from '@/state/hooks'
import { Layer } from '@/container/Layer'
import { Sector } from '@/shape/Sector'
import { Animate } from '@/animation/Animate'
import { SetPolarGraphicalItem } from '@/state/SetGraphicalItem'
import type { PieSectorDataItem, ResolvedPieSettings } from '@/state/selectors/pieSelectors'
import { computePieSectors, selectDisplayedData, selectSynchronisedPieSettings } from '@/state/selectors/pieSelectors'
import { selectChartOffset } from '@/state/selectors/selectChartOffset'
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
                if (slots.shape) {
                  return (
                    <g
                      key={`sector-${i}`}
                      onMouseenter={() => { activeIndex.value = i }}
                      onMouseleave={() => { activeIndex.value = -1 }}
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
                    onMouseenter={() => { activeIndex.value = i }}
                    onMouseleave={() => { activeIndex.value = -1 }}
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
