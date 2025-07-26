import { AreaChart } from '../../chart/AreaChart'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'API/AreaChart',
  component: AreaChart,
} satisfies Meta<typeof AreaChart>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    data: [
      { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
      { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
      { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    ],
  },
}
