<script setup lang="ts">
import { TrendingUp } from 'lucide-vue-next'
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'vccs'

const data = [
  { month: 'January', desktop: 186 },
  { month: 'February', desktop: 305 },
  { month: 'March', desktop: 237 },
  { month: 'April', desktop: 73 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 },
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
          <XAxis
            type="number"
            :hide="true"
          />
          <YAxis
            data-key="month"
            type="category"
            :tick-line="false"
            :axis-line="false"
            :tick-margin="10"
            :hide="true"
          />
          <Tooltip />
          <Bar
            data-key="desktop"
            fill="var(--chart-1)"
            :radius="5"
            :label="{ position: 'insideLeft', offset: 8, fill: 'white', fontSize: 12 }"
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
