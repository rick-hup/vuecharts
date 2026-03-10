<script setup>
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'vccs'

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
  <ResponsiveContainer
    width="100%"
    :height="300"
  >
    <BarChart
      :data="data"
      :margin="{ top: 20 }"
    >
      <CartesianGrid stroke-dasharray="3 3" />
      <XAxis data-key="name" />
      <YAxis />
      <Tooltip />
      <Bar
        data-key="value"
        fill="#8884d8"
      >
        <LabelList
          position="top"
          :offset="12"
          :font-size="12"
        />
      </Bar>
    </BarChart>
  </ResponsiveContainer>
</template>
