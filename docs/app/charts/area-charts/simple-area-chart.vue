<script setup>
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'vccs'

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
    <AreaChart :data="data">
      <CartesianGrid stroke-dasharray="3 3" />
      <XAxis data-key="name" />
      <YAxis />
      <Tooltip :cursor="false">
        <template #content="{ active, payload, label }">
          <ChartTooltipContent
            :active="active"
            :payload="payload"
            :label="label"
          />
        </template>
      </Tooltip>
      <Area
        type="monotone"
        data-key="value"
        stroke="#f97316"
        fill="#f97316"
        :fill-opacity="0.3"
      />
    </AreaChart>
  </ResponsiveContainer>
</template>
