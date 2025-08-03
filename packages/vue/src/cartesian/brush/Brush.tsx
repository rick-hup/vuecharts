import type { CSSProperties, SVGAttributes, SlotsType } from 'vue'
import { computed, defineComponent, nextTick, reactive } from 'vue'
import type { BrushProps, BrushPropsWithSVG } from './type'
import { BrushVueProps } from './type'
import { Layer } from '../../container/Layer'
import { useBrushState } from './hooks/useBrushState'
import { useBrushSetting } from '@/cartesian/brush/hooks/useBrushSetting'
import { useBrushChartSynchronisation } from '@/synchronisation/useChartSynchronisation'

export const Brush = defineComponent<BrushPropsWithSVG>({
  name: 'Brush',
  props: BrushVueProps,
  inheritAttrs: false,
  setup(props: BrushProps, { attrs, slots }) {
    // setting brush settings
    useBrushSetting(props)
    useBrushChartSynchronisation()

    const { brushState } = useBrushState(props)

    const state = reactive({
      isTravellerMoving: false,
    isSlideMoving: false,
    })
    let leaveTimer: number | null = null
    const handleDragEnd = async () => {
      state.isTravellerMoving = false
      state.isSlideMoving = false
      await nextTick()
      props.onDragEnd?.({
        endIndex: props.endIndex!,
        startIndex: props.startIndex!,
      })
    }
    const handleDrag = (e: Touch | MouseEvent) => {
      if (leaveTimer) {
        clearTimeout(leaveTimer)
        leaveTimer = null
      }

      if (state.isTravellerMoving) {
        // handleTravellerMove(e)
      }
      else if (state.isSlideMoving) {
        // handleSlideDrag(e)
      }
    }
    const handleLeaveWrapper = () => {
      if (state.isTravellerMoving || state.isSlideMoving) {
        leaveTimer = window.setTimeout(handleDragEnd, props.leaveTimeOut)
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
    if (e.changedTouches != null && e.changedTouches.length > 0) {
        handleDrag(e.changedTouches[0])
      }
    }

    return () => {
    return (
      <Layer
          class={['v-charts-brush', props.class]}
          style={{ userSelect: 'none', ...attrs.style as CSSProperties }}
          onMouseleave={handleLeaveWrapper}
          onTouchmove={handleTouchMove}
        >
          1
      </Layer>
      )
    }
  },
})
