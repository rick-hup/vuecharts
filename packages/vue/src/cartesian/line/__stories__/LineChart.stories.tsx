import type { Meta, StoryObj } from '@storybook/vue3'
import { defineComponent, ref } from 'vue'
import { LineChart } from '@/chart/LineChart'
import { Line } from '@/cartesian/line'
import { XAxis, YAxis } from '@/cartesian/axis'
import { CartesianGrid } from '@/cartesian/cartesian-grid'
import { Tooltip } from '@/components/Tooltip'
import { Legend } from '@/components/legend'
import { Brush } from '@/cartesian/brush'
import { ResponsiveContainer } from '@/index'
import { getStoryArgsFromArgsTypesObject } from '@/storybook/api/props/utils'
import { CategoricalChartProps } from '@/storybook/api/props/chart-props'
import { logData, pageData } from '@/storybook/data'
import type { ChartData } from '@/state/chartDataSlice'

const meta = {
  title: 'examples/LineChart',
  component: LineChart,
} satisfies Meta<typeof LineChart>

export default meta
type Story = StoryObj<typeof meta>

export const Simple: Story = {
  args: {
    ...getStoryArgsFromArgsTypesObject(CategoricalChartProps),
    width: 500,
    height: 300,
    data: pageData,
    margin: { top: 5, right: 30, left: 20, bottom: 5 },
  },
  render: (args: Record<string, any>) => {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart {...args}>
          <CartesianGrid stroke-dasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Legend />
          <Tooltip cursor={{ 'stroke': 'gold', 'stroke-width': 2 }} defaultIndex={3} />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    )
  },
}

export const Dashed: Story = {
  render: () => {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={pageData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid stroke-dasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Legend />
          <Tooltip defaultIndex={3} active />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" stroke-dasharray="5 5" />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" stroke-dasharray="3 4 5 2" />
        </LineChart>
      </ResponsiveContainer>
    )
  },
}

export const Vertical: Story = {
  args: {
    ...getStoryArgsFromArgsTypesObject(CategoricalChartProps),
    layout: 'vertical',
    width: 500,
    height: 300,
    data: pageData,
    margin: { top: 20, right: 30, left: 20, bottom: 5 },
  },
  render: (args: Record<string, any>) => {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart {...args}>
          <CartesianGrid stroke-dasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Legend />
          <Tooltip defaultIndex={4} active />
          <Line dataKey="pv" stroke="#8884d8" />
          <Line dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    )
  },
}

export const BiAxial: Story = {
  args: {
    ...getStoryArgsFromArgsTypesObject(CategoricalChartProps),
    width: 500,
    height: 300,
    data: pageData,
    margin: { top: 5, right: 30, left: 20, bottom: 5 },
  },
  render: (args: Record<string, any>) => {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart {...args}>
          <CartesianGrid yAxisId="left" stroke-dasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line yAxisId="right" type="monotone" dataKey="uv" stroke="#82ca9d" />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    )
  },
}

export const VerticalWithSpecifiedDomain: Story = {
  args: {
    ...getStoryArgsFromArgsTypesObject(CategoricalChartProps),
    layout: 'vertical',
    width: 500,
    height: 300,
    data: pageData,
    margin: { top: 20, right: 30, left: 20, bottom: 5 },
  },
  render: (args: Record<string, any>) => {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart {...args}>
          <CartesianGrid stroke-dasharray="3 3" />
          <XAxis type="number" domain={[0, 'dataMax + 1000']} />
          <YAxis dataKey="name" type="category" />
          <Legend />
          <Line dataKey="pv" stroke="#8884d8" />
          <Line dataKey="uv" stroke="#82ca9d" />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    )
  },
}

const connectNullsData = [
  { name: 'Page A', uv: 4000 },
  { name: 'Page B', uv: 3000 },
  { name: 'Page C', uv: 2000 },
  { name: 'Page D' },
  { name: 'Page E', uv: 1890 },
  { name: 'Page F', uv: 2390 },
  { name: 'Page G', uv: 3490 },
]

export const ConnectNulls: Story = {
  args: {
    ...getStoryArgsFromArgsTypesObject(CategoricalChartProps),
    width: 500,
    height: 200,
    data: connectNullsData,
    margin: { top: 10, right: 30, left: 0, bottom: 0 },
  },
  render: (args: Record<string, any>) => {
    return (
      <div style={{ width: '100%' }}>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart {...args}>
            <CartesianGrid stroke-dasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Line type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={200}>
          <LineChart {...args}>
            <CartesianGrid stroke-dasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Line connectNulls type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  },
}

export const WithXAxisPadding: Story = {
  args: {
    ...getStoryArgsFromArgsTypesObject(CategoricalChartProps),
    width: 500,
    height: 300,
    data: pageData,
  },
  render: (args: Record<string, any>) => {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart {...args}>
          <CartesianGrid stroke-dasharray="3 3" />
          <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
          <YAxis />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    )
  },
}

export const LineChartHasMultiSeries: Story = {
  args: {
    ...getStoryArgsFromArgsTypesObject(CategoricalChartProps),
    width: 500,
    height: 300,
    data: pageData,
  },
  render: (args: Record<string, any>) => {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart {...args}>
          <CartesianGrid />
          <XAxis dataKey="name" />
          <YAxis />
          <Legend />
          <Line dataKey="uv" />
          <Line dataKey="pv" />
          <Line dataKey="amt" />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    )
  },
}

export const LineChartAxisInterval: Story = {
  render: () => {
    return (
      <div style={{ width: '100%' }}>
        <LineChart width={200} height={100} data={pageData}>
          <CartesianGrid stroke-dasharray="3 3" />
          <XAxis dataKey="name" interval="preserveEnd" />
          <YAxis interval="preserveEnd" />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>

        <LineChart width={200} height={100} data={pageData}>
          <CartesianGrid stroke-dasharray="3 3" />
          <XAxis dataKey="name" interval="preserveStart" />
          <YAxis interval="preserveStart" />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>

        <LineChart width={200} height={100} data={pageData}>
          <CartesianGrid stroke-dasharray="3 3" />
          <XAxis dataKey="name" interval="preserveStartEnd" />
          <YAxis interval="preserveStartEnd" />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>

        <LineChart width={200} height={100} data={pageData}>
          <CartesianGrid stroke-dasharray="3 3" />
          <XAxis dataKey="name" interval={0} angle={30} dx={20} />
          <YAxis />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </div>
    )
  },
}

export const WithBrush: Story = {
  args: {
    ...getStoryArgsFromArgsTypesObject(CategoricalChartProps),
    data: pageData,
  },
  render: (args: Record<string, any>) => {
    return (
      <ResponsiveContainer>
        <LineChart {...args}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid stroke-dasharray="3 3" />
          <Legend />
          <Brush dataKey="name" startIndex={2} height={30} stroke="#8884d8" />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    )
  },
}

const HideOnLegendClickWrapper = defineComponent({
  props: {
    args: { type: Object, default: () => ({}) },
  },
  setup(props) {
    const activeSeries = ref<string[]>([])

    const handleLegendClick = (dataKey: any) => {
      if (typeof dataKey !== 'string')
        return
      if (activeSeries.value.includes(dataKey)) {
        activeSeries.value = activeSeries.value.filter(el => el !== dataKey)
      }
      else {
        activeSeries.value = [...activeSeries.value, dataKey]
      }
    }

    return () => (
      <ResponsiveContainer height={400}>
        <LineChart {...props.args}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid stroke-dasharray="3 3" />
          <Legend height={36} iconType="circle" onClick={(p: any) => handleLegendClick(p.dataKey)} />
          <Line hide={activeSeries.value.includes('uv')} type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
          <Line hide={activeSeries.value.includes('pv')} type="monotone" dataKey="pv" stroke="#987" fill="#8884d8" />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    )
  },
})

export const HideOnLegendClick: Story = {
  args: {
    ...getStoryArgsFromArgsTypesObject(CategoricalChartProps),
    data: pageData,
  },
  render: (args: Record<string, any>) => <HideOnLegendClickWrapper args={args} />,
}

export const LineTrailingIcon: Story = {
  args: {
    ...getStoryArgsFromArgsTypesObject(CategoricalChartProps),
    data: pageData.map((entry, index) => ({
      ...entry,
      lastDot: index === pageData.length - 1 ? entry.pv : undefined,
    })),
  },
  render: (args: Record<string, any>) => {
    return (
      <ResponsiveContainer>
        <LineChart {...args}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid stroke-dasharray="3 3" />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" />
          <Line
            type="monotone"
            dataKey="lastDot"
            legendType="none"
            tooltipType="none"
            dot={{ stroke: 'red', strokeWidth: 1, r: 4 }}
          />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    )
  },
}

export const ReversedXAxis: Story = {
  args: {
    ...getStoryArgsFromArgsTypesObject(CategoricalChartProps),
    width: 500,
    height: 300,
    data: pageData,
    margin: { top: 5, right: 30, left: 20, bottom: 5 },
  },
  render: (args: Record<string, any>) => {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart {...args}>
          <CartesianGrid stroke-dasharray="3 3" />
          <XAxis dataKey="name" reversed />
          <YAxis />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    )
  },
}

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
        <LineChart {...props.args} data={useData2.value ? data2 as unknown as ChartData : data1 as unknown as ChartData}>
          <CartesianGrid stroke-dasharray="3 3" />
          <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
          <YAxis dataKey={useData2.value ? dataKey2 : dataKey1} />
          <Tooltip />
          <Legend />
          <Line
            name="Animated line"
            hide={!visible.value}
            type="monotone"
            dataKey={useData2.value ? dataKey2 : dataKey1}
            stroke="#8884d8"
            stroke-dasharray="5 5"
            activeDot={{ r: 8 }}
            label={{ fill: 'red' }}
          />
        </LineChart>
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

const ToggleBetweenDataKeysWrapper = defineComponent({
  setup() {
    const dataKey = ref('pv')

    return () => (
      <div>
        <button
          type="button"
          onClick={() => {
            dataKey.value = dataKey.value === 'pv' ? 'uv' : 'pv'
          }}
        >
          Change Data Key
        </button>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={500} height={400} data={pageData}>
            <CartesianGrid stroke-dasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Legend />
            <Line type="monotone" dataKey={dataKey.value} stroke="#8884d8" activeDot={{ r: 8 }} />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  },
})

export const ToggleBetweenDataKeys: Story = {
  render: () => <ToggleBetweenDataKeysWrapper />,
}

export const LogarithmicYAxis: Story = {
  args: {
    ...getStoryArgsFromArgsTypesObject(CategoricalChartProps),
    width: 500,
    height: 300,
    data: logData,
    margin: { top: 20, right: 30, left: 50, bottom: 5 },
  },
  render: (args: Record<string, any>) => {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart {...args}>
          <CartesianGrid stroke-dasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis
            scale="symlog"
            ticks={[0, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000, 10000000000]}
          />
          <Tooltip defaultIndex={1} />
          <Line
            type="monotone"
            dataKey="performance"
            name="Performance"
            stroke="#75ABBC"
            stroke-width={3}
            activeDot={{ r: 8 }}
            unit=" KFLOPS"
          />
        </LineChart>
      </ResponsiveContainer>
    )
  },
}
