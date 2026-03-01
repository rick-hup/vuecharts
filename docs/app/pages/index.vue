<script setup lang="ts">
import { ChevronRight, Github, Quote } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'
import ThemeToggle from '~/components/docs/ThemeToggle.vue'
import LanguageToggle from '~/components/docs/LanguageToggle.vue'

import SimpleBarChart from '~/charts/bar-charts/simple-bar-chart.vue'
import StackedBarChart from '~/charts/bar-charts/stacked-bar-chart.vue'
import HorizontalBarChart from '~/charts/bar-charts/horizontal-bar-chart.vue'
import SimpleAreaChart from '~/charts/area-charts/simple-area-chart.vue'
import StackedAreaChart from '~/charts/area-charts/stacked-area-chart.vue'
import GradientAreaChart from '~/charts/area-charts/gradient-area-chart.vue'
import SimpleLineChart from '~/charts/line-charts/simple-line-chart.vue'
import MultiLineChart from '~/charts/line-charts/multi-line-chart.vue'
import DashedLineChart from '~/charts/line-charts/dashed-line-chart.vue'

const { msg } = useLocale()

type ChartCategory = 'Bar Charts' | 'Area Charts' | 'Line Charts'

const categories: ChartCategory[] = ['Bar Charts', 'Area Charts', 'Line Charts']

const selectedCategory = ref<ChartCategory>('Bar Charts')

interface ChartItem {
  id: string
  title: string
  description: string
  category: ChartCategory
  component: any
}

const allCharts: ChartItem[] = [
  { id: 'simple-bar', title: 'Bar Chart', description: 'Jan - Jun 2025', category: 'Bar Charts', component: SimpleBarChart },
  { id: 'stacked-bar', title: 'Stacked Bar Chart', description: 'Desktop & Mobile', category: 'Bar Charts', component: StackedBarChart },
  { id: 'horizontal-bar', title: 'Horizontal Bar', description: 'Horizontal layout', category: 'Bar Charts', component: HorizontalBarChart },
  { id: 'simple-area', title: 'Area Chart', description: 'Jan - Jun 2025', category: 'Area Charts', component: SimpleAreaChart },
  { id: 'stacked-area', title: 'Stacked Area', description: 'Two series', category: 'Area Charts', component: StackedAreaChart },
  { id: 'gradient-area', title: 'Gradient Area', description: 'Gradient fill', category: 'Area Charts', component: GradientAreaChart },
  { id: 'simple-line', title: 'Line Chart', description: 'Jan - Jun 2025', category: 'Line Charts', component: SimpleLineChart },
  { id: 'multi-line', title: 'Multi Line', description: 'Desktop & Mobile', category: 'Line Charts', component: MultiLineChart },
  { id: 'dashed-line', title: 'Dashed Line', description: 'Dashed stroke', category: 'Line Charts', component: DashedLineChart },
]

const activeChartId = ref('simple-bar')

function selectCategory(cat: ChartCategory) {
  selectedCategory.value = cat
  const chartsInCat = allCharts.filter(c => c.category === cat)
  activeChartId.value = chartsInCat[Math.floor(Math.random() * chartsInCat.length)].id
}

// 3 columns for the grid
const columns = computed(() => [
  allCharts.slice(0, 3),
  allCharts.slice(3, 6),
  allCharts.slice(6, 9),
])

// Compute translate offset to center the active chart in the viewport
const gridOffset = computed(() => {
  const idx = allCharts.findIndex(c => c.id === activeChartId.value)
  if (idx < 0)
    return { x: 0, y: 0 }
  const col = Math.floor(idx / 3)
  const row = idx % 3
  return {
    x: -col * 400,
    y: -row * 340 + 100,
  }
})
</script>

<template>
  <div class="relative flex min-h-svh bg-background text-foreground overflow-hidden">
    <!-- Left: Text Content -->
    <div class="min-h-svh flex items-center mx-auto w-full max-w-4xl relative z-30">
      <div class="flex flex-col gap-2 px-6">
        <!-- Recharts quote card -->
        <a
          href="https://recharts.org/"
          target="_blank"
          rel="noopener"
          class="group"
        >
          <div class="bg-muted/20 p-4 rounded-lg mb-4 max-w-sm w-full hover:bg-muted/40 duration-200 cursor-pointer relative">
            <div class="flex flex-col gap-2">
              <Quote
                :size="14"
                class="text-muted-foreground"
              />
              <p class="text-muted-foreground text-sm">
                An unofficial Vue 3 port of <span class="text-primary font-medium">Recharts</span> — the most popular React charting library.
              </p>
              <div class="flex flex-row gap-2 mt-1 items-center">
                <div class="size-5 rounded-full bg-chart-1/20 flex items-center justify-center text-[10px] font-bold text-chart-1">R</div>
                <div class="flex flex-col">
                  <div class="text-xs">Recharts</div>
                  <div class="text-xs text-muted-foreground/50 leading-none">composable React charts</div>
                </div>
              </div>
            </div>
          </div>
        </a>

        <!-- Logo -->
        <div class="flex items-center gap-2">
          <span class="text-4xl font-black tracking-tighter">
            vccs
            <span class="text-sm font-mono text-muted-foreground/50 font-light ml-1.5">v0.1</span>
          </span>
        </div>

        <!-- Description -->
        <p class="text-muted-foreground text-sm max-w-md">
          {{ msg.heroDescription }}
        </p>

        <!-- CTA buttons -->
        <div class="flex flex-row gap-2 items-center mt-4">
          <NuxtLink to="/docs/getting-started/introduction">
            <Button
              variant="outline"
              size="sm"
              class="h-7 text-xs"
            >
              {{ msg.getStarted }}
            </Button>
          </NuxtLink>
          <a
            href="https://github.com/nicepkg/vccs"
            target="_blank"
            rel="noopener"
          >
            <Button
              variant="secondary"
              size="sm"
              class="h-7 text-xs cursor-pointer"
            >
              <span>Star Github</span>
              <Github class="size-3" />
            </Button>
          </a>
        </div>

        <!-- Chart type selector -->
        <div class="flex-col gap-2 mt-8 hidden sm:flex">
          <div
            v-for="cat in categories"
            :key="cat"
            class="flex flex-row gap-1 items-center cursor-pointer transition-all duration-200 group"
            :class="selectedCategory === cat ? 'opacity-100' : 'opacity-40'"
            @click="selectCategory(cat)"
          >
            <ChevronRight
              :stroke-width="1"
              class="size-4 transition-transform duration-200"
              :class="selectedCategory !== cat && 'group-hover:-translate-x-2'"
            />
            <span class="font-black">{{ cat }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Right: Chart Showcase -->
    <div class="absolute h-full w-1/2 right-0 overflow-hidden hidden sm:block">
      <!-- Left fade gradient -->
      <div class="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-background to-transparent z-20" />

      <!-- Animated chart grid -->
      <div
        class="flex flex-row w-max gap-4 p-40 transition-transform duration-700"
        :style="{
          transform: `translate(${gridOffset.x}px, ${gridOffset.y}px)`,
          transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }"
      >
        <div
          v-for="(col, colIdx) in columns"
          :key="colIdx"
          class="flex flex-col gap-4"
          :class="colIdx % 2 === 1 && 'mt-18'"
        >
          <div
            v-for="chart in col"
            :key="chart.id"
            class="w-[384px] border rounded-2xl overflow-hidden bg-card transition-all duration-500"
            :class="[
              activeChartId === chart.id
                ? 'opacity-100 scale-[1.02] shadow-2xl z-10'
                : 'opacity-[0.15] scale-100',
            ]"
          >
            <!-- Card header -->
            <div class="px-4 pt-4 pb-2">
              <div class="text-sm font-semibold">
                {{ chart.title }}
              </div>
              <div class="text-xs text-muted-foreground">
                {{ chart.description }}
              </div>
            </div>
            <!-- Chart content -->
            <div class="px-4 pb-4">
              <ClientOnly>
                <component :is="chart.component" />
              </ClientOnly>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Top-right controls -->
    <div class="absolute top-4 right-4 z-40 flex items-center gap-1">
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
          <span class="sr-only">GitHub</span>
        </a>
      </Button>
    </div>
  </div>
</template>
