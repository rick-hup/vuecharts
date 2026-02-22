<script setup lang="ts">
import { type CSSProperties, computed, ref } from 'vue'
import { provideLabelLayerRef } from '@/context/labelLayerContext'

interface SurfaceProps {
  width: number
  height: number
  viewBox?: {
    x?: number
    y?: number
    width?: number
    height?: number
  }
  class?: string
  style?: CSSProperties
  title?: string
  desc?: string
}

defineOptions({
  name: 'ChartsSurface',
  inheritAttrs: false,
})

const props = defineProps<SurfaceProps>()

const svgViewBox = computed(() => {
  const svgView = props.viewBox || { width: props.width, height: props.height, x: 0, y: 0 }
  return `${svgView.x} ${svgView.y} ${svgView.width} ${svgView.height}`
})

const labelLayerRef = ref<SVGGElement | null>(null)
provideLabelLayerRef(labelLayerRef)
</script>

<template>
  <svg
    v-bind="$attrs"
    class="vcharts-surface"
    :class="[props.class]"
    :width="width"
    :height="height"
    :style="style"
    :viewBox="svgViewBox"
  >
    <title>{{ title }}</title>
    <desc>{{ desc }}</desc>
    <slot />
    <g
      ref="labelLayerRef"
      class="v-charts-label-layer"
    />
  </svg>
</template>
