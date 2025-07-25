import type { RechartsRootState } from '../store'
import type { TooltipPayloadSearcher } from '../tooltipSlice'

export function selectTooltipPayloadSearcher(state: RechartsRootState): TooltipPayloadSearcher | undefined {
  return state.options.tooltipPayloadSearcher
}
