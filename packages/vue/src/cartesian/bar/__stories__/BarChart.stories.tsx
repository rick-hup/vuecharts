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
import { pageData } from '@/storybook/data'

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
