<script setup lang="ts">
import { h } from 'vue'
import { TrendingUp } from 'lucide-vue-next'
import { Bar, BarChart, Tooltip, XAxis, YAxis } from 'vccs'
import type { ChartConfig } from '~/components/ui/chart/types'
import ChartTooltipContent from '~/components/ui/chart/ChartTooltipContent.vue'

const data = [
  { browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
  { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
  { browser: 'firefox', visitors: 187, fill: 'var(--color-firefox)' },
  { browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
  { browser: 'other', visitors: 90, fill: 'var(--color-other)' },
]

const chartConfig: ChartConfig = {
  visitors: {
    label: 'Visitors',
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

const tooltipContent = (props: any) => h(ChartTooltipContent, { ...props, hideLabel: true })
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Bar Chart - Mixed</CardTitle>
      <CardDescription>January - June 2024</CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer
        :config="chartConfig"
        class="aspect-auto h-[250px] w-full"
      >
        <BarChart
          :data="data"
          layout="vertical"
          :margin="{ left: 0 }"
        >
          <YAxis
            data-key="browser"
            type="category"
            :tick-line="false"
            :tick-margin="10"
            :axis-line="false"
            :tick-formatter="(value: string) => chartConfig[value]?.label ?? value"
          />
          <XAxis
            data-key="visitors"
            type="number"
            :hide="true"
          />
          <Tooltip
            :cursor="false"
            :content="tooltipContent"
          />
          <Bar
            data-key="visitors"
            :radius="5"
          >
            <template #shape="props">
              <rect
                :x="props.x"
                :y="props.y"
                :width="props.width"
                :height="props.height"
                :rx="5"
                :fill="props.payload?.fill ?? 'var(--chart-1)'"
              />
            </template>
          </Bar>
        </BarChart>
      </ChartContainer>
    </CardContent>
    <CardFooter class="flex-col items-start gap-2 text-sm">
      <div class="flex gap-2 font-medium leading-none">
        Trending up by 5.2% this month
        <TrendingUp class="size-4" />
      </div>
      <div class="leading-none text-muted-foreground">
        Showing total visitors for the last 6 months
      </div>
    </CardFooter>
  </Card>
</template>
