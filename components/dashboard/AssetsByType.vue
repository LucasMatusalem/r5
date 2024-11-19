<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PieChart from "../custom/charts/pie/PieChart.vue";
import { BackendApi } from "~/services/backend-api";

const api = new BackendApi();
const responsePieCharts = api.getDashboardPieCharts()
const transformedData = computed(() => responsePieCharts.data.value?.assetsByType)

</script>

<template>
  <Card class="col-span-1 min-h-[380px] flex flex-col">
    <CardHeader>
      <CardTitle>Quantidade de assets</CardTitle>
    </CardHeader>
    <CardContent class="pl-0 p-0 flex-1">
      <span v-if="!transformedData">Loading...</span>
      <PieChart v-else :data="transformedData" />
    </CardContent>
  </Card>
</template>
