<script setup lang="ts">
import { TrendingDown } from 'lucide-vue-next'
import { Bar, BarChart, CartesianGrid, Cell, LabelList, Tooltip } from 'vccs'
import type { ChartConfig } from '~/components/ui/chart/types'
import ChartTooltipContent from '~/components/ui/chart/ChartTooltipContent.vue'

const data = [
  { month: 'January', visitors: 186 },
  { month: 'February', visitors: 205 },
  { month: 'March', visitors: -207 },
  { month: 'April', visitors: 173 },
  { month: 'May', visitors: -209 },
  { month: 'June', visitors: 214 },
]

const chartConfig: ChartConfig = {
  visitors: {
    label: 'Visitors',
  },
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Bar Chart - Negative</CardTitle>
      <CardDescription>January - June 2024</CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer
        :config="chartConfig"
        class="aspect-auto h-[250px] w-full"
      >
        <BarChart
          accessibility-layer
          :data="data"
        >
          <CartesianGrid :vertical="false" />
          <Tooltip
            :cursor="false"
          >
            <template #content="{ active, payload, label }">
              <ChartTooltipContent
                :active="active"
                :payload="payload"
                :label="label"
                hide-label
                hide-indicator
              />
            </template>
          </Tooltip>
          <Bar data-key="visitors">
            <Cell
              v-for="(item, index) in data"
              :key="index"
              :fill="item.visitors > 0 ? 'var(--chart-1)' : 'var(--chart-2)'"
            />
            <LabelList
              position="top"
              data-key="month"
              :fill-opacity="1"
            />
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
