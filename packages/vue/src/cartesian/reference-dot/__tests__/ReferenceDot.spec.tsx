import { render } from '@testing-library/vue'
import { beforeEach, describe, expect, it } from 'vitest'
import { Bar, BarChart, Line, LineChart, XAxis, YAxis } from '@/index'
import { ReferenceDot } from '../ReferenceDot'
import { mockGetBoundingClientRect } from '@/test/mockGetBoundingClientRect'

describe('<ReferenceDot />', () => {
  beforeEach(() => {
    mockGetBoundingClientRect({ width: 500, height: 500 })
  })

  const data = [
    { name: '201102', uv: -6.11, pv: 0 },
    { name: '201103', uv: 0.39, pv: 0 },
    { name: '201104', uv: -1.37, pv: 0 },
    { name: '201105', uv: 1.16, pv: 0 },
    { name: '201106', uv: 1.29, pv: 0 },
    { name: '201107', uv: 0.09, pv: 0 },
    { name: '201108', uv: 0.53, pv: 0 },
    { name: '201109', uv: 2.52, pv: 0 },
    { name: '201110', uv: 0.79, pv: 0 },
    { name: '201111', uv: 2.94, pv: 0 },
    { name: '201112', uv: 4.3, pv: 0 },
  ]

  it('renders a dot at specified x and y coordinates', () => {
    const { container } = render(() => (
      <BarChart
        width={1100}
        height={250}
        barGap={2}
        barSize={6}
        data={data}
        margin={{ top: 20, right: 60, bottom: 0, left: 20 }}
      >
        <XAxis dataKey="name" />
        <YAxis tickCount={7} />
        <Bar dataKey="uv" isAnimationActive={false} />
        <ReferenceDot x="201106" y={1.29} r={10} stroke="#666" label="Peak" />
      </BarChart>
    ))
    expect(container.querySelectorAll('.v-charts-reference-dot .v-charts-dot')).toHaveLength(1)
    expect(container.querySelectorAll('.v-charts-label')).toHaveLength(1)
  })

  it('renders multiple dots', () => {
    const { container } = render(() => (
      <BarChart
        width={1100}
        height={250}
        data={data}
        margin={{ top: 20, right: 60, bottom: 0, left: 20 }}
      >
        <XAxis dataKey="name" />
        <YAxis tickCount={7} />
        <Bar dataKey="uv" isAnimationActive={false} />
        <ReferenceDot x="201106" y={1.29} r={8} />
        <ReferenceDot x="201112" y={4.3} r={8} />
      </BarChart>
    ))
    expect(container.querySelectorAll('.v-charts-reference-dot .v-charts-dot')).toHaveLength(2)
  })

  it('don\'t render dot when x or y is missing', () => {
    const { container } = render(() => (
      <BarChart
        width={1100}
        height={250}
        data={data}
        margin={{ top: 20, right: 60, bottom: 0, left: 20 }}
      >
        <XAxis dataKey="name" />
        <YAxis tickCount={7} />
        <Bar dataKey="uv" isAnimationActive={false} />
        <ReferenceDot x="201106" r={10} />
        <ReferenceDot y={1.29} r={10} />
      </BarChart>
    ))
    expect(container.querySelectorAll('.v-charts-reference-dot .v-charts-dot')).toHaveLength(0)
  })

  it('don\'t render dot when coordinates are outside domain (default ifOverflow=\'discard\')', () => {
    const { container } = render(() => (
      <BarChart
        width={1100}
        height={250}
        data={data}
        margin={{ top: 20, right: 60, bottom: 0, left: 20 }}
      >
        <XAxis dataKey="name" />
        <YAxis tickCount={7} />
        <Bar dataKey="uv" isAnimationActive={false} />
        <ReferenceDot x="201106" y={200} r={10} />
      </BarChart>
    ))
    expect(container.querySelectorAll('.v-charts-reference-dot .v-charts-dot')).toHaveLength(0)
  })

  it('render dot when ifOverflow is "extendDomain"', () => {
    const { container } = render(() => (
      <BarChart
        width={1100}
        height={250}
        data={data}
        margin={{ top: 20, right: 60, bottom: 0, left: 20 }}
      >
        <XAxis dataKey="name" />
        <YAxis tickCount={7} />
        <Bar dataKey="uv" isAnimationActive={false} />
        <ReferenceDot x="201106" y={20} r={10} ifOverflow="extendDomain" />
      </BarChart>
    ))
    expect(container.querySelectorAll('.v-charts-reference-dot .v-charts-dot')).toHaveLength(1)
  })

  it('render dot when ifOverflow is "visible" even if outside domain', () => {
    const { container } = render(() => (
      <BarChart
        width={1100}
        height={250}
        data={data}
        margin={{ top: 20, right: 60, bottom: 0, left: 20 }}
      >
        <XAxis dataKey="name" />
        <YAxis tickCount={7} />
        <Bar dataKey="uv" isAnimationActive={false} />
        <ReferenceDot x="201106" y={200} r={10} ifOverflow="visible" />
      </BarChart>
    ))
    expect(container.querySelectorAll('.v-charts-reference-dot .v-charts-dot')).toHaveLength(1)
  })

  it('applies custom r (radius) to the dot', () => {
    const { container } = render(() => (
      <BarChart
        width={1100}
        height={250}
        data={data}
        margin={{ top: 20, right: 60, bottom: 0, left: 20 }}
      >
        <XAxis dataKey="name" />
        <YAxis tickCount={7} />
        <Bar dataKey="uv" isAnimationActive={false} />
        <ReferenceDot x="201106" y={1.29} r={20} />
      </BarChart>
    ))
    const dot = container.querySelector('.v-charts-reference-dot .v-charts-dot')
    expect(dot).toBeTruthy()
    expect(dot!.getAttribute('r')).toBe('20')
  })

  it('applies clip-path when ifOverflow is "hidden"', () => {
    const { container } = render(() => (
      <BarChart
        width={1100}
        height={250}
        data={data}
        margin={{ top: 20, right: 60, bottom: 0, left: 20 }}
      >
        <XAxis dataKey="name" />
        <YAxis tickCount={7} />
        <Bar dataKey="uv" isAnimationActive={false} />
        <ReferenceDot x="201106" y={200} r={10} ifOverflow="hidden" />
      </BarChart>
    ))
    const dot = container.querySelector('.v-charts-reference-dot .v-charts-dot')
    expect(dot).toBeTruthy()
    expect(dot!.getAttribute('clip-path')).toBeTruthy()
  })

  describe('label', () => {
    it('should render label defined as a string', () => {
      const { container, getByText } = render(() => (
        <BarChart
          width={1100}
          height={250}
          data={data}
          margin={{ top: 20, right: 60, bottom: 0, left: 20 }}
        >
          <XAxis dataKey="name" />
          <YAxis tickCount={7} />
          <Bar dataKey="uv" isAnimationActive={false} />
          <ReferenceDot x="201106" y={1.29} r={10} label="My dot" />
        </BarChart>
      ))
      expect(container.querySelectorAll('.v-charts-label')).toHaveLength(1)
      expect(getByText('My dot')).toBeTruthy()
    })

    it('should render label defined as a number', () => {
      const { container, getByText } = render(() => (
        <BarChart
          width={1100}
          height={250}
          data={data}
          margin={{ top: 20, right: 60, bottom: 0, left: 20 }}
        >
          <XAxis dataKey="name" />
          <YAxis tickCount={7} />
          <Bar dataKey="uv" isAnimationActive={false} />
          <ReferenceDot x="201106" y={1.29} r={10} label={2024} />
        </BarChart>
      ))
      expect(container.querySelectorAll('.v-charts-label')).toHaveLength(1)
      expect(getByText('2024')).toBeTruthy()
    })

    it('should render label defined as a Label props object', () => {
      const { container, getByText } = render(() => (
        <BarChart
          width={1100}
          height={250}
          data={data}
          margin={{ top: 20, right: 60, bottom: 0, left: 20 }}
        >
          <XAxis dataKey="name" />
          <YAxis tickCount={7} />
          <Bar dataKey="uv" isAnimationActive={false} />
          <ReferenceDot
            x="201106"
            y={1.29}
            r={10}
            label={{ value: 'Object label', offset: 8 }}
          />
        </BarChart>
      ))
      expect(container.querySelectorAll('.v-charts-label')).toHaveLength(1)
      expect(getByText('Object label')).toBeTruthy()
    })
  })

  describe('fill and stroke', () => {
    it('applies custom fill and stroke', () => {
      const { container } = render(() => (
        <BarChart
          width={1100}
          height={250}
          data={data}
          margin={{ top: 20, right: 60, bottom: 0, left: 20 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="uv" isAnimationActive={false} />
          <ReferenceDot x="201106" y={1.29} r={10} fill="#ff0000" stroke="#00ff00" />
        </BarChart>
      ))
      const dot = container.querySelector('.v-charts-reference-dot .v-charts-dot')
      expect(dot).toBeTruthy()
      expect(dot!.getAttribute('fill')).toBe('#ff0000')
      expect(dot!.getAttribute('stroke')).toBe('#00ff00')
    })
  })

  describe('class', () => {
    it('applies custom class to the reference dot layer', () => {
      const { container } = render(() => (
        <BarChart
          width={1100}
          height={250}
          data={data}
          margin={{ top: 20, right: 60, bottom: 0, left: 20 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="uv" isAnimationActive={false} />
          <ReferenceDot x="201106" y={1.29} r={10} class="custom-dot" />
        </BarChart>
      ))
      expect(container.querySelectorAll('.custom-dot')).toHaveLength(1)
    })
  })

  it('works in a LineChart', () => {
    const { container } = render(() => (
      <LineChart
        width={1100}
        height={250}
        data={data}
        margin={{ top: 20, right: 60, bottom: 0, left: 20 }}
      >
        <XAxis dataKey="name" />
        <YAxis tickCount={7} />
        <Line dataKey="uv" isAnimationActive={false} />
        <ReferenceDot x="201106" y={1.29} r={10} fill="red" />
      </LineChart>
    ))
    expect(container.querySelectorAll('.v-charts-reference-dot .v-charts-dot')).toHaveLength(1)
  })
})
