import { computed, defineComponent } from 'vue'
import type { PropType } from 'vue'
import { useAppSelector } from '@/state/hooks'
import { SetPolarGraphicalItem } from '@/state/SetGraphicalItem'
import { SetLegendPayload } from '@/state/SetLegendPayload'
import { SetTooltipEntrySettings } from '@/state/SetTooltipEntrySettings'
import { selectRadarPoints } from '@/state/selectors/radarSelectors'
import { useIsPanorama } from '@/context/PanoramaContextProvider'
import { Layer } from '@/container/Layer'
import { Dot } from '@/shape/Dot'
import type { DataKey } from '@/types'
import type { LegendType } from '@/types/legend'
import type { TooltipType } from '@/types/tooltip'

function getLegendItemColor(stroke: string | undefined, fill: string | undefined): string | undefined {
  return stroke && stroke !== 'none' ? stroke : fill
}

function getSinglePolygonPath(points: ReadonlyArray<{ x: number; y: number }>): string {
  if (!points.length) return ''
  // Repeat first point at end (matching Recharts getParsedPoints behavior) to ensure
  // explicit close segment for correct SVG fill when used in range paths
  const pts = [...points, points[0]]
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join('')
  return `${path}Z`
}

function getRangePath(
  points: ReadonlyArray<{ x: number; y: number }>,
  baseLinePoints: ReadonlyArray<{ x: number; y: number }>,
): string {
  const outerPath = getSinglePolygonPath(points)
  const inner = getSinglePolygonPath([...baseLinePoints].reverse())
  // Join outer (without closing Z) with inner path
  const outerWithoutZ = outerPath.endsWith('Z') ? outerPath.slice(0, -1) : outerPath
  return `${outerWithoutZ}L${inner.slice(1)}`
}

export const Radar = defineComponent({
  name: 'Radar',
  props: {
    dataKey: { type: [String, Number, Function] as PropType<DataKey<any>>, required: true },
    name: { type: String, default: undefined },
    angleAxisId: { type: [String, Number] as PropType<string | number>, default: 0 },
    radiusAxisId: { type: [String, Number] as PropType<string | number>, default: 0 },
    fill: { type: String, default: '#808080' },
    stroke: { type: String, default: undefined },
    fillOpacity: { type: Number, default: 0.6 },
    strokeWidth: { type: Number, default: undefined },
    strokeDasharray: { type: String, default: undefined },
    dot: { type: Boolean, default: false },
    hide: { type: Boolean, default: false },
    legendType: { type: String as PropType<LegendType>, default: 'rect' },
    tooltipType: { type: String as PropType<TooltipType>, default: undefined },
    connectNulls: { type: Boolean, default: false },
  },
  setup(props) {
    const isPanorama = useIsPanorama()

    SetPolarGraphicalItem(computed(() => ({
      type: 'radar' as const,
      data: undefined,
      dataKey: props.dataKey,
      hide: props.hide,
      angleAxisId: props.angleAxisId,
      radiusAxisId: props.radiusAxisId,
    })))

    SetLegendPayload(computed(() => [{
      dataKey: props.dataKey,
      type: props.legendType,
      color: getLegendItemColor(props.stroke, props.fill),
      value: props.name ?? String(props.dataKey ?? ''),
      payload: props,
      inactive: props.hide,
    }]))

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

    const radarPoints = useAppSelector(state =>
      selectRadarPoints(state, props.radiusAxisId, props.angleAxisId, isPanorama, props.dataKey),
    )

    return () => {
      if (props.hide) return null

      const data = radarPoints.value
      if (data == null || data.points.length === 0) return null

      const { points, baseLinePoints, isRange } = data
      const stroke = props.stroke ?? props.fill
      const hasStroke = stroke && stroke !== 'none'

      let pathD: string
      if (isRange && baseLinePoints.length > 0) {
        pathD = getRangePath(points, baseLinePoints)
      }
      else {
        pathD = getSinglePolygonPath(points)
      }

      const isClosed = pathD.endsWith('Z')

      return (
        <Layer class="v-charts-radar">
          <g class="v-charts-radar-polygon">
            {isRange && baseLinePoints.length > 0
              ? (
                <g>
                  <path
                    d={pathD}
                    fill={isClosed ? props.fill : 'none'}
                    fill-opacity={props.fillOpacity}
                    stroke="none"
                    stroke-dasharray={props.strokeDasharray}
                  />
                  {hasStroke && (
                    <path
                      d={getSinglePolygonPath(points)}
                      fill="none"
                      stroke={stroke}
                      stroke-width={props.strokeWidth}
                      stroke-dasharray={props.strokeDasharray}
                    />
                  )}
                  {hasStroke && (
                    <path
                      d={getSinglePolygonPath(baseLinePoints)}
                      fill="none"
                      stroke={stroke}
                      stroke-width={props.strokeWidth}
                      stroke-dasharray={props.strokeDasharray}
                    />
                  )}
                </g>
              )
              : (
                <path
                  d={pathD}
                  fill={isClosed ? props.fill : 'none'}
                  fill-opacity={props.fillOpacity}
                  stroke={stroke}
                  stroke-width={props.strokeWidth}
                  stroke-dasharray={props.strokeDasharray}
                />
              )}
          </g>
          {props.dot && (
            <g class="v-charts-radar-dots">
              {points.map((point, i) => (
                <Dot
                  key={`dot-${i}`}
                  cx={point.x}
                  cy={point.y}
                  r={3}
                  fill={stroke ?? props.fill}
                  stroke="#fff"
                />
              ))}
            </g>
          )}
        </Layer>
      )
    }
  },
})
