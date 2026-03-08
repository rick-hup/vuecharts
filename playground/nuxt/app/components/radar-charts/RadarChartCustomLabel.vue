<script setup lang="ts">
import { TrendingUp } from 'lucide-vue-next'
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, Tooltip } from 'vccs'
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

function getDataByMonth(month: string) {
  return chartData.find(d => d.month === month)
}
</script>

<template>
  <Card class="flex flex-col">
    <CardHeader class="items-center pb-4">
      <CardTitle>Radar Chart - Custom Label</CardTitle>
      <CardDescription>Showing total visitors for the last 6 months</CardDescription>
    </CardHeader>
    <CardContent class="pb-0">
      <ChartContainer
        :config="chartConfig"
        class="mx-auto aspect-square max-h-[250px]"
      >
        <RadarChart
          :data="chartData"
          :margin="{ top: 10, right: 10, bottom: 10, left: 10 }"
        >
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
          <PolarAngleAxis data-key="month">
            <template #tick="{ x, y, value, textAnchor }">
              <text
                :x="x"
                :y="y"
                :text-anchor="textAnchor"
                dominant-baseline="central"
                style="font-size: 10px;"
              >
                <tspan
                  class="fill-foreground"
                  :x="x"
                  dy="-0.6em"
                >
                  {{ getDataByMonth(value)?.desktop }}/{{ getDataByMonth(value)?.mobile }}
                </tspan>
                <tspan
                  class="fill-muted-foreground"
                  :x="x"
                  dy="1.2em"
                >
                  {{ value.slice(0, 3) }}
                </tspan>
              </text>
            </template>
          </PolarAngleAxis>
          <PolarGrid />
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
