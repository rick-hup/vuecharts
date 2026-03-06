<script setup lang="ts">
import { TrendingUp } from 'lucide-vue-next'
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'vccs'

const data = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
]
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Bar Chart - Custom Label</CardTitle>
      <CardDescription>January - June 2024</CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer class="aspect-auto h-[250px] w-full">
        <BarChart
          :data="data"
          layout="vertical"
          :margin="{ right: 16 }"
        >
          <CartesianGrid :horizontal="false" />
          <YAxis
            data-key="month"
            type="category"
            :tick-line="false"
            :tick-margin="10"
            :axis-line="false"
            :tick-formatter="(value: string) => value.slice(0, 3)"
            :hide="true"
          />
          <XAxis
            data-key="desktop"
            type="number"
            :hide="true"
          />
          <Tooltip :cursor="false" />
          <Bar
            data-key="desktop"
            fill="var(--chart-2)"
            :radius="4"
            :label="{ dataKey: 'month', position: 'insideLeft', offset: 8, fill: 'white', fontSize: 12 }"
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
