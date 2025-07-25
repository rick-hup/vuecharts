import { createAction, createListenerMiddleware } from '@reduxjs/toolkit'
// import type { SyntheticEvent } from 'react'
import {
  selectActiveLabel,
  selectActiveTooltipCoordinate,
  selectActiveTooltipDataKey,
  selectActiveTooltipIndex,
  selectIsTooltipActive,
} from './selectors/tooltipSelectors'
import type { RechartsRootState } from './store'
import type { CategoricalChartFunc, MouseHandlerDataParam } from '@/types'

type ExternalEventActionPayload = {
  event: MouseEvent | PointerEvent | TouchEvent
  handler: null | CategoricalChartFunc
}

export const externalEventAction = createAction<ExternalEventActionPayload>('externalEvent')

export const externalEventsMiddleware = createListenerMiddleware()

externalEventsMiddleware.startListening({
  actionCreator: externalEventAction,
  effect: (
    action,
    listenerApi,
  ) => {
    if (action.payload.handler == null) {
      return
    }

    const state: RechartsRootState = listenerApi.getState() as RechartsRootState
    const nextState: MouseHandlerDataParam = {
      activeCoordinate: selectActiveTooltipCoordinate(state),
      activeDataKey: selectActiveTooltipDataKey(state),
      activeIndex: selectActiveTooltipIndex(state),
      activeLabel: selectActiveLabel(state),
      activeTooltipIndex: selectActiveTooltipIndex(state),
      isTooltipActive: selectIsTooltipActive(state),
    }

    action.payload.handler(nextState, action.payload.event)
  },
})
