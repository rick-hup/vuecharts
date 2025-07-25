import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { setScale } from '@/state/layoutSlice'
import { selectContainerScale } from '@/state/selectors/containerSelectors'
import { isWellBehavedNumber } from '@/utils'
import { ref, watch } from 'vue'

export function useReportScale() {
  const dispatch = useAppDispatch()
  const domRef = ref<HTMLElement | null>(null)
  const scale = useAppSelector(selectContainerScale)

  watch([domRef, scale], () => {
    if (domRef.value == null) {
      return
    }
    const rect = domRef.value.getBoundingClientRect()
    const newScale = rect.width / domRef.value.offsetWidth
    if (isWellBehavedNumber(newScale) && newScale !== scale.value) {
      dispatch(setScale(newScale))
    }
  })
  return domRef
}
