<script setup lang="ts">
import DashboardCards from "@/components/dashboard/DashboardCards.vue";
import AssetsByType from "~/components/dashboard/AssetsByType.vue";
import VulnerabilitiesBySeverity from "~/components/dashboard/VulnerabilitiesBySeverity.vue";
import AssetsOvertime from "~/components/dashboard/AssetsOvertime.vue";
import VulnerabilitiesOvertime from "~/components/dashboard/VulnerabilitiesOvertime.vue";
definePageMeta({
  layout: "page-layout",
});

</script>

<template>
  <!-- Title -->
  <div class="flex items-center justify-between space-y-2">
    <h2 class="text-3xl font-bold tracking-tight">Dashboard</h2>
  </div>

  <!-- MainContent -->
  <div class="grid gap-4 grid-cols-1 lg:grid-cols-3 pb-4">
    <DashboardCards></DashboardCards>
  </div>

  <div class="grid gap-4 grid-cols-2 lg:grid-cols-3">
    <VulnerabilitiesOvertime />
    <VulnerabilitiesBySeverity />
    <AssetsByType  />
    <AssetsOvertime />
  </div>
</template>
