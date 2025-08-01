import { useAppDispatch } from '@/state/hooks'
import {
  type CartesianGraphicalItemSettings,
  addCartesianGraphicalItem,
  removeCartesianGraphicalItem,
  replaceCartesianGraphicalItem,
} from './graphicalItemsSlice'

import type { StackId } from '@/types/tick'
import { onUnmounted, unref, watchEffect } from 'vue'
import { getNormalizedStackId } from '@/utils/chart'
import type { MaybeRef } from 'vue'

type SetCartesianGraphicalItemProps = Partial<Omit<CartesianGraphicalItemSettings, 'stackId'> & {
  stackId: StackId | undefined
}>

export function SetCartesianGraphicalItem(_props: MaybeRef<SetCartesianGraphicalItemProps>) {
  const dispatch = useAppDispatch()
  let preSetting: CartesianGraphicalItemSettings | null = null
  watchEffect(() => {
    const props = unref(_props)
    const settings: CartesianGraphicalItemSettings = {
      ...(props as CartesianGraphicalItemSettings),
      stackId: getNormalizedStackId(props.stackId),
    }
    if (preSetting === null) {
      dispatch(addCartesianGraphicalItem(settings))
    }
    else if (preSetting !== settings) {
      dispatch(replaceCartesianGraphicalItem({ prev: preSetting, next: settings }))
    }
    preSetting = settings
  })
  onUnmounted(() => {
    if (preSetting) {
      dispatch(removeCartesianGraphicalItem(preSetting))
      preSetting = null
    }
  })
}
