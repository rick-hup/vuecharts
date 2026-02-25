/**
 * @fileOverview Sector - SVG arc path shape for pie/donut chart segments
 */
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import type { VuePropsToType, WithSVGProps } from '@/types'
import { mathSign } from '@/utils/data'
import { polarToCartesian } from '@/utils/polar'

const SectorVueProps = {
  cx: { type: Number as PropType<number>, default: 0 },
  cy: { type: Number as PropType<number>, default: 0 },
  innerRadius: { type: Number as PropType<number>, default: 0 },
  outerRadius: { type: Number as PropType<number>, default: 0 },
  startAngle: { type: Number as PropType<number>, default: 0 },
  endAngle: { type: Number as PropType<number>, default: 0 },
  className: { type: String as PropType<string>, default: undefined },
}

export type SectorProps = VuePropsToType<typeof SectorVueProps>
export type SectorPropsWithSVG = WithSVGProps<typeof SectorVueProps>

function getSectorPath(
  cx: number,
  cy: number,
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number,
): string {
  const sign = mathSign(endAngle - startAngle)
  const deltaAngle = Math.min(Math.abs(endAngle - startAngle), 359.999)
  const tempEndAngle = startAngle + sign * deltaAngle

  const outerStart = polarToCartesian(cx, cy, outerRadius, startAngle)
  const outerEnd = polarToCartesian(cx, cy, outerRadius, tempEndAngle)
  const largeArcFlag = +(Math.abs(deltaAngle) > 180)
  const sweepOuter = +(startAngle > tempEndAngle)

  let path = `M ${outerStart.x},${outerStart.y}`
    + ` A ${outerRadius},${outerRadius},0,${largeArcFlag},${sweepOuter},${outerEnd.x},${outerEnd.y}`

  if (innerRadius > 0) {
    const innerStart = polarToCartesian(cx, cy, innerRadius, startAngle)
    const innerEnd = polarToCartesian(cx, cy, innerRadius, tempEndAngle)
    const sweepInner = +(startAngle <= tempEndAngle)
    path += ` L ${innerEnd.x},${innerEnd.y}`
      + ` A ${innerRadius},${innerRadius},0,${largeArcFlag},${sweepInner},${innerStart.x},${innerStart.y} Z`
  }
  else {
    path += ` L ${cx},${cy} Z`
  }

  return path
}

export const Sector = defineComponent<SectorPropsWithSVG>({
  name: 'Sector',
  props: SectorVueProps,
  setup(props, { attrs }) {
    return () => {
      const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, className } = props
      if (outerRadius <= 0 || startAngle === endAngle) {
        return null
      }
      return (
        <path
          {...attrs}
          class={['v-charts-sector', className]}
          d={getSectorPath(cx, cy, innerRadius, outerRadius, startAngle, endAngle)}
        />
      )
    }
  },
})
