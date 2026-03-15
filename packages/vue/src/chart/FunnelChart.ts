import { generateCategoricalChart } from '@/chart/generateCategoricalChart'
import { arrayTooltipSearcher } from '@/state/optionsSlice'

export const FunnelChart = generateCategoricalChart({
  chartName: 'FunnelChart',
  defaultTooltipEventType: 'item',
  validateTooltipEventTypes: ['item'],
  tooltipPayloadSearcher: arrayTooltipSearcher,
})
