import { computed, defineComponent } from 'vue'
import { useAppSelector } from '@/state/hooks'
import { Layer } from '@/container/Layer'
import { Sector } from '@/shape/Sector'
import { SetPolarGraphicalItem } from '@/state/SetGraphicalItem'
import type { ResolvedPieSettings } from '@/state/selectors/pieSelectors'
import { selectPieSectors } from '@/state/selectors/pieSelectors'
import { PieVueProps } from './type'

export const Pie = defineComponent({
  name: 'Pie',
  props: PieVueProps,
  inheritAttrs: false,
  setup(props, { attrs }) {
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

    const sectors = useAppSelector(state => selectPieSectors(state, pieSettings.value))

    return () => {
      if (!sectors.value || sectors.value.length === 0) {
        return null
      }
      return (
        <Layer class={['v-charts-pie', props.className]}>
          {sectors.value.map((sector, i) => (
            <Sector
              key={`sector-${i}`}
              {...attrs}
              cx={sector.cx}
              cy={sector.cy}
              innerRadius={sector.innerRadius}
              outerRadius={sector.outerRadius}
              startAngle={sector.startAngle}
              endAngle={sector.endAngle}
              fill={sector.fill}
              stroke={(attrs.stroke as string) ?? props.stroke}
            />
          ))}
        </Layer>
      )
    }
  },
})
