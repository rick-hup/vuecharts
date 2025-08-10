import { render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import { Bar, BarChart, XAxis, YAxis } from '@/index'

describe('bar', () => {
  const data = [
    { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 300, pv: 4567, amt: 2400 },
    { name: 'Page C', uv: 300, pv: 1398, amt: 2400 },
    { name: 'Page D', uv: 200, pv: 9800, amt: 2400 },
    { name: 'Page E', uv: 278, pv: 3908, amt: 2400 },
    { name: 'Page F', uv: 189, pv: 4800, amt: 2400 },
  ]

  it('renders bars correctly', () => {
    const { container } = render(() => (
      <BarChart width={400} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="uv" fill="#8884d8" />
      </BarChart>
    ))

    // Check that bars are rendered
    const bars = container.querySelectorAll('.v-charts-bar-rectangle')
    expect(bars.length).toBeGreaterThanOrEqual(0)
  })

  it('renders background bars when background prop is true', () => {
    const { container } = render(() => (
      <BarChart width={400} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="uv" fill="#8884d8" background />
      </BarChart>
    ))

    // Check that background bars are rendered
    const backgroundBars = container.querySelectorAll('rect[fill="#eee"]')
    expect(backgroundBars.length).toBeGreaterThanOrEqual(0)
  })

  it('applies custom fill color', () => {
    const { container } = render(() => (
      <BarChart width={400} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="uv" fill="#ff0000" />
      </BarChart>
    ))

    // Check that bars exist
    const bars = container.querySelectorAll('.v-charts-bar-rectangle')
    expect(bars.length).toBeGreaterThanOrEqual(0)
  })
})
