<script setup lang="ts">
import type { CSSProperties, VNode } from 'vue'
import { cloneVNode, computed, defineOptions, defineSlots, onMounted, onUnmounted, ref, toRef } from 'vue'
import { useThrottleFn } from '@vueuse/core'
import { isPercent } from '../utils/validate'
import { normalizeStyle } from '@/utils/style'
import { warn } from '@/utils/log'
import { provideSizeContext } from '@/container/useSizeContext'

defineOptions({
  name: 'ResponsiveContainer',
  inheritAttrs: false,
})
const props = withDefaults(defineProps<ResponsiveContainerProps>(), {
  initialDimension: () => ({ width: -1, height: -1 }),
  width: '100%',
  height: '100%',
  minWidth: 0,
  debounce: 0,
})
const slots = defineSlots<{
  default: () => VNode[]
}>()

export interface ResponsiveContainerProps {
  aspect?: number
  width?: string | number
  height?: string | number
  minWidth?: string | number
  minHeight?: string | number
  initialDimension?: {
    width: number
    height: number
  }
  maxHeight?: number
  debounce?: number
  id?: string | number
  class?: string | number
  style?: Omit<CSSProperties, keyof ResponsiveContainerProps>
  onResize?: (width: number, height: number) => void
}
const debounce = toRef(props, 'debounce')
const sizes = ref({
  width: props.initialDimension.width,
  height: props.initialDimension.height,
})

// Computed calculated dimensions to prevent recalculation
const calculatedWidth = computed(() => {
  return isPercent(props.width) ? sizes.value.width : (props.width as number)
})

const calculatedHeight = computed(() => {
  let height = isPercent(props.height) ? sizes.value.height : (props.height as number)

  if (props.aspect && props.aspect > 0) {
    // Preserve the desired aspect ratio
    if (props.width && (props.height == null || props.height === 'auto')) {
      height = calculatedWidth.value / props.aspect
    }
    else if (props.height && (props.width == null || props.width === 'auto')) {
      // calculatedWidth will be computed based on height and aspect
    }
  }

  return height
})

// Update calculatedWidth when aspect ratio affects it
const finalCalculatedWidth = computed(() => {
  let width = calculatedWidth.value

  if (props.aspect && props.aspect > 0) {
    if (props.height && (props.width == null || props.width === 'auto')) {
      width = calculatedHeight.value * props.aspect
    }
  }

  return width
})

// Provide context with all values
provideSizeContext({
  sizes,
  calculatedWidth: finalCalculatedWidth,
  calculatedHeight,
})

function setContainerSize(width: number, height: number) {
  const roundedWidth = Math.round(width)
  const roundedHeight = Math.round(height)
  const { width: containerWidth, height: containerHeight } = sizes.value
  if (containerWidth === roundedWidth && containerHeight === roundedHeight) {
    return
  }
  sizes.value = {
    width: roundedWidth,
    height: roundedHeight,
  }
}
const handleResize = useThrottleFn(
  (entries: ResizeObserverEntry[]) => {
    const { width: containerWidth, height: containerHeight } = entries[0].contentRect

    setContainerSize(containerWidth, containerHeight)
    props.onResize?.(containerWidth, containerHeight)
  },
  debounce,
  true,
  false,
)

const containerRef = ref<HTMLDivElement>()
let observer: ResizeObserver | null = null
onMounted(() => {
  observer = new ResizeObserver(handleResize)
  const { width: containerWidth, height: containerHeight }
    = containerRef.value!.getBoundingClientRect() ?? { width: 0, height: 0 }
  setContainerSize(containerWidth, containerHeight)
  observer.observe(containerRef.value!)
})
onUnmounted(() => {
  observer?.disconnect()
})

const clonedChildren = computed(() => {
  const { width: containerWidth, height: containerHeight } = sizes.value

  if (containerWidth < 0 || containerHeight < 0) {
    return null
  }

  warn(
    isPercent(props.width) || isPercent(props.height),
    `The width(%s) and height(%s) are both fixed numbers,
       maybe you don't need to use a ResponsiveContainer.`,
    props.width,
    props.height,
  )

  warn(!props.aspect || props.aspect > 0, 'The aspect(%s) must be greater than zero.', props.aspect)

  // Use computed values to prevent recalculation
  const calculatedWidthValue = finalCalculatedWidth.value
  const calculatedHeightValue = calculatedHeight.value

  warn(
    calculatedWidthValue > 0 || calculatedHeightValue > 0,
    `The width(%s) and height(%s) of chart should be greater than 0,
       please check the style of container, or the props width(%s) and height(%s),
       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the
       height and width.`,
    calculatedWidthValue,
    calculatedHeightValue,
    props.width,
    props.height,
    props.minWidth,
    props.minHeight,
    props.aspect,
  )

  // Clone children with stable keys to prevent remounting
  const children = slots.default?.().map((child, index) => {
    return cloneVNode(child, {
      width: calculatedWidthValue,
      height: calculatedHeightValue,
      key: child.key || `responsive-child-${index}`, // Ensure stable key
      style: {
        ...normalizeStyle({
          maxHeight: sizes.value.height,
          maxWidth: sizes.value.width,
        }),
        height: '100%',
        width: '100%',
        ...child.props?.style,
      },
    })
  })

  return children
})
</script>

<template>
  <div
    :id="id ? `${id}` : undefined"
    ref="containerRef"
    class="vcharts-responsive-container"
    :class="[props.class]"
    :style="{
      ...style,
      ...normalizeStyle({
        width,
        height,
        minWidth,
        minHeight,
        maxHeight,
      }),
    }"
  >
    <template v-if="clonedChildren">
      <component
        :is="child"
        v-for="child in clonedChildren"
        :key="child.key"
      />
    </template>
  </div>
</template>
