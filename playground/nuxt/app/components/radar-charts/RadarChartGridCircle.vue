<script setup lang="ts">
import { TrendingUp } from 'lucide-vue-next'
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, Tooltip } from 'vccs'
import type { ChartConfig } from '~/components/ui/chart/types'
import ChartTooltipContent from '~/components/ui/chart/ChartTooltipContent.vue'

const chartData = [
  { month: 'January', desktop: 186 },
  { month: 'February', desktop: 305 },
  { month: 'March', desktop: 237 },
  { month: 'April', desktop: 173 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 },
]

const chartConfig: ChartConfig = {
  desktop: { label: 'Desktop', color: 'var(--chart-1)' },
}
</script>

<template>
  <Card class="flex flex-col">
    <CardHeader class="items-center pb-4">
      <CardTitle>Radar Chart - Grid Circle</CardTitle>
      <CardDescription>Showing total visitors for the last 6 months</CardDescription>
    </CardHeader>
    <CardContent class="pb-0">
      <ChartContainer
        :config="chartConfig"
        class="mx-auto aspect-square max-h-[250px]"
      >
        <RadarChart :data="chartData">
          <Tooltip :cursor="false">
            <template #content="{ active, payload, label }">
              <ChartTooltipContent
                :active="active"
                :payload="payload"
                :label="label"
                hide-label
              />
            </template>
          </Tooltip>
          <PolarAngleAxis data-key="month" />
          <PolarGrid grid-type="circle" />
          <Radar
            data-key="desktop"
            fill="var(--color-desktop)"
            :fill-opacity="0.6"
            :dot="{ r: 4, fillOpacity: 1 }"
          />
        </RadarChart>
      </ChartContainer>
    </CardContent>
    <CardFooter class="flex-col gap-2 text-sm">
      <div class="flex items-center gap-2 font-medium leading-none">
        Trending up by 5.2% this month
        <TrendingUp class="size-4" />
      </div>
      <div class="leading-none text-muted-foreground">
        January - June 2024
      </div>
    </CardFooter>
  </Card>
</template>
