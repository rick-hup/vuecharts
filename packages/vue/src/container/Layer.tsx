import type { SVGAttributes } from 'vue'
import { defineComponent } from 'vue'
import { filterProps } from '@/utils/VueUtils'

export const Layer = defineComponent<SVGAttributes>({
  name: 'VChartsLayer',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => {
      const props = filterProps(attrs, true)
      return (
        <g
          {...attrs}
          {...props}
          class="v-charts-layer"
        >
          {slots.default?.()}
        </g>
      )
    }
  },
})
