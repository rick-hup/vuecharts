import { useIsPanorama } from '@/context/PanoramaContextProvider'
import { useAppSelector } from '@/state/hooks'
import { selectBrushDimensions, selectBrushSettings } from '@/state/selectors/brushSelectors'
import { selectChartLayout } from '@/state/selectors/common'
import { selectChartHeight, selectChartWidth } from '@/state/selectors/containerSelectors'
import { selectChartOffset, selectChartViewBox } from '@/state/selectors/selectChartOffset'
import { selectChartOffsetInternal } from '@/state/selectors/selectChartOffsetInternal'
import type { Margin } from '@/types'
import { computed } from 'vue'

export function useOffset() {
  return useAppSelector(selectChartOffset)
}

export const useChartLayout = () => useAppSelector(selectChartLayout)

export function useViewBox() {
  const panorama = useIsPanorama()
  const rootViewBox = useAppSelector(selectChartViewBox)
  const brushDimensions = useAppSelector(selectBrushDimensions)
  const brushPadding = useAppSelector(selectBrushSettings)
  return computed(() => {
    if (!panorama || !brushDimensions.value || !brushPadding.value) {
      return rootViewBox.value
    }
    const padding = brushPadding.value.padding
    return {
      width: brushDimensions.value.width - padding.left! - padding.right!,
      height: brushDimensions.value.height - padding.top! - padding.bottom!,
      x: padding.left!,
      y: padding.top!,
    }
  })
}

export function useChartWidth() {
  return useAppSelector(selectChartWidth)
}

export function useChartHeight() {
  return useAppSelector(selectChartHeight)
}

export function useOffsetInternal() {
  return useAppSelector(selectChartOffsetInternal)
}

const manyComponentsThrowErrorsIfMarginIsUndefined: Margin = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
}
export function useMargin() {
  return useAppSelector(state => state.layout.margin ?? manyComponentsThrowErrorsIfMarginIsUndefined)
}
