import type { StoryObj } from '@storybook/vue3'
import { ComposedChart } from '@/chart/ComposedChart'
import { Area, ResponsiveContainer } from '@/index'
import { XAxis, YAxis } from '@/cartesian/axis'
import { Tooltip } from '@/components/Tooltip'
import { Legend } from '@/components/legend'
import { getStoryArgsFromArgsTypesObject } from '@/storybook/api/props/utils'
import { CategoricalChartProps } from '@/storybook/api/props/chart-props'
import { pageData } from '@/storybook/data'

export default {
  title: 'examples/ComposedChart',
  component: ComposedChart,
}

/**
 * https://github.com/recharts/recharts/issues/5477
 */
export const AreaChartWithAccessibilityLayer: StoryObj = {
  render: (args: Record<string, any>) => {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          data={pageData}
          {...args}
        >
          <Area isAnimationActive={false} dataKey="uv" />
          <Legend />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </ComposedChart>
      </ResponsiveContainer>
    )
  },
  args: getStoryArgsFromArgsTypesObject(CategoricalChartProps),
  parameters: {
    docs: {
      description: {
        story: 'You can tab to this chart. From there, you can use the arrow keys to navigate along the chart.',
      },
    },
  },
}
