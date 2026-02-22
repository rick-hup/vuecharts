import type { Ref } from 'vue'
import { createContext } from '@/utils/createContext'

export const [useLabelLayerRef, provideLabelLayerRef] = createContext<Ref<SVGGElement | null>>('LabelLayerContext')
