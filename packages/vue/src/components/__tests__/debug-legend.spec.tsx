import { render } from '@testing-library/vue'
import { describe, expect, it, beforeEach } from 'vitest'
import { Bar, BarChart, Legend, XAxis, YAxis } from '@/index'
import { mockGetBoundingClientRect } from '@/test/mockGetBoundingClientRect'

describe('Legend debug', () => {
  beforeEach(() => {
    mockGetBoundingClientRect({ width: 500, height: 500 })
  })

  const data = [
    { name: 'Page A', uv: 400 },
    { name: 'Page B', uv: 300 },
  ]

  it('debug legend location', () => {
    const { container, baseElement } = render(() => (
      <BarChart width={500} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Legend />
        <Bar dataKey="uv" fill="#8884d8" isAnimationActive={false} />
      </BarChart>
    ))

    const legendInBody = document.body.querySelector('.v-charts-legend-wrapper')
    const legendInBase = baseElement.querySelector('.v-charts-legend-wrapper')
    const wrapper = document.body.querySelector('.v-charts-wrapper')

    // Force fail to see output
    expect({
      containerHtml: container.innerHTML.slice(0, 500),
      legendInBody: legendInBody?.outerHTML?.slice(0, 300) || 'NOT FOUND',
      legendInBase: legendInBase?.outerHTML?.slice(0, 300) || 'NOT FOUND',
      wrapperChildCount: wrapper?.children.length,
      wrapperHTML: wrapper?.innerHTML?.slice(0, 1000) || 'NOT FOUND',
    }).toBe('DEBUG')
  })
})
