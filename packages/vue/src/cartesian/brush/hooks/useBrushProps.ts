import { computed } from 'vue'
import { setBrushSettings } from '../../../state/brushSlice'
import type { BrushProps } from '../type'
import { useAppDispatch } from '@/state/hooks'

export function useBrushProps(props: BrushProps) {
  const dispatch = useAppDispatch()
  // 设置 brush settings
  dispatch(setBrushSettings({
    height: props.height,
    x: props.x,
    y: props.y,
    width: props.width,
    padding: props.padding!,
  }))

  return computed(() => ({
    ...props,
    calculatedY: props.y! + (props.dy ?? 0),
  }))
}
