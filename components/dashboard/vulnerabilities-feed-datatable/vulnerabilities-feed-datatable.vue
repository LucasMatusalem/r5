<script setup lang="ts">
import { BackendApi } from '~/services/backend-api';

import DataTable from '~/components/custom/datatable/components/DataTable.vue';
import { tableCfg } from './data/table-cfg';

const api = new BackendApi();
const responseVuln = api.getVulnerabilities()
const dataFromDb = computed(() => responseVuln.data.value)
</script>

<template>
  <div v-if="dataFromDb">
    <DataTable :data="dataFromDb" :table-cfg="tableCfg" />
  </div>
  <div v-else>
    Loading...
  </div>
</template>
