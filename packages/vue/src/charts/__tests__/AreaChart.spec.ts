import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import AreaChart from '../AreaChart.vue'
import { nextTick } from 'vue'

const mockData = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
]

describe('areaChart', () => {
  it('renders without crashing', () => {
    const wrapper = mount(AreaChart, {
      props: {
        width: 500,
        height: 300,
        data: mockData,
      },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('renders svg element with correct dimensions', async () => {
    const width = 500
    const height = 300
    const wrapper = mount(AreaChart, {
      props: {
        width,
        height,
        data: mockData,
      },
    })
    await nextTick()
    const svg = wrapper.find('svg')
    expect(svg.exists()).toBe(true)
    expect(svg.attributes('width')).toBe(width.toString())
    expect(svg.attributes('height')).toBe(height.toString())
  })

  it('renders area path when data is provided', async () => {
    const wrapper = mount(AreaChart, {
      props: {
        width: 500,
        height: 300,
        data: mockData,
        dataKey: 'uv',
      },
    })
    await nextTick()
    const path = wrapper.find('path.recharts-area-area')
    expect(path.exists()).toBe(true)
  })

  it('applies margin prop correctly', async () => {
    const margin = { top: 20, right: 20, bottom: 20, left: 20 }
    const wrapper = mount(AreaChart, {
      props: {
        width: 500,
        height: 300,
        data: mockData,
        margin,
      },
    })
    await nextTick()
    const chart = wrapper.find('.recharts-wrapper')
    expect(chart.attributes('style')).toContain(`padding: ${margin.top}px ${margin.right}px ${margin.bottom}px ${margin.left}px`)
  })

  it('emits events on area interaction', async () => {
    const wrapper = mount(AreaChart, {
      props: {
        width: 500,
        height: 300,
        data: mockData,
        dataKey: 'uv',
      },
    })
    await nextTick()
    const area = wrapper.find('path.recharts-area-area')
    await area.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    await area.trigger('mouseenter')
    expect(wrapper.emitted('mouseenter')).toBeTruthy()
    await area.trigger('mouseleave')
    expect(wrapper.emitted('mouseleave')).toBeTruthy()
  })
})
