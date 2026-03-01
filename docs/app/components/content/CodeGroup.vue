<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'

const slots = useSlots()

const tabs = computed(() => {
  const children = slots.default?.() || []
  return children
    .filter(child => child.props)
    .map((child, index) => ({
      label: child.props?.filename || child.props?.language || `Tab ${index + 1}`,
      index,
    }))
})
</script>

<template>
  <div class="my-4">
    <Tabs :default-value="tabs[0]?.label">
      <TabsList>
        <TabsTrigger
          v-for="tab in tabs"
          :key="tab.label"
          :value="tab.label"
          class="text-xs"
        >
          {{ tab.label }}
        </TabsTrigger>
      </TabsList>
      <TabsContent
        v-for="(tab, index) in tabs"
        :key="tab.label"
        :value="tab.label"
        class="mt-0"
      >
        <component :is="slots.default?.()[index]" />
      </TabsContent>
    </Tabs>
  </div>
</template>
