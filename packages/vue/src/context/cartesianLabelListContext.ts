import type { Ref } from 'vue'
import { createContext } from '@/utils/createContext'
import type { Data } from '@/components/label/types'

export const [useCartesianLabelListData, provideCartesianLabelListData] = createContext<Ref<ReadonlyArray<Data> | undefined>>('CartesianLabelListContext')
