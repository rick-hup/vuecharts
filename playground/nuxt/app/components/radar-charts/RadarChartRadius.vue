<script setup lang="ts">
import { TrendingUp } from 'lucide-vue-next'
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, Tooltip } from 'vccs'
import type { ChartConfig } from '~/components/ui/chart/types'
import ChartTooltipContent from '~/components/ui/chart/ChartTooltipContent.vue'

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 173, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
]

const chartConfig: ChartConfig = {
  desktop: { label: 'Desktop', color: 'var(--chart-1)' },
  mobile: { label: 'Mobile', color: 'var(--chart-2)' },
}
</script>

<template>
  <Card class="flex flex-col">
    <CardHeader class="items-center pb-4">
      <CardTitle>Radar Chart - Radius Axis</CardTitle>
      <CardDescription>Showing total visitors for the last 6 months</CardDescription>
    </CardHeader>
    <CardContent class="pb-0">
      <ChartContainer
        :config="chartConfig"
        class="mx-auto aspect-square max-h-[250px]"
      >
        <RadarChart :data="chartData">
          <Tooltip>
            <template #content="{ active, payload, label }">
              <ChartTooltipContent
                :active="active"
                :payload="payload"
                :label="label"
                indicator="line"
                label-key="month"
              />
            </template>
          </Tooltip>
          <PolarAngleAxis data-key="month" />
          <PolarGrid />
          <PolarRadiusAxis
            :angle="60"
            orientation="middle"
            :axis-line="false"
            stroke="hsla(var(--foreground))"
          />
          <Radar
            data-key="desktop"
            fill="var(--color-desktop)"
            :fill-opacity="0.6"
          />
          <Radar
            data-key="mobile"
            fill="var(--color-mobile)"
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
