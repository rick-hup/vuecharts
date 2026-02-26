<script setup lang="ts">
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'vccs'
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
    <BarChart :data="data">
      <CartesianGrid stroke-dasharray="3 3" />
      <XAxis data-key="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar
        data-key="desktop"
        stack-id="a"
        fill="var(--chart-1)"
        radius="0"
      />
      <Bar
        data-key="mobile"
        stack-id="a"
        fill="var(--chart-2)"
        :radius="[4, 4, 0, 0]"
      />
    </BarChart>
  </ChartContainer>
</template>
