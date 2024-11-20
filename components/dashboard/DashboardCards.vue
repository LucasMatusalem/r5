<script setup lang="ts">
  import { BackendApi } from '~/services/backend-api';
  const backendApi = new BackendApi();
  const backendResponse = backendApi.getDashboardTotals();
</script>

<template>
  <DashboardCard
    :data="{
      title: 'Domínios',
      value: backendResponse.data?.value?.domainsTotal,
    }"
    icon="domains"
  />
  <DashboardCard
    :data="{
      title: 'Subdomínios',
      value: backendResponse.data?.value?.subdomainsTotal,
    }"
    icon="subdomains"
  />
  <DashboardCard
    :data="{
      title: 'Vulnerabilidades',
      value: backendResponse.data?.value?.vulnerabilitiesTotal,
    }"
    icon="vulnerabilities"
  />
</template>
