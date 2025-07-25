import { useAppDispatch } from './hooks'
import type { PolarChartOptions } from './polarOptionsSlice'
import { updatePolarOptions } from './polarOptionsSlice'
import { watch } from 'vue'

export function ReportPolarOptions(props: PolarChartOptions): null {
  const dispatch = useAppDispatch()
  watch(() => (props), (_, __, onCleanup) => {
    dispatch(updatePolarOptions(props))
    onCleanup(() => {
      dispatch(updatePolarOptions(props))
    })
  })
  return null
}
