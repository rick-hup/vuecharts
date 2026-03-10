<script setup>
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'vccs'

const data = [
  { name: 'Chrome', value: 400 },
  { name: 'Safari', value: 300 },
  { name: 'Firefox', value: 200 },
  { name: 'Edge', value: 100 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
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
        :outer-radius="100"
        :label="true"
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
