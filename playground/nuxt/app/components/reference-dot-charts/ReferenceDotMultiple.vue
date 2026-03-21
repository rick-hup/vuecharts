<script setup lang="ts">
import { CartesianGrid, Line, LineChart, ReferenceDot, XAxis, YAxis } from 'vccs'
import type { ChartConfig } from '~/components/ui/chart/types'

const chartData = [
  { month: 'Jan', revenue: 4000, cost: 2400 },
  { month: 'Feb', revenue: 3000, cost: 1398 },
  { month: 'Mar', revenue: 2000, cost: 1800 },
  { month: 'Apr', revenue: 2780, cost: 3908 },
  { month: 'May', revenue: 1890, cost: 4800 },
  { month: 'Jun', revenue: 2390, cost: 3800 },
  { month: 'Jul', revenue: 3490, cost: 2300 },
]

const chartConfig: ChartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'var(--chart-1)',
  },
  cost: {
    label: 'Cost',
    color: 'var(--chart-2)',
  },
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>ReferenceDot - Multiple</CardTitle>
      <CardDescription>
        Mark max revenue and max cost with reference dots
      </CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer
        :config="chartConfig"
        class="aspect-auto h-[250px] w-full"
      >
        <LineChart
          :data="chartData"
          :margin="{ left: 12, right: 12, top: 20 }"
        >
          <CartesianGrid stroke-dasharray="3 3" />
          <XAxis
            data-key="month"
            :tick-line="false"
            :axis-line="false"
            :tick-margin="8"
          />
          <YAxis
            :tick-line="false"
            :axis-line="false"
          />
          <Line
            data-key="revenue"
            type="monotone"
            stroke="var(--color-revenue)"
            :stroke-width="2"
            :dot="false"
          />
          <Line
            data-key="cost"
            type="monotone"
            stroke="var(--color-cost)"
            :stroke-width="2"
            :dot="false"
          />
          <!-- Max revenue -->
          <ReferenceDot
            x="Jan"
            :y="4000"
            :r="6"
            fill="var(--color-revenue)"
            stroke="white"
            :stroke-width="2"
            :label="{ value: 'Max Revenue', position: 'top', offset: 10 }"
          />
          <!-- Max cost -->
          <ReferenceDot
            x="May"
            :y="4800"
            :r="6"
            fill="var(--color-cost)"
            stroke="white"
            :stroke-width="2"
            :label="{ value: 'Max Cost', position: 'top', offset: 10 }"
          />
        </LineChart>
      </ChartContainer>
    </CardContent>
    <CardFooter>
      <div class="flex w-full items-start gap-2 text-sm">
        <div class="flex items-center gap-2 leading-none text-muted-foreground">
          Revenue vs Cost · Jan - Jul 2024
        </div>
      </div>
    </CardFooter>
  </Card>
</template>
