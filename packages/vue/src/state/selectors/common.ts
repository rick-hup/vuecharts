import type { RechartsRootState } from '@/state/store'

export const selectChartLayout = (state: RechartsRootState) => state.layout.layoutType
