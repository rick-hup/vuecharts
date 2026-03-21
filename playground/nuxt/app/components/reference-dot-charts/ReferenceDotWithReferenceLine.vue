<script setup lang="ts">
import { CartesianGrid, Line, LineChart, ReferenceDot, ReferenceLine, Tooltip, XAxis, YAxis } from 'vccs'
import type { ChartConfig } from '~/components/ui/chart/types'
import ChartTooltipContent from '~/components/ui/chart/ChartTooltipContent.vue'

const chartData = [
  { day: 'Mon', temperature: 18 },
  { day: 'Tue', temperature: 22 },
  { day: 'Wed', temperature: 25 },
  { day: 'Thu', temperature: 31 },
  { day: 'Fri', temperature: 27 },
  { day: 'Sat', temperature: 20 },
  { day: 'Sun', temperature: 16 },
]

const chartConfig: ChartConfig = {
  temperature: {
    label: 'Temperature',
    color: 'var(--chart-1)',
  },
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>ReferenceDot + ReferenceLine</CardTitle>
      <CardDescription>
        Combine reference elements to annotate charts
      </CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer
        :config="chartConfig"
        class="aspect-auto h-[250px] w-full"
      >
        <LineChart
          :data="chartData"
          :margin="{ left: 12, right: 12, top: 20 }"
        >
          <CartesianGrid stroke-dasharray="3 3" />
          <XAxis
            data-key="day"
            :tick-line="false"
            :axis-line="false"
            :tick-margin="8"
          />
          <YAxis
            :tick-line="false"
            :axis-line="false"
            unit="°C"
          />
          <Tooltip :cursor="false">
            <template #content="{ active, payload, label }">
              <ChartTooltipContent
                :active="active"
                :payload="payload"
                :label="label"
              />
            </template>
          </Tooltip>
          <Line
            data-key="temperature"
            type="monotone"
            stroke="var(--color-temperature)"
            :stroke-width="2"
            :dot="{ r: 3 }"
          />
          <!-- Average temperature line -->
          <ReferenceLine
            :y="22.7"
            stroke="#94a3b8"
            stroke-dasharray="4 4"
            label="Avg"
          />
          <!-- Highlight the hottest day -->
          <ReferenceDot
            x="Thu"
            :y="31"
            :r="8"
            fill="#ef4444"
            stroke="white"
            :stroke-width="2"
            :label="{ value: '31°C', position: 'top', offset: 12 }"
          />
          <!-- Highlight the coldest day -->
          <ReferenceDot
            x="Sun"
            :y="16"
            :r="8"
            fill="#3b82f6"
            stroke="white"
            :stroke-width="2"
            :label="{ value: '16°C', position: 'bottom', offset: 12 }"
          />
        </LineChart>
      </ChartContainer>
    </CardContent>
    <CardFooter>
      <div class="flex w-full items-start gap-2 text-sm">
        <div class="flex items-center gap-2 leading-none text-muted-foreground">
          Weekly temperature · Hot & cold extremes
        </div>
      </div>
    </CardFooter>
  </Card>
</template>
