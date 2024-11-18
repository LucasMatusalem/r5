<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";
import InfoDatatable from "~/components/vulnerabilities/info-datatable/info-datatable.vue";
import VulnerabilitiesDatatable from "~/components/vulnerabilities/vulnerabilities-datatable/vulnerabilities-datatable.vue";

definePageMeta({
  layout: "page-layout",
});
</script>

<template>
  <!-- Title -->
  <!-- <div class="flex items-center justify-between space-y-2">
    <h2 class="text-3xl font-bold tracking-tight">Vulnerabilidades</h2>
  </div> -->

  <Card class="p-5 border">
    <CardContent class="pl-0 p-0 flex-1">
      <VulnerabilitiesDatatable />
    </CardContent>
  </Card>

  <Card class="p-5 border">
    <CardContent class="pl-0 p-0 flex-1">
      <InfoDatatable />
    </CardContent>
  </Card>
</template>
