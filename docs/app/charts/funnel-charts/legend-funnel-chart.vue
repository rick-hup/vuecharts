<script setup>
import { Cell, Funnel, FunnelChart, Legend, ResponsiveContainer, Tooltip } from 'vccs'

const data = [
  { name: 'Impressions', value: 12000 },
  { name: 'Clicks', value: 4800 },
  { name: 'Signups', value: 1500 },
  { name: 'Active', value: 680 },
]

const COLORS = ['#f97316', '#14b8a6', '#f59e0b', '#06b6d4']
</script>

<template>
  <ResponsiveContainer
    width="100%"
    :height="300"
  >
    <FunnelChart>
      <Tooltip :cursor="false">
        <template #content="{ active, payload, label }">
          <ChartTooltipContent
            :active="active"
            :payload="payload"
            :label="label"
          />
        </template>
      </Tooltip>
      <Funnel
        :data="data"
        data-key="value"
        name-key="name"
      >
        <Cell
          v-for="(entry, index) in data"
          :key="index"
          :fill="COLORS[index]"
        />
      </Funnel>
      <Legend />
    </FunnelChart>
  </ResponsiveContainer>
</template>
