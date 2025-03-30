<script setup lang="ts">
import { computed, ref } from 'vue'
import { area, curveLinear, line, scaleLinear } from 'd3'
import type { ChartData } from '../types'

const props = defineProps<{
  width: number
  height: number
  data: ChartData[]
  margin?: { top: number, right: number, bottom: number, left: number }
  dataKey?: string
}>()

const emit = defineEmits<{
  click: [event: MouseEvent]
  mouseenter: [event: MouseEvent]
  mouseleave: [event: MouseEvent]
}>()

const defaultMargin = { top: 5, right: 5, bottom: 5, left: 5 }
const chartMargin = computed(() => ({ ...defaultMargin, ...props.margin }))

const chartWidth = computed(() => props.width - chartMargin.value.left - chartMargin.value.right)
const chartHeight = computed(() => props.height - chartMargin.value.top - chartMargin.value.bottom)

const xScale = computed(() => {
  return scaleLinear()
    .domain([0, props.data.length - 1])
    .range([0, chartWidth.value])
})

const yScale = computed(() => {
  if (!props.dataKey)
    return null
  const max = Math.max(...props.data.map(d => d[props.dataKey as keyof typeof d] as number))
  return scaleLinear()
    .domain([0, max])
    .range([chartHeight.value, 0])
})

const areaPath = computed(() => {
  if (!props.dataKey || !yScale.value)
    return ''

  const areaGenerator = area<ChartData>()
    .x((d, i) => xScale.value(i))
    .y0(chartHeight.value)
    .y1(d => yScale.value!(d[props.dataKey as keyof typeof d] as number))
    .curve(curveLinear)

  return areaGenerator(props.data)
})

const linePath = computed(() => {
  if (!props.dataKey || !yScale.value)
    return ''

  const lineGenerator = line<ChartData>()
    .x((d, i) => xScale.value(i))
    .y(d => yScale.value!(d[props.dataKey as keyof typeof d] as number))
    .curve(curveLinear)

  return lineGenerator(props.data)
})

function handleClick(event: MouseEvent) {
  emit('click', event)
}

function handleMouseEnter(event: MouseEvent) {
  emit('mouseenter', event)
}

function handleMouseLeave(event: MouseEvent) {
  emit('mouseleave', event)
}
</script>

<template>
  <div
    class="recharts-wrapper"
    :style="{
      position: 'relative',
      cursor: 'default',
      width: `${width}px`,
      height: `${height}px`,
      padding: `${chartMargin.top}px ${chartMargin.right}px ${chartMargin.bottom}px ${chartMargin.left}px`,
    }"
  >
    <svg
      :width="width"
      :height="height"
      :viewBox="`0 0 ${width} ${height}`"
      class="recharts-surface"
    >
      <defs>
        <clipPath :id="'clip-path-' + '_uid'">
          <rect
            :x="chartMargin.left"
            :y="chartMargin.top"
            :width="chartWidth"
            :height="chartHeight"
          />
        </clipPath>
      </defs>

      <g class="recharts-area">
        <path
          class="recharts-area-area"
          :d="areaPath"
          fill="rgba(106, 110, 229, .16)"
          fill-opacity="0.6"
          stroke="none"
          @click="handleClick"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
        />
        <path
          class="recharts-area-curve"
          :d="linePath"
          fill="none"
          stroke="rgb(106, 110, 229)"
          stroke-width="2"
        />
      </g>
    </svg>
  </div>
</template>
