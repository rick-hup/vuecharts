import type { SlotsType } from 'vue'
import { computed, defineComponent } from 'vue'
import type { LabelSlots } from './types'
import { LabelVueProps } from './types'
import { useViewBox } from '@/context/chartLayoutContext'
import { usePolarLabelViewBox } from '@/context/polarLabelViewBoxContext'
import { isNullish } from '@/utils'
import { getAttrsOfCartesianLabel, getAttrsOfPolarLabel, isPolar } from '@/components/label/utils'
import Text from '@/components/Text.vue'

export const Label = defineComponent({
  name: 'Label',
  props: LabelVueProps,
  slots: Object as SlotsType<LabelSlots>,
  setup(props, { slots, attrs }) {
    const viewBoxFromContext = useViewBox()
    const polarLabelViewBox = usePolarLabelViewBox()

    return () => {
      const { viewBox: viewBoxFromProps, value, position, textBreakAll } = props
      const viewBox = viewBoxFromProps || polarLabelViewBox.value || viewBoxFromContext.value
      if (
        !viewBox
        || (isNullish(value) && !slots.content)
      ) {
        return null
      }
      const isPolarLabel = isPolar(viewBox)

      // If content slot is provided, pass viewBox to it for custom rendering
      if (slots.content) {
        return slots.content({ ...props, viewBox })
      }

      // TODO: render radial label
      if (isPolarLabel && (position === 'insideStart' || position === 'insideEnd' || position === 'end')) {
        // return renderRadialLabel(props, label, attrs)
      }

      const positionAttrs = isPolarLabel ? getAttrsOfPolarLabel(props) : getAttrsOfCartesianLabel(props, viewBox)

      return (
        <Text
          class={['v-charts-label', props.class]}
          {...attrs}
          {...positionAttrs}
          angle={props.angle}
          breakAll={textBreakAll}
          value={value}
        />
      )
    }
  },
})
