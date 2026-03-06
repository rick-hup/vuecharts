<script setup lang="ts">
import { h } from 'vue'
import { TrendingUp } from 'lucide-vue-next'
import { Bar, BarChart, CartesianGrid, Tooltip } from 'vccs'
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

const tooltipContent = (props: any) => h(ChartTooltipContent, { ...props, hideLabel: true, hideIndicator: true })
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
        <BarChart :data="data">
          <CartesianGrid :vertical="false" />
          <Tooltip
            :cursor="false"
            :content="tooltipContent"
          />
          <Bar
            data-key="visitors"
            fill="var(--chart-1)"
            :label="{ dataKey: 'month', position: 'top' }"
          >
            <template #shape="props">
              <rect
                :x="props.x"
                :y="props.height < 0 ? props.y + props.height : props.y"
                :width="Math.abs(props.width || 0)"
                :height="Math.abs(props.height || 0)"
                :rx="4"
                :fill="(props.value ?? 0) > 0 ? 'var(--chart-1)' : 'var(--chart-2)'"
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
