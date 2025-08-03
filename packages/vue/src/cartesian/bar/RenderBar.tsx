import type { PropType } from 'vue'
import { defineComponent, ref, watch } from 'vue'
import type { BarProps, BarRectangleItem } from './type'
import { BarBackground } from './components/BarBackground'
import { BarRectangles } from './components/BarRectangles'
import { Layer } from '@/container/Layer'
import { GraphicalItemClipPath } from '@/cartesian/GraphicalItemClipPath'
import { useBarContext } from './hooks/useBar'

export const RenderBar = defineComponent({
  name: 'RenderBar',
  inheritAttrs: false,
  setup() {
    const { props, attrs } = useBarContext()
    return () => {
      const layerClass = ['recharts-bar', attrs.class]
      return (
        <Layer class={layerClass}>
          1
        </Layer>
      )
    }
  },
})
