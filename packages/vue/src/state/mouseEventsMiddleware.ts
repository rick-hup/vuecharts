import { createAction, createListenerMiddleware } from '@reduxjs/toolkit'
import type { ChartPointer } from '@/types'
import type { RechartsRootState } from './store'
import { mouseLeaveChart, setMouseClickAxisIndex, setMouseOverAxisIndex } from './tooltipSlice'
import { selectActivePropsFromChartPointer } from './selectors/selectActivePropsFromChartPointer'
import { selectTooltipEventType } from './selectors/selectTooltipEventType'

export const mouseClickAction = createAction<ChartPointer>('mouseClick')

export const mouseClickMiddleware = createListenerMiddleware()

mouseClickMiddleware.startListening({
  actionCreator: mouseClickAction,
  effect: (action, listenerApi) => {
    const chartPointer = action.payload
    const state = listenerApi.getState() as RechartsRootState
    const tooltipEventType = selectTooltipEventType(state, state.tooltip.settings.shared)
    // Only handle axis-type tooltip interactions here;
    // item-level click events are handled by graphical items directly
    if (tooltipEventType === 'axis') {
      const activeProps = selectActivePropsFromChartPointer(state, chartPointer)
      if (activeProps?.activeIndex != null) {
        listenerApi.dispatch(
          setMouseClickAxisIndex({
            activeIndex: activeProps.activeIndex,
            activeDataKey: undefined,
            activeCoordinate: activeProps.activeCoordinate,
          }),
        )
      }
    }
  },
})

export const mouseMoveAction = createAction<ChartPointer>('mouseMove')

export const mouseMoveMiddleware = createListenerMiddleware()

mouseMoveMiddleware.startListening({
  actionCreator: mouseMoveAction,
  effect: (action, listenerApi) => {
    const chartPointer = action.payload
    const state = listenerApi.getState() as RechartsRootState
    const tooltipEventType = selectTooltipEventType(state, state.tooltip.settings.shared)
    const activeProps = selectActivePropsFromChartPointer(state, chartPointer)
    // this functionality only applies to charts that have axes
    if (tooltipEventType === 'axis') {
      if (activeProps?.activeIndex != null) {
        listenerApi.dispatch(
          setMouseOverAxisIndex({
            activeIndex: activeProps.activeIndex,
            activeDataKey: undefined,
            activeCoordinate: activeProps.activeCoordinate,
          }),
        )
      }
      else {
        // this is needed to clear tooltip state when the mouse moves out of the inRange (svg - offset) function, but not yet out of the svg
        listenerApi.dispatch(mouseLeaveChart())
      }
    }
  },
})
