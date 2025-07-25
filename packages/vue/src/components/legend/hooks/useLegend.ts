import { computed, ref } from 'vue'
import type { CSSProperties } from 'vue'
import { useElementBounding } from '@vueuse/core'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { setLegendSettings, setLegendSize } from '@/state/legendSlice'
import { selectLegendPayload } from '@/state/selectors/legendSelectors'
import { useChartHeight, useChartWidth, useMargin } from '@/context/chartLayoutContext'
import { usePortal } from '@/chart/TooltipPortalContext'
import { getUniqPayload } from '@/utils/payload/getUniqPayload'
import { sortBy } from 'es-toolkit/compat'
import type { LegendPayload } from '@/components/DefaultLegendContent'
import type { LegendProps } from '../type'
import { defaultUniqBy, getDefaultPosition, getWidthOrHeight } from '../utils'

export function useLegend(props: LegendProps) {
  const dispatch = useAppDispatch()
  const contextPayload = useAppSelector(selectLegendPayload)
  const legendPortalFromContext = usePortal()
  const margin = useMargin()
  const chartWidth = useChartWidth()
  const chartHeight = useChartHeight()

  // Element ref for bounding box calculation
  const legendRef = ref<HTMLElement>()
  const { width: boundingWidth, height: boundingHeight } = useElementBounding(legendRef)

  // Calculate max width
  const maxWidth = computed(() =>
    chartWidth.value - (margin.value.left || 0) - (margin.value.right || 0),
  )

  // Calculate width or height based on layout
  const widthOrHeight = computed(() =>
    getWidthOrHeight(props.layout, props.height, props.width, maxWidth.value),
  )

  // Calculate bounding box
  const boundingBox = computed(() => ({
    width: boundingWidth.value,
    height: boundingHeight.value,
  }))

  // Process payload
  const processedPayload = computed(() => {
    if (!contextPayload.value || contextPayload.value.length === 0) {
      return [] as LegendPayload[]
    }

    // Get unique payload
    let finalPayload = getUniqPayload(contextPayload.value, props.payloadUniqBy!, defaultUniqBy)

    // Sort payload
    if (props.itemSorter) {
      if (typeof props.itemSorter === 'string') {
        finalPayload = sortBy(finalPayload, props.itemSorter)
      }
      else if (typeof props.itemSorter === 'function') {
        finalPayload = sortBy(finalPayload, props.itemSorter)
      }
    }
    return Array.from(finalPayload) as LegendPayload[]
  })

  // Calculate outer style
  const outerStyle = computed((): CSSProperties => {
    // If user supplies their own portal, only use their defined wrapper styles
    if (props.portal) {
      return props.wrapperStyle || {}
    }

    const baseStyle: CSSProperties = {
      position: 'absolute',
      width: widthOrHeight.value?.width ? `${widthOrHeight.value.width}px` : (props.width ? `${props.width}px` : 'auto'),
      height: widthOrHeight.value?.height ? `${widthOrHeight.value.height}px` : (props.height ? `${props.height}px` : 'auto'),
    }

    const positionStyle = getDefaultPosition(
      props.wrapperStyle,
      props,
      margin.value,
      chartWidth.value,
      chartHeight.value,
      boundingBox.value,
    )
    return Object.assign({}, baseStyle, positionStyle, props.wrapperStyle || {})
  })

  // Determine portal target
  const legendPortal = computed(() => props.portal ?? legendPortalFromContext?.value)

  // Sync settings to store
  const syncSettings = () => {
    dispatch(setLegendSettings({
      layout: props.layout!,
      align: props.align!,
      verticalAlign: props.verticalAlign!,
    }))
  }

  // Sync size to store
  const syncSize = () => {
    dispatch(setLegendSize({
      width: boundingBox.value.width,
      height: boundingBox.value.height,
    }))
  }

  return {
    legendRef,
    boundingBox,
    widthOrHeight,
    processedPayload,
    outerStyle,
    legendPortal,
    syncSettings,
    syncSize,
  }
}
