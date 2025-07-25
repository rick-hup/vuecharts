import { useAppDispatch } from './hooks'
import { addBar, removeBar } from './graphicalItemsSlice'
import { watch } from 'vue'

export function ReportBar(): null {
  const dispatch = useAppDispatch()
  watch(() => ({}), (_, __, onCleanup) => {
    dispatch(addBar())
    onCleanup(() => {
      dispatch(removeBar())
    })
  })
  return null
}
