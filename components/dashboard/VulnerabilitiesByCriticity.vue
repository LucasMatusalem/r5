<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PieChart from "../custom/charts/pie/PieChart.vue";

const data = [
  {
    name: "critical",
    total: 3000,
  },
  {
    name: "high",
    total: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "medium",
    total: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "low",
    total: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "unknown",
    total: Math.floor(Math.random() * 2000) + 500,
  },
];
</script>

<template>
  <Card class="col-span-1 min-h-[380px] flex flex-col">
    <CardHeader>
      <CardTitle>Visao Geral por criticidade</CardTitle>
    </CardHeader>
    <CardContent class="pl-0 p-0 flex-1">
      <PieChart :data="data"></PieChart>
    </CardContent>
  </Card>
</template>
