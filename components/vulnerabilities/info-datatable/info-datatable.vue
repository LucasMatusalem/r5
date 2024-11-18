<script setup lang="ts">
import { dataCfg } from './data/data-cfg';
import data from './data/data.json';
import DataTable from '~/components/custom/datatable/components/DataTable.vue';
</script>

<template>
  <DataTable :data="data" :data-cfg="dataCfg" />
</template>
