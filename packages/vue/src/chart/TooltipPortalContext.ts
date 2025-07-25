// TooltipPortalContext.ts
// Vue context utility for tooltip portal element
import { createContext } from '@/utils/createContext'
import type { Ref } from 'vue'

// Create context for tooltip portal element
export const [usePortal, providePortalRaw] = createContext<Ref<HTMLElement | null>>('PortalContext')
