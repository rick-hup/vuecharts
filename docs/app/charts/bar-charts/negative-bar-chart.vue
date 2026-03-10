<script setup>
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'vccs'

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: -300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: -200 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: -150 },
]
</script>

<template>
  <ResponsiveContainer
    width="100%"
    :height="300"
  >
    <BarChart :data="data">
      <CartesianGrid stroke-dasharray="3 3" />
      <XAxis data-key="name" />
      <YAxis />
      <Tooltip />
      <Bar data-key="value">
        <Cell
          v-for="(item, index) in data"
          :key="index"
          :fill="item.value > 0 ? '#82ca9d' : '#ff7c7c'"
        />
      </Bar>
    </BarChart>
  </ResponsiveContainer>
</template>
