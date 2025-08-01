import { uniqueId } from '@/utils'
import type { ExtractPropTypes } from 'vue'
import { createContext } from '@/utils/createContext'
import type { CategoricalChartProps } from '@/storybook/api/props/chart-props'

// Create context for clipPathId
const [useClipPathId, provideClipPathIdRaw] = createContext<string>(
  'clipPathId',
)

/**
 * Provide the clipPathId to child components.
 * @param props - The props object from the chart component
 */
export function provideClipPathId(props: ExtractPropTypes<typeof CategoricalChartProps>) {
  const clipPathId = `${props.id ?? uniqueId('v-charts')}-clip`
  provideClipPathIdRaw(clipPathId)
  return clipPathId
}

/**
 * Inject the clipPathId provided by an ancestor chart component.
 * @returns {string} The injected clipPathId
 */
export { useClipPathId }
