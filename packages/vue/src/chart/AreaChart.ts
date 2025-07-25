import { generateCategoricalChart } from '@/chart/generateCategoricalChart'
import { arrayTooltipSearcher } from '@/state/optionsSlice'

export const AreaChart = generateCategoricalChart({
  chartName: 'AreaChart',
  tooltipPayloadSearcher: arrayTooltipSearcher,
})
