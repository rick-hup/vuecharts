<script setup lang="ts">
import { Area, AreaChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'vccs'
import ChartContainer from '~/components/docs/ChartContainer.vue'

const data = [
  { name: 'Jan', desktop: 186, mobile: 80 },
  { name: 'Feb', desktop: 305, mobile: 200 },
  { name: 'Mar', desktop: 237, mobile: 120 },
  { name: 'Apr', desktop: 73, mobile: 190 },
  { name: 'May', desktop: 209, mobile: 130 },
  { name: 'Jun', desktop: 214, mobile: 140 },
]
</script>

<template>
  <ChartContainer>
    <AreaChart :data="data">
      <CartesianGrid stroke-dasharray="3 3" />
      <XAxis data-key="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Area
        type="monotone"
        data-key="desktop"
        stack-id="1"
        stroke="var(--chart-1)"
        fill="var(--chart-1)"
        fill-opacity="0.4"
      />
      <Area
        type="monotone"
        data-key="mobile"
        stack-id="1"
        stroke="var(--chart-2)"
        fill="var(--chart-2)"
        fill-opacity="0.4"
      />
    </AreaChart>
  </ChartContainer>
</template>
