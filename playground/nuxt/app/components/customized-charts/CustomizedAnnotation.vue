<script setup lang="ts">
import { Pencil } from 'lucide-vue-next'
import { CartesianGrid, Customized, Line, LineChart, Tooltip, XAxis, YAxis } from 'vccs'
import type { ChartConfig } from '~/components/ui/chart/types'
import ChartTooltipContent from '~/components/ui/chart/ChartTooltipContent.vue'

const chartData = [
  { month: 'Jan', sales: 186 },
  { month: 'Feb', sales: 305 },
  { month: 'Mar', sales: 237 },
  { month: 'Apr', sales: 73 },
  { month: 'May', sales: 209 },
  { month: 'Jun', sales: 354 },
]

const chartConfig: ChartConfig = {
  sales: {
    label: 'Sales',
    color: 'var(--chart-1)',
  },
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Customized - Annotation</CardTitle>
      <CardDescription>
        Draw custom SVG elements using chart offset
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
          <CartesianGrid :vertical="false" />
          <XAxis
            data-key="month"
            :tick-line="false"
            :axis-line="false"
            :tick-margin="8"
          />
          <YAxis
            :tick-line="false"
            :axis-line="false"
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
            data-key="sales"
            type="natural"
            stroke="var(--color-sales)"
            :stroke-width="2"
            :dot="false"
          />
          <Customized>
            <template #default="{ offset }">
              <line
                :x1="offset.left"
                :x2="offset.left + 1000"
                :y1="offset.top"
                :y2="offset.top"
                stroke="var(--color-sales)"
                stroke-dasharray="4 4"
                stroke-width="1"
                opacity="0.5"
              />
              <text
                :x="offset.left + 4"
                :y="offset.top - 6"
                fill="var(--color-sales)"
                font-size="11"
              >
                Plot area top
              </text>
            </template>
          </Customized>
        </LineChart>
      </ChartContainer>
    </CardContent>
    <CardFooter>
      <div class="flex w-full items-start gap-2 text-sm">
        <div class="grid gap-2">
          <div class="flex items-center gap-2 font-medium leading-none">
            Custom annotation via offset
            <Pencil class="size-4" />
          </div>
          <div class="flex items-center gap-2 leading-none text-muted-foreground">
            January - June 2024
          </div>
        </div>
      </div>
    </CardFooter>
  </Card>
</template>
