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
import { pageData, pageDataWithNegativeNumbers } from '@/storybook/data'

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

export const Tiny: Story = {
  args: {
    ...getStoryArgsFromArgsTypesObject(CategoricalChartProps),
    width: 150,
    height: 40,
    data: pageData,
  },
  render: (args: Record<string, any>) => (
    <BarChart {...args}>
      <Bar dataKey="uv" fill="#8884d8" background />
    </BarChart>
  ),
}

export const Simple: Story = {
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
  render: (args: Record<string, any>) => (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart {...args}>
        <CartesianGrid stroke-dasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Legend />
        <Tooltip defaultIndex={3} />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  ),
}

export const Stacked: Story = {
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
  render: (args: Record<string, any>) => (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart {...args}>
        <CartesianGrid stroke-dasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Legend />
        <Tooltip />
        <Bar dataKey="pv" stackId="a" fill="#8884d8" />
        <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  ),
}

export const Mix: Story = {
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
  render: (args: Record<string, any>) => (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart {...args}>
        <CartesianGrid stroke-dasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Legend />
        <Tooltip />
        <Bar dataKey="pv" stackId="a" fill="#8884d8" />
        <Bar dataKey="amt" stackId="a" fill="#82ca9d" />
        <Bar dataKey="uv" fill="#ffc658" />
      </BarChart>
    </ResponsiveContainer>
  ),
}

export const PositiveAndNegative: Story = {
  args: {
    ...getStoryArgsFromArgsTypesObject(CategoricalChartProps),
    width: 500,
    height: 300,
    data: pageDataWithNegativeNumbers,
    margin: {
      top: 5,
      right: 30,
      left: 20,
      bottom: 5,
    },
  },
  render: (args: Record<string, any>) => (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart {...args}>
        <CartesianGrid stroke-dasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Legend />
        <Tooltip />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  ),
}

export const StackedBySign: Story = {
  args: {
    ...getStoryArgsFromArgsTypesObject(CategoricalChartProps),
    width: 500,
    height: 300,
    data: pageDataWithNegativeNumbers,
    stackOffset: 'sign',
    margin: {
      top: 5,
      right: 30,
      left: 20,
      bottom: 5,
    },
  },
  render: (args: Record<string, any>) => (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart {...args}>
        <CartesianGrid stroke-dasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Legend />
        <Tooltip />
        <Bar dataKey="pv" fill="#8884d8" stackId="stack" />
        <Bar dataKey="uv" fill="#82ca9d" stackId="stack" />
      </BarChart>
    </ResponsiveContainer>
  ),
}

export const HasBackground: Story = {
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
  render: (args: Record<string, any>) => (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart {...args}>
        <CartesianGrid stroke-dasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Legend />
        <Tooltip />
        <Bar dataKey="pv" fill="#8884d8" background />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  ),
}

export const VerticalBarChart: Story = {
  args: {
    ...getStoryArgsFromArgsTypesObject(CategoricalChartProps),
    width: 500,
    height: 300,
    data: pageData,
    layout: 'vertical',
    margin: {
      top: 5,
      right: 30,
      left: 20,
      bottom: 5,
    },
  },
  render: (args: Record<string, any>) => (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart {...args}>
        <CartesianGrid stroke-dasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" />
        <Legend />
        <Tooltip />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  ),
}

export const Biaxial: Story = {
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
  render: (args: Record<string, any>) => (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart {...args}>
        <CartesianGrid stroke-dasharray="3 3" />
        <XAxis dataKey="name" />
        {/* @ts-expect-error yAxisId and orientation are valid runtime props */}
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        {/* @ts-expect-error yAxisId and orientation are valid runtime props */}
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
        <Legend />
        <Tooltip />
        <Bar yAxisId="left" dataKey="pv" fill="#8884d8" />
        <Bar yAxisId="right" dataKey="uv" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  ),
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
  render: (args: Record<string, any>) => (
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
  ),
}

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
