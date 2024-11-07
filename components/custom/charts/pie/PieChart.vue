<script setup lang="ts">
import { DonutChart } from '@/components/ui/chart-donut'

const data = [
  {
    name: 'critical',
    total: 3000,
  },
  {
    name: 'high',
    total: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: 'medium',
    total: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: 'low',
    total: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: 'unknown',
    total: Math.floor(Math.random() * 2000) + 500,
  },
]
</script>

<template>
  <DonutChart index="name" :category="'total'" :data="data" :type="'donut'" :colors="['hsl(var(--chart-1))', 'hsl(var(--chart-2))','hsl(var(--chart-3))','hsl(var(--chart-4))','hsl(var(--chart-5))']" >
  </DonutChart>
</template>
