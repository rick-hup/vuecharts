import { Fragment, computed, defineComponent, ref } from 'vue'
import { useAppSelector } from '@/state/hooks'
import { SetPolarGraphicalItem } from '@/state/SetGraphicalItem'
import { SetLegendPayload } from '@/state/SetLegendPayload'
import { SetTooltipEntrySettings } from '@/state/SetTooltipEntrySettings'
import type { RadialBarDataItem, RadialBarSettings } from '@/state/selectors/radialBarSelectors'
import { selectRadialBarLegendPayload, selectRadialBarSectors } from '@/state/selectors/radialBarSelectors'
import { Layer } from '@/container/Layer'
import { Sector } from '@/shape/Sector'
import { Animate } from '@/animation/Animate'
import { LabelList } from '@/components/label/LabelList'
import { provideCartesianLabelListData } from '@/context/cartesianLabelListContext'
import { interpolate } from '@/utils/data-utils'
import type { RadialBarPropsWithSVG } from './type'
import { RadialBarVueProps } from './type'

function getLegendItemColor(stroke: string | undefined, fill: string | undefined): string | undefined {
  return fill
}

export const RadialBar = defineComponent<RadialBarPropsWithSVG>({
  name: 'RadialBar',
  props: RadialBarVueProps,
  inheritAttrs: false,
  setup(props) {
    const radialBarSettings = computed<RadialBarSettings>(() => ({
      dataKey: props.dataKey,
      minPointSize: props.minPointSize,
      stackId: props.stackId,
      maxBarSize: props.maxBarSize,
      barSize: props.barSize,
    }))

    SetPolarGraphicalItem(computed(() => ({
      type: 'radialBar' as const,
      data: undefined,
      dataKey: props.dataKey,
      hide: props.hide,
      angleAxisId: props.angleAxisId,
      radiusAxisId: props.radiusAxisId,
      barSize: props.barSize,
      stackId: props.stackId,
      minPointSize: props.minPointSize,
      maxBarSize: props.maxBarSize,
    })))

    const legendPayload = useAppSelector(state =>
      selectRadialBarLegendPayload(state, props.legendType),
    )
    SetLegendPayload(computed(() => legendPayload.value ?? []))

    SetTooltipEntrySettings({
      fn: v => v,
      args: computed(() => ({
        dataDefinedOnItem: undefined,
        positions: undefined,
        settings: {
          dataKey: props.dataKey,
          nameKey: undefined,
          name: props.name ?? String(props.dataKey ?? ''),
          hide: props.hide,
          type: props.tooltipType,
          color: getLegendItemColor(props.stroke, props.fill),
          fill: props.fill,
          stroke: props.stroke,
          unit: '',
        },
      })),
    })

    const sectors = useAppSelector(state =>
      selectRadialBarSectors(
        state,
        props.radiusAxisId,
        props.angleAxisId,
        radialBarSettings.value,
      ),
    )

    const isAnimating = ref(props.isAnimationActive)

    provideCartesianLabelListData(computed(() => {
      if (props.isAnimationActive && isAnimating.value)
        return undefined
      const data = sectors.value
      if (!data)
        return undefined
      const defaultFill = props.fill
      return data.map(sector => ({
        value: sector.value ?? '',
        payload: sector.payload,
        parentViewBox: undefined,
        fill: (sector as any).fill ?? defaultFill,
        cx: sector.cx,
        cy: sector.cy,
        innerRadius: sector.innerRadius,
        outerRadius: sector.outerRadius,
        startAngle: sector.startAngle,
        endAngle: sector.endAngle,
        clockWise: false,
      }))
    }))

    let prevSectors: RadialBarDataItem[] | null = null
    let animationId = 0
    let lastSectors: ReadonlyArray<RadialBarDataItem> | undefined

    const renderSectors = (sectorData: RadialBarDataItem[]) => {
      const defaultFill = props.fill
      const defaultStroke = props.stroke
      const showBackground = !!props.background
      const backgroundProps = typeof props.background === 'object' ? props.background : {}

      return (
        <Layer class="v-charts-radial-bar">
          {showBackground && sectorData.map((sector, i) => {
            if (!sector.background)
              return null
            const bg = sector.background
            return (
              <Sector
                key={`bg-${i}`}
                cx={bg.cx}
                cy={bg.cy}
                innerRadius={bg.innerRadius}
                outerRadius={bg.outerRadius}
                startAngle={bg.startAngle}
                endAngle={bg.endAngle}
                fill="#eee"
                fill-opacity={0.5}
                {...backgroundProps}
              />
            )
          })}
          {sectorData.map((sector, i) => {
            if (sector.innerRadius == null || sector.outerRadius == null
              || sector.startAngle == null || sector.endAngle == null) {
              return null
            }
            const sectorFill = (sector as any).fill ?? defaultFill
            return (
              <Sector
                key={`sector-${i}`}
                cx={sector.cx}
                cy={sector.cy}
                innerRadius={sector.innerRadius}
                outerRadius={sector.outerRadius}
                startAngle={sector.startAngle}
                endAngle={sector.endAngle}
                fill={sectorFill}
                fill-opacity={props.fillOpacity}
                stroke={defaultStroke ?? sectorFill}
                stroke-width={props.strokeWidth}
                stroke-dasharray={props.strokeDasharray}
              />
            )
          })}
        </Layer>
      )
    }

    return () => {
      if (props.hide)
        return null

      const data = sectors.value
      if (data == null || data.length === 0)
        return null

      const sectorData = data as RadialBarDataItem[]

      const labelEl = !isAnimating.value && props.label
        ? <LabelList {...(typeof props.label === 'object' ? props.label : {})} />
        : null

      if (!props.isAnimationActive) {
        prevSectors = sectorData
        return (
          <Fragment>
            {renderSectors(sectorData)}
            {labelEl}
          </Fragment>
        )
      }

      const prevSects = prevSectors
      if (data !== lastSectors) {
        animationId++
        lastSectors = data
      }

      return (
        <Fragment>
          <Animate
            key={animationId}
            isActive={true}
            onAnimationStart={() => { isAnimating.value = true }}
            onAnimationEnd={() => { isAnimating.value = false }}
          >
            {(t: number) => {
              const stepSectors: RadialBarDataItem[] = t === 1
                ? sectorData
                : sectorData.map((sector, i) => {
                    const prev = prevSects && prevSects[i]
                    if (!prev) {
                    // New sector: animate from zero angle/radius
                      return {
                        ...sector,
                        startAngle: sector.startAngle != null
                          ? interpolate(sector.startAngle, sector.startAngle, t)
                          : sector.startAngle,
                        endAngle: interpolate(sector.startAngle ?? 0, sector.endAngle, t),
                        innerRadius: sector.innerRadius != null
                          ? interpolate(sector.innerRadius, sector.innerRadius, t)
                          : sector.innerRadius,
                        outerRadius: sector.outerRadius != null
                          ? interpolate(sector.innerRadius ?? 0, sector.outerRadius, t)
                          : sector.outerRadius,
                      }
                    }
                    return {
                      ...sector,
                      startAngle: prev.startAngle != null && sector.startAngle != null
                        ? interpolate(prev.startAngle, sector.startAngle, t)
                        : sector.startAngle,
                      endAngle: interpolate(prev.endAngle ?? 0, sector.endAngle, t),
                      innerRadius: prev.innerRadius != null && sector.innerRadius != null
                        ? interpolate(prev.innerRadius, sector.innerRadius, t)
                        : sector.innerRadius,
                      outerRadius: prev.outerRadius != null && sector.outerRadius != null
                        ? interpolate(prev.outerRadius, sector.outerRadius, t)
                        : sector.outerRadius,
                    }
                  })

              if (t > 0) {
                prevSectors = stepSectors
              }

              return renderSectors(stepSectors)
            }}
          </Animate>
          {labelEl}
        </Fragment>
      )
    }
  },
})
