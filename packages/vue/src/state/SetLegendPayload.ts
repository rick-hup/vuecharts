import type { LegendPayload } from '@/components/DefaultLegendContent'
import { useAppDispatch } from './hooks'
import { useIsPanorama } from '@/context/PanoramaContextProvider'
import type { MaybeRef } from 'vue'
import { unref, watchEffect } from 'vue'
import { addLegendPayload, removeLegendPayload } from '@/state/legendSlice'

export function SetLegendPayload(_legendPayload: MaybeRef<ReadonlyArray<LegendPayload>>): null {
  const dispatch = useAppDispatch()
  const isPanorama = useIsPanorama()
  watchEffect((onCleanup) => {
    const legendPayload = unref(_legendPayload)
    if (isPanorama) {
      return
    }
    dispatch(addLegendPayload(legendPayload))
    onCleanup(() => {
      dispatch(removeLegendPayload(legendPayload))
    })
  })
  return null
}
