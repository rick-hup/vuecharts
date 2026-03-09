<script setup lang="ts">
import { Bar, BarChart, Tooltip, XAxis } from 'vccs'
import type { ChartConfig } from '~/components/ui/chart/types'
import ChartTooltipContent from '~/components/ui/chart/ChartTooltipContent.vue'

const chartData = [
  { date: '2024-07-15', running: 450, swimming: 300 },
  { date: '2024-07-16', running: 380, swimming: 420 },
  { date: '2024-07-17', running: 520, swimming: 120 },
  { date: '2024-07-18', running: 140, swimming: 550 },
  { date: '2024-07-19', running: 600, swimming: 350 },
  { date: '2024-07-20', running: 480, swimming: 400 },
]

const chartConfig: ChartConfig = {
  running: { label: 'Running', color: 'var(--chart-1)' },
  swimming: { label: 'Swimming', color: 'var(--chart-2)' },
}

function tickFormatter(value: string) {
  return new Date(value).toLocaleDateString('en-US', { weekday: 'short' })
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Tooltip - No Label</CardTitle>
      <CardDescription>Tooltip with no label.</CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer
        :config="chartConfig"
        class="aspect-auto h-[250px] w-full"
      >
        <BarChart
          accessibility-layer
          :data="chartData"
        >
          <XAxis
            data-key="date"
            :tick-line="false"
            :tick-margin="10"
            :axis-line="false"
            :tick-formatter="tickFormatter"
          />
          <Bar
            data-key="running"
            stack-id="a"
            fill="var(--color-running)"
            :radius="[0, 0, 4, 4]"
          />
          <Bar
            data-key="swimming"
            stack-id="a"
            fill="var(--color-swimming)"
            :radius="[4, 4, 0, 0]"
          />
          <Tooltip
            :cursor="false"
            :default-index="1"
          >
            <template #content="{ active, payload, label }">
              <ChartTooltipContent
                :active="active"
                :payload="payload"
                :label="label"
                hide-indicator
                hide-label
              />
            </template>
          </Tooltip>
        </BarChart>
      </ChartContainer>
    </CardContent>
  </Card>
</template>
