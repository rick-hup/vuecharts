import { createAction, createListenerMiddleware } from '@reduxjs/toolkit'
import { setKeyboardInteraction } from './tooltipSlice'
import type { RechartsRootState } from './store'
import { selectTooltipAxisTicks, selectTooltipDisplayedData } from './selectors/tooltipSelectors'
import { selectCoordinateForDefaultIndex } from './selectors/selectors'
import { selectChartDirection } from './selectors/axisSelectors'
import { combineActiveTooltipIndex } from './selectors/combiners/combineActiveTooltipIndex'

export const keyDownAction = createAction<KeyboardEvent['key']>('keyDown')
export const focusAction = createAction('focus')

export const keyboardEventsMiddleware = createListenerMiddleware()
keyboardEventsMiddleware.startListening({
  actionCreator: keyDownAction,
  effect: (
    action,
    listenerApi,
  ) => {
    const state = listenerApi.getState() as RechartsRootState
    const accessibilityLayerIsActive = state.rootProps.accessibilityLayer !== false
    if (!accessibilityLayerIsActive) {
      return
    }
    const { keyboardInteraction } = state.tooltip
    const key = action.payload
    if (key !== 'ArrowRight' && key !== 'ArrowLeft' && key !== 'Enter') {
      return
    }

    // TODO this is lacking index for charts that do not support numeric indexes
    const currentIndex: number = Number(
      combineActiveTooltipIndex(keyboardInteraction, selectTooltipDisplayedData(state)),
    )
    const tooltipTicks = selectTooltipAxisTicks(state)
    if (key === 'Enter') {
      const coordinate = selectCoordinateForDefaultIndex(state, 'axis', 'hover', String(keyboardInteraction.index))
      listenerApi.dispatch(
        setKeyboardInteraction({
          active: !keyboardInteraction.active,
          activeIndex: keyboardInteraction.index,
          activeDataKey: keyboardInteraction.dataKey,
          activeCoordinate: coordinate,
        }),
      )
      return
    }

    const direction = selectChartDirection(state)
    const directionMultiplier = direction === 'left-to-right' ? 1 : -1
    const movement = key === 'ArrowRight' ? 1 : -1
    const nextIndex = currentIndex + movement * directionMultiplier
    if (nextIndex >= tooltipTicks.length || nextIndex < 0) {
      return
    }
    const coordinate = selectCoordinateForDefaultIndex(state, 'axis', 'hover', String(nextIndex))

    listenerApi.dispatch(
      setKeyboardInteraction({
        active: true,
        activeIndex: nextIndex.toString(),
        activeDataKey: undefined,
        activeCoordinate: coordinate,
      }),
    )
  },
})
keyboardEventsMiddleware.startListening({
  actionCreator: focusAction,
  effect: (_, listenerApi) => {
    const state = listenerApi.getState() as RechartsRootState
    const accessibilityLayerIsActive = state.rootProps.accessibilityLayer !== false
    if (!accessibilityLayerIsActive) {
      return
    }
    const { keyboardInteraction } = state.tooltip
    if (keyboardInteraction.active) {
      return
    }
    if (keyboardInteraction.index == null) {
      const nextIndex = '0'
      const coordinate = selectCoordinateForDefaultIndex(state, 'axis', 'hover', String(nextIndex))
      listenerApi.dispatch(
        setKeyboardInteraction({
          activeDataKey: undefined,
          active: true,
          activeIndex: nextIndex,
          activeCoordinate: coordinate,
        }),
      )
    }
  },
})
