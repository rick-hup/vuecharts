import { generateCategoricalChart } from '@/chart/generateCategoricalChart'
import { arrayTooltipSearcher } from '@/state/optionsSlice'
import type { TooltipEventType } from '@/types'

const allowedTooltipTypes: ReadonlyArray<TooltipEventType> = ['axis', 'item']

export const ScatterChart = generateCategoricalChart({
  chartName: 'ScatterChart',
  defaultTooltipEventType: 'item',
  tooltipPayloadSearcher: arrayTooltipSearcher,
  validateTooltipEventTypes: allowedTooltipTypes,
})
