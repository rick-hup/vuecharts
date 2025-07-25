import type { RechartsRootState } from '../store'
import type { TooltipSettingsState } from '../tooltipSlice'

export const selectTooltipSettings = (state: RechartsRootState): TooltipSettingsState => state.tooltip.settings
