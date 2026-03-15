<script setup lang="ts">
import { h } from 'vue'
import { TrendingUp } from 'lucide-vue-next'
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis } from 'vccs'
import type { ChartConfig } from '~/components/ui/chart/types'
import ChartTooltipContent from '~/components/ui/chart/ChartTooltipContent.vue'

const data = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
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
}

const tooltipContent = (props: any) => h(ChartTooltipContent, { ...props, indicator: 'dashed' })
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Bar Chart - Multiple</CardTitle>
      <CardDescription>January - June 2024</CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer
        :config="chartConfig"
        class="aspect-auto h-[250px] w-full"
      >
        <BarChart :data="data">
          <CartesianGrid :vertical="false" />
          <XAxis
            data-key="month"
            :tick-line="false"
            :tick-margin="10"
            :axis-line="false"
            :tick-formatter="(value: string) => value.slice(0, 3)"
          />
          <Tooltip
            :cursor="false"
            :content="tooltipContent"
          />
          <Bar
            data-key="desktop"
            fill="var(--color-desktop)"
            :radius="4"
          />
          <Bar
            data-key="mobile"
            fill="var(--color-mobile)"
            :radius="4"
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
