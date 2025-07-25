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

export function SetPolarLegendPayload({ legendPayload }: { legendPayload: ReadonlyArray<LegendPayload> }): null {
  // const dispatch = useAppDispatch()
  // const layout = useAppSelector(selectChartLayout)
  // useEffect(() => {
  //   if (layout !== 'centric' && layout !== 'radial') {
  //     return noop
  //   }
  //   dispatch(addLegendPayload(legendPayload))
  //   return () => {
  //     dispatch(removeLegendPayload(legendPayload))
  //   }
  // }, [dispatch, layout, legendPayload])
  return null
}
