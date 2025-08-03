<script setup lang="ts">
import { ref } from 'vue'
import { Area, AreaChart, CartesianGrid, XAxis } from 'vccs'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
} from '@/components/ui/chart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const description = 'An interactive area chart'

const chartData = [
  { date: '2024-04-01', desktop: 222, mobile: 150 },
  { date: '2024-04-02', desktop: 97, mobile: 180 },
  // ... rest of chart data
]

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)',
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--chart-2)',
  },
}

const timeRange = ref('90d')

const filteredData = computed(() => {
  return chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date('2024-06-30')
    let daysToSubtract = 90
    if (timeRange.value === '30d') {
      daysToSubtract = 30
    }
    else if (timeRange.value === '7d') {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })
})
</script>

<template>
  <Card class="pt-0">
    <CardHeader class="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
      <div class="grid flex-1 gap-1">
        <CardTitle>Area Chart - Interactive</CardTitle>
        <CardDescription>
          Showing total visitors for the last 3 months
        </CardDescription>
      </div>
      <Select v-model="timeRange">
        <SelectTrigger
          class="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
          aria-label="Select a value"
        >
          <SelectValue placeholder="Last 3 months" />
        </SelectTrigger>
        <SelectContent class="rounded-xl">
          <SelectItem
            value="90d"
            class="rounded-lg"
          >
            Last 3 months
          </SelectItem>
          <SelectItem
            value="30d"
            class="rounded-lg"
          >
            Last 30 days
          </SelectItem>
          <SelectItem
            value="7d"
            class="rounded-lg"
          >
            Last 7 days
          </SelectItem>
        </SelectContent>
      </Select>
    </CardHeader>
    <CardContent class="px-2 pt-4 sm:px-6 sm:pt-6">
      <ChartContainer
        :config="chartConfig"
        class="aspect-auto h-[250px] w-full"
      >
        <AreaChart :data="filteredData">
          <defs>
            <linearGradient
              id="fillDesktop"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stop-color="var(--color-desktop)"
                stop-opacity="0.8"
              />
              <stop
                offset="95%"
                stop-color="var(--color-desktop)"
                stop-opacity="0.1"
              />
            </linearGradient>
            <linearGradient
              id="fillMobile"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stop-color="var(--color-mobile)"
                stop-opacity="0.8"
              />
              <stop
                offset="95%"
                stop-color="var(--color-mobile)"
                stop-opacity="0.1"
              />
            </linearGradient>
          </defs>
          <CartesianGrid :vertical="false" />
          <XAxis
            data-key="date"
            :tick-line="false"
            :axis-line="false"
            :tick-margin="8"
            :min-tick-gap="32"
          />
          <ChartTooltip
            :cursor="false"
          />
          <Area
            data-key="mobile"
            type="natural"
            fill="url(#fillMobile)"
            stroke="var(--color-mobile)"
            stack-id="a"
          />
          <Area
            data-key="desktop"
            type="natural"
            fill="url(#fillDesktop)"
            stroke="var(--color-desktop)"
            stack-id="a"
          />
          <ChartLegend />
        </AreaChart>
      </ChartContainer>
    </CardContent>
  </Card>
</template>
