<script setup>
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'vccs'

const data = [
  { name: 'A', value: 400 },
  { name: 'B', value: 300 },
  { name: 'C', value: 200 },
  { name: 'D', value: 150 },
  { name: 'E', value: 100 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']
</script>

<template>
  <ResponsiveContainer
    width="100%"
    :height="300"
  >
    <PieChart>
      <Tooltip />
      <Pie
        :data="data"
        data-key="value"
        name-key="name"
        cx="50%"
        cy="50%"
        :outer-radius="120"
        :start-angle="180"
        :end-angle="0"
        fill="#8884d8"
      >
        <Cell
          v-for="(entry, index) in data"
          :key="index"
          :fill="COLORS[index]"
        />
      </Pie>
    </PieChart>
  </ResponsiveContainer>
</template>
