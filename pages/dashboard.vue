<script setup lang="ts">
import DashboardCards from "@/components/dashboard/DashboardCards.vue";
import AssetsByType from "~/components/dashboard/AssetsByType.vue";
import VulnerabilitiesBySeverity from "~/components/dashboard/VulnerabilitiesBySeverity.vue";
import AssetsOvertime from "~/components/dashboard/AssetsOvertime.vue";
import VulnerabilitiesOvertime from "~/components/dashboard/VulnerabilitiesOvertime.vue";
import VulnerabilitiesFeedDatatable from "~/components/dashboard/vulnerabilities-feed-datatable/vulnerabilities-feed-datatable.vue";
definePageMeta({
  layout: "page-layout",
});
</script>

<template>
  <!-- Title -->
  <!-- <div class="flex items-center justify-between space-y-2">
    <h2 class="text-3xl font-bold tracking-tight">Dashboard</h2>
  </div> -->

  <!-- MainContent -->
  <div class="grid gap-4 grid-cols-1 lg:grid-cols-3">
    <DashboardCards></DashboardCards>
  </div>

  <div class="grid gap-4 grid-cols-2 lg:grid-cols-3">
    <VulnerabilitiesOvertime />
    <VulnerabilitiesBySeverity />
    <AssetsByType />
    <AssetsOvertime />

    <Card class="col-span-full min-h-[380px] flex flex-col">
      <CardHeader>
        <CardTitle>Últimas vulnerabilidades encontradas (7D)</CardTitle>
      </CardHeader>
      <CardContent class="pl-0 flex-1 px-5 pb-5">
        <VulnerabilitiesFeedDatatable />
      </CardContent>
    </Card>
  </div>
</template>
