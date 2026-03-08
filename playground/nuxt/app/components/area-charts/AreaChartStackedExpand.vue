<script setup lang="ts">
import { TrendingUp } from 'lucide-vue-next'
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis } from 'vccs'
import type { ChartConfig } from '~/components/ui/chart/types'
import ChartTooltipContent from '~/components/ui/chart/ChartTooltipContent.vue'

const chartData = [
  { month: 'January', desktop: 186, mobile: 80, other: 45 },
  { month: 'February', desktop: 305, mobile: 200, other: 100 },
  { month: 'March', desktop: 237, mobile: 120, other: 150 },
  { month: 'April', desktop: 73, mobile: 190, other: 50 },
  { month: 'May', desktop: 209, mobile: 130, other: 100 },
  { month: 'June', desktop: 214, mobile: 140, other: 160 },
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
  other: {
    label: 'Other',
    color: 'var(--chart-3)',
  },
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Area Chart - Stacked Expanded</CardTitle>
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
          :margin="{ left: 12, right: 12, top: 12 }"
          stack-offset="expand"
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
                indicator="line"
              />
            </template>
          </Tooltip>
          <Area
            data-key="other"
            type="natural"
            fill="var(--color-other)"
            :fill-opacity="0.1"
            stroke="var(--color-other)"
            stack-id="a"
          />
          <Area
            data-key="mobile"
            type="natural"
            fill="var(--color-mobile)"
            :fill-opacity="0.4"
            stroke="var(--color-mobile)"
            stack-id="a"
          />
          <Area
            data-key="desktop"
            type="natural"
            fill="var(--color-desktop)"
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
