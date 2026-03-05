<script setup lang="ts">
import { AlertCircle, Info, Lightbulb, TriangleAlert } from 'lucide-vue-next'

const props = defineProps<{
  type?: 'info' | 'warning' | 'danger' | 'tip'
}>()

const config = computed(() => {
  switch (props.type) {
    case 'warning':
      return { icon: TriangleAlert, border: 'border-callout-warning/50', bg: 'bg-callout-warning/10', text: 'text-callout-warning' }
    case 'danger':
      return { icon: AlertCircle, border: 'border-callout-danger/50', bg: 'bg-callout-danger/10', text: 'text-callout-danger' }
    case 'tip':
      return { icon: Lightbulb, border: 'border-callout-tip/50', bg: 'bg-callout-tip/10', text: 'text-callout-tip' }
    default:
      return { icon: Info, border: 'border-callout-info/50', bg: 'bg-callout-info/10', text: 'text-callout-info' }
  }
})
</script>

<template>
  <div
    class="my-4 rounded-lg border-l-4 px-4 py-3"
    :class="[config.border, config.bg]"
  >
    <div class="flex items-start gap-2">
      <component
        :is="config.icon"
        class="mt-0.5 size-4 shrink-0"
        :class="config.text"
      />
      <div class="min-w-0 text-sm [&>p:first-child]:mt-0">
        <slot />
      </div>
    </div>
  </div>
</template>
