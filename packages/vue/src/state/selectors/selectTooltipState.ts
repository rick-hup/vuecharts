import type { RechartsRootState } from '../store'
import type { TooltipState } from '../tooltipSlice'

export const selectTooltipState = (state: RechartsRootState): TooltipState => state.tooltip
