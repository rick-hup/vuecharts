import type { Ref } from 'vue'
import { createContext } from '@/utils/createContext'

export const [useGraphicalLayerRef, provideGraphicalLayerRef] = createContext<Ref<SVGGElement | null>>('GraphicalLayerContext')
