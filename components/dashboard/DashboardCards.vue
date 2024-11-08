<script setup lang="ts">
import { BackendApi } from '~/services/backend-api';

  // make api call
  const backendApi = new BackendApi();
  const backendResponse = backendApi.getDashboardTotals();
</script>

<template>
  <DashboardCard
    :data="{
      title: 'Domínios',
      value: backendResponse.data?.value?.domainsTotal,
    }"
  />

  <DashboardCard
    :data="{
      title: 'Subdomínios',
      value: backendResponse.data?.value?.subdomainsTotal,
    }"
  />
  <DashboardCard
    :data="{
      title: 'Vulnerabilidades',
      value: backendResponse.data?.value?.vulnerabilitiesTotal,
    }"
  />
</template>
