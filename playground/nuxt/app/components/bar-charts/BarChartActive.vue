<script setup lang="ts">
import { TrendingUp } from 'lucide-vue-next'
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis } from 'vccs'

const labelMap: Record<string, string> = {
  chrome: 'Chrome',
  safari: 'Safari',
  firefox: 'Firefox',
  edge: 'Edge',
  other: 'Other',
}

const data = [
  { browser: 'chrome', visitors: 187, fill: 'var(--chart-1)' },
  { browser: 'safari', visitors: 200, fill: 'var(--chart-2)' },
  { browser: 'firefox', visitors: 275, fill: 'var(--chart-3)' },
  { browser: 'edge', visitors: 173, fill: 'var(--chart-4)' },
  { browser: 'other', visitors: 90, fill: 'var(--chart-5)' },
]
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Bar Chart - Active</CardTitle>
      <CardDescription>January - June 2024</CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer class="aspect-auto h-[250px] w-full">
        <BarChart :data="data">
          <CartesianGrid :vertical="false" />
          <XAxis
            data-key="browser"
            :tick-line="false"
            :tick-margin="10"
            :axis-line="false"
            :tick-formatter="(value: string) => labelMap[value] ?? value"
          />
          <Tooltip :cursor="false" />
          <Bar
            data-key="visitors"
            :stroke-width="2"
            :radius="8"
            fill-opacity="0.8"
            active-fill-opacity="1"
          />
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
