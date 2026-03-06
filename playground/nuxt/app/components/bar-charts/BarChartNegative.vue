<script setup lang="ts">
import { TrendingDown } from 'lucide-vue-next'
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis } from 'vccs'

const data = [
  { month: 'January', visitors: 186 },
  { month: 'February', visitors: 305 },
  { month: 'March', visitors: -237 },
  { month: 'April', visitors: 73 },
  { month: 'May', visitors: -209 },
  { month: 'June', visitors: 214 },
]
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Bar Chart - Negative</CardTitle>
      <CardDescription>January - June 2024</CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer class="aspect-auto h-[250px] w-full">
        <BarChart :data="data">
          <CartesianGrid :vertical="false" />
          <XAxis
            data-key="month"
            :tick-line="false"
            :tick-margin="10"
            :axis-line="false"
            :tick-formatter="(value: string) => value.slice(0, 3)"
          />
          <Tooltip />
          <Bar
            data-key="visitors"
            fill="var(--chart-1)"
          >
            <template #shape="props">
              <rect
                :x="props.x"
                :y="props.y"
                :width="props.width"
                :height="props.height"
                :rx="4"
                :fill="props.value >= 0 ? 'var(--chart-1)' : 'var(--chart-2)'"
              />
            </template>
          </Bar>
        </BarChart>
      </ChartContainer>
    </CardContent>
    <CardFooter class="flex-col items-start gap-2 text-sm">
      <div class="flex gap-2 font-medium leading-none">
        Trending down by 3.1% this month
        <TrendingDown class="size-4" />
      </div>
      <div class="leading-none text-muted-foreground">
        Showing total visitors for the last 6 months
      </div>
    </CardFooter>
  </Card>
</template>
