<script setup lang="ts">
import { TrendingUp } from 'lucide-vue-next'
import { Bar, BarChart, CartesianGrid, LabelList, Tooltip, XAxis, YAxis } from 'vccs'
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
  label: {
    color: 'var(--background)',
  },
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Bar Chart - Custom Label</CardTitle>
      <CardDescription>January - June 2024</CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer
        accessibility-layer
        :config="chartConfig"
        class="aspect-auto h-[250px] w-full"
      >
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
          <Tooltip
            :cursor="false"
          >
            <template #content="{ active, payload, label }">
              <ChartTooltipContent
                :active="active"
                :payload="payload"
                :label="label"
                name-key="views"
                class="w-[150px]"
                indicator="line"
              />
            </template>
          </Tooltip>
          <Bar
            data-key="desktop"
            fill="var(--color-desktop)"
            :radius="4"
          >
            <LabelList
              data-key="month"
              position="insideLeft"
              :offset="8"
              class="fill-(--color-label)"
              :font-size="12"
            />
            <LabelList
              data-key="desktop"
              position="right"
              :offset="8"
              class="fill-foreground"
              :font-size="12"
            />
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
