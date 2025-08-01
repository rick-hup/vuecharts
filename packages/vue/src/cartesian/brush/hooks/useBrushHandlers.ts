// import { ref } from 'vue'
// import { getIndex } from '../utils'
// import type { BrushProps, BrushTravellerId } from '../type'

// export function useBrushHandlers(props: BrushProps) {
//   const leaveTimer = ref<number>()
//   const state = ref({
//     isTravellerMoving: false,
//     isSlideMoving: false,
//     startX: undefined as number | undefined,
//     endX: undefined as number | undefined,
//     slideMoveStartX: undefined as number | undefined,
//     brushMoveStartX: undefined as number | undefined,
//     movingTravellerId: undefined as BrushTravellerId | undefined,
//     isTextActive: false,
//   })

//   const handleDrag = (e: MouseEvent | Touch) => {
//     if (leaveTimer.value) {
//       clearTimeout(leaveTimer.value)
//       leaveTimer.value = undefined
//     }

//     if (state.value.isTravellerMoving) {
//       handleTravellerMove(e)
//     }
//     else if (state.value.isSlideMoving) {
//       handleSlideDrag(e)
//     }
//   }

//   const handleTouchMove = (e: TouchEvent) => {
//     if (e.changedTouches?.length > 0) {
//       handleDrag(e.changedTouches[0])
//     }
//   }

//   const handleLeaveWrapper = () => {
//     if (state.value.isTravellerMoving || state.value.isSlideMoving) {
//       leaveTimer.value = window.setTimeout(handleDragEnd, props.leaveTimeOut)
//     }
//   }

//   const handleDragEnd = () => {
//     state.value.isTravellerMoving = false
//     state.value.isSlideMoving = false

//     const newIndex = getIndex({
//       startX: state.value.startX!,
//       endX: state.value.endX!,
//       data: props.data!,
//       gap: props.gap!,
//       scaleValues: state.value.scaleValues!,
//     })

//     props.onDragEnd?.(newIndex)
//   }

//   const handleEnterSlideOrTraveller = () => {
//     state.value.isTextActive = true
//   }

//   const handleLeaveSlideOrTraveller = () => {
//     state.value.isTextActive = false
//   }

//   const handleSlideDragStart = (e: MouseEvent | TouchEvent) => {
//     const event = e instanceof TouchEvent ? e.changedTouches[0] : e

//     state.value.isTravellerMoving = false
//     state.value.isSlideMoving = true
//     state.value.slideMoveStartX = event.pageX
//   }

//   const handleSlideDrag = (e: MouseEvent | Touch) => {
//     const { slideMoveStartX, startX, endX } = state.value
//     const { x, width, travellerWidth } = props
//     let delta = e.pageX - slideMoveStartX!

//     if (delta > 0) {
//       delta = Math.min(delta, x! + width! - travellerWidth! - endX!, x! + width! - travellerWidth! - startX!)
//     }
//     else if (delta < 0) {
//       delta = Math.max(delta, x! - startX!, x! - endX!)
//     }

//     const newIndex = getIndex({
//       startX: startX! + delta,
//       endX: endX! + delta,
//       data: props.data!,
//       gap: props.gap!,
//       scaleValues: state.value.scaleValues!,
//     })

//     if ((newIndex.startIndex !== props.startIndex || newIndex.endIndex !== props.endIndex) && props.onChange) {
//       props.onChange(newIndex)
//     }

//     state.value.startX = startX! + delta
//     state.value.endX = endX! + delta
//     state.value.slideMoveStartX = e.pageX
//   }

//   const handleTravellerDragStart = (id: BrushTravellerId, e: MouseEvent | TouchEvent) => {
//     const event = e instanceof TouchEvent ? e.changedTouches[0] : e

//     state.value.isSlideMoving = false
//     state.value.isTravellerMoving = true
//     state.value.movingTravellerId = id
//     state.value.brushMoveStartX = event.pageX
//   }

//   const handleTravellerMove = (e: MouseEvent | Touch) => {
//     const { brushMoveStartX, movingTravellerId, endX, startX } = state.value
//     const prevValue = state.value[movingTravellerId!]

//     const { x, width, travellerWidth } = props
//     let delta = e.pageX - brushMoveStartX!

//     if (delta > 0) {
//       delta = Math.min(delta, x! + width! - travellerWidth! - prevValue!)
//     }
//     else if (delta < 0) {
//       delta = Math.max(delta, x! - prevValue!)
//     }

//     const params = {
//       startX: state.value.startX!,
//       endX: state.value.endX!,
//       data: props.data!,
//       gap: props.gap!,
//       scaleValues: state.value.scaleValues!,
//     }

//     params[movingTravellerId!] = prevValue! + delta

//     const newIndex = getIndex(params)
//     const { startIndex, endIndex } = newIndex
//     const isFullGap = () => {
//       const lastIndex = props.data!.length - 1
//       if (
//         (movingTravellerId === 'startX' && (endX! > startX! ? startIndex % props.gap! === 0 : endIndex % props.gap! === 0))
//         || (endX! < startX! && endIndex === lastIndex)
//         || (movingTravellerId === 'endX' && (endX! > startX! ? endIndex % props.gap! === 0 : startIndex % props.gap! === 0))
//         || (endX! > startX! && endIndex === lastIndex)
//       ) {
//         return true
//       }
//       return false
//     }

//     state.value[movingTravellerId!] = prevValue! + delta
//     state.value.brushMoveStartX = e.pageX

//     if (props.onChange && isFullGap()) {
//       props.onChange(newIndex)
//     }
//   }

//   const handleTravellerMoveKeyboard = (direction: 1 | -1, id: BrushTravellerId) => {
//     const { data, gap } = props
//     const { scaleValues, startX, endX } = state.value
//     const currentScaleValue = state.value[id]

//     const currentIndex = scaleValues!.indexOf(currentScaleValue!)
//     if (currentIndex === -1)
//       return

//     const newIndex = currentIndex + direction
//     if (newIndex === -1 || newIndex >= scaleValues!.length)
//       return

//     const newScaleValue = scaleValues![newIndex]

//     if ((id === 'startX' && newScaleValue >= endX!) || (id === 'endX' && newScaleValue <= startX!))
//       return

//     state.value[id] = newScaleValue
//     props.onChange?.(
//       getIndex({
//         startX: state.value.startX!,
//         endX: state.value.endX!,
//         data: data!,
//         gap: gap!,
//         scaleValues: scaleValues!,
//       }),
//     )
//   }

//   return {
//     state,
//     handleEnterSlideOrTraveller,
//     handleLeaveSlideOrTraveller,
//     handleSlideDragStart,
//     handleTravellerDragStart,
//     handleTravellerMoveKeyboard,
//     handleLeaveWrapper,
//     handleTouchMove,
//   }
// }
