import type { StoryObj } from '@storybook/vue3'
import { defineComponent, ref } from 'vue'
import { ComposedChart } from '@/chart/ComposedChart'
import { Scatter } from '@/cartesian/scatter'
import { ZAxis } from '@/cartesian/z-axis'
import { XAxis, YAxis } from '@/cartesian/axis'
import { CartesianGrid } from '@/cartesian/cartesian-grid'
import { Tooltip } from '@/components/Tooltip'
import { Legend } from '@/components/legend'
import { ResponsiveContainer } from '@/container'
import { getStoryArgsFromArgsTypesObject } from '@/storybook/api/props/utils'
import { CategoricalChartProps } from '@/storybook/api/props/chart-props'
import type { ChartData } from '@/state/chartDataSlice'

export default {
  title: 'examples/ScatterChart',
  component: ComposedChart,
}

type Story = StoryObj

const ChangingDataKeyWrapper = defineComponent({
  props: {
    args: { type: Object, default: () => ({}) },
  },
  setup(props) {
    type MockDataType = {
      x?: { value: number }
      y?: { value: number }
      name: string
    }
    const data1: ReadonlyArray<MockDataType> = [
      { x: { value: 1 }, name: 'x1' },
      { x: { value: 2 }, name: 'x2' },
      { x: { value: 3 }, name: 'x3' },
    ]
    const data2: ReadonlyArray<MockDataType> = [
      { y: { value: 3 }, name: 'y1' },
      { y: { value: 2 }, name: 'y2' },
      { y: { value: 1 }, name: 'y3' },
    ]

    const dataKey1 = (d: MockDataType) => d.x?.value ?? 0
    const dataKey2 = (d: MockDataType) => d.y?.value ?? 0

    const useData2 = ref(false)
    const visible = ref(true)

    return () => (
      <div>
        <div>
          <button type="button" onClick={() => { useData2.value = false; visible.value = true }}>
            Use data1
          </button>
          <button type="button" onClick={() => { useData2.value = true; visible.value = true }}>
            Use data2
          </button>
          <button type="button" onClick={() => { visible.value = false }}>
            Hide
          </button>
        </div>
        <ComposedChart {...props.args} data={useData2.value ? data2 as unknown as ChartData : data1 as unknown as ChartData}>
          <CartesianGrid stroke-dasharray="3 3" />
          <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
          <YAxis dataKey={useData2.value ? dataKey2 : dataKey1} />
          <ZAxis range={[200, 200]} />
          <Tooltip />
          <Legend />
          <Scatter
            name="Animated Scatter"
            hide={!visible.value}
            dataKey={useData2.value ? dataKey2 : dataKey1}
            stroke="#8884d8"
            fill="#8884d8"
            stroke-width={3}
            stroke-dasharray="2 2"
          />
        </ComposedChart>
      </div>
    )
  },
})

export const ChangingDataKey: Story = {
  args: {
    ...getStoryArgsFromArgsTypesObject(CategoricalChartProps),
    width: 500,
    height: 300,
    margin: { top: 30, right: 30, left: 20, bottom: 5 },
  },
  render: (args: Record<string, any>) => <ChangingDataKeyWrapper args={args} />,
}

const simpleData = [
  { x: 100, y: 200, z: 200 },
  { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 },
  { x: 140, y: 250, z: 280 },
  { x: 150, y: 400, z: 500 },
  { x: 110, y: 280, z: 200 },
]

export const SimpleScatter: Story = {
  args: {
    ...getStoryArgsFromArgsTypesObject(CategoricalChartProps),
    width: 500,
    height: 400,
    margin: { top: 20, right: 20, bottom: 20, left: 20 },
  },
  render: (args: Record<string, any>) => {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart {...args} data={simpleData}>
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="stature" unit="cm" />
          <YAxis type="number" dataKey="y" name="weight" unit="kg" />
          <ZAxis type="number" dataKey="z" range={[60, 400]} name="score" unit="km" />
          <Tooltip />
          <Scatter name="A school" fill="#8884d8" />
        </ComposedChart>
      </ResponsiveContainer>
    )
  },
}

export const EmptyChart: Story = {
  render: () => {
    const getHourFromTimestamp = (value: number) => {
      const data = new Date(value)
      let hour = data.getHours()
      const minute = data.getMinutes()
      const ampm = hour >= 12 ? 'PM' : 'AM'
      hour %= 12
      hour = hour === 0 ? 12 : hour
      return minute > 0 ? `${hour}:${minute.toString().padStart(2, '0')} ${ampm}` : `${hour} ${ampm}`
    }

    return (
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid />
          <XAxis
            type="number"
            ticks={[
              new Date('2025-05-06T00:00:00').getTime(),
              new Date('2025-05-06T03:00:00').getTime(),
              new Date('2025-05-06T06:00:00').getTime(),
              new Date('2025-05-06T09:00:00').getTime(),
              new Date('2025-05-06T12:00:00').getTime(),
              new Date('2025-05-06T15:00:00').getTime(),
              new Date('2025-05-06T18:00:00').getTime(),
              new Date('2025-05-06T21:00:00').getTime(),
              new Date('2025-05-07T00:00:00').getTime(),
            ]}
            tickFormatter={(tickValue: any) => {
              if (typeof tickValue !== 'number') return String(tickValue)
              return getHourFromTimestamp(tickValue)
            }}
            dataKey="hour"
            domain={[new Date('2025-05-06T00:00:00').getTime(), new Date('2025-05-07T00:00:00').getTime()]}
          />
          <YAxis type="number" ticks={[0, 80, 180, 220]} />
          <Tooltip />
          <Scatter name="A school" data={[]} fill="#8884d8" />
        </ComposedChart>
      </ResponsiveContainer>
    )
  },
}
