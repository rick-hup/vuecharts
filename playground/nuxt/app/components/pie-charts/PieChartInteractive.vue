<script setup lang="ts">
import { computed, ref } from 'vue'
import { Pie, PieChart, Sector, Tooltip } from 'vccs'
import type { ChartConfig } from '~/components/ui/chart/types'
import ChartTooltipContent from '~/components/ui/chart/ChartTooltipContent.vue'

const desktopData = [
  { month: 'january', desktop: 186, fill: 'var(--color-january)' },
  { month: 'february', desktop: 305, fill: 'var(--color-february)' },
  { month: 'march', desktop: 237, fill: 'var(--color-march)' },
  { month: 'april', desktop: 173, fill: 'var(--color-april)' },
  { month: 'may', desktop: 209, fill: 'var(--color-may)' },
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

const activeMonth = ref('january')
const activeIndex = computed(() =>
  desktopData.findIndex(item => item.month === activeMonth.value),
)
const months = desktopData.map(item => item.month)
</script>

<template>
  <Card class="flex flex-col">
    <CardHeader class="flex-row items-start space-y-0 pb-0">
      <div class="grid gap-1">
        <CardTitle>Pie Chart - Interactive</CardTitle>
        <CardDescription>January - May 2024</CardDescription>
      </div>
      <Select v-model="activeMonth">
        <SelectTrigger
          class="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
          aria-label="Select a value"
        >
          <SelectValue placeholder="Select month" />
        </SelectTrigger>
        <SelectContent
          align="end"
          class="rounded-xl"
        >
          <SelectItem
            v-for="key in months"
            :key="key"
            :value="key"
            class="rounded-lg [&_span]:flex"
          >
            <div class="flex items-center gap-2 text-xs">
              <span
                class="flex size-3 shrink-0 rounded-sm"
                :style="{ backgroundColor: `var(--color-${key})` }"
              />
              {{ chartConfig[key]?.label }}
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </CardHeader>
    <CardContent class="flex flex-1 justify-center pb-0">
      <ChartContainer
        :config="chartConfig"
        class="mx-auto aspect-square w-full max-h-[300px]"
      >
        <PieChart>
          <Tooltip :cursor="false">
            <template #content="{ active, payload, label }">
              <ChartTooltipContent
                :active="active"
                :payload="payload"
                :label="label"
                hide-label
              />
            </template>
          </Tooltip>
          <Pie
            :data="desktopData"
            data-key="desktop"
            name-key="month"
            :inner-radius="60"
            :stroke-width="5"
            :active-index="activeIndex"
          >
            <template #shape="sp">
              <g v-if="sp.isActive">
                <Sector
                  :cx="sp.cx"
                  :cy="sp.cy"
                  :inner-radius="sp.innerRadius"
                  :outer-radius="sp.outerRadius + 10"
                  :start-angle="sp.startAngle"
                  :end-angle="sp.endAngle"
                  :fill="sp.fill"
                  :stroke="sp.stroke"
                />
                <Sector
                  :cx="sp.cx"
                  :cy="sp.cy"
                  :inner-radius="sp.outerRadius + 12"
                  :outer-radius="sp.outerRadius + 25"
                  :start-angle="sp.startAngle"
                  :end-angle="sp.endAngle"
                  :fill="sp.fill"
                />
              </g>
              <Sector
                v-else
                :cx="sp.cx"
                :cy="sp.cy"
                :inner-radius="sp.innerRadius"
                :outer-radius="sp.outerRadius"
                :start-angle="sp.startAngle"
                :end-angle="sp.endAngle"
                :fill="sp.fill"
                :stroke="sp.stroke"
              />
            </template>
          </Pie>
          <text
            x="50%"
            y="46%"
            text-anchor="middle"
            dominant-baseline="middle"
            class="fill-foreground"
            style="font-size: 1.875rem; font-weight: 700;"
          >
            {{ desktopData[activeIndex].desktop.toLocaleString() }}
          </text>
          <text
            x="50%"
            y="56%"
            text-anchor="middle"
            dominant-baseline="middle"
            class="fill-muted-foreground"
            style="font-size: 0.875rem;"
          >
            Visitors
          </text>
        </PieChart>
      </ChartContainer>
    </CardContent>
  </Card>
</template>
