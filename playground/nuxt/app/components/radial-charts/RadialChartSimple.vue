<script setup lang="ts">
import { AppWindow, Chrome, Compass, Ellipsis, Globe, TrendingUp } from 'lucide-vue-next'
import { RadialBar, RadialBarChart, Tooltip } from 'vccs'
import type { ChartConfig } from '~/components/ui/chart/types'
import ChartTooltipContent from '~/components/ui/chart/ChartTooltipContent.vue'

const chartData = [
  { browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
  { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
  { browser: 'firefox', visitors: 187, fill: 'var(--color-firefox)' },
  { browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
  { browser: 'other', visitors: 90, fill: 'var(--color-other)' },
]

const chartConfig: ChartConfig = {
  visitors: { label: 'Visitors' },
  chrome: { label: 'Chrome', color: 'var(--chart-1)', icon: Chrome },
  safari: { label: 'Safari', color: 'var(--chart-2)', icon: Compass },
  firefox: { label: 'Firefox', color: 'var(--chart-3)', icon: Globe },
  edge: { label: 'Edge', color: 'var(--chart-4)', icon: AppWindow },
  other: { label: 'Other', color: 'var(--chart-5)', icon: Ellipsis },
}
</script>

<template>
  <Card class="flex flex-col">
    <CardHeader class="items-center pb-0">
      <CardTitle>Radial Chart</CardTitle>
      <CardDescription>January - June 2024</CardDescription>
    </CardHeader>
    <CardContent class="flex-1 pb-0">
      <ChartContainer
        :config="chartConfig"
        class="mx-auto aspect-square max-h-[250px]"
      >
        <RadialBarChart
          :data="chartData"
          :inner-radius="30"
          :outer-radius="110"
        >
          <Tooltip :cursor="false">
            <template #content="{ active, payload, label }">
              <ChartTooltipContent
                :active="active"
                :payload="payload"
                :label="label"
                hide-label
                name-key="browser"
              />
            </template>
          </Tooltip>
          <RadialBar
            data-key="visitors"
            :background="true"
          />
        </RadialBarChart>
      </ChartContainer>
    </CardContent>
    <CardFooter class="flex-col gap-2 text-sm">
      <div class="flex items-center gap-2 font-medium leading-none">
        Trending up by 5.2% this month
        <TrendingUp class="size-4" />
      </div>
      <div class="leading-none text-muted-foreground">
        Showing total visitors for the last 6 months
      </div>
    </CardFooter>
  </Card>
</template>
