import { createContext } from '../utils/createContext'
import type { Ref } from 'vue'

export interface SizeContextValue {
  sizes: Ref<{ width: number, height: number }>
  calculatedWidth: Ref<number>
  calculatedHeight: Ref<number>
  // Future properties can be added here
}

const [useSizeContext, provideSizeContext] = createContext<SizeContextValue>('SizeContext')

export { provideSizeContext, useSizeContext }
