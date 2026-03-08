<script setup lang="ts">
import { TrendingUp } from 'lucide-vue-next'
import { CartesianGrid, Dot, Line, LineChart, Tooltip, XAxis } from 'vccs'
import type { ChartConfig } from '~/components/ui/chart/types'
import ChartTooltipContent from '~/components/ui/chart/ChartTooltipContent.vue'

const chartData = [
  { browser: 'Chrome', visitors: 275, fill: 'var(--color-chrome)' },
  { browser: 'Safari', visitors: 200, fill: 'var(--color-safari)' },
  { browser: 'Firefox', visitors: 187, fill: 'var(--color-firefox)' },
  { browser: 'Edge', visitors: 173, fill: 'var(--color-edge)' },
  { browser: 'Other', visitors: 90, fill: 'var(--color-other)' },
]

const chartConfig: ChartConfig = {
  visitors: {
    label: 'Visitors',
    color: 'var(--chart-2)',
  },
  chrome: {
    label: 'Chrome',
    color: 'var(--chart-1)',
  },
  safari: {
    label: 'Safari',
    color: 'var(--chart-2)',
  },
  firefox: {
    label: 'Firefox',
    color: 'var(--chart-3)',
  },
  edge: {
    label: 'Edge',
    color: 'var(--chart-4)',
  },
  other: {
    label: 'Other',
    color: 'var(--chart-5)',
  },
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Line Chart - Dots Colors</CardTitle>
      <CardDescription>
        Showing total visitors by browser
      </CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer
        :config="chartConfig"
        class="aspect-auto h-[250px] w-full"
      >
        <LineChart
          accessibility-layer
          :data="chartData"
          :margin="{ left: 12, right: 12 }"
        >
          <CartesianGrid :vertical="false" />
          <XAxis
            data-key="browser"
            :tick-line="false"
            :axis-line="false"
            :tick-margin="8"
          />
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
          <Line
            data-key="visitors"
            type="natural"
            stroke="var(--color-visitors)"
            :stroke-width="2"
          >
            <template #dot="dotProps">
              <Dot
                :key="dotProps.payload?.browser"
                :r="5"
                :cx="dotProps.cx"
                :cy="dotProps.cy"
                :fill="dotProps.payload?.fill"
                :stroke="dotProps.payload?.fill"
              />
            </template>
          </Line>
        </LineChart>
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
