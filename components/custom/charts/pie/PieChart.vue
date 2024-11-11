<script setup lang="ts">
import { DonutChart } from "@/components/ui/chart-donut";

interface ChartData {
  name: string;
  total: number;
}

interface PieChartProps {
  data: ChartData[];
  colors?: string[];
}

const props = defineProps<PieChartProps>();
</script>

<template>
  <DonutChart
    index="name"
    :category="'total'"
    :data="props.data"
    :type="'donut'"
    :colors="props.colors ?? [
      'hsl(var(--chart-1))',
      'hsl(var(--chart-5))',
      'hsl(var(--chart-3))',
      'hsl(var(--chart-4))',
      'hsl(var(--chart-2))',
    ]"
  >
  </DonutChart>
</template>
