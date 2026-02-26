<script setup lang="ts">
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'vccs'
import ChartContainer from '~/components/docs/ChartContainer.vue'

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 700 },
]
</script>

<template>
  <ChartContainer>
    <BarChart :data="data">
      <CartesianGrid stroke-dasharray="3 3" />
      <XAxis data-key="name" />
      <YAxis />
      <Tooltip />
      <Bar
        data-key="value"
        fill="var(--chart-1)"
        radius="4"
      />
    </BarChart>
  </ChartContainer>
</template>
