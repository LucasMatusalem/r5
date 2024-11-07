<script setup lang="ts">
import { LineChart } from '@/components/ui/chart-line'

interface ChartData {
  index: string
  [key: string]: number | string
}

interface OvertimeChartProps {
  data: ChartData[]
}

const props = defineProps<OvertimeChartProps>();
const categories = Object.keys(props.data[0]).filter(i => i !== 'index')
</script>

<template>
  <LineChart
    :data="props.data"
    index="index"
    :categories="[...(categories as any)]"
    :colors="['hsl(var(--chart-1))', 'hsl(var(--chart-5))','hsl(var(--chart-3))','hsl(var(--chart-4))','hsl(var(--chart-2))']"
  />
</template>
