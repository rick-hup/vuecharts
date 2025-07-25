import { createAction, createListenerMiddleware } from '@reduxjs/toolkit'
import type { RechartsRootState } from './store'
import { setActiveMouseOverItemIndex, setMouseOverAxisIndex } from './tooltipSlice'
import { selectActivePropsFromChartPointer } from './selectors/selectActivePropsFromChartPointer'

import { selectTooltipEventType } from './selectors/selectTooltipEventType'
import { selectTooltipCoordinate } from './selectors/touchSelectors'
import { getChartPointer } from '@/utils/chart'
import { DATA_ITEM_DATAKEY_ATTRIBUTE_NAME, DATA_ITEM_INDEX_ATTRIBUTE_NAME } from '@/utils/const'

export const touchEventAction = createAction<TouchEvent>('touchMove')

export const touchEventMiddleware = createListenerMiddleware()

touchEventMiddleware.startListening({
  actionCreator: touchEventAction,
  effect: (
    action,
    listenerApi,
  ) => {
    const touchEvent = action.payload
    const state = listenerApi.getState() as RechartsRootState
    const tooltipEventType = selectTooltipEventType(state, state.tooltip.settings.shared)
    if (tooltipEventType === 'axis') {
      const activeProps = selectActivePropsFromChartPointer(
        state,
        getChartPointer({
          clientX: touchEvent.touches[0].clientX!,
          clientY: touchEvent.touches[0].clientY!,
          currentTarget: touchEvent.target as HTMLElement,
        } as unknown as PointerEvent)!,
      )
      if (activeProps?.activeIndex != null) {
        listenerApi.dispatch(
          setMouseOverAxisIndex({
            activeIndex: activeProps.activeIndex,
            activeDataKey: undefined,
            activeCoordinate: activeProps.activeCoordinate,
          }),
        )
      }
    }
    else if (tooltipEventType === 'item') {
      const touch = touchEvent.touches[0]
      const target = document.elementFromPoint(touch.clientX, touch.clientY)
      if (!target || !target.getAttribute) {
        return
      }
      const itemIndex = target.getAttribute(DATA_ITEM_INDEX_ATTRIBUTE_NAME)
      const dataKey = target.getAttribute(DATA_ITEM_DATAKEY_ATTRIBUTE_NAME)
      const coordinate = selectTooltipCoordinate(listenerApi.getState() as RechartsRootState, itemIndex, dataKey!)

      listenerApi.dispatch(
        setActiveMouseOverItemIndex({
          activeDataKey: dataKey!,
          activeIndex: itemIndex,
          activeCoordinate: coordinate,
        }),
      )
    }
  },
})
