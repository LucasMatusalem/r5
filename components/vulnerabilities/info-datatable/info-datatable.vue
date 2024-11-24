<script setup lang="ts">
import { BackendApi } from '~/services/backend-api';
import DataTable from '~/components/custom/datatable/components/DataTable.vue';
import { tableCfg } from './data/table-cfg';
import data from './data/data.json'

// const api = new BackendApi();
// const responseVuln = api.getInfoVulnerabilities()
// const dataFromDb = computed(() => responseVuln.data.value)
</script>

<template>
  <div v-if="data">
    <DataTable :data="data" :table-cfg="tableCfg"/>
  </div>
  <div v-else>
    Loading...
  </div>
</template>
