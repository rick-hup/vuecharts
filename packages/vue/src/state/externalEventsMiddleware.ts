import { createAction } from '@reduxjs/toolkit'
import type { Middleware } from '@reduxjs/toolkit'
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

/**
 * Calls external event handlers (onMouseMove, onClick, etc.) synchronously within the dispatch
 * call stack, while the native event's `currentTarget` is still valid.
 *
 * Using createListenerMiddleware would defer the call to a microtask, at which point the browser
 * has already cleared `e.currentTarget` per the DOM spec, breaking coordinate-based handlers like
 * DraggablePie that rely on `getRelativeCoordinate(e)`.
 */
export const externalEventsMiddleware: Middleware = api => next => (action) => {
  const result = next(action)
  if (externalEventAction.match(action) && action.payload.handler != null) {
    const state = api.getState() as RechartsRootState
    const nextState: MouseHandlerDataParam = {
      activeCoordinate: selectActiveTooltipCoordinate(state),
      activeDataKey: selectActiveTooltipDataKey(state),
      activeIndex: selectActiveTooltipIndex(state),
      activeLabel: selectActiveLabel(state),
      activeTooltipIndex: selectActiveTooltipIndex(state),
      isTooltipActive: selectIsTooltipActive(state),
    }
    action.payload.handler(nextState, action.payload.event)
  }
  return result
}
