import type { RechartsRootState } from '../store'
import type { AxisId } from '../cartesianAxisSlice'

export const pickAxisId = (_state: RechartsRootState, _axisType: unknown, axisId: AxisId): AxisId => axisId
