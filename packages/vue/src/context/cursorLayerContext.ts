import type { Ref } from 'vue'
import { createContext } from '@/utils/createContext'

export const [useCursorLayerRef, provideCursorLayerRef] = createContext<Ref<SVGGElement | null>>('CursorLayerContext')
