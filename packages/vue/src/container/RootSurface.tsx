import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { useAppSelector } from '../state/hooks'
import { selectBrushDimensions } from '../state/selectors/brushSelectors'
import { useChartHeight, useChartWidth } from '@/context/chartLayoutContext'
import { useAccessibilityLayer } from '@/context/accessibilityContext'
import Surface from '@/container/Surface'
import { validateWidthHeight } from '@/utils'

const FULL_WIDTH_AND_HEIGHT = { width: '100%', height: '100%' }

const MainChartSurface = defineComponent({
  name: 'MainChartSurface',
  props: {
    title: String,
    desc: String,
    otherAttributes: {
      type: Object as PropType<Record<string, unknown>>,
      default: () => ({}),
    },
  },
  setup(props, { slots }) {
    const width = useChartWidth()
    const height = useChartHeight()
    const hasAccessibilityLayer = useAccessibilityLayer()

    return () => {
      if (!validateWidthHeight({ width: width.value, height: height.value })) {
        return null
      }
      const { otherAttributes, title, desc } = props

      let tabindex: number | undefined, role: string | undefined

      if (typeof otherAttributes.tabindex === 'number') {
        tabindex = otherAttributes.tabindex
      }
      else {
        tabindex = hasAccessibilityLayer ? 0 : undefined
      }

      if (typeof otherAttributes.role === 'string') {
        role = otherAttributes.role
      }
      else {
        role = hasAccessibilityLayer ? 'application' : undefined
      }

      return (
        <Surface
          {...otherAttributes}
          title={title}
          desc={desc}
          role={role!}
          tabindex={tabindex}
          width={width.value}
          height={height.value}
          style={FULL_WIDTH_AND_HEIGHT}
        >
          {slots.default?.()}
        </Surface>
      )
    }
  },
})

const BrushPanoramaSurface = defineComponent({
  name: 'BrushPanoramaSurface',
  setup(_, { slots }) {
    const brushDimensions = useAppSelector(selectBrushDimensions)
    return () => {
      if (!brushDimensions.value) {
        return null
      }
      const { width, height, y, x } = brushDimensions.value
      return (
        <Surface width={width} height={height} x={x} y={y}>
          {slots.default?.()}
        </Surface>
      )
    }
  },
})

export const RootSurface = defineComponent({
  name: 'RootSurface',
  props: {
    title: String,
    desc: String,
    otherAttributes: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { slots, attrs }) {
    // const isPanorama = useIsPanorama()
    const isPanorama = false

    return () => {
      if (isPanorama) {
        return <BrushPanoramaSurface>{slots.default?.()}</BrushPanoramaSurface>
      }
      return (
        <MainChartSurface {...props} {...attrs}>
          {slots.default?.()}
        </MainChartSurface>
      )
    }
  },
})
