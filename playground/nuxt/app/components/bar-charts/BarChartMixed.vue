<script setup lang="ts">
import { TrendingUp } from 'lucide-vue-next'
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'vccs'

const data = [
  { browser: 'Chrome', visitors: 275, fill: 'var(--chart-1)' },
  { browser: 'Safari', visitors: 200, fill: 'var(--chart-2)' },
  { browser: 'Firefox', visitors: 187, fill: 'var(--chart-3)' },
  { browser: 'Edge', visitors: 173, fill: 'var(--chart-4)' },
  { browser: 'Other', visitors: 90, fill: 'var(--chart-5)' },
]
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Bar Chart - Mixed</CardTitle>
      <CardDescription>January - June 2024</CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer class="aspect-auto h-[250px] w-full">
        <BarChart
          :data="data"
          layout="vertical"
          :margin="{ left: 0 }"
        >
          <CartesianGrid :horizontal="false" />
          <XAxis
            type="number"
            :hide="true"
          />
          <YAxis
            data-key="browser"
            type="category"
            :tick-line="false"
            :tick-margin="10"
            :axis-line="false"
          />
          <Tooltip />
          <Bar
            data-key="visitors"
            :radius="5"
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
