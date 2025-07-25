import { createContext } from '@/utils/createContext'
import { type PropType, type Ref, defineComponent, toRef } from 'vue'

// Create context for legend portal element
const [useLegendPortal, provideLegendPortalRaw] = createContext<Ref<HTMLElement | null | string>>('LegendPortalContext')

/**
 * Vue component to provide the legend portal element to child components.
 * @prop to - HTMLElement or null to be provided as portal target
 */
export const LegendPortalProvider = defineComponent({
  name: 'LegendPortalProvider',
  props: {
    to: {
      type: [Object, String] as PropType<HTMLElement | string>,
      default: 'body',
    },
  },
  setup(props, { slots }) {
    const to = toRef(props, 'to')
    provideLegendPortalRaw(to)
    return () => slots.default?.()
  },
})

/**
 * Inject the legend portal element provided by an ancestor component.
 * @returns {Ref<HTMLElement | null>} The injected portal ref
 */
export { useLegendPortal }
