import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export type PolarChartOptions = {
  cx: number | string
  cy: number | string
  startAngle: number
  endAngle: number
  innerRadius: number | string
  outerRadius: number | string
}

const polarOptionsSlice = createSlice({
  name: 'polarOptions',
  initialState: null as PolarChartOptions | null,
  reducers: {
    updatePolarOptions(_, action: PayloadAction<PolarChartOptions>) {
      return action.payload
    },
  },
})

export const { updatePolarOptions } = polarOptionsSlice.actions

export const polarOptionsReducer = polarOptionsSlice.reducer
