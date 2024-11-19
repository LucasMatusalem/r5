<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'
import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'
import { computed } from 'vue'
import DataTableFacetedFilter from './DataTableFacetedFilter.vue'
import type { TableCfg } from './DataTable'

interface DataTableToolbarProps {
  table: Table<any>;
  tableCfg: TableCfg;
}

const props = defineProps<DataTableToolbarProps>()

const isFiltered = computed(() => props.table.getState().columnFilters.length > 0)
const data = props.tableCfg.dataCfg
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex flex-1 items-center space-x-2">
      <Input
        placeholder="Buscar"
        class="h-8 w-[150px] lg:w-[250px]"
      />
      <DataTableFacetedFilter
        v-for="key in Object.keys(data).filter(element => data[element].isFilter)"
        :key="key"
        :column="table.getColumn(key)"
        :title="data[key].title"
        :options="data[key].options!"
      />
      <Button
        v-if="isFiltered"
        variant="ghost"
        class="h-8 px-2 lg:px-3"
        @click="table.resetColumnFilters()"
      >
        Reset
      </Button>
    </div>
  </div>
</template>