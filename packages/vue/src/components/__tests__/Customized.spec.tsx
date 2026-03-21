import { render } from '@testing-library/vue'
import { beforeEach, describe, expect, it } from 'vitest'
import { Bar, BarChart, Line, LineChart, XAxis, YAxis } from '@/index'
import { Customized } from '../Customized'
import { mockGetBoundingClientRect } from '@/test/mockGetBoundingClientRect'

describe('<Customized />', () => {
  beforeEach(() => {
    mockGetBoundingClientRect({ width: 500, height: 500 })
  })

  const data = [
    { name: 'Page A', uv: 400, pv: 2400 },
    { name: 'Page B', uv: 300, pv: 1398 },
    { name: 'Page C', uv: 200, pv: 9800 },
  ]

  it('renders slot content inside the chart', () => {
    const { container } = render(() => (
      <LineChart width={500} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Line dataKey="uv" isAnimationActive={false} />
        <Customized>
          {{
            default: () => <text class="custom-text">Hello</text>,
          }}
        </Customized>
      </LineChart>
    ))
    expect(container.querySelector('.custom-text')).toBeTruthy()
    expect(container.querySelector('.custom-text')!.textContent).toBe('Hello')
  })

  it('passes formattedGraphicalItems to the slot', () => {
    let slotProps: any = null
    render(() => (
      <LineChart width={500} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Line dataKey="uv" isAnimationActive={false} />
        <Customized>
          {{
            default: (props: any) => {
              slotProps = props
              return null
            },
          }}
        </Customized>
      </LineChart>
    ))
    expect(slotProps).toBeTruthy()
    expect(slotProps.formattedGraphicalItems).toBeDefined()
    expect(Array.isArray(slotProps.formattedGraphicalItems)).toBe(true)
    expect(slotProps.formattedGraphicalItems.length).toBeGreaterThanOrEqual(1)
    expect(slotProps.formattedGraphicalItems[0].type).toBe('line')
    expect(slotProps.formattedGraphicalItems[0].dataKey).toBe('uv')
  })

  it('passes chartWidth and chartHeight to the slot', () => {
    let slotProps: any = null
    render(() => (
      <LineChart width={500} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Customized>
          {{
            default: (props: any) => {
              slotProps = props
              return null
            },
          }}
        </Customized>
      </LineChart>
    ))
    expect(slotProps).toBeTruthy()
    expect(slotProps.chartWidth).toBe(500)
    expect(slotProps.chartHeight).toBe(300)
  })

  it('passes offset to the slot', () => {
    let slotProps: any = null
    render(() => (
      <LineChart width={500} height={300} data={data} margin={{ top: 10, right: 20, bottom: 30, left: 40 }}>
        <XAxis dataKey="name" />
        <YAxis />
        <Customized>
          {{
            default: (props: any) => {
              slotProps = props
              return null
            },
          }}
        </Customized>
      </LineChart>
    ))
    expect(slotProps).toBeTruthy()
    expect(slotProps.offset).toBeDefined()
    expect(slotProps.offset.top).toBeGreaterThanOrEqual(10)
    expect(slotProps.offset.left).toBeGreaterThanOrEqual(40)
  })

  it('includes multiple graphical items', () => {
    let slotProps: any = null
    render(() => (
      <BarChart width={500} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="uv" isAnimationActive={false} />
        <Bar dataKey="pv" isAnimationActive={false} />
        <Customized>
          {{
            default: (props: any) => {
              slotProps = props
              return null
            },
          }}
        </Customized>
      </BarChart>
    ))
    expect(slotProps).toBeTruthy()
    expect(slotProps.formattedGraphicalItems.length).toBe(2)
  })

  it('renders nothing when no slot is provided', () => {
    const { container } = render(() => (
      <LineChart width={500} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Customized />
      </LineChart>
    ))
    // Should not crash
    expect(container.querySelector('.v-charts-wrapper')).toBeTruthy()
  })
})
