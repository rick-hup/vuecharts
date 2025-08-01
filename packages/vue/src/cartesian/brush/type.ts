import type { BrushStartEndIndex } from '@/state/chartDataSlice'
import type { DataKey, Padding, VuePropsToType, WithSVGProps } from '../../types/common'
import type { PropType } from 'vue'

export const BrushVueProps = {
  height: {
    type: Number,
    height: 40,
  },
  travellerWidth: {
    type: Number,
    default: 5,
  },
  gap: {
    type: Number,
    default: 1,
  },
  fill: {
    type: String,
    default: '#fff',
  },
  stroke: {
    type: String,
    default: '#666',
  },
  padding: {
    type: Object as PropType<Padding>,
    default: () => ({ top: 1, right: 1, bottom: 1, left: 1 }),
  },
  leaveTimeOut: {
    type: Number,
    default: 1000,
  },
  alwaysShowText: {
    type: Boolean,
    default: false,
  },
  x: {
    type: Number,
  },
  y: {
    type: Number,
  },
  dy: {
    type: Number,
  },
  width: {
    type: Number,
  },
  ariaLabel: {
    type: String,
  },
  class: {
    type: String,
  },
  dataKey: [String, Function] as PropType<DataKey<any>>,
  startIndex: {
    type: Number,
  },
  endIndex: {
    type: Number,
  },
  tickFormatter: {
    type: Function as PropType<(value: any, index: number) => string>,
  },
  onChange: {
    type: Function as PropType<(state: BrushStartEndIndex) => void>,
  },
  onDragEnd: {
    type: Function as PropType<(state: BrushStartEndIndex) => void>,
  },
}
export type BrushProps = VuePropsToType<typeof BrushVueProps>

export type BrushPropsWithSVG = WithSVGProps<typeof BrushVueProps>

export type BrushTravellerId = 'startX' | 'endX'

export interface BrushState {
  isTravellerMoving: boolean
  isTravellerFocused: boolean
  isSlideMoving: boolean
  startX?: number
  endX?: number
  slideMoveStartX?: number
  movingTravellerId?: BrushTravellerId
  isTextActive: boolean
  brushMoveStartX?: number
  scale?: any
  scaleValues?: number[]
}

export interface TravellerProps {
  x: number
  y: number
  width: number
  height: number
  stroke?: string
}
