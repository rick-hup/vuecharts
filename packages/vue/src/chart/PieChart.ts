import { generateCategoricalChart } from '@/chart/generateCategoricalChart'
import { arrayTooltipSearcher } from '@/state/optionsSlice'

export const PieChart = generateCategoricalChart({
  chartName: 'PieChart',
  defaultProps: {
    layout: 'centric' as any,
    startAngle: 0,
    endAngle: 360,
  },
  defaultTooltipEventType: 'item',
  validateTooltipEventTypes: ['item'],
  tooltipPayloadSearcher: arrayTooltipSearcher,
})
