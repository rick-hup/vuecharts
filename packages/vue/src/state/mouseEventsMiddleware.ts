import { createAction, createListenerMiddleware } from '@reduxjs/toolkit'
import type { RechartsRootState } from './store'
import { mouseLeaveChart, setMouseClickAxisIndex, setMouseOverAxisIndex } from './tooltipSlice'
import { selectActivePropsFromChartPointer } from './selectors/selectActivePropsFromChartPointer'
import { selectTooltipEventType } from './selectors/selectTooltipEventType'
import { getChartPointer } from '@/utils/chart'

export const mouseClickAction = createAction<MouseEvent | PointerEvent>('mouseClick')

export const mouseClickMiddleware = createListenerMiddleware()

// TODO: there's a bug here when you click the chart the activeIndex resets to zero
mouseClickMiddleware.startListening({
  actionCreator: mouseClickAction,
  effect: (action, listenerApi) => {
    const mousePointer = action.payload
    const activeProps = selectActivePropsFromChartPointer(listenerApi.getState() as RechartsRootState, getChartPointer(mousePointer)!)
    if (activeProps?.activeIndex != null) {
      listenerApi.dispatch(
        setMouseClickAxisIndex({
          activeIndex: activeProps.activeIndex,
          activeDataKey: undefined,
          activeCoordinate: activeProps.activeCoordinate,
        }),
      )
    }
  },
})

export const mouseMoveAction = createAction<MouseEvent | PointerEvent>('mouseMove')

export const mouseMoveMiddleware = createListenerMiddleware()

mouseMoveMiddleware.startListening({
  actionCreator: mouseMoveAction,
  effect: (action, listenerApi) => {
    const mousePointer = action.payload
    const state = listenerApi.getState() as RechartsRootState
    const tooltipEventType = selectTooltipEventType(state, state.tooltip.settings.shared)
    const activeProps = selectActivePropsFromChartPointer(state, getChartPointer(mousePointer)!)
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
