<script setup lang="ts">
import { AreaChart as AreaChartIcon, BarChart3 } from 'lucide-vue-next'

const routes = [
  {
    path: '/area',
    name: 'Area Chart',
    description: 'Area chart demo with various configurations',
    icon: AreaChartIcon,
  },
  {
    path: '/bar-charts',
    name: 'Bar Chart',
    description: 'Bar chart demos: basic, horizontal, stacked, labels, interactive and more',
    icon: BarChart3,
  },
]
</script>

<template>
  <div class="mx-auto max-w-4xl p-8">
    <h1 class="mb-8 text-center text-3xl font-bold tracking-tight">
      Vue Charts Playground
    </h1>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <NuxtLink
        v-for="route in routes"
        :key="route.path"
        :to="route.path"
        class="group"
      >
        <Card class="transition-shadow hover:shadow-lg">
          <CardHeader>
            <div class="flex items-center gap-2">
              <component
                :is="route.icon"
                class="size-5 text-muted-foreground"
              />
              <CardTitle class="text-base">
                {{ route.name }}
              </CardTitle>
            </div>
            <CardDescription>{{ route.description }}</CardDescription>
          </CardHeader>
        </Card>
      </NuxtLink>
    </div>
  </div>
</template>
