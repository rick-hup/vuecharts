<script setup lang="ts">
defineProps<{
  /** JSON-encoded props array: [{ name, type, default, description }] */
  items?: string
}>()

interface PropItem {
  name: string
  type: string
  default?: string
  description: string
}

const parsedItems = computed((): PropItem[] => {
  // Items come from MDC slot content or from the items prop
  return []
})
</script>

<template>
  <div class="my-6 overflow-x-auto">
    <slot />
  </div>
</template>
