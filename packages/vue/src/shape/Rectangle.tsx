/**
 * @fileOverview Rectangle
 */
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import type { VuePropsToType, WithSVGProps } from '@/types'
import { filterProps } from '@/utils/VueUtils'
import type { RectRadius } from '@/types/bar'

const RectangleVueProps = {
  className: { type: String as PropType<string>, default: undefined },
  x: { type: Number as PropType<number>, default: 0 },
  y: { type: Number as PropType<number>, default: 0 },
  width: { type: Number as PropType<number>, default: 0 },
  height: { type: Number as PropType<number>, default: 0 },
  radius: { type: [Number, Array] as PropType<number | RectRadius>, default: undefined },
}

export type RectangleProps = VuePropsToType<typeof RectangleVueProps>
export type RectanglePropsWithSVG = WithSVGProps<typeof RectangleVueProps>

export const Rectangle = defineComponent<RectanglePropsWithSVG>({
  name: 'Rectangle',
  props: RectangleVueProps,
  setup(props, { attrs }) {
    return () => {
      const { x, y, width, height, radius } = props
      const filteredProps = filterProps(props, false)
      
      // Simple rectangle without rounded corners
      if (!radius) {
        return (
          <rect
            {...filteredProps}
            {...attrs}
            x={x}
            y={y}
            width={width}
            height={height}
          />
        )
      }
      
      // Rectangle with rounded corners
      // For simplicity, we'll implement basic rounded corners
      // In a full implementation, you'd handle all 4 corners separately
      let rx = 0
      let ry = 0
      
      if (typeof radius === 'number') {
        rx = radius
        ry = radius
      } else if (Array.isArray(radius)) {
        // Use the first value for simplicity
        rx = radius[0] || 0
        ry = radius[0] || 0
      }
      
      return (
        <rect
          {...filteredProps}
          {...attrs}
          x={x}
          y={y}
          width={width}
          height={height}
          rx={rx}
          ry={ry}
        />
      )
    }
  },
})