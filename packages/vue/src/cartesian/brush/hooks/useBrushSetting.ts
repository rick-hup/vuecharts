import { watchEffect } from 'vue'
import type { BrushProps } from '../type'
import { useAppDispatch } from '@/state/hooks'
import { setBrushSettings } from '@/state/brushSlice'
import { setDataStartEndIndexes } from '@/state/chartDataSlice'

/**
 * setting brush settings
 * @param props
 */
export function useBrushSetting(props: BrushProps) {
  const dispatch = useAppDispatch()
  watchEffect((onCleanup) => {
    dispatch(setBrushSettings({
      x: props.x,
      y: props.y,
      width: props.width,
      height: props.height!,
      padding: props.padding!,
    }))
    onCleanup(() => {
      dispatch(setBrushSettings(null))
    })
  })

  // start and end index can be controlled from props, and we need them to stay up-to-date in the Redux state too
  watchEffect(() => {
    dispatch(setDataStartEndIndexes({
      startIndex: props.startIndex,
      endIndex: props.endIndex,
    }))
  })
}
