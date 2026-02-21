import type { Ref, ShallowRef } from 'vue'
import { createContext } from 'motion-v'
import type { BarRectangleItem, ErrorBarDirection } from '@/types/bar'
import type { DataKey } from '@/types'

export interface ErrorBarDataItem {
  x: number | undefined
  y: number | undefined
  value: number
  errorVal?: number[] | number
}

export type ErrorBarDataPointFormatter<T> = (
  entry: T,
  dataKey: DataKey<any>,
  direction: ErrorBarDirection,
) => ErrorBarDataItem

export interface ErrorBarContextType {
  data: Readonly<ShallowRef<readonly BarRectangleItem[]>>
  xAxisId: string
  yAxisId: string
  dataPointFormatter: ErrorBarDataPointFormatter<BarRectangleItem>
  errorBarOffset: Ref<number>
}

export const [useErrorBarContext, provideErrorBarContext] = createContext<ErrorBarContextType>('ErrorBarContext')
