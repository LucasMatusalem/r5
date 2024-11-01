<script setup>
import { colors } from '@unovis/ts';

  const shown = ref(false)

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
  const chartColors = [
    'hsl(var(--chart-1)',
    'hsl(var(--chart-2)',
    'hsl(var(--chart-3)',
    'hsl(var(--chart-4)',
    'hsl(var(--chart-5)',
  ]
</script>

<template>
  <div>
    <Button :onclick="() => shown = !shown">Toggle</Button>
    <div v-if="shown">Hello, world!</div>
  </div>
  <Card class="m-8 p-8">
    <DonutChart index="name" :category="'total'" :data="data" :type="'donut'" :colors="chartColors" :showLegend="true"/>
  </Card>
</template>