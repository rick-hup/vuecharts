import type { Meta, StoryObj } from '@storybook/vue3'
import { defineComponent, ref } from 'vue'
import { BarChart } from '@/chart/BarChart'
import { Bar } from '@/cartesian/bar/Bar'
import { CartesianGrid } from '@/cartesian/cartesian-grid/CartesianGrid'
import { XAxis, YAxis } from '@/cartesian/axis'
import { ResponsiveContainer } from '@/index'
import { Tooltip } from '@/components/Tooltip'
import { Legend } from '@/components/legend'
import type { LegendPayload } from '@/components/DefaultLegendContent'
import { getStoryArgsFromArgsTypesObject } from '@/storybook/api/props/utils'
import { CategoricalChartProps } from '@/storybook/api/props/chart-props'
import { ErrorBar } from '@/cartesian/error-bar/ErrorBar'
import { Brush } from '@/cartesian/brush'
import { Rectangle } from '@/shape/Rectangle'
import { numberData, pageData, rangeData } from '@/storybook/data'

const meta = {
  title: 'examples/BarChart',
  component: BarChart,
  argTypes: {
    width: { control: 'number' },
    height: { control: 'number' },
  },
} satisfies Meta<typeof BarChart>

export default meta
type Story = StoryObj<typeof meta>

const StackedAndDynamicWrapper = defineComponent({
  props: {
    args: { type: Object, default: () => ({}) },
  },
  setup(props) {
    const focusedDataKey = ref<string | null>(null)
    const locked = ref(false)

    const onLegendMouseEnter = (payload: LegendPayload) => {
      if (!locked.value) {
        focusedDataKey.value = String(payload.dataKey)
      }
    }

    const onLegendMouseLeave = () => {
      if (!locked.value) {
        focusedDataKey.value = null
      }
    }

    const onLegendClick = (payload: LegendPayload) => {
      if (focusedDataKey.value === String(payload.dataKey)) {
        if (locked.value) {
          focusedDataKey.value = null
          locked.value = false
        }
        else {
          locked.value = true
        }
      }
      else {
        focusedDataKey.value = String(payload.dataKey)
        locked.value = true
      }
    }

    return () => (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart {...props.args}>
          <CartesianGrid stroke-dasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Legend onMouseEnter={onLegendMouseEnter} onMouseLeave={onLegendMouseLeave} onClick={onLegendClick} />
          <Bar
            hide={focusedDataKey.value != null && focusedDataKey.value !== 'pv'}
            dataKey="pv"
            stackId="a"
            fill="#8884d8"
            activeBar={{ fill: 'gold' }}
          />
          <Bar
            hide={focusedDataKey.value != null && focusedDataKey.value !== 'uv'}
            dataKey="uv"
            stackId="a"
            fill="#82ca9d"
            activeBar={{ fill: 'silver' }}
          />
          <Tooltip shared={false} defaultIndex={1} />
        </BarChart>
      </ResponsiveContainer>
    )
  },
})

export const StackedWithErrorBar: Story = {
  args: {
    ...getStoryArgsFromArgsTypesObject(CategoricalChartProps),
    width: 500,
    height: 300,
    data: pageData,
    margin: {
      top: 20,
      right: 30,
      left: 20,
      bottom: 5,
    },
    layout: 'vertical',
  },
  render: (args: Record<string, any>) => {
    // Build pvError data inside render to avoid Storybook freezing the array values in args,
    // which causes Vue proxy invariant errors during deep watch traversal
    const data = (args.data as typeof pageData).map(d => ({ ...d, pvError: [100, 200] }))
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart {...args} data={data}>
          <CartesianGrid stroke-dasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Legend />
          <Tooltip />
          <Bar dataKey="pv" stackId="a" fill="#8884d8" />
          <Bar dataKey="uv" stackId="a" fill="#82ca9d">
            <ErrorBar dataKey="pvError" width={5} stroke="red" direction="x" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    )
  },
}

export const XAxisTickMarginWithBrushDy: Story = {
  args: {
    ...getStoryArgsFromArgsTypesObject(CategoricalChartProps),
    width: 500,
    height: 300,
    data: numberData,
    margin: {
      top: 5,
      right: 30,
      left: 20,
      bottom: 35,
    },
  },
  render: (args: Record<string, any>) => {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart {...args}>
          <CartesianGrid stroke-dasharray="3 3" />
          <XAxis dataKey="name" tickMargin={30} />
          <YAxis />
          <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
          <Tooltip />
          <Brush dataKey="name" height={30} dy={30} stroke="#8884d8" />
          <Bar dataKey="pv" fill="#8884d8" />
          <Bar dataKey="uv" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    )
  },
}

export const StackedWithBrush: Story = {
  args: {
    ...getStoryArgsFromArgsTypesObject(CategoricalChartProps),
    width: 500,
    height: 300,
    data: pageData,
    margin: {
      top: 20,
      right: 30,
      left: 20,
      bottom: 5,
    },
  },
  render: (args: Record<string, any>) => {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart {...args}>
          <CartesianGrid stroke-dasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
          <Tooltip defaultIndex={1} />
          <Bar dataKey="pv" stackId="a" fill="#8884d8" activeBar={{ fill: 'gold' }} />
          <Bar dataKey="uv" stackId="a" fill="#82ca9d" activeBar={{ fill: 'silver' }} />
          <Brush dataKey="name" height={30} stroke="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    )
  },
}

export const HasLabelBasedOnSeparateDataKey: Story = {
  args: {
    ...getStoryArgsFromArgsTypesObject(CategoricalChartProps),
    width: 500,
    height: 300,
    data: pageData,
    margin: {
      top: 5,
      right: 30,
      left: 20,
      bottom: 5,
    },
  },
  render: (args: Record<string, any>) => {
    const dataWithLabel = (args.data as typeof pageData).map(({ name, uv, pv }) => ({
      name,
      uv,
      pv,
      label: uv > pv ? 'UV greater' : 'PV greater',
    }))
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart {...args} data={dataWithLabel}>
          <CartesianGrid stroke-dasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Legend />
          <Tooltip />
          <Bar dataKey="pv" fill="#8884d8" label={{ dataKey: 'label', position: 'top', fill: '#111' }} />
          <Bar dataKey="uv" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    )
  },
}

export const NoPadding: Story = {
  args: {
    ...getStoryArgsFromArgsTypesObject(CategoricalChartProps),
    width: 500,
    height: 300,
    data: pageData,
    margin: {
      top: 5,
      right: 30,
      left: 20,
      bottom: 5,
    },
    barSize: 20,
  },
  render: (args: Record<string, any>) => {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart {...args}>
          <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
          <YAxis />
          <Legend />
          <CartesianGrid stroke-dasharray="3 3" />
          <Bar dataKey="pv" fill="#8884d8" background={{ fill: '#eee' }} />
          <Tooltip />
        </BarChart>
      </ResponsiveContainer>
    )
  },
}

const dataWithSmallValuesAndZero = [
  { name: 'Page D', uv: 1397, pv: 0 },
  { name: 'Page E', uv: 0, pv: 1 },
  { name: 'Page F', uv: 1520, pv: 1108 },
  { name: 'Page G', uv: 2, pv: 680 },
]

export const WithMinPointSize: Story = {
  args: {
    ...getStoryArgsFromArgsTypesObject(CategoricalChartProps),
    width: 500,
    height: 300,
    data: dataWithSmallValuesAndZero,
    margin: {
      top: 5,
      right: 30,
      left: 20,
      bottom: 5,
    },
  },
  render: (args: Record<string, any>) => {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart {...args}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid stroke-dasharray="3 3" />
          <Tooltip />
          <Bar dataKey="pv" fill="purple" minPointSize={(value: number) => (value === 0 ? 0 : 2)} stackId="a" />
          <Bar dataKey="uv" fill="green" minPointSize={(value: number) => (value === 0 ? 0 : 2)} stackId="a" />
          <Bar dataKey="uv" fill="blue" minPointSize={(value: number) => (value === 0 ? 0 : 2)} />
        </BarChart>
      </ResponsiveContainer>
    )
  },
}

export const OneDataPointPercentSize: Story = {
  args: {
    ...getStoryArgsFromArgsTypesObject(CategoricalChartProps),
    width: 500,
    height: 300,
    data: [[4.5, 10]],
    /* When there's only one data point on a numerical domain, we cannot automatically calculate the bar size */
    barSize: '30%',
  },
  render: (args: Record<string, any>) => {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart {...args}>
          <XAxis dataKey={(v: number[]) => v[0]} type="number" domain={[0, 10]} />
          <YAxis />
          <CartesianGrid stroke-dasharray="3 3" />
          <Bar dataKey={(v: number[]) => v[1]} />
          <Tooltip />
        </BarChart>
      </ResponsiveContainer>
    )
  },
}

export const RangedBarChart: Story = {
  args: {
    ...getStoryArgsFromArgsTypesObject(CategoricalChartProps),
    width: 500,
    height: 300,
    margin: {
      top: 5,
      right: 30,
      left: 20,
      bottom: 5,
    },
    barSize: '30%',
  },
  render: (args: Record<string, any>) => {
    // Build data inside render to avoid Storybook freezing array values in args,
    // which causes Vue proxy invariant errors during deep watch traversal
    const data = rangeData.map(d => ({ ...d, temperature: [...d.temperature] }))
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart {...args} data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <CartesianGrid stroke-dasharray="3 3" />
          <Tooltip />
          <Bar dataKey="temperature" fill="violet" stroke="indigo" />
        </BarChart>
      </ResponsiveContainer>
    )
  },
}

export const CustomCursorBarChart: Story = {
  args: {
    ...getStoryArgsFromArgsTypesObject(CategoricalChartProps),
    width: 500,
    height: 300,
    data: pageData,
    margin: {
      top: 5,
      right: 30,
      left: 20,
      bottom: 5,
    },
  },
  render: (args: Record<string, any>) => {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart {...args}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid stroke-dasharray="3 3" />
          <Bar dataKey="uv" fill="violet" stroke="indigo" />
          <Tooltip>
            {{
              cursor: (props: any) => <Rectangle {...props} fill="red" fill-opacity={0.6} stroke="#111" />,
            }}
          </Tooltip>
        </BarChart>
      </ResponsiveContainer>
    )
  },
}

export const StackedAndDynamic: Story = {
  args: {
    ...getStoryArgsFromArgsTypesObject(CategoricalChartProps),
    width: 500,
    height: 300,
    data: pageData,
    margin: {
      top: 20,
      right: 30,
      left: 20,
      bottom: 5,
    },
  },
  render: (args: Record<string, any>) => <StackedAndDynamicWrapper args={args} />,
}
