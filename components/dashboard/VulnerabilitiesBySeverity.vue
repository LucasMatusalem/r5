<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PieChart from "../custom/charts/pie/PieChart.vue";
import { BackendApi } from "~/services/backend-api";

const api = new BackendApi();
const responsePieCharts = api.getDashboardPieCharts()
const transformedData = computed(() => responsePieCharts.data.value?.vulnerabilitiesBySeverity)

const colors = {
  Critical: "#FF1010",
  High: "#FF6060",
  Medium: "#FFA500",
  Low: "#FFD700",
  Unknown: "#4C9AFF",
};
const colorsArray = Object.values(colors)
</script>

<template>
  <Card class="col-span-1 min-h-[380px] flex flex-col">
    <CardHeader>
      <CardTitle>Visao Geral por criticidade</CardTitle>
    </CardHeader>
    <CardContent class="pl-0 p-0 flex-1">
      <span v-if="!transformedData">Loading...</span>
      <PieChart v-else :data="transformedData" :colors="colorsArray"/>
    </CardContent>
  </Card>
</template>
