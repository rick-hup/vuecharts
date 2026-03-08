<script setup lang="ts">
import { Legend, Pie, PieChart } from 'vccs'
import type { ChartConfig } from '~/components/ui/chart/types'
import ChartLegendContent from '~/components/ui/chart/ChartLegendContent.vue'

const chartData = [
  { browser: 'Chrome', visitors: 275, fill: 'var(--color-chrome)' },
  { browser: 'Safari', visitors: 200, fill: 'var(--color-safari)' },
  { browser: 'Firefox', visitors: 187, fill: 'var(--color-firefox)' },
  { browser: 'Edge', visitors: 173, fill: 'var(--color-edge)' },
  { browser: 'Other', visitors: 90, fill: 'var(--color-other)' },
]

const chartConfig: ChartConfig = {
  visitors: { label: 'Visitors' },
  chrome: { label: 'Chrome', color: 'var(--chart-1)' },
  safari: { label: 'Safari', color: 'var(--chart-2)' },
  firefox: { label: 'Firefox', color: 'var(--chart-3)' },
  edge: { label: 'Edge', color: 'var(--chart-4)' },
  other: { label: 'Other', color: 'var(--chart-5)' },
}
</script>

<template>
  <Card class="flex flex-col">
    <CardHeader class="items-center pb-0">
      <CardTitle>Pie Chart - Legend</CardTitle>
      <CardDescription>January - June 2024</CardDescription>
    </CardHeader>
    <CardContent class="flex-1 pb-0">
      <ChartContainer
        :config="chartConfig"
        class="mx-auto aspect-square max-h-[300px]"
      >
        <PieChart>
          <Pie
            :data="chartData"
            data-key="visitors"
            name-key="browser"
          />
          <Legend>
            <template #content="legendProps">
              <ChartLegendContent
                v-bind="legendProps"
                name-key="browser"
              />
            </template>
          </Legend>
        </PieChart>
      </ChartContainer>
    </CardContent>
  </Card>
</template>
