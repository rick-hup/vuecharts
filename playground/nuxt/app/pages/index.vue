<script setup lang="ts">
import { AreaChart as AreaChartIcon, ArrowRight, BarChart3 } from 'lucide-vue-next'

const routes = [
  {
    path: '/bar-charts',
    name: 'Bar Charts',
    description: 'Basic, horizontal, stacked, labels, interactive and more.',
    icon: BarChart3,
    count: 10,
  },
  {
    path: '/area',
    name: 'Area Charts',
    description: 'Time-range filtering with gradient fills.',
    icon: AreaChartIcon,
    count: 1,
  },
]
</script>

<template>
  <div class="container py-10">
    <div class="mb-10 max-w-lg">
      <h1 class="text-3xl font-bold tracking-tight">
        Chart Playground
      </h1>
      <p class="mt-2 text-muted-foreground">
        Explore vccs chart components with live demos.
      </p>
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <NuxtLink
        v-for="route in routes"
        :key="route.path"
        :to="route.path"
        class="group"
      >
        <Card class="h-full transition-colors hover:border-foreground/25">
          <CardHeader>
            <div class="flex items-center gap-3">
              <component
                :is="route.icon"
                class="size-5 shrink-0 text-muted-foreground"
              />
              <CardTitle class="text-lg">
                {{ route.name }}
              </CardTitle>
              <span class="ml-auto rounded-md bg-muted px-2 py-0.5 text-xs tabular-nums text-muted-foreground">
                {{ route.count }}
              </span>
            </div>
            <CardDescription class="mt-2">
              {{ route.description }}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <span class="inline-flex items-center gap-1.5 text-sm font-medium group-hover:gap-2.5 transition-all duration-200">
              View demos
              <ArrowRight class="size-3.5" />
            </span>
          </CardFooter>
        </Card>
      </NuxtLink>
    </div>
  </div>
</template>
