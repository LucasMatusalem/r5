<script setup lang="ts">
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import InfoDatatable from "~/components/vulnerabilities/info-datatable/info-datatable.vue";
import VulnerabilitiesDatatable from "~/components/vulnerabilities/vulnerabilities-datatable/vulnerabilities-datatable.vue";

definePageMeta({
  layout: "page-layout",
});

function showModalContent(id: any) {
  console.log(id)
}
</script>

<template>
  <!-- Title -->
  <!-- <div class="flex items-center justify-between space-y-2">
    <h2 class="text-3xl font-bold tracking-tight">Vulnerabilidades</h2>
  </div> -->

  <Card class="p-5 border">
    <CardTitle class="mb-4">Vulnerabilidades</CardTitle>
    <CardContent class="pl-0 p-0 flex-1">
      <VulnerabilitiesDatatable @showModal="showModalContent"/>
    </CardContent>
  </Card>

  <Card class="p-5 border">
    <CardTitle class="mb-4">Info</CardTitle>
    <CardContent class="pl-0 p-0 flex-1">
      <InfoDatatable @showModal="showModalContent"/>
    </CardContent>
  </Card>
</template>
