import { describe, expect, it } from 'vitest'
import { computePieSectors } from '@/state/selectors/pieSelectors'

const offset = { top: 5, left: 5, width: 490, height: 490, right: 5, bottom: 5, brushBottom: 5 }

describe('computePieSectors', () => {
  it('returns undefined when displayedData is empty', () => {
    const result = computePieSectors({
      displayedData: [],
      pieSettings: { cx: '50%', cy: '50%', innerRadius: 0, outerRadius: '80%', startAngle: 0, endAngle: 360, paddingAngle: 0, minAngle: 0, dataKey: 'value', nameKey: 'name', fill: '#808080', cornerRadius: undefined, presentationProps: {} },
      offset,
    })
    expect(result).toBeUndefined()
  })

  it('computes equal sectors for equal data', () => {
    const data = [
      { name: 'A', value: 1 },
      { name: 'B', value: 1 },
      { name: 'C', value: 1 },
      { name: 'D', value: 1 },
    ]
    const result = computePieSectors({
      displayedData: data,
      pieSettings: { cx: '50%', cy: '50%', innerRadius: 0, outerRadius: '80%', startAngle: 0, endAngle: 360, paddingAngle: 0, minAngle: 0, dataKey: 'value', nameKey: 'name', fill: '#808080', cornerRadius: undefined, presentationProps: {} },
      offset,
    })
    expect(result).toHaveLength(4)
    // Each sector spans 90°
    expect(result![0].startAngle).toBeCloseTo(0)
    expect(result![0].endAngle).toBeCloseTo(90)
    expect(result![1].startAngle).toBeCloseTo(90)
    expect(result![1].endAngle).toBeCloseTo(180)
    expect(result![3].endAngle).toBeCloseTo(360)
  })

  it('uses data fill when present', () => {
    const data = [{ name: 'A', value: 1, fill: '#ff0000' }]
    const result = computePieSectors({
      displayedData: data,
      pieSettings: { cx: '50%', cy: '50%', innerRadius: 0, outerRadius: '80%', startAngle: 0, endAngle: 360, paddingAngle: 0, minAngle: 0, dataKey: 'value', nameKey: 'name', fill: '#808080', cornerRadius: undefined, presentationProps: {} },
      offset,
    })
    expect(result![0].fill).toBe('#ff0000')
  })

  it('computes correct cx/cy from percent', () => {
    const data = [{ name: 'A', value: 1 }]
    const result = computePieSectors({
      displayedData: data,
      pieSettings: { cx: '50%', cy: '50%', innerRadius: 0, outerRadius: '80%', startAngle: 0, endAngle: 360, paddingAngle: 0, minAngle: 0, dataKey: 'value', nameKey: 'name', fill: '#808080', cornerRadius: undefined, presentationProps: {} },
      offset,
    })
    // offset.left=5, 50% of offset.width=490 = 245, total cx = 250
    expect(result![0].cx).toBeCloseTo(250)
    expect(result![0].cy).toBeCloseTo(250)
  })
})
