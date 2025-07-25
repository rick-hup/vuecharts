/**
 * @fileOverview Dot
 */
import { defineComponent } from 'vue'
import type { WithSVGProps } from '@/types'

const DotVueProps = {
  cx: { type: [Number, String] },
  cy: { type: [Number, String] },
  r: { type: [Number, String] },
  clipDot: { type: Boolean },
}

export type DotProps = WithSVGProps<typeof DotVueProps>

export const Dot = defineComponent<DotProps>({
  name: 'Dot',
  props: DotVueProps,
  setup(props) {
    return () => {
      const { cx, cy, r } = props

      if (cx === +cx! && cy === +cy! && r === +r!) {
        return (
          <circle
            class={['v-charts-dot', props.class]}
            cx={cx}
            cy={cy}
            r={r}
          />
        )
      }

      return null
    }
  },
})
