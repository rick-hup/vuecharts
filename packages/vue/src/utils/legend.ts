import type { LegendSettings } from '@/state/legendSlice'
import type { ChartOffset, Size } from '@/types'
import { isNumber } from '@/utils/validate'

export function appendOffsetOfLegend(offset: ChartOffset, legendSettings: LegendSettings, legendSize: Size) {
  if (legendSettings && legendSize) {
    const { width: boxWidth, height: boxHeight } = legendSize
    const { align, verticalAlign, layout } = legendSettings

    if (
      (layout === 'vertical' || (layout === 'horizontal' && verticalAlign === 'middle'))
      && align !== 'center'
      && isNumber(offset[align])
    ) {
      return { ...offset, [align]: offset[align] + (boxWidth || 0) }
    }

    if (
      (layout === 'horizontal' || (layout === 'vertical' && align === 'center'))
      && verticalAlign !== 'middle'
      && isNumber(offset[verticalAlign])
    ) {
      return { ...offset, [verticalAlign]: offset[verticalAlign] + (boxHeight || 0) }
    }
  }

  return offset
}
