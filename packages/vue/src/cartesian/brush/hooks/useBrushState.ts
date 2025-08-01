import { onMounted, ref } from 'vue'
import { scalePoint } from 'victory-vendor/d3-scale'
import range from 'es-toolkit/compat/range'
import type { BrushProps, BrushState } from '../type'

export function useBrushState(props: BrushProps) {
  const brushState = ref<BrushState>({
    isTravellerMoving: false,
    isTravellerFocused: false,
    isSlideMoving: false,
    isTextActive: false,
    startX: undefined,
    endX: undefined,
    slideMoveStartX: undefined,
    movingTravellerId: undefined,
    brushMoveStartX: undefined,
    scale: undefined,
    scaleValues: undefined,
  })

  const createScale = () => {
    if (!props.data?.length)
      return {}

    const scale = scalePoint()
      .domain(range(0, props.data.length))
      .range([props.x, props.x + props.width - props.travellerWidth])

    const scaleValues = scale.domain().map(entry => scale(entry))

    return {
      isTextActive: false,
      isSlideMoving: false,
      isTravellerMoving: false,
      isTravellerFocused: false,
      startX: scale(props.startIndex),
      endX: scale(props.endIndex),
      scale,
      scaleValues,
    }
  }

  onMounted(() => {
    Object.assign(brushState.value, createScale())
  })

  return {
    brushState,
  }
}
