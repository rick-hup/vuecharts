<script setup lang="ts">
import { ResponsiveContainer } from 'vccs'

const props = defineProps<{
  id?: string
}>()

const uniqueId = useId()
const chartId = computed(() => `chart-${props.id || uniqueId.replace(/:/g, '')}`)
</script>

<template>
  <div
    :data-chart="chartId"
    class="flex aspect-video justify-center text-xs [&_.v-charts-cartesian-axis-tick_text]:fill-muted-foreground [&_.v-charts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.v-charts-curve.v-charts-tooltip-cursor]:stroke-border [&_.v-charts-dot[stroke='#fff']]:stroke-transparent [&_.v-charts-layer]:outline-none [&_.v-charts-polar-grid_[stroke='#ccc']]:stroke-border [&_.v-charts-radial-bar-background-sector]:fill-muted [&_.v-charts-tooltip-cursor]:fill-muted [&_.v-charts-reference-line_[stroke='#ccc']]:stroke-border [&_.v-charts-sector[stroke='#fff']]:stroke-transparent [&_.v-charts-sector]:outline-none [&_.v-charts-surface]:outline-none"
  >
    <ResponsiveContainer>
      <slot />
    </ResponsiveContainer>
  </div>
</template>
