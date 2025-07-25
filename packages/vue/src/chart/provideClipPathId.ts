import { uniqueId } from '@/utils'
import type { ExtractPropTypes } from 'vue'
import type { CategoricalChartProps } from './generateCategoricalChart'
import { createContext } from '@/utils/createContext'

// Create context for clipPathId
const [useClipPathId, provideClipPathIdRaw] = createContext<string>(
  'clipPathId',
)

/**
 * Provide the clipPathId to child components.
 * @param props - The props object from the chart component
 */
export function provideClipPathId(props: ExtractPropTypes<typeof CategoricalChartProps>) {
  const clipPathId = `${props.id ?? uniqueId('vcharts')}-clip`
  provideClipPathIdRaw(clipPathId)
  return clipPathId
}

/**
 * Inject the clipPathId provided by an ancestor chart component.
 * @returns {string} The injected clipPathId
 */
export { useClipPathId }
