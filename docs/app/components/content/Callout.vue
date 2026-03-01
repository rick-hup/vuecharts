<script setup lang="ts">
import { AlertCircle, Info, Lightbulb, TriangleAlert } from 'lucide-vue-next'

const props = defineProps<{
  type?: 'info' | 'warning' | 'danger' | 'tip'
}>()

const config = computed(() => {
  switch (props.type) {
    case 'warning':
      return { icon: TriangleAlert, border: 'border-yellow-500/50', bg: 'bg-yellow-50 dark:bg-yellow-950/20', text: 'text-yellow-700 dark:text-yellow-400' }
    case 'danger':
      return { icon: AlertCircle, border: 'border-red-500/50', bg: 'bg-red-50 dark:bg-red-950/20', text: 'text-red-700 dark:text-red-400' }
    case 'tip':
      return { icon: Lightbulb, border: 'border-green-500/50', bg: 'bg-green-50 dark:bg-green-950/20', text: 'text-green-700 dark:text-green-400' }
    default:
      return { icon: Info, border: 'border-blue-500/50', bg: 'bg-blue-50 dark:bg-blue-950/20', text: 'text-blue-700 dark:text-blue-400' }
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
