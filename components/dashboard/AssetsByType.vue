<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PieChart from "../custom/charts/pie/PieChart.vue";

const data = [
  {
    name: "subdomains",
    total: 84,
  },
  {
    name: "domains",
    total: 60,
  },
  {
    name: "applications",
    total: 2,
  },
];
</script>

<template>
  <Card class="col-span-1 min-h-[380px] flex flex-col">
    <CardHeader>
      <CardTitle>Quantidade de assets</CardTitle>
    </CardHeader>
    <CardContent class="pl-0 p-0 flex-1">
      <PieChart :data="data"></PieChart>
    </CardContent>
  </Card>
</template>
