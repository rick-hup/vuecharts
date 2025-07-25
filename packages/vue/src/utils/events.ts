import EventEmitter from 'eventemitter3'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { TooltipSyncState } from '../state/tooltipSlice'
import type { BrushStartEndIndex } from '@/state/chartDataSlice'

const eventCenter: EventEmitter<EventTypes> = new EventEmitter()

export { eventCenter }

export const TOOLTIP_SYNC_EVENT = 'recharts.syncEvent.tooltip'

export const BRUSH_SYNC_EVENT = 'recharts.syncEvent.brush'

interface EventTypes {
  [TOOLTIP_SYNC_EVENT]: (syncId: number | string, data: PayloadAction<TooltipSyncState>, emitter: symbol) => void
  [BRUSH_SYNC_EVENT]: (syncId: number | string, data: BrushStartEndIndex, emitter: symbol) => void
}
