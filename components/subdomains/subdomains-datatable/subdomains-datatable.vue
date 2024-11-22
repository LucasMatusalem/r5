<script setup lang="ts">
import DataTable from '~/components/custom/datatable/components/DataTable.vue';
import { BackendApi } from '~/services/backend-api';
import { tableCfg } from './data/table-cfg';

const api = new BackendApi();
const responseSubdomains = api.getSubdomains()
const dataFromDb = computed(() => responseSubdomains.data.value)
</script>

<template>
  <div v-if="dataFromDb">
    <DataTable :data="dataFromDb" :table-cfg="tableCfg"/>
  </div>
  <div v-else>
    Loading...
  </div>
</template>
