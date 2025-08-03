import { Bar } from '@/cartesian/bar/Bar'
import { BarChart } from '@/chart/BarChart'
import { CategoricalChartProps } from '@/storybook/api/props/chart-props'
import { getStoryArgsFromArgsTypesObject } from '@/storybook/api/props/utils'
import { pageData } from '@/storybook/data'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'examples/BarChart',
  component: BarChart,
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
  render: (args: Record<string, any>) => {
    return (
      <BarChart {...args}>
        <Bar dataKey="uv" fill="#8884d8" />
      </BarChart>
    )
  },
}
