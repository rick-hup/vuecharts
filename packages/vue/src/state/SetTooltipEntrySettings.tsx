import { useAppDispatch } from '@/state/hooks'
import { type TooltipPayloadConfiguration, addTooltipEntrySettings, removeTooltipEntrySettings } from './tooltipSlice'
import { useIsPanorama } from '@/context/PanoramaContextProvider'
import type { Ref } from 'vue'
import { watchEffect } from 'vue'

type SetTooltipEntrySettingsProps<T> = {
  args: Ref<T>
  fn: (input: T) => TooltipPayloadConfiguration
}

export function SetTooltipEntrySettings<T>({ fn, args }: SetTooltipEntrySettingsProps<T>) {
  const dispatch = useAppDispatch()
  const isPanorama = useIsPanorama()
  watchEffect((onCleanup) => {
    if (isPanorama) {
      return
    }
    const tooltipEntrySettings: TooltipPayloadConfiguration = fn(args.value)
    dispatch(addTooltipEntrySettings(tooltipEntrySettings))
    onCleanup(() => {
      dispatch(removeTooltipEntrySettings(tooltipEntrySettings))
    })
  })
}
