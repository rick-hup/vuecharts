<script setup lang="ts">
import { AreaChart as AreaChartIcon, ArrowRight, BarChart3, Github, LineChart as LineChartIcon } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import ThemeToggle from '~/components/docs/ThemeToggle.vue'
import LanguageToggle from '~/components/docs/LanguageToggle.vue'
import { useLocale } from '~/composables/useLocale'

import SimpleBarChart from '~/charts/bar-charts/simple-bar-chart.vue'
import SimpleAreaChart from '~/charts/area-charts/simple-area-chart.vue'
import SimpleLineChart from '~/charts/line-charts/simple-line-chart.vue'

const { msg } = useLocale()

const chartTypes = computed(() => [
  { title: msg.value.sidebarBarChart, icon: BarChart3, url: '/docs/bar-charts', component: SimpleBarChart },
  { title: msg.value.sidebarAreaChart, icon: AreaChartIcon, url: '/docs/area-charts', component: SimpleAreaChart },
  { title: msg.value.sidebarLineChart, icon: LineChartIcon, url: '/docs/line-charts', component: SimpleLineChart },
])
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <!-- Header -->
    <header class="flex items-center justify-between px-6 py-4">
      <div class="flex items-center gap-2">
        <BarChart3 class="size-5 text-primary" />
        <span class="text-lg font-semibold">vccs</span>
      </div>
      <div class="flex items-center gap-2">
        <LanguageToggle />
        <ThemeToggle />
        <Button
          variant="ghost"
          size="icon"
          as-child
        >
          <a
            href="https://github.com/nicepkg/vccs"
            target="_blank"
            rel="noopener"
          >
            <Github class="size-4" />
          </a>
        </Button>
      </div>
    </header>

    <!-- Hero -->
    <section class="mx-auto max-w-4xl px-6 py-24 text-center">
      <h1 class="text-5xl font-bold tracking-tight sm:text-6xl">
        {{ msg.heroTitle }}
      </h1>
      <p class="mt-6 text-lg text-muted-foreground leading-relaxed">
        {{ msg.heroDescription }}
      </p>
      <div class="mt-10 flex items-center justify-center gap-4">
        <Button
          as-child
          size="lg"
        >
          <NuxtLink to="/docs">
            {{ msg.getStarted }}
            <ArrowRight class="ml-2 size-4" />
          </NuxtLink>
        </Button>
        <Button
          variant="outline"
          size="lg"
          as-child
        >
          <a
            href="https://github.com/nicepkg/vccs"
            target="_blank"
            rel="noopener"
          >
            <Github class="mr-2 size-4" />
            GitHub
          </a>
        </Button>
      </div>
    </section>

    <!-- Chart Showcase Grid -->
    <section class="mx-auto max-w-5xl px-6 pb-24">
      <div class="grid gap-6 md:grid-cols-3">
        <NuxtLink
          v-for="chart in chartTypes"
          :key="chart.title"
          :to="chart.url"
          class="group"
        >
          <Card class="transition-shadow hover:shadow-lg">
            <CardHeader class="flex-row items-center gap-2 space-y-0">
              <component
                :is="chart.icon"
                class="size-4 text-muted-foreground"
              />
              <CardTitle class="text-sm font-medium">
                {{ chart.title }}
              </CardTitle>
              <ArrowRight class="ml-auto size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </CardHeader>
            <CardContent>
              <ClientOnly>
                <component :is="chart.component" />
              </ClientOnly>
            </CardContent>
          </Card>
        </NuxtLink>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t py-6 text-center text-sm text-muted-foreground">
      {{ msg.footer }}
    </footer>
  </div>
</template>
