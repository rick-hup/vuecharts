/**
 * Emits tooltip sync events to other charts (Vue version).
 * No events if syncId is undefined.
 * Ignores syncMethod (handled on receiver).
 *
 * @param tooltipParams computed object containing tooltip parameters
 * @returns void
 */
import type { Ref } from 'vue'
import { type ComputedRef, computed, watchEffect } from 'vue'
import { useAppSelector } from '@/state/hooks'
import { selectTooltipDataKey } from '@/state/selectors/selectors'
import { setSyncInteraction } from '@/state/tooltipSlice'
import { selectSynchronisedTooltipState } from '@/synchronisation/syncSelectors'
import { selectEventEmitter, selectSyncId, selectSyncMethod } from '@/state/selectors/rootPropsSelectors'
import type { ChartCoordinate, TooltipEventType, TooltipIndex, TooltipTrigger } from '@/types'
import { TOOLTIP_SYNC_EVENT, eventCenter } from '@/utils/events'

export function useTooltipChartSynchronisation(
  {
    tooltipEventType,
    trigger,
    activeCoordinate,
    activeLabel,
    activeIndex,
    isTooltipActive,
  }: {
    tooltipEventType: Ref<TooltipEventType | undefined>
    trigger: TooltipTrigger
    activeCoordinate: Ref<ChartCoordinate | undefined>
    activeLabel: Ref<string | number | undefined>
    activeIndex: Ref<TooltipIndex | undefined>
    isTooltipActive: Ref<boolean>
  },
) {
  // selectors as computed for reactivity
  const activeDataKey = useAppSelector(state => selectTooltipDataKey(state, tooltipEventType.value!, trigger))
  const eventEmitterSymbol = useAppSelector(selectEventEmitter)
  const syncId = useAppSelector(selectSyncId)
  // const syncMethod = useAppSelector(selectSyncMethod)
  const tooltipState = useAppSelector(selectSynchronisedTooltipState)
  const isReceivingSynchronisation = computed(() => tooltipState.value?.active)

  watchEffect(() => {
    if (isReceivingSynchronisation.value)
    /*
       * This chart currently has active tooltip, synchronised from another chart.
       * Let's not send any outgoing synchronisation events while that's happening
       * to avoid infinite loops.
       */
      return
    if (syncId.value == null)
      return
    if (eventEmitterSymbol.value == null)
      return

    const syncAction = setSyncInteraction({
      active: isTooltipActive.value,
      coordinate: activeCoordinate.value,
      dataKey: activeDataKey.value,
      index: activeIndex.value!,
      label: typeof activeLabel.value === 'number' ? String(activeLabel.value) : activeLabel.value,
    })
    eventCenter.emit(TOOLTIP_SYNC_EVENT, syncId.value, syncAction, eventEmitterSymbol.value)
  })
}
