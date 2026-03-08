<script setup lang="ts">
import { TrendingUp } from 'lucide-vue-next'
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis } from 'vccs'
import type { ChartConfig } from '~/components/ui/chart/types'
import ChartTooltipContent from '~/components/ui/chart/ChartTooltipContent.vue'

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
]

const chartConfig: ChartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)',
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--chart-2)',
  },
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Area Chart - Gradient</CardTitle>
      <CardDescription>
        Showing total visitors for the last 6 months
      </CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer
        :config="chartConfig"
        class="aspect-auto h-[250px] w-full"
      >
        <AreaChart
          accessibility-layer
          :data="chartData"
          :margin="{ left: 12, right: 12 }"
        >
          <CartesianGrid :vertical="false" />
          <XAxis
            data-key="month"
            :tick-line="false"
            :axis-line="false"
            :tick-margin="8"
            :tick-formatter="(value: string) => value.slice(0, 3)"
          />
          <Tooltip :cursor="false">
            <template #content="{ active, payload, label }">
              <ChartTooltipContent
                :active="active"
                :payload="payload"
                :label="label"
              />
            </template>
          </Tooltip>
          <defs>
            <linearGradient
              id="fillDesktop"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stop-color="var(--color-desktop)"
                stop-opacity="0.8"
              />
              <stop
                offset="95%"
                stop-color="var(--color-desktop)"
                stop-opacity="0.1"
              />
            </linearGradient>
            <linearGradient
              id="fillMobile"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stop-color="var(--color-mobile)"
                stop-opacity="0.8"
              />
              <stop
                offset="95%"
                stop-color="var(--color-mobile)"
                stop-opacity="0.1"
              />
            </linearGradient>
          </defs>
          <Area
            data-key="mobile"
            type="natural"
            fill="url(#fillMobile)"
            :fill-opacity="0.4"
            stroke="var(--color-mobile)"
            stack-id="a"
          />
          <Area
            data-key="desktop"
            type="natural"
            fill="url(#fillDesktop)"
            :fill-opacity="0.4"
            stroke="var(--color-desktop)"
            stack-id="a"
          />
        </AreaChart>
      </ChartContainer>
    </CardContent>
    <CardFooter>
      <div class="flex w-full items-start gap-2 text-sm">
        <div class="grid gap-2">
          <div class="flex items-center gap-2 font-medium leading-none">
            Trending up by 5.2% this month
            <TrendingUp class="size-4" />
          </div>
          <div class="flex items-center gap-2 leading-none text-muted-foreground">
            January - June 2024
          </div>
        </div>
      </div>
    </CardFooter>
  </Card>
</template>
