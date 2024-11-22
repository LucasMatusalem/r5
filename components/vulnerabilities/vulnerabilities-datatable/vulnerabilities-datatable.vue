<script setup lang="ts">
import data from './data/data.json'
import DataTable from '~/components/custom/datatable/components/DataTable.vue';
import { tableCfg } from './data/table-cfg';
import { BackendApi } from '~/services/backend-api';

const api = new BackendApi();
const responseVuln = api.getVulnerabilities({
  from: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString(),
})
const dataFromDb = computed(() => responseVuln.data.value)
const emit = defineEmits(["showModal"])

function openModal(id: any) {
  emit('showModal', id)
}
</script>

<template>
  <div v-if="dataFromDb">
    <DataTable :data="dataFromDb" :table-cfg="tableCfg" @show-modal="openModal"/>
  </div>
  <div v-else>
    Loading...
  </div>
</template>
