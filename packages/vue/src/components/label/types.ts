import type { DataKey, VuePropsToType } from '@/types'
import { last } from 'es-toolkit/compat'
import type { PropType, VNode } from 'vue'

export interface Data {
  value?: number | string | Array<number | string>
  payload?: any
  parentViewBox?: ViewBox
}
export interface ViewBox {
  x?: number
  y?: number
  width?: number
  height?: number
  clockWise?: boolean
}

export type LabelPosition =
  | 'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'inside'
  | 'outside'
  | 'insideLeft'
  | 'insideRight'
  | 'insideTop'
  | 'insideBottom'
  | 'insideTopLeft'
  | 'insideBottomLeft'
  | 'insideTopRight'
  | 'insideBottomRight'
  | 'insideStart'
  | 'insideEnd'
  | 'end'
  | 'center'
  | 'centerTop'
  | 'centerBottom'
  | 'middle'
  | {
    x?: number
    y?: number
  }

const defaultAccessor = (entry: Data) => (Array.isArray(entry.value) ? last(entry.value) : entry.value)
export const LabelListVueProps = {
  id: {
    type: String,
  },
  data: {
    type: Array as PropType<ReadonlyArray<Data>>,
  },
  valueAccessor: {
    type: Function as PropType<(entry: Data, index: number) => string | number>,
    default: defaultAccessor,
  },
  clockWise: {
    type: Boolean,
  },
  dataKey: {
    type: [String, Function] as PropType<DataKey<Record<string, any>>>,
  },
  textBreakAll: {
    type: Boolean,
  },
  position: {
    type: String as PropType<LabelPosition>,
  },
  offset: {
    type: Number,
  },
  angle: {
    type: Number,
  },
}

export const LabelVueProps = {
  id: {
    type: String,
  },
  class: {
    type: String,
    default: '',
  },
  viewBox: {
    type: Object as PropType<ViewBox>,
  },
  parentViewBox: {
    type: Object as PropType<ViewBox>,
  },
  value: {
    type: [Number, String],
  },
  offset: {
    type: Number,
    default: 5,
  },
  position: {
    type: [String, Object] as PropType<LabelPosition>,
  },
  textBreakAll: {
    type: Boolean,
  },
  angle: {
    type: Number,
  },
  index: {
    type: Number,
  },
}

export type LabelProps = VuePropsToType<typeof LabelVueProps>

export interface LabelSlots {
  content: (props: LabelProps) => VNode
}
