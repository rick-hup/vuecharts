<script setup lang="ts">
import type { ChartConfig } from './types'

const props = withDefaults(defineProps<{
  active?: boolean
  payload?: ReadonlyArray<Record<string, any>>
  label?: string | number
  labelFormatter?: (value: string | number, payload: ReadonlyArray<Record<string, any>>) => string
  nameKey?: string
  indicator?: 'dot' | 'line' | 'dashed'
  hideLabel?: boolean
  hideIndicator?: boolean
  labelKey?: string
  className?: string
}>(), {
  indicator: 'dot',
})

const config = inject<ComputedRef<ChartConfig>>('chart-config', computed(() => ({})))

function getPayloadConfig(item: Record<string, any>): { label?: string, color?: string } {
  const cfg = config.value
  const dataKey = item.dataKey as string
  const nameKeyVal = props.nameKey
  const payloadItem = item.payload ?? {}

  // Try nameKey from payload first (e.g. for browser-based data)
  if (nameKeyVal) {
    const itemCfg = cfg[nameKeyVal] || cfg[payloadItem[nameKeyVal]]
    if (itemCfg) {
      return { label: itemCfg.label, color: itemCfg.color || item.color }
    }
  }

  // Try dataKey in config
  if (cfg[dataKey]) {
    return { label: cfg[dataKey].label, color: cfg[dataKey].color || item.color }
  }

  // Try payload value for the nameKey
  if (nameKeyVal && payloadItem[nameKeyVal]) {
    const c = cfg[payloadItem[nameKeyVal]]
    if (c) {
      return { label: c.label, color: c.color || item.color }
    }
  }

  return { label: item.name, color: item.color }
}

const formattedLabel = computed(() => {
  if (props.hideLabel || !props.label)
    return null
  if (props.labelFormatter && props.payload && props.label != null) {
    return props.labelFormatter(props.label, props.payload)
  }
  const cfg = config.value
  if (props.labelKey) {
    return cfg[props.labelKey]?.label ?? props.label
  }
  return props.label
})

const nestLabel = computed(() => {
  return props.payload?.length === 1 && props.indicator !== 'dot'
})
</script>

<template>
  <div
    v-if="active && payload?.length"
    class="grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl"
    :class="[
      className,
    ]"
  >
    <div
      v-if="!hideLabel && formattedLabel"
      class="font-medium"
    >
      {{ formattedLabel }}
    </div>

    <div class="grid gap-1.5">
      <div
        v-for="(item, index) in payload"
        :key="item.dataKey ?? index"
        class="flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground"
      >
        <!-- indicator -->
        <div
          v-if="!hideIndicator"
          class="shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)"
          :class="{
            'h-2.5 w-2.5': indicator === 'dot',
            'w-1': indicator === 'line',
            'w-0 border-[1.5px] border-dashed bg-transparent': indicator === 'dashed',
          }"
          :style="{
            '--color-bg': getPayloadConfig(item).color,
            '--color-border': getPayloadConfig(item).color,
          }"
        />

        <div
          class="flex flex-1 justify-between leading-none"
          :class="nestLabel ? 'items-end' : 'items-center'"
        >
          <div class="grid gap-1.5">
            <span
              v-if="nestLabel && formattedLabel"
              class="font-medium"
            >
              {{ formattedLabel }}
            </span>
            <span class="text-muted-foreground">
              {{ getPayloadConfig(item).label || item.name }}
            </span>
          </div>

          <span class="font-mono font-medium tabular-nums text-foreground">
            {{ typeof item.value === 'number' ? item.value.toLocaleString() : item.value }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
