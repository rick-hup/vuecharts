<script setup lang="ts">
import { ResponsiveContainer } from 'vccs'
import type { ChartConfig } from './types'

const props = defineProps<{
  id?: string
  config: ChartConfig
}>()

const uniqueId = useId()
const chartId = computed(() => `chart-${props.id || uniqueId.replace(/:/g, '')}`)

provide('chart-config', computed(() => props.config))

const cssVars = computed(() => {
  const vars: Record<string, string> = {}
  for (const [key, item] of Object.entries(props.config)) {
    if (item.color) {
      vars[`--color-${key}`] = item.color
    }
  }
  return vars
})
</script>

<template>
  <div
    :data-chart="chartId"
    :style="cssVars"
    class="flex aspect-video justify-center text-xs [&_.v-charts-cartesian-axis-tick_text]:fill-muted-foreground [&_.v-charts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.v-charts-curve.v-charts-tooltip-cursor]:stroke-border [&_.v-charts-dot[stroke='#fff']]:stroke-transparent [&_.v-charts-layer]:outline-none [&_.v-charts-polar-grid_[stroke='#ccc']]:stroke-border [&_.v-charts-radial-bar-background-sector]:fill-muted [&_.v-charts-rectangle.v-charts-tooltip-cursor]:fill-muted [&_.v-charts-reference-line_[stroke='#ccc']]:stroke-border [&_.v-charts-sector[stroke='#fff']]:stroke-transparent [&_.v-charts-sector]:outline-none [&_.v-charts-surface]:outline-none"
  >
    <ResponsiveContainer>
      <slot />
    </ResponsiveContainer>
  </div>
</template>
