<script setup lang="ts">
import { Bar, BarChart, Legend, XAxis, YAxis } from 'vccs'

const data = [
  { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 300, pv: 4567, amt: 2400 },
  { name: 'Page C', uv: 300, pv: 1398, amt: 2400 },
  { name: 'Page D', uv: 200, pv: 9800, amt: 2400 },
  { name: 'Page E', uv: 278, pv: 3908, amt: 2400 },
  { name: 'Page F', uv: 189, pv: 4800, amt: 2400 },
]
</script>

<template>
  <div class="container py-10">
    <div class="mb-10 space-y-2">
      <h1 class="text-3xl font-bold tracking-tight">
        Test Charts
      </h1>
      <p class="text-muted-foreground">
        Visual verification of unit test cases.
      </p>
    </div>

    <div class="grid flex-1 scroll-mt-20 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div class="rounded-lg border p-6">
        <h3 class="mb-4 text-lg font-semibold">
          BarChart: Legend Wrapper
        </h3>
        <p class="text-muted-foreground mb-4 text-sm">
          Expected: Legend visible below chart with "uv" entry
        </p>
        <ClientOnly>
          <BarChart
            :width="500"
            :height="300"
            :data="[...data]"
          >
            <XAxis data-key="name" />
            <YAxis />
            <Legend />
            <Bar
              data-key="uv"
              fill="#8884d8"
              :is-animation-active="false"
            />
          </BarChart>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>
