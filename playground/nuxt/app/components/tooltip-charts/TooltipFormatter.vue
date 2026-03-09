<script setup lang="ts">
import { Bar, BarChart, Tooltip, XAxis } from 'vccs'
import type { ChartConfig } from '~/components/ui/chart/types'

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

function getLabel(name: string) {
  return chartConfig[name]?.label ?? name
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Tooltip - Formatter</CardTitle>
      <CardDescription>Tooltip with custom formatter.</CardDescription>
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
            <template #content="{ active, payload }">
              <div
                v-if="active && payload?.length"
                class="grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl"
              >
                <div
                  v-for="item in payload"
                  :key="item.dataKey"
                  class="flex min-w-[130px] items-center text-muted-foreground"
                >
                  <div
                    class="mr-2 h-2.5 w-2.5 shrink-0 rounded-[2px]"
                    :style="{ background: `var(--color-${item.dataKey})` }"
                  />
                  {{ getLabel(item.dataKey as string) }}
                  <div class="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                    {{ item.value }}
                    <span class="font-normal text-muted-foreground">kcal</span>
                  </div>
                </div>
              </div>
            </template>
          </Tooltip>
        </BarChart>
      </ChartContainer>
    </CardContent>
  </Card>
</template>
