<script setup lang="ts">
import { TrendingUp } from 'lucide-vue-next'
import { Pie, PieChart, Tooltip } from 'vccs'
import type { ChartConfig } from '~/components/ui/chart/types'
import ChartTooltipContent from '~/components/ui/chart/ChartTooltipContent.vue'

const desktopData = [
  { month: 'January', desktop: 186, fill: 'var(--color-january)' },
  { month: 'February', desktop: 305, fill: 'var(--color-february)' },
  { month: 'March', desktop: 237, fill: 'var(--color-march)' },
  { month: 'April', desktop: 173, fill: 'var(--color-april)' },
  { month: 'May', desktop: 209, fill: 'var(--color-may)' },
]

const mobileData = [
  { month: 'January', mobile: 80, fill: 'var(--color-january)' },
  { month: 'February', mobile: 200, fill: 'var(--color-february)' },
  { month: 'March', mobile: 120, fill: 'var(--color-march)' },
  { month: 'April', mobile: 190, fill: 'var(--color-april)' },
  { month: 'May', mobile: 130, fill: 'var(--color-may)' },
]

const chartConfig: ChartConfig = {
  visitors: { label: 'Visitors' },
  desktop: { label: 'Desktop' },
  mobile: { label: 'Mobile' },
  january: { label: 'January', color: 'var(--chart-1)' },
  february: { label: 'February', color: 'var(--chart-2)' },
  march: { label: 'March', color: 'var(--chart-3)' },
  april: { label: 'April', color: 'var(--chart-4)' },
  may: { label: 'May', color: 'var(--chart-5)' },
}
</script>

<template>
  <Card class="flex flex-col">
    <CardHeader class="items-center pb-0">
      <CardTitle>Pie Chart - Stacked</CardTitle>
      <CardDescription>January - June 2024</CardDescription>
    </CardHeader>
    <CardContent class="flex-1 pb-0">
      <ChartContainer
        :config="chartConfig"
        class="mx-auto aspect-square max-h-[250px]"
      >
        <PieChart>
          <Tooltip>
            <template #content="{ active, payload, label }">
              <ChartTooltipContent
                :active="active"
                :payload="payload"
                :label="label"
                label-key="visitors"
                name-key="month"
                indicator="line"
              />
            </template>
          </Tooltip>
          <Pie
            :data="desktopData"
            data-key="desktop"
            :outer-radius="60"
          />
          <Pie
            :data="mobileData"
            data-key="mobile"
            :inner-radius="70"
            :outer-radius="90"
          />
        </PieChart>
      </ChartContainer>
    </CardContent>
    <CardFooter class="flex-col gap-2 text-sm">
      <div class="flex items-center gap-2 font-medium leading-none">
        Trending up by 5.2% this month
        <TrendingUp class="size-4" />
      </div>
      <div class="leading-none text-muted-foreground">
        Showing total visitors for the last 6 months
      </div>
    </CardFooter>
  </Card>
</template>
