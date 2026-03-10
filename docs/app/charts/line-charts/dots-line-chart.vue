<script setup>
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'vccs'

const data = [
  { name: 'Jan', value: 186 },
  { name: 'Feb', value: 305 },
  { name: 'Mar', value: 237 },
  { name: 'Apr', value: 73 },
  { name: 'May', value: 209 },
  { name: 'Jun', value: 214 },
]
</script>

<template>
  <ResponsiveContainer
    width="100%"
    :height="300"
  >
    <LineChart :data="data">
      <CartesianGrid stroke-dasharray="3 3" />
      <XAxis data-key="name" />
      <YAxis />
      <Tooltip />
      <Line
        type="monotone"
        data-key="value"
        stroke="#8884d8"
        :dot="{ fill: '#8884d8', r: 4 }"
        :active-dot="{ r: 6 }"
      />
    </LineChart>
  </ResponsiveContainer>
</template>
