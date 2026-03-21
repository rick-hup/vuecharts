import { fireEvent, render } from '@testing-library/vue'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, nextTick, ref } from 'vue'
import { BarChart } from '@/chart/BarChart'
import { Bar } from '@/cartesian/bar/Bar'
import { XAxis } from '@/cartesian/axis/XAxis'
import { YAxis } from '@/cartesian/axis/YAxis'
import { Tooltip } from '@/components/Tooltip'
import { Customized } from '@/components/Customized'
import { mockGetBoundingClientRect } from '@/test/mockGetBoundingClientRect'
import { assertNotNull } from '@/test/helper'
import { useIsTooltipActive, useActiveTooltipCoordinate, useActiveTooltipLabel, usePlotArea } from '../publicHooks'

describe('publicHooks - tooltip hooks', () => {
  beforeEach(() => {
    mockGetBoundingClientRect({ width: 500, height: 500 })
  })

  const data = [
    { name: 'Page A', uv: 400, pv: 2400 },
    { name: 'Page B', uv: 300, pv: 1398 },
    { name: 'Page C', uv: 200, pv: 9800 },
    { name: 'Page D', uv: 278, pv: 3908 },
    { name: 'Page E', uv: 189, pv: 4800 },
  ]

  async function hoverChart(container: Element, clientX = 200, clientY = 200) {
    const chart = container.querySelector('.v-charts-wrapper')
    assertNotNull(chart)
    await fireEvent(chart, new MouseEvent('mousemove', { clientX, clientY }))
    await nextTick()
    await nextTick()
  }

  describe('useIsTooltipActive', () => {
    it('returns false initially and true after hover', async () => {
      const capturedValues: boolean[] = []

      const SpyComponent = defineComponent({
        setup() {
          const isActive = useIsTooltipActive()
          capturedValues.push(isActive.value)
          return () => <text data-testid="spy" data-active={String(isActive.value)} />
        },
      })

      const { container } = render(() => (
        <BarChart width={500} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="uv" isAnimationActive={false} />
          <Customized>
            {{ default: () => <SpyComponent /> }}
          </Customized>
        </BarChart>
      ))

      // Initially tooltip should not be active
      const spy = container.querySelector('[data-testid="spy"]')
      assertNotNull(spy)
      expect(spy.getAttribute('data-active')).toBe('false')

      // Hover the chart
      await hoverChart(container)

      // After hover, tooltip should be active
      expect(spy.getAttribute('data-active')).toBe('true')
    })
  })

  describe('useActiveTooltipLabel', () => {
    it('returns a valid label after hover', async () => {
      const SpyComponent = defineComponent({
        setup() {
          const label = useActiveTooltipLabel()
          return () => <text data-testid="label-spy" data-label={label.value ?? ''} />
        },
      })

      const { container } = render(() => (
        <BarChart width={500} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="uv" isAnimationActive={false} />
          <Customized>
            {{ default: () => <SpyComponent /> }}
          </Customized>
        </BarChart>
      ))

      // Initially label should be empty
      const spy = container.querySelector('[data-testid="label-spy"]')
      assertNotNull(spy)
      expect(spy.getAttribute('data-label')).toBe('')

      // Hover the chart
      await hoverChart(container)

      // After hover, label should be one of the data names
      const label = spy.getAttribute('data-label')
      const validLabels = data.map(d => d.name)
      expect(validLabels).toContain(label)
    })
  })

  describe('useActiveTooltipCoordinate', () => {
    it('returns non-null coordinate after hover', async () => {
      const SpyComponent = defineComponent({
        setup() {
          const coordinate = useActiveTooltipCoordinate()
          return () => (
            <text
              data-testid="coord-spy"
              data-x={coordinate.value?.x ?? ''}
              data-y={coordinate.value?.y ?? ''}
            />
          )
        },
      })

      const { container } = render(() => (
        <BarChart width={500} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="uv" isAnimationActive={false} />
          <Customized>
            {{ default: () => <SpyComponent /> }}
          </Customized>
        </BarChart>
      ))

      // Hover the chart
      await hoverChart(container)

      // After hover, coordinate should have numeric x and y
      const spy = container.querySelector('[data-testid="coord-spy"]')
      assertNotNull(spy)
      const x = spy.getAttribute('data-x')
      const y = spy.getAttribute('data-y')
      expect(x).not.toBe('')
      expect(y).not.toBe('')
      expect(Number(x)).not.toBeNaN()
      expect(Number(y)).not.toBeNaN()
    })
  })
})

describe('Layout public hooks', () => {
  beforeEach(() => {
    mockGetBoundingClientRect({ width: 500, height: 300 })
  })

  const data = [
    { name: 'Page A', uv: 400 },
    { name: 'Page B', uv: 300 },
    { name: 'Page C', uv: 200 },
  ]

  describe('usePlotArea', () => {
    it('returns plot area rectangle with positive dimensions inside axes', async () => {
      const SpyComponent = defineComponent({
        setup() {
          const plotArea = usePlotArea()
          return () => (
            <text
              data-testid="plot-spy"
              data-x={plotArea.value?.x ?? ''}
              data-y={plotArea.value?.y ?? ''}
              data-width={plotArea.value?.width ?? ''}
              data-height={plotArea.value?.height ?? ''}
            />
          )
        },
      })

      const { container } = render(() => (
        <BarChart width={500} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="uv" isAnimationActive={false} />
          <Customized>
            {{ default: () => <SpyComponent /> }}
          </Customized>
        </BarChart>
      ))

      await nextTick()
      await nextTick()

      const spy = container.querySelector('[data-testid="plot-spy"]')
      assertNotNull(spy)

      const x = Number(spy.getAttribute('data-x'))
      const y = Number(spy.getAttribute('data-y'))
      const width = Number(spy.getAttribute('data-width'))
      const height = Number(spy.getAttribute('data-height'))

      // x > 0 because YAxis takes space on the left
      expect(x).toBeGreaterThan(0)
      // width should be positive but less than chart width
      expect(width).toBeGreaterThan(0)
      expect(width).toBeLessThan(500)
      // height should be positive but less than chart height
      expect(height).toBeGreaterThan(0)
      expect(height).toBeLessThan(300)
    })
  })
})
