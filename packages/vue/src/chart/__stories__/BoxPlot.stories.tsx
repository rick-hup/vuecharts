import type { StoryObj } from '@storybook/vue3'
import { Teleport, computed, defineComponent } from 'vue'
import { ComposedChart } from '@/chart/ComposedChart'
import { Bar } from '@/cartesian/bar'
import { ResponsiveContainer } from '@/container'
import { XAxis, YAxis } from '@/cartesian/axis'
import { CartesianGrid } from '@/cartesian/cartesian-grid'
import { useAppSelector } from '@/state/hooks'
import { selectAxisScale } from '@/state/selectors/axisSelectors'
import { selectChartDataWithIndexes } from '@/state/selectors/dataSelectors'
import { useLabelLayerRef } from '@/context/labelLayerContext'

export default {
  title: 'examples/ComposedChart',
  component: ComposedChart,
}

interface BoxPlotRaw {
  min: number
  lowerQuartile: number
  median: number
  upperQuartile: number
  max: number
  average: number
}

const boxPlots: BoxPlotRaw[] = [
  { min: 100, lowerQuartile: 200, median: 250, upperQuartile: 450, max: 650, average: 150 },
  { min: 200, lowerQuartile: 400, median: 600, upperQuartile: 700, max: 800, average: 550 },
  { min: 0, lowerQuartile: 200, median: 400, upperQuartile: 600, max: 800, average: 400 },
]

const boxPlotData = boxPlots.map((v, i) => ({
  name: String(i),
  min: v.min,
  bottomWhisker: v.lowerQuartile - v.min,
  bottomBox: v.median - v.lowerQuartile,
  topBox: v.upperQuartile - v.median,
  topWhisker: v.max - v.upperQuartile,
  average: v.average,
  size: 250,
}))

const HorizonBar = defineComponent({
  inheritAttrs: false,
  setup(_, { attrs }) {
    return () => {
      const { x, y, width } = attrs as any
      if (x == null || y == null || width == null) return null
      return <line x1={x} y1={y} x2={Number(x) + Number(width)} y2={y} stroke="#000" stroke-width={3} />
    }
  },
})

const DotBar = defineComponent({
  inheritAttrs: false,
  setup(_, { attrs }) {
    return () => {
      const { x, y, width, height } = attrs as any
      if (x == null || y == null || width == null || height == null) return null
      return (
        <line
          x1={Number(x) + Number(width) / 2}
          y1={Number(y) + Number(height)}
          x2={Number(x) + Number(width) / 2}
          y2={y}
          stroke="#000"
          stroke-width={5}
          stroke-dasharray="5"
        />
      )
    }
  },
})

/**
 * Renders red average dots using axis scales from Redux.
 * Substitutes for Scatter + ZAxis which are not yet ported.
 */
const AverageDots = defineComponent({
  name: 'AverageDots',
  setup() {
    const xScale = useAppSelector(state => selectAxisScale(state, 'xAxis', 0, false))
    const yScale = useAppSelector(state => selectAxisScale(state, 'yAxis', 0, false))
    const chartData = useAppSelector(selectChartDataWithIndexes)
    const labelLayerRef = useLabelLayerRef()

    const dots = computed(() => {
      const xS = xScale.value
      const yS = yScale.value
      const data = chartData.value
      if (!xS || !yS || !data?.chartData) return []

      const bandwidth = typeof xS.bandwidth === 'function' ? xS.bandwidth() : 0

      return data.chartData.map((entry: any) => {
        const cx = Number(xS(entry.name)) + bandwidth / 2
        const cy = Number(yS(entry.average))
        return { cx, cy }
      })
    })

    return () => {
      const content = (
        <g class="v-charts-average-dots">
          {dots.value.map((d, i) => (
            <circle
              key={i}
              cx={d.cx}
              cy={d.cy}
              r={8}
              fill="red"
              stroke="#FFF"
            />
          ))}
        </g>
      )

      if (labelLayerRef?.value) {
        return <Teleport to={labelLayerRef.value}>{content}</Teleport>
      }
      return content
    }
  },
})

export const BoxPlotChart: StoryObj = {
  render: () => (
    <ResponsiveContainer minHeight={600}>
      <ComposedChart data={boxPlotData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid stroke-dasharray="3 3" />
        <Bar isAnimationActive={false} stackId="a" dataKey="min" fill="none" />
        <Bar isAnimationActive={false} stackId="a" dataKey="bar-min">
          {{ shape: (props: any) => <HorizonBar {...props} /> }}
        </Bar>
        <Bar isAnimationActive={false} stackId="a" dataKey="bottomWhisker">
          {{ shape: (props: any) => <DotBar {...props} /> }}
        </Bar>
        <Bar isAnimationActive={false} stackId="a" dataKey="bottomBox" fill="#8884d8" />
        <Bar isAnimationActive={false} stackId="a" dataKey="bar-avg">
          {{ shape: (props: any) => <HorizonBar {...props} /> }}
        </Bar>
        <Bar isAnimationActive={false} stackId="a" dataKey="topBox" fill="#8884d8" />
        <Bar isAnimationActive={false} stackId="a" dataKey="topWhisker">
          {{ shape: (props: any) => <DotBar {...props} /> }}
        </Bar>
        <Bar isAnimationActive={false} stackId="a" dataKey="bar-max">
          {{ shape: (props: any) => <HorizonBar {...props} /> }}
        </Bar>
        <AverageDots />
        <XAxis dataKey="name" scale="band" />
        <YAxis />
      </ComposedChart>
    </ResponsiveContainer>
  ),
  args: {},
}
