<script setup lang="ts">
import DataTable from '~/components/vulnerabilities/components/DataTable.vue';
import { Card, CardContent } from "@/components/ui/card";
import data from '@/components/vulnerabilities/data/data.json'
import { columns } from '~/components/vulnerabilities/components/columns'

definePageMeta({
  layout: 'page-layout',
});

</script>

<template>
  <!-- Title -->
  <div class="flex items-center justify-between space-y-2">
    <h2 class="text-3xl font-bold tracking-tight">Vulnerabilidades</h2>
  </div>


    <Card class="p-5 border">
      <CardContent class="pl-0 p-0 flex-1">
        <DataTable :data="data" :columns="columns"></DataTable>
      </CardContent>
  </Card>
</template>
