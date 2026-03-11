import { createContext } from '@/utils/createContext'
import type { Ref } from 'vue'

// Create context for legend portal element — same as Recharts, portal target is the wrapper div
const [useLegendPortal, provideLegendPortalRaw] = createContext<Ref<HTMLElement | null>>('LegendPortalContext')

export { useLegendPortal, provideLegendPortalRaw }
