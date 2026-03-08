<script setup lang="ts">
import { TrendingUp } from 'lucide-vue-next'
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, Tooltip } from 'vccs'
import type { ChartConfig } from '~/components/ui/chart/types'
import ChartTooltipContent from '~/components/ui/chart/ChartTooltipContent.vue'

const chartData = [
  { month: 'January', desktop: 186, mobile: 160 },
  { month: 'February', desktop: 185, mobile: 170 },
  { month: 'March', desktop: 207, mobile: 180 },
  { month: 'April', desktop: 173, mobile: 160 },
  { month: 'May', desktop: 160, mobile: 190 },
  { month: 'June', desktop: 174, mobile: 204 },
]

const chartConfig: ChartConfig = {
  desktop: { label: 'Desktop', color: 'var(--chart-1)' },
  mobile: { label: 'Mobile', color: 'var(--chart-2)' },
}
</script>

<template>
  <Card class="flex flex-col">
    <CardHeader class="items-center pb-4">
      <CardTitle>Radar Chart - Lines Only</CardTitle>
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
                indicator="line"
              />
            </template>
          </Tooltip>
          <PolarAngleAxis data-key="month" />
          <PolarGrid :radial-lines="false" />
          <Radar
            data-key="desktop"
            fill="var(--color-desktop)"
            :fill-opacity="0"
            stroke="var(--color-desktop)"
            :stroke-width="2"
          />
          <Radar
            data-key="mobile"
            fill="var(--color-mobile)"
            :fill-opacity="0"
            stroke="var(--color-mobile)"
            :stroke-width="2"
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
