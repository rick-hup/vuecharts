<script setup lang="ts">
import { Funnel, FunnelChart, Legend, Tooltip } from 'vccs'
import type { ChartConfig } from '~/components/ui/chart/types'
import ChartTooltipContent from '~/components/ui/chart/ChartTooltipContent.vue'
import ChartLegendContent from '~/components/ui/chart/ChartLegendContent.vue'

const chartData = [
  { stage: 'Impressions', value: 12000, fill: 'var(--color-impressions)' },
  { stage: 'Clicks', value: 4800, fill: 'var(--color-clicks)' },
  { stage: 'Signups', value: 1500, fill: 'var(--color-signups)' },
  { stage: 'Active', value: 680, fill: 'var(--color-active)' },
]

const chartConfig: ChartConfig = {
  value: { label: 'Count' },
  impressions: { label: 'Impressions', color: 'var(--chart-1)' },
  clicks: { label: 'Clicks', color: 'var(--chart-2)' },
  signups: { label: 'Signups', color: 'var(--chart-3)' },
  active: { label: 'Active', color: 'var(--chart-4)' },
}
</script>

<template>
  <Card class="flex flex-col">
    <CardHeader class="items-center pb-0">
      <CardTitle>Funnel Chart - Legend</CardTitle>
      <CardDescription>With legend component</CardDescription>
    </CardHeader>
    <CardContent class="flex-1 pb-0">
      <ChartContainer
        :config="chartConfig"
        class="mx-auto aspect-square max-h-[300px]"
      >
        <FunnelChart
          :width="400"
          :height="300"
        >
          <Tooltip :cursor="false">
            <template #content="{ active, payload, label }">
              <ChartTooltipContent
                :active="active"
                :payload="payload"
                :label="label"
              />
            </template>
          </Tooltip>
          <Funnel
            :data="chartData"
            data-key="value"
            name-key="stage"
          />
          <Legend>
            <template #content="legendProps">
              <ChartLegendContent
                v-bind="legendProps"
                name-key="stage"
              />
            </template>
          </Legend>
        </FunnelChart>
      </ChartContainer>
    </CardContent>
  </Card>
</template>
