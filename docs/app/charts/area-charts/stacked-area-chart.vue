<script setup>
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'vccs'

const data = [
  { name: 'Jan', desktop: 400, mobile: 240 },
  { name: 'Feb', desktop: 300, mobile: 139 },
  { name: 'Mar', desktop: 200, mobile: 980 },
  { name: 'Apr', desktop: 278, mobile: 390 },
  { name: 'May', desktop: 189, mobile: 480 },
  { name: 'Jun', desktop: 239, mobile: 380 },
]
</script>

<template>
  <ResponsiveContainer
    width="100%"
    :height="300"
  >
    <AreaChart :data="data">
      <CartesianGrid stroke-dasharray="3 3" />
      <XAxis data-key="name" />
      <YAxis />
      <Tooltip />
      <Area
        type="monotone"
        data-key="desktop"
        stack-id="a"
        stroke="#8884d8"
        fill="#8884d8"
      />
      <Area
        type="monotone"
        data-key="mobile"
        stack-id="a"
        stroke="#82ca9d"
        fill="#82ca9d"
      />
    </AreaChart>
  </ResponsiveContainer>
</template>
